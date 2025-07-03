import ContactUsClient from "@/components/ContactUsClient";
import { contactUsRequest } from "@/config/reqest";

export default async function ContactUs({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;
  const contactUsHint = await contactUsRequest(lang);
  return (<ContactUsClient contactUsHint={contactUsHint} />);
}