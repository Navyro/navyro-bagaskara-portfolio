#!/usr/bin/env node
/**
 * Builds the site's icon set from scripts/icon.svg.
 *
 *   public/favicon.ico               16 + 32 + 48  -> <link rel="icon" sizes="32x32">
 *   public/icon.svg                  vector        -> <link rel="icon" type="image/svg+xml">
 *   public/apple-touch-icon.png      180x180       -> <link rel="apple-touch-icon">
 *   public/icons/icon-192.png        192x192       -> web app manifest
 *   public/icons/icon-512.png        512x512       -> web app manifest / install dialog
 *   public/icons/icon-maskable-512.png            -> manifest, purpose "maskable" (padded mark)
 *
 * The source is pure vector: every glyph is a path, no text and no webfont. That is why this script
 * no longer needs Chromium — Sharp renders the file at the exact target size, so a 16px frame is
 * drawn at 16px instead of being downscaled from 512 and smeared.
 *
 * Run: npm run build:icons   (then npm run check:seo to prove the served files match)
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "scripts", "icon.svg");
const PUBLIC = path.join(ROOT, "public");
const ICONS_DIR = path.join(PUBLIC, "icons");

const SIZES = {
  ico: [16, 32, 48],
  apple: 180,
  manifest: [192, 512],
  maskable: 512,
};

/** Renders the source at exactly `size` pixels (librsvg draws at that size, no resample blur). */
async function render(svg, size, { scale = 1 } = {}) {
  let markup = svg
    .replace(/width="512"\s+height="512"/, `width="${size}" height="${size}"`)
    .replace(/viewBox="0 0 512 512"/, `viewBox="0 0 512 512"`);

  if (scale !== 1) {
    // Shrink the mark around the centre for the maskable variant: Android crops to a circle of 80%
    // diameter, so the mark's half-diagonal has to stay inside a 204.8px radius on a 512px tile.
    markup = markup.replace(
      /(<rect width="512" height="512"[^/]*\/>)/,
      `$1<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">`
    );
    markup = markup.replace(/(<path fill="#FFFFFF"[\s\S]*?\/>)/, `$1</g>`);
  }

  return sharp(Buffer.from(markup)).png({ compressionLevel: 9 }).toBuffer();
}

/** Minimal ICO container: header + one directory entry per PNG frame. */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(frames.length, 4);

  const entries = [];
  let offset = 6 + frames.length * 16;
  for (const { size, data } of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette colours
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

/** Reads the ICO back, so a broken container fails here instead of in someone's browser. */
function verifyIco(buf, sizes) {
  if (buf.readUInt16LE(2) !== 1) throw new Error("ico: not an icon container");
  const count = buf.readUInt16LE(4);
  if (count !== sizes.length) throw new Error(`ico: ${count} frames, expected ${sizes.length}`);
  const found = [];
  for (let i = 0; i < count; i++) {
    const at = 6 + i * 16;
    const w = buf.readUInt8(at) || 256;
    const len = buf.readUInt32LE(at + 8);
    const off = buf.readUInt32LE(at + 12);
    const png = buf.subarray(off, off + len);
    if (png.subarray(1, 4).toString() !== "PNG") throw new Error(`ico: frame ${i} is not PNG`);
    const ihdrW = png.readUInt32BE(16);
    const ihdrH = png.readUInt32BE(20);
    if (ihdrW !== w || ihdrH !== w) throw new Error(`ico: frame ${i} header ${ihdrW}x${ihdrH}, dir says ${w}`);
    found.push(w);
  }
  const expected = [...sizes].sort((a, b) => a - b).join(",");
  if (found.sort((a, b) => a - b).join(",") !== expected) {
    throw new Error(`ico: frames ${found.join(",")}, expected ${expected}`);
  }
}

async function main() {
  const svg = fs.readFileSync(SRC, "utf8");
  fs.mkdirSync(ICONS_DIR, { recursive: true });

  const written = [];
  const write = (file, buf) => {
    fs.writeFileSync(file, buf);
    written.push([file, buf.length]);
  };

  // 1. ICO: three frames, each drawn at its own size.
  const frames = [];
  for (const size of SIZES.ico) frames.push({ size, data: await render(svg, size) });
  const ico = buildIco(frames);
  verifyIco(ico, SIZES.ico);
  write(path.join(PUBLIC, "favicon.ico"), ico);

  // 2. Vector favicon, served as-is.
  write(path.join(PUBLIC, "icon.svg"), Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>\n${svg.replace(/\n\s*\n/g, "\n")}`
  ));

  // 3. Apple touch icon — iOS letterboxes transparency onto black, so it must be opaque.
  const apple = await render(svg, SIZES.apple);
  const appleMeta = await sharp(apple).metadata();
  if (appleMeta.hasAlpha) {
    const stats = await sharp(apple).stats();
    if (stats.channels[3] && stats.channels[3].min < 255) {
      throw new Error("apple icon has transparent pixels — iOS would draw them black");
    }
  }
  write(path.join(PUBLIC, "apple-touch-icon.png"), apple);

  // 4. Manifest PNGs.
  for (const size of SIZES.manifest) {
    write(path.join(ICONS_DIR, `icon-${size}.png`), await render(svg, size));
  }

  // 5. Maskable: mark scaled into the 80% safe circle. 232px is the mark's half-diagonal at scale
  //    1, so 0.78 keeps it at ~181px, comfortably inside the 204.8px radius.
  const maskScale = 0.78;
  const maskable = await render(svg, SIZES.maskable, { scale: maskScale });
  const halfDiagonal = Math.round(Math.sqrt((304 / 2) ** 2 + (352 / 2) ** 2) * maskScale);
  if (halfDiagonal > 204) throw new Error(`maskable half-diagonal ${halfDiagonal}px crosses the safe radius`);
  write(path.join(ICONS_DIR, "icon-maskable-512.png"), maskable);

  // Report, and fail loudly if any byte count looks like a mistake.
  for (const [file, bytes] of written) {
    const meta = await sharp(file, { pages: 1 }).metadata().catch(() => null);
    const dims = meta ? `${meta.width}x${meta.height}` : `ico ${SIZES.ico.join("/")}`;
    console.log(`written : ${path.relative(ROOT, file).replace(/\\/g, "/")} (${dims}, ${(bytes / 1024).toFixed(1)} KB)`);
  }
  console.log(`maskable: mark half-diagonal ${halfDiagonal}px < 204px safe radius`);
  console.log(`platform: ${os.platform()}`);
}

main().catch((err) => {
  console.error(`build-icons failed: ${err.message}`);
  process.exit(1);
});
