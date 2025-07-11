// API配置文件
export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
// export const API_BASE_URL = 'http://47.113.217.170:5555/prod-api';

// API端点
export const API_ENDPOINTS = {
  LANGUAGE: '/website/language/language',//语言列表
  CAROUSEL: '/website/carousel/carousel',//轮播图
  CONTACT:'/website/contact/getContact',//联系我们
  PRODUCTS: '/website/product/productList',//产品信息列表
  HOT_PRODUCTS: '/website/product/productHot',//热门产品
  RELATED_PRODUCTS: '/website/product/relatedProducts',//相关产品
  PRODUCT_DETAIL: '/website/product/productsInfo',//产品详情
  ABOUT_US: '/website/aboutUs/getAboutUs',//关于我们提示
  CONTACT_US_HINT: '/website/contactUsHint/getContactUsHint',//联系我们输入框提示
  GLOBAL_DATA: '/website/baseInfo/getBaseInfo',//基础信息
  FURNISHINGS: '/website/furnishings/getFurnishings',//横图地址
  CATEGORY: '/website/category/categoryTree',//产品分类
  CAPTCHA_IMAGE: '/captchaImage',//验证码图片
  SUBMIT_CONTACT: '/website/contactUs/addContact',//发送联系方式
  HOME_INFO: '/website/homeInfo/getHomeInfo',//首页信息
};

// 构建完整API URL的辅助函数
export const buildApiUrl = (endpoint: string): string => {
  // 去掉前后可能出现的 "/"
  return `${API_BASE_URL?.replace(/\/+$/, '') || ''}/${endpoint.replace(/^\/+/, '')}`;
};
