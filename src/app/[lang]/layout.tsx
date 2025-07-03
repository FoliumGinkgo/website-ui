import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { langRequest, globalDataRequest, furnishingsRequest, contactRequest } from "@/config/reqest";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LANGUAGES } from "@/config/constants";
import { setSupportedLanguages, getSupportedLanguages } from "@/config/languageConfig";
import { GlobalDataProvider } from "@/context/GlobalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 动态生成metadata
export async function generateMetadata(): Promise<Metadata> {
  // 获取支持的语言列表
  let languages = await langRequest();

  if (languages.length === 0) {
    languages = LANGUAGES;
  }

  // 设置全局支持的语言列表
  setSupportedLanguages(languages);

  // 获取当前URL的基础部分（不包含语言代码）
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // 生成alternates对象，包含所有支持语言的hreflang标记
  const alternates: Record<string, string> = {};
  const languageMap: Record<string, string> = {};

  // 为每种语言生成URL
  languages.forEach((lang: { lang: string; }) => {
    alternates[lang.lang] = `${baseUrl}/${lang.lang}`;
    languageMap[`x-default`] = `${baseUrl}/en`; // 默认使用英语
  });

  return {
    title: {
      default: "鑫航公司 - 专业工程机械配件制造商 | Xinhang Company - Professional Construction Machinery Parts Manufacturer",
      template: "%s | 鑫航公司 | Xinhang Company"
    },
    description: "鑫航公司是专业的工程机械配件制造商，提供高质量的挖掘机斗齿、铲斗等配件产品。Xinhang Company is a professional construction machinery parts manufacturer, providing high-quality excavator bucket teeth, buckets and other parts.",
    alternates: {
      canonical: baseUrl,
      languages: alternates,
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}>) {
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

  // 使用URL中的语言参数，如果没有则使用默认语言
  const { lang } = await params;
  const currentLang = lang || defaultLang;
  console.log(lang);

  const [textConfig, furnishings, contactUs] = await Promise.all([
    globalDataRequest(currentLang),  // 传入当前语言参数
    furnishingsRequest(),            // 获取横图数据
    contactRequest(), //联系方式
  ]);

  // 合并数据
  const globalData = {
    textConfig,
    furnishings,
  };

  // 获取当前URL的基础部分（不包含语言代码）
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <html lang={defaultLang} dir="ltr">
      <head>
        {/* 手动添加hreflang标记，以防Next.js的metadata不能正确处理 */}
        {supportedLanguages.map(lang => (
          <link
            key={lang.lang}
            rel="alternate"
            hrefLang={lang.lang}
            href={`${baseUrl}/${lang.lang}`}
          />
        ))}
        {/* 添加默认语言标记 */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}/${defaultLang}`}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* 使用GlobalDataProvider包装children，共享全局数据 */}
        <GlobalDataProvider value={globalData}>
          <Header languages={languages} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </GlobalDataProvider>
      </body>
    </html>
  );
}

