import type { NextConfig } from "next";

// next.config.js
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '47.113.217.170', // 这里必须是字符串，不能写成 process.env.***
        port: '5555',
        // pathname: '/prod-api/**', // 可选，根据你的图片路径匹配
      },
    ],
  },
};

export default nextConfig;
