# CL-3: Hero identity is an unstable looping animation

## Problem
`components/Hero.tsx` runs a typewriter state machine that types the name, pauses 2.5s, deletes it back to
one character (45ms/char), pauses, and retypes — forever, every 2.9s. `min-h-[1.2em]` reserves only one
line, so at widths where the name needs two lines the hero itself grows.

Measured: at 320×700, 360×740 and 375×812 the `h1` alternates **43px ↔ 83px** and the hero section
**598 ↔ 637px** (320) / **568 ↔ 608px** (375). At 1440 the visible name length cycles
`17,17,16,13,11,8,6,3,1,1,1,1,2,4,5,7,8,10,11,13,14,16,17,17`. At 390 and 414 it does not wrap, so the
shift is invisible there — which is why it survived review.

Findings: H-1. Evidence: `pages/home/findings.md`, `pages/home/audit*.json`.

Acceptance criteria: the full name is present and stable within ~1.2s of load at 320–1440; the hero's
height does not change during the first 5s; no animation removes content.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | Type once on entrance, then stop | 28 / 35 · 28 / 35 · 25 / 30 |
| B Restructure | Static name + decorative caret; motion moves to the supporting lines | **33 / 35** · **31 / 35** · **27 / 30** |
| C Convention | No animated headline at all | 35 / 35 · 29 / 35 · 28 / 30 |

## Decision
**B** — the `h1` renders `profileData.name` as static text from first paint; a small accent caret
(`aria-hidden`, `w-[3px] h-[0.9em]`) is kept as a sibling to preserve the page's typographic signature.
Graft from C: drop the `sr-only` duplicate of the name, which existed only to serve the animation.

Rejected A: it still hides the identity for ~1.2s and the tool is still a loop-shaped state machine — the
acceptance criterion "present within ~1.2s" is met but the user experience is still a promise rather than a
fact. Rejected C: correct but flat; it also deletes the one deliberate motion idea in the hero, and the
visual lens prefers B by 2 points.

## Why this is the best
- **Against A**: no timer, no state machine, no possibility of the name being absent. Deletes more code
  than it adds.
- **Against C**: keeps a single restrained piece of motion (the caret) that the rest of the site's
  language already uses (pulsing eyebrow dot, accent underlines), so the hero does not become the only
  static element on a motion-led page.
- **Norms satisfied**: L5 (no layout shift at any width), H1 (the focal point is stable), C1 (the identity
  is a fact, not a performance), A3 (`prefers-reduced-motion` simply drops the caret animation).
- **Costs and what it rules out**: the typewriter signature is gone. That is a taste decision and must be
  stated to the owner rather than slipped in. A blinking caret beside static text can read as a bug if it
  is inconsistent, so its timing (1.1s, 2 steps) must be deliberate.

## Implementation plan
1. `components/Hero.tsx`: delete `displayedText`, `isDeleting`, `typingSpeed`, the `useEffect` timer and
   the `sr-only` span. `h1` becomes `{profileData.name}` plus a sibling
   `motion.span` caret with `animate={{opacity:[1,0,1]}}`, `transition={{duration:1.1, repeat:Infinity}}`,
   `aria-hidden="true"`, hidden under `useReducedMotion()`.
2. Keep the existing eyebrow / statement / CTA entrance animations unchanged.
3. No token changes.

## Test plan
- Failing-first: assert `h1.textContent.trim() === "Navyro Bagaskara"` at `t = 0` (before hydration) and at
  3s and 6s — fails today at every sample after the erase phase.
- Assert `hero.getBoundingClientRect().height` is identical across 15 samples at 140ms at 320, 360, 375,
  390, 1440 — fails today at 320/360/375 (`598` vs `637`).
- Assert `h1.getBoundingClientRect().height` is constant at each of those widths.
- Regression: `prefers-reduced-motion: reduce` renders a static name and no caret.
