import { getAdditionalRoutes } from "../../../lib/api";
import { writeFile } from "fs/promises";
import path from "path";

const BASE_URL = "https://lowrise.ca";
const SITEMAP_PATH = path.join(process.cwd(), "public", "sitemap.xml");

// Function to ensure URL is properly formatted and escaped for XML
function formatUrl(path) {
  if (!path) return BASE_URL;

  // Clean the path
  const cleanPath = path
    .toString()
    .replace(/&/g, "and") // Replace & with 'and'
    .replace(/[<>"']/g, "") // Remove XML special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-\/]/g, "") // Remove any other special characters
    .trim();

  // Ensure proper URL format
  const fullUrl = `${BASE_URL}${
    cleanPath.startsWith("/") ? "" : "/"
  }${cleanPath}`;
  return fullUrl.replace(/([^:]\/)\/+/g, "$1"); // Remove duplicate slashes except after protocol
}

// Function to format date for XML
function formatDate(date) {
  try {
    return new Date(date || Date.now()).toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

function generateSiteMap(staticPages, cities, listings, additionalRoutes) {
  try {
    const xmlItems = [];

    // Add static pages
    staticPages.forEach(({ path, priority, changefreq }) => {
      xmlItems.push(`
        <url>
          <loc>${formatUrl(path)}</loc>
          <lastmod>${formatDate()}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>`);
    });

    // Add additional routes
    additionalRoutes.forEach((route) => {
      // Add subpages if they exist
      if (Array.isArray(route.subpages) && route.subpages.length > 0) {
        route.subpages.forEach((subpage) => {
          xmlItems.push(`
            <url>
              <loc>${formatUrl(`${route.path}/${subpage}`)}</loc>
              <lastmod>${formatDate()}</lastmod>
              <changefreq>${route.changefreq}</changefreq>
              <priority>${Math.max(0.1, route.priority - 0.1)}</priority>
            </url>`);
        });
      } else {
        // Add main route
        xmlItems.push(`
          <url>
            <loc>${formatUrl(route.path)}</loc>
            <lastmod>${formatDate()}</lastmod>
            <changefreq>${route.changefreq}</changefreq>
            <priority>${route.priority}</priority>
          </url>`);
      }
    });

    // Combine all items into final XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${xmlItems.join(
                ""
              )}
        </urlset>`;

    return sitemap;
  } catch (error) {
    console.error("Error generating sitemap XML:", error);
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${formatDate()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;
  }
}

export async function GET(req) {
  try {
    console.log("Starting sitemap generation...");

    // Get all data with proper error handling
    const { staticPages, additionalRoutes } = await getAdditionalRoutes().catch(
      (error) => {
        console.error("Error fetching routes:", error);
        return { staticPages: [], additionalRoutes: [] };
      }
    );

    console.log(
      `Fetched ${staticPages.length} static pages and ${additionalRoutes.length} additional routes`
    );

    // Generate and validate the sitemap
    const sitemap = generateSiteMap(staticPages, [], [], additionalRoutes);

    // Log the URL count
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    console.log(`Generated sitemap with ${urlCount} URLs`);

    // Write sitemap to file
    await writeFile(SITEMAP_PATH, sitemap, "utf8");
    console.log("Sitemap written to:", SITEMAP_PATH);

    // Return the response with appropriate headers
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    const emptySitemap = generateSiteMap([], [], [], []);
    await writeFile(SITEMAP_PATH, emptySitemap, "utf8");

    return new Response(emptySitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  }
}
