'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Row, Col, Modal, notification, Space, Pagination, Select, Input } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FlagOutlined, BookFilled, SearchOutlined } from '@ant-design/icons'
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { GetPagedExcercisesRequest } from '@/types/excercise'
import Spinner from "@/components/ui/Spinner";
import useDebounce from "@/hooks/use-debounce";



export default function ExercisesPage() {
    const router = useRouter()
    const params = useParams()
    const subTopicId = params.subtopicId as string;
    const topicId = params.topicId as string;

    const { excercises, getExcercises, deleteExcercise } = useExcerciseStore()
    const [loading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [query, setQuery] = useState<GetPagedExcercisesRequest>({
        page: 1,
        size: 12,
        searchProp: 'question',
        searchKey: '',
        isAscending: true,
    })
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => {
        if (!subTopicId) {
            notification.error({ message: 'Không tìm thấy SubTopic' })
            router.push('/my-topics')
            return
        }

        const fetchExercises = async () => {
            try {
                setLoading(true)
                await getExcercises(subTopicId, query)
            } finally {
                setLoading(false)
            }
        }
        fetchExercises()
    }, [subTopicId, query, getExcercises, params])

    useEffect(() => {
        setQuery(prev => ({
            ...prev,
            searchKey: debouncedSearchValue,
            page: 1
        }))
    }, [debouncedSearchValue])

    const handleDelete = async () => {
        if (!deleteId) return
        try {
            await deleteExcercise(deleteId)
            notification.success({ message: 'Xóa bài tập thành công' })
            setDeleteId(null)
            setQuery(prev => ({ ...prev, page: 1 }))
        } catch {

        }
    }

    const handlePageChange = (page: number) => {
        setQuery(prev => ({ ...prev, page }))
    }

    const handlePageSizeChange = (size: number) => {
        setQuery(prev => ({ ...prev, size, page: 1 }))
    }

    if (loading) {
        return (
            <Spinner />
        )
    }

    const exerciseList = excercises?.items || []
    const total = excercises?.total || 0

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => router.push(`/my-topics/${topicId}/subtopic`)}
                            style={{ color: '#06b6d4' }}
                        >
                            Quay lại
                        </Button>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Bài tập</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/create-exercise`)}
                            style={{ background: '#06b6d4', borderColor: '#06b6d4' }}
                        >
                            Tạo bài tập
                        </Button>
                        <Button
                            type="primary"
                            icon={<BookFilled />}
                            onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/flashcard`)}
                            style={{ background: '#06b6d4', borderColor: '#06b6d4' }}
                        >
                            Học ngay
                        </Button>
                    </div>
                </div>

                {/* Search Input */}
                <div style={{ marginBottom: '32px' }}>
                    <Input
                        placeholder="Tìm kiếm bài tập..."
                        prefix={<SearchOutlined style={{ color: '#06b6d4' }} />}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ maxWidth: '400px' }}
                        size="large"
                        allowClear
                    />
                </div>

                {/* Exercises Grid */}
                {exerciseList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>Chưa có bài tập nào</p>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/create-exercise`)}
                            style={{ background: '#06b6d4' }}
                        >
                            Tạo bài tập đầu tiên
                        </Button>
                    </div>
                ) : (
                    <>
                        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                            {exerciseList.map((exercise) => (
                                <Col xs={24} sm={12} md={8} key={exercise.id}>
                                    <Card
                                        hoverable
                                        style={{ height: '100%', borderColor: '#cffafe', borderRadius: '12px' }}
                                        cover={
                                            exercise.imageUrl ? (
                                                <div
                                                    style={{
                                                        height: '200px',
                                                        background: `url(${exercise.imageUrl}) center/cover`,
                                                        borderRadius: '12px 12px 0 0',
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        height: '200px',
                                                        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderRadius: '12px 12px 0 0',
                                                    }}
                                                >
                                                    <FlagOutlined style={{ fontSize: '48px', color: 'white' }} />
                                                </div>
                                            )
                                        }
                                    >
                                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0c4a6e', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            Câu hỏi: {exercise.question}
                                        </h3>
                                        {exercise.ans?.[0]?.explanation || exercise.ans?.[0]?.optionText ? (
                                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                                                Đáp án: {exercise.ans[0].explanation || exercise.ans[0].optionText}
                                            </p>
                                        ) : (
                                            <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Chưa có đáp án</p>
                                        )}
                                        <Space style={{ width: '100%' }} className="flex justify-center">
                                            <Button
                                                type="primary"
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/edit-exercise?exerciseId=${exercise.id}`)}
                                                style={{ background: '#06b6d4', flex: 1 }}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                danger
                                                size="small"
                                                icon={<DeleteOutlined />}
                                                onClick={() => setDeleteId(exercise.id)}
                                                style={{ flex: 1 }}
                                            >
                                                Xóa
                                            </Button>
                                        </Space>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Pagination */}
                        {total > query.size && (
                            <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #cffafe' }}>
                                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '14px', color: '#666' }}>Hiển thị mỗi trang:</span>
                                    <Select
                                        value={query.size}
                                        onChange={handlePageSizeChange}
                                        style={{ width: '100px' }}
                                        options={[
                                            { value: 12, label: '12 mục' },
                                            { value: 24, label: '24 mục' },
                                            { value: 48, label: '48 mục' },
                                        ]}
                                    />
                                </div>
                                <Pagination
                                    current={query.page}
                                    pageSize={query.size}
                                    total={total}
                                    onChange={handlePageChange}
                                    showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bài tập`}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Delete Modal */}
                <Modal
                    title="Xác nhận xóa"
                    open={!!deleteId}
                    onOk={handleDelete}
                    onCancel={() => setDeleteId(null)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                >
                    <p>Bạn có chắc chắn muốn xóa bài tập này?</p>
                </Modal>
            </div>
        </div>
    )
}