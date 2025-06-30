import Carousel from '@/components/Carousel';

export default function Home() {
  return (
    <div className="w-full">
      {/* 轮播图区域 */}
      <Carousel />
      
      {/* 其他首页内容 */}
      <div className="container mx-auto px-4 py-8">
        {/* 这里可以添加其他首页内容 */}
      </div>
    </div>
  );
}
