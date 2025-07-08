import React from 'react';
import { categoryRequest, productDetailRequest } from '@/config/reqest';
import { Category, Product } from '@/config/structure';
import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';

// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function ProductDetail({ params }: { params: { lang: string, slug: string } }) {
  // 从params中获取动态路由参数
  const { lang, slug } = await params;
  // 服务器端数据获取
  let categorys: Category[] = [];
  let product: Product | null = null;
  
  try {
    // 获取分类数据
    const categoryData = await categoryRequest(lang);
    categorys = categoryData;
    
    // 获取产品详情数据
    const productData = await productDetailRequest(slug, lang);
    
    // 临时注释掉404重定向，用于调试
    if (productData && productData.id) {
      product = productData;
    } else {
      // 如果没有找到产品，返回404
      return notFound();
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // 临时注释掉错误处理的404重定向
    // return notFound();
  }

  return (
    <>
      <ProductDetailClient 
        categorys={categorys} 
        lang={lang} 
        product={product} 
      />
    </>
  )
}