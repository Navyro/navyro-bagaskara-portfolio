# Verification — CL-4 muted-contrast

Branch `ux-visual/fixes` · commit `fix(muted-contrast)` · 2026-01

## Criteria

| # | Criterion | Before | After | Result |
|---|---|---|---|---|
| 1 | Every informative text node ≥ 4.5:1 in light | 18 nodes failing on `/` (`Mobile` 3.99, `2024` 3.99, `Role: …` 3.99, `05 —` 3.99), 21 on `/work`, 4 on `/about`, 8 on `/resume` | 0 failing nodes on all 6 routes × 3 viewports | ✅ PASS |
| 2 | Every informative text node ≥ 4.5:1 in dark | `#71717A` on `--surface` = 3.70, on `--background` = 3.99 | 0 failing nodes on `/`, `/work`, `/contact`, `/resume` in dark | ✅ PASS |
| 3 | Contrast ratio of the token itself | `#888888`: **3.30** (on `--background`), **3.54** (on `--surface`) | `#6B6B6B`: **4.97** / **5.33**; dark `#9C9CA6`: **7.09** (on `--background`) / **6.58** (on `--surface`) | ✅ PASS |
| 4 | No layout/metric drift | — | `pageScrollY` unchanged on all routes (no reflow), only colour differs | ✅ PASS |

## Evidence

- Automated: `bash scripts/run-ux-checks.sh contrast` → **18 checks, 0 failures** (was 18 failures).
- Full suite: **111 checks, 35 failures** (was 53) — all 18 contrast failures removed, no new ones.
- Dark-mode probe on `/`, `/work`, `/contact`, `/resume`: `contrast.no-informative-low-contrast` → PASS on
  all four.
- Computed ratios from the token values (sRGB, WCAG 2.1 relative luminance):
  `#6B6B6B` vs `#F7F7F5` = 4.97, vs `#FFFFFF` = 5.33, vs `#171717` = 3.36 (the token is never used on the
  inverse surface — checked, no node does);
  `#9C9CA6` vs `#0E0E10` = 7.09, vs `#17171A` = 6.58.
- Screenshots: `after-1440-work.png` (light), `after-dark-resume.png` (dark).
- Vision check on `after-1440-work.png`: "The project meta line is comfortably readable as secondary
  information … The large, bold black title remains much more prominent, so the two are distinct."

## Note on the measured baseline

The audit tool's own reported ratio for `#888888` on `#F7F7F5` was 3.99; a direct WCAG computation gives
3.30 for that pair. Both fail the 4.5 threshold, and the replacement passes both computations, so the
finding stands either way. Recorded so the numbers in `findings.md` are not mistaken for the arithmetic
value.

## Deviations from the decision

None. Two token values changed, exactly as decided; `--text-secondary` (`#555`) and `--text-primary` were
not touched, and no component was edited.

## Regressions checked

- The three-level text hierarchy still reads: primary `#171717`, secondary `#555`, tertiary `#6B6B6B` —
  confirmed visually on `/work` and by the vision check above.
- Footer (inverse surface) uses `opacity-*` on `--inverse-text`, not `--text-muted`, so it is unaffected.
  Its own contrast was checked separately: the footer body text sits at ~4.6:1 after its `opacity-70`.
- No component or layout change, so no screenshot diff beyond colour.
