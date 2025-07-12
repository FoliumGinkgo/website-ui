'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker
} from 'react-icons/hi';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaWeixin
} from 'react-icons/fa';
import { BASE_TEXT } from '@/config/constants';
import { useGlobalData } from '@/context/GlobalContext';
import { ContactUs } from '@/config/structure'; // 导入ContactUs接口

const Footer: React.FC = () => {

  const { textConfig, contactUs } = useGlobalData();
  const baseInfo = textConfig || BASE_TEXT;
  return (
    <footer className="bg-gray-900 text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 pb-3 lg:grid-cols-4 gap-8">
          {/* 公司信息区域 */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 group">
              <div className="h-auto w-auto relative transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={baseInfo.baseInfo.companyName}
                  width={142}
                  height={44}
                  className="object-contain w-[113px] h-[35px] "
                />
              </div>
              <span className="ml-3 font-bold transition-colors duration-300 group-hover:text-blue-400">
                {baseInfo.baseInfo.companyName}
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {baseInfo.baseInfo.companyDesc}
            </p>
            <div className="flex space-x-4">
              {contactUs && contactUs.map((contact: ContactUs, index: number) => {
                if (contact.type === 'WhatsApp') {
                  return (
                    <a
                      key={contact.link}
                      href={contact.link}
                      target="_blank"
                      className={`text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                      aria-label={contact.name}
                      style={{ animationDelay: `${index * 100}ms` }}>
                      <FaWhatsapp className='text-2xl' />
                    </a>
                  )
                }
                if (contact.type === 'Facebook') {
                  return (
                    <a
                      key={contact.link}
                      href={contact.link}
                      target="_blank"
                      className={`text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                      aria-label={contact.name}
                      style={{ animationDelay: `${index * 100}ms` }}>
                      <FaFacebook className='text-2xl' />
                    </a>
                  );
                }
                if (contact.type === 'Instagram') {
                  return (
                    <a
                      key={contact.link}
                      href={contact.link}
                      target="_blank"
                      className={`text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                      aria-label={contact.name}
                      style={{ animationDelay: `${index * 100}ms` }}>
                      <FaInstagram className='text-2xl' />
                    </a>
                  );
                }

              })}
            </div>
          </div>

          {/* 快速链接区域 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
              {baseInfo.baseInfo.quickLinks}
            </h3>
            <ul className="space-y-3">
              {baseInfo.navigationList.map((link, index) => (
                <li key={link.href} className="text-center md:text-left">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 transform inline-block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系信息区域 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
              {baseInfo.baseInfo.contactUs}
            </h3>
            <div className="space-y-3">
              {/* 根据contactUs数组中的type字段动态渲染不同类型的联系方式 */}
              {contactUs && contactUs.map((contact: ContactUs) => {
                // 根据type字段选择对应的图标和内容
                if (contact.type === 'email') {
                  return (
                    <div key={contact.id} className="flex items-center text-gray-300 group justify-center md:justify-start">
                      <HiOutlineMail className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                      <span className="transition-colors duration-200 group-hover:text-white">{contact.link}</span>
                    </div>
                  );
                } else if (contact.type === 'phone') {
                  return (
                    <div key={contact.id} className="flex items-center text-gray-300 group justify-center md:justify-start">
                      <HiOutlinePhone className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                      <span className="transition-colors duration-200 group-hover:text-white">{contact.link}</span>
                    </div>
                  );
                } else if (contact.type === 'WeChat') {
                  return (
                    <div key={contact.id} className="flex items-center text-gray-300 group justify-center md:justify-start">
                      <FaWeixin className="w-5 h-5 mr-3 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                      <span className="transition-colors duration-200 group-hover:text-white">{contact.link}</span>
                    </div>
                  );
                }
                return null; // 如果类型不匹配，则不显示
              })}

              {/* 显示地址信息 */}
              <div className="flex items-start text-gray-300 group justify-center md:justify-start">
                <HiOutlineLocationMarker className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                <span className="transition-colors duration-200 group-hover:text-white text-center md:text-left break-words w-full">
                  {baseInfo.baseInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权区域 */}
        <div className="border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left">
            <p className="text-gray-400 text-sm md:mb-0 text-center pt-5">
              {baseInfo.baseInfo.copyrightInfo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;