'use client'

import useUserStore from '@/zustand/useUserStore'
import Link from 'next/link'
import { Dropdown, Avatar, Badge, Button, Space, Divider } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'

const UserProfileHeader = () => {
    const { user, logout } = useUserStore()


    if (!user) return null

    const initials = user.fullName
        ?.split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase() || 'U'

    const handleLogout = () => {
        logout()
    }

    const dropdownContent = (
        <div style={{ width: '320px' }}>
            {/* Profile Header */}
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)', padding: '16px', color: 'white' }}>
                <Space>
                    <Avatar
                        size={48}
                        style={{ background: '#ffffff', color: '#10b981', fontSize: '20px', fontWeight: 'bold' }}
                    >
                        {initials}
                    </Avatar>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.fullName}</div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>{user.email}</div>
                    </div>
                </Space>
            </div>

            {/* Profile Info */}
            <div style={{ padding: '12px 16px' }}>
                {user.phoneNumber && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#666' }}>Số điện thoại:</span>
                        <span style={{ fontWeight: 500, color: '#000' }}>{user.phoneNumber}</span>
                    </div>
                )}
                {user.gender && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#666' }}>Giới tính:</span>
                        <span style={{ fontWeight: 500, color: '#000' }}>
                            {user.gender === 'Male' ? 'Nam' : user.gender === 'Female' ? 'Nữ' : 'Khác'}
                        </span>
                    </div>
                )}
                {user.emailConfirm !== undefined && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#666' }}>Email:</span>
                        <Badge
                            status={user.emailConfirm ? 'success' : 'warning'}
                            text={user.emailConfirm ? 'Đã xác nhận' : 'Chưa xác nhận'}
                        />
                    </div>
                )}
            </div>

            <Divider style={{ margin: '8px 0' }} />

            {/* Actions */}
            <div style={{ padding: '8px' }}>
                <Link href="/profile">
                    <Button
                        type="text"
                        block
                        icon={<UserOutlined />}
                        style={{ textAlign: 'left', color: '#666' }}
                    >
                        Xem hồ sơ
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button
                        type="text"
                        block
                        icon={<SettingOutlined />}
                        style={{ textAlign: 'left', color: '#666' }}
                    >
                        Cài đặt
                    </Button>
                </Link>
                <Button
                    type="text"
                    block
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    style={{ textAlign: 'left', color: '#ef4444' }}
                >
                    Đăng xuất
                </Button>
            </div>
        </div>
    )

    return (
        <Dropdown menu={{ items: [{ label: dropdownContent, key: '0' }] }} trigger={['click']}>
            <Button
                type="text"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px' }}
            >
                <Avatar size={32} style={{ background: '#10b981', color: '#ffffff', fontWeight: 'bold' }}>
                    {initials}
                </Avatar>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.fullName}
                </span>
            </Button>
        </Dropdown>
    )
}

export default UserProfileHeader
