'use client'

import { TopicDto } from '@/types/topic'
import Image from 'next/image'
import { Card, Tag } from 'antd'
import { BookOutlined, ArrowRightOutlined } from '@ant-design/icons'

interface IProps {
    topic: TopicDto
    onClick?: () => void
}

const gradients = [
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-cyan-500 via-lime-500 to-teal-500',
    'from-orange-500 via-amber-500 to-red-500',
    'from-cyan-500 via-cyan-500 to-indigo-500',
]

export default function TopicCard({ topic, onClick }: IProps) {
    const createdAt = topic.createdOn ? new Date(topic.createdOn).toLocaleDateString('vi-VN') : ''

    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]

    return (
        <Card
            onClick={onClick}
            hoverable
            className="rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer"
            styles={{ body: { padding: 0 } }}
        >
            {/* IMAGE OR GRADIENT */}
            {topic.thumbnail ? (
                <Image
                    src={topic.thumbnail}
                    alt={topic.topicName}
                    width={1920}
                    height={1080}
                    className="w-full h-32 object-cover"
                />
            ) : (
                <div className={`w-full h-32 bg-gradient-to-br ${randomGradient}`} />
            )}

            {/* CONTENT */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {topic.topicName}
                </h2>

                <p className="text-sm text-gray-500 mb-3 min-h-10 line-clamp-2">
                    {topic.description}
                </p>

                <div className="flex justify-between items-center mt-2">
                    <Tag color="gold" className="font-semibold flex items-center gap-1">
                        <BookOutlined /> {topic.totalSubTopic} Bài học
                    </Tag>

                    <span className="text-xs text-gray-400 italic">{createdAt}</span>
                </div>

                <div className="mt-4">
                    <div className="bg-cyan-600 text-white w-full py-2 rounded-lg font-medium text-center flex items-center justify-center gap-1 hover:bg-cyan-700 transition-all">
                        Học ngay <ArrowRightOutlined />
                    </div>
                </div>
            </div>
        </Card>
    )
}
