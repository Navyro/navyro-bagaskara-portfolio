#!/usr/bin/env node
/**
 * Builds public/og-image.png (1200x630) — the social preview card.
 *
 * Why a browser instead of sharp/SVG: the card must use the same Manrope/Inter pairing as
 * the site. sharp renders SVG text through fontconfig, which falls back to a serif for
 * locally installed webfonts, so the one asset people see before they visit the site would
 * have been in the wrong typeface. Chromium renders the exact typography.
 *
 * Sources
 *   scripts/og-image.html                          layout + copy (committed)
 *   TENTANG SAYA/PAS FOTO PNG/PAS FOTO BG BIRU.png  portrait (source of truth, cropped 760px wide)
 *
 * Steps
 *   1. crop the portrait into .ux-logs/og/portrait.png
 *   2. copy the HTML next to it
 *   3. serve .ux-logs/og on 127.0.0.1:4321 and screenshot it at exactly 1200x630
 *   4. verify the capture, optimise into public/og-image.png, print the byte size
 *   5. write public/og-image.stamp — the hash of the template, so check:og can tell a stale card
 *      without trusting file timestamps
 *
 * Run: npm run build:og
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SRC_HTML = path.join(ROOT, "scripts", "og-image.html");
const SRC_PORTRAIT = path.join(ROOT, "TENTANG SAYA", "PAS FOTO PNG", "PAS FOTO BG BIRU.png");
const WORK = path.join(ROOT, ".ux-logs", "og");
const RAW = path.join(WORK, "og-raw.png");
const OUT = path.join(ROOT, "public", "og-image.png");
const PORT = 4321;
const SESSION = "ux-og";

// The page is served by THIS process, so agent-browser has to run asynchronously: execSync
// blocks the event loop, the server never answers the browser, and the CLI reports
// "the command reached the daemon but no response came back".
// spawn + shell because npx is npx.cmd on Windows.
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
    // stdin must be closed or the daemon waits for EOF.
    child.stdin.end(input ?? "");
  });
}

function serve(dir, port) {
  const types = { ".html": "text/html; charset=utf-8", ".png": "image/png" };
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "og-image.html";
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
  const rect = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  return JSON.stringify({
    w: innerWidth,
    h: innerHeight,
    fonts: document.fonts.status,
    manrope: document.fonts.check("800 74px Manrope"),
    images: [...document.images].map((i) => ({ ok: i.complete && i.naturalWidth > 0, w: i.naturalWidth })),
    h1: rect(document.querySelector("h1")),
    portrait: rect(document.querySelector(".portrait")),
    overflowX: document.documentElement.scrollWidth > innerWidth,
    overflowY: document.documentElement.scrollHeight > innerHeight,
  });
})()`;

async function main() {
  const sharp = require("sharp");
  fs.mkdirSync(WORK, { recursive: true });

  if (!fs.existsSync(SRC_PORTRAIT)) {
    throw new Error(`portrait source missing: ${SRC_PORTRAIT}`);
  }
  await sharp(SRC_PORTRAIT)
    .extract({ left: 0, top: 60, width: 945, height: 1180 })
    .resize({ width: 760 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(WORK, "portrait.png"));
  console.log("portrait  : cropped from TENTANG SAYA/PAS FOTO PNG (blue background)");

  fs.copyFileSync(SRC_HTML, path.join(WORK, "og-image.html"));

  const server = await serve(WORK, PORT);
  try {
    await ab("set viewport 1200 630");
    await ab(`open http://127.0.0.1:${PORT}/`);
    await ab("wait 2500"); // webfonts + image decode

    const probe = JSON.parse(JSON.parse((await ab("eval --stdin", PROBE)).trim()));
    if (probe.w !== 1200 || probe.h !== 630) {
      throw new Error(`viewport is ${probe.w}x${probe.h}, expected 1200x630`);
    }
    if (probe.fonts !== "loaded" || !probe.manrope) {
      throw new Error("Manrope did not load — refusing to bake a fallback typeface");
    }
    if (!probe.images.every((i) => i.ok)) throw new Error("portrait image did not decode");
    if (probe.overflowX || probe.overflowY) {
      throw new Error("card overflows the 1200x630 frame");
    }
    if (probe.portrait.x + probe.portrait.w > 1200 - 24) {
      throw new Error("portrait crosses the inner frame");
    }
    console.log(
      `layout    : h1 ${probe.h1.w}x${probe.h1.h} at ${probe.h1.x},${probe.h1.y} · portrait ${probe.portrait.w}x${probe.portrait.h} at ${probe.portrait.x},${probe.portrait.y} · no overflow`
    );

    await ab(`screenshot "${RAW}"`);
  } finally {
    server.close();
  }

  const meta = await sharp(RAW).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`captured ${meta.width}x${meta.height}, expected 1200x630`);
  }
  const before = fs.statSync(RAW).size;
  await sharp(RAW).png({ compressionLevel: 9 }).toFile(OUT);

  console.log(`captured  : 1200x630 (${(before / 1024).toFixed(0)} KB raw)`);
  console.log(`written   : public/og-image.png (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`);

  // Record which version of the template this card came from. check:og compares this hash instead of
  // file times, because a fresh git checkout gives every file the same mtime and would make the
  // staleness check pass or fail at random. Line endings are normalised for the same reason the check
  // normalises them: the working tree is CRLF on Windows and LF elsewhere.
  const stamp = crypto
    .createHash("sha256")
    .update(fs.readFileSync(SRC_HTML, "utf8").replace(/\r\n/g, "\n"))
    .digest("hex");
  fs.writeFileSync(path.join(ROOT, "public", "og-image.stamp"), stamp + "\n", "utf8");
  console.log(`stamped   : public/og-image.stamp (${stamp.slice(0, 12)}…)`);

  // agent-browser leaves a detached daemon handle open; exit explicitly so the task does not hang.
  process.exit(0);
}

main().catch((err) => {
  console.error("build-og failed:", err.message);
  process.exit(1);
});
