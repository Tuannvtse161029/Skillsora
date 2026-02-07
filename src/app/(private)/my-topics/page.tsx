"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { GetPagedTopicsRequest, TopicDto } from "@/types/topic"
import { Button, Modal, notification, Input, Select, Pagination } from "antd"
import { PlusOutlined, BookOutlined, CalendarOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRequest } from "ahooks"
import axiosClient from "@/utils/axios/axiosClient"
import { IBaseModel, IPaginate } from "@/interfaces/general"
import useTopicStore from "@/zustand/useTopicStore"
import useDebounce from "@/hooks/use-debounce"

export default function MyTopicPage() {
    const router = useRouter()
    const { deleteTopic } = useTopicStore()
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    const [topics, setTopics] = useState<IPaginate<TopicDto> | null>(null)
    const [query, setQuery] = useState<GetPagedTopicsRequest>({
        searchProp: 'topicName',
        searchKey: '',
        page: 1,
        size: 10,
        orderOn: 'createdOn',
        isAscending: false,
    })

    const [filterStatus, setFilterStatus] = useState<string>('all')

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const { loading } = useRequest(async () => {
        try {
            const response = await axiosClient.get<IBaseModel<IPaginate<TopicDto>>>("/my-topics", { params: query })
            if (response.data.isSuccess) {
                setTopics(response.data.responseRequest ?? null)
            }
        } catch {
        }
    }, {
        refreshDeps: [query]
    })

    useEffect(() => {
        setQuery(prev => ({
            ...prev,
            searchKey: debouncedSearchValue,
            page: 1
        }))
    }, [debouncedSearchValue])

    const handleSortChange = (value: string) => {
        const sortMap: Record<string, { orderOn: string; isAscending: boolean }> = {
            'newest': { orderOn: 'createdOn', isAscending: false },
            'oldest': { orderOn: 'createdOn', isAscending: true },
            'name': { orderOn: 'topicName', isAscending: true },
        }
        const { orderOn, isAscending } = sortMap[value]
        setQuery(prev => ({
            ...prev,
            orderOn,
            isAscending,
            page: 1
        }))
    }

    const handleFilterStatusChange = (value: string) => {
        setFilterStatus(value)
    }

    const handlePageChange = (page: number) => {
        setQuery(prev => ({
            ...prev,
            page
        }))
    }

    const handlePageSizeChange = (size: number) => {
        setQuery(prev => ({
            ...prev,
            size,
            page: 1
        }))
    }

    const topicsList = topics?.items?.filter(topic => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'complete') return topic.isComplete === true;
        if (filterStatus === 'incomplete') return !topic.isComplete;
        return true;
    }) ?? []

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
        }).format(new Date(date))
    }

    const handleCardClick = (topicId: string) => {
        router.push(`/my-topics/${topicId}/subtopic`)
    }

    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        router.push(`/my-topics/${id}/edit-topic`)
    }

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setDeleteId(id)
        setActiveMenu(null)
    }

    const confirmDelete = async () => {
        if (!deleteId) return

        try {
            await deleteTopic(deleteId)

            const newPage = topicsList.length === 1 && query.page > 1 ? query.page - 1 : 1
            setQuery(prev => ({ ...prev, page: newPage }))

            notification.success({ message: "Đã xóa chủ đề thành công" })
            setDeleteId(null)
        } catch {
            notification.error({ message: "Lỗi khi xóa chủ đề" })
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Chủ đề của tôi</h1>
                        <p className="text-gray-500 mt-1">Quản lý các chủ đề bài học bạn đã tạo</p>
                    </div>
                    <Link href="/create-topic">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500"
                        >
                            Tạo chủ đề mới
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Input
                        placeholder="Tìm kiếm chủ đề..."
                        prefix={<SearchOutlined className="text-cyan-400" />}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="flex-1 max-w-md"
                        size="large"
                        allowClear
                    />

                    <div className="flex gap-4">
                        {/* Status Filter */}
                        <Select
                            value={filterStatus}
                            onChange={handleFilterStatusChange}
                            style={{ width: 160 }}
                            size="large"
                            options={[
                                { value: "all", label: "Tất cả trạng thái" },
                                { value: "complete", label: "Đã hoàn thành" },
                                { value: "incomplete", label: "Chưa hoàn thành" },
                            ]}
                        />

                        {/* Sort Filter */}
                        <Select
                            value={
                                query.orderOn === 'createdOn' && !query.isAscending
                                    ? 'newest'
                                    : query.orderOn === 'createdOn' && query.isAscending
                                        ? 'oldest'
                                        : 'name'
                            }
                            onChange={handleSortChange}
                            style={{ width: 180 }}
                            size="large"
                            suffixIcon={<FilterOutlined className="text-cyan-500" />}
                            options={[
                                { value: "newest", label: "Mới nhất" },
                                { value: "oldest", label: "Cũ nhất" },
                                { value: "name", label: "Tên A-Z" },
                            ]}
                        />
                    </div>
                </div>

                {/* Topic Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cyan-100 animate-pulse">
                                <div className="h-44 bg-cyan-100" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-cyan-100 rounded w-3/4" />
                                    <div className="h-4 bg-cyan-50 rounded w-full" />
                                    <div className="h-4 bg-cyan-50 rounded w-2/3" />
                                    <div className="flex justify-between pt-2">
                                        <div className="h-6 bg-cyan-100 rounded-full w-24" />
                                        <div className="h-4 bg-cyan-50 rounded w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : topicsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                            <BookOutlined className="text-4xl text-cyan-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy chủ đề nào</h3>
                        <p className="text-gray-500 mb-6 text-center max-w-md">
                            {filterStatus !== 'all' || searchValue
                                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                                : "Bạn chưa tạo chủ đề nào. Hãy bắt đầu tạo chủ đề đầu tiên của bạn ngay bây giờ!"}
                        </p>
                        <Link href="/create-topic">
                            <Button type="primary" icon={<PlusOutlined />} className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500">
                                Tạo chủ đề mới
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {topicsList.map((topic) => (
                            <div
                                key={topic.topicId}
                                onClick={() => handleCardClick(topic.topicId)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cyan-100 hover:shadow-lg hover:border-cyan-200 transition-all duration-300 cursor-pointer group relative"
                            >
                                {/* Status Badge - Only show if completed */}
                                {topic.isComplete && (
                                    <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 shadow-sm border border-green-200">
                                        Đã hoàn thành
                                    </span>
                                )}

                                {/* Thumbnail */}
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={topic.thumbnail || "/placeholder.svg"}
                                        alt={topic.topicName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Menu Button */}
                                    <div className="absolute top-3 right-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setActiveMenu(activeMenu === topic.topicId ? null : topic.topicId)
                                            }}
                                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                                        >
                                            <EllipsisOutlined className="text-gray-600" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeMenu === topic.topicId && (
                                            <div className="absolute top-10 right-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[140px] z-10">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleEdit(e, topic.topicId)}
                                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-2"
                                                >
                                                    <EditOutlined className="text-cyan-500" />
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleDelete(e, topic.topicId)}
                                                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <DeleteOutlined />
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1 group-hover:text-cyan-600 transition-colors">
                                        {topic.topicName}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {topic.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium">
                                            <BookOutlined />
                                            {topic.totalSubTopic} bài học
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <CalendarOutlined />
                                            {formatDate(topic.createdOn!)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination and Page Size */}
                {!loading && topicsList.length > 0 && topics && (
                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 text-sm">Hiển thị mỗi trang:</span>
                            <Select
                                value={query.size}
                                onChange={handlePageSizeChange}
                                style={{ width: 100 }}
                                options={[
                                    { value: 10, label: "10 mục" },
                                    { value: 25, label: "25 mục" },
                                    { value: 50, label: "50 mục" },
                                    { value: 100, label: "100 mục" },
                                ]}
                            />
                        </div>
                        <Pagination
                            current={query.page}
                            pageSize={query.size}
                            total={topics.total}
                            onChange={handlePageChange}
                            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} chủ đề`}
                            style={{ textAlign: 'center' }}
                        />
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-red-500">Xác nhận xóa chủ đề</span>}
                open={!!deleteId}
                onOk={confirmDelete}
                onCancel={() => setDeleteId(null)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p className="text-gray-600">
                    Bạn có chắc chắn muốn xóa chủ đề này? Hành động này không thể hoàn tác và tất cả bài học trong chủ đề sẽ bị xóa.
                </p>
            </Modal>
        </div>
    )
}