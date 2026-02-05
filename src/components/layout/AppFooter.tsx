"use client"
import Link from 'next/link'
import { MailOutlined, GithubOutlined, TwitterOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const pathname = usePathname()

    const hiddenRoutes = ["/signin", "/signup"]

    if (hiddenRoutes.includes(pathname)) {
        return null
    }

    return (
        <footer className="bg-white text-gray-800 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="py-16 grid md:grid-cols-5 gap-8 border-b border-gray-200">

                    {/* Logo */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 relative">
                                <Image
                                    src="/logo.png"
                                    alt="Skillsora logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <span className="font-bold text-lg text-cyan-600">
                                Skillsora
                            </span>
                        </Link>

                        <p className="text-sm text-gray-600 mb-4">
                            Nền tảng học tập thông minh để mọi người học tập hiệu quả hơn.
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3">
                            <a className="w-9 h-9 rounded-full bg-gray-200 hover:bg-cyan-600 hover:text-white flex items-center justify-center transition-colors text-cyan-600">
                                <FacebookOutlined size={16} />
                            </a>
                            <a className="w-9 h-9 rounded-full bg-gray-200 hover:bg-cyan-600 hover:text-white flex items-center justify-center transition-colors text-cyan-600">
                                <TwitterOutlined size={16} />
                            </a>
                            <a className="w-9 h-9 rounded-full bg-gray-200 hover:bg-cyan-600 hover:text-white flex items-center justify-center transition-colors text-cyan-600">
                                <LinkedinOutlined size={16} />
                            </a>
                            <a className="w-9 h-9 rounded-full bg-gray-200 hover:bg-cyan-600 hover:text-white flex items-center justify-center transition-colors text-cyan-600">
                                <GithubOutlined size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-bold mb-4">Sản Phẩm</h3>
                        <ul className="space-y-2">
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Flashcard</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Quiz</Link></li>
                            <li><Link href={"#studySets"} className="text-gray-600 hover:text-gray-900">Study Sets</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold mb-4">Tài Nguyên</h3>
                        <ul className="space-y-2">
                            <li><Link href={"/blog"} className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Hướng Dẫn</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Tài Liệu API</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Cộng Đồng</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold mb-4">Công Ty</h3>
                        <ul className="space-y-2">
                            <li><Link href={"/about"} className="text-gray-600 hover:text-gray-900">Về Chúng Tôi</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Tuyển Dụng</Link></li>
                            <li><Link href={"/"} className="text-gray-600 hover:text-gray-900">Liên Hệ</Link></li>
                            <li><Link href={"/blog"} className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4">Pháp Lý</h3>
                        <ul className="space-y-2">
                            <li><Link href={"/privacy"} className="text-gray-600 hover:text-gray-900">Chính Sách Bảo Mật</Link></li>
                            <li><Link href={"/privacy"} className="text-gray-600 hover:text-gray-900">Điều Khoản Dịch Vụ</Link></li>
                            <li><Link href={"/privacy"} className="text-gray-600 hover:text-gray-900">Chính Sách Cookie</Link></li>
                            <li><Link href={"/privacy"} className="text-gray-600 hover:text-gray-900">Tuyên Bố Khác</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                        © {currentYear} Skillsora. Tất cả quyền được bảo lưu.
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                            <MailOutlined size={16} />
                            <span className="text-sm">Liên Hệ</span>
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                            <span className="text-sm">Tham Gia</span>
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    )
}
