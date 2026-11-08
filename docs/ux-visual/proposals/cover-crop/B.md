# CL-5 / B — Restructure: two-up card layout with a square visual

## Change
Keep 16:9 for the hero image of a case study, but change the **card** to a two-column layout: a square
(1:1) visual on one side and the text block (index, tags, title, meta, description, link) on the other.
A square frame matches the square artwork exactly, so nothing is cropped, and the card gets shorter
instead of taller.

- `components/ProjectCard.tsx`: `article` becomes `grid md:grid-cols-12`; visual `md:col-span-6
  aspect-square`; text `md:col-span-6`.
- `/work` list keeps the same component, so the change lands once.
- `app/work/[slug]/page.tsx`: cover stays 16:9 but switches to `aspect-square`… no: the cover there
  renders the same cropped art, so it becomes `aspect-[1/1] max-w-3xl` centred.
- Add `components/ProjectCover.tsx` as the single place that decides frame + object-fit.

## Before / after
- Before: full-width 16:9 band that crops the square art by 43.8%; the card is ~1033px tall.
- After: half-width square that shows the art whole; the card is ~660px tall — shorter *and* accurate.

```
BEFORE                                AFTER
┌───────────────────────────────┐     ┌────────────┬───────────────┐
│ 01 —     [tags…]              │     │            │ 01 —     [tags]│
│ NexaBank — Mobile Banking…    │     │  ▄▄▄▄▄▄▄  │ NexaBank — …  │
│ Mobile • 2024 • Role: …       │     │  ████████  │ Mobile • 2024 │
│ ┌──────── 1182×664 ─────────┐ │     │  ████████  │ Description…  │
│ │▒▒▒▒▒ cropped 43.8% ▒▒▒▒▒▒▒│ │     │  TITLE ✓  │ View Study →  │
│ └───────────────────────────┘ │     └────────────┴───────────────┘
│ Description…      View →      │
└───────────────────────────────┘
```

## Components / tokens / files
- `ProjectCard`, new `ProjectCover`, `app/work/[slug]/page.tsx`, `app/page.tsx` (no change needed).
- Tokens: existing `rounded-card`, `--border`, `--surface`.

## Effort
~80 lines, one new component, one layout decision with a real visual consequence.

## Risks
- A two-up card reads as "more like a product grid", which weakens the editorial full-bleed rhythm the
  site currently has. This is the central taste trade-off of the cluster.
- Half-width visual halves the detail visible in a 1024² mockup.

## Acceptance criteria
0% crop on square artwork; artwork title visible; card height reduced; no horizontal overflow at 390.
