# CL-3 / A — Minimal: type once, then stop

## Change
Keep the typewriter but make it a **one-shot entrance**: type the full name once (≈1.2s), then keep it
permanently. Remove the delete branch, the `isDeleting` state and the 2500ms pause. Also reserve the
final line count instead of `min-h-[1.2em]` so nothing can shift even during the single pass.

- `components/Hero.tsx`: drop `isDeleting`, the delete branch and the re-type pause; `min-h` becomes
  `min-h-[2.2em] sm:min-h-[1.2em]` (two lines are possible below 380px).

## Before / after
- Before: `20 → 1 → 20` characters in a 2.9s loop, forever; hero height `43 ↔ 83px` at 375px.
- After: `0 → 20` once in ~1.2s, then static. Hero height fixed by the reserved line count.

```
t=0    "▌"
t=0.6  "Navyro Bag▌"
t=1.2  "Navyro Bagaskara"      ← stays
t=5    "Navyro Bagaskara"
```

## Components / tokens / files
- `components/Hero.tsx` only. No tokens, no new files.

## Effort
~15 lines removed. Lowest risk of all three.

## Risks
- Still hides the name for the first ~1.2s behind an animation; a crawler or a fast screenshot sees
  two characters. The `sr-only` full name keeps this harmless for assistive tech and SEO.
- A one-shot typewriter is a weaker signature than a loop — deliberate trade for stability.

## Acceptance criteria
Full name present and stable within ~1.5s of load at 320–1440; hero height constant for 5s after
load; no content removed by any animation.
