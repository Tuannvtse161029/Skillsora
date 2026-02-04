"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Form, Input, Button, Select, Divider, Typography, Row, Col } from "antd"
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    GoogleOutlined,
    FacebookOutlined,
} from "@ant-design/icons"
import { AUTH_SIGNUP } from "@/constants/apis"
import axiosClient from "@/utils/axios/axiosClient"
import { setCookie } from "cookies-next"

const { Title, Text } = Typography
const { Option } = Select

interface SignUpValues {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmedPassword: string
    phoneNumber: string
    gender: string
}

export default function SignUpPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = async (values: SignUpValues) => {
        setLoading(true)
        try {

            const response = await axiosClient.post(AUTH_SIGNUP, values)
            const { signUpSessionId, expiredTime: expiredISO } = response.data.responseRequest;
            const expiredTime = new Date(expiredISO);
            const now = new Date()
            const diff = Math.floor((expiredTime.getTime() - now.getTime()) / 1000)

            setCookie("__signUpSessionId", signUpSessionId, {
                maxAge: diff,
                path: '/',
                sameSite: 'lax'
            })
            setCookie("__signUpExpiredTime", expiredTime.toISOString(), {
                maxAge: diff,
                path: '/',
                sameSite: 'lax'
            })

            localStorage.setItem("signUpEmail", values.email)

            router.push(`/verify`)
            form.resetFields();
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-cyan-100 p-8">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-white font-bold text-2xl">S</span>
                        </div>
                        <Title level={2} style={{ margin: 0, color: "#0e7490" }}>
                            Tạo tài khoản mới
                        </Title>
                        <Text type="secondary">Bắt đầu hành trình học tập cùng Skillsora</Text>
                    </div>

                    {/* Form */}
                    <Form
                        form={form}
                        name="signup"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        requiredMark={false}
                    >
                        {/* First Name & Last Name */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: "Vui long nhap ho" }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-cyan-500" />}
                                        placeholder="Ho"
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: "Vui long nhap ten" }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-cyan-500" />}
                                        placeholder="Ten"
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Email */}
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Vui long nhap email" },
                                { type: "email", message: "Email khong hop le" },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-cyan-500" />}
                                placeholder="Email"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        {/* Phone Number & Gender */}
                        <Row gutter={16}>
                            <Col span={14}>
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                        { required: true, message: "Vui long nhap so dien thoai" },
                                        { pattern: /^[0-9]{10,11}$/, message: "So dien thoai khong hop le" },
                                    ]}
                                >
                                    <Input
                                        prefix={<PhoneOutlined className="text-cyan-500" />}
                                        placeholder="So dien thoai"
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="gender"
                                    rules={[{ required: true, message: "Chon gioi tinh" }]}
                                >
                                    <Select placeholder="Gioi tinh" size="large" className="rounded-lg">
                                        <Option value="Male">Nam</Option>
                                        <Option value="Female">Nữ</Option>
                                        <Option value="Other">Khác</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Vui long nhap mat khau" },
                                { min: 8, message: "Mat khau phai co it nhat 8 ky tu" },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: "Mat khau phai co chu hoa, chu thuong va so",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-cyan-500" />}
                                placeholder="Mat khau"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        {/* Confirm Password */}
                        <Form.Item
                            name="confirmedPassword"
                            dependencies={["password"]}
                            rules={[
                                { required: true, message: "Vui long xac nhan mat khau" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error("Mat khau xac nhan khong khop"))
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-cyan-500" />}
                                placeholder="Xac nhan mat khau"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        {/* Password Requirements */}
                        <div className="bg-cyan-50 rounded-lg p-4 mb-6">
                            <Text type="secondary" className="text-sm">
                                Mat khau phai co:
                            </Text>
                            <ul className="text-sm text-gray-500 mt-2 space-y-1 pl-4">
                                <li>It nhat 8 ky tu</li>
                                <li>It nhat 1 chu hoa (A-Z)</li>
                                <li>It nhat 1 chu thuong (a-z)</li>
                                <li>It nhat 1 so (0-9)</li>
                            </ul>
                        </div>

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
                                Dang ky
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Divider */}
                    <Divider plain>
                        <Text type="secondary">Hoac dang ky voi</Text>
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

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <Text type="secondary">Da co tai khoan? </Text>
                        <Link href="/signin" className="text-cyan-600 hover:text-cyan-700 font-medium">
                            Dang nhap ngay
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <Text type="secondary" className="text-sm">
                        Bang viec dang ky, ban dong y voi{" "}
                        <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700">
                            Chinh sach bao mat
                        </Link>{" "}
                        cua chung toi
                    </Text>
                </div>
            </div>
        </div>
    )
}
