// 服务器组件，不需要'use client'声明
import { API_ENDPOINTS, buildApiUrl } from '@/config/api';
import React from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/imageUtils';

interface Product {
  id: number;
  categoryId: number;
  productName: string;
  images: string[];
  details: string;
}

// 在App Router中，页面组件默认是服务器组件，可以直接获取数据
export default async function BucketTeeth({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;
  
  // 服务器端数据获取
  let products: Product[] = [];
  
  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCT));
    
    const data = await res.json();
    
    if (data && data.rows && Array.isArray(data.rows)) {
      products = data.rows;
    }
  } catch (error) {
    console.error('Failed to fetch product data:', error);
  }
  
  // 如果没有产品数据，显示错误信息
  if (products.length === 0) {
    return <div>没有找到产品</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">产品列表</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {product.images && product.images.length > 0 && (
              <div className="relative h-48">
                <Image 
                  src={getImageUrl(product.images[0])} 
                  alt={product.productName} 
                  fill 
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
              <p className="text-gray-600 mb-2">分类ID: {product.categoryId}</p>
              <p className="text-gray-700">{product.details}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">当前语言: {lang}</div>
    </div>
  );
}