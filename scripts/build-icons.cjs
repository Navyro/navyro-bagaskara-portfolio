#!/usr/bin/env node
/**
 * Builds app/icon.png (512x512) and app/apple-icon.png (180x180) from scripts/icon.html.
 *
 * Next.js App Router picks these up by filename: app/icon.png becomes <link rel="icon">, and
 * app/apple-icon.png becomes <link rel="apple-touch-icon">. Before this script the site had no
 * favicon at all, so every tab, bookmark and saved-to-homescreen entry showed a blank page glyph.
 *
 * Why a browser: same reason as the OG card — sharp renders SVG/HTML text through fontconfig and
 * silently falls back to a serif for webfonts. Chromium renders the real Manrope 800.
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
const RAW = path.join(WORK, "icon-512.png");
const OUT_ICON = path.join(ROOT, "app", "icon.png");
const OUT_APPLE = path.join(ROOT, "app", "apple-icon.png");
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

const PROBE = `(() => {
  const mark = document.querySelector(".mark");
  const r = mark.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = 1; canvas.height = 1;
  return JSON.stringify({
    w: innerWidth,
    h: innerHeight,
    fonts: document.fonts.status,
    manrope: document.fonts.check("800 236px Manrope"),
    mark: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    overflowX: document.documentElement.scrollWidth > innerWidth,
    overflowY: document.documentElement.scrollHeight > innerHeight,
  });
})()`;

async function main() {
  const sharp = require("sharp");
  fs.mkdirSync(WORK, { recursive: true });
  fs.copyFileSync(SRC_HTML, path.join(WORK, "icon.html"));

  const server = await serve(WORK, PORT);
  try {
    await ab("set viewport 512 512");
    await ab(`open http://127.0.0.1:${PORT}/`);
    await ab("wait 2000"); // webfont

    const probe = JSON.parse(JSON.parse((await ab("eval --stdin", PROBE)).trim()));
    if (probe.w !== 512 || probe.h !== 512) {
      throw new Error(`viewport is ${probe.w}x${probe.h}, expected 512x512`);
    }
    if (probe.fonts !== "loaded" || !probe.manrope) {
      throw new Error("Manrope did not load — refusing to bake a fallback typeface");
    }
    if (probe.overflowX || probe.overflowY) throw new Error("icon overflows the 512x512 frame");
    if (probe.mark.w < 200 || probe.mark.h < 120) {
      throw new Error(`mark is only ${probe.mark.w}x${probe.mark.h} — it would be illegible at 16px`);
    }
    console.log(`layout    : mark ${probe.mark.w}x${probe.mark.h} at ${probe.mark.x},${probe.mark.y} · no overflow`);

    await ab(`screenshot "${RAW}"`);
  } finally {
    server.close();
  }

  const meta = await sharp(RAW).metadata();
  if (meta.width !== 512 || meta.height !== 512) {
    throw new Error(`captured ${meta.width}x${meta.height}, expected 512x512`);
  }

  await sharp(RAW).png({ compressionLevel: 9 }).toFile(OUT_ICON);
  await sharp(RAW).resize(180, 180, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toFile(OUT_APPLE);

  console.log(`written   : app/icon.png (512x512, ${(fs.statSync(OUT_ICON).size / 1024).toFixed(1)} KB)`);
  console.log(`written   : app/apple-icon.png (180x180, ${(fs.statSync(OUT_APPLE).size / 1024).toFixed(1)} KB)`);

  // agent-browser leaves a detached daemon handle open; exit explicitly so the task does not hang.
  process.exit(0);
}

main().catch((err) => {
  console.error("build-icons failed:", err.message);
  process.exit(1);
});
