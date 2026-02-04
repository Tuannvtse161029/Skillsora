"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button, Input, Modal, notification } from "antd"
import {
    PlusOutlined,
    SearchOutlined,
    ArrowLeftOutlined,
    BookOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from "@ant-design/icons"
import Link from "next/link"
import { useRequest } from "ahooks"

import useTopicStore from "@/zustand/useTopicStore"
import useSubTopicStore from "@/zustand/useSubTopicStore"
import { GetPagedSubTopicRequest } from "@/types/subTopic"

export default function SubTopicPage() {
    const params = useParams()
    const router = useRouter()
    const topicId = params.topicId as string

    const { topic, getTopic } = useTopicStore()
    const {
        subTopics: subTopicsPaginate,
        completedSubTopics,
        getSubTopics,
        deleteSubTopic
    } = useSubTopicStore()

    const [searchKey, setSearchKey] = useState("")
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const { loading } = useRequest(async () => {
        if (!topicId) return

        const query: GetPagedSubTopicRequest = {
            searchProp: 'name',
            searchKey: '',
            page: 1,
            size: 100,
            orderOn: 'createdOn',
            isAscending: true,
        }

        await Promise.all([
            getTopic(topicId),
            getSubTopics(topicId, query),
        ])
    }, {
        refreshDeps: [topicId]
    })

    const subTopicsList = subTopicsPaginate?.items ?? []
    const completedIds = completedSubTopics?.map(c => c.subTopic.id) ?? []

    const filteredSubTopics = subTopicsList.filter((st) =>
        st.name.toLowerCase().includes(searchKey.toLowerCase())
    )

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setDeleteId(id)
    }

    const handleEdit = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        router.push(`/my-topics/${topicId}/subtopic/${id}/edit-subtopic`)
    }

    const confirmDelete = async () => {
        if (!deleteId) return
        setIsDeleting(true)
        try {
            await deleteSubTopic(deleteId)
            notification.success({ message: "Xóa bài học thành công" })
            setDeleteId(null)
        } finally {
            setIsDeleting(false)
        }
    }

    const formatDate = (date: Date | string) => {
        if (!date) return "N/A"
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(date))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
            <div className="max-w-5xl mx-auto py-8 px-4">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => router.push("/my-topics")}
                    className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 mb-6 transition-colors"
                >
                    <ArrowLeftOutlined />
                    <span>Quay lại danh sách chủ đề</span>
                </button>

                {loading ? (
                    <div className="space-y-6">
                        <div className="h-40 bg-white rounded-2xl animate-pulse" />
                    </div>
                ) : !topic ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-cyan-200">
                        <p className="text-gray-500">Không tìm thấy thông tin chủ đề</p>
                    </div>
                ) : (
                    <>
                        {/* Topic Header Real Data */}
                        <div className="bg-white rounded-2xl p-6 border border-cyan-100 shadow-sm mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{topic.topicName}</h1>
                                    <p className="text-gray-500">{topic.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <BookOutlined className="text-cyan-500" />
                                            {subTopicsList.length} bài học
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CheckCircleOutlined className="text-green-500" />
                                            {completedIds.length} bài đã hoàn thành
                                        </span>
                                    </div>
                                </div>
                                <Link href={`/my-topics/${topicId}/create-subtopic`}>
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        size="large"
                                        className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500"
                                    >
                                        Thêm bài học
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <Input
                                placeholder="Tìm kiếm bài học..."
                                prefix={<SearchOutlined className="text-cyan-400" />}
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                className="max-w-md"
                                size="large"
                                allowClear
                            />
                        </div>

                        {/* Roadmap List */}
                        {filteredSubTopics.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-cyan-50">
                                <BookOutlined className="text-4xl text-cyan-200 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-700">Chưa có bài học nào</h3>
                                <Link href={`/my-topics/${topicId}/create-subtopic`} className="mt-4">
                                    <Button type="primary" icon={<PlusOutlined />}>Thêm bài đầu tiên</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-200" />

                                <div className="space-y-4">
                                    {filteredSubTopics.map((subTopic, index) => {
                                        const isCompleted = completedIds.includes(subTopic.id)
                                        return (
                                            <div key={subTopic.id} className="relative pl-14 group">
                                                {/* Timeline Node */}
                                                <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border-4 z-10 transition-all ${isCompleted ? "bg-green-500 border-green-100 text-white" : "bg-white border-cyan-100 text-cyan-500"}`}>
                                                    {isCompleted ? <CheckCircleOutlined /> : (index + 1)}
                                                </div>

                                                {/* Card */}
                                                <div
                                                    className={`bg-white rounded-xl p-5 border transition-all cursor-pointer hover:shadow-md ${isCompleted ? "border-green-100" : "border-cyan-50 hover:border-cyan-200"}`}
                                                    onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopic.id}/exercises`)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className={`font-semibold text-lg ${isCompleted ? "text-green-700" : "text-gray-800"}`}>
                                                                    {subTopic.name}
                                                                </h3>
                                                            </div>
                                                            <p className="text-gray-500 text-sm mb-3">{subTopic.description}</p>
                                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                                <span className="flex items-center gap-1">
                                                                    <ClockCircleOutlined />
                                                                    {formatDate(subTopic.createdOn!)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button
                                                                size="small"
                                                                icon={<EditOutlined />}
                                                                onClick={(e) => handleEdit(e, subTopic.id)}
                                                                className="!text-cyan-600 !bg-cyan-50 border-none"
                                                            />
                                                            <Button
                                                                size="small"
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                                onClick={(e) => handleDelete(e, subTopic.id)}
                                                                className="!bg-red-50 border-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal Xóa */}
            <Modal
                title="Xác nhận xóa"
                open={!!deleteId}
                onOk={confirmDelete}
                onCancel={() => setDeleteId(null)}
                confirmLoading={isDeleting}
                okText="Xóa bài học"
                okButtonProps={{ danger: true }}
                centered
            >
                <p>Bạn có chắc muốn xóa bài học này? Mọi dữ liệu liên quan sẽ bị mất.</p>
            </Modal>
        </div>
    )
}