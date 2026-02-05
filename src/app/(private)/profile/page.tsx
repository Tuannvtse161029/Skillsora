import { Tabs } from 'antd'
import React from 'react'
import ProfileInfo from './Profile'
import SubscriptionHistory from './SubcriptionHistory'

const ProfilePage = () => {
    return (
        <div className="w-full flex justify-center py-8">
            <div className="w-full max-w-4xl px-4">
                <Tabs
                    defaultActiveKey="info"
                    centered
                    className="ant-tabs-custom"
                    items={[
                        {
                            key: 'info',
                            label: 'Thông tin cá nhân',
                            children: <ProfileInfo />,
                        },
                        {
                            key: 'subscriptions',
                            label: 'Lịch sử mua gói',
                            children: <SubscriptionHistory />,
                        },
                    ]}
                    tabBarStyle={{
                        borderBottom: '2px solid #e5e7eb',
                    }}
                />
                <style>{`
                    .ant-tabs-custom .ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: #06b6d4 !important;
                        font-weight: 600;
                    }
                    .ant-tabs-custom .ant-tabs-ink-bar {
                        background-color: #06b6d4 !important;
                    }
                    .ant-tabs-custom .ant-tabs-tab {
                        color: #6b7280;
                        transition: all 0.3s ease;
                    }
                    .ant-tabs-custom .ant-tabs-tab:hover .ant-tabs-tab-btn {
                        color: #06b6d4 !important;
                    }
                `}</style>
            </div>
        </div>
    )
}

export default ProfilePage
