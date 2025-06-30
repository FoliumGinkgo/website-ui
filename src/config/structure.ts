// 菜单项接口
export interface MenuItem {
  label: string;
  href: string;
}
// 语言接口定义
export interface Language {
  id: number;
  name: string;
  logo: string;
  flag: string;
  sort: number;
  status: string;
}
// 轮播图数据接口
export interface CarouselItem {
  id: number;
  name: string;
  sort: number;
  image: string;
  status: string;
  delFlag: string;
}
// 社交媒体链接接口
export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

// 多语言文本配置
export interface TextConfig {
  // Header 相关文本
  aboutUs: string;
  products: string;
  contactUs: string;
  searchPlaceholder: string;
  companyName: string;
  language: string;

  // Footer 相关文本
  companyDesc:string;
  quickLinks: string;
  address: string;
  copyrightInfo: string;
}


export interface Product {
  id: number;
  categoryId: number;
  productName: string;
  images: string[];
  details: string;
}

export interface ContactUsHint {
  id: number;
  name: string;
  lang: string;
  email: string;
  contact: string;
  company: string;
  details: string;
  code: string;
  send: string;
}

export interface AboutUs {
  id: number;
  name: string;
  lang: string;
  aboutUs: string;
}