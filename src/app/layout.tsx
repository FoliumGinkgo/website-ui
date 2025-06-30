import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { langRequest } from "@/config/reqest";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LANGUAGES } from "@/config/constants";
import { setSupportedLanguages } from "@/config/languageConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// 多语言SEO元数据配置
export const metadata: Metadata = {
  title: {
    default: "鑫航公司 - 专业工程机械配件制造商 | Xinhang Company - Professional Construction Machinery Parts Manufacturer",
    template: "%s | 鑫航公司 | Xinhang Company"
  },
  description: "鑫航公司是专业的工程机械配件制造商，提供高质量的挖掘机斗齿、铲斗等配件产品。Xinhang Company is a professional construction machinery parts manufacturer, providing high-quality excavator bucket teeth, buckets and other parts."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let languages = await langRequest();
  if (languages.length === 0) {
    languages = LANGUAGES;
  }
  
  // 设置全局支持的语言列表
  setSupportedLanguages(languages);
  
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Header languages={languages}/>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

