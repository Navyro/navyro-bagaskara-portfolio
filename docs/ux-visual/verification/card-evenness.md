# CL-7 — Card evenness: verification

**Cluster:** sibling cards in one row ended at three different heights (skill cards 338 / 300 / 186 at
1440), plus a second ragged row nobody had measured yet — the four APPROACH cards. Decision: **C, implemented
with A's mechanism** — equal height through the wrapper chain, and a bottom-aligned footer slot that holds a
fact the card already contains: how many items it lists. See
`docs/ux-visual/decisions/card-evenness.md`.

## What changed

### `components/SkillGroup.tsx`

```diff
-<div className="rounded-card border border-border bg-surface p-6 md:p-8">
+<div data-skill-card className="flex h-full flex-col rounded-card border border-border bg-surface p-6 md:p-8">
   <h3 …>
-  <div className="mt-6 flex flex-wrap gap-2">
+  <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
     …chips
   </div>
+  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
+    <span …>Total</span>
+    <span data-skill-total={skills.length} …>{skills.length}</span>
+  </div>
 </div>
```

The count is derived from `skills.length` — never typed — so the card cannot advertise a number that
disagrees with its own chips.

### Wrappers

`ScrollReveal` is the grid item, so it has to stretch, not the card alone:
`<ScrollReveal className="h-full">` on the three skill cards on `/` and `/about`, and on the four APPROACH
cards (`app/page.tsx`), whose card gained `flex h-full flex-col`.

## Measured

| Row | Before | After |
| --- | --- | --- |
| Skill cards @1440 (both pages) | 338 / 300 / 186 (Δ 152) | **454 / 454 / 454 (Δ 0)** |
| Skill card footers @1440 | none | all bottoms at the same y (3492 on `/`, 3378 on `/about`) |
| APPROACH cards @1440 | 254 / 231 / 254 / 231 (Δ 23) | equal, Δ 0 |
| Skill cards @768 | 592 / 395 / 328 (Δ 264) | Δ 0 |
| Declared counts | — | 9 / 5 / 6, each equal to the chips actually rendered |

## Assertion added

```
cards.skill-footer-count   declared count == number of chips rendered, for every [data-skill-card]
```

Without it, the footer number is a hand-typed string that will drift the first time a skill is added.

## Suite

| Stage | Checks | Failures |
| --- | --- | --- |
| After CL-8 + links | 165 | 2 |
| After CL-7 | **183** | **0** |

The 18 extra checks are `cards.skill-footer-count` over 6 routes × 3 viewports. **Every cluster that was
open at the start of this pass now passes.**

## Honest note on the leftover space

All three cards are now 454px tall, so the shortest one (Tools & Workflow, 6 chips vs 9) has a blank band
between its last chip and the footer divider. That band is the trade the decision chose: it is *bounded* by a
divider and a shared baseline instead of running into the section, and the alternative — inventing filler
copy — was rejected. `look_at_image` confirms the three footers sit on one line and the padding below them is
uniform; the third card is visibly the emptiest of the three, which is a property of its data, not of the
layout.
