
import { aboutUsRequest } from '@/config/request';
import AboutUsClient from '@/components/AboutUsClient';


export default async function AboutUs({ params }: { params: { lang: string } }) {
  const { lang } = params;

  let aboutUs = await aboutUsRequest(lang);
  
  return (
    <AboutUsClient aboutUs={aboutUs} />
  );
}
