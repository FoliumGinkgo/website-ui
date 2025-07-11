import { LANGUAGES } from "@/config/constants";
import { getSupportedLanguages, setSupportedLanguages } from "@/config/languageConfig";
import { langRequest } from "@/config/request";
import type { Metadata } from "next";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "鑫航公司",
  description: "鑫航公司是专业的工程机械配件制造商",
};

// 在 RootLayout 函数中
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  // 获取当前 URL
  const headersList = headers();
  const url = (await headersList).get('x-url') || '';
  
  // 从 URL 中提取语言代码
  const urlLang = url.split('/')[1];
  
  // 使用提取的语言代码或默认语言
  let languages = await langRequest();
  if (languages.length === 0) {
    languages = LANGUAGES;
  }
  
  // 设置全局支持的语言列表
  setSupportedLanguages(languages);
  
  // 获取当前支持的语言列表
  const supportedLanguages = getSupportedLanguages();
  // 默认使用英语
  const defaultLang = supportedLanguages.find(lang => lang.lang === 'en') ? 'en' : supportedLanguages[0]?.lang || 'en';
  
  // 使用 URL 中提取的语言参数，如果没有则使用默认语言
  const currentLang = urlLang || defaultLang;
  
  return (
    <html lang={currentLang} dir="ltr">
      <body className={`antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}