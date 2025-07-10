'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUtils';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HomeInfo, Product } from '@/config/structure';
import { useGlobalData } from '@/context/GlobalContext';
import { useState, useEffect } from 'react';

interface HomeClientProps {
    lang: string;
    products: Product[];
    homeInfo: HomeInfo;
}

export default function HomeClient({ lang, products, homeInfo }: HomeClientProps) {
    const { textConfig, aboutUs } = useGlobalData();


    // 处理富文本内容中的图片路径
    const processHtmlContent = (htmlContent: string) => {
        if (!htmlContent) return '';

        // 替换图片的相对路径为完整URL
        return htmlContent.replace(/(<img[^>]+src=)(["\'])(?!http)([^"']+)(["\'])/gi, (match, p1, p2, p3, p4) => {
            const fullImageUrl = getImageUrl(p3.replace("/dev-api", ""));
            return `${p1}${p2}${fullImageUrl}${p4}`;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* 公司优势 */}
            {homeInfo && (
                <div className="mb-16">
                    {homeInfo.companyAdvantageTitle && (
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2 mb-8">
                            {homeInfo.companyAdvantageTitle}
                        </h2>
                    )
                    }
                    {
                        homeInfo.companyAdvantages && (
                            <div className={`grid ${homeInfo.companyAdvantages.length === 1 ? 'justify-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                                {homeInfo.companyAdvantages.map((advantage, index) => (
                                    <div key={index} className="bg-white shadow-sm hover:shadow-md transition-all duration-300 p-6 rounded-lg border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
                                        {advantage.logo && (
                                            <div className="flex justify-center mb-4">
                                                <Image
                                                    src={getImageUrl(advantage.logo)}
                                                    alt={advantage.title || '公司优势'}
                                                    width={64}
                                                    height={64}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-xl font-semibold text-center mb-3">{advantage.title}</h3>
                                        <p className="text-gray-600 text-center">{advantage.description}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            )}
            {/* 分类列表 */}
            {/* 产品列表 */}
            <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2">
                        {textConfig.baseInfo.productsList}
                    </h2>
                    <Link
                        href={`/${lang}/bucket-teeth`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center"
                    >
                        {textConfig.baseInfo.readMore} <MdOutlineKeyboardArrowRight className="ml-1" />
                    </Link>
                </div>

                {/* 产品网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {products.map((product, index) => (
                        <Link
                            key={index}
                            href={`/${lang}/bucket-teeth/${product.slug}`}
                            className="group bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
                        >
                            {/* 产品图片 - 正方形布局 */}
                            <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(product.images[0])}
                                            alt={`${product.name || '产品'}`}
                                            fill
                                            sizes="520"
                                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                        <span className="text-gray-400">无图片</span>
                                    </div>
                                )}
                            </div>

                            {/* 产品信息 */}
                            <div className="p-4 sm:p-5 relative">
                                <div className="absolute top-0 left-0 w-10 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1/2"></div>
                                <h3 className="font-medium text-lg mb-3 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>

                                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                    {typeof product.seoDescription === 'string' ?
                                        (product.seoDescription.startsWith('<') ?
                                            product.seoDescription.replace(/<[^>]*>/g, '') :
                                            product.seoDescription) :
                                        ''}
                                </p>

                                {/* 查看详情按钮 */}
                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                                    <span className="text-sm text-blue-500 font-medium flex items-center">
                                        查看详情 <MdOutlineKeyboardArrowRight className="ml-1" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* 关于我们内容 - 使用客户端组件获取全局数据 */}
            {aboutUs && aboutUs.aboutUs && (
                <div className="bg-white rounded-lg p-6 md:p-8 transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2">
                            {aboutUs.name}
                        </h2>
                    </div>
                    <div className="prose prose-sm sm:prose max-w-none mb-6">

                        <div
                            dangerouslySetInnerHTML={{
                                __html: processHtmlContent(aboutUs.aboutUs)
                            }}
                            className="about-content overflow-x-auto"
                        />
                    </div>
                </div>

            )}

            {/* 联系我们按钮 */}
            <div className="flex justify-center mt-8">
                <Link
                    href={`/${lang}/contact`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                >
                    {textConfig.baseInfo.contactUs} <MdOutlineKeyboardArrowRight className="ml-1" />
                </Link>
            </div>
        </div>
    );
}