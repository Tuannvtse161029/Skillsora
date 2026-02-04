'use client';

import React from "react"

import { GetPagedTopicsRequest } from '@/types/topic';
import useTopicStore from '@/zustand/useTopicStore';
import { useDebounce } from 'ahooks';
import { Space, Input, Select, Button, Pagination, Divider } from 'antd';
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface IProps {
    query: GetPagedTopicsRequest;
    updateQuery: (key: keyof GetPagedTopicsRequest, value: string | number | boolean) => void;
}

const TopicQuery = (props: IProps) => {
    const { query, updateQuery } = props;
    const { topics } = useTopicStore();
    const [localSearchKey, setLocalSearchKey] = useState(query.searchKey);

    // Debounce giá trị nhập vào
    const debouncedSearchKey = useDebounce(localSearchKey!, { wait: 500 });

    // Cập nhật giá trị vào query khi debounce hoàn thành
    useEffect(() => {
        if (debouncedSearchKey !== query.searchKey) {
            updateQuery('searchKey', debouncedSearchKey);
        }
    }, [debouncedSearchKey, query.searchKey, updateQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchKey(e.target.value);
    };

    return (
        <div className='w-full space-y-4'>
            <Space
                size="middle"
                wrap
                className='w-full justify-center'
            >
                {/* Search Key */}
                <Input
                    placeholder='Tìm kiếm chủ đề...'
                    type="text"
                    value={localSearchKey}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined className='text-gray-400' />}
                    allowClear
                    style={{ width: '240px' }}
                />

                {/* OrderOn */}
                <Select
                    placeholder='Sắp xếp theo'
                    value={query.orderOn || undefined}
                    onChange={(value) => updateQuery('orderOn', value)}
                    style={{ width: '160px' }}
                    options={[
                        { label: 'Tên', value: 'topicName' },
                        { label: 'Mô tả', value: 'description' },
                        { label: 'Ngày tạo', value: 'createdOn' },
                    ]}
                />

                {/* Sort Direction */}
                <Select
                    value={query.isAscending}
                    onChange={(value) => updateQuery('isAscending', value)}
                    style={{ width: '140px' }}
                    options={[
                        { label: 'Tăng dần', value: true },
                        { label: 'Giảm dần', value: false },
                    ]}
                />

                {/* Page Size */}
                <Select
                    value={query.size}
                    onChange={(value) => updateQuery('size', value as number)}
                    style={{ width: '120px' }}
                    options={[
                        { label: '10 mục', value: 10 },
                        { label: '25 mục', value: 25 },
                        { label: '50 mục', value: 50 },
                        { label: '100 mục', value: 100 },
                    ]}
                />
            </Space>

            {/* Pagination */}
            <div className='flex items-center justify-center'>
                <Pagination
                    current={query.page}
                    total={topics?.total || 0}
                    pageSize={query.size}
                    onChange={(page) => updateQuery('page', page)}
                    showSizeChanger={false}
                    simple
                />
            </div>
        </div>
    );
};
export default TopicQuery;
