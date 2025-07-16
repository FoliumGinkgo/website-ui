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

export interface CategoryCache {
  [categoryId: number] : ProductData;
}

// 定义全局数据类型，根据实际需求调整
export interface GlobalData {
  [key: string]: any;
  textConfig: TextConfig;
  furnishings: Furnishings;
  contactUs: ContactUs[];
  languages: Language[];
  aboutUs: AboutUs;
  categoriesCache: CategoryCache;
}
//联系我们
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
//产品结构
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
//产品数据结构
export interface ProductData {
  code: number;
  msg: string;
  rows: Product[];
  total: number;
}
//分类
export interface Category {
  id: number;
  parentId: number;
  name: string;
  lang: string;
  status: string;
  delFlag: string;
  children: Category[];
}
//联系我们提示
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
//关于我们
export interface AboutUs {
  id: number;
  name: string;
  lang: string;
  aboutUs: string;
}
//验证码
export interface CaptchaImage{
  code: number;//状态码
  img: string;//base64可直接渲染
  uuid: string;//验证码id，用于校验
  msg: string;//消息
}
//公司优势结构
export interface CompanyAdvantage {
  logo: string;
  title: string;
  description: string;
}

export interface CategoryImage {
  categoryId: number;
  categoryImage: string;
}

export interface HomeInfo{
  id?: number;
  companyAdvantageTitle: string;
  lang: string;
  status: string;
  companyAdvantages: CompanyAdvantage[];
  categoryImages: CategoryImage[];
  websiteCategories: Category[];
}
