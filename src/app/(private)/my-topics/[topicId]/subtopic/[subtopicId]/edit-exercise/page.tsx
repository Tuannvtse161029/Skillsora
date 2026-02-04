'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button, Form, Input, notification, Space, Divider, Skeleton } from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { UpdateExcerciseRequest, UpdateExcerciseOptionRequest } from '@/types/excercise'

const FIXED_XP = 50
const FIXED_DIFFICULTY = 'Easy'

interface LocalOptionState {
    id: string;
    optionText: string;
    explanation: string;
    isCorrect: boolean;
}

export default function UpdateExercisePage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams();

    const topicId = params.topicId as string
    const subTopicId = params.subtopicId as string
    const exerciseId = (searchParams.get("exerciseId") || params.exerciseId) as string;

    const {
        getExcercise,
        updateExcercise,
        updateExcerciseOption,
        excercise
    } = useExcerciseStore()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    const [options, setOptions] = useState<LocalOptionState[]>([])

    useEffect(() => {
        if (exerciseId) {
            getExcercise(exerciseId).finally(() => { });
        }
    }, [exerciseId, getExcercise])

    useEffect(() => {
        if (excercise && excercise.id === exerciseId) {
            form.setFieldsValue({
                question: excercise.question
            })

            const apiAnswers = excercise.ans || excercise.answers || [];
            if (apiAnswers.length > 0) {

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedOptions: LocalOptionState[] = apiAnswers.map((ans: any) => ({
                    id: ans.id,
                    optionText: ans.optionText || ans.content || '',
                    explanation: ans.explanation || ans.description || '',
                    isCorrect: ans.isCorrect ?? true
                }))
                setOptions(mappedOptions)
            }
            setFetching(false)
        }
    }, [excercise, exerciseId, form])


    const handleOptionChange = (index: number, field: keyof LocalOptionState, value: string) => {
        const newOptions = [...options]
        newOptions[index] = { ...newOptions[index], [field]: value }
        setOptions(newOptions)
    }

    const handleSubmit = async (values: UpdateExcerciseRequest) => {
        setLoading(true)
        try {
            const exerciseRequest: UpdateExcerciseRequest = {
                exerciseId: exerciseId,
                subTopicId,
                xp: FIXED_XP,
                question: values.question,
                difficulty: FIXED_DIFFICULTY,
                answers: ""
            }

            await updateExcercise(exerciseRequest)

            const updateOptionPromises = options.map((opt) => {
                const optionRequest: UpdateExcerciseOptionRequest = {
                    optionId: opt.id,
                    optionText: opt.optionText,
                    explanation: opt.explanation,
                    isCorrect: opt.isCorrect
                }
                return updateExcerciseOption(optionRequest);
            });

            await Promise.all(updateOptionPromises);

            notification.success({ message: 'Cập nhật bài tập và đáp án thành công' })
            router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/exercises`)

        } catch { }
        finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f9ff', padding: '32px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '32px', borderRadius: '12px' }}>
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/exercises`)}
                        style={{ color: '#06b6d4' }}
                    >
                        Quay lại
                    </Button>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Cập nhật bài tập</h1>
                </div>

                {/* Form Content */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #cffafe' }}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        <Form.Item
                            label={<span style={{ fontWeight: 600 }}>Thuật ngữ / Câu hỏi</span>}
                            name="question"
                            rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập câu hỏi"
                                style={{ borderRadius: '8px' }}
                            />
                        </Form.Item>

                        <Divider dashed />

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0c4a6e', margin: 0 }}>
                                    Chỉnh sửa Đáp án
                                </h3>
                                <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', margin: '4px 0 0 0' }}>
                                    (Chỉ được phép chỉnh sửa nội dung, không được thêm/xóa)
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {options.map((option, index) => (
                                    <div key={option.id || index} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Giải thích</div>
                                                <Input.TextArea
                                                    placeholder="Giải thích vì sao đúng..."
                                                    rows={2}
                                                    value={option.explanation || ''}
                                                    onChange={(e) => handleOptionChange(index, 'explanation', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Chi tiết đáp án</div>
                                                <Input
                                                    placeholder="Nhập chi tiết đáp "
                                                    value={option.optionText}
                                                    onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                                />
                                            </div>



                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '32px' }}>
                            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={() => router.push(`/my-topics/${topicId}/subtopic/${subTopicId}/exercises`)}
                                    style={{ height: '40px', borderRadius: '8px' }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={loading}
                                    className="!bg-cyan-500 hover:bg-cyan-600"
                                    style={{ height: '40px', borderRadius: '8px', minWidth: '140px' }}
                                >
                                    Cập nhật tất cả
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}