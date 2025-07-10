const { langRequest } = require('./src/config/reqest');
const { LANGUAGES } = require('./src/config/constants');

// 异步函数获取语言列表
async function getSitemapConfig() {
  // 获取支持的语言列表
  let languages = await langRequest();
  
  if (languages.length === 0) {
    languages = LANGUAGES;
  }
  
  // 构建 alternateRefs 数组
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const alternateRefs = languages.map(lang => ({
    href: `${baseUrl}/${lang.lang}`,
    hreflang: lang.lang,
  }));
  
  return {
    siteUrl: baseUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' }
      ]
    },
    exclude: ['/404'],
    alternateRefs,
  };
}

// 由于 next-sitemap 需要同步配置，我们需要提供一个默认配置
// 实际的动态配置将在构建时通过环境变量或其他方式注入
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ]
  },
  exclude: ['/404'],
  // 默认提供英文和中文的 alternateRefs
  // 实际构建时会被动态生成的配置覆盖
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/zh`,
      hreflang: 'zh',
    },
  ],
};

// 导出异步函数以便在需要时使用
module.exports.getSitemapConfig = getSitemapConfig;