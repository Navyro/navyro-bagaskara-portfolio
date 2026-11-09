import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";
import { siteUrl } from "@/lib/site";

/**
 * Every public route, including the six case studies that only existed as dynamic routes
 * before — without this file Google discovers a single URL and the case studies stay
 * unindexed.
 *
 * `lastModified` is deliberately omitted: nothing in this repository tracks a real
 * modification date, and a fabricated one is worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/resume`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseStudies: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudies];
}
