#!/usr/bin/env node
/**
 * Builds the site's icon set from scripts/icon.html.
 *
 *   app/icon.png                   512x512  -> <link rel="icon"> (Next picks it up by filename)
 *   app/apple-icon.png             180x180  -> <link rel="apple-touch-icon">
 *   public/icons/icon-192.png      192x192  -> PWA manifest
 *   public/icons/icon-512.png      512x512  -> PWA manifest
 *   public/icons/icon-maskable-512.png 512  -> manifest, purpose "maskable" (smaller mark, safe zone)
 *
 * Before this script the site had no favicon at all, so every tab, bookmark and
 * saved-to-homescreen entry showed a blank page glyph.
 *
 * Why a browser: sharp renders SVG/HTML text through fontconfig and silently falls back to a
 * serif for webfonts. Chromium renders the real Manrope 800. The script refuses to write if the
 * font did not load, the frame is not exactly the requested size, anything overflows, or the mark
 * would be illegible at small sizes.
 *
 * Run: npm run build:icons
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SRC_HTML = path.join(ROOT, "scripts", "icon.html");
const WORK = path.join(ROOT, ".ux-logs", "icons");
const OUT_ICON = path.join(ROOT, "app", "icon.png");
const OUT_APPLE = path.join(ROOT, "app", "apple-icon.png");
const OUT_ICONS_DIR = path.join(ROOT, "public", "icons");
const PORT = 4322;
const SESSION = "ux-icons";

// Same constraint as build-og-image.cjs: the page is served by this process, so agent-browser
// must run asynchronously (execSync would block the event loop and the server would never answer).
function ab(cmd, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(`npx --no-install agent-browser ${cmd} --session ${SESSION}`, {
      cwd: ROOT,
      shell: true,
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => {
      if (code === 0) return resolve(out);
      const first = (err || out).trim().split("\n")[0];
      reject(new Error(`${cmd}: ${first}`));
    });
    child.stdin.end(input ?? "");
  });
}

function serve(dir, port) {
  const types = { ".html": "text/html; charset=utf-8", ".png": "image/png" };
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "icon.html";
    const file = path.join(dir, rel);
    if (!file.startsWith(dir) || !fs.existsSync(file)) {
      res.writeHead(404);
      return res.end("not found");
    }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

// Reports the mark's box and its half-diagonal, which is what the maskable safe zone is about.
const PROBE = `(() => {
  const mark = document.querySelector(".mark");
  const r = mark.getBoundingClientRect();
  return JSON.stringify({
    w: innerWidth,
    h: innerHeight,
    fonts: document.fonts.status,
    manrope: document.fonts.check("800 236px Manrope"),
    maskable: document.documentElement.classList.contains("maskable"),
    mark: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    halfDiagonal: Math.round(Math.sqrt((r.width / 2) ** 2 + (r.height / 2) ** 2)),
    overflowX: document.documentElement.scrollWidth > innerWidth,
    overflowY: document.documentElement.scrollHeight > innerHeight,
  });
})()`;

/** Screenshots scripts/icon.html at 512x512, optionally in maskable mode. */
async function capture(port, raw, maskable) {
  const query = maskable ? "?maskable=1" : "";
  await ab("set viewport 512 512");
  await ab(`open http://127.0.0.1:${port}/${query}`);
  await ab("wait 1800"); // webfont

  const probe = JSON.parse(JSON.parse((await ab("eval --stdin", PROBE)).trim()));
  const label = maskable ? "maskable" : "standard";
  if (probe.w !== 512 || probe.h !== 512) {
    throw new Error(`${label}: viewport is ${probe.w}x${probe.h}, expected 512x512`);
  }
  if (probe.fonts !== "loaded" || !probe.manrope) {
    throw new Error(`${label}: Manrope did not load — refusing to bake a fallback typeface`);
  }
  if (probe.maskable !== maskable) throw new Error(`${label}: maskable flag not applied`);
  if (probe.overflowX || probe.overflowY) throw new Error(`${label}: icon overflows the 512x512 frame`);
  if (probe.mark.w < (maskable ? 120 : 200)) {
    throw new Error(`${label}: mark is only ${probe.mark.w}px wide — it would be illegible at 16px`);
  }
  // Maskable safe zone: launchers may crop to a circle of 80% diameter (radius 204.8px).
  if (maskable && probe.halfDiagonal > 204) {
    throw new Error(`${label}: mark half-diagonal ${probe.halfDiagonal}px crosses the safe-zone radius 204px`);
  }

  await ab(`screenshot "${raw}"`);
  console.log(
    `capture   : ${label} ${probe.mark.w}x${probe.mark.h} at ${probe.mark.x},${probe.mark.y} · half-diagonal=${probe.halfDiagonal}px · no overflow`
  );
  return probe;
}

async function main() {
  const sharp = require("sharp");
  fs.mkdirSync(WORK, { recursive: true });
  fs.mkdirSync(OUT_ICONS_DIR, { recursive: true });
  fs.copyFileSync(SRC_HTML, path.join(WORK, "icon.html"));

  const rawStandard = path.join(WORK, "icon-512.png");
  const rawMaskable = path.join(WORK, "icon-maskable-512.png");

  const server = await serve(WORK, PORT);
  try {
    await capture(PORT, rawStandard, false);
    await capture(PORT, rawMaskable, true);
  } finally {
    server.close();
  }

  for (const raw of [rawStandard, rawMaskable]) {
    const meta = await sharp(raw).metadata();
    if (meta.width !== 512 || meta.height !== 512) {
      throw new Error(`captured ${meta.width}x${meta.height}, expected 512x512`);
    }
  }

  const png = { compressionLevel: 9 };
  await sharp(rawStandard).png(png).toFile(OUT_ICON);
  await sharp(rawStandard).resize(180, 180, { kernel: "lanczos3" }).png(png).toFile(OUT_APPLE);
  await sharp(rawStandard).resize(192, 192, { kernel: "lanczos3" }).png(png).toFile(path.join(OUT_ICONS_DIR, "icon-192.png"));
  await sharp(rawStandard).png(png).toFile(path.join(OUT_ICONS_DIR, "icon-512.png"));
  await sharp(rawMaskable).png(png).toFile(path.join(OUT_ICONS_DIR, "icon-maskable-512.png"));

  for (const file of [OUT_ICON, OUT_APPLE, path.join(OUT_ICONS_DIR, "icon-192.png"), path.join(OUT_ICONS_DIR, "icon-512.png"), path.join(OUT_ICONS_DIR, "icon-maskable-512.png")]) {
    const meta = await sharp(file).metadata();
    console.log(`written   : ${path.relative(ROOT, file).replace(/\\/g, "/")} (${meta.width}x${meta.height}, ${(fs.statSync(file).size / 1024).toFixed(1)} KB)`);
  }

  // agent-browser leaves a detached daemon handle open; exit explicitly so the task does not hang.
  process.exit(0);
}

main().catch((err) => {
  console.error("build-icons failed:", err.message);
  process.exit(1);
});
