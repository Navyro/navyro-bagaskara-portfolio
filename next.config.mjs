/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    /*
     * Image optimisation is ON because the site is deployed to Vercel, which runs the optimiser.
     * It used to be `unoptimized: true` (a static-host workaround), which shipped the raw PNGs:
     * a single 1125x2436 splash screen is ~1.9 MB while the card renders it ~350 px wide, so a
     * visitor downloaded roughly 8.6 MB of screenshots on /work alone.
     *
     * With the optimiser on, Next resizes to the width each `sizes` attribute asks for and serves
     * WebP, so the same card gets a few tens of KB. NOTE: this requires a host that supports the
     * optimiser (Vercel). On a purely static host it must be turned back on.
     */
    formats: ["image/webp"],
    // Every project screenshot, cover and the OG image live in /public, so no remote patterns are
    // needed; adding one would only widen what the optimiser is allowed to fetch.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
