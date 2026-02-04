'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Form, Input, notification, Space, Divider } from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { CreateExcerciseOptionRequest, CreateExcerciseRequest } from '@/types/excercise'

const FIXED_XP = 50
const FIXED_DIFFICULTY = 'Easy'
const FIXED_EXERCISE_TYPE_ID = "1278d31e-4a29-4b7e-8114-8bed7e2a4a4a"

export default function CreateExercisePage() {
    const router = useRouter()
    const params = useParams()
    const subTopicId = params.subtopicId as string
    const topicId = params.topicId as string
    const { createExcercise } = useExcerciseStore()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)


    const [options, setOptions] = useState<CreateExcerciseOptionRequest[]>([
        { optionText: '', explanation: '', isCorrect: true },
    ])


    // const handleAddOption = () => {
    //     setOptions([...options, { optionText: '', explanation: '', isCorrect: true }])
    // }

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index))
    }

    const handleOptionChange = (index: number, field: keyof CreateExcerciseOptionRequest, value: string) => {
        const newOptions = [...options]
        newOptions[index] = { ...newOptions[index], [field]: value }
        setOptions(newOptions)
    }

    const handleSubmit = async (values: CreateExcerciseRequest) => {
        if (!subTopicId) {
            notification.error({ message: 'Không tìm thấy SubTopic' })
            return
        }

        const validOptions = options.filter(opt => opt.optionText.trim());

        if (validOptions.length === 0) {
            notification.error({ message: 'Phải có ít nhất một đáp án' })
            return
        }

        setLoading(true)
        try {
            const request: CreateExcerciseRequest = {
                subTopicId,
                xp: FIXED_XP,
                question: values.question,
                videoUrl: undefined,
                difficulty: FIXED_DIFFICULTY,
                exerciseTypeId: FIXED_EXERCISE_TYPE_ID,


                answers: JSON.stringify(validOptions)
            }

            await createExcercise(request)
            notification.success({ message: 'Tạo bài tập thành công' })
            router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/exercises`)
        } catch (error) {
            notification.error({ message: 'Lỗi khi tạo bài tập' })
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => router.back()}
                        style={{ color: '#06b6d4' }}
                    >
                        Quay lại
                    </Button>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Tạo bài tập Flashcard</h1>
                </div>

                {/* Form */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #cffafe' }}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        {/* Question Input */}
                        <Form.Item
                            label={<span style={{ fontWeight: 600 }}>Thuật ngữ / Câu hỏi</span>}
                            name="question"
                            rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập câu hỏi hoặc thuật ngữ flashcard"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>


                        <Divider dashed />

                        {/* Dynamic Answers List */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0c4a6e', margin: 0 }}>
                                    Định nghĩa / Đáp án
                                </h3>

                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {options.map((option, index) => (
                                    <div key={index} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {/* Answer Content */}
                                            <div>
                                                <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Nội dung đáp án</div>
                                                <Input
                                                    placeholder="Nhập câu trả lời"
                                                    value={option.optionText}
                                                    onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                                />
                                            </div>

                                            {/* Answer Explanation */}
                                            <div>
                                                <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Giải thích chi tiết (Không bắt buộc)</div>
                                                <Input.TextArea
                                                    placeholder="Giải thích vì sao đáp án này đúng..."
                                                    rows={2}
                                                    value={option.explanation || ''}
                                                    onChange={(e) => handleOptionChange(index, 'explanation', e.target.value)}
                                                />
                                            </div>

                                            {/* Delete Button */}
                                            {options.length > 1 && (
                                                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => handleRemoveOption(index)}
                                                        size="small"
                                                    >
                                                        Xóa lựa chọn này
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Button */}
                            {/* <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                onClick={handleAddOption}
                                style={{ width: '100%', marginTop: '16px', height: '44px', borderRadius: '8px', borderColor: '#0ea5e9', color: '#0284c7' }}
                            >
                                Thêm nội dung đáp án
                            </Button> */}
                        </div>

                        {/* Footer Buttons */}
                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '32px' }}>
                            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={() => router.back()}
                                    style={{ height: '40px', borderRadius: '8px' }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    style={{ background: '#0891b2', height: '40px', borderRadius: '8px', minWidth: '140px' }}
                                >
                                    Hoàn tất
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}