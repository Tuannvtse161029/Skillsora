import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Blog - Skillsora",
    description: "Khám phá các bài viết hữu ích về phương pháp học tập, mẹo ghi nhớ và cách sử dụng flashcard hiệu quả.",
    keywords: ["blog", "học tập", "flashcard", "ghi nhớ", "phương pháp học", "Skillsora"],
    openGraph: {
        title: "Blog - Skillsora",
        description: "Khám phá các bài viết hữu ích về phương pháp học tập và cách sử dụng flashcard hiệu quả.",
        type: "website",
    },
}

const featuredPost = {
    id: "1",
    title: "Phương pháp lặp lại ngắt quãng: Bí quyết ghi nhớ lâu dài",
    excerpt: "Khám phá cách thuật toán lặp lại ngắt quãng (Spaced Repetition) giúp bạn ghi nhớ thông tin hiệu quả hơn gấp nhiều lần so với cách học truyền thống.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    category: "Phương pháp học",
    author: "Nguyễn Văn A",
    date: "20/01/2026",
    readTime: "8 phút đọc",
}

const posts = [
    {
        id: "2",
        title: "10 mẹo tạo flashcard hiệu quả cho người mới bắt đầu",
        excerpt: "Học cách tạo flashcard đúng cách để tối ưu hiệu quả học tập.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        category: "Hướng dẫn",
        author: "Trần Thị B",
        date: "18/01/2026",
        readTime: "5 phút đọc",
    },
    {
        id: "3",
        title: "Cách sử dụng Skillsora để học ngoại ngữ",
        excerpt: "Hướng dẫn cách tận dụng Skillsora để học từ vựng và ngữ pháp.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
        category: "Ngoại ngữ",
        author: "Lê Văn C",
        date: "15/01/2026",
        readTime: "6 phút đọc",
    },
    {
        id: "4",
        title: "Tâm lý học đằng sau việc ghi nhớ hiệu quả",
        excerpt: "Hiểu cách não bộ hoạt động để áp dụng phương pháp học phù hợp.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        category: "Khoa học",
        author: "Phạm Thị D",
        date: "12/01/2026",
        readTime: "10 phút đọc",
    },
    {
        id: "5",
        title: "Lịch học tập hoàn hảo: Khi nào nên ôn bài?",
        excerpt: "Tìm hiểu thời điểm tốt nhất trong ngày để học và ôn flashcard.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        category: "Phương pháp học",
        author: "Hoàng Văn E",
        date: "10/01/2026",
        readTime: "4 phút đọc",
    },
    {
        id: "6",
        title: "Skillsora cho sinh viên y khoa: Case Study",
        excerpt: "Câu chuyện thành công của sinh viên y khoa sử dụng Skillsora để học giải phẫu.",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
        category: "Câu chuyện",
        author: "Nguyễn Thị F",
        date: "08/01/2026",
        readTime: "7 phút đọc",
    },
]

const categories = [
    { name: "Tất cả", count: 24 },
    { name: "Phương pháp học", count: 8 },
    { name: "Hướng dẫn", count: 6 },
    { name: "Ngoại ngữ", count: 5 },
    { name: "Khoa học", count: 3 },
    { name: "Câu chuyện", count: 2 },
]

const popularTags = [
    "Flashcard",
    "Spaced Repetition",
    "Học tập",
    "Ghi nhớ",
    "Tiếng Anh",
    "Thi cử",
    "Sinh viên",
    "Mẹo học"
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            {/* Hero Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Blog Skillsora
                    </h1>
                    <p className="text-cyan-100 text-lg">
                        Khám phá các bài viết hữu ích về phương pháp học tập,
                        mẹo ghi nhớ và cách sử dụng flashcard hiệu quả
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Featured Post */}
                        <article className="bg-white rounded-xl border border-cyan-100 overflow-hidden mb-8 hover:shadow-xl transition-shadow">
                            <div className="grid md:grid-cols-2">
                                <div className="relative h-64 md:h-auto min-h-[250px]">
                                    <Image
                                        src={featuredPost.image || "/placeholder.svg"}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        Nổi bật
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col justify-center">
                                    <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full w-fit mb-3">
                                        {featuredPost.category}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-cyan-600 transition-colors cursor-pointer">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {featuredPost.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {featuredPost.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Post Grid */}
                        <h3 className="text-2xl font-bold text-cyan-800 mb-6">
                            Bài viết mới nhất
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-xl border border-cyan-100 overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                                            {post.category}
                                        </span>
                                        <h4 className="font-semibold text-gray-800 mb-2 hover:text-cyan-600 transition-colors cursor-pointer line-clamp-2">
                                            {post.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-gray-400 text-xs">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-10">
                            <button className="bg-cyan-500 text-white font-medium px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors">
                                Xem thêm bài viết
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                        {/* Categories */}
                        <div className="bg-white rounded-xl border border-cyan-100 p-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Danh mục</h3>
                            <div className="space-y-2">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-cyan-50 cursor-pointer transition-colors text-left"
                                    >
                                        <span className="text-gray-700">{cat.name}</span>
                                        <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full">
                                            {cat.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-5 text-center">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Nhận bài viết mới
                            </h3>
                            <p className="text-cyan-100 text-sm mb-4">
                                Đăng ký để nhận các bài viết hữu ích mỗi tuần
                            </p>
                            <input
                                type="email"
                                placeholder="Email cua ban"
                                className="w-full px-4 py-2 rounded-lg mb-3 border-0 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            />
                            <button className="w-full bg-white text-cyan-600 font-medium py-2 rounded-lg hover:bg-cyan-50 transition-colors">
                                Đăng ký
                            </button>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white rounded-xl border border-cyan-100 p-5">
                            <h3 className="font-semibold text-cyan-700 mb-4">Tags phổ biến</h3>
                            <div className="flex flex-wrap gap-2">
                                {popularTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
