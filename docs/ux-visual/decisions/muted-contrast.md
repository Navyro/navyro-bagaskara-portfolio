# CL-4: Muted text token fails contrast

## Problem
`--text-muted` is `#888888` in light and `#71717A` in dark, and it is used for text that carries
information: project meta rows (`Mobile • 2024 • Role: …`), section numbers (`05 —`), the `FILTER:`
label, contact card captions, resume section headers, skill card captions.

Measured ratios: **3.99:1** (`#888888` on `--background #F7F7F5`), **3.54:1** (`#888888` on
`--surface #FFFFFF`), **3.70:1** (`#71717A` on `--surface #17171A`). 18–21 offending nodes per page,
across all 7 routes and both themes. Small text needs 4.5:1.

Findings: H-2, A-2, CT-4, R-3. Evidence: every `pages/*/audit*.json` `lowContrast` array.

Acceptance criteria: every text node that carries information reaches ≥4.5:1 against its actual
background in both themes; `layout-audit.lowContrast` returns only decorative nodes.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | Darken the token pair until it passes | **35 / 35** · **31 / 35** · **28 / 30** |
| B Restructure | Split the token: `--text-tertiary` for information, `--text-muted` for decoration | 33 / 35 · 33 / 35 · 26 / 30 |
| C Convention | Derive a documented four-step contrast ramp with a test | 31 / 35 · 35 / 35 · 27 / 30 |

## Decision
**A** — `--text-muted: #6B6B6B` (light) and `#9C9CA6` (dark). Graft one piece of B: the rule that the
token now means "informative tertiary text", and `•` separators inside the meta row inherit it (which is
harmless) rather than introducing a second token. No component edits at all.

Rejected B: two greys four steps apart (`#555` and `#6B6B6B`) is a distinction no reader will perceive,
costing 20 class swaps for a semantic split with no visual payoff. Rejected C: a four-step documented ramp
plus a contrast unit test is agency-scale ceremony for a single-owner portfolio; it also does not prevent
the actual failure mode (a hand-picked hex in a component).

## Why this is the best
- **Against B and C**: achieves the measured goal with two characters changed in one file. The cluster's
  failure is a token value, so the fix belongs in the token value.
- **Norms satisfied**: A1 (4.5:1 for text), C3 (status/meta text is legible), D1 (meta text readable at
  12px), H4 (the accent stays reserved for primary/active states).
- **Costs and what it rules out**: the visual gap between `--text-secondary` (`#555`, 7.1:1) and
  `--text-muted` (`#6B6B6B`, 4.8:1) narrows, so the third text level leans on size and casing instead of
  lightness. That is the correct trade and is already how the design reads.
- Residual risk: text placed on `--accent` or `--inverse-bg` is out of scope for this token and was
  checked separately (no nodes affected on those beds).

## Implementation plan
1. `app/globals.css`:
   - `:root { --text-muted: #6B6B6B; }` (was `#888888`)
   - `.dark { --text-muted: #9C9CA6; }` (was `#71717A`)
2. Add a one-line comment above the token naming its floor: `/* ≥4.5:1 on --background and --surface */`.
3. No component changes; `tailwind.config.ts` already maps `text-muted`.

## Test plan
- Failing-first: assert `contrast(getComputedStyle(el).color, bgOf(el)) >= 4.5` for every text node whose
  text is non-empty and not a `•`/`|` separator, at 1440 light + dark — fails today on 18–21 nodes per
  page.
- Re-run `layout-audit.js` on all 7 routes: `lowContrast` must be empty.
- Visual check: project meta rows and resume section headers still read as secondary, not as body text
  (`look_at_image` on `/work` and `/resume`).
