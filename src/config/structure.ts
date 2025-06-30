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
// 社交媒体链接接口
export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

// 多语言文本配置
export interface TextConfig {
  // Header 相关文本
  home: string;
  about: string;
  products: string;
  contact: string;
  search: string;
  searchPlaceholder: string;
  menu: string;
  companyName: string;
  language: string;
  
  // Carousel 相关文本
  loading: string;
  loadingFailed: string;
  noDataAvailable: string;
  previous: string;
  next: string;
  goToSlide: string;

  // Footer 相关文本
  contactInfo: string;
  quickLinks: string;
}