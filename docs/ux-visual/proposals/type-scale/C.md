# CL-6 / C — Convention: fluid `clamp()` scale, one ratio

## Change
The convention for a type-led editorial portfolio is a **fluid modular scale**: one ratio, sizes derived
with `clamp(min, preferred-vw, max)`, so headings interpolate instead of jumping at breakpoints and the
page never needs a `sm:/md:/lg:` override per element.

- `app/globals.css`: define `--fs-1 … --fs-6` with `clamp()`, ratio 1.25 below `--fs-3` and 1.333 above.
- `tailwind.config.ts`: map `fontSize.heading-1 … heading-6` to those vars.
- Components use `heading-N`; all `sm:text-* md:text-* lg:text-*` size overrides are deleted.
- Chips: `--fs-0` = `0.75rem` floor (12px), never below.

## Before / after
- Before: sizes chosen per element per breakpoint (22 combos).
- After: one ramp, continuous, breakpoint-free; 5 sizes visible on any page.

```css
--fs-6: clamp(2.75rem, 1.9rem + 4.2vw, 4.5rem);  /* 44 → 72  hero   */
--fs-5: clamp(2rem,    1.5rem + 2.5vw, 3rem);    /* 32 → 48  h1     */
--fs-4: clamp(1.625rem,1.4rem + 1.1vw, 2.25rem); /* 26 → 36  h2     */
--fs-3: 1.25rem;                                 /* 20       h3     */
--fs-2: 1rem;                                    /* 16       body   */
--fs-1: 0.75rem;                                 /* 12       meta   */
```

## Components / tokens / files
- `app/globals.css`, `tailwind.config.ts`, then the same component/page swaps as B, minus every
  responsive size variant.

## Effort
As B, and the deletions make components shorter.

## Risks
- `clamp()` mid-range sizes can land between the current designed steps and shift the visual balance at
  768px, where the design is currently deliberate.
- Harder to predict in a screenshot diff; needs check at 3+ widths.

## Acceptance criteria
≤5 sizes per page; nothing below 12px; no `sm:text-*/md:text-*/lg:text-*` size classes left on text;
headings scale monotonically from 320 to 1440.
