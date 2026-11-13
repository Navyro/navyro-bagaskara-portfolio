#!/usr/bin/env node
/**
 * Publishes the Google Search Console HTML verification file.
 *
 * Search Console verifies ownership by fetching a file at the site root. The file it gives you is named
 * `google<token>.html` and must contain exactly `google-site-verification: google<token>.html`. Next.js
 * serves anything in public/ at the root, so this only has to write the right name with the right body.
 *
 * Usage:  npm run gsc:verify -- google1a2b3c4d5e6f.html
 *
 * Then:   npm run ship        (or wait for the push to deploy)
 *         open the printed URL and confirm it returns that exact line
 *         click Verify in Search Console
 *
 * Safe to run twice: the same token overwrites the same file, and a different token removes the previous
 * one, so the site never accumulates stale verification files.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SITE = "https://navyro-portfolio.is-a.dev";

const arg = process.argv[2];
if (!arg) {
  console.error("usage: npm run gsc:verify -- google<token>.html");
  console.error("Get the filename from Search Console → Add property → URL prefix → HTML file.");
  process.exit(1);
}

// Accept either the bare filename or a whole URL, because people paste whichever they had in hand.
const name = arg.trim().split("/").pop();
if (!/^google[a-z0-9]+\.html$/i.test(name)) {
  console.error(`not a Search Console verification file: ${name}`);
  console.error("expected something like google1a2b3c4d5e6f.html");
  process.exit(1);
}

// One verification file at a time; a leftover from an earlier property is noise the repo does not need.
const existing = fs.readdirSync(PUBLIC).filter((f) => /^google[a-z0-9]+\.html$/i.test(f));
for (const f of existing) {
  if (f !== name) {
    fs.rmSync(path.join(PUBLIC, f));
    console.log(`removed    : public/${f} (different token)`);
  }
}

const body = `google-site-verification: ${name}\n`;
fs.writeFileSync(path.join(PUBLIC, name), body, "utf8");
console.log(`written    : public/${name}`);
console.log(`content    : ${body.trim()}`);
console.log(`\nNext:\n  1. npm run ship          (deploy)\n  2. curl -s ${SITE}/${name}   → must print the same line\n  3. click Verify in Search Console\n  4. submit ${SITE}/sitemap.xml under Sitemaps`);
