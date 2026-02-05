'use client'

import { MailOutlined, PhoneOutlined, CalendarOutlined, TeamOutlined, EditOutlined, LockOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/zustand/useUserStore'
import { Button, Avatar, Row, Col, Spin } from 'antd'

const ProfileInfo = () => {
    const { user, authenticated, getUser } = useUserStore()
    const router = useRouter()

    useEffect(() => {
        if (!authenticated) {
            router.push('/signin')
            return
        }
        getUser()
    }, [authenticated, getUser, router])

    if (!user) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin size="large" tip="Đang tải..." />
            </div>
        )
    }

    const initials = user.fullName
        ?.split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase() || 'U'

    const genderText = user.gender === 'Male' ? 'Nam' : user.gender === 'Female' ? 'Nữ' : user.gender || 'Chưa cập nhật'

    return (
        <div style={{ minHeight: '100vh', paddingTop: '32px', paddingBottom: '32px' }}>
            <div style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                {/* Header with Back Button and Profile Title */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>Thông tin cá nhân</h1>
                        <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Quản lý và cập nhật thông tin hồ sơ của bạn</p>
                    </div>
                </div>

                {/* User Profile Section */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', marginBottom: '40px', padding: '20px 0', borderBottom: '2px solid #cffafe' }}>
                    <Avatar
                        size={80}
                        style={{ background: '#06b6d4', color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
                    >
                        {initials}
                    </Avatar>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>{user.fullName}</h2>
                        <p style={{ color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                            <MailOutlined style={{ color: '#06b6d4' }} /> {user.email}
                        </p>
                    </div>
                </div>

                {/* Profile Details Grid - 4 columns */}
                <Row gutter={[24, 32]} style={{ marginBottom: '32px' }}>
                    {/* Email */}
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ borderBottom: '3px solid #06b6d4', paddingBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <MailOutlined style={{ fontSize: '18px', color: '#06b6d4' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Email</span>
                            </div>
                            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '14px', fontWeight: 500 }}>{user.email}</p>
                        </div>
                    </Col>

                    {/* Phone */}
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ borderBottom: '3px solid #06b6d4', paddingBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <PhoneOutlined style={{ fontSize: '18px', color: '#06b6d4' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Số điện thoại</span>
                            </div>
                            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '14px', fontWeight: 500 }}>{user.phoneNumber || 'Chưa cập nhật'}</p>
                        </div>
                    </Col>

                    {/* Gender */}
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ borderBottom: '3px solid #06b6d4', paddingBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <TeamOutlined style={{ fontSize: '18px', color: '#06b6d4' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Giới tính</span>
                            </div>
                            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '14px', fontWeight: 500 }}>{genderText}</p>
                        </div>
                    </Col>

                    {/* Birthdate */}
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ borderBottom: '3px solid #06b6d4', paddingBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <CalendarOutlined style={{ fontSize: '18px', color: '#06b6d4' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Ngày sinh</span>
                            </div>
                            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '14px', fontWeight: 500 }}>
                                {user.birthdate ? new Date(user.birthdate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Additional Info Grid */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px', padding: '24px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '8px' }}>
                    <Col xs={24} sm={12} md={8}>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Ngày tạo tài khoản</p>
                            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '13px' }}>{new Date(user.createdOn).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </Col>
                    {user.updatedOn && (
                        <Col xs={24} sm={12} md={8}>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 8px 0', textTransform: 'uppercase' }}>Ngày cập nhật</p>
                                <p style={{ margin: 0, color: '#0c4a6e', fontSize: '13px', fontFamily: 'monospace' }}>{new Date(user.updatedOn).toLocaleDateString('vi-VN')}</p>
                            </div>
                        </Col>
                    )}
                </Row>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="large"
                        style={{ height: '44px', background: '#06b6d4', borderColor: '#06b6d4', fontSize: '14px', fontWeight: 600, paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        Chỉnh sửa hồ sơ
                    </Button>
                    <Button
                        icon={<LockOutlined />}
                        size="large"
                        style={{ height: '44px', fontSize: '14px', fontWeight: 600, border: '2px solid #06b6d4', color: '#06b6d4', paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        Thay đổi mật khẩu
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
