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
  { label: 'CONTACT', href: '/contact' },
  // { label: 'PRIVACY', href: '/privacy' },
  // { label: 'TERMS', href: '/terms' },
];

// 默认公司信息
export const COMPANY_INFO = {
  EMAIL: 'info@xinhang.com',
  PHONE: '+86 123 4567 8900',
  ADDRESS: 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China'
};

// 英文文本
export const BASE_TEXT: TextConfig = {
  // Header
  home: 'Home',
  about: 'About Us',
  products: 'Products',
  contact: 'Contact Us',
  search: 'Search',
  searchPlaceholder: 'Search products...',
  menu: 'Menu',
  companyName: 'Xinhang Company',
  language: 'Language',
  
  // Carousel
  loading: 'Loading...',
  loadingFailed: 'Loading failed',
  noDataAvailable: 'No carousel data available',
  previous: 'Previous',
  next: 'Next',
  goToSlide: 'Go to slide',

  // Footer
  contactInfo: 'Contact Info',
  quickLinks: 'Quick Links',
};

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