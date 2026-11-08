# CL-7 / C — Convention: equal-height cards with the free space pushed to a footer slot

## Change
The category convention for a row of cards with uneven content is **equal height + a bottom-aligned
footer slot**, so the cards end level *and* the empty space is not dead: it sits between the content and
the footer, absorbing the difference.

- `SkillGroup`: `flex h-full flex-col`; tags in a `flex-1` region; add a footer slot that shows a count
  ("7 keahlian") bottom-aligned with `mt-auto`.
- Grids in `app/page.tsx` / `app/about/page.tsx`: wrappers `h-full`.

## Before / after
- Before: 338 / 300 / 186, ragged bottoms, no footer.
- After: all 338, all footers on one baseline; the shortest card shows 186→338 of whitespace *above* its
  footer rather than after the card ends.

```
┌──────────────┐┌──────────────┐┌──────────────┐
│ UI/UX Design ││ Front-End    ││ Tools        │
│ ▫▫ ▫▫ ▫▫ ▫   ││ ▫▫ ▫▫        ││ ▫▫           │
│ ▫▫           ││              ││              │
│· · · · · · · ││· · · · · · · ││· · · · · · · │  ← free space
│ 7 keahlian   ││ 8 keahlian   ││ 6 tools      │  ← mt-auto footer
└──────────────┘└──────────────┘└──────────────┘
```

## Components / tokens / files
- `components/SkillGroup.tsx`, `app/page.tsx`, `app/about/page.tsx`. No new tokens.

## Effort
~15 lines.

## Risks
- Adds a small piece of copy (a count) that must actually be useful; a count nobody needs is D5 noise.
- Does not change that the third card's content is 45% of the first — it only tidies the result.

## Acceptance criteria
Equal heights ±1px at 1440/768; every card's footer on one shared baseline; no filler text added purely
to fill height.
