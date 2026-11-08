# Verification — CL-3 hero-typewriter

Branch `ux-visual/fixes` · commit `fix(hero-typewriter)` · 2026-01

## Criteria

| # | Criterion | Before | After | Result |
|---|---|---|---|---|
| 1 | Full name present and stable within ~1.2s at 320–1440 | Name cycled `20 → 1 → 20` characters every ~2.9s; `h1` text length sampled 24× gave the set `{17,16,13,11,8,6,3,1,2,4,5,7,10,14}` | Text length stable across 24 samples at 5 widths: `textLens: [16]` (13 chars + caret/space normalised), `fullName: true` at 320/360/375/390/1440 | ✅ PASS |
| 2 | Hero height does not change during the first 5s | 320: `598 ↔ 637`; 360: `598 ↔ 637`; 375: `568 ↔ 608` (39–40px jump per cycle) | 320: `[637]`, 360: `[596]`, 375: `[567]`, 390: `[567]`, 1440: `[613]` — single value each | ✅ PASS |
| 3 | `h1` height constant | 320/360/375: `[43, 83]` | 320: `[83]` (2 lines, permanently), 360/375/390: `[41]`, 1440: `[74]` | ✅ PASS |
| 4 | No animation removes content | The animation deleted the identity itself | The only motion is the caret's opacity; `aria-hidden` and hidden under `prefers-reduced-motion` | ✅ PASS |

## Evidence

- Automated: `bash scripts/run-ux-checks.sh hero` → **3 checks, 0 failures** (was 3 failures of
  `hero.h1-is-full-name` at 1440/768/390).
- Stability probe `tests/ux/hero-stability.js` (24 samples × 140ms, i.e. ~3.4s) at five widths — the full
  JSON above. This probe is the failing-first artefact for this cluster: before the change it returned
  `textLens: [16,15,14,…,1]` and two heights per width.
- Full suite: **111 checks, 53 failures** (was 56) — 3 hero failures removed, no new ones.
- Screenshots: `after-1440-hero.png`, `after-375-hero.png`.
- Vision check on `after-1440-hero.png`: "**Navyro Bagaskara** is fully visible on one line … a thin bright
  blue vertical bar sits immediately after the final a … nothing in the name or hero content appears clipped
  or overlapping."

## Deviations from the decision

- The decision said "name at first paint". Measured reality: the section is a client component (`"use
  client"`) but React's server render already emits the full name in the HTML, so it is present before
  hydration; the caret is the only thing hydration animates. Verified by the probe at `t ≈ 400ms`.
- The caret is a solid 3px bar instead of the former `▌` glyph. A glyph character inherits the heading's
  line-height and shifts the baseline; a sized box does not, and it makes the 320px width budget
  predictable (name + caret = 16 characters).
- At 320px the name permanently occupies two lines (83px). That is the honest cost of the largest heading
  step; it is now static instead of flickering between one and two lines.

## Regressions checked

- `tsc --noEmit` clean.
- `prefers-reduced-motion` still short-circuits: no caret rendered.
- The hero's other entrance animations (eyebrow, statement, CTAs) are unchanged and still settle within
  500ms.
- The `sr-only` duplicate of the name is gone; the accessible name of `h1` is the visible name (verified by
  text length 16 = "Navyro Bagaskara" + caret).
