// API配置文件
export const API_BASE_URL = 'http://47.113.217.170:5555/prod-api';

// API端点
export const API_ENDPOINTS = {
  LANGUAGE: '/website/language/language',
  CAROUSEL: '/website/carousel/carousel',
  PRODUCTS: '/website/product/list',
  ABOUT: '/website/aboutUs/getAboutUs',
  CONTACT_US_HINT: '/website/contactUsHint/getContactUsHint',
};

// 构建完整API URL的辅助函数
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};