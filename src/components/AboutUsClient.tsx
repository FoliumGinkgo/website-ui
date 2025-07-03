'use client';

import React from 'react';
import Image from 'next/image';
import { useGlobalData } from '@/context/GlobalContext';
import { getImageUrl } from '@/utils/imageUtils';
import { COMPANY_INFO } from "@/config/constants";
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function AboutUsClient({ aboutUs }: { aboutUs: any }) {
  const globalData = useGlobalData();
  
  // 处理富文本内容中的图片路径
  const processHtmlContent = (htmlContent: string) => {
    if (!htmlContent) return '';
    
    // 替换图片的相对路径为完整URL
    return htmlContent.replace(/(<img[^>]+src=)(["'])(?!http)([^"']+)(["'])/gi, (match, p1, p2, p3, p4) => {
      const fullImageUrl = getImageUrl(p3.replace("/dev-api",""));
      return `${p1}${p2}${fullImageUrl}${p4}`;
    });
  };
  
  return (
    <div className='w-full'>
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
      <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {globalData.furnishings && globalData.furnishings.image ? (
          <Image 
            src={getImageUrl(globalData.furnishings.image)} 
            alt={globalData.furnishings.name || "About Us"}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">{globalData.textConfig.baseInfo.aboutUs}</h1>
        )}
      </div>

      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* 左侧联系方式 - 自适应宽度但设置最大宽度 */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 lg:max-w-xs">
            <h2 className="text-2xl font-semibold mb-6 text-center">{globalData.textConfig.baseInfo.contact}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaPhone className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-medium">电话</h3>
                  <p className="text-gray-600">{COMPANY_INFO.PHONE}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-medium">邮箱</h3>
                  <p className="text-gray-600">{COMPANY_INFO.EMAIL}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧关于我们 - 占据剩余空间 */}
          <div className="w-full lg:flex-grow px-5 py-5">
            <h2 className="text-2xl font-semibold mb-4">{aboutUs.name}</h2>
            <div className="prose max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: processHtmlContent(aboutUs.aboutUs) 
                }} 
                className="about-content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
