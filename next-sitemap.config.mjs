/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://budmeet.app",
    generateRobotsTxt: true,        // will emit robots.txt with Sitemap line
    generateIndexSitemap: true,     // /sitemap.xml (index) + child sitemaps
    sitemapSize: 5000,
    changefreq: "weekly",
    priority: 0.7,
    exclude: [],                    // add any private routes here
    robotsTxtOptions: {
      policies: [{ userAgent: "*", allow: "/" }],
      // Only add *separate* sitemaps here if you actually have them.
      // additionalSitemaps: ["https://budmeet.app/server-sitemap.xml"],
    },
  };
  
  export default config;
  