import Image from 'next/image';
import { Card, Button, Tag, Rate, Row, Col } from 'antd';
import { ArrowRightIcon, UsersIcon } from '@heroicons/react/24/outline';
import { FaBookOpen } from 'react-icons/fa';

const studySets = [
    {
        id: 1,
        title: 'Sinh Học 10 - Quá Trình Nhân Đôi DNA',
        category: 'Sinh Học',
        cards: 45,
        students: 1204,
        rating: 4.8,
        image: '/topics/biology.jpg',
    },
    {
        id: 2,
        title: 'Tiếng Anh - Từ Vựng Band 7.0+ IELTS',
        category: 'Tiếng Anh',
        cards: 320,
        students: 3421,
        rating: 4.9,
        image: '/topics/english.jpg',
    },
    {
        id: 3,
        title: 'Toán 11 - Đạo Hàm và Ứng Dụng',
        category: 'Toán Học',
        cards: 82,
        students: 892,
        rating: 4.7,
        image: '/topics/math.jpg',
    },
    {
        id: 4,
        title: 'Lịch Sử - Chiến Tranh Thế Giới Lần Thứ Hai',
        category: 'Lịch Sử',
        cards: 156,
        students: 2341,
        rating: 4.9,
        image: '/topics/history.jpg',
    },
    {
        id: 5,
        title: 'Hóa Học - Bảng Tuần Hoàn & Liên Kết Hóa',
        category: 'Hóa Học',
        cards: 201,
        students: 1876,
        rating: 4.8,
        image: '/topics/chemistry.jpg',
    },
    {
        id: 6,
        title: 'Địa Lý - Địa Hình Và Khí Hậu Toàn Cầu',
        category: 'Địa Lý',
        cards: 128,
        students: 954,
        rating: 4.6,
        image: '/topics/geography.jpg',
    },
];

export default function StudySetsSection() {
    return (
        <section id='studySets' style={{ padding: '80px 0', background: '#fafafa' }}>
            <div style={{ maxWidth: 1200, marginInline: 'auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}> Study Sets Nổi Bật </h2>
                    <p style={{ opacity: 0.8, fontSize: 18 }}> Khám phá hàng nghìn bộ học tập được tạo bởi giáo viên và học sinh </p>
                </div>
                <Row gutter={[24, 24]}>
                    {studySets.map(set => (
                        <Col key={set.id} xs={24} md={12} lg={8}>
                            <Card hoverable style={{ borderRadius: 16, overflow: 'hidden', padding: '10px' }} cover={<div style={{ position: 'relative', height: 160 }}>
                                <Image src={set.image} alt={set.category} fill style={{ objectFit: 'cover' }} />
                                <Tag color="default" style={{ position: 'absolute', top: 12, left: 12, fontWeight: 600, background: 'rgba(255,255,255,.9)' }}> {set.category} </Tag> </div>} >
                                <h3 style={{ fontSize: 16, fontWeight: 700, minHeight: 48, marginBottom: 16, textAlign: 'left' }}> {set.title} </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}> <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: .85 }}> <FaBookOpen size={16} />
                                    <span>{set.cards} thẻ</span>
                                </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: .85 }}>
                                        <UsersIcon width={16} height={16} /> <span>{set.students.toLocaleString()}</span> </div> </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                    <Rate allowHalf disabled value={set.rating} /> <span style={{ fontWeight: 600 }}>{set.rating}</span> </div>
                                <Button type="primary" size="large" className='!bg-cyan-600 hover:bg-cyan-700' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600 }} > Học Ngay <ArrowRightIcon width={18} height={18} />
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row> <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Button
                        className='!bg-cyan-600 hover:bg-cyan-700'
                        type="default"
                        size="large"
                        style={{ paddingInline: 32, borderWidth: 2, fontWeight: 600 }}
                        icon={<ArrowRightIcon width={18} height={18} />}
                    >
                        Xem Tất Cả Bài Học
                    </Button>
                </div>
            </div>
        </section>
    )
}