import type { MetadataRoute } from "next";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

/**
 * Web app manifest (served at /manifest.webmanifest).
 *
 * Colours are the real design tokens, not guesses: `theme_color` is `--accent` (#1F4FFF) and
 * `background_color` is `--background` (#F7F7F5) from app/globals.css. scripts/check-seo.cjs
 * asserts those two stay equal to the CSS, because a manifest that disagrees with the site is
 * exactly the "wrong manifest" that is worse than none.
 *
 * Icons come from npm run build:icons. The maskable variant renders the mark smaller so it
 * survives launchers that crop to an 80% circle.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "Navyro",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F5",
    theme_color: "#1F4FFF",
    lang: "id",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
