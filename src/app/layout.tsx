import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AppHeader from "@/components/layout/AppHeader";
import AutoAuthen from "@/components/layout/AutoAuthen";
import AppFooter from '@/components/layout/AppFooter';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 70px)',
};

const layoutStyle = {
  overflow: 'hidden',
};

export const metadata: Metadata = {
  title: 'Skillsora – Ứng dụng học Flashcard thông minh',
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

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="vn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <Layout style={layoutStyle}>
            <AutoAuthen></AutoAuthen>
            <AppHeader></AppHeader>
            <Content style={contentStyle}>{children}</Content>
            <AppFooter></AppFooter>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
