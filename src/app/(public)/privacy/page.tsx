import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Chính sách bảo mật - Skillsora",
    description: "Tìm hiểu cách Skillsora thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
    keywords: ["chính sách bảo mật", "privacy policy", "bảo mật", "Skillsora"],
    openGraph: {
        title: "Chính sách bảo mật - Skillsora",
        description: "Tìm hiểu cách Skillsora thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
        type: "website",
    },
}

const sections = [
    { key: "introduction", title: "1. Giới thiệu", href: "#introduction" },
    { key: "collection", title: "2. Thu thập thông tin", href: "#collection" },
    { key: "usage", title: "3. Sử dụng thông tin", href: "#usage" },
    { key: "sharing", title: "4. Chia sẻ thông tin", href: "#sharing" },
    { key: "security", title: "5. Bảo mật dữ liệu", href: "#security" },
    { key: "cookies", title: "6. Cookie và công nghệ theo dõi", href: "#cookies" },
    { key: "rights", title: "7. Quyền của người dùng", href: "#rights" },
    { key: "children", title: "8. Trẻ em và quyền riêng tư", href: "#children" },
    { key: "changes", title: "9. Thay đổi chính sách", href: "#changes" },
    { key: "contact", title: "10. Liên hệ", href: "#contact" },
]

const highlights = [
    {
        icon: (
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: "Mã hóa dữ liệu",
        description: "Tất cả dữ liệu được mã hóa bằng SSL/TLS",
    },
    {
        icon: (
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        title: "Minh bạch",
        description: "Bạn có quyền biết dữ liệu nào được thu thập",
    },
    {
        icon: (
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        ),
        title: "Quyền xóa",
        description: "Bạn có thể yêu cầu xóa dữ liệu bất cứ lúc nào",
    },
]

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            {/* Hero Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Chính Sách Bảo Mật
                    </h1>
                    <p className="text-cyan-100 text-lg">
                        Cập nhật lần cuối: 01/01/2026
                    </p>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12 px-4 -mt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex gap-8">
                    {/* Table of Contents - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-xl border border-cyan-100 p-5">
                                <h3 className="font-semibold text-cyan-700 mb-4">Mục Lục</h3>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <a
                                            key={section.key}
                                            href={section.href}
                                            className="block text-gray-600 hover:text-cyan-600 text-sm py-1 transition-colors"
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 max-w-3xl">
                        <div className="bg-white rounded-xl border border-cyan-100 p-6 md:p-8">
                            {/* Section 1 */}
                            <section id="introduction" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    1. Giới Thiệu
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chào mừng bạn đến với Skillsora. Chúng tôi cam kết bảo vệ quyền riêng tư
                                    và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng
                                    tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn sử dụng
                                    dịch vụ Skillsora.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản
                                    trong chính sách bảo mật này. Nếu bạn không đồng ý với chính sách này,
                                    vui lòng không sử dụng dịch vụ của chúng tôi.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section id="collection" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    2. Thu Thập Thông Tin
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chúng tôi thu thập các loại thông tin sau:
                                </p>
                                <div className="bg-cyan-50 rounded-lg p-4 mb-4">
                                    <h4 className="font-semibold text-cyan-800 mb-2">
                                        Thông Tin Bạn Cung Cấp Trực Tiếp:
                                    </h4>
                                    <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                        <li>Thông tin đăng ký: họ tên, email, mật khẩu</li>
                                        <li>Thông tin hồ sơ: ảnh đại diện, tiểu sử, sở thích học tập</li>
                                        <li>Nội dung bạn tạo: flashcard, bộ học, ghi chú</li>
                                        <li>Thông tin liên hệ khi bạn hỗ trợ hoặc phản hồi</li>
                                    </ul>
                                </div>
                                <div className="bg-cyan-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-cyan-800 mb-2">
                                        Thông Tin Tự Động Thu Thập:
                                    </h4>
                                    <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                        <li>Địa chỉ IP và thông tin thiết bị</li>
                                        <li>Dữ liệu sử dụng và tương tác với dịch vụ</li>
                                        <li>Thông tin trình duyệt và hệ điều hành</li>
                                        <li>Cookie và công nghệ theo dõi tương tự</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="usage" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    3. Sử Dụng Thông Tin
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
                                </p>
                                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                    <li>Cung cấp, duy trì và cải thiện dịch vụ Skillsora</li>
                                    <li>Cá nhân hóa trải nghiệm học tập của bạn</li>
                                    <li>Gửi thông báo về tài khoản và dịch vụ</li>
                                    <li>Phân tích xu hướng sử dụng để phát triển tính năng mới</li>
                                    <li>Bảo vệ an toàn và ngăn chặn gian lận</li>
                                    <li>Tuân thủ các nghĩa vụ pháp lý</li>
                                </ul>
                            </section>

                            {/* Section 4 */}
                            <section id="sharing" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    4. Chia Sẻ Thông Tin
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba.
                                    Tuy nhiên, chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:
                                </p>
                                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                    <li><strong>Với Sự Đồng Ý Của Bạn:</strong> Khi bạn cho phép chia sẻ</li>
                                    <li><strong>Nhà Cung Cấp Dịch Vụ:</strong> Các đối tác hỗ trợ vận hành dịch vụ</li>
                                    <li><strong>Yêu Cầu Pháp Lý:</strong> Khi được yêu cầu bởi pháp luật</li>
                                    <li><strong>Bảo Vệ Quyền Lợi:</strong> Để bảo vệ an toàn của người dùng và dịch vụ</li>
                                </ul>
                            </section>

                            {/* Section 5 */}
                            <section id="security" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    5. Bảo Mật Dữ Liệu
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ
                                    thông tin của bạn:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-cyan-50 rounded-lg p-4">
                                        <svg className="w-6 h-6 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <h4 className="font-semibold text-sm mb-1">Mã Hóa SSL/TLS</h4>
                                        <p className="text-gray-500 text-sm">
                                            Tất cả dữ liệu truyền tải được mã hóa
                                        </p>
                                    </div>
                                    <div className="bg-cyan-50 rounded-lg p-4">
                                        <svg className="w-6 h-6 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <h4 className="font-semibold text-sm mb-1">Xác Thực 2 Yếu Tố</h4>
                                        <p className="text-gray-500 text-sm">
                                            Bảo vệ tài khoản với lớp bảo mật bổ sung
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6 */}
                            <section id="cookies" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    6. Cookie Và Công Nghệ Theo Dõi
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Chung toi su dung cookie va cong nghe tuong tu de:
                                </p>
                                <ul className="text-gray-600 space-y-2 list-disc list-inside mb-4">
                                    <li>Ghi nhớ tùy chọn và đăng nhập của bạn</li>
                                    <li>Phân tích cách dịch vụ được sử dụng</li>
                                    <li>Cải thiện hiệu suất và trải nghiệm</li>
                                    <li>Cung cấp nội dung phù hợp với bạn</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed">
                                    Bạn có thể quản lý cookie trong cài đặt trình duyệt. Tuy nhiên,
                                    việc tắt cookie có thể ảnh hưởng đến một số tính năng của dịch vụ.
                                </p>
                            </section>

                            {/* Section 7 */}
                            <section id="rights" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    7. Quyền Của Người Dùng
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Bạn có các quyền sau đối với dữ liệu cá nhân của mình:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                                        <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-sm">Quyền Truy Cập</h4>
                                            <p className="text-gray-500 text-sm">
                                                Yêu cầu bản sao dữ liệu cá nhân của bạn
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                                        <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-sm">Quyền Chỉnh Sửa</h4>
                                            <p className="text-gray-500 text-sm">
                                                Cập nhật thông tin không chính xác
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                                        <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-sm">Quyền Xóa</h4>
                                            <p className="text-gray-500 text-sm">
                                                Yêu cầu xóa dữ liệu cá nhân của bạn
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 8 */}
                            <section id="children" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    8. Trẻ Em Và Quyền Riêng Tư
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi.
                                    Chúng tôi không cố ý thu thập thông tin từ trẻ em dưới 13 tuổi.
                                    Nếu bạn là phụ huynh hoặc người giám hộ và biết rằng con bạn đã
                                    cung cấp thông tin cho chúng tôi, vui lòng liên hệ để chúng tôi
                                    có thể xóa dữ liệu đó.
                                </p>
                            </section>

                            {/* Section 9 */}
                            <section id="changes" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    9. Thay Đổi Chính Sách
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
                                    Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn qua
                                    email hoặc thông báo trên dịch vụ. Chúng tôi khuyến khích bạn
                                    định kỳ xem lại chính sách này để nắm rõ cách chúng tôi bảo vệ
                                    thông tin của bạn.
                                </p>
                            </section>


                            {/* Section 10 */}
                            <section id="changes" className="mb-10">
                                <h2 className="text-xl font-bold text-cyan-700 mb-4">
                                    9. Thay Đổi Chính Sách
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
                                    Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn qua
                                    email hoặc thông báo trên dịch vụ. Chúng tôi khuyến khích bạn
                                    định kỳ xem lại chính sách này để nắm rõ cách chúng tôi bảo vệ
                                    thông tin của bạn.
                                </p>
                            </section>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
