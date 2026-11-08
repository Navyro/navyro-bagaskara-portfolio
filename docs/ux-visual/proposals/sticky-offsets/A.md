# CL-2 / A — Minimal: one header-height token, used everywhere

## Change
Publish the navbar height as a CSS custom property from a single source and let every sticky element
use it.

- `app/globals.css`: add `--header-h: 69px` in `:root`, and `@media (min-width:1024px){ :root{ --header-h: 77px } }`.
- `components/Navbar.tsx`: keep its real padding (it produces 69/77) **and** assert the same value by
  giving the header `h-[var(--header-h)]` so the token and the rendered height cannot drift.
- `components/ReadingProgressBar.tsx`: `top-[61px]` → `top-[var(--header-h)]`, keep `z-30`.
- `components/MobileMenu.tsx`: `top-[61px]` → `top-[var(--header-h)]`.
- `components/CaseStudySection.tsx`: heading `top-24` → `calc(var(--header-h) + 2.5rem)` via a
  `--sticky-offset` token = `var(--header-h) + 37px`.

## Before / after
- Before: navbar 69/77px (implicit), bar pinned at 61 (16px under it), menu at 61 (8px gap),
  headings at 96 (2px under the bar). Four numbers, none of them the real one.
- After: one token; bar flush under the navbar, menu flush, headings start below the bar.

```
BEFORE (1440)                    AFTER
┌────────────────┐ y=0          ┌────────────────┐ y=0
│ NAVBAR  h=77   │              │ NAVBAR  h=77   │
├────────────────┤ y=77         ├────────────────┤ y=77
│ ▒▒▒ hidden ▒▒▒ │ y=61..77     │ progress bar   │ y=77..114
│ progress bar   │ y=77..98     ├────────────────┤ y=114
├────────────────┤              │ section heading│ y=114..
│ heading top:96 │ ← clipped    │                │
```

## Components / tokens / files
- `app/globals.css` (2 tokens) · `tailwind.config.ts` (expose `header` height + `sticky` offset) ·
  `Navbar`, `ReadingProgressBar`, `MobileMenu`, `CaseStudySection`.

## Effort
~12 lines, 5 files, zero behaviour change.

## Risks
- If the header's content box changes (font loading, a nav item wrapping at a new breakpoint) the token
  can still drift. Mitigated by pinning the header's own height to the token.
- Assumes a single-line header at all widths — true between 320 and 1440 today.

## Acceptance criteria
Bar top == navbar bottom ±1px at 390/768/1440; mobile panel top == navbar bottom ±1px; sticky heading
top ≥ bar bottom; no literal `61px`/`96px` header offsets remain.
