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

// 处理富文本内容中的图片路径
export const processHtmlContent = (htmlContent: string) => {
    if (!htmlContent) return '';
    
    // 替换图片的相对路径为完整URL
    return htmlContent.replace(/(<img[^>]+src=)(["\'])(?!http)([^"']+)(["\'])/gi, (match, p1, p2, p3, p4) => {
      const fullImageUrl = getImageUrl(p3);
      return `${p1}${p2}${fullImageUrl}${p4}`;
    });
  };