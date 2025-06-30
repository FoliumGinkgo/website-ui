import { buildApiUrl, API_ENDPOINTS } from "./api";

//语言请求地址
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