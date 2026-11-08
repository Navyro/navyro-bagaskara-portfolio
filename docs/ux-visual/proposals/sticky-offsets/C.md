# CL-2 / C — Convention: measure the header at runtime, publish it as a CSS variable

## Change
The category-standard fix for "sticky elements must sit under a variable-height header" is to measure
once and publish the result, instead of assuming any number: a `ResizeObserver` on the header writes
`document.documentElement.style.setProperty('--header-h', px)`. Every sticky consumer reads the token.

This is the pattern used by documentation sites and app shells that support a configurable or
multi-line header. It survives font loading, a wrapped nav item, and any future breakpoint the owner
adds — which a hand-written media query cannot.

- New `components/HeaderHeightProvider.tsx` (client): `ResizeObserver` on `header`, writes `--header-h`.
- `components/Navbar.tsx`: `ref` on the header element.
- `ReadingProgressBar`, `MobileMenu`, `CaseStudySection`: read `var(--header-h)` (+ a `--sticky-gap`).
- `app/globals.css`: `:root { --header-h: 69px; --sticky-gap: 24px }` as SSR fallback.

## Before / after
- Before: 61 / 96 / 77 written independently.
- After: one measured value, always equal to the real header, plus an SSR fallback that matches it.

```
header ──ResizeObserver──► --header-h = 77px
                                │
        ┌───────────────┬───────┴────────┬──────────────────┐
        ▼               ▼                ▼                  ▼
 progress bar      mobile panel     section heading    any future
 top:var(…)        top:var(…)       top:calc(…+24px)   consumer
```

## Components / tokens / files
- `components/HeaderHeightProvider.tsx` (new, ~25 lines) · `Navbar` · `ReadingProgressBar` ·
  `MobileMenu` · `CaseStudySection` · `app/layout.tsx` · `app/globals.css`.

## Effort
~45 lines across 7 files; one new client-side provider.

## Risks
- Runtime measurement flashes the fallback value for one frame if the token differs from the real height.
- A `ResizeObserver` on every route adds a listener; trivial cost but new moving parts.
- Over-engineering for a header that has one height per breakpoint today.

## Acceptance criteria
Bar top == navbar bottom ±1px at 390/768/1440 after any font load; mobile panel gap 0; sticky headings
below the bar. Holds even if a nav item wraps.
