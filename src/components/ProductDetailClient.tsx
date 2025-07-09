"use client";

import { Category, ContactUs, Product } from "@/config/structure";
import { useGlobalData } from "@/context/GlobalContext";
import { getImageUrl } from "@/utils/imageUtils";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdArrowBack } from "react-icons/md";

export default function ProductDetailClient({
  categorys,
  lang,
  product,
  relatedProducts = []
}: {
  categorys: Category[],
  lang: string,
  product: Product | null,
  relatedProducts?: Product[]
}) {
  // 组件内部添加检查
  if (!product) {
    return <div>404</div>;
  }

  const { textConfig, furnishings, contactUs, aboutUs } = useGlobalData();

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

  // 处理富文本内容中的图片路径
  const processHtmlContent = (htmlContent: string) => {
    if (!htmlContent) return '';

    // 替换图片的相对路径为完整URL
    return htmlContent.replace(/(<img[^>]+src=)(["\'])(?!http)([^"']+)(["\'])/gi, (match, p1, p2, p3, p4) => {
      const fullImageUrl = getImageUrl(p3.replace("/dev-api", ""));
      return `${p1}${p2}${fullImageUrl}${p4}`;
    });
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
                    className={`flex items-center justify-between py-2.5 px-4 rounded-md transition-all duration-300 ease-in-out ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} ${category.children && category.children.length > 0 ? 'cursor-pointer hover:translate-x-1' : ''
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
            <div className="bg-white p-4 md:p-6 lg:p-8">
              {/* 产品标题和返回按钮 - 重新排列 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-100">
                <Link
                  href={`/${lang}/bucket-teeth`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-3 sm:mb-0 flex items-center"
                >
                  <MdArrowBack className="mr-1" />
                  {textConfig.baseInfo.productsList}
                </Link>
                {/* <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">{product.name}</h1> */}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* 左侧产品图片区域 - 增大展示空间 */}
                <div className="w-full lg:w-3/5">
                  {/* 主图 - 去掉圆角和阴影 */}
                  <div className="aspect-square bg-white mb-4 border border-gray-100 transition-all duration-300">
                    {selectedImage ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(selectedImage)}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 520px"
                          className="object-contain p-4 hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">无图片</span>
                      </div>
                    )}
                  </div>

                  {/* 缩略图列表 - 修改为整体缩放效果 */}
                  {product.images && product.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-3">
                      {product.images.map((img, index) => (
                        <div
                          key={index}
                          className={`aspect-square cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-gray-100 hover:border-blue-200'} transition-all duration-300`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={getImageUrl(img)}
                              alt={`${product.name} - 图片 ${index + 1}`}
                              fill
                              sizes="100px"
                              className="object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 右侧空白区域 - 原产品详情位置保留空白 */}
                <div className="w-full lg:w-2/5">

                  {/* 产品名称和描述 */}
                  <div className="bg-white p-4 md:p-6 lg:p-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 pb-2 border-b-2 border-b-gray-100">{product.name}</h2>
                    <p className="text-gray-600 line-clamp-12 mb-4 leading-6 min-h-[6rem] whitespace-normal break-words">
                      {product.seoDescription}
                    </p>


                    {/* 联系我们按钮 */}
                    <div className="mb-5">
                      <Link
                        href={`/${lang}/contact`}
                        className="inline-block border border-blue-500 font-medium text-blue-500 py-2 px-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm">{textConfig.baseInfo.contactUs}</span>
                          <MdKeyboardArrowRight className="text-lg" />
                        </div>
                      </Link>
                    </div>

                    {/* 社交媒体联系图标 */}
                    <div className="flex space-x-3 items-center mb-5">
                      {contactUs && contactUs.map((contact: ContactUs, index: number) => {
                        if (contact.type === 'WhatsApp') {
                          return (
                            <a
                              key={contact.link}
                              href={contact.link}
                              target="_blank"
                              className={`transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                              aria-label={contact.name}
                              style={{ animationDelay: `${index * 100}ms` }}>
                              <FaWhatsapp className='text-2xl text-green-500' />
                            </a>
                          )
                        }
                        if (contact.type === 'Facebook') {
                          return (
                            <a
                              key={contact.link}
                              href={contact.link}
                              target="_blank"
                              className={`transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                              aria-label={contact.name}
                              style={{ animationDelay: `${index * 100}ms` }}>
                              <FaFacebook className='text-2xl text-blue-600' />
                            </a>
                          );
                        }
                        if (contact.type === 'Instagram') {
                          return (
                            <a
                              key={contact.link}
                              href={contact.link}
                              target="_blank"
                              className={`transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                              aria-label={contact.name}
                              style={{ animationDelay: `${index * 100}ms` }}>
                              <FaInstagram className='text-2xl text-pink-500' />
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* 产品描述 - 移到相关产品上方 */}
            <div className="mt-4 bg-white p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 relative after:absolute after:bottom-0 after:left-0 after:w-24 after:h-0.5 after:bg-blue-500">产品描述</h2>
              <div className="prose max-w-none bg-white">
                <div dangerouslySetInnerHTML={{ __html: processHtmlContent(product.details) }} />
              </div>
            </div>

            {/* 关于我们的文章 */}
            {aboutUs && aboutUs.aboutUs && (
              <div className="mt-4 bg-white p-4 md:p-6">

                <div className="prose max-w-none bg-white max-h-96 overflow-y-auto">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processHtmlContent(aboutUs.aboutUs)
                    }}
                    className="about-content overflow-x-auto"
                  />
                </div>
              </div>
            )}

            {/* 底部相关产品列表 - 去掉圆角和阴影 */}
            <div className="mt-8 bg-white p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100 relative after:absolute after:bottom-0 after:left-0 after:w-24 after:h-0.5 after:bg-blue-500">相关产品</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProducts.length > 0 ? (
                  relatedProducts.slice(0, 6).map(relatedProduct => (
                    <Link
                      key={relatedProduct.id}
                      href={`/${lang}/bucket-teeth/${relatedProduct.slug}`}
                      className="group bg-white border border-gray-100 hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* 产品图片 */}
                      <div className="relative aspect-square w-full flex items-center justify-center">
                        {relatedProduct.images && relatedProduct.images.length > 0 ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={getImageUrl(relatedProduct.images[0])}
                              alt={`${relatedProduct.name || '产品'}`}
                              fill
                              sizes="520"
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            {/* 添加渐变遮罩效果 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white">
                            <span className="text-gray-400">无图片</span>
                          </div>
                        )}
                      </div>

                      {/* 产品信息 */}
                      <div className="p-3 sm:p-4 relative">
                        <div className="absolute top-0 left-0 w-10 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1/2"></div>
                        <h3 className="font-medium text-base mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{relatedProduct.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{relatedProduct.seoDescription}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">暂无相关产品</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}