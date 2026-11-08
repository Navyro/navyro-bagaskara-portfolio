# CL-7: Equal-width cards in a row end at three different heights

## Problem
The three skill cards sit in one grid row with identical widths (379px) and aligned tops, but measured
heights **338 / 300 / 186px** — bottoms at 2916 / 2878 / 2764. The third card is 45% the height of the
first, so the row ends in a ragged staircase and 152px of the section reads as hollow.

Findings: H-4 (home EXPERTISE), A-1 (about 03). Evidence: measured `{UI/UX Design 338, Front-End Stack
300, Tools & Workflow 186}` at 1440 on both pages; `pages/home/findings.md`, `pages/about/findings.md`.

Acceptance criteria: sibling cards in one row share height ±1px at 1440 and 768; the shortest card's
content is not textually padded with filler.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | `h-full` through the wrapper chain so the row stretches | **33 / 35** · 31 / 35 · **30 / 30** |
| B Restructure | One panel with three divided columns | 31 / 35 · 29 / 35 · 24 / 30 |
| C Convention | Equal height + bottom-aligned footer slot absorbs the leftover space | 31 / 35 · **35 / 35** · 29 / 30 |

## Decision
**C**, implemented with A's mechanism (`flex h-full flex-col` through the `ScrollReveal` wrapper). The
footer slot holds a plain fact per card — the number of items it lists ("7 keahlian", "8 tools") — which is
information the card already contains but never states, not filler invented to fill height.

Rejected A on its own: it levels the bottoms but leaves the third card with 152px of blank space *below* its
last chip, which is exactly the D2 dead-space defect that made this a finding. Rejected B: it fixes the
height by construction but deletes the card texture the rest of the page depends on and adds a divider
pattern used nowhere else.

## Why this is the best
- **Against A**: same mechanical fix, but the leftover space lands in a purposeful place (above a
  baseline-aligned footer) instead of after the content.
- **Against B**: keeps the component, keeps the visual language, ~15 lines instead of ~60, and does not
  destabilise the 768px breakpoint where three columns become rows.
- **Norms satisfied**: H6 (siblings end on one line, footers share a baseline), D2 (no dead band — the
  space is bounded by a footer), D4 (proximity still groups tags above the footer), L4 (one grid).
- **Costs and what it rules out**: adds one small line of copy per card that must be true and useful; a
  count nobody reads would turn this into D5 noise, so the count is derived from `skills.length`, never
  typed by hand.

## Implementation plan
1. `components/SkillGroup.tsx`:
   - root: `flex h-full flex-col rounded-card border border-border bg-surface p-6 md:p-8`;
   - tags wrapper: `mt-6 flex flex-1 flex-wrap content-start gap-2`;
   - footer slot: `<div class="mt-auto flex items-center justify-between border-t border-border pt-4">
     <span class="text-meta uppercase tracking-wider text-text-muted">Total</span>
     <span class="text-meta font-bold text-text-primary">{skills.length}</span></div>`.
2. `components/ScrollReveal.tsx`: accept a `className` (already does) and pass `h-full` from the callers, or
   set `h-full` on the motion div when `className` contains it — the wrapper is the grid item, so it must
   stretch.
3. `app/page.tsx` (EXPERTISE grid) and `app/about/page.tsx` (03 grid): `<ScrollReveal className="h-full">`.
4. No token changes.

## Test plan
- Failing-first: for each row of 3 skill cards, assert `max(height) - min(height) <= 1` at 1440 and 768 —
  fails today (338/300/186 → delta 152).
- Assert every card's footer `getBoundingClientRect().bottom` is within 1px of the others.
- Assert the footer count equals `skills.length` for each group.
- Regression: at 390 the cards stack with unchanged internal spacing (`p-6`, `gap-2`).
