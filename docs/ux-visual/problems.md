# Problems — clustered and ranked

Sources: `pages/{home,work,case-study,about,contact,resume,notfound}/findings.md`.

## Coverage

| Surface | 1440x900 | 768x1024 | 390x844 | dark | extra states |
|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | mobile menu, 320/360/375/414 widths, scrolled reveals |
| `/work` | ✅ | ✅ | ✅ | — | all 5 filters, hover card, keyboard tab order |
| `/work/[slug]` ×4 | ✅ | ✅ | ✅ | — | sticky bar, sticky headings, section lists |
| `/about` | ✅ | ✅ | ✅ | — | — |
| `/contact` | ✅ | ✅ | ✅ | ✅ | idle, empty error, submitting, success, reset |
| `/resume` | ✅ | ✅ | ✅ | — | download target fetched |
| `404` | ✅ | — | — | — | — |

**Not audited / gaps:** no empty-data state exists anywhere (all collections are hardcoded and
non-empty), so no empty states were reachable. Filtered-empty state is unreachable by design.
Hover/focus states were checked by CSS rules and DOM, not by per-state screenshots for every control.
`prefers-reduced-motion` was verified behaviourally on the hero only.

## Clusters

Ranked by severity × reach (surfaces) × centrality ÷ effort.

### CL-1 · Contact form reports success without sending  [P0]
- **Root cause:** `ContactForm.handleSubmit` has no transport; it validates, waits 1200ms, then renders
  a success panel. There is no route handler, no mail provider, no `mailto:` fallback.
- **Findings:** CT-1.
- **Surfaces:** `/contact` (the only conversion surface on the site).
- **Evidence:** measured `network requests = []` with `success = true`; fields cleared.
- **Acceptance criteria:** a submit either (a) leaves the site to a real destination that carries all
  four field values, or (b) reaches a server route that returns a delivery result; the success panel
  may only appear after a delivery confirmation. No state may claim delivery when nothing was sent.

### CL-2 · Sticky stack offsets are hardcoded and mutually inconsistent  [P1]
- **Root cause:** three independent magic numbers — navbar height (69 mobile / 77 desktop, never a
  token), `ReadingProgressBar` `top-[61px]`, `MobileMenu` `top-[61px]`, sticky section heading
  `top:96px`. z-index 40 > 30 puts the bar *under* the navbar.
- **Findings:** C-1, C-2, G-3.
- **Surfaces:** `/work/[slug]` ×4, mobile menu on every route.
- **Evidence:** `barTop 61` vs `headerBottom 77` → `coveredPx 16`; heading overlap 2px; mobile menu gap 8px.
- **Acceptance criteria:** at 390/768/1440 the progress bar's top edge equals the navbar's bottom edge
  (±1px), nothing is clipped, and sticky section headings start below the bar. No hardcoded px offset
  for the header remains in components.

### CL-3 · Hero identity is an unstable looping animation  [P1]
- **Root cause:** `Hero` runs a typewriter that deletes the name to 1 character on a 2.9s loop and
  re-types it; `min-h-[1.2em]` only reserves one line.
- **Findings:** H-1.
- **Surfaces:** `/` at every viewport.
- **Evidence:** H1 height `43 ↔ 83px` at 320/360/375 (hero grows 39–40px per cycle); name length
  cycles `20 → 1 → 20` at 1440.
- **Acceptance criteria:** the full name is rendered, stable and non-empty within 100ms of load at
  320–1440; the hero's height does not change during the first 5s; if any motion remains it must not
  remove content.

### CL-4 · Muted text token fails contrast  [P2]
- **Root cause:** `--text-muted` is `#888888` (light) / `#71717A` (dark), used for informative labels:
  project meta rows, section numbers, state labels, card captions, resume section headers.
- **Findings:** H-2, A-2, CT-4, R-3, W-5 (part).
- **Surfaces:** all 7 routes.
- **Evidence:** 3.99:1 / 3.54:1 / 3.70:1 measured, 18–21 nodes per page.
- **Acceptance criteria:** every text node that carries information meets ≥4.5:1 against its actual
  background in both themes; `layout-audit.lowContrast` returns only decorative nodes.

### CL-5 · Cover artwork is cropped by a mismatched aspect ratio  [P2]
- **Root cause:** four 1024×1024 square covers rendered into 16:9 boxes (`aspect-[16/9]`) with
  `object-fit: cover`, via raw `<img>` (no `next/image`, no `srcset`, no width/height hint).
- **Findings:** H-6, W-4, C-4.
- **Surfaces:** `/` (3 cards), `/work` (4 cards), `/work/[slug]` (4 covers + 4 galleries + 4 next-cards).
- **Evidence:** `naturalWidth/Height 1024×1024` → rendered `1182×664` = 43.8% vertical loss; the
  NexaBank cover's own title is cut.
- **Acceptance criteria:** no cover is cropped by more than 10% of its design intent; covers that are
  square are displayed in a square (or 4:5) frame; images declare intrinsic dimensions.

### CL-6 · No type scale: 22 size/weight combos and 11px body text  [P2]
- **Root cause:** sizes are applied ad hoc (`text-[11px]`, six heading sizes 24/30/36/48/60/72) with no
  scale tokens; chips fall to 11px.
- **Findings:** H-5, G-2 (11px ×13), C-6 (82ch), A-4/H-8 (spacing drift overlaps).
- **Surfaces:** `/`, `/about`, `/work`, `/resume`.
- **Evidence:** `type.n = 22` at 1440, `20` at 390.
- **Acceptance criteria:** ≤5 distinct text sizes per page, no text below 12px, one heading ramp used
  by every `SectionHeading`, body measure 60–80ch.

### CL-7 · Equal-width cards in a row end at three different heights  [P2]
- **Root cause:** skill cards are content-sized inside `items-stretch`-less grid rows / self-aligned, so
  each card keeps its own height.
- **Findings:** H-4, A-1.
- **Surfaces:** `/` EXPERTISE, `/about` 03.
- **Evidence:** `338 / 300 / 186px`, tops aligned, bottoms ragged.
- **Acceptance criteria:** sibling cards in one row share an equal height (±1px) at 1440 and 768; the
  shortest card's content is not stretched with filler.

### CL-8 · Interactive text is smaller than the minimum target  [P2]
- **Root cause:** inline text links used as primary row actions with no padding (`RESUME` 72×16,
  `View Case Study` 137×20, footer links 138×17).
- **Findings:** H-7, W-5 (part).
- **Surfaces:** all routes (15 on `/`, 12 on `/work`, 11 on case studies).
- **Evidence:** `smallTargets` counts per page.
- **Acceptance criteria:** every pointer target ≥24×24px hit area at ≥768px and ≥44×44px at ≤767px,
  measured on the anchor's own box.

### CL-9 · Case-study numbering skips a number  [P2]  [fixed]
- **Root cause:** section titles are hardcoded `"07. Usability Testing & Iteration"` strings authored
  next to the data, while `CaseStudySection` hides sections whose content is missing.
- **Findings:** C-3.
- **Surfaces:** `/work/luminary-ecommerce`, `/work/healthpulse-dashboard`.
- **Evidence:** heading lists `…06, 08, 09`.
- **Acceptance criteria:** visible section numbers are contiguous from 01 on all 4 case studies.

### CL-10 · Work filter costs a decision and yields one item  [P2]  [fixed]
- **Root cause:** filter UI designed for a large catalogue, shipped against 4 projects, one per category;
  state is local and not reflected in the URL.
- **Findings:** W-1, W-2, W-3.
- **Surfaces:** `/work`.
- **Acceptance criteria:** if the filter remains, it must (a) state the result count, (b) appear in the
  URL so the view is shareable, and (c) only be shown when `projects.length` justifies it.

### CL-11 · Placeholder identity data published  [P1]  [fixed]
- **Root cause:** `data/profile.ts`, `data/projects.ts`, `public/Navyro_Bagaskara_CV.pdf` and the
  hardcoded email in `MobileMenu` were never replaced with the owner's real material.
- **Findings:** CT-2, CT-3, R-1, R-2, R-4, plus all placeholder project content.
- **Surfaces:** every route.
- **Evidence:** email `navyro.bagaskara@email.com` vs real `navbagaskara@gmail.com`; CV PDF is 932 bytes.
- **Acceptance criteria:** one source of truth for contact data; the resume download returns a readable
  CV; no invented employer or project appears.
- **Why deferred:** requires facts only the owner holds (city, degree years, roles, per-project role).

### CL-12 · 404 page scrolls on a one-glance screen  [P3]  [fixed]
- **Findings:** N-1, N-2.

### CL-13 · `ScrollReveal` never reveals blocks that were never intersected  [P3]  [fixed]
- **Findings:** H-10. Fix is a `@media print` / no-JS fallback and an initial `opacity:1` under
  `(scripting: none)`.

## Carried forward (max-fixes = 8)

CL-1, CL-2, CL-3, CL-4, CL-5, CL-6, CL-7, CL-8.
Deferred: CL-9, CL-10, CL-11, CL-12, CL-13.
