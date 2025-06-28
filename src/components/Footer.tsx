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
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram
} from 'react-icons/fa';
import { getTexts } from '@/config/texts';
import Navigation from '@/components/Navigation';
import { MenuItem, SocialLink, ROUTES, COMPANY_INFO } from '@/config/constants';

interface FooterTexts {
  companyName: string;
  companyDescription: string;
  quickLinks: string;
  contactInfo: string;
  followUs: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
}

const Footer: React.FC = () => {
  // 使用英文作为默认语言
  const [currentLang] = useState<string>('en');
  const texts = getTexts(currentLang);
  
  const currentYear = new Date().getFullYear();

  // 快速链接配置
  const quickLinks: MenuItem[] = [
    { id: 'home', label: texts.home, href: ROUTES.HOME },
    { id: 'about', label: texts.about, href: ROUTES.ABOUT },
    { id: 'products', label: texts.products, href: ROUTES.PRODUCTS },
    { id: 'contact', label: texts.contact, href: ROUTES.CONTACT },
  ];

  // 社交媒体链接配置
  const socialLinks: SocialLink[] = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
  ];

  // 获取地址文本
  const addressText = currentLang === 'zh' ? COMPANY_INFO.ADDRESS.zh : COMPANY_INFO.ADDRESS.en;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 公司信息区域 */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 group">
              <div className="h-10 w-10 relative transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={texts.companyName}
                  width={40}
                  height={40}
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <span className="ml-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                {texts.companyName}
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {currentLang === 'zh' ? 
                "专业的挖掘机配件制造商，致力于为全球客户提供高质量的产品和服务。" : 
                "Professional excavator parts manufacturer, committed to providing high-quality products and services to global customers."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
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
              {currentLang === 'zh' ? "快速链接" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
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
              {currentLang === 'zh' ? "联系信息" : "Contact Info"}
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
                  {addressText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权区域 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {texts.companyName}. {currentLang === 'zh' ? "保留所有权利" : "All Rights Reserved"}.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <Link href={ROUTES.PRIVACY} className="hover:text-white transition-colors duration-200">
                {currentLang === 'zh' ? "隐私政策" : "Privacy Policy"}
              </Link>
              <span>|</span>
              <Link href={ROUTES.TERMS} className="hover:text-white transition-colors duration-200">
                {currentLang === 'zh' ? "服务条款" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;