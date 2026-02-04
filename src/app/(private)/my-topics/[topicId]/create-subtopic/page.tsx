"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button, Input, Form, message, Space, Skeleton } from "antd"
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import type { TopicDto } from "@/types/topic"
import { CreateSubTopicRequest } from "@/types/subTopic"
import axiosClient from "@/utils/axios/axiosClient"
import { GET_TOPIC_API } from "@/constants/apis"
import { IBaseModel } from "@/interfaces/general"

const { TextArea } = Input

export default function CreateSubTopicPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.topicId as string
  const [form] = Form.useForm()

  const [topic, setTopic] = useState<TopicDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true)
      try {
        const response = await axiosClient.get<IBaseModel<TopicDto>>(GET_TOPIC_API(topicId))
        const data = response.data.responseRequest
        if (data) {
          setTopic(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchTopic()
  }, [topicId])

  const handleSubmit = async (values: { name: string; description: string }) => {
    setSubmitting(true)
    try {
      const submitData: CreateSubTopicRequest = {
        topicId: topicId,
        name: values.name,
        description: values.description,
        subTopicId: ""
      }
      await axiosClient.post("/my-sub-topics", submitData)
      message.success("Tạo bài học thành công!")
      router.push(`/my-topics/${topicId}/subtopic`)
    } catch (error) {
      console.error("Error creating subtopic:", error)
      message.error("Có lỗi xảy ra khi tạo")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
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
            onClick={() => router.push(`/my-topics/${topicId}/subtopic`)}
            style={{ color: '#06b6d4' }}
          >
            Quay lại
          </Button>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Tạo bài học mới</h1>
        </div>

        {/* Main Content */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #cffafe' }}>

          {topic ? (
            <div style={{ marginBottom: '24px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #cffafe' }}>
              <p style={{ margin: 0, color: '#0c4a6e' }}>Thêm bài học cho chủ đề: <strong>{topic.topicName}</strong></p>
            </div>
          ) : (
            <div style={{ marginBottom: '24px', padding: '12px', background: '#fff1f2', borderRadius: '8px', border: '1px solid #fecdd3', color: '#e11d48' }}>
              Không tìm thấy thông tin chủ đề
            </div>
          )}

          <Form form={form} layout="vertical" onFinish={handleSubmit}>

            <Form.Item
              name="name"
              label={<span style={{ fontWeight: 600 }}>Tên bài học</span>}
              rules={[
                { required: true, message: "Vui lòng nhập tên bài học" },
                { min: 3, message: "Tên bài học phải có ít nhất 3 ký tự" },
              ]}
            >
              <Input
                placeholder="Ví dụ: Giới thiệu về EC2"
                size="large"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span style={{ fontWeight: 600 }}>Mô tả</span>}
              rules={[
                { required: true, message: "Vui lòng nhập mô tả bài học" },
                { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
              ]}
            >
              <TextArea
                placeholder="Mô tả chi tiết về nội dung bài học..."
                rows={4}
                maxLength={500}
                showCount
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            {/* Info Box / Notes - Giữ lại gợi ý cho user */}
            <div style={{ backgroundColor: '#f0f9ff', border: '1px dashed #a5f3fc', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#0891b2', fontSize: '13px' }}>
                <li>Tên bài học nên ngắn gọn và dễ hiểu</li>
                <li>Mô tả giúp người học nắm bắt nội dung trước khi bắt đầu</li>
              </ul>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '32px' }}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => router.push(`/my-topics/${topicId}/subtopic`)}
                  style={{ height: '40px', borderRadius: '8px' }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                  loading={submitting}
                  style={{ background: '#0891b2', borderColor: '#0891b2', height: '40px', borderRadius: '8px', minWidth: '140px' }}
                >
                  Tạo bài học
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}