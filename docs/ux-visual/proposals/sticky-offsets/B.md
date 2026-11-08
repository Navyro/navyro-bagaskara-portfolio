# CL-2 / B — Restructure: one sticky header that owns the progress bar

## Change
Stop stacking two sticky bars. Move the reading progress **into the navbar** as a 2px line on its bottom
edge, and put the case-study title + percentage into the navbar's centre slot (desktop) as the page
crumb. One sticky region, one offset, nothing to reconcile. The separate `ReadingProgressBar` component
is deleted; `ScrollProgressBar`'s role is taken over by the same line, scoped per page.

- `components/Navbar.tsx`: accepts an optional `context` prop `{ label, percent }`; renders
  `<div class="absolute bottom-0 left-0 h-[2px]" style="width:{percent}%">`.
- `components/ReadingProgressBar.tsx`: deleted.
- `app/work/[slug]/page.tsx`: passes the slug's title + scroll progress into the Navbar.
- `components/CaseStudySection.tsx`: heading `top: var(--header-h)`.
- `app/globals.css`: `--header-h` token (as in A).

## Before / after
- Before: navbar (77) + progress bar (37) = 114px of sticky chrome, of which 16px is unreachable.
- After: 77px of sticky chrome; progress is the navbar's own hairline.

```
BEFORE                                AFTER
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ NAVYRO.        WORK ABOUT …  │      │ NAVYRO.  01 NexaBank  38%  ☾ │
├──────────────────────────────┤      ├──────────────────────────────┤
│ ▒ 16px hidden ▒ 38% COMPLETED│      │▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░│ ← 2px
├──────────────────────────────┤      │                              │
│ Reading Case Study: 01 — …   │      │  (content)                   │
└──────────────────────────────┘      └──────────────────────────────┘
```

## Components / tokens / files
- `Navbar`, `ReadingProgressBar` (delete), `app/work/[slug]/page.tsx`, `CaseStudySection`, `globals.css`.

## Effort
~70 lines across 5 files; a real design decision about where navigation context lives.

## Risks
- Cramps the navbar at 768px where the title + percentage + 4 links compete for one row.
- Removes a visible affordance the owner may want (a dedicated reading indicator).
- Touches the shared navbar, so every route must be re-checked.

## Acceptance criteria
No element of the sticky region is overlapped at 390/768/1440 (trivially true with one bar); the
reading percentage is visible at all widths; sticky section headings start below the navbar.
