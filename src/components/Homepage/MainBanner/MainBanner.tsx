import { ArrowRightOutlined, BookOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className='relative bg-white flex items-center overflow-hidden'>
            {/* Background shapes */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-60'></div>
            <div className='absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-50'></div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32'>
                <div className='grid md:grid-cols-2 gap-12 items-center'>

                    {/* Left */}
                    <div className='space-y-6'>
                        <h1 className='text-5xl md:text-6xl font-bold text-slate-900 leading-tight'>
                            Cùng học với <span className='text-cyan-500'>Skillsora</span>
                        </h1>

                        <p className='text-lg text-slate-600 leading-relaxed'>
                            Tạo flashcard, quizzes và study sets. Luyện tập hiệu quả và chia sẻ kiến thức với cộng đồng học sinh.
                        </p>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 pt-4 justify-center'>
                            <Link href='/topics'>
                                <button className='inline-flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors'>
                                    Bắt Đầu Ngay
                                    <ArrowRightOutlined size={18} />
                                </button>
                            </Link>
                            <button className='inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-lg font-semibold hover:bg-cyan-50 transition-colors'>
                                Tìm Hiểu Thêm
                            </button>
                        </div>
                    </div>

                    {/* Right visual */}
                    <div className='relative h-96 md:h-[450px]'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='relative w-full max-w-sm'>

                                {/* Card 1 */}
                                <div className='absolute -top-8 -left-8 w-56 h-48 bg-white rounded-xl shadow-lg p-6 border-2 border-cyan-100 transform -rotate-6'>
                                    <div className='h-full flex flex-col justify-between'>
                                        <div>
                                            <p className='text-sm font-semibold text-cyan-500 mb-2'>Câu Hỏi</p>
                                            <p className='text-lg font-bold text-slate-900'>
                                                Photosynthesis là gì?
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2 text-cyan-500'>
                                            <BookOutlined />
                                            <span className='text-sm font-medium'>Sinh Học</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className='absolute top-4 right-0 w-56 h-48 bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-xl shadow-lg p-6 border-2 border-cyan-200 transform rotate-3'>
                                    <div className='h-full flex flex-col justify-between'>
                                        <div>
                                            <p className='text-sm font-semibold text-cyan-600 mb-2'>Câu Trả Lời</p>
                                            <p className='text-base font-semibold text-slate-900'>
                                                Quá trình chuyển ánh sáng thành năng lượng hóa học trong thực vật.
                                            </p>
                                        </div>
                                        <div className='w-full bg-cyan-200 rounded-full h-1.5'></div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className='absolute -bottom-4 left-8 w-56 h-48 bg-white rounded-xl shadow-lg p-6 border-2 border-cyan-100 transform -rotate-2'>
                                    <div className='h-full flex flex-col justify-between'>
                                        <div>
                                            <p className='text-sm font-semibold text-cyan-500 mb-2'>Câu Hỏi</p>
                                            <p className='text-lg font-bold text-slate-900'>
                                                Nhân tố nào ảnh hưởng photosynthesis?
                                            </p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <span className='px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded font-medium'>
                                                Ánh sáng
                                            </span>
                                            <span className='px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded font-medium'>
                                                CO2
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
