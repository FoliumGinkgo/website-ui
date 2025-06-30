import { buildApiUrl, API_ENDPOINTS } from "./api";

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
