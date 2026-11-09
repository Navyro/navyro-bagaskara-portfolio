# Social preview card (OG image) — 1200×630

## The question

> "Link portofolio pakai gambar yang di TENTANG SAYA gimana? Oke ga?"

Ya — dan lebih baik daripada gambar abstrak. Alasannya:

- Gambar di `TENTANG SAYA/PAS FOTO PNG` adalah **foto resmi** (pas foto, latar biru, 945×1417), bukan
  foto acak. Wajah pemilik portofolio adalah hal pertama yang dikenali orang di feed WhatsApp/LinkedIn.
- Kartu pratinjau tanpa wajah hanya menampilkan judul + domain, sehingga link terlihat seperti artikel,
  bukan karya seseorang.
- Latar biru elektrik dari foto itu **kebetulan cocok** dengan aksen situs (`#1F4FFF` / `#38BDF8`), jadi
  foto tidak perlu di-cut-out atau diganti latar.

Yang **tidak** saya pakai: sertifikat (tidak boleh jadi representasi diri), screenshot proyek (terlalu kecil
di 1200×630 dan mengikat kartu ke satu proyek), dan foto non-formal (tidak konsisten dengan CV/portofolio PDF
yang juga dipakai di situs).

## What was built

| File | Peran |
| --- | --- |
| `scripts/og-image.html` | Sumber layout + copy. Manrope/Inter dari Google Fonts, warna & spacing dari token situs. |
| `scripts/build-og-image.cjs` | Crop foto → serve folder → screenshot Chromium 1200×630 → tulis `public/og-image.png`. `npm run build:og`. |
| `public/og-image.png` | Hasil: 1200×630, 281 KB. |
| `scripts/check-og.cjs` | Gerbang: ukuran, berat, kesegaran, dan tag metadata. `npm run check:og`. |
| `app/layout.tsx` | `metadataBase` + `openGraph.images` (1200×630) + `twitter:card = summary_large_image`. |

Kenapa dirender lewat browser, bukan `sharp`/SVG: teks SVG di `sharp` jatuh ke font serif untuk webfont lokal
(sudah diuji — keluaran pertama memang serif). Chromium merender Manrope/Inter persis seperti situs, dan
skrip menolak menulis hasil kalau `document.fonts.check("800 74px Manrope")` gagal, supaya tube fallback
tidak pernah ikut ter-commit.

### Isi kartu

```
UI/UX DESIGNER · FRONT-END        (aksen, letterspaced)
Navyro
Bagaskara                          (74px Manrope 800)
———                                (garis aksen #1F4FFF)
Merancang produk digital dari riset pengguna
sampai prototipe dan kode siap produksi.
navbagaskara@gmail.com · linkedin.com/in/navyro-bagaskara
                                    [foto pas, 300×396, rounded]
```

Tidak ada klaim yang tidak terverifikasi: tidak ada angka proyek, tidak ada "5+ years", tidak ada domain
karangan. Yang tercetak hanya nama, peran, satu kalimat tentang cara kerja, dan dua kanal kontak yang memang
ada di CV.

## Verification

| Cek | Hasil |
| --- | --- |
| Dimensi hasil | **1200×630** (dibaca ulang dengan `sharp.metadata()` setelah capture) |
| Berat | 281 KB (batas gerbang 1024 KB — WhatsApp/LinkedIn paling lambat di file besar) |
| Layout saat render | `h1` 614×151 di (88,174); foto 300×396 di (812,117); **tidak ada overflow** horizontal/vertikal |
| Font | `document.fonts.status = loaded`, `check('800 74px Manrope') = true` — build gagal kalau tidak |
| Tag di HTML | `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`, `og:image:width/height/alt/type`, `og:type`, `twitter:card = summary_large_image` |
| File disajikan | `GET /og-image.png` → `200 image/png 287315` |
| Visual | `look_at_image` membaca ulang semua teks tanpa clipping/overlap; foto tidak terpotong di kepala/bahu |
| Gerbang negatif | `touch -d 2020-01-01 public/og-image.png` → `FAIL image.fresh`, lalu pulih setelah timestamp dikembalikan |
| Suite UX | **183 cek, 0 gagal** (tidak ada regresi layout dari perubahan metadata) |
| Build | `npx next build` exit 0; 6 halaman `/work/[slug]` tetap ter-generate |

## Before deploying — one required setting

`og:image` harus absolut. `metadataBase` dibaca dari:

1. `NEXT_PUBLIC_SITE_URL` (pakai ini kalau domain sendiri),
2. `VERCEL_PROJECT_PRODUCTION_URL` (otomatis di Vercel),
3. fallback `http://localhost:3000` — **hanya untuk lokal**.

Tanpa salah satu env di atas, kartu akan menunjuk ke localhost saat di-deploy. Set
`NEXT_PUBLIC_SITE_URL=https://domain-kamu` di environment produksi.

## What is deliberately not here

- **Tidak ada kartu khusus per halaman.** `/work`, `/resume`, dan 6 case study mewarisi kartu yang sama.
  Kartu per proyek butuh gambar per proyek dan keputusan desain sendiri; satu kartu yang kuat lebih baik
  daripada tujuh yang setengah jadi.
- **Tidak ada manifest/icons.** Itu pekerjaan infra terpisah (`app/icon.png`, manifest), belum dikerjakan.
- **Render nyata di WhatsApp/LinkedIn belum bisa dibuktikan dari lokal.** Yang sudah dibuktikan: tag yang
  mereka baca benar, gambar 1200×630 ada, dan ukurannya di bawah batas. Setelah deploy, cek dengan
  `https://www.opengraph.xyz/url/<url>` atau tempel link ke WhatsApp dan lihat preview-nya.
