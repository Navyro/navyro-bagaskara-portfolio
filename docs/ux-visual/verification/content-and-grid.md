# Verification — real content + project grid (post-CL-11)

Scope: replace the placeholder portfolio with the verified material in `TENTANG SAYA/`, then re-check
every surface it touches (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`, `/resume`).

## What changed

### Data (verified only)

`data/profile.ts`

| Field | Before (placeholder) | After (source: CV + portfolio PDF) |
| --- | --- | --- |
| email | `navyro.bagaskara@email.com` | `navbagaskara@gmail.com` |
| phone | — | `+62 857-1272-9833` |
| location | Jakarta | Bekasi, Jawa Barat |
| linkedin | — | `linkedin.com/in/navyro-bagaskara/` |
| github | `github.com/navyro` (invented) | removed — no such link exists in the source |
| experience | 3 fictional studios | Kominfo Bantul internship, HIMSI UAA, KKN-T Mangiran, MSIB BISA AI, Figma-plugin webinar speaker |
| education | Binus 2019–2023 | S1 Sistem Informasi, Universitas Alma Ata, 2022–2026 |
| skills/tools | invented stack | Figma, Canva, CapCut, Lightroom, Excel from the CV |

`data/projects.ts` — 6 real projects (SIPENELITIAN, FanFunds, Penagihan Limbah RT, Mediassist,
Kick Swift, Jogging ID) with `coverImage`, `galleryImages`, `screenFrame`, and full case studies.
Fields that the source does not document (`duration`, `team`, `year` on some entries) are omitted
rather than guessed; the UI degrades to `—` / hides the row.

### Assets (`scripts/build-assets.cjs`)

- 46 real screens copied into `public/images/projects/<slug>/screens/`.
- One 1600×2000 `cover.jpg` per project, composed from those screens (3 phones in a row for mobile
  projects, 1 large window + 2 small below for the desktop project).
- `public/Navyro_Bagaskara_CV.pdf` replaced: 932-byte placeholder → 146 KB real CV.

### Components

- `components/ProjectScreens.tsx` — new. Phones in a 2/3-column `aspect-[390/844]` grid, desktop
  screens full width `aspect-[1440/1024]`, `object-contain`, never cropped.
- `app/work/[slug]/page.tsx` — uses `ProjectScreens`; empty IA/user-flow sections are not rendered.
- `components/ProjectMeta.tsx`, `components/ProjectCard.tsx` — optional `year`/`duration`/`team`.
- `app/work/page.tsx` — filter categories derived from the data, `aria-pressed` on each chip, dead
  "Front-End" filter (0 projects) removed, chips are 44 px tall.
- `app/contact/page.tsx` — WhatsApp + `tel:` links from the real number, LinkedIn rendered only when
  present, invented GitHub link removed.

## Layout defects found during this pass and fixed

1. **`/work` was 12 192 px tall at 1440.** A 4:5 cover in a full-width single column rendered at
   1182×1478, so six cards needed ~12 screens of scrolling. Fixed with a `md:grid-cols-2` grid
   (home: `md:grid-cols-2 lg:grid-cols-3`, because it shows three featured projects) plus a smaller
   card title (`text-2xl md:text-3xl`). Page is now **4 523 px**, cover 570×713.
2. **Cover tops were staggered** by 17–24 px inside a row because tag chips wrap differently per
   card. The tags + title block is now one flex column with `lg:min-h-[17rem]`; all covers in a row
   start at the same y (`1311` on home, `767 / 1973 / 3180` on `/work`).
3. **Card heights were uneven** (`1847/1895`, `1821`). `ScrollReveal className="h-full"` +
   `article.h-full` + `mt-auto` footer slot → every row is now exactly equal (`1147, 1147` …,
   `996` on home).
4. **"View Case Study" wrapped to three 65 px lines** once the card was halved in width.
   `shrink-0 whitespace-nowrap` → one line, 137×20.
5. **Case-study hero** framed a 4:5 cover in a 16:9 box, leaving wide empty side gutters
   (artwork occupied 523 of 1164 px). Now a centred `ratio="4/5"` frame capped at 560 px, which
   matches the artwork, with `sizes` matching the real width.

## Measurements (1440×900)

| Surface | Before | After |
| --- | --- | --- |
| `/work` document height | 12 192 px | 4 523 px |
| `/work` cover | 1182 × 1478 | 570 × 713 |
| `/work` card heights | 1821–1895 | 1147/1121, equal per row |
| `/` document height | 10 807 px | 6 182 px |
| `/` Selected Work | 1 column, cover 1182 wide, tops staggered by 1874 px | 3 columns, cover ~362 × 451, tops all `1311` |
| case-study hero | 1182 × 664 (16:9, gutters) | 558 × 698 (4:5, no gutters) |

All numbers above are measured at a **1440×900** viewport (`agent-browser set viewport 1440 900`).
Mobile 390: no horizontal overflow, cover 341×426, tags wrap to a second row without collision.

## Suite

`bash scripts/run-ux-checks.sh` (route for the case study updated to `/work/fanfunds`):

```
checks: 111   failures: 26
```

The 26 remaining failures are exactly the planned open clusters and are unchanged by this pass:
`targets.min-24px` (12), `targets.min-44px` (6), `type.no-text-below-12px` (6),
`cards.equal-height-in-row` (2).

## Known limitation of the full-page screenshots

`agent-browser screenshot --full` resizes the viewport and captures before `next/image` lazy loading
and `ScrollReveal` settle, so unrevealed blocks come out empty. The same blocks measure
`opacity: 1` and `naturalWidth > 0` after a real scroll, and the scrolled viewport screenshot shows
the screens. Judge reveal state from the DOM probe, not from `--full` captures.
