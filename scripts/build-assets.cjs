/**
 * Asset pipeline: turns the owner's real screenshots in `TENTANG SAYA/` into the site's
 * project imagery. Run with `node scripts/build-assets.cjs`.
 *
 * - copies each screen into public/images/projects/<slug>/screens/
 * - composes a 4:5 cover (1600x2000) from three real screens
 * - copies the real CV PDF over the placeholder
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "TENTANG SAYA");
const OUT = path.join(ROOT, "public", "images", "projects");

const PROJECTS = [
  {
    slug: "fanfunds",
    dir: "FanFunds",
    cover: ["Home (Discover).png", "Profil Kreator (Leaderboard).png", "Onboarding.png"],
    screens: [
      "Splash Screen.png",
      "Onboarding.png",
      "Home (Discover).png",
      "Home (Following).png",
      "Search.png",
      "List Leaderboard.png",
      "Profil Kreator (Leaderboard).png",
      "Profile Supporter.png",
      "Donate Step 4.png",
      "Notification Donatur News.png",
      "Notification Donatur Update.png",
    ],
  },
  {
    slug: "jogging-id",
    dir: "Jogging ID",
    cover: ["Home.png", "Start Run.png", "Result Workout.png"],
    screens: [
      "Splash Screen 3.png",
      "On Boarding.png",
      "Home.png",
      "Start Run.png",
      "Week 1 Day 1 Out door.png",
      "Result Workout.png",
      "Result.png",
      "Challenges.png",
      "Profile.png",
    ],
  },
  {
    slug: "kick-swift",
    dir: "Desain Aplikasi Kick Swift",
    cover: ["Home.png", "Details.png", "Troli.png"],
    screens: ["Splash3.png", "Onboard-1.png", "Home.png", "Search.png", "Details.png", "Troli.png"],
  },
  {
    slug: "mediassist",
    dir: "Aplikasi Mediassist",
    cover: ["Home (Amelda).png", "List Dokter (Navyro).png", "Detail Dokter (Navyro).png"],
    screens: [
      "Onboarding (Akbar).png",
      "Home (Amelda).png",
      "List Dokter (Navyro).png",
      "Detail Dokter (Navyro).png",
      "Jadwal (Amelda).png",
      "Chat (Dimas).png",
    ],
  },
  {
    slug: "penagihan-limbah",
    dir: "Desain Aplikasi Penagihan Limbah Rumah Tangga",
    cover: ["DASHBOARD.png", "TAGIHAN INDIVIDU - TUNGGAKAN 1.png", "LAPORAN.png"],
    screens: [
      "SPLASH SCREEN.png",
      "ADMIN LOGIN.png",
      "DASHBOARD.png",
      "TAGIHAN INDIVIDU - TUNGGAKAN 1.png",
      "DETAIL TAGIHAN KELOMPOK WARGA RT 01 - FEB - NUNGGAK.png",
      "LAPORAN.png",
    ],
  },
  {
    slug: "sipenelitian",
    dir: "Sistem Informasi Pengelolaan Data Penelitian UAA",
    cover: [
      "Dashboard Admin.png",
      "Usulan Masuk - Detail - Klik Update Ubah Status.png",
      "Laporan Kemajuan - Detail Monitoring & Logbook.png",
    ],
    screens: [
      "Login.png",
      "Dashboard Admin.png",
      "Hibah Internal - Tambah Program hibah.png",
      "Usulan Masuk - Semua Tahun.png",
      "Usulan Masuk - Detail - Klik Update Ubah Status.png",
      "Laporan Kemajuan - Detail Monitoring & Logbook.png",
      "Sistem Informasi Pengelolaan Data Penelitian UAA/Laporan Akhir - Download Lembar Pengesahan.png",
      "Sistem Informasi Pengelolaan Data Penelitian UAA/Kelola User - User Ditambahkan.png",
    ],
  },
];

/** Some folders keep duplicating sub-directories (e.g. FanFunds/FanFunds/), so resolve by basename. */
function resolveSrc(dir, file) {
  const direct = path.join(SRC, dir, file);
  if (fs.existsSync(direct)) return direct;
  const walk = (d) =>
    fs
      .readdirSync(d, { withFileTypes: true })
      .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  const hits = walk(path.join(SRC, dir)).filter(
    (f) => path.basename(f).toLowerCase() === path.basename(file).toLowerCase()
  );
  if (hits.length) return hits[0];
  throw new Error(`missing screen: ${path.join(SRC, dir, file)}`);
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\.png$/, "")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const W = 1600;
const H = 2000;

function roundedMask(w, h, r) {
  return Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`
  );
}

async function phone(buf, height, radius) {
  const resized = await sharp(buf)
    .resize({ height: Math.round(height), fit: "contain" })
    .ensureAlpha()
    .png()
    .toBuffer();
  // Dimensions must come from the produced buffer: metadata() on a pending pipeline
  // reports the source size and produced a mask that did not match the image.
  const { width, height: h } = await sharp(resized).metadata();
  const w = Math.round(width);
  const out = await sharp(resized)
    .composite([{ input: roundedMask(w, h, radius), blend: "dest-in" }])
    .png()
    .toBuffer();
  return { buf: out, w, h: Math.round(h) };
}

async function shadow(w, h, radius) {
  const svg = `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="#0b0d12" fill-opacity="0.28"/></svg>`;
  return sharp(Buffer.from(svg)).blur(26).png().toBuffer();
}

async function frame(buf, width, radius) {
  const r = await sharp(buf).resize({ width: Math.round(width) }).ensureAlpha().png().toBuffer();
  const m = await sharp(r).metadata();
  const masked = await sharp(r)
    .composite([{ input: roundedMask(m.width, m.height, radius), blend: "dest-in" }])
    .png()
    .toBuffer();
  return { buf: masked, w: m.width, h: m.height, shadow: await shadow(m.width, m.height, radius) };
}

/** Phone covers: three equal phones in one row, no overlap, even gaps. */
async function buildCoverMobile(slug, paths) {
  const gap = 44;
  const margin = 80;
  const cell = Math.floor((W - margin * 2 - gap * 2) / 3);
  const items = [];
  for (const p of paths) items.push(await frame(fs.readFileSync(p), cell, 28));

  const rowH = Math.max(...items.map((i) => i.h));
  const top = Math.round((H - rowH) / 2);
  const layers = [];
  let x = margin;
  for (const it of items) {
    const y = Math.round(top + (rowH - it.h) / 2);
    layers.push({ input: it.shadow, left: x + 6, top: y + 16 });
    layers.push({ input: it.buf, left: x, top: y });
    x += it.w + gap;
  }
  return compose(slug, layers);
}

/** Desktop covers: one wide window on top, two supporting windows beneath. */
async function buildCoverDesktop(slug, paths) {
  const mainW = 1340;
  const main = await frame(fs.readFileSync(paths[0]), mainW, 16);
  const smallW = 620;
  const b = await frame(fs.readFileSync(paths[1]), smallW, 14);
  const c = await frame(fs.readFileSync(paths[2]), smallW, 14);

  const mainX = Math.round((W - main.w) / 2);
  const blockH = main.h + 56 + Math.max(b.h, c.h);
  const mainY = Math.round((H - blockH) / 2);
  const rowY = mainY + main.h + 56;
  const gap = 64;
  const rowW = b.w + gap + c.w;
  const rowX = Math.round((W - rowW) / 2);

  const layers = [
    { input: main.shadow, left: mainX + 8, top: mainY + 20 },
    { input: main.buf, left: mainX, top: mainY },
    { input: b.shadow, left: rowX + 6, top: rowY + 16 },
    { input: c.shadow, left: rowX + b.w + gap + 6, top: rowY + 16 },
    { input: b.buf, left: rowX, top: rowY },
    { input: c.buf, left: rowX + b.w + gap, top: rowY },
  ];
  return compose(slug, layers);
}

async function compose(slug, layers) {
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F0F2F5"/><stop offset="1" stop-color="#DFE3EA"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
  );
  const outPath = path.join(OUT, slug, "cover.jpg");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(bg).composite(layers).jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
  return outPath;
}

async function buildCover(slug, dir, coverFiles) {
  const paths = coverFiles.map((f) => resolveSrc(dir, f));
  const first = await sharp(paths[0]).metadata();
  return first.width / first.height > 1.2
    ? buildCoverDesktop(slug, paths)
    : buildCoverMobile(slug, paths);
}

(async () => {
  const report = [];
  for (const p of PROJECTS) {
    const screenDir = path.join(OUT, p.slug, "screens");
    fs.rmSync(path.join(OUT, p.slug), { recursive: true, force: true });
    fs.mkdirSync(screenDir, { recursive: true });

    const written = [];
    for (const [i, f] of p.screens.entries()) {
      const src = resolveSrc(p.dir, f);
      const dest = path.join(screenDir, `${String(i + 1).padStart(2, "0")}-${slugify(f)}.png`);
      fs.copyFileSync(src, dest);
      written.push(path.basename(dest));
    }

    const cover = await buildCover(p.slug, p.dir, p.cover);
    report.push({ slug: p.slug, screens: written, cover: path.relative(ROOT, cover) });
  }

  // Real CV replaces the 932-byte placeholder.
  const cvSrc = path.join(SRC, "CV_Navyro_Bagaskara_EN.pdf");
  const cvDest = path.join(ROOT, "public", "Navyro_Bagaskara_CV.pdf");
  fs.copyFileSync(cvSrc, cvDest);

  fs.writeFileSync(
    path.join(ROOT, ".ux-logs", "assets-report.json"),
    JSON.stringify(report, null, 2)
  );
  console.log(JSON.stringify(report.map((r) => ({ slug: r.slug, n: r.screens.length })), null, 0));
  console.log("cv bytes:", fs.statSync(cvDest).size);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
