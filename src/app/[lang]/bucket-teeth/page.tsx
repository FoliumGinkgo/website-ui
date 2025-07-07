
import React from 'react';
import { categoryRequest, productsRequest } from '@/config/reqest';
import { Category, ProductData } from '@/config/structure';
import BucketTeethClient from '@/components/BucketTeethClient';

// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function BucketTeeth({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;

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
    const data = await productsRequest(lang);
    products = data;
  } catch (error) {
    console.error('Failed to fetch products data:', error);
  }
  return (
    <>
      <BucketTeethClient categorys={categorys} lang={lang} products={products} />
    </>
  )
}