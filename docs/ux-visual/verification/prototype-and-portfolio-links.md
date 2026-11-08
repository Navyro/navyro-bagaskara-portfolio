# Prototype links + portfolio PDF — verification

**Request:** put the six Figma links into the site, adapted to the existing data model, and add the
portfolio PDF.

## 1. Prototype links

The rendering path already existed and was empty: `CaseStudyData.prototypeUrl` was declared in
`data/projects.ts` and `app/work/[slug]/page.tsx` already rendered a button when it was set. So the work was
data, not new UI.

### What was added

| Project | URL kind | Button label |
| --- | --- | --- |
| SIPENELITIAN | `figma.com/proto/…` | Buka Prototype di Figma |
| FanFunds | `figma.com/proto/…` | Buka Prototype di Figma |
| Penagihan Limbah RT | `figma.com/proto/…` | Buka Prototype di Figma |
| Mediassist | `figma.com/**design**/…` | **Buka File Figma** |
| Kick Swift | `figma.com/proto/…` (file `Srudi-Indemendent`) | Buka Prototype di Figma |
| Jogging ID | `figma.com/proto/…` (same file, other node) | Buka Prototype di Figma |

Two details that would otherwise be small lies:

- **Mediassist is not a prototype.** The link the user supplied is a `/design/` file, so calling it
  "Prototype" would promise an interactive flow that the URL does not open. It got its own label.
- **Kick Swift and Jogging ID live in the same Figma file** (`Srudi-Indemendent`), anchored to different
  `node-id`s. Both are correct and distinct; the duplication is in the Figma file, not in the data.

`prototypeLabel?: string` was added to `CaseStudyData`; the component falls back to
`"Buka Prototype di Figma"` if a future project omits it.

### Verification (three independent levels)

1. **URL live check** — all six URLs fetched from Figma over HTTPS: **HTTP 200** each, and the file slug in
   the path matches the project (`FanFunds`, `Desain-Aplikasi-Penagihan-Limbah-Rumah-Tangga`,
   `Sistem-Informasi-Pengelolaan-Data-Penelitian-UAA`, `Tugas-Kelompok-Kelas-UI-UX`, `Srudi-Indemendent` ×2).
2. **Source ↔ rendered HTML** — for each of the 6 case-study pages, the Figma URL in the server-rendered HTML
   was hashed and compared to the hash of the data string: **6/6 identical**.
3. **DOM** — every button renders with `target="_blank"`, `rel="noopener noreferrer"`, and a box of
   **237×44** (178×44 for the shorter label), so CL-8's target minimum still holds.

### Gate

`scripts/check-links.cjs` (also `npm run check:links`) fails the build-check on:

- a project without `prototypeUrl` or `prototypeLabel`;
- a URL that is not a `https://www.figma.com/(proto|design)/…` URL or contains whitespace;
- a label saying "Prototype" while the URL is a `/design/` file;
- two projects sharing one URL;
- a `resumeFilename` / `portfolioFilename` in `data/profile.ts` whose file is missing from `public/`.

## 2. Portfolio PDF

- Copied `TENTANG SAYA/Portofolio - NAVYRO BAGASKARA.pdf` → **`public/Navyro_Bagaskara_Portofolio.pdf`**
  (12 445 220 bytes, 12 pages, mostly images — only 42 characters of text layer).
- `profileData.portfolioFilename` added next to `resumeFilename`, so the path is not hard-coded in two pages.
- Offered in two places: the `/resume` header (second button) and `/about` (third CTA in the intro block).
- Labelled **"Portofolio PDF (12 MB)"** — the size is in the label because a 12 MB download on a phone is a
  decision the visitor should make before clicking.
- Opens in a new tab (`target="_blank"`) rather than `download`, so the browser's own PDF viewer can show it
  without a surprise 12 MB file in the Downloads folder.
- Served as `200 application/pdf`.

Button boxes: 225×46 on `/resume`, 214×48 for the resume button, 225×46 on `/about`; both stack cleanly at
390px (y=292 and y=350, no overlap).

## 3. Suite

| Stage | Checks | Failures |
| --- | --- | --- |
| After CL-8 | 165 | 2 |
| After links + PDF | **165** | **2** (same CL-7 pair on `/`) |

`npm run check:links` → `all checks passed (6 projects)`. `npx tsc --noEmit` clean, `npx next build` exit 0.

## 4. What is not on the site yet

- The prototype buttons exist only on the case-study page. Project cards link to the case study, not straight
  to Figma — deliberate: a card is one target per intent (CL-8 decision), and the case study is where the
  context for opening a prototype lives.
- `assets` under `TENTANG SAYA/` that are not referenced by any page: the Indonesian CV
  (`CV_Navyro_Bagaskara_ID.pdf`) is present in the folder but only the English one is published. Adding a
  language choice to `/resume` is a copy decision for the owner, not a technical one.
