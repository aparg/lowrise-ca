import citiesWithProvinces from "@/constant/cities";

// Clean slug for URL
function cleanSlug(slug) {
  if (!slug) return "";
  return slug
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

// Static pages configuration
export async function getAllStaticPages() {
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "contact-us", priority: 0.8 },
    { path: "privacy", priority: 0.6 },
  ];

  return staticPages.map((page) => ({
    path: cleanSlug(page.path),
    priority: page.priority,
    changefreq: page.priority >= 0.8 ? "daily" : "weekly",
  }));
}

// Get additional routes including city-specific pages
export async function getAdditionalRoutes() {
  // Get static pages first
  const staticPages = await getAllStaticPages();

  const resaleRoutes = [
    // Property type routes
    {
      path: "ontario",
      priority: 0.8,
      changefreq: "daily",
      subpages: [
        "detached-homes-for-sale",
        "semi-detached-homes-for-sale",
        "townhomes-for-sale",
        "condos-for-sale",
        "detached-homes-for-lease",
        "semi-detached-homes-for-lease",
        "townhomes-for-lease",
        "condos-for-lease",
        "open-houses",
        "price-dropped",
      ],
    },
    // Transaction type routes
    {
      path: "ontario/homes-for-sale",
      priority: 0.8,
      changefreq: "daily",
      subpages: [],
    },
    {
      path: "ontario/homes-for-lease",
      priority: 0.8,
      changefreq: "daily",
      subpages: [],
    },
    // City-specific routes for Ontario resale
    ...citiesWithProvinces.map((city) => ({
      path: `ontario/${cleanSlug(city.city)}`,
      priority: 0.8,
      changefreq: "daily",
      subpages: [
        "homes-for-sale",
        "homes-for-lease",
        "detached-homes-for-sale",
        "semi-detached-homes-for-sale",
        "townhomes-for-sale",
        "condos-for-sale",
        "detached-homes-for-lease",
        "semi-detached-homes-for-lease",
        "townhomes-for-lease",
        "condos-for-lease",
        "open-houses",
        "price-dropped",
      ],
    })),
  ];

  return {
    staticPages,
    additionalRoutes: resaleRoutes,
  };
}
