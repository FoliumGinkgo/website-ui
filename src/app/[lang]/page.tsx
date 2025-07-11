import Carousel from '@/components/Carousel';
import { carouselRequest, hotProductsRequest, homeInfoRequest } from '@/config/request';
import HomeClient from '@/components/HomeClient';

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const carouselData = await carouselRequest();
  
  // 获取产品列表数据（使用相关产品接口，限制显示6个）
  const products = await hotProductsRequest(lang, 6);
  
  // 获取分类数据，用于产品跳转
  const homeInfo = await homeInfoRequest(lang);
  
  return (
    <div className="w-full">
      {/* 轮播图区域 */}
      <Carousel carouselData={carouselData} />
      {/* 使用客户端组件展示首页内容 */}
      <HomeClient 
        lang={lang} 
        products={products} 
        homeInfo={homeInfo} 
      />
    </div>
  );
}