import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Giới thiệu - Skillsora",
    description: "Tìm hiểu về Skillsora — nền tảng học flashcard thông minh giúp bạn ghi nhớ kiến thức hiệu quả hơn.",
    keywords: ["Skillsora", "flashcard", "học tập", "ghi nhớ", "giáo dục"],
    openGraph: {
        title: "Giới thiệu - Skillsora",
        description: "Nền tảng học flashcard thông minh giúp bạn ghi nhớ kiến thức hiệu quả hơn.",
        type: "website",
    },
}

const features = [
    {
        icon: (
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        title: "Flashcard thông minh",
        description: "Tạo và học flashcard với thuật toán lặp lại ngắt quãng giúp ghi nhớ lâu hơn.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Học tập hiệu quả",
        description: "Tối ưu thời gian học với các chế độ học đa dạng phù hợp với phong cách của bạn.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "Cộng đồng học tập",
        description: "Chia sẻ và khám phá bộ flashcard từ hàng triệu người dùng trên toàn thế giới.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: "Theo dõi tiến độ",
        description: "Xem thống kê chi tiết về quá trình học và tiến bộ của bạn theo thời gian.",
    },
]

const stats = [
    { value: "10M+", label: "Người dùng" },
    { value: "500M+", label: "Flashcard" },
    { value: "150+", label: "Quốc gia" },
    { value: "95%", label: "Hài lòng" },
]

const team = [
    {
        name: "Nguyen Van A",
        role: "CEO & Founder",
        description: "10+ năm kinh nghiệm trong lĩnh vực EdTech",
    },
    {
        name: "Tran Thi B",
        role: "CTO",
        description: "Chuyên gia AI và Machine Learning",
    },
    {
        name: "Le Van C",
        role: "Head of Product",
        description: "Thiết kế sản phẩm tập trung vào người dùng",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Về Skillsora
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
                            Học thông minh hơn,
                        </span>
                        <br />
                        <span className="text-gray-800 mt-2">không phải học nhiều hơn</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Skillsora được xây dựng với sứ mệnh giúp hàng triệu học sinh, sinh viên
                        và người đi làm học tập hiệu quả hơn thông qua phương pháp flashcard
                        khoa học và công nghệ AI tiên tiến.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <span className="text-cyan-100 text-lg">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            <span className="text-cyan-600">Tại sao chọn</span>{" "}
                            <span className="text-gray-800">Skillsora?</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Chúng tôi kết hợp khoa học về trí nhớ với công nghệ hiện đại
                            để mang đến trải nghiệm học tập tốt nhất.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-cyan-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 bg-cyan-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-cyan-800 mb-6">Sứ mệnh của chúng tôi</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Chúng tôi tin rằng mỗi người đều có khả năng học tập không giới hạn.
                        Skillsora ra đời với mong muốn phá bỏ rào cản trong việc tiếp cận kiến thức,
                        giúp việc học trở nên thú vị, dễ dàng và hiệu quả hơn bao giờ hết.
                        Mục tiêu của chúng tôi là trở thành người bạn đồng hành đáng tin cậy
                        trên hành trình học tập suốt đời của bạn.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-cyan-800 mb-4">Đội ngũ của chúng tôi</h2>
                        <p className="text-gray-600">
                            Những người đam mê giáo dụng và công nghệ
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl border border-cyan-100 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl font-bold">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-cyan-600 font-medium mb-2">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Sẵn sàng bắt đầu hành trình học tập?
                    </h2>
                    <p className="text-cyan-100 text-lg mb-8">
                        Tham gia cùng hàng triệu người dùng đang học tập hiệu quả với Skillsora.
                    </p>
                    <Link
                        href="/create-topic"
                        className="inline-block bg-white text-cyan-600 font-semibold px-8 py-3 rounded-lg hover:bg-cyan-50 transition-colors shadow-lg"
                    >
                        Bắt đầu miễn phí
                    </Link>
                </div>
            </section>
        </div>
    )
}
