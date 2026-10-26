import type { MetadataRoute } from "next";
import { ROBOTS, SITE_URL } from "@/lib/site";

/**
 * robots.txt, driven by the same switches as the meta robots tag (src/lib/site.ts):
 * production (confirmed origin + indexing allowed) opens the site and points to the
 * sitemap; staging and preview deployments disallow everything so they stay out of
 * search and AI indexes. (CF-004, CF-005)
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_URL || !ROBOTS.index) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
