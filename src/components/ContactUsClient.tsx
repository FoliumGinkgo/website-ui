'use client';

import React from 'react';
import { COMPANY_INFO } from "@/config/constants";
import { FaPhone, FaEnvelope, FaUser, FaBuilding, FaComment, FaPaperPlane } from 'react-icons/fa';
import { useGlobalData } from '@/context/GlobalContext';
import { getImageUrl } from '@/utils/imageUtils';
import Image from 'next/image';

export default function ContactUsClient({ contactUsHint }: { contactUsHint: any }) {
  const globalData = useGlobalData();
   return (
    <div className="w-full">
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {globalData.furnishings && globalData.furnishings.image ? (
          <Image 
            src={getImageUrl(globalData.furnishings.image)} 
            alt={globalData.furnishings.name || "Contact Us"}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">{globalData.textConfig.baseInfo.contactUs}</h1>
        )}
      </div>
      
      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-10">
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
          
          {/* 右侧联系表单 - 增加宽度 */}
          <div className="w-full md:w-2/3 px-6 pb-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">{globalData.textConfig.baseInfo.contactUs}</h2>
            <form className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.name}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.email}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="contact" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.contact}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.company}
                />
              </div>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FaComment className="text-gray-400" />
                </div>
                <textarea 
                  id="details" 
                  rows={5} 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.details}
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  {contactUsHint.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
