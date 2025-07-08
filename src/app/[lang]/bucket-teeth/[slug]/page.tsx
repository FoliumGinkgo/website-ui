import React from 'react';
import { categoryRequest, productDetailRequest, productsRequest } from '@/config/reqest';
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
      const relatedProductsData = await productsRequest(lang, 1, 5, undefined, product?.name);
      // 过滤掉当前产品
      relatedProducts = relatedProductsData.rows.filter((item: Product) => item.id !== product?.id).slice(0, 4);
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