import { buildApiUrl, API_ENDPOINTS } from "./api";
import { AboutUs, ContactUsHint } from "./structure";

//语言接口请求
export const langRequest = async () => {
  try {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.LANGUAGE));
    const data = await response.json();
    return data ? data.data:[];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//轮播图接口请求
export const carouselRequest = async () => {
  try {
    const response =  await fetch(buildApiUrl(API_ENDPOINTS.CAROUSEL));
    const data = await response.json();
    return data ? data.data:[];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//关于我们请求
export const aboutUsRequest = async (lang: string) => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.ABOUT + `?lang=${lang}`));
    const data = await res.json();
    return data ? data.data:{} as AboutUs;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const contactUsRequest = async (lang: string) => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.CONTACT_US_HINT + `?lang=${lang}`));
    const data = await res.json();
    return data ? data.data:{} as ContactUsHint;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


//产品接口请求
export const productsRequest = async () => {
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS));
    const data = await res.json();
    return (data && data.rows) ? data.rows:[];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};