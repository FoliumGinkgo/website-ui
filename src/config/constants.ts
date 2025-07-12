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
    productsList: 'Products List',
    contactUs: 'Contact Us',
    searchPlaceholder: 'Search products...',
    companyName: 'Jiangxi Xinhang Precision Casting Co., Ltd',
    language: 'Language',
    contact: 'Contact',
    //底部Footer
    quickLinks: 'Quick Links',
    companyDesc: "",
    address: 'ADD ：Xinjie Town,Gao’an County,Jiangxi Province Structural Ceramics Industrial Base,  ',
    copyrightInfo: 'Copyright © Jiangxi Xinhang Precision Casting Co., Ltd All Rights Reserved.',
    productsCategory: "Products Category",
    readMore: "Read More",
    relatedProducts: "Related Products"
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
