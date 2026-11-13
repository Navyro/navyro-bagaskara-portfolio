#!/usr/bin/env node
/**
 * Announces every URL in the sitemap to IndexNow (Bing, Yandex, Seznam, and anything else that consumes
 * the same protocol). Google does not take part — its equivalent button lives in Search Console, behind a
 * login — so this is the machine-driven half of "tell the search engines the pages changed".
 *
 * Ownership is proved by a key file served at the site root:
 *   https://navyro-portfolio.is-a.dev/<key>.txt   containing exactly <key>
 * The key is read from public/, so there is one copy and it cannot drift from what is deployed.
 *
 * Usage: npm run indexnow            (all sitemap URLs)
 *        npm run indexnow -- /work   (only that path, for a single edit; from Git Bash use //work)
 *        SITE=https://... npm run indexnow
 *
 * A 200 or 202 means accepted. 403 means the key file does not match, 422 means a URL is not on the host.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = (process.env.SITE || "https://navyro-portfolio.is-a.dev").replace(/\/$/, "");
const ENDPOINT = "https://api.indexnow.org/indexnow";

function keyFile() {
  const keys = fs
    .readdirSync(path.join(ROOT, "public"))
    .filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (keys.length === 0) {
    throw new Error("no key file in public/ — create public/<32 hex chars>.txt containing the key");
  }
  if (keys.length > 1) {
    throw new Error(`more than one key file in public/: ${keys.join(", ")}`);
  }
  const name = keys[0];
  const key = fs.readFileSync(path.join(ROOT, "public", name), "utf8").trim();
  return { key, name };
}

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap answered ${res.status}`);
  const body = await res.text();
  return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const { key, name } = keyFile();

  // Prove the key is live before submitting; a submission whose key 404s is rejected with 403 and looks
  // like a protocol failure when it is really a deploy that has not landed yet.
  const keyUrl = `${SITE}/${name}`;
  const probe = await fetch(keyUrl);
  const served = probe.ok ? (await probe.text()).trim() : "";
  if (served !== key) {
    console.error(`key file not live yet: ${keyUrl} -> ${probe.status}`);
    console.error("deploy first, then run this again.");
    // process.exit() here aborts while the fetch handles are still closing, which on Windows trips a libuv
    // assertion and buries the real message. Setting exitCode and returning lets Node wind down cleanly.
    process.exitCode = 1;
    return;
  }

  const only = process.argv[2];
  if (only !== undefined && !/^\/[A-Za-z0-9\-._~/]*$/.test(only)) {
    // Git Bash rewrites a leading `/` into a Windows path, so `npm run indexnow -- /work` arrives here as
    // `C:/Program Files/Git/work`. That was silently submitted once and only caught by reading the printed
    // URL, so the argument is now validated instead of "fixed up".
    console.error(`not a site path: ${only}`);
    console.error("expected something like /work or /work/fanfunds");
    if (/^[A-Za-z]:|\\\\/.test(only)) {
      console.error("Git Bash converted the leading / into a Windows path — use //work, or MSYS_NO_PATHCONV=1.");
    }
    process.exitCode = 1;
    return;
  }
  // Git Bash turns //work into /work, but a triple slash would still slip through the regex.
  const clean = only ? only.replace(/\/{2,}/g, "/") : undefined;
  const urls = clean ? [`${SITE}${clean}`] : await sitemapUrls();

  const payload = { host: new URL(SITE).host, key, keyLocation: keyUrl, urlList: urls };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`submitted ${urls.length} url(s) to ${new URL(ENDPOINT).host}`);
  console.log(`status    ${res.status} ${res.statusText}`);
  if (res.status === 200 || res.status === 202) {
    console.log("accepted  — the engines will crawl at their own pace");
    urls.forEach((u) => console.log(`  ${u}`));
  } else {
    const text = await res.text().catch(() => "");
    console.error(`rejected  ${text.slice(0, 300)}`);
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("indexnow failed:", e.message);
  process.exitCode = 1;
});
