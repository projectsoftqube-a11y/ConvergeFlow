import type { MetadataRoute } from "next";
import { ROBOTS, SITE_URL } from "@/lib/site";
import { SITE_PAGES } from "@/content/site";

/**
 * sitemap.xml for the 22 released routes (home + every built SITE_PAGE). The held
 * /technology/opendental/ page is not in SITE_PAGES, so it is excluded until released.
 * Emitted only once the origin is confirmed and indexing is allowed. (CF-005)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL || !ROBOTS.index) return [];
  const lastModified = new Date();
  return ["/", ...SITE_PAGES.map((p) => p.route)].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
