
import { Button, Card, Badge } from 'antd'
import { CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'

const benefits = [
    'Tạo flashcard không giới hạn',
    'Chia sẻ với bạn bè và cộng sự',
    'Phân tích tiến độ chi tiết',
    'Truy cập trên mọi thiết bị',
    'Sẽ sớm có: AI tutor cá nhân hóa',
    'Hỗ trợ khách hàng 24/7'
]

export default function CTASection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-r from-cyan-600 to-cyan-600 text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Sẵn Sàng Bắt Đầu Hành Trình Học Tập Của Bạn?
                        </h2>

                        <p className="text-lg text-white/90 mb-8">
                            Tham gia hàng triệu học sinh trên khắp thế giới và trải nghiệm cách học tập mới, hiệu quả hơn.
                        </p>

                        {/* BENEFITS */}
                        <div className="space-y-4 mb-8">
                            {benefits.map((b, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircleOutlined className="text-white text-lg" />
                                    <span>{b}</span>
                                </div>
                            ))}
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                type="default"
                                className="!px-8 !py-4 !font-semibold !text-cyan-600 !bg-white hover:!opacity-90 flex items-center gap-2"
                            >
                                Đăng Ký Miễn Phí <ArrowRightOutlined />
                            </Button>

                            <Button
                                ghost
                                className="!px-8 !py-4 !font-semibold !text-white border-white hover:!bg-white/10 flex items-center gap-2"
                            >
                                Xem Thêm
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative h-[400px] md:h-[500px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="space-y-6 px-6 w-full max-w-sm">

                                <Card bordered className="bg-white/10 !border-white/20 backdrop-blur-sm text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge color="gold" />
                                        <span className="font-semibold">Flashcard Pro</span>
                                    </div>
                                    <p className="text-sm text-black">Tạo flashcard với hình ảnh, âm thanh & video</p>
                                </Card>

                                <Card bordered className="bg-white/10 !border-white/20 backdrop-blur-sm text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge color="cyan" />
                                        <span className="font-semibold">Quiz Riêng bạn</span>
                                    </div>
                                    <p className="text-sm text-black">Tự tạo nội dung của bạn sau khi mua gói</p>
                                </Card>

                                <Card bordered className="bg-white/10 !border-white/20 backdrop-blur-sm text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge color="pink" />
                                        <span className="font-semibold">Phân Tích Nâng Cao</span>
                                    </div>
                                    <p className="text-sm text-black">Xem insight chi tiết về học tập của bạn</p>
                                </Card>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
