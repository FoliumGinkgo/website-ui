import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '47.113.217.170', // 替换为你的服务器 IP 或域名
        port: '5555',                // 如果使用了端口
        pathname: '/prod-api/**',   // 匹配你的图片路径
      },
    ],
  }
};

export default nextConfig;
