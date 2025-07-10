'use client';

import React from 'react';
import Image from 'next/image';
import { useGlobalData } from '@/context/GlobalContext';
import { getImageUrl, processHtmlContent } from '@/utils/imageUtils';
import { FaPhone, FaWeixin } from 'react-icons/fa';
import {
  HiOutlineMail,
  HiOutlineLocationMarker
} from 'react-icons/hi';
import { ContactUs } from '@/config/structure';

export default function AboutUsClient({ aboutUs }: { aboutUs: any }) {
  const globalData = useGlobalData();

  
  return (
    <div className='w-full'>
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
      <div className="w-full h-48 sm:h-56 md:h-80 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {globalData.furnishings && globalData.furnishings.image ? (
          <Image 
            src={getImageUrl(globalData.furnishings.image)} 
            alt={globalData.furnishings.name || "About Us"}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 text-center">{globalData.textConfig.baseInfo.aboutUs}</h1>
        )}
      </div>

      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* 左侧联系方式 - 自适应宽度但设置最大宽度 */}
          <div className="w-full lg:w-1/3 lg:flex-shrink-0 bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 mb-6 lg:mb-0 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center border-b pb-3 text-blue-700">{globalData.textConfig.baseInfo.contact}</h2>
            <div className="space-y-4 sm:space-y-5">
              {globalData.contactUs && globalData.contactUs.map((contact: ContactUs, index: number) => {
                if (contact.type === 'phone') {
                  return (
                    <div key={index} className="group mb-3 sm:mb-4 transition-all duration-300 hover:translate-x-1">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                          <FaPhone className="text-blue-600 text-base sm:text-lg" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-600 break-words whitespace-pre-wrap max-w-full overflow-hidden text-sm md:text-base">{contact.link}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                if (contact.type === 'email') {
                  return (
                    <div key={index} className="group mb-3 sm:mb-4 transition-all duration-300 hover:translate-x-1">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                          <HiOutlineMail className="text-blue-600 text-base sm:text-lg" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-600 break-words whitespace-pre-wrap max-w-full overflow-hidden text-sm md:text-base">{contact.link}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                if (contact.type === 'WeChat') {
                  return (
                    <div key={index} className="group mb-3 sm:mb-4 transition-all duration-300 hover:translate-x-1">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                          <FaWeixin className="text-blue-600 text-base sm:text-lg" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-600 break-words whitespace-pre-wrap max-w-full overflow-hidden text-sm md:text-base">{contact.link}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null;
              })}
              <div className="group transition-all duration-300 hover:translate-x-1">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                    <HiOutlineLocationMarker className="text-blue-600 text-base sm:text-lg" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-600 break-words whitespace-pre-wrap max-w-full overflow-hidden text-sm md:text-base leading-relaxed">{globalData.textConfig.baseInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧关于我们 - 占据剩余空间 */}
          <div className="w-full lg:flex-grow bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{aboutUs.name}</h2>
            <div className="prose prose-sm sm:prose max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: processHtmlContent(aboutUs.aboutUs) 
                }} 
                className="about-content overflow-x-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
