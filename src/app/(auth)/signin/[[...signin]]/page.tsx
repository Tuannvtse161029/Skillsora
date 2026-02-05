"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Form, Input, Button, Checkbox, Divider, Typography, message } from "antd"
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons"
import axiosClient from "@/utils/axios/axiosClient"
import { AUTH_SIGNIN } from "@/constants/apis"
import useUserStore from "@/zustand/useUserStore"

const { Title, Text } = Typography

interface SignInValues {
    email: string
    password: string
    remember: boolean
}

export default function SignInPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { loginSuccess, getUser } = useUserStore();

    const onFinish = async (values: SignInValues) => {
        setLoading(true)
        try {
            // Simulate API call
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { remember, ...payload } = values
            const formData = new FormData()
            formData.append("Email", values.email)
            formData.append("Password", values.password)

            const response = await axiosClient.post(AUTH_SIGNIN, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            const { token, refreshToken } = response.data.responseRequest

            loginSuccess({ token, refreshToken });



            message.success("Đăng nhập thành công!")
            await getUser();
            router.push("/")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-cyan-100 p-8">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <Link href={"/"}>
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-white font-bold text-2xl">S</span>
                            </div>
                        </Link>
                        <Title level={2} style={{ margin: 0, color: "#0e7490" }}>
                            Chào mừng trở lại
                        </Title>
                        <Text type="secondary">Đăng nhập để tiếp tục học tập</Text>
                    </div>

                    {/* Form */}
                    <Form
                        name="signin"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        requiredMark={false}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-cyan-500" />}
                                placeholder="Email"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Vui lòng nhập mật khẩu" },
                                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-cyan-500" />}
                                placeholder="Mat khau"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="flex items-center justify-between">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                </Form.Item>
                                <Link href="/forgot-password" className="text-cyan-600 hover:text-cyan-700">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                block
                                className="h-12 rounded-lg font-medium"
                                style={{ backgroundColor: "#0891b2" }}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Divider */}
                    <Divider plain>
                        <Text type="secondary">Hoặc đăng nhập với</Text>
                    </Divider>

                    {/* Social Login */}
                    <div className="flex gap-4">
                        <Button
                            size="large"
                            icon={<GoogleOutlined />}
                            block
                            className="h-12 rounded-lg flex items-center justify-center"
                        >
                            Google
                        </Button>
                        <Button
                            size="large"
                            icon={<FacebookOutlined />}
                            block
                            className="h-12 rounded-lg flex items-center justify-center"
                        >
                            Facebook
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <Text type="secondary">Chua co tai khoan? </Text>
                        <Link href="/signup" className="text-cyan-600 hover:text-cyan-700 font-medium">
                            Đăng ký ngay
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <Text type="secondary" className="text-sm">
                        Bằng việc đăng nhập, bạn đồng ý với{" "}
                        <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700">
                            Chính sách bảo mật
                        </Link>{" "}
                        của chúng tôi
                    </Text>
                </div>
            </div>
        </div>
    )
}
