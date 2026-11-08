# CL-5 / C — Convention: art-directed cover per aspect ratio (`next/image` + `sizes`)

## Change
The category convention for a portfolio with real project art is **art direction**, not a compromise
frame: ship two crops of the same project (`cover-square.png` and `cover-wide.png`) and let the frame pick
the right one with `<picture>` / `next/image fill sizes`. Each frame then shows a composition that was
designed for it, so nothing important is ever cropped.

- `components/ProjectCover.tsx`: renders `<picture>` with `<source media="(min-width:768px)"
  srcSet="…-wide.png">` and a square fallback; `object-cover` on a frame that matches each source.
- Covers gain a `-wide` variant per project (4 new image assets, produced from the existing squares by
  re-composing the title into the horizontal band rather than centre-cropping).
- Switch to `next/image` (`fill`, `sizes="(min-width:1024px) 1182px, 100vw"`) which also fixes the
  missing `srcset`/intrinsic-size issue.

## Before / after
- Before: one square asset, one wide frame, 43.8% cropped.
- After: two intentional compositions; the wide frame gets a wide design; mobile gets the square design.

```
         ≥768px                          <768px
┌──────── wide composition ────────┐   ┌── square ──┐
│ NEXABANK  ▄▄▄▄  ⌁cards ⌁actions  │   │   ▄▄▄▄▄▄   │
│           ██████  (title at left)│   │   ██████   │
└──────────────────────────────────┘   │  TITLE     │
                                        └────────────┘
```

## Components / tokens / files
- `ProjectCover` (new), `ProjectCard`, `app/work/[slug]/page.tsx`, `next.config.mjs` (already
  `images.unoptimized: true` — needs to be reconsidered), 4 new PNGs.
- Tokens: none new.

## Effort
Highest: 4 new art assets plus a component plus an image-pipeline decision.

## Risks
- Requires new artwork that does not exist yet; I cannot produce a faithful wide re-composite of these
  mockups from here, so this cannot be completed in this run without the owner's Figma.
- Turning image optimisation back on adds a build dependency (`sharp`) and can change delivery of the SVGs.

## Acceptance criteria
Each frame shows a composition designed for its aspect; 0% unintended crop at 390/768/1440; images
declare intrinsic size and provide `srcset`.
