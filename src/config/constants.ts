import { Language, MenuItem, SocialLink, TextConfig } from "@/config/structure";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram
} from 'react-icons/fa';
// 页面路由
export const ROUTES: MenuItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PRODUCTS', href: '/bucket-teeth'},
  { label: 'CONTACT', href: '/contact' }
];

// 默认公司信息
export const COMPANY_INFO = {
  EMAIL: 'info@xinhang.com',
  PHONE: '+86 123 4567 8900'
};

// 英文文本
export const BASE_TEXT: TextConfig = {
  // Header
  aboutUs: 'About Us',
  products: 'Products',
  contactUs: 'Contact Us',
  searchPlaceholder: 'Search products...',
  companyName: 'Xinhang Company',
  language: 'Language',
  contact: 'Contact',

  // Footer
  quickLinks: 'Quick Links',
  companyDesc: "Professional excavator parts manufacturer, committed to providing high-quality products and services to global customers.",
  address: 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China',
  copyrightInfo: '© Copyright 2023 Xinhang Company. All Rights Reserved.',
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
    flag: 'en',
    logo: '/english.png',
    id: 0,
    sort: 0,
    status: "0"
  }
];

// 社交媒体链接配置
export const SOCIAL_LINKS: SocialLink[] = [
  {icon: FaFacebook, href: '#', label: 'Facebook' },
  {icon: FaTwitter, href: '#', label: 'Twitter' },
  {icon: FaInstagram, href: '#', label: 'Instagram' },
];