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
  title: 'Skillsora - Kỹ Năng Sinh Tồn',
  icons: {
    icon: './',
  },
  description: 'Khám phá các kỹ năng sinh tồn cơ bản, từ cách tạo lửa đến tìm kiếm nước sạch.',
  keywords: 'kỹ năng sinh tồn, năng lượng mặt trời, tạo lửa, tìm nước, sống sót, kỹ năng sống',
  authors: { name: "Skillsora" },
  openGraph: {
    title: 'Skillsora - Kỹ Năng Sinh Tồn',
    description: 'Học các kỹ năng sinh tồn thiết yếu để xử lí khi gặp tình huống khẩn cấp.',
    images: [
      {
        url: 'https://Skillsora.io.vn/_next/image?url=%2Flogo.png&w=256&q=75',
        width: 256,
        height: 256,
      },
    ],
    url: 'https://Skillsora.io.vn/',
  },
  robots: 'index, follow',
};

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
