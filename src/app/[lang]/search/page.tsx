import React from 'react';
import { categoryRequest, productsRequest } from '@/config/request';
import { Category, ProductData } from '@/config/structure';
import BucketTeethClient from '@/components/BucketTeethClient';

// 搜索结果页面组件
export default async function Search({ params, searchParams }: { params: { lang: string }, searchParams: { keyword?: string } }) {
  // 从params中获取动态路由参数和搜索关键词
  const { lang } = params;
  const { keyword } = searchParams;

  // 服务器端数据获取
  let categorys: Category[] = [];
  let products: ProductData = {
    code: 0,
    msg: '',
    rows: [],
    total: 0
  };
  
  try {
    const data = await categoryRequest(lang);
    categorys = data;
  } catch (error) {
    console.error('Failed to fetch category data:', error);
  }
  
  try {
    // 如果有关键词，则使用关键词搜索产品
    const data = await productsRequest(lang, 1, 12, undefined, keyword);
    products = data;
  } catch (error) {
    console.error('Failed to fetch products data:', error);
  }
  
  return (
    <>
      <BucketTeethClient 
        categorys={categorys} 
        lang={lang} 
        products={products} 
        title={keyword} 
      />
    </>
  )
}