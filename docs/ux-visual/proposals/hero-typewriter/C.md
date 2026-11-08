# CL-3 / C — Convention: no animated headline at all; animate the supporting line

## Change
Best-in-class portfolios (and every serious editorial site) treat the `h1` as **typeset, not performed**:
it is the page's anchor and appears instantly. The category convention for a large type-led hero is a
static name, with motion reserves for the eyebrow, the statement and the call to action — exactly what
this Hero already does for everything *except* the name.

- `components/Hero.tsx`: `h1` = static `profileData.name`; remove the timer, the caret, and the
  `sr-only` duplicate (no longer needed).
- Keep the existing `motion.div` eyebrow, `motion.p` statement and `motion.div` CTAs, with their
  existing 450–500ms ease-out.

## Before / after
- Before: name is the only element on the page whose content changes without user input.
- After: name is the only element that never moves; the rest settles within 500ms.

```
┌────────────────────────────────────────────┐
│ ● UI/UX Designer + Front-End   ← fade 0.45s│
│                                            │
│ Navyro Bagaskara                ← static   │
│                                            │
│ Desainer UI/UX dengan…          ← fade 0.5s│
│ [ View Selected Work → ] [ Contact Me ↗ ]  │
└────────────────────────────────────────────┘
```

## Components / tokens / files
- `components/Hero.tsx` (~45 lines removed). `framer-motion` import stays for the other three blocks.

## Effort
Negative: code removed. Zero new risk.

## Risks
- The hero becomes visually quieter; on a portfolio the name must then be strong typographically,
  which it already is (72px ExtraBold).
- Owner may perceive the loss of the effect as a regression — must be an explicit decision.

## Acceptance criteria
`h1` is complete and static at first paint and for 5s; hero height constant at 320/360/375/390/1440;
all remaining motion respects `prefers-reduced-motion`.
