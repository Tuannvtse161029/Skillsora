"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Form, Input, Button, Typography, message } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { getCookie } from "cookies-next"
import axiosClient from "@/utils/axios/axiosClient"

const { Title, Text } = Typography

interface VerifyValues {
    otp: string
}

export default function VerifyPage() {
    const router = useRouter()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [isExpired, setIsExpired] = useState(false)
    const [email, setEmail] = useState<string>("")

    useEffect(() => {


        const expiredTimeStr = decodeURIComponent(getCookie("__signUpExpiredTime")!)
        const emailFromStorage = localStorage.getItem("signUpEmail")

        if (emailFromStorage) {
            setEmail(emailFromStorage)
        }

        if (expiredTimeStr) {
            const expiredTime = new Date(expiredTimeStr)
            const now = new Date()
            const diff = Math.floor((expiredTime.getTime() - now.getTime()) / 1000)


            if (diff <= 0) {
                setIsExpired(true)
                setTimeLeft(0)
            } else {
                setTimeLeft(diff)
            }
        }
    }, [])

    useEffect(() => {
        if (isExpired) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsExpired(true)
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isExpired])


    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    const onFinish = async (values: VerifyValues) => {
        if (isExpired) {
            message.error("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới!")
            return
        }

        setLoading(true)
        try {
            // Validate OTP format
            if (values.otp.length !== 6) {
                message.error("Mã OTP phải có 6 chữ số!")
                setLoading(false)
                return
            }
            const sessionId = getCookie("__signUpSessionId")
            await axiosClient.post(`/auth/sign_up/${sessionId}/attempt_verification`, {
                code: values.otp
            },
                {
                    headers: { "Content-Type": "multipart/form-data" }
                })


            message.success("Xác minh email thành công!")
            // Clear localStorage
            localStorage.removeItem("signUpEmail")
            // Redirect to signin
            router.push("/signin")
        } finally {
            setLoading(false)
        }
    }

    // const handleResendOTP = async () => {
    //     if (!email) {
    //         message.error("Không tìm thấy email. Vui lòng đăng ký lại!")
    //         return
    //     }

    //     try {
    //         setLoading(true)
    //         // Simulate API call to resend OTP
    //         console.log("Resending OTP to:", email)
    //         await new Promise((r) => setTimeout(r, 1000))

    //         // Reset timer (set to 5 minutes)
    //         setTimeLeft(300)
    //         setIsExpired(false)
    //         message.success("Mã OTP mới đã được gửi đến email của bạn!")
    //     } catch (error) {
    //         message.error("Lỗi khi gửi lại mã OTP!")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl border border-cyan-100 shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                            <MailOutlined className="text-2xl text-white" />
                        </div>
                        <Title level={2} className="!mb-2">
                            Xác minh email
                        </Title>
                        <Text type="secondary">
                            Chúng tôi đã gửi mã xác minh đến
                            <br />
                            <span className="font-semibold text-gray-700">{email || "email của bạn"}</span>
                        </Text>
                    </div>

                    {/* Form */}
                    <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
                        {/* OTP Input */}
                        <Form.Item
                            name="otp"
                            label={<span className="font-medium text-gray-700">Mã OTP</span>}
                            rules={[
                                { required: true, message: "Vui lòng nhập mã OTP" },
                                {
                                    pattern: /^\d{6}$/,
                                    message: "Mã OTP phải gồm 6 chữ số",
                                },
                            ]}
                        >
                            <Input
                                placeholder="000000"
                                size="large"
                                maxLength={6}
                                className="text-center text-2xl tracking-widest font-bold"
                                prefix={<LockOutlined className="text-cyan-500" />}
                                disabled={isExpired}
                            />
                        </Form.Item>

                        {/* Countdown Timer */}
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border border-cyan-100">
                            <div className="flex items-center justify-center gap-6">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 font-medium mb-1">Hết hạn trong</div>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="bg-white rounded-lg px-3 py-2 min-w-[50px] text-center">
                                            <span className="text-2xl font-bold text-cyan-600">{String(minutes).padStart(2, "0")}</span>
                                            <div className="text-xs text-gray-500">phút</div>
                                        </div>
                                        <span className="text-2xl font-bold text-cyan-600">:</span>
                                        <div className="bg-white rounded-lg px-3 py-2 min-w-[50px] text-center">
                                            <span className="text-2xl font-bold text-cyan-600">{String(seconds).padStart(2, "0")}</span>
                                            <div className="text-xs text-gray-500">giây</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isExpired && (
                                <div className="text-center mt-2 text-red-500 text-sm font-medium">
                                    Mã OTP đã hết hạn
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            block
                            loading={loading}
                            disabled={isExpired}
                            className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500 !h-11 !font-semibold"
                        >
                            {isExpired ? "Mã OTP đã hết hạn" : "Xác minh"}
                        </Button>
                    </Form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Hoặc</span>
                        </div>
                    </div>

                    {/* Resend OTP
                    <div className="text-center">
                        <Text type="secondary" className="text-sm">
                            Không nhận được mã?
                        </Text>
                        <Button
                            type="text"
                            onClick={handleResendOTP}
                            loading={loading}
                            disabled={isExpired === false && timeLeft > 0}
                            className="!text-cyan-600 !font-semibold !p-0 !h-auto ml-1"
                        >
                            Gửi lại mã OTP
                        </Button>
                    </div> */}

                    {/* Footer */}
                    <div className="text-center mt-6 pt-6 border-t border-gray-100">
                        <Text type="secondary" className="text-sm">
                            Không phải tài khoản của bạn?
                        </Text>
                        <Link href="/signup" className="text-cyan-600 font-semibold text-sm hover:text-cyan-700">
                            {" "}
                            Đăng ký lại
                        </Link>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    Kiểm tra thư spam nếu bạn không thấy email.
                </p>
            </div>
        </div>
    )
}
