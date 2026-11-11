#!/usr/bin/env node
/**
 * Guards the social preview card.
 *
 * What can be checked offline, and therefore what this script checks:
 *   1. public/og-image.png exists and is exactly 1200x630 (the size every platform accepts).
 *   2. It is under 1 MB — WhatsApp and LinkedIn are the slowest at larger files.
 *   3. It was built from the current scripts/og-image.html — proved by a content hash, not a
 *      modification time, so it cannot silently go stale when the copy or the portrait changes.
 *      (mtime cannot be used: a fresh `git checkout` in CI gives every file the same timestamp.)
 *   4. app/layout.tsx declares metadataBase, an openGraph image with explicit width/height,
 *      and twitter:card = summary_large_image. Without metadataBase, Next.js cannot resolve
 *      the image to an absolute URL and the card silently disappears.
 *   5. Any http(s) URL referenced in the metadata is absolute, never a bare path.
 *
 * What it cannot check: how WhatsApp, LinkedIn or X actually render the card. That needs a
 * public URL — see docs/ux-visual/verification/og-image.md.
 *
 * Run: npm run check:og
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const IMAGE = path.join(ROOT, "public", "og-image.png");
const SOURCE = path.join(ROOT, "scripts", "og-image.html");
const STAMP = path.join(ROOT, "public", "og-image.stamp");
const LAYOUT = path.join(ROOT, "app", "layout.tsx");
const SITE_LIB = path.join(ROOT, "lib", "site.ts");
const MAX_KB = 1024;

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

const problems = [];
const checks = [];

function check(name, condition, okDetail, failDetail) {
  checks.push({ name, ok: Boolean(condition), detail: condition ? okDetail : failDetail });
  if (!condition) problems.push(`${name}: ${failDetail}`);
}

async function main() {
  if (!fs.existsSync(IMAGE)) {
    console.error("check:og failed: public/og-image.png is missing — run npm run build:og");
    process.exit(1);
  }

  const sharp = require("sharp");
  const meta = await sharp(IMAGE).metadata();
  const kb = Math.round(fs.statSync(IMAGE).size / 1024);

  check("image.size", meta.width === 1200 && meta.height === 630, `${meta.width}x${meta.height}`, `${meta.width}x${meta.height}, expected 1200x630`);

  if (fs.existsSync(SOURCE)) {
    // The stamp is written by scripts/build-og-image.cjs and holds the hash of the HTML the card was
    // captured from. Hashing the two files is the only staleness test that survives a fresh checkout.
    const stamped = fs.existsSync(STAMP) ? fs.readFileSync(STAMP, "utf8").trim() : "";
    const current = sha256(SOURCE);
    check(
      "image.fresh",
      stamped === current,
      "built from the current scripts/og-image.html",
      stamped
        ? "scripts/og-image.html changed since the card was built — rerun npm run build:og"
        : "no public/og-image.stamp — rerun npm run build:og so the card records its source"
    );
  }

  const layout = fs.readFileSync(LAYOUT, "utf8");
  // The OG constants moved to lib/site.ts so layout, sitemap and robots share one origin
  // and one image; the dimensions may therefore live in either file.
  const sources = [layout, fs.existsSync(SITE_LIB) ? fs.readFileSync(SITE_LIB, "utf8") : ""].join("\n");
  check("metadata.metadataBase", /metadataBase:\s*new URL\(/.test(layout), "declared", "no metadataBase — relative OG URLs cannot resolve");
  check(
    "metadata.og-image",
    /openGraph:\s*\{[\s\S]*?images:\s*\[/.test(layout),
    "openGraph.images declared",
    "openGraph.images is not declared"
  );
  check(
    "metadata.og-dimensions",
    /width:\s*1200/.test(sources) && /height:\s*630/.test(sources),
    "1200x630 declared",
    "og image dimensions are not declared"
  );
  check("metadata.twitter-card", /card:\s*"summary_large_image"/.test(layout), "summary_large_image", "twitter card is not summary_large_image");

  const relative = [...sources.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https?:\/\//.test(u));
  const bad = relative.filter((u) => !u.startsWith("/"));
  check("metadata.url-shape", bad.length === 0, `relative paths only: ${relative.join(", ") || "none"}`, `unexpected url values: ${bad.join(", ")}`);

  const summary = checks.map((c) => `${c.ok ? "PASS" : "FAIL"}  ${c.name.padEnd(24)} ${c.detail}`).join("\n");
  console.log(summary);

  const weightOk = kb <= MAX_KB;
  console.log(`INFO  image.weight            ${kb} KB (limit ${MAX_KB} KB)`);
  if (!weightOk) problems.push(`image.weight: ${kb} KB is above the ${MAX_KB} KB limit`);

  if (problems.length) {
    console.error(`\ncheck:og failed (${problems.length}):\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`\nog: all checks passed (${checks.length} checks, ${kb} KB card)`);
}

main().catch((e) => {
  console.error("check:og failed:", e.message);
  process.exit(1);
});
