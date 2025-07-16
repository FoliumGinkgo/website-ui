"use client"
import { ContactUs } from '@/config/structure';
import { useGlobalData } from '@/context/GlobalContext';
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaWeixin } from 'react-icons/fa';

export default function Contact() {
    const { contactUs } = useGlobalData();
    const [showWechat, setShowWechat] = useState(false);
    return (
        <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-50">
            <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                <div className="flex flex-col space-y-4">
                    {contactUs && contactUs.map((contact: ContactUs, index: number) => {
                        if (contact.type === 'WhatsApp') {
                            return (
                                <a
                                    key={contact.type}
                                    href={contact.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                >
                                    <FaWhatsapp size={24} />
                                </a>
                            )
                        }
                        if (contact.type === 'email') {
                            return (
                                <a
                                    key={contact.type}
                                    href={contact.link}
                                    className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                >
                                    <FaEnvelope size={24} />
                                </a>
                            );
                        }
                        if (contact.type === 'WeChat') {
                            return (
                                <div className="relative">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 bg-green-400 text-white rounded-full hover:bg-green-500 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                                        onMouseEnter={() => setShowWechat(true)}
                                        onMouseLeave={() => setShowWechat(false)}
                                    >
                                        <FaWeixin size={24} />
                                    </div>

                                    {/* 微信号显示 */}
                                    {showWechat && (
                                        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in">
                                            <div className="relative">
                                                wx:{contact.link}
                                                {/* 箭头 */}
                                                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                    })}

                </div>
            </div>

        </div>
    );
}