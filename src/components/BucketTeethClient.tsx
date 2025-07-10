"use client";

import { Category, Product, ProductData } from "@/config/structure";
import { useGlobalData } from "@/context/GlobalContext";
import { getImageUrl } from "@/utils/imageUtils";
import { productsRequest } from "@/config/reqest";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdOutlineChevronLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';

// 修改组件接口，将searchKeyword改为title
export default function BucketTeethClient({
  categorys,
  lang,
  products: initialProducts,
  title
}: {
  categorys: Category[],
  lang: string,
  products: ProductData,
  title?: string
}) {
  const { textConfig, furnishings } = useGlobalData();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 状态管理
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [showTitle, setShowTitle] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>(initialProducts.rows || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(initialProducts.total || 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pageSize = 12; // 每页显示12个产品

  // 初始化：设置标题和使用从服务器获取的初始产品数据
  useEffect(() => {
    // 设置初始标题
    setShowTitle(title || textConfig.baseInfo.productsList);
    // 使用从props传入的初始产品数据
    setProductList(initialProducts.rows || []);
    setTotalItems(initialProducts.total || 0);
    
    // 从URL参数中获取分类ID
    const categoryId = searchParams.get('categoryId');
    if (categoryId) {
      const catId = parseInt(categoryId);
      
      // 查找是否为顶级分类
      const topCategory = categorys.find(cat => cat.id === catId);
      if (topCategory) {
        setSelectedCategory(catId);
        setShowTitle(topCategory.name);
        setExpandedCategories(prev => [...prev, catId]);
        fetchProducts(catId, 1);
      } else {
        // 查找是否为子分类
        let foundParent = false;
        for (const cat of categorys) {
          if (cat.children) {
            const childCat = cat.children.find(child => child.id === catId);
            if (childCat) {
              setSelectedCategory(cat.id);
              setSelectedSeries(catId);
              setShowTitle(childCat.name);
              setExpandedCategories(prev => [...prev, cat.id]);
              fetchProducts(catId, 1);
              foundParent = true;
              break;
            }
          }
        }
      }
    }
  }, [initialProducts, title, textConfig.baseInfo.productsList, searchParams, categorys]);

  // 获取产品数据
  const fetchProducts = async (categoryId?: number, page: number = 1) => {
    setLoading(true);
    try {
      // 添加小延迟以便显示骨架屏加载状态
      const data: ProductData = await productsRequest(lang, page, pageSize, categoryId);

      // 添加最少300ms的延迟，确保骨架屏动画可见
      setTimeout(() => {
        setProductList(data.rows || []);
        setTotalItems(data.total || 0);
        setCurrentPage(page);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProductList([]);
      setTotalItems(0);
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
  
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // 选择分类
  const selectCategory = (categoryId: number, categoryName?: string) => {
    // 如果点击当前已选中的分类，则取消选择并显示全部产品
    if (selectedCategory === categoryId && !selectedSeries) {
      setSelectedCategory(null);
      setShowTitle(textConfig.baseInfo.productsList); // 重置标题为产品列表
      fetchProducts(undefined, 1);
      // 更新URL，移除categoryId参数
      router.push(`/${lang}/bucket-teeth`);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSeries(null);
      if (categoryName) {
        setShowTitle(categoryName); // 设置标题为分类名称
      }
      fetchProducts(categoryId, 1);
      // 更新URL，添加categoryId参数
      router.push(`/${lang}/bucket-teeth?categoryId=${categoryId}`);
    }
  };

  // 选择系列（子分类）
  const selectSeries = (categoryId: number, seriesId: number, categoryName?: string) => {
    if (categoryName) {
      setShowTitle(categoryName);
    }
    // 如果点击当前已选中的系列，则取消选择并显示父分类的产品
    if (selectedSeries === seriesId) {
      setSelectedSeries(null);
      fetchProducts(categoryId, 1);
      // 更新URL，使用父分类ID
      router.push(`/${lang}/bucket-teeth?categoryId=${categoryId}`);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSeries(seriesId);
      fetchProducts(seriesId, 1);
      // 更新URL，使用子分类ID
      router.push(`/${lang}/bucket-teeth?categoryId=${seriesId}`);
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
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-300"
        aria-label="上一页"
      >
        <MdOutlineChevronLeft className="text-gray-600 text-sm sm:text-base" />
      </button>
    );

    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === i ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600' : 'border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}
          aria-label={`第${i}页`}
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
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-300"
        aria-label="下一页"
      >
        <MdOutlineKeyboardArrowRight className="text-gray-600" />
      </button>
    );

    // 修改分页按钮容器，添加响应式间距和溢出处理
    return (
      <div className="flex justify-center items-center flex-wrap gap-2 xs:gap-3 mt-8 mb-4 px-2">
        {pages}
      </div>
    );
  };

  return (
    <div className='w-full overflow-x-hidden'>
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 text-center">{textConfig.baseInfo.productsList}</h1>
        )}
      </div>

      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-2 sm:px-4 py-6 md:py-12">
        {/* 现有的分类和产品展示代码保持不变 */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* 移动端分类切换按钮 - 仅在移动端显示 */}
          <button 
            className="md:hidden w-full py-3 px-4 bg-white rounded-lg shadow-sm flex items-center justify-between mb-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="font-medium text-gray-800">{textConfig.baseInfo.productsCategory}</span>
            <span className="transition-transform duration-300 ease-in-out transform">
              {mobileMenuOpen ? 
                <MdKeyboardArrowDown className="text-blue-500" /> : 
                <MdKeyboardArrowRight className="text-gray-500" />
              }
            </span>
          </button>
          
          {/* 左侧分类列表 - 重新设计边框样式，在移动端默认隐藏 */}
          <div className={`w-full md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden md:max-h-[1000px] md:opacity-100 md:overflow-visible'} md:block`}>
            <h2 className="text-lg font-semibold mb-6 text-gray-800 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/3 after:h-0.5 after:bg-blue-500 pb-2 text-center">{textConfig.baseInfo.productsCategory}</h2>
            <div className="space-y-1">
              {categorys.map((category, index) => (
                <div key={category.id} className="relative mb-3 last:mb-0 group">
                  {/* 分类标题 - 修改点击逻辑，只有有children的分类才可以点击 */}
                  <div
                    className={`flex items-center justify-between py-2.5 px-4 rounded-md transition-all duration-300 ease-in-out ${selectedCategory === category.id && !selectedSeries ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} ${category.children && category.children.length > 0 ? 'cursor-pointer hover:translate-x-1' : ''
                      }`}
                    onClick={() => {
                      if (category.children && category.children.length > 0) {
                        toggleCategory(category.id);
                        selectCategory(category.id, category.name);
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
                          <MdKeyboardArrowDown className="text-blue-500" /> :
                          <MdKeyboardArrowRight className="text-gray-500" />
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
                          onClick={() => selectSeries(category.id, series.id, series.name)}
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
            {/* 标题显示区域 - 修改为居中显示 */}
            {showTitle && (
              <div className="mb-6 p-4 rounded-sm border-b-2 border-blue-200 text-center">
                <h2 className="text-lg font-medium text-gray-800">
                  <span className="text-blue-600">{showTitle}</span>
                </h2>
              </div>
            )}

            {loading ? (
              // 骨架屏加载状态
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-7">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white shadow-sm overflow-hidden animate-pulse">
                    {/* 产品图片骨架 */}
                    <div className="relative aspect-square w-full bg-gray-200"></div>

                    {/* 产品信息骨架 */}
                    <div className="p-3 sm:p-5">
                      {/* 标题骨架 */}
                      <div className="h-6 bg-gray-200 rounded-sm mb-3 w-3/4 mx-auto"></div>

                      {/* 描述骨架 - 3行 */}
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded-sm w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-sm w-5/6 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded-sm w-4/6 mx-auto"></div>
                      </div>

                      {/* 查看详情按钮骨架 */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                        <div className="h-5 bg-gray-200 rounded-sm w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : productList.length > 0 ? (
              <>
                {/* 添加产品列表的过渡动画 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-7 animate-fadeIn">
                  {productList.map(product => (
                    <Link
                      key={product.id}
                      href={`/${lang}/bucket-teeth/${product.slug}`}
                      onClick={() => console.log("点击产品链接:", product.slug)}
                      className="group bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
                    >
                      {/* 产品图片 - 正方形布局，移除圆角 */}
                      <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={getImageUrl(product.images[0])}
                              alt={`${product.name || '产品'}`}
                              fill
                              sizes="520"
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <span className="text-gray-400">无图片</span>
                          </div>
                        )}
                      </div>

                      {/* 产品信息 - 改进样式，标题居中 */}
                      <div className="p-3 sm:p-5 relative">
                        {/* 添加装饰性元素 */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1/2"></div>
                        <h3 className="font-medium text-lg mb-3 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-center">{product.name}</h3>

                        {/* 修改这里，安全处理可能包含 HTML 的描述，并居中显示 */}
                        <p className="text-sm text-gray-600 line-clamp-1 leading-relaxed text-center">
                          {typeof product.seoDescription === 'string' ?
                            (product.seoDescription.startsWith('<') ?
                              stripHtml(product.seoDescription) :
                              product.seoDescription) :
                            ''}
                        </p>

                        {/* 查看详情按钮始终显示，居中 */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                          <span className="text-sm text-blue-500 font-medium flex justify-center items-center">
                            {textConfig.baseInfo.readMore} <MdOutlineKeyboardArrowRight className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* 分页控件 - 美化样式 */}
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

