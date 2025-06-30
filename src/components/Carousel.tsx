'use client';

import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { buildApiUrl, API_ENDPOINTS } from '@/config/api';
import { getImageUrl } from '@/utils/imageUtils';
import { BASE_TEXT } from '@/config/constants';

// 轮播图数据接口
interface CarouselItem {
  id: number;
  name: string;
  sort: number;
  image: string;
  status: string;
  delFlag: string;
}

// API响应接口
interface CarouselResponse {
  msg: string;
  code: number;
  data: CarouselItem[];
}

const Carousel = () => {
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  

  // 获取轮播图数据
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(API_ENDPOINTS.CAROUSEL));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: CarouselResponse = await response.json();
        
        if (result.code === 200 && result.data) {
          // 过滤有效数据并按sort排序
          const validData = result.data
            .filter(item => item.status === '0' && item.delFlag === '0')
            .sort((a, b) => a.sort - b.sort);
          setCarouselData(validData);
        }
      } catch (err) {
        console.error('获取轮播图数据失败:', err);
        // 简化错误处理：静默失败，不显示错误信息
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []);

  // 自动轮播
  useEffect(() => {
    if (carouselData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  // 上一张
  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1
    );
  };

  // 下一张
  const goToNext = () => {
    setCurrentIndex(
      currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1
    );
  };

  // 跳转到指定索引
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">{BASE_TEXT.loading}</div>
      </div>
    );
  }

  // 无数据状态（移除错误状态显示）
  if (carouselData.length === 0) {
    return (
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">{BASE_TEXT.noDataAvailable}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* 轮播图片容器 - 全宽度显示 */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((item, index) => (
          <div key={item.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* 左右导航按钮 */}
      {carouselData.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
            aria-label={BASE_TEXT.previous}
          >
            <MdChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
            aria-label={BASE_TEXT.next}
          >
            <MdChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}
      {/* 指示器 */}
      {carouselData.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`${BASE_TEXT.goToSlide} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;