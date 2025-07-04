import { Language, TextConfig } from "@/config/structure";
// 默认公司信息
export const COMPANY_INFO = {
  EMAIL: 'info@xinhang.com',
  PHONE: '+86 123 4567 8900'
};

// 英文文本
export const BASE_TEXT: TextConfig = {
  navigationList: [
    {
      name: 'HOME',
      href: '/',
    },
    {
      name: 'ABOUT',
      href: '/about',
    },
    {
      name: 'PRODUCTS',
      href: '/bucket-teeth',
    },
    {
      name: 'CONTACT',
      href: '/contact',
    },
  ],
  baseInfo: {
    aboutUs: 'About Us',
    products: 'Products',
    contactUs: 'Contact Us',
    searchPlaceholder: 'Search products...',
    companyName: 'Xinhang Company',
    language: 'Language',
    contact: 'Contact',
    //底部Footer
    quickLinks: 'Quick Links',
    companyDesc: "Professional excavator parts manufacturer, committed to providing high-quality products and services to global customers.",
    address: 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China',
    copyrightInfo: '© Copyright 2023 Xinhang Company. All Rights Reserved.',
  },
  contactUs: [
    
  ]
};
// 联系我们提示
export const CONTACT_US_HINT = {
  name: 'Your Name',
  email: 'E-mail',
  contact: 'Phone/WeChat/WhatsApp',
  company: 'Company Name',
  details: 'Details',
  code: 'Enter the verification code',
  send: 'Send',
}
// 语言配置
export const LANGUAGES: Language[] = [
  {
    name: 'English',
    lang: 'en',
    logo: '/english.png',
    id: -1,
    sort: 0,
    status: "0"
  }
];
