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
}

// 英文文本
export const enTexts: TextConfig = {
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
  goToSlide: 'Go to slide'
};

// 中文文本
export const zhTexts: TextConfig = {
  // Header
  home: '首页',
  about: '关于我们',
  products: '产品中心',
  contact: '联系我们',
  search: '搜索',
  searchPlaceholder: '搜索产品...',
  menu: '菜单',
  companyName: '鑫航公司',
  language: '语言',
  
  // Carousel
  loading: '加载中...',
  loadingFailed: '加载失败',
  noDataAvailable: '暂无轮播图数据',
  previous: '上一张',
  next: '下一张',
  goToSlide: '跳转到第'
};

// 根据语言标识获取文本配置
export const getTexts = (language: string): TextConfig => {
  switch (language) {
    case 'zh':
      return zhTexts;
    case 'en':
    default:
      return enTexts;
  }
};