"use client";

import { Category, Product } from "@/config/structure";
import { useGlobalData } from "@/context/GlobalContext";
import { getImageUrl } from "@/utils/imageUtils";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

// 修改第11行
export default function ProductDetailClient({ categorys, lang, product }: { categorys: Category[], lang: string, product: Product | null }) {
  // 然后在组件内部添加检查
  if (!product) {
    return <div>产品不存在</div>;
  }
  
  const { textConfig, furnishings } = useGlobalData();
  
  // 状态管理
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(product.categoryId);
  const [selectedImage, setSelectedImage] = useState<string>(product.images && product.images.length > 0 ? product.images[0] : '');
  
  // 切换分类展开/折叠
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  return (
    <div className='w-full overflow-x-hidden'>
      {/* 顶部横幅区域 - 与产品列表页相同 */}
      <div className="w-full h-48 sm:h-56 md:h-80 bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {furnishings && furnishings.image ? (
          <Image 
            src={getImageUrl(furnishings.image)} 
            alt={furnishings.name || "产品中心"}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 text-center">{textConfig.baseInfo.productsList}</h1>
        )}
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-2 sm:px-4 py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 左侧分类列表 - 与产品列表页相同 */}
          <div className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2">{textConfig.baseInfo.productsList}</h2>
            <div className="space-y-1">
              {categorys.map((category, index) => (
                <div key={category.id} className="relative mb-3 last:mb-0 group">
                  {/* 分类标题 */}
                  <div 
                    className={`flex items-center justify-between py-2.5 px-4 rounded-md transition-all duration-300 ease-in-out ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} ${
                      category.children && category.children.length > 0 ? 'cursor-pointer hover:translate-x-1' : ''
                    }`}
                    onClick={() => {
                      if (category.children && category.children.length > 0) {
                        toggleCategory(category.id);
                      }
                    }}
                  >
                    <Link 
                      href={`/${lang}/bucket-teeth`} 
                      className={`${selectedCategory === category.id ? 'font-medium' : ''} transition-all duration-300 relative pl-0 group-hover:pl-2 block w-full`}
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 bg-blue-500 rounded-full group-hover:w-1 group-hover:h-1 transition-all duration-300"></span>
                      {category.name}
                    </Link>
                    {category.children && category.children.length > 0 && (
                      <span className="transition-transform duration-300 ease-in-out transform">
                        {expandedCategories.includes(category.id) ? 
                          <MdKeyboardArrowDown className="text-blue-500" /> : 
                          <MdKeyboardArrowRight className="text-gray-500" />
                        }
                      </span>
                    )}
                  </div>
                  
                  {/* 系列列表（子分类） */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategories.includes(category.id) && category.children && category.children.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-6 mt-1 space-y-1 relative before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-100 before:to-gray-100">
                      {category.children && category.children.length > 0 && category.children.map(series => (
                        <div 
                          key={series.id}
                          className={`py-2 px-3 rounded-md text-sm transition-all duration-300 ease-in-out relative ${series.id === product.categoryId ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600 hover:translate-x-1'}`}
                        >
                          <Link 
                            href={`/${lang}/bucket-teeth`} 
                            className="relative inline-block pl-3 w-full"
                          >
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${series.id === product.categoryId ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            {series.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 分类之间的分隔线 */}
                  {index < categorys.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1 opacity-70"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 右侧产品详情 */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
              {/* 产品标题 */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">{product.name}</h1>
              
              <div className="flex flex-col lg:flex-row gap-8">
                {/* 左侧产品图片区域 */}
                <div className="w-full lg:w-2/5">
                  {/* 主图 */}
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 border border-gray-100">
                    {selectedImage ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(selectedImage)}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">无图片</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 缩略图列表 */}
                  {product.images && product.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                      {product.images.map((img, index) => (
                        <div 
                          key={index} 
                          className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-gray-100'}`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={getImageUrl(img)}
                              alt={`${product.name} - 图片 ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* 右侧产品详情 */}
                <div className="w-full lg:w-3/5">
                  {/* 产品描述 */}
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: product.details }} />
                  </div>
                  
                  {/* 返回按钮 */}
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link 
                      href={`/${lang}/bucket-teeth`}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      返回产品列表
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}