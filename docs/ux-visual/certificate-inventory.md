# Inventaris Sertifikat & Pelatihan — hasil ekstraksi `TENTANG SAYA/`

Sumber: 38 file PDF di `TENTANG SAYA/` — 35 file sertifikat, 2 CV, 1 portofolio PDF.
Hasil: **34 kredensial unik** — dua file MSIB identik byte-per-byte (md5 `70f939a2…`), jadi 35 file ≠ 35 sertifikat.

## Metode (supaya bisa diaudit)

1. Text layer diekstrak dengan `pdf-parse` lewat `scripts/extract-certificates.cjs` → `.ux-logs/certs/raw.json`.
   Semua judul, tanggal, nomor, dan ID di bawah ini diambil dari text layer PDF, bukan dari nama file.
2. Hanya file yang text layer-nya tidak memuat tanggal yang dirender dan dibaca ulang secara visual:
   7 sertifikat Anthropic, STEMSEL, KKNT, dan MSIB (untuk memastikan mana Issued dan mana Expired).
3. Nama file **tidak** dipakai sebagai sumber kebenaran. Contoh: file bernama
   `Certificate_AI Fluency Framework & Foundations.pdf` tetapi judul di sertifikat
   "AI Fluency: Framework & Foundations".

## A. Kredensial yang terverifikasi

### Desain & UI/UX

| # | Judul di sertifikat | Penerbit | Tanggal | ID / verifikasi | File |
| --- | --- | --- | --- | --- | --- |
| 1 | Flexible Kickstart UI UX Design Journey — **EXCELLENT GRADE** | Rakamin Academy | Nov 2026 | `377172UI_UX2112026-EG` | `SERTIF RAKAMIN/…` |
| 2 | Introduction to Figma | Simplilearn SkillUp | 3 Nov 2026 | `10986885` | `Sertif Simplilearn Skillup/…` |
| 3 | STEMSEL UI/UX Associate Certification | STEMSEL Foundation | terbit 31 Des 2024, berlaku s.d. 31 Des 2027 | `d2ddff72-9e9b-430e-9292-1d8b7a7fec70` | `SERTIFIKAT STEMSEL UIUX.pdf` |
| 4 | Enterprise Design Thinking Practitioner | IBM SkillsBuild | 31 Okt 2026 | Credly `credly.com/go/ZB9Eoa6R` | `SERTIFIKAT IBM/…` |

### Web / Front-End

| # | Judul di sertifikat | Penerbit | Tanggal | ID / verifikasi | File |
| --- | --- | --- | --- | --- | --- |
| 5 | Belajar Dasar Pemrograman Web | Dicoding | 24 Jun 2024, berlaku s.d. 24 Jun 2027 | `dicoding.com/certificates/1OP8WRV11XQK` | `sertifikat_course_…Web_Navyro Bagaskara.pdf` |
| 6 | Belajar Dasar Pemrograman JavaScript | Dicoding | 8 Jun 2024, berlaku s.d. 8 Jun 2027 | `dicoding.com/certificates/72ZDV59RQZYW` | `…JavaScript_…` |
| 7 | Belajar Membuat Front-End Web untuk Pemula | Dicoding | 26 Jun 2024, berlaku s.d. 26 Jun 2027 | `dicoding.com/certificates/81P2NKLOYXOY` | `…Front-End Web untuk Pemula_…` |

### Program Kampus Merdeka / kampus

| # | Judul di sertifikat | Penerbit | Tanggal | ID | File |
| --- | --- | --- | --- | --- | --- |
| 8 | UI/UX SIB Batch 7 (sertifikat kelulusan) | Bisa.ai / Bisa AI Academy, PT Bisa Artifisial Indonesia | terbit 20 Des 2024, berlaku s.d. 20 Des 2026 | `f2ca085d-0c51-4e96-9598-584846ba1528` | 2 file identik |
| 9 | Studi Independen Bersertifikat Angkatan 7 (kepesertaan) | Kemdikbudristek — MSIB | — | NIM `223100352`, ID kegiatan `10856441` | `Sertifikat Kepesertaan MSIB Batch 7..pdf` |
| 10 | KKN Tematik / Proyek Membangun Desa | LP2M Universitas Alma Ata | 22 Jan – 20 Mar 2025, terbit 5 Mei 2025 | `005/SR/KKNT/LP2M/AA/V/2025` | `Sertifikat KKNT_Navyro Bagaskara.pdf` |
| 11 | Training of AAEPT (lengkap) + AAEPT Score Report | Alma Ata Language Training Centre | pelatihan Mar–Ags 2025; tes 22 Sep 2024; sertifikat 24 Jun 2026 | **skor total 497** | `Sertifikat_ALTC.pdf` |

### AI / tooling

| # | Judul di sertifikat | Penerbit | Tanggal | ID | File |
| --- | --- | --- | --- | --- | --- |
| 12 | Dasar-Dasar AI 2026 | Canva | 3 Nov 2026 | `85ff0a` | `SERTIF CANVA/…` |
| 13 | AI Fluency: AI Capabilities & Limitations | Anthropic | tidak dicetak | — | `…ANTHROPIC/…Capabilities…` |
| 14 | AI Fluency: Framework & Foundations | Anthropic | tidak dicetak | — | `…Framework & Foundations…` |
| 15 | AI Fluency for Builders | Anthropic × Codepath.org | tidak dicetak | — | `…Builders…` |
| 16 | AI Fluency for Creative Work | Anthropic × UCC × Ringling College of Art + Design | tidak dicetak | — | `…Creative Work…` |
| 17 | AI Fluency for Students | Anthropic × UCC × Ringling × HEA / National Forum | tidak dicetak | — | `…students…` |
| 18 | Claude 101 | Anthropic | tidak dicetak | — | `…Claude 101…` |
| 19 | Introduction to Claude Cowork | Anthropic | tidak dicetak | — | `…Claude Cowork…` |

### Marketing / SEO (opsional, di luar fokus UI/UX)

| # | Judul di sertifikat | Penerbit | Tanggal | ID | File |
| --- | --- | --- | --- | --- | --- |
| 20 | Google Ads Creative Certification | Google Skillshop | terbit 30 Okt 2026, berlaku s.d. 30 Okt 2027 | `198802386` | `GOOGLE SKILLSHOP/GOOGLE ADS/…` |
| 21 | Google Analytics Certification (2026) | Google Skillshop | terbit 3 Nov 2026, berlaku s.d. 3 Nov 2027 | `199183186` | `GOOGLE SKILLSHOP/GOOGLE ANALYSIS/…` |
| 22 | Getting Started with Semrush for Agencies | Semrush Academy | berlaku s.d. 30 Okt 2027 | `b1b76bb8b7` | `SERTIFIKAR SEMRUSH/…` |
| 23 | Technical SEO and AI Search Essentials with Semrush | Semrush Academy | berlaku s.d. 31 Okt 2027 | `5c4db0b86b` | `SERTIFIKAR SEMRUSH/…` |

### Soft skills — Pembekalan 12+ Essential Skills (GNIK × Kemenaker RI)

Semua berpredikat nilai numerik, Oktober 2026:

| # | Topik | Nilai | Tanggal |
| --- | --- | --- | --- |
| 24 | Adaptability | 100 | 30 Okt 2026 |
| 25 | Digital Disruption & Transformation | 100 | 30 Okt 2026 |
| 26 | Digital Literacy | 100 | 6 Okt 2026 |
| 27 | Self Efficacy | 100 | 6 Okt 2026 |
| 28 | Emotional Intelligence | 95 | 30 Okt 2026 |
| 29 | Social Influence | 95 | 31 Okt 2026 |
| 30 | Integrity at Work | 94 | 20 Okt 2026 |
| 31 | Emotional Resilience | 90 | 30 Okt 2026 |

### Manajemen / kepatuhan (BSN e-learning, predikat "Sangat Baik")

| # | Kursus | Tanggal ujian | Berlaku s.d. | Nomor |
| --- | --- | --- | --- | --- |
| 32 | Manajemen Risiko Berbasis SNI ISO 31000 | 5 Okt 2026 | 5 Okt 2027 | `ELSDS/BSN/23338/XXVI` |
| 33 | SNI ISO 37001:2016 Sistem Manajemen Anti Penyuapan | 6 Okt 2026 | 6 Okt 2027 | `ELSDS/BSN/23601/XXVI` |
| 34 | Sistem Manajemen K3 Berbasis SNI ISO 45001:2018 | 5 Okt 2026 | 5 Okt 2027 | `ELSDS/BSN/23351/XXVI` |

## B. Rekomendasi tampil di situs — 8 baris

| Kelompok | Item | Alasan |
| --- | --- | --- |
| UI/UX | **Flexible Kickstart UI UX Design Journey** (Rakamin, Nov 2026, Excellent Grade) | Satu-satunya sertifikat UI/UX dengan predikat; paling relevan |
| UI/UX | **Introduction to Figma** (Simplilearn, 3 Nov 2026) | Tool utama yang dipakai di 6 case study |
| UI/UX | **STEMSEL UI/UX Associate Certification** (2024) | Sertifikasi kompetensi, bukan sekadar completion |
| Metode | **Enterprise Design Thinking Practitioner** (IBM, 31 Okt 2026) | Nyambung ke proses design thinking di case study |
| Web | **Belajar Membuat Front-End Web untuk Pemula** (Dicoding, 2024) | Menjelaskan kenapa kamu bisa membangun situs ini sendiri |
| AI | **AI Fluency for Creative Work** (Anthropic) | Paling relevan untuk desainer; 6 sertifikat lain diringkas jadi satu baris |
| Program | **UI/UX SIB Batch 7 — MSIB** (Bisa.ai, Des 2024) | Bukti pengalaman industri; tapi lihat catatan duplikasi |
| Soft skill | **Essential Skills: Emotional Intelligence (95)** atau **Self Efficacy (100)** | Pilih **satu**, jangan delapan |

Opsional kalau targetmu agensi digital: **Google Analytics Certification (2026)** menggantikan salah satu di atas.

## C. Yang sengaja TIDAK dimasukkan

- **ISO 31000 / 37001 / 45001** — manajemen risiko, anti-penyuapan, K3. Tidak berhubungan dengan UI/UX dan bisa mengaburkan positioning.
- **8 sertifikat Camy.id sekaligus** — satu klaim "Pembekalan 12+ Essential Skills (GNIK × Kemenaker) min. 90" lebih kuat daripada delapan baris.
- **7 sertifikat Anthropic terpisah** — diringkas; semuanya tanpa tanggal cetak, jadi tidak bisa ditampilkan dengan tahun.
- **Simplilearn/Semrush/Google Ads** selain yang di atas — biarkan jadi bukti tambahan kalau ditanya, bukan isi halaman.

## D. Temuan yang perlu keputusanmu

1. **MSIB muncul dua kali**: sudah ada di `data/profile.ts` sebagai *experience* ("Independent Study UI/UX & Game Development — BISA AI Academy, Sep–Des 2024"). Kalau dimasukkan lagi sebagai sertifikat, isinya dobel. Saran: jangan masukkan baris MSIB di daftar sertifikat, atau hapus dari experience lalu taruh sebagai sertifikat. Pilih satu.
2. **Sertifikat Anthropic tanpa tanggal.** Kalau ditampilkan, formatnya `Anthropic · AI Fluency for Creative Work` tanpa tahun — jangan dikarang.
3. **Sertifikat ISO berlabel BSN, bukan lembaga desain.** Kalau kamu melamar ke bidang K3/manajemen, baru layak ditampilkan.
4. **ALTC** memuat dua hal: sertifikat pelatihan AAEPT *dan* skor tes 497. Di situs lebih berguna sebagai satu baris "AAEPT 497" daripada sebagai sertifikat pelatihan.

## E. Status teknis

- `scripts/extract-certificates.cjs` — skrip ekstraksi, bisa dijalankan ulang kapan saja.
- `pdf-parse@1.1.1` masuk devDependencies.
- Belum ada perubahan pada `data/profile.ts`, `/resume`, atau `public/` — daftar ini belum dipasang ke situs, menunggu pilihanmu di bagian B dan keputusan di bagian D.
