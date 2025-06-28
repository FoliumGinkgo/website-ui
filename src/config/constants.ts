// 菜单项接口
export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

// 社交媒体链接接口
export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
}

// 页面路由
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  PRODUCTS: '/bucket-teeth',
  CONTACT: '/contact-us',
  PRIVACY: '/privacy',
  TERMS: '/terms'
};

// 默认公司信息
export const COMPANY_INFO = {
  EMAIL: 'info@xinhang.com',
  PHONE: '+86 123 4567 8900',
  ADDRESS: {
    en: 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China',
    zh: '中国上海市浦东新区张江高科技园区'
  }
};