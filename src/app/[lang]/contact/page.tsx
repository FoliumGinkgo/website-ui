import { contactUsRequest } from "@/config/reqest";
import { COMPANY_INFO, CONTACT_US_HINT } from "@/config/constants";
import { FaPhone, FaEnvelope, FaUser, FaBuilding, FaComment, FaPaperPlane } from 'react-icons/fa';

export default async function ContactUs({ params }: { params: { lang: string } }) {
  // 从params中获取动态路由参数
  const { lang } = params;
  let contactUsHint;
  
  try {
    contactUsHint = await contactUsRequest(lang);
  } catch (error) {
    console.error('Error fetching contact hints:', error);
    // 使用默认值
    contactUsHint = CONTACT_US_HINT;
  }
  
  // 确保contactUsHint有值，如果没有则使用默认值
  if (!contactUsHint) {
    contactUsHint = CONTACT_US_HINT;
  }
  
  return (
    <div className="w-full">
      {/* 顶部横幅区域 - 宽度和屏幕宽度一致的横图高度自适应 */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">联系我们</h1>
      </div>
      
      {/* 主要内容区域 - 使用container响应式容器宽度 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧联系方式 - 减小宽度 */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">电话</h3>
                  <p className="text-gray-600">{COMPANY_INFO.PHONE}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">邮箱</h3>
                  <p className="text-gray-600">{COMPANY_INFO.EMAIL}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧联系表单 - 增加宽度 */}
          <div className="w-full md:w-2/3 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
            <form className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.name}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.email}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="contact" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.contact}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.company}
                />
              </div>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FaComment className="text-gray-400" />
                </div>
                <textarea 
                  id="details" 
                  rows={5} 
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={contactUsHint.details}
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  {contactUsHint.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}