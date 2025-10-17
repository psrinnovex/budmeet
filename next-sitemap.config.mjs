/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://budmeet.app",
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    sitemapSize: 5000,
    changefreq: "weekly",
    priority: 0.7,
    exclude: [],
    robotsTxtOptions: {
      policies: [{ userAgent: "*", allow: "/" }],
      additionalSitemaps: ["https://budmeet.app/sitemap.xml"],
    },
  };
  
  export default config;
  