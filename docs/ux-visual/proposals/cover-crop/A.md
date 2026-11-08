# CL-5 / A — Minimal: match the frame to the artwork (4:5 instead of 16:9)

## Change
The covers are square and their content is vertical (a tall phone with a title under it). Change the
frame to fit instead of cropping: `aspect-[16/9]` → `aspect-[4/5]` on the card and case-study cover and
switch `object-cover` → `object-contain` on a `--surface` bed so nothing is cut. Keep the raw `<img>`
for this step.

- `components/ProjectCard.tsx`: `aspect-[16/9]` → `aspect-[4/5]`, `object-cover` → `object-contain`, `p-6` inside.
- `app/work/[slug]/page.tsx`: cover + gallery frames → `aspect-[4/5]`, `object-contain`.

## Before / after
- Before: 1024² artwork in a 1182×664 box → 43.8% of the height removed, including the designed title.
- After: 1024² artwork in a 4:5 box → 0% vertical loss (20% horizontal padding only), title fully visible.

```
BEFORE  ┌────── 1182×664 ──────┐        AFTER   ┌── 4:5 ──┐
        │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│                │ ▄▄▄▄▄▄  │
        │▒▒ (title cut here) ▒▒│                │ ██████  │
        └──────────────────────┘                │ ██████  │
                                                │ TITLE ✓ │
                                                └─────────┘
```

## Components / tokens / files
- `ProjectCard`, `app/work/[slug]/page.tsx`. No new tokens.

## Effort
4 class changes across 2 files.

## Risks
- A 4:5 cover is 30% taller per card → the work list becomes a long scroll (currently 4336px, would grow
  by roughly 3×530px on `/`).
- `object-contain` on a square in a 4:5 box leaves 20% empty side bands, which can look like a mistake if
  the bed colour is not deliberate.

## Acceptance criteria
No cover cropped by more than 10% of its design intent; the artwork's own title is visible; no letterbox
band that reads as broken.
