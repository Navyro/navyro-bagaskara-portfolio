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

/**
 * The title is the strongest on-page signal the site has, so it names the thing people search for:
 * "UI/UX designer portfolio". The front-end skill moved to the description rather than being dropped —
 * a fourth clause here would dilute the phrase Google matches and push the name out of the first
 * 40 characters, which is what a search result actually shows.
 */
export const SITE_TITLE = "Navyro Bagaskara — UI/UX Designer Portfolio";

export const SITE_DESCRIPTION =
  "Personal Portfolio & Case Studies of Navyro Bagaskara. Specializing in UI/UX Design and Product Strategy, with a solid grasp of front-end fundamentals.";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Navyro Bagaskara — UI/UX Designer & Front-End Fundamentals",
  type: "image/png",
};
