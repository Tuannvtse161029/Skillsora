"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    Button,
    Input,
    Form,
    Upload,
    message
} from "antd"
import type { UploadFile, RcFile } from "antd/es/upload/interface"
import { ArrowLeftOutlined, DeleteOutlined, CloudUploadOutlined } from "@ant-design/icons"
import axiosClient from "@/utils/axios/axiosClient"

const { TextArea } = Input

interface FormValues {
    topicName: string
    topicDescription: string
}

export default function CreateTopicPage() {
    const router = useRouter()
    const [form] = Form.useForm()

    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

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
        setIsDragging(false)
        return false
    }

    const removeThumbnail = () => {
        setFileList([])
        setThumbnailPreview(null)
    }

    const handleSubmit = async (values: FormValues) => {
        if (fileList.length === 0) {
            message.error("Vui lòng chọn hình ảnh thumbnail!")
            return
        }

        setIsSubmitting(true)

        try {
            const submitData = new FormData()
            submitData.append("TopicName", values.topicName)
            submitData.append("TopicDescription", values.topicDescription)
            if (fileList[0]) {
                submitData.append("thumbnail", fileList[0] as RcFile)
            }

            await axiosClient.post("/my-topics", submitData, {
                headers: { "Content-Type": "multipart/form-data" }
            })


            message.success("Tạo chủ đề thành công!")
            router.push("/my-topics")
        } catch (error) {
            console.error("Error creating topic:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
            <div className="max-w-2xl mx-auto py-12 px-4">
                {/* Back Button */}
                <Link href="/my-topics">
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        className="!text-cyan-600 hover:!text-cyan-700 !mb-8"
                    >
                        Quay lại
                    </Button>
                </Link>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Tạo chủ đề mới</h1>
                        <p className="text-cyan-100">Điền thông tin để bắt đầu hành trình học tập của bạn</p>
                    </div>

                    <div className="p-8">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            requiredMark="optional"
                            className="space-y-6"
                        >
                            {/* Topic Name */}
                            <Form.Item
                                name="topicName"
                                label={<span className="text-gray-700 font-semibold">Tên chủ đề</span>}
                                rules={[
                                    { required: true, message: "Vui lòng nhập tên chủ đề" },
                                    { min: 3, message: "Tên chủ đề phải có ít nhất 3 ký tự" },
                                ]}
                            >
                                <Input
                                    placeholder="Ví dụ: Tiếng Anh cơ bản..."
                                    size="large"
                                    className="border-cyan-200 focus:border-cyan-500 rounded-xl"
                                />
                            </Form.Item>

                            {/* Topic Description */}
                            <Form.Item
                                name="topicDescription"
                                label={<span className="text-gray-700 font-semibold">Mô tả chi tiết</span>}
                                rules={[
                                    { required: true, message: "Vui lòng nhập mô tả chủ đề" },
                                    { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
                                ]}
                            >
                                <TextArea
                                    placeholder="Nhập mô tả về nội dung, mục tiêu học tập..."
                                    rows={4}
                                    maxLength={500}
                                    showCount
                                    className="border-cyan-200 focus:border-cyan-500 rounded-xl !resize-none"
                                />
                            </Form.Item>

                            {/* Thumbnail Upload */}
                            <Form.Item
                                label={<span className="text-gray-700 font-semibold">Hình ảnh thumbnail</span>}
                                required
                            >
                                {thumbnailPreview ? (
                                    <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-200 group">
                                        <div className="aspect-video relative">
                                            <Image
                                                src={thumbnailPreview || "/placeholder.svg"}
                                                alt="Thumbnail preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />

                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            onClick={removeThumbnail}
                                            className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <DeleteOutlined className="text-lg" />
                                        </button>

                                        {/* File name */}
                                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 shadow-md">
                                            {(fileList[0] as RcFile)?.name}
                                        </div>
                                    </div>
                                ) : (
                                    <Upload.Dragger
                                        beforeUpload={beforeUpload}
                                        accept="image/*"
                                        showUploadList={false}
                                        className={`!rounded-2xl !border-2 !border-dashed transition-all duration-300 ${isDragging
                                            ? "!border-cyan-500 !bg-cyan-50"
                                            : "!border-cyan-300 !bg-cyan-50/50 hover:!border-cyan-400 hover:!bg-cyan-100/50"
                                            }`}
                                    >
                                        <div className="py-12 px-4">
                                            <div className="flex justify-center mb-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                                                    <CloudUploadOutlined className="text-3xl text-white" />
                                                </div>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800 mb-2">
                                                Kéo hình ảnh vào đây
                                            </p>
                                            <p className="text-sm text-gray-600 mb-4">
                                                hoặc
                                            </p>
                                            <Button
                                                type="primary"
                                                size="large"
                                                className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500 !rounded-lg"
                                            >
                                                Chọn file từ máy
                                            </Button>
                                            <p className="text-xs text-gray-500 mt-4">
                                                Hỗ trợ PNG, JPG, GIF • Tối đa 5MB
                                            </p>
                                        </div>
                                    </Upload.Dragger>
                                )}
                            </Form.Item>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-cyan-100">
                                <Button
                                    size="large"
                                    className="flex-1 !text-gray-700 !border-gray-300 hover:!border-gray-400 rounded-xl"
                                    onClick={() => router.push("/my-topics")}
                                    disabled={isSubmitting}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    className="flex-1 !bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500 rounded-xl font-semibold text-base"
                                    loading={isSubmitting}
                                >
                                    {isSubmitting ? "Đang tạo..." : "Tạo chủ đề"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
