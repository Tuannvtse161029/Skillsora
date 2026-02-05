import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng kí - Skillsora',
    description:
        'Skillsora là ứng dụng học bằng flashcard giúp bạn ghi nhớ nhanh, ôn tập hiệu quả với lộ trình thông minh. Phù hợp cho học sinh, sinh viên và người tự học.',
    keywords:
        'flashcard, học flashcard, học nhanh nhớ lâu, spaced repetition, ôn tập thông minh, học tập hiệu quả, skillsora',
    authors: { name: 'Skillsora' },

    icons: {
        icon: '/logo.png',
    },

    openGraph: {
        title: 'Skillsora – Học Flashcard thông minh, nhớ lâu hơn',
        description:
            'Học tập hiệu quả với flashcard, theo dõi tiến độ và ôn tập đúng thời điểm để ghi nhớ lâu dài.',
        url: 'https://skillsora.vercel.app/',
        siteName: 'Skillsora',
        images: [
            {
                url: 'https://skillsora.vercel.app/logo.png',
                width: 512,
                height: 512,
                alt: 'Skillsora Flashcard App',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },

    robots: {
        index: true,
        follow: true,
    },
}

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout
