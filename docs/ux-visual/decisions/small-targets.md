# CL-8: Interactive text is smaller than the minimum target

## Problem
Primary row actions are bare text links with no padding: `RESUME` **72×16**, `View Case Study`
**137×20**, footer links **138×17**, "Lihat Semua Proyek (4)" **178×20**, "Lihat Detail Karir" **134×20**,
"Selengkapnya Tentang Saya" **215×20**, "Download Resume ↗" **138×20**, footer `Email/LinkedIn/GitHub`
53–74×20. Counted 15 on `/`, 12 on `/work`, 11 on a case study, 8 on `/contact` and `/resume`.

Everything is below the 24×24 pointer minimum, and far below the 44×44 touch minimum, on a site whose
primary content *is* "open this case study".

Findings: H-7, plus the target subset of W-5. Evidence: `smallTargets` arrays in every
`pages/*/audit*.json`.

Acceptance criteria: every pointer target ≥24×24px at ≥768px and ≥44×44px at ≤767px, measured on the
anchor's own box; adjacent hit boxes must not overlap.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | Add padding + matching negative margin so the glyphs stay put and only the hit box grows | **30 / 35** · **30 / 35** · **27 / 30** |
| B Restructure | Turn the row actions into bordered button-shaped links | 31 / 35 · 27 / 35 · 25 / 30 |
| C Convention | Whole card is the link (stretched link); trailing label becomes an affordance | 31 / 35 · 27 / 35 · 21 / 30 |

## Decision
**A**, with one graft from B: `View Case Study` gets `inline-flex items-center` plus `gap-1.5` and enough
horizontal padding that its arrow is clearly inside the target, because it sits at the end of a
description row where a bare text hit box competes with the text beside it.

Rejected B: it introduces a second border/shape language into a page that deliberately uses almost no
boxes, for the same measurable outcome. Rejected C: a card-sized anchor swallows text selection on a
portfolio where visitors copy project names, and it diverges from the "one target per intent" review that
the case-study page already relies on.

## Why this is the best
- **Against B**: identical measurable result with ~18 class changes and zero new visual vocabulary; the
  page keeps its editorial restraint.
- **Against C**: no change to markup structure means no change to selection behaviour, no re-tuning of the
  3D-tilt handlers that currently live on the inner image anchor, and no change to what a screen reader
  announces per card.
- **Norms satisfied**: I4 (targets ≥24, ≥44 on touch, frequent targets large), I1 (affordances unchanged —
  these were already obviously links), A1 (focus ring already global, so the grown box is visibly focused).
- **Costs and what it rules out**: negative margins can make neighbouring rows' hit boxes overlap, so each
  location is checked individually rather than blanket-applied; the layout metrics do not move, which also
  means the fix cannot be confirmed by a screenshot — it must be asserted from the DOM.

## Implementation plan
1. `components/ProjectCard.tsx` — `View Case Study`:
   `inline-flex items-center gap-1.5 px-1 py-2 -mx-1 -my-2` (20 → 36px tall) and
   `max-md:py-3 max-md:-my-3` (→ 44px under 767px).
2. `components/Navbar.tsx` — `RESUME`: `py-1.5 -my-1.5` (16 → 28px).
3. `components/Footer.tsx` — nav + connect lists: `inline-block py-1 -my-1` (17 → 33px); keep the existing
   `gap-3` so no two boxes touch.
4. `app/page.tsx` — "Lihat Semua Proyek (4)", "Lihat Detail Karir", "Selengkapnya Tentang Saya",
   "Download Resume ↗": `py-2 -my-2`.
5. `app/about/page.tsx`, `app/contact/page.tsx`, `app/resume/page.tsx` — same treatment on their inline
   links.
6. No token changes; consider a `.link-tap` utility in `globals.css` if the pattern repeats 5+ times.

## Test plan
- Failing-first: for every `a`/`button` in `main` + `footer`, assert `rect.width >= 24 && rect.height >= 24`
  at 1440/768, and `>= 44` at 390 — fails today on 15 anchors at `/`.
- Assert no two sibling anchor rects intersect.
- Assert `scrollHeight`/layout metrics are unchanged for `/` (the fix must be visually neutral): compare
  `pageScrollY` before/after.
- Regression: keyboard tab order unchanged (still one stop per link); focus ring still visible on the
  enlarged box.
