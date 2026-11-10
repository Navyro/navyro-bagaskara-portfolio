#!/usr/bin/env node
/**
 * SEO / discoverability gate. Needs the dev server (like check:ux), because the whole point
 * is to inspect what Next.js actually serves, not what the source files look like.
 *
 * Checks
 *   sitemap      /sitemap.xml is 200, has absolute <loc> URLs, and lists every route —
 *                including the six case studies, which previously had no entry at all.
 *   sitemap-urls every listed URL answers 200 (a sitemap full of 404s is worse than none).
 *   robots       /robots.txt is 200, allows crawling, and advertises the sitemap absolutely.
 *   jsonld       the homepage ships one valid application/ld+json Person block whose name,
 *                jobTitle and url are present and whose sameAs entries are absolute https.
 *   skip-link    every page has one a[href="#main"] and a matching #main target.
 *   icons        the tab / homescreen icons exist, are served with the right type and size,
 *                and the document links them (Next App Router: app/icon.png,
 *                app/apple-icon.png). Before CL-12 there was no favicon at all.
 *   manifest     /manifest.webmanifest is 200 and valid, declares a 192 + 512 + maskable icon
 *                that all resolve, and its theme/background colours equal the CSS tokens in
 *                app/globals.css (a manifest that disagrees with the site is worse than none).
 *   no-js-safe   no server-rendered element carries inline opacity:0 (CL-13: content must not
 *                depend on JavaScript to become visible).
 *
 * Run: npm run check:seo   (BASE_URL=https://... to check a deployment)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const ROUTES = ["/", "/work", "/about", "/resume", "/contact"];
const problems = [];
const lines = [];

function check(name, ok, detail) {
  lines.push(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(22)} ${detail}`);
  if (!ok) problems.push(`${name}: ${detail}`);
}

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": "check-seo/1.0" } });
  const body = await res.text();
  return { status: res.status, body };
}

function projectSlugs() {
  // Read the data file rather than the rendered site so a missing page is caught by the
  // sitemap-URLs check below.
  const source = fs.readFileSync(path.join(ROOT, "data", "projects.ts"), "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

async function main() {
  const slugs = projectSlugs();
  if (slugs.length === 0) throw new Error("no project slugs found in data/projects.ts");

  const sitemap = await get(`${BASE}/sitemap.xml`);
  check("sitemap.status", sitemap.status === 200, `${sitemap.status} ${BASE}/sitemap.xml`);

  const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const nonAbsolute = locs.filter((u) => !/^https?:\/\//.test(u));
  check("sitemap.absolute", locs.length > 0 && nonAbsolute.length === 0, `${locs.length} urls, ${nonAbsolute.length} relative`);

  const expected = [...ROUTES, ...slugs.map((s) => `/work/${s}`)];
  const missing = expected.filter((route) => !locs.some((u) => new URL(u).pathname === route));
  check("sitemap.complete", missing.length === 0, missing.length ? `missing ${missing.join(", ")}` : `all ${expected.length} routes listed`);

  const dead = [];
  for (const url of locs) {
    const res = await fetch(url, { method: "GET" });
    if (res.status !== 200) dead.push(`${new URL(url).pathname} -> ${res.status}`);
  }
  check("sitemap-urls", dead.length === 0, dead.length ? dead.join(", ") : `${locs.length} urls answer 200`);

  const robots = await get(`${BASE}/robots.txt`);
  const hasSitemap = /^Sitemap:\s*https?:\/\/\S+$/m.test(robots.body);
  check(
    "robots.status",
    robots.status === 200 && hasSitemap && /Allow:\s*\//.test(robots.body),
    robots.status === 200 ? `allow=/ sitemap=${hasSitemap}` : `${robots.status}`
  );

  const home = await get(`${BASE}/`);
  const block = home.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let jsonld = null;
  let jsonldError = "no application/ld+json block";
  if (block) {
    try {
      jsonld = JSON.parse(block[1]);
      jsonldError = "invalid";
    } catch (e) {
      jsonldError = `unparseable: ${e.message}`;
    }
  }
  const personOk =
    jsonld &&
    jsonld["@type"] === "Person" &&
    typeof jsonld.name === "string" &&
    jsonld.name.length > 0 &&
    typeof jsonld.jobTitle === "string" &&
    /^https?:\/\/\S+$/.test(jsonld.url || "") &&
    (!jsonld.sameAs || jsonld.sameAs.every((u) => /^https:\/\//.test(u)));
  check("jsonld.person", Boolean(personOk), personOk ? `${jsonld.name} · ${jsonld.jobTitle} · sameAs=${(jsonld.sameAs || []).length}` : jsonldError);

  const skipProblems = [];
  const jsProblems = [];
  for (const route of ROUTES) {
    const page = await get(`${BASE}${route}`);
    if (page.status !== 200) continue;
    const hasSkip = /<a[^>]+href="#main"[^>]*>/.test(page.body);
    const hasMain = /\sid="main"/.test(page.body);
    if (!hasSkip || !hasMain) skipProblems.push(`${route} (skip=${hasSkip} main=${hasMain})`);
    const inlineHidden = (page.body.match(/style="[^"]*opacity:\s*0(?:[;"])/g) || []).length;
    if (inlineHidden > 0) jsProblems.push(`${route} x${inlineHidden}`);
  }
  check("a11y.skip-link", skipProblems.length === 0, skipProblems.length ? skipProblems.join(", ") : `${ROUTES.length} routes`);

  // Icons are read from the filesystem AND from the served document: a PNG in app/ that Next
  // does not link (or a link to a file that 404s) are different failures.
  const iconFiles = [
    { file: "app/icon.png", bytes: 512 },
    { file: "app/apple-icon.png", bytes: 180 },
  ];
  const missingIcons = iconFiles.filter((i) => !fs.existsSync(path.join(ROOT, i.file))).map((i) => i.file);
  const iconUrls = [
    { url: "/icon.png", size: "512x512" },
    { url: "/apple-icon.png", size: "180x180" },
  ];
  const badIcons = [];
  for (const icon of iconUrls) {
    const res = await fetch(`${BASE}${icon.url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const isPng = buf.length > 8 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    const type = res.headers.get("content-type") || "";
    // PNG IHDR carries width/height big-endian at bytes 16..23.
    const w = buf.length > 24 ? buf.readUInt32BE(16) : 0;
    const h = buf.length > 24 ? buf.readUInt32BE(20) : 0;
    if (res.status !== 200 || !isPng || !type.includes("image/png") || `${w}x${h}` !== icon.size) {
      badIcons.push(`${icon.url} ${res.status} ${type} ${w}x${h}`);
    }
  }
  const homeLinksIcon = /<link[^>]+rel="icon"[^>]+href="\/icon\.png/.test(home.body);
  const homeLinksApple = /<link[^>]+rel="apple-touch-icon"[^>]+href="\/apple-icon\.png/.test(home.body);
  check(
    "icons.present",
    missingIcons.length === 0 && badIcons.length === 0 && homeLinksIcon && homeLinksApple,
    missingIcons.length
      ? `missing file(s): ${missingIcons.join(", ")} (run npm run build:icons)`
      : badIcons.length
        ? badIcons.join(", ")
        : `2 files · linked=${homeLinksIcon && homeLinksApple}`
  );

  // ---- manifest -------------------------------------------------------------------------
  const manifestRes = await fetch(`${BASE}/manifest.webmanifest`);
  let manifest = null;
  let manifestError = `${manifestRes.status} ${manifestRes.headers.get("content-type") || "no type"}`;
  if (manifestRes.status === 200) {
    try {
      manifest = JSON.parse(await manifestRes.text());
      manifestError = "unparseable";
    } catch (e) {
      manifestError = `unparseable: ${e.message}`;
    }
  }

  const css = fs.readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");
  const token = (name) => (css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`)) || [])[1]?.toUpperCase();
  const manifestProblems = [];
  if (manifest) {
    const icons = Array.isArray(manifest.icons) ? manifest.icons : [];
    const has = (size, purpose) =>
      icons.some((i) => i.sizes === size && (purpose ? i.purpose === purpose : true));
    if (!manifest.name || !manifest.short_name) manifestProblems.push("name/short_name missing");
    if (manifest.start_url !== "/") manifestProblems.push(`start_url=${manifest.start_url}`);
    if (manifest.display !== "standalone") manifestProblems.push(`display=${manifest.display}`);
    if (manifest.lang !== "en") manifestProblems.push(`lang=${manifest.lang}`);
    if (!has("192x192")) manifestProblems.push("no 192x192 icon");
    if (!has("512x512")) manifestProblems.push("no 512x512 icon");
    if (!has("512x512", "maskable")) manifestProblems.push("no maskable 512x512 icon");
    if ((manifest.theme_color || "").toUpperCase() !== token("accent")) {
      manifestProblems.push(`theme_color ${manifest.theme_color} != --accent ${token("accent")}`);
    }
    if ((manifest.background_color || "").toUpperCase() !== token("background")) {
      manifestProblems.push(`background_color ${manifest.background_color} != --background ${token("background")}`);
    }
    for (const icon of icons) {
      const res = await fetch(`${BASE}${icon.src}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const w = buf.length > 24 ? buf.readUInt32BE(16) : 0;
      const h = buf.length > 24 ? buf.readUInt32BE(20) : 0;
      if (res.status !== 200 || `${w}x${h}` !== icon.sizes) {
        manifestProblems.push(`${icon.src} -> ${res.status} ${w}x${h} (declared ${icon.sizes})`);
      }
    }
    if (!manifest.description) manifestProblems.push("description missing");
  }
  check(
    "manifest",
    Boolean(manifest) && manifestProblems.length === 0,
    manifest ? (manifestProblems.length ? manifestProblems.join("; ") : `${manifest.icons.length} icons · theme ${manifest.theme_color} · lang ${manifest.lang}`) : manifestError
  );
  check("render.no-js-hidden", jsProblems.length === 0, jsProblems.length ? jsProblems.join(", ") : "no inline opacity:0 in server HTML");

  console.log(lines.join("\n"));
  if (problems.length) {
    console.error(`\ncheck:seo failed (${problems.length}):\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`\nseo: all checks passed (${lines.length} checks against ${BASE})`);
}

main().catch((e) => {
  console.error(`check:seo failed: ${e.message}${e.cause ? ` (${e.cause.code})` : ""}`);
  console.error("Is the dev server running? npm run dev");
  process.exit(1);
});
