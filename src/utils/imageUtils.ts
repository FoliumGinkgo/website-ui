import { API_BASE_URL } from '@/config/api';

/**
 * 处理图片路径 - 如果是相对路径则添加API_BASE_URL
 * @param imagePath 图片路径
 * @returns 完整的图片URL
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // 其他情况拼API_BASE_URL
  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`;
};
