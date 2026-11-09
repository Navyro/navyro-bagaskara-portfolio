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
