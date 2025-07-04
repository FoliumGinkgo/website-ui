"use client";

import { Product } from "@/config/structure";
import { useGlobalData } from "@/context/GlobalContext";
import { getImageUrl } from "@/utils/imageUtils";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

// 定义分类接口
interface Category {
  id: number;
  name: string;
  series: Series[];
}

// 定义系列接口
interface Series {
  id: number;
  name: string;
  products: Product[];
}

export default function BucketTeethClient({products}: {products: Product[]}) {
  const {textConfig, furnishings} = useGlobalData();
  
  // 状态管理
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  
  // 处理产品数据，按分类和系列组织
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    // 模拟从产品数据中提取分类和系列
    // 实际应用中，这些数据可能需要从API获取或有更明确的结构
    const categoriesMap = new Map<number, Category>();
    
    // 假设产品数据中的categoryId表示分类ID
    // 这里简单处理，实际可能需要更复杂的逻辑
    products.forEach(product => {
      const categoryId = product.categoryId;
      
      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          id: categoryId,
          name: `分类 ${categoryId}`, // 实际应用中应该使用真实分类名称
          series: []
        });
      }
      
      const category = categoriesMap.get(categoryId)!;
      
      // 简单示例：使用产品ID的最后一位数字作为系列ID
      // 实际应用中应该有明确的系列字段
      const seriesId = product.id % 10;
      let series = category.series.find(s => s.id === seriesId);
      
      if (!series) {
        series = {
          id: seriesId,
          name: `系列 ${seriesId}`, // 实际应用中应该使用真实系列名称
          products: []
        };
        category.series.push(series);
      }
      
      series.products.push(product);
    });
    
    setCategories(Array.from(categoriesMap.values()));
    
    // 默认选择第一个分类的第一个系列（如果存在）
    if (categoriesMap.size > 0) {
      const firstCategory = Array.from(categoriesMap.values())[0];
      setExpandedCategories([firstCategory.id]);
      
      if (firstCategory.series.length > 0) {
        const firstSeries = firstCategory.series[0];
        setSelectedSeries(firstSeries.id);
        setDisplayProducts(firstSeries.products);
      }
    }
  }, [products]);
  
  // 切换分类展开/折叠
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  // 选择系列
  const selectSeries = (categoryId: number, seriesId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const series = category.series.find(s => s.id === seriesId);
    if (!series) return;
    
    setSelectedSeries(seriesId);
    setDisplayProducts(series.products);
  };

  return (
    <div className='w-full'>
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
      <div className="w-full h-48 sm:h-56 md:h-80 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {furnishings && furnishings.image ? (
          <Image 
            src={getImageUrl(furnishings.image)} 
            alt={furnishings.name || "About Us"}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 text-center">{textConfig.baseInfo.products}</h1>
        )}
      </div>

      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 左侧分类列表 */}
          <div className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">{textConfig.baseInfo.products}</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="border-b pb-2 last:border-b-0">
                  {/* 分类标题 */}
                  <div 
                    className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="font-medium">{category.name}</span>
                    {expandedCategories.includes(category.id) ? 
                      <FaChevronDown className="text-gray-500" /> : 
                      <FaChevronRight className="text-gray-500" />
                    }
                  </div>
                  
                  {/* 系列列表 */}
                  {expandedCategories.includes(category.id) && (
                    <div className="pl-4 mt-1 space-y-1">
                      {category.series.map(series => (
                        <div 
                          key={series.id}
                          className={`py-1 px-2 cursor-pointer rounded text-sm ${selectedSeries === series.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'}`}
                          onClick={() => selectSeries(category.id, series.id)}
                        >
                          {series.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 右侧产品展示 */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {displayProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    {/* 产品图片 */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={getImageUrl(product.images[0])}
                          alt={product.productName}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">无图片</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 产品信息 */}
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.productName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{product.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">请选择一个系列查看产品</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

