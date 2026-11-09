import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Crawl everything, and advertise the sitemap so Search Console and Bing find the six
 * case-study URLs without waiting for links to be discovered.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    // No `host` directive: it expects a bare hostname and is only read by Yandex.
  };
}
