export default function sitemap() {
    return [
      {
        url: "https://sunamganj-city.vercel.app",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: "https://sunamganj-city.vercel.app/services",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://sunamganj-city.vercel.app/events",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://sunamganj-city.vercel.app/blog",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://sunamganj-city.vercel.app/contact",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
  