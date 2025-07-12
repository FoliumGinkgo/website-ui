import React from 'react';
import { categoryRequest, productDetailRequest, relatedProductsRequest } from '@/config/request';
import { Category, Product } from '@/config/structure';
import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { langRequest } from '@/config/request';
import { LANGUAGES } from '@/config/constants';
import { setSupportedLanguages, getSupportedLanguages } from '@/config/languageConfig';

// 动态生成产品详情页的元数据
export async function generateMetadata({ params }: { params: { lang: string, slug: string } }): Promise<Metadata>
{
  const { lang, slug } = params;
  
  // 获取支持的语言列表
  let languages = await langRequest();
  if (languages.length === 0) {
    languages = LANGUAGES;
  }
  
  // 设置全局支持的语言列表
  setSupportedLanguages(languages);
  
  // 获取产品详情数据
  const product = await productDetailRequest(slug, lang);
  
  if (!product || !product.id) {
    return {
      title: '产品未找到 | Product Not Found',
      description: '请求的产品不存在或已被移除 | The requested product does not exist or has been removed'
    };
  }
  
  // 获取当前URL的基础部分（不包含语言代码）
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.xhget-tooth.com';
  
  // 生成alternates对象，包含所有支持语言的hreflang标记
  const alternates: Record<string, string> = {};
  const languageMap: Record<string, string> = {};
  
  // 为每种语言生成产品URL
  languages.forEach((langItem: { lang: string; }) => {
    alternates[langItem.lang] = `${baseUrl}/${langItem.lang}/bucket-teeth/${slug}`;
    languageMap[`x-default`] = `${baseUrl}/en/bucket-teeth/${slug}`; // 默认使用英语
  });
  
  // 使用产品的SEO标题和描述
  const title = product.seoTitle || product.name;
  const description = product.seoDescription || `${product.name}`;
  
  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${baseUrl}/${lang}/bucket-teeth/${slug}`,
      languages: alternates,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${lang}/bucket-teeth/${slug}`,
      locale: lang,
      type: 'website',
      images: product.images && product.images.length > 0 ? [
        {
          url: product.images[0].startsWith('http') ? product.images[0] : `${baseUrl}${product.images[0]}`,
          width: 800,
          height: 600,
          alt: product.name
        }
      ] : []
    }
  };
}

// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function ProductDetail({ params }: { params: { lang: string, slug: string } }) {
  // 从params中获取动态路由参数
  const { lang, slug } = params;
  // 服务器端数据获取
  let categorys: Category[] = [];
  let product: Product | null = null;
  let relatedProducts: Product[] = [];
  
  try {
    // 获取分类数据
    const categoryData = await categoryRequest(lang);
    categorys = categoryData;
    
    // 获取产品详情数据
    const productData = await productDetailRequest(slug, lang);
    
    // 临时注释掉404重定向，用于调试
    if (productData && productData.id) {
      product = productData;
      
      // 获取相关产品数据 - 使用产品名称进行模糊查询
      const relatedProductsData = await relatedProductsRequest(lang, 7, product?.name);
      // 过滤掉当前产品
      relatedProducts = relatedProductsData.filter((item: Product) => item.id !== product?.id);
    } else {
      // 如果没有找到产品，返回404
      return notFound();
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return (
    <>
      <ProductDetailClient 
        categorys={categorys} 
        lang={lang} 
        product={product} 
        relatedProducts={relatedProducts}
      />
    </>
  )
}