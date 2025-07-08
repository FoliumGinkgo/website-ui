import { buildApiUrl, API_ENDPOINTS } from "./api";
import { CONTACT_US_HINT } from "./constants";
import { AboutUs } from "./structure";

//语言接口请求
export const langRequest = async () => {
  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.LANGUAGE));
    const data = await response.json();
    return (data && data.data) ? data.data : [];
  } catch (error) {
    console.error('Error:', error);
    return []; // 返回空对象作为默认值
  }
};

//轮播图接口请求
export const carouselRequest = async () => {
  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.CAROUSEL));
    const data = await response.json();
    return (data && data.data) ? data.data : [];
  } catch (error) {
    console.error('Error:', error);
    return []; // 返回空对象作为默认值
  }
};

//关于我们请求
export const aboutUsRequest = async (lang: string) => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.ABOUT_US + `?lang=${lang}`));
    const data = await res.json();
    return (data && data.data) ? data.data : { name: "About Us", aboutUs: "About Us" } as AboutUs;
  } catch (error) {
    console.error('Error:', error);
    return { name: "About Us", aboutUs: "About Us" }; // 返回空对象作为默认值
  }
}
//联系人提示接口请求
export const contactUsHintRequest = async (lang: string) => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.CONTACT_US_HINT + `?lang=${lang}`));
    const data = await res.json();
    return (data && data.data) ? data.data : CONTACT_US_HINT;
  } catch (error) {
    console.error('Error:', error);
    return CONTACT_US_HINT; // 返回空对象作为默认值
  }
}

//联系人接口请求
export const contactRequest = async () => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.CONTACT));
    const data = await res.json();
    return (data && data.data) ? data.data : [];
  } catch (error) {
    console.error('Error:', error);
    return []; // 返回空对象作为默认值
  }
};

//产品接口请求
export const productsRequest = async (lang: string, pageNum: number = 1, pageSize: number = 12, categoryId?: number) => {
  try {
    let url = buildApiUrl(API_ENDPOINTS.PRODUCTS + `?lang=${lang}&pageNum=${pageNum}&pageSize=${pageSize}`);
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data || { rows: [], total: 0 };
  } catch (error) {
    console.error('Error:', error);
    return { rows: [], total: 0 }; // 返回空对象作为默认值
  }
};
//分类接口请求
export const categoryRequest = async (lang: string) => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.CATEGORY + `?lang=${lang}`));
    const data = await res.json();
    return (data && data.data) ? data.data : [];
  } catch (error) {
    console.error('Error:', error);
    return []; // 返回空对象作为默认值
  }
}


// 全局数据请求
export const globalDataRequest = async (lang: string) => {
  try {
    // 这里先使用一个占位URL，您可以根据实际情况修改
    const res = await fetch(buildApiUrl(API_ENDPOINTS.GLOBAL_DATA + `?lang=${lang}`));
    const data = await res.json();
    return (data && data.data) ? data.data : {};
  } catch (error) {
    console.error('Error fetching global data:', error);
    return {}; // 返回空对象作为默认值
  }
}

//横图数据请求
export const furnishingsRequest = async () => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.FURNISHINGS));
    const data = await res.json();
    return (data && data.data) ? data.data : {};
  } catch (error) {
    console.error('Error fetching furnishings data:', error);
    return {}; // 返回空对象作为默认值
  }
}

//产品详情接口请求
export const productDetailRequest = async (slug: string) => {
  try {
    console.log(buildApiUrl(API_ENDPOINTS.PRODUCT_DETAIL + `?slug=${slug}`));
    const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCT_DETAIL + `?slug=${slug}`));
    const data = await res.json();
    return (data && data.data) ? data.data : {};
  } catch (error) {
    console.error('Error fetching product detail data:', error);
    return {}; // 返回空对象作为默认值
  }
}
