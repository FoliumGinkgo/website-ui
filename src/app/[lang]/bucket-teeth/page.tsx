
import React from 'react';
import { categoryRequest, productsRequest } from '@/config/request';
import { Category, ProductData } from '@/config/structure';
import BucketTeethClient from '@/components/BucketTeethClient';

// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function BucketTeeth({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params; // 移除 await

  // 服务器端数据获取
  let categorys: Category[] = await categoryRequest(lang);
  let products: ProductData = await productsRequest(lang);
  return (
    <>
      <BucketTeethClient categorys={categorys} lang={lang} products={products} />
    </>
  )
}