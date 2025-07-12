const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.xhget-tooth.com';

const ISO_LANGUAGES = [
  'en', 'zh', 'fr', 'de', 'es', 'pt', 'ru', 'ja', 'ko', 'it',
  'nl', 'ar', 'hi', 'tr', 'pl', 'sv', 'fi', 'da', 'no', 'cs',
  'el', 'hu', 'ro', 'th', 'vi', 'id', 'he', 'uk', 'ms', 'sr',
  'sk', 'sl', 'hr', 'bg', 'lt', 'lv', 'et'
];

const alternateRefs = ISO_LANGUAGES.map(lang => ({
  href: `${siteUrl}/${lang}`,
  hreflang: lang,
}));

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],
  alternateRefs,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
