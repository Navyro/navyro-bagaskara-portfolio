# CL-8 / B — Restructure: links become buttons (a visible control, not a text link)

## Change
`View Case Study` and `Lihat Semua Proyek (4)` are the row's action — they should look and behave like a
control. Convert them to bordered button-shaped links (`rounded-btn border px-4 py-2.5`), which fixes the
target and the affordance in one move. Footer and navbar links keep text styling but get a hit area via a
shared `.link-tap` utility.

- New utility in `app/globals.css`: `@layer components { .link-tap { @apply -my-1.5 inline-block py-1.5; } }`
- `ProjectCard`: action becomes `inline-flex items-center gap-1.5 rounded-btn border border-border
  px-4 py-2.5 text-sm` and moves to the card's bottom-right, receiving the description row's baseline.
- `app/page.tsx`: "Lihat Semua Proyek" becomes the section's single secondary button.
- Navbar/Footer links: `link-tap`.

## Before / after
- Before: 15 bare-text targets of 16–20px, indistinguishable from body text.
- After: 2 real buttons + links with a 33px minimum hit box; the card has one obvious action.

```
BEFORE                          AFTER
Description text…  View Case →   Description text…   ┌───────────────┐
                                                    │ View Case →   │
                                                    └───────────────┘
```

## Components / tokens / files
- `app/globals.css` (1 utility), `ProjectCard`, `app/page.tsx`, `Navbar`, `Footer`.

## Effort
~25 lines. Visually the largest change of the three.

## Risks
- Adds a second border/shape language to a page that deliberately uses almost no boxes — could make the
  editorial list look like a marketplace grid.
- Two competing actions per card if the title link already navigates to the same place (it does); the
  button must therefore be styled secondary, not primary.

## Acceptance criteria
Every target ≥24/44px; the card presents one clearly primary action; no visual clutter introduced
(max 1 new border per card row).
