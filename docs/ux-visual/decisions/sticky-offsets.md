# CL-2: Sticky stack offsets are hardcoded and mutually inconsistent

## Problem
Three independent magic numbers describe one header, and none of them matches it:

| element | value | real requirement |
|---|---|---|
| navbar height | implicit (padding) | 69px ≤1023, 77px ≥1024 (measured) |
| `ReadingProgressBar` | `top-[61px]` | 77px → **16px hidden under the navbar** (z 30 vs 40) |
| `MobileMenu` | `top-[61px]` | 69px → **8px seam** of live page above the panel |
| sticky section heading | `top: 96px` | 114px → first 2px of glyphs under the progress bar |

Findings: C-1 (P1), C-2, plus the mobile-menu seam. Evidence: `pages/case-study/findings.md`,
`pages/case-study/audit.json`, measured `{barTop 61, headerBottom 77, coveredPx 16, headerZ 40, barZ 30}`
and `{headerBottom 69, menuTop 61}`.

Acceptance criteria: at 390/768/1440 the progress bar's top edge equals the navbar's bottom edge ±1px and
nothing is clipped; the mobile panel starts flush; sticky section headings begin below the bar; no literal
header offset remains in any component.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | One `--header-h` token + `--sticky-gap`, consumed by all four elements | **35 / 35** · **35 / 35** · **30 / 30** |
| B Restructure | Delete the second sticky bar; fold progress into the navbar hairline | 29 / 35 · 29 / 35 · 24 / 30 |
| C Convention | Measure the header with `ResizeObserver`, publish `--header-h` at runtime | 33 / 35 · 33 / 35 · 26 / 30 |

## Decision
**A.** Add the token pair to `:root`, pin the header to it so token and reality cannot diverge, and point
every sticky consumer at it. Graft one idea from C: the token is written by a two-line media query *and*
the header declares `h-[var(--header-h)]`, which is C's guarantee (they cannot drift) without C's runtime
observer.

Rejected B: it is a defensible design improvement but it changes what the case-study header says and
touches the shared navbar on every route — too much blast radius for a P1 positioning bug.

## Why this is the best
- **Against B**: fixes the bug without redesigning navigation; zero routes re-designed, no cramping risk
  at 768px where four links already compete for one row.
- **Against C**: same guarantee, no client component, no `ResizeObserver` listener, no hydration flash.
  A static token is honest for a header whose height only changes at one breakpoint.
- **Norms satisfied**: L5 (stable layout — no element sits under another), L4 (one grid), H5 (the same
  sticky stack behaves identically on every page), H6 (headings align to a real offset).
- **Costs and what it rules out**: if a future nav item wraps and the header grows, the token must be
  updated. Mitigated by pinning the header's own height, which turns that mistake into a visible
  overflow instead of a silent overlay.

## Implementation plan
1. `app/globals.css`: `:root { --header-h: 69px; --sticky-gap: 24px }` and
   `@media (min-width:1024px){ :root{ --header-h: 77px } }`.
2. `tailwind.config.ts`: `spacing.header: "var(--header-h)"`, `spacing.sticky: "var(--sticky-gap)"`.
3. `components/Navbar.tsx`: `header` gets `h-[var(--header-h)]` (padding becomes `py-0` + `items-center`),
   so the rendered height is the token.
4. `components/ReadingProgressBar.tsx`: `top-[61px]` → `top-[var(--header-h)]`.
5. `components/MobileMenu.tsx`: `top-[61px]` → `top-[var(--header-h)]`.
6. `components/CaseStudySection.tsx`: heading `top-24` → `top-[calc(var(--header-h)+var(--sticky-gap)+13px)]`
   (bar height 37 = 2.5rem + 13px; expressed as `calc(var(--header-h) + 61px)` if preferred — pick one and
   document it).

## Test plan
- Failing-first: assert `barRect.top === headerRect.bottom ±1` on `/work/nexabank-mobile-app` at 390, 768,
  1440 — fails today at all three.
- Assert `document.elementFromPoint(barRect.left + 40, barRect.top + 8)` is inside the bar, not the header
  (measured `sticky top-0 z-40 …` today).
- Assert mobile panel `top === header.bottom ±1` at 320/360/390.
- Assert sticky section heading `top >= bar.bottom` after scrolling to section 03.
- Regression: navbar still one line at 320/360/390/768/1024/1440 (no wrapped links).
