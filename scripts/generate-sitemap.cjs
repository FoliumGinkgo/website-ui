const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { getSitemapConfig } = require('../next-sitemap.config.js'); // <- 注意后缀 .cjs！

async function generateDynamicSitemapConfig() {
  try {
    const config = await getSitemapConfig();

    // 写入新的动态 sitemap 配置文件（供 next-sitemap 使用）
    const configPath = resolve(__dirname, '../.next-sitemap.config.cjs');
    const configContent = `module.exports = ${JSON.stringify(config, null, 2)};`;

    writeFileSync(configPath, configContent);
    console.log('✅ Dynamic sitemap config generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap config:', error);
    process.exit(1);
  }
}

generateDynamicSitemapConfig();
