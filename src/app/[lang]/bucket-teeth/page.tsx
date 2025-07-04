
import React from 'react';
import { productsRequest } from '@/config/reqest';
import { Product } from '@/config/structure';
import BucketTeethClient from '@/components/BucketTeethClient';


// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function BucketTeeth({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;
  
  // 服务器端数据获取
  let products: Product[] = [];
  
  try {
    const data = await productsRequest();
    products = data;
  } catch (error) {
    console.error('Failed to fetch product data:', error);
  }

  return (
    <>
      <BucketTeethClient products={products} />
    </>
  )
}