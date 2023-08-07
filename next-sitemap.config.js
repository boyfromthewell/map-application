/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://map-application-mocha.vercel.app',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
