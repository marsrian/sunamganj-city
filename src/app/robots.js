export default function robots() {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
      sitemap: "https://sunamganj-city.vercel.app/sitemap.xml",
    };
  }