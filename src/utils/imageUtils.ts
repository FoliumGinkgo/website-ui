import { API_BASE_URL } from '@/config/api';

/**
 * 处理图片路径 - 如果是相对路径则添加API_BASE_URL
 * @param imagePath 图片路径
 * @returns 完整的图片URL
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // 如果已经是完整的URL（包含http或https），直接返回
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 如果是相对路径，添加API_BASE_URL
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

/**
 * 获取默认图片URL
 * @returns 默认图片路径
 */
export const getDefaultImageUrl = (): string => {
  return '/logo.png';
};

/**
 * 处理图片加载错误
 * @param event 图片错误事件
 * @param fallbackUrl 备用图片URL
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallbackUrl?: string) => {
  const target = event.currentTarget;
  const defaultUrl = fallbackUrl || getDefaultImageUrl();
  
  // 避免无限循环
  if (target.src !== defaultUrl) {
    target.src = defaultUrl;
  }
};