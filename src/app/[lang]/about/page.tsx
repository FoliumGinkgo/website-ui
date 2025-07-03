
import { aboutUsRequest } from '@/config/reqest';
import AboutUsClient from '@/components/AboutUsClient';


export default async function AboutUs({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;
  let aboutUs = await aboutUsRequest(lang);
  
  return (
    <AboutUsClient aboutUs={aboutUs}/>
  );
}