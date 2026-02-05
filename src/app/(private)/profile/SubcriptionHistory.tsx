/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { UserSubscription } from "@/types/userSubscription"
import useUserStore from "@/zustand/useUserStore"
import { Button, Pagination, Table } from "antd"
import { useEffect } from "react"

const SubscriptionHistory = () => {
    const { userSubscriptions, loading, setSubscriptionPage, getUserSubsctiptions, subscriptionQuery, setSubscriptionSize, toggleSubscriptionSort } = useUserStore()

    useEffect(() => {
        getUserSubsctiptions()
    }, [
        subscriptionQuery.page,
        subscriptionQuery.size,
        subscriptionQuery.isAscending,
    ])


    const columns = [
        {
            title: 'Gói',
            dataIndex: ['package', 'name'],
        },
        {
            title: 'Giá',
            render: (_: any, r: UserSubscription) =>
                r.package.finalPrice!.toLocaleString() + '₫',
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'startDate',
            render: (d: string) => new Date(d).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Kết thúc',
            dataIndex: 'endDate',
            render: (d: string) => new Date(d).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Tính năng',
            dataIndex: ['package', 'features'],
            render: (d: string) => <p>{d}</p>,
        },
        {
            title: 'Mô tả',
            dataIndex: ['package', 'description'],
            render: (d: string) => <p>{d}</p>,
        },
        {
            title: 'Trạng thái',
            render: (_: any, r: UserSubscription) =>
                new Date(r.endDate) > new Date() ? 'Đang sử dụng' : 'Hết hạn',
        },
    ]

    return (
        <>
            <Button type="primary" onClick={toggleSubscriptionSort} className="mb-2">
                Sắp xếp: {subscriptionQuery.isAscending ? 'Tăng dần' : 'Giảm dần'}
            </Button>

            <Table
                loading={loading}
                dataSource={userSubscriptions?.items}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="ant-table-custom"
            />

            {userSubscriptions && userSubscriptions.total > 0 && (
                <div className="mt-8 flex justify-center py-6">
                    <Pagination
                        current={userSubscriptions.page}
                        pageSize={userSubscriptions.size}
                        total={userSubscriptions.total}
                        onChange={(page) => setSubscriptionPage(page)}
                        showSizeChanger
                        onShowSizeChange={(_, size) => setSubscriptionSize(size)}
                        showQuickJumper
                        className="ant-pagination-custom"
                    />
                </div>
            )}
            <style>{`
                .ant-table-custom .ant-table-thead > tr > th {
                    background-color: #f0f9fa !important;
                    color: #1f2937 !important;
                    font-weight: 600;
                    border-bottom: 2px solid #d1e9ed !important;
                }
                .ant-table-custom .ant-table-tbody > tr:hover > td {
                    background-color: #f0fffe !important;
                }
                .ant-pagination-custom .ant-pagination-item-active {
                    border-color: #06b6d4 !important;
                    background-color: #06b6d4 !important;
                }
                .ant-pagination-custom .ant-pagination-item-active a {
                    color: white !important;
                }
                .ant-pagination-custom .ant-pagination-item:hover a {
                    color: #06b6d4 !important;
                }
                .ant-pagination-custom .ant-pagination-item-link:hover {
                    color: #06b6d4 !important;
                }
            `}</style>
        </>
    )
}

export default SubscriptionHistory
