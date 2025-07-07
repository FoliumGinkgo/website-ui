"use client";

import { Category, Product, ProductData } from "@/config/structure";
import { useGlobalData } from "@/context/GlobalContext";
import { getImageUrl } from "@/utils/imageUtils";
import { productsRequest } from "@/config/reqest";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function BucketTeethClient({categorys, lang, products: initialProducts}: {categorys: Category[], lang: string, products: ProductData}) {
  const {textConfig, furnishings} = useGlobalData();
  
  // 状态管理
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [productList, setProductList] = useState<Product[]>(initialProducts.rows || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(initialProducts.total || 0);
  const pageSize = 6; // 每页显示6个产品
  
  // 初始化：使用从服务器获取的初始产品数据
  useEffect(() => {
    // 使用从props传入的初始产品数据
    setProductList(initialProducts.rows || []);
    setTotalItems(initialProducts.total || 0);
  }, [initialProducts]);
  
  // 获取产品数据
  const fetchProducts = async (categoryId?: number, page: number = 1) => {
    setLoading(true);
    try {
      const data: ProductData = await productsRequest(lang, page, pageSize, categoryId);
      setProductList(data.rows || []);
      setTotalItems(data.total || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProductList([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };
  
  // 切换分类展开/折叠
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  // 选择分类
  const selectCategory = (categoryId: number) => {
    // 如果点击当前已选中的分类，则取消选择并显示全部产品
    if (selectedCategory === categoryId && !selectedSeries) {
      setSelectedCategory(null);
      fetchProducts(undefined, 1);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSeries(null);
      fetchProducts(categoryId, 1);
    }
  };
  
  // 选择系列（子分类）
  const selectSeries = (categoryId: number, seriesId: number) => {
    // 如果点击当前已选中的系列，则取消选择并显示父分类的产品
    if (selectedSeries === seriesId) {
      setSelectedSeries(null);
      fetchProducts(categoryId, 1);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSeries(seriesId);
      fetchProducts(seriesId, 1);
    }
  };
  
  // 处理分页
  const handlePageChange = (page: number) => {
    const categoryId = selectedSeries || selectedCategory;
    fetchProducts(categoryId ?? undefined, page);
  };
  
  // 计算总页数
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // 生成分页按钮
  const renderPagination = () => {
    // 即使只有一页也显示分页
    const pages = [];
    const maxVisiblePages = 5;
    
    // 确定显示哪些页码
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages || 1, startPage + maxVisiblePages - 1);
    
    // 调整起始页，确保显示正确数量的页码
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // 添加上一页按钮
    pages.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaAngleLeft />
      </button>
    );
    
    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md border ${currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }
    
    // 添加下一页按钮
    pages.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === (totalPages || 1)}
        className="px-3 py-1 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaAngleRight />
      </button>
    );
    
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {pages}
      </div>
    );
  };

  return (
    <div className='w-full'>
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 text-center">{textConfig.baseInfo.products}</h1>
        )}
      </div>

      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 左侧分类列表 - 重新设计边框样式 */}
          <div className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2">{textConfig.baseInfo.products}</h2>
            <div className="space-y-1">
              {categorys.map((category, index) => (
                <div key={category.id} className="relative mb-3 last:mb-0 group">
                  {/* 分类标题 - 修改点击逻辑，只有有children的分类才可以点击 */}
                  <div 
                    className={`flex items-center justify-between py-2.5 px-4 rounded-md transition-all duration-300 ease-in-out ${selectedCategory === category.id && !selectedSeries ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} ${
                      category.children && category.children.length > 0 ? 'cursor-pointer hover:translate-x-1' : ''
                    }`}
                    onClick={() => {
                      if (category.children && category.children.length > 0) {
                        toggleCategory(category.id);
                        selectCategory(category.id);
                      }
                    }}
                  >
                    <span className={`${selectedCategory === category.id && !selectedSeries ? 'font-medium' : ''} transition-all duration-300 relative pl-0 group-hover:pl-2`}>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 bg-blue-500 rounded-full group-hover:w-1 group-hover:h-1 transition-all duration-300"></span>
                      {category.name}
                    </span>
                    {category.children && category.children.length > 0 && (
                      <span className="transition-transform duration-300 ease-in-out transform">
                        {expandedCategories.includes(category.id) ? 
                          <FaChevronDown className="text-blue-500" /> : 
                          <FaChevronRight className="text-gray-500" />
                        }
                      </span>
                    )}
                  </div>
                  
                  {/* 系列列表（子分类） - 美化样式并添加过渡动画 */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategories.includes(category.id) && category.children && category.children.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-6 mt-1 space-y-1 relative before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-100 before:to-gray-100">
                      {category.children && category.children.length > 0 && category.children.map(series => (
                        <div 
                          key={series.id}
                          className={`py-2 px-3 cursor-pointer rounded-md text-sm transition-all duration-300 ease-in-out relative ${selectedSeries === series.id ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600 hover:translate-x-1'}`}
                          onClick={() => selectSeries(category.id, series.id)}
                        >
                          <span className="relative inline-block pl-3">
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${selectedSeries === series.id ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            {series.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 分类之间的分隔线 - 使用渐变效果替代实线 */}
                  {index < categorys.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1 opacity-70"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 右侧产品展示 */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : productList.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {productList.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      {/* 产品图片 - 修复alt属性 */}
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={getImageUrl(product.images[0])}
                            alt={`${product.name || '产品'}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">无图片</span>
                          </div>
                        )}
                      </div>
                      
                      {/* 产品信息 - 确保name显示 */}
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-2 line-clamp-2 text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{product.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 分页控件 - 始终显示 */}
                {renderPagination()}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">该分类下暂无产品</p>
                {/* 即使没有产品也显示分页 */}
                {renderPagination()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

