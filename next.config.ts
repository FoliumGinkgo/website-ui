import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_IP, //'', // 替换为你的服务器 IP 或域名
        port: '5555',                // 如果使用了端口
        // pathname: '/dev-api/**',   // 匹配你的图片路径
        // pathname: '/prod-api/**',
      },
    ],
  },
  // 移除i18n配置，因为它与App Router不兼容
};

export default nextConfig;
