const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { getSitemapConfig } = require('../next-sitemap.config');

async function generateDynamicSitemapConfig() {
  try {
    const config = await getSitemapConfig();
    // 将配置写入临时文件
    const configPath = resolve(__dirname, '../.next-sitemap.config.js');
    const configContent = `module.exports = ${JSON.stringify(config, null, 2)}`;
    writeFileSync(configPath, configContent);
    console.log('Dynamic sitemap config generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap config:', error);
    process.exit(1);
  }
}

generateDynamicSitemapConfig();