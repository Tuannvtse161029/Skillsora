"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button, Input, Form, Upload, message, Skeleton, Space } from "antd"
import type { UploadFile, RcFile } from "antd/es/upload/interface"
import { ArrowLeftOutlined, DeleteOutlined, CloudUploadOutlined, SaveOutlined } from "@ant-design/icons"
import axiosClient from "@/utils/axios/axiosClient"
import { GET_TOPIC_API, PUT_TOPIC_API } from "@/constants/apis"
import { IBaseModel } from "@/interfaces/general"
import { TopicDto } from "@/types/topic"

const { TextArea } = Input

interface FormValues {
    topicName: string
    topicDescription: string
}

export default function EditTopicPage() {
    const router = useRouter()
    const params = useParams()
    const topicId = params?.topicId as string

    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        const fetchTopicDetail = async () => {
            if (!topicId) return;
            try {
                const response = await axiosClient.get<IBaseModel<TopicDto>>(GET_TOPIC_API(topicId))
                const data = response.data.responseRequest
                if (data) {
                    form.setFieldsValue({
                        topicName: data.topicName,
                        topicDescription: data.description
                    })
                    setThumbnailPreview(data.thumbnail || null)
                }
            } catch (error) {
                console.error("Failed to fetch topic", error)
            } finally {
                setLoadingData(false)
            }
        }
        fetchTopicDetail()
    }, [topicId, form])

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith("image/")
        if (!isImage) {
            message.error("Vui lòng chọn file hình ảnh!")
            return false
        }
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
            message.error("Kích thước file tối đa là 5MB!")
            return false
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setThumbnailPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        setFileList([file])
        return false
    }

    const removeThumbnail = () => {
        setFileList([])
        setThumbnailPreview(null)
    }

    const handleSubmit = async (values: FormValues) => {
        setIsSubmitting(true)
        try {
            const updateData = {
                topicId: topicId,
                topicName: values.topicName,
                topicDescription: values.topicDescription
            }

            const updateResponse = await axiosClient.put(PUT_TOPIC_API, updateData)

            if (!updateResponse.data.isSuccess) {
                throw new Error(updateResponse.data.message || "Lỗi khi cập nhật thông tin")
            }

            if (fileList.length > 0) {
                const formData = new FormData()
                formData.append("thumnail", fileList[0] as RcFile)

                await axiosClient.put(
                    `/my-topics/${topicId}/image-upload`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
            }

            message.success("Cập nhật chủ đề thành công!")
            router.push("/my-topics")

        } catch {
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loadingData) {
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
                        onClick={() => router.push("/my-topics")}
                        style={{ color: '#06b6d4' }}
                    >
                        Quay lại danh sách
                    </Button>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Chỉnh sửa chủ đề</h1>
                </div>

                {/* Main Content */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #cffafe' }}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        <Form.Item
                            name="topicName"
                            label={<span style={{ fontWeight: 600 }}>Tên chủ đề</span>}
                            rules={[{ required: true, message: "Vui lòng nhập tên" }, { min: 3, message: "Tối thiểu 3 ký tự" }]}
                        >
                            <Input size="large" style={{ borderRadius: '8px' }} />
                        </Form.Item>

                        <Form.Item
                            name="topicDescription"
                            label={<span style={{ fontWeight: 600 }}>Mô tả</span>}
                            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                        >
                            <TextArea rows={4} showCount maxLength={500} style={{ borderRadius: '8px' }} />
                        </Form.Item>

                        <Form.Item label={<span style={{ fontWeight: 600 }}>Hình ảnh thumbnail</span>}>
                            {thumbnailPreview ? (
                                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '2px solid #cffafe', maxWidth: '300px' }}>
                                    <div style={{ aspectRatio: '16/9', position: 'relative' }}>
                                        <Image src={thumbnailPreview} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '8px', textAlign: 'center', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                                        <Button danger type="text" icon={<DeleteOutlined />} onClick={removeThumbnail}>
                                            Thay đổi ảnh
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Upload.Dragger
                                    beforeUpload={beforeUpload}
                                    accept="image/*"
                                    showUploadList={false}
                                    style={{ padding: '24px', background: '#f0f9ff', borderColor: '#cffafe', borderRadius: '12px' }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <CloudUploadOutlined style={{ color: '#0891b2', fontSize: '32px' }} />
                                    </p>
                                    <p className="ant-upload-text" style={{ color: '#0e7490' }}>Kéo thả hoặc click để tải ảnh</p>
                                    <p className="ant-upload-hint">Hỗ trợ PNG, JPG, GIF • Tối đa 5MB</p>
                                </Upload.Dragger>
                            )}
                        </Form.Item>

                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '32px' }}>
                            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={() => router.push("/my-topics")}
                                    style={{ height: '40px', borderRadius: '8px' }}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    icon={<SaveOutlined />}
                                    loading={isSubmitting}
                                    style={{ background: '#0891b2', borderColor: '#0891b2', height: '40px', borderRadius: '8px', minWidth: '140px' }}
                                >
                                    Lưu thay đổi
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}