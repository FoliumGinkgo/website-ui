import ContactUsClient from "@/components/ContactUsClient";
import { contactUsHintRequest } from "@/config/reqest";

export default async function ContactUs({ params }: { params: Promise<{ lang: string }> }) {
  // 从params中获取动态路由参数，需要await
  const { lang } = await params;
  const contactUsHint = await contactUsHintRequest(lang);
  return (<ContactUsClient contactUsHint={contactUsHint} />);
}