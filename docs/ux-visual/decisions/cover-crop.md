# CL-5: Cover artwork is cropped by a mismatched aspect ratio

## Problem
All four project covers are **1024×1024 square** and are rendered into **1182×664** boxes (`aspect-[16/9]`)
with `object-fit: cover`. The visible result is 43.8% of the artwork's height removed by centre-cropping.
The NexaBank cover carries its own title ("NEXABANK | Mobile App Experience") near the bottom edge and a
tall phone mockup in the middle; both are clipped. The same wrong frame is repeated in 12 places: 3 home
cards, 4 work cards, 4 case-study covers, 4 next-project thumbnails, plus galleries.

Also measured: raw `<img>` with no `width`/`height`, no `srcset`, `images.unoptimized: true` — a 1024px
asset is upscaled 15% to fill 1182px.

Findings: H-6, W-4, C-4. Evidence: `naturalWidth/Height 1024×1024` vs rendered `1182×664` on every page;
`pages/home/findings.md`.

Acceptance criteria: no cover cropped by more than 10% of its design intent; the artwork's own title is
visible; images declare intrinsic dimensions.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | Frame follows the art: `aspect-[4/5]` + `object-contain` in one shared component | **31 / 35** · 29 / 35 · **27 / 30** |
| B Restructure | Two-up card: square visual beside the text block | 29 / 35 · 29 / 35 · 24 / 30 |
| C Convention | Art-direct two crops per project with `<picture>` / `next/image sizes` | 31 / 35 · **33 / 35** · 24 / 30 |

## Decision
**A**, with one graft from C: route every cover through a single new `components/ProjectCover.tsx` that
renders `next/image` with `fill` + explicit `sizes`, so the missing intrinsic-size/`srcset` defect is fixed
in the same place the frame is decided. Frame: `aspect-[4/5]`, `object-contain`, `p-4`,
`bg-surface`.

Rejected B: it fixes the crop but converts an editorial full-bleed list into a product grid, which is the
one thing this site's identity is built on. Rejected C: it is the best visual answer but requires four wide
re-composites of the mockups that do not exist and cannot be produced faithfully from here; shipping a
placeholder wide crop would be worse than an honest 4:5 frame.

## Why this is the best
- **Against B**: keeps the full-bleed editorial rhythm (L4/L7) and the site's single strongest visual
  idea, while still removing the crop.
- **Against C**: completes now, with no new artwork and no image-pipeline change; leaves C as the
  documented upgrade if the owner can export wide covers from Figma.
- **Norms satisfied**: H2 (weight matches importance — the artwork's own composition is respected), D1
  (covers are readable at their intended scale), L5 (`next/image` with `fill` and a ratio box reserves
  space, so no shift), A2 (`alt` set to the project title on every cover).
- **Costs and what it rules out**: a 4:5 cover is ~30% taller than 16:9, so the work list gets longer and
  the 20% side bands inside the frame must read as a deliberate mat, not as a bug — hence `bg-surface`
  plus `p-4` so the art sits on a mat rather than floating.
- Residual risk measured after the change: `/work` page height grows from 4336px; acceptable for a
  4-project list.

## Implementation plan
1. New `components/ProjectCover.tsx`:
   `props { src, alt, ratio?: "4/5" | "16/9", priority?: boolean }`; renders
   `<div class="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-border bg-surface p-4">
   <Image src fill sizes="(min-width:1024px) 1182px, 100vw" class="object-contain" /></div>`.
2. `components/ProjectCard.tsx`: replace the inner `aspect-[16/9] object-cover` `<img>` with
   `<ProjectCover ratio="4/5" />`; remove the unused `priorityImage` prop (dead code, flagged in inventory).
3. `app/work/[slug]/page.tsx`: cover and gallery frames → `ProjectCover ratio="4/5"`; next-project thumb →
   `ratio="16/9"` (it is a small thumbnail where the crop is tolerable) with `object-contain`.

## Test plan
- Failing-first: for every cover, assert `naturalWidth / naturalHeight` within 8% of
  `renderedWidth / renderedHeight` → fails today (1.0 vs 1.78).
- Assert every cover `<img>` has non-empty `alt` and a `sizes` attribute.
- Assert no cover's container is `aspect-[16/9]` while its source is square.
- Visual: `look_at_image` on `/work` at 1440 and 390 — confirm the artwork title is legible and the mat
  reads as intentional.
- Regression: no horizontal overflow at 320/390; card grid unchanged on `/`.
