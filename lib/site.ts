/**
 * One place for the site's absolute origin.
 *
 * Open Graph images, sitemap entries and robots.txt all need absolute URLs. Set
 * NEXT_PUBLIC_SITE_URL in production; on Vercel the project URL is a sane fallback so a
 * preview deployment still resolves instead of pointing at localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_TITLE = "Navyro Bagaskara — UI/UX Designer + Front-End Fundamentals";

export const SITE_DESCRIPTION =
  "Personal Portfolio & Case Studies of Navyro Bagaskara. Specializing in UI/UX Design and Product Strategy, with a solid grasp of front-end fundamentals.";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Navyro Bagaskara — UI/UX Designer & Front-End Fundamentals",
  type: "image/png",
};
