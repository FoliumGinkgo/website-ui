"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt
} from 'react-icons/hi';
import { ROUTES, COMPANY_INFO, SOCIAL_LINKS, BASE_TEXT} from '@/config/constants';

const Footer: React.FC = () => {
  // 使用英文作为默认语言
  const [currentLang] = useState<string>('en');


  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 pb-3 lg:grid-cols-4 gap-8">
          {/* 公司信息区域 */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 group">
              <div className="h-10 w-10 relative transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={BASE_TEXT.companyName}
                  width={40}
                  height={40}
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <span className="ml-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                {BASE_TEXT.companyName}
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {BASE_TEXT.companyDesc}
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                    aria-label={social.label}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 快速链接区域 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
              <HiOutlineGlobeAlt className="w-5 h-5 mr-2 text-blue-400" />
              {BASE_TEXT.quickLinks}
            </h3>
            <ul className="space-y-3">
              {ROUTES.map((link, index) => (
                <li key={link.href} className="text-center md:text-left">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 transform inline-block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系信息区域 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
              <HiOutlineMail className="w-5 h-5 mr-2 text-blue-400" />
              {BASE_TEXT.contactUs}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 group justify-center md:justify-start">
                <HiOutlineMail className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-white">{COMPANY_INFO.EMAIL}</span>
              </div>
              <div className="flex items-center text-gray-300 group justify-center md:justify-start">
                <HiOutlinePhone className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-white">{COMPANY_INFO.PHONE}</span>
              </div>
              <div className="flex items-start text-gray-300 group justify-center md:justify-start">
                <HiOutlineLocationMarker className="w-5 h-5 mr-3 mt-0.5 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-white text-center md:text-left">
                  {BASE_TEXT.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权区域 */}
        <div className="border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left">
            <p className="text-gray-400 text-sm md:mb-0 text-center pt-5">
              {BASE_TEXT.copyrightInfo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;