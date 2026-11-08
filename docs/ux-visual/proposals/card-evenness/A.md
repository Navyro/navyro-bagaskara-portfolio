# CL-7 / A — Minimal: stretch the row so cards share a height

## Change
Make the grid row stretch and let the card fill it, so the three skill cards share the tallest height:

- `app/page.tsx` and `app/about/page.tsx`: the grid wrapping the `SkillGroup`s gets `items-stretch`
  (already the default) **and** each `ScrollReveal` wrapper becomes `h-full`, with `SkillGroup` as
  `flex h-full flex-col`.
- `SkillGroup`: `rounded-card … p-6 md:p-8` → `flex h-full flex-col rounded-card … p-6 md:p-8`.

That is it: the row height becomes `max(338,300,186) = 338` for all three.

## Before / after
- Before: tops at 2578, heights 338 / 300 / 186 — bottoms at 2916 / 2878 / 2764.
- After: tops 2578, all heights 338, bottoms 2916.

```
BEFORE                        AFTER
┌──────┐┌──────┐┌──────┐      ┌──────┐┌──────┐┌──────┐
│      ││      ││      │      │      ││      ││      │
│      ││      │└──────┘      │      ││      ││      │
└──────┘└──────┘              │      ││      ││      │
        ▲ragged▲              └──────┘└──────┘└──────┘
```

## Components / tokens / files
- `components/SkillGroup.tsx`, `app/page.tsx`, `app/about/page.tsx`. No tokens.

## Effort
3 small edits.

## Risks
- The `ScrollReveal` `motion.div` wrapper needs the height too, otherwise `h-full` on the child collapses
  (the wrapper is the grid item). Missing this is the most likely failure mode; it must be tested.
- The shortest card gains ~150px of empty space at the bottom. Equal but hollow.

## Acceptance criteria
Sibling cards in one row share height ±1px at 1440 and 768; content is top-aligned, not stretched.
