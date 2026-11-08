# CL-6 / A — Minimal: raise the floor and collapse the ad-hoc sizes

## Change
Two surgical edits, no new abstraction:

1. Chips and small meta: `text-[11px]` → `text-xs` (12px) — removes the 11px row entirely (13 instances
   on the home page, more on `/work`).
2. `SectionHeading` keeps one ramp for every section on every page, so the current 30/36/48 mix
   collapses: `text-3xl sm:text-4xl lg:text-5xl` only (30/36/48 → pick 30/36/48 as the *single* section
   ramp, applied by the component, not by callers).

## Before / after
- Before: 22 distinct size/weight combos per page, min 11px.
- After: 15 combos, min 12px, and one heading ramp everywhere.

```
11px ▏chips          →  12px ▏chips
12px ▏meta, labels       12px ▏meta, labels
14px ▏body small         14px ▏body small
16px ▏body               16px ▏body
18px ▏lead               18px ▏lead
20/24/30/36/48/60/72     20/30/36/48  (one ramp)
```

## Components / tokens / files
- `components/ProjectCard.tsx`, `components/ProjectMeta.tsx`, `components/SectionHeading.tsx`,
  `components/SkillGroup.tsx`. Tokens: none.

## Effort
~8 class changes. Lowest risk.

## Risks
- The home page currently relies on `lg:text-5xl` vs case-study `text-5xl` differences for hierarchy;
  collapsing them may make some section headings feel small.
- 12px chips get wider, which can add a tag row wrap on narrow cards.

## Acceptance criteria
No text below 12px on any route; ≤5 distinct sizes per page excluding display/hero type; every section
heading produced by `SectionHeading` uses one ramp.
