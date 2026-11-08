# CL-7 / B — Restructure: one skill panel with three columns instead of three cards

## Change
Three separately-bordered cards of unequal content is the actual mistake: the content is one list of
capabilities, split by category. Replace the three cards with **one panel** that has three internal
columns separated by rules — the row is then inherently equal because it is one box.

- New `components/SkillPanel.tsx`: `rounded-card border` wrapper, `grid md:grid-cols-3 md:divide-x`,
  each column = small uppercase caption + tag cloud.
- `SkillGroup` is kept only as the column body (or inlined).
- `/` (EXPERTISE) and `/about` (03) both switch to `SkillPanel`.

## Before / after
- Before: 3 boxes, 3 heights, 3 borders competing with the section border.
- After: 1 box, 3 columns, 1 outline; equal height by construction at any content length.

```
BEFORE                          AFTER
┌─────┐┌─────┐┌─────┐          ┌────────────────────────────────┐
│UI/UX││ F-E ││Tools│          │ UI/UX     │ Front-End │ Tools  │
│ ▫▫▫ ││ ▫▫▫ ││ ▫▫  │          │ ▫ ▫ ▫     │ ▫ ▫ ▫     │ ▫ ▫    │
│ ▫▫▫ ││ ▫▫▫ ││     │          │ ▫ ▫       │ ▫ ▫ ▫     │ ▫      │
└─────┘└─────┘└─────┘          └────────────────────────────────┘
        ▲ragged▲                  one border, always level
```

## Components / tokens / files
- New `SkillPanel`, `components/SkillGroup.tsx` (reduced), `app/page.tsx`, `app/about/page.tsx`.
- Tokens: `--border`, `rounded-card`, `--surface`.

## Effort
~60 lines net; changes how the section reads, not just its height.

## Risks
- Loses the "card" affordance entirely — the section becomes flatter and the page loses one texture layer.
- `divide-x` needs care at the 768 breakpoint where columns become rows.

## Acceptance criteria
Cards/columns share height ±1px at 1440; no ragged bottom; at 768 the three groups stack with the same
internal spacing as today.
