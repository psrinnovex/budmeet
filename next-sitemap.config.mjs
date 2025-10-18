/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://budmeet.app",
    generateRobotsTxt: true,       // will add "Sitemap: https://budmeet.app/sitemap.xml" automatically
    generateIndexSitemap: true,    // creates /sitemap.xml (index) + child sitemaps
    sitemapSize: 5000,
    changefreq: "weekly",
    priority: 0.7,
    exclude: [],
    robotsTxtOptions: {
      policies: [{ userAgent: "*", allow: "/" }],
      // Don't list the main index here; ONLY add other, separate sitemaps if you truly have them.
      // additionalSitemaps: ["https://budmeet.app/server-sitemap.xml"],
    },
  };
  
  export default config;
  