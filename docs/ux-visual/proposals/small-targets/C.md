# CL-8 / C — Convention: make the whole card the target, keep the label as a promise

## Change
The category convention for an editorial project list is that **the article is the link** and the trailing
"View Case Study →" is an affordance, not a separate control. Wrap the card in a single anchor (the `h3`
link already navigates there) using a stretched-link pattern, so the hit area is the entire 1182×1033 card
— far beyond any minimum — and the trailing text no longer needs its own padding.

- `ProjectCard`: `article` becomes `a` with `group`; the title keeps an inner `<span>` so the accessible
  name is the project title; the trailing "View Case Study" becomes `aria-hidden` decorative text.
- Navbar/Footer/section links: `py-1.5 -my-1.5` (a `.link-tap` utility) since they cannot be stretched.
- Keyboard: one tab stop per card instead of two (title + action).

## Before / after
- Before: 2 tab stops per card, both small; trailing link 137×20.
- After: 1 tab stop per card, 1182×1033 hit area; trailing text is a label.

```
BEFORE              AFTER
 h3 ──► link ①      ┌──────────────────────────────┐
 img ──► link ②      │  the entire card is link ①   │
 text View ──► ③     │  h3 text is the link's name   │
                     └──────────────────────────────┘
```

## Components / tokens / files
- `components/ProjectCard.tsx` (structure), `app/globals.css` (`.link-tap`), `Navbar`, `Footer`.
- Tokens: none new.

## Effort
~30 lines; a markup change with a11y implications.

## Risks
- A card-sized `<a>` swallows text selection inside the card, which users doing research on a portfolio
  actually do.
- The 3D-tilt/glare handlers currently live on the inner image anchor; moving the anchor outward requires
  re-tuning them.
- Nesting the tags/labels inside one anchor changes what screen readers announce per card.

## Acceptance criteria
Every interactive target ≥24/44px; one tab stop per card; card text still selectable or the loss is
accepted explicitly; the accessible name of each card is the project title.
