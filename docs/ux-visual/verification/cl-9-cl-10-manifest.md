# CL-9, CL-10 and the web app manifest — verification

## CL-9 — section numbers

| project | before | after |
| --- | --- | --- |
| sipenelitian-uaa | 01 02 03 04 05 06 07 08 09 | 01 02 03 04 05 06 07 08 09 |
| fanfunds | 01 02 03 04 05 06 07 08 09 | 01 02 03 04 05 06 07 08 09 |
| mediassist | 01 02 **04** 05 06 **08** 09 | 01 02 03 04 05 06 07 |
| jogging-id | 01 02 **05** 06 **08** | 01 02 03 04 05 |

Four of six pages had gaps; they are now contiguous from `01` on all six, and the sequence is
computed from rendered position, so a future project with missing copy cannot reopen the gap.

`casestudy.section-numbers` checks two things per section: the `data-section-number` equals its
index, and the rendered `h3` starts with that same number — so a derived number and a typed
headline cannot quietly disagree. The runner visits **`/work/mediassist`** as well as
`/work/fanfunds`; fanfunds has all nine sections, so a suite that only visited it would have
passed while four pages were broken.

Negative test: forcing `index + 2` → `FAIL casestudy.section-numbers … numbers 02 03 04 … ·
expected 01 02 03 …` on both case-study routes (6 failures). Reverted → 6/6 pass.

## CL-10 — `/work`

| | before | after |
| --- | --- | --- |
| controls | 3 filter buttons (`All`, `Web`, `Mobile`) | none |
| result count shown | never | `6 proyek · 1 web · 5 mobile`, derived |
| filtered view in URL | no (`useState`) | not applicable — nothing hidden |
| cards in server HTML | no (client component) | yes (`○ /work`, static) |
| bundle for the page shell | client | server component |

Verified in the browser: `count = "6 proyek · 1 web · 5 mobile"`, `declared = 6`, 6 distinct
`/work/...` links, 0 `[aria-pressed]` controls. Assertions `work.count-matches-cards` and
`work.no-dead-end-filter` (6 checks over 3 viewports).

## Manifest + maskable icon

`app/manifest.ts` → `/manifest.webmanifest`:

| field | value | why |
| --- | --- | --- |
| `name` / `short_name` | site title / `Navyro` | launcher label |
| `start_url` / `display` | `/` / `standalone` | opens on the home page, no browser chrome |
| `theme_color` | `#1F4FFF` | equals `--accent` in `app/globals.css` |
| `background_color` | `#F7F7F5` | equals `--background` |
| `lang` | `id` | the site is Indonesian |
| icons | 192, 512, maskable 512 | manifest baseline + Android adaptive |

### Icons

| file | size | weight |
| --- | --- | --- |
| `app/icon.png` | 512×512 | 5.6 KB |
| `app/apple-icon.png` | 180×180 | 3.2 KB |
| `public/icons/icon-192.png` | 192×192 | 3.5 KB |
| `public/icons/icon-512.png` | 512×512 | 5.6 KB |
| `public/icons/icon-maskable-512.png` | 512×512 | 3.9 KB |

All five come from one `npm run build:icons` pass over `scripts/icon.html`. The maskable variant is
`?maskable=1`: the mark renders at 150px instead of 236px, and the build **refuses to write** if its
half-diagonal crosses the safe-zone radius (204px). Measured: standard 296×236 (half-diagonal
189px), maskable 188×150 (half-diagonal **120px**, 85px inside the crop). A vision check confirms the
mark sits ~100px inside the 80%-circle crop on every side.

### Verified

| check | result |
| --- | --- |
| `<link rel="manifest">` in served HTML | `/manifest.webmanifest` |
| `/manifest.webmanifest` | 200, JSON parses, 3 icons, theme `#1F4FFF`, lang `id` |
| icon URLs | all 200, IHDR dimensions match the declared `sizes` |
| `manifest` gate | negative test 1: `theme_color #123456` → `FAIL theme_color … != --accent #1F4FFF` |
| | negative test 2: drop the maskable entry → `FAIL no maskable 512x512 icon` |
| both reverted | `seo: all checks passed (10 checks)` |

The gate compares the manifest colours against `app/globals.css`, not against a copy of the values,
because a manifest that disagrees with the page is the one outcome worse than no manifest.

## Suite

| stage | checks | failures |
| --- | --- | --- |
| after CL-12 + icons | 285 | 0 |
| after CL-9 + CL-10 + manifest | **342** | **0** |

`next build` exit 0, with `/manifest.webmanifest`, `/icon.png`, `/apple-icon.png` as static routes
and `/work` now prerendered (`2.46 kB`). `npm run check`: 3 gates green (6 projects · 7 og · 10 seo).

## Deploy reminder

`NEXT_PUBLIC_SITE_URL=https://<domain>` must be set in production. Without it, `siteUrl` falls back
to the Vercel project URL and then to `http://localhost:3000`, which would publish localhost in the
sitemap, the JSON-LD `url` and the OG image URL.
