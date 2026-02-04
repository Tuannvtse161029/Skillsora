import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Up - Skillsora",
    description: "Skillsora - Học kỹ năng sinh tồn MIỄN PHÍ qua flashcard trực quan. Trang bị kiến thức thoát hiểm, sơ cứu và sinh tồn trong mọi tình huống khẩn cấp. Truy cập ngay để bảo vệ bản thân và gia đình!",
    icons: {
        icon: '../../',
    },
    keywords: 'kỹ năng sinh tồn, năng lượng mặt trời, tạo lửa, tìm nước, sống sót, kỹ năng sống',
    authors: { name: "Skillsora" },
    openGraph: {
        title: 'Skillsora - Kỹ Năng Sinh Tồn',
        description: 'Học các kỹ năng sinh tồn thiết yếu để xử lí khi gặp tình huống khẩn cấp.',
        images: [
            {
                url: 'https://skillsora.io.vn/_next/image?url=%2Flogo.png&w=256&q=75',
                width: 256,
                height: 256,
            },
        ],
        url: 'https://skillsora.io.vn/',
    },
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout
