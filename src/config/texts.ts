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

// 根据语言标识获取文本配置
export const getTexts = (language: string): TextConfig => {
  switch (language) {
    case 'en':
    default:
      return enTexts;
  }
};