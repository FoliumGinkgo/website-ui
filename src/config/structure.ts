// 菜单项接口
export interface MenuItem {
  name: string;
  href: string;
}
// 语言接口定义
export interface Language {
  id: number;
  name: string;
  logo: string;
  lang: string;
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
  navigationList: MenuItem[];
  baseInfo: {
    aboutUs: string;
    contactUs: string;
    searchPlaceholder: string;
    companyName: string;
    language: string;
    contact: string;
    quickLinks: string;
    companyDesc: string;
    address: string;
    copyrightInfo: string;
    productsList: string;
    productsCategory: string;
    readMore: string;
    relatedProducts: string;
  };
  contactUs: ContactUs[];
}

// 定义全局数据类型，根据实际需求调整
export interface GlobalData {
  [key: string]: any;
  textConfig: TextConfig;
  furnishings: Furnishings;
  contactUs: ContactUs[];
  languages: Language[];
}
export interface ContactUs {
  id: number;
  name: string;
  link: string;
  isLink: string;
  type: string;
  status: string;
  remark: string;
}
//横图
export interface Furnishings {
  id: number;
  name: string;
  image: string;
  status: string;
  delFlag: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  baseId: number;
  lang: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  images: string[];
  details: string;
}

export interface ProductData {
  code: number;
  msg: string;
  rows: Product[];
  total: number;
}

export interface Category {
  id: number;
  parentId: number;
  name: string;
  lang: string;
  status: string;
  delFlag: string;
  children: Category[];
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
