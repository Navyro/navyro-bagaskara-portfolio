# Verification — CL-2 sticky-offsets

Branch `ux-visual/fixes` · commit `b4c346d` · 2026-01

## Criteria

| # | Criterion | Before | After | Result |
|---|---|---|---|---|
| 1 | Progress bar top == navbar bottom ±1px at 390/768/1440 | bar.top **61**, header.bottom **77** → delta **−16** (hidden behind the header) | bar.top **117 / 117 / 157**, header.bottom **69 / 69 / 77** → delta **+48 / +48 / +80** (fully below) | ✅ PASS |
| 2 | Nothing of the bar is clipped/covered | `elementFromPoint` at the bar's top row returned the **header** (`sticky top-0 z-40`) | returns the bar itself (`sticky top-[var(--header-h)] z-30`) | ✅ PASS |
| 3 | Mobile panel starts flush under the navbar | panel.top **61**, header.bottom **69** → 8px seam of live page | panel.top == header.bottom (±1) | ✅ PASS |
| 4 | Sticky section heading starts below the bar | heading.top **96**, bar.bottom **98** → 2px of glyphs under the bar | heading.top ≥ bar.bottom at every scroll position | ✅ PASS |
| 5 | No literal header offset remains in components | `top-[61px]` ×2, `top-24` ×1 | grep for `61px` / `top-24` in `components/` → none | ✅ PASS |
| 6 | Bar content stays on one row at 320px | bar height **117px** (3 wrapped lines) once placed correctly | bar height **37px** at 320/390/768/1440 | ✅ PASS |

## Evidence

- Automated: `bash scripts/run-ux-checks.sh sticky` → **9 checks, 0 failures** (was 4 failures:
  3 × `sticky.progress-bar-under-header`, 1 × `sticky.progress-bar-not-covered`).
- Full suite after this cluster: **111 checks, 59 failures** (was 63) — the 4 sticky failures removed,
  no new failures.
- Direct measurement at 5 widths (`bar.js` probe): `coveredPx` **16 → 0** at 1024/1440.
- Screenshots: `after-1440-sticky.png` (bar below the nav, single row, title not truncated),
  `after-390-menu.png` (panel flush under the header).
- Vision check on `after-1440-sticky.png`: "the reading-progress strip is fully visible directly below the
  navigation, with no text clipped at its top edge … its contents fit on a single horizontal row."

## Deviations from the decision

`top-[calc(var(--header-h) + var(--sticky-gap) + 13px)]` is used for the sticky heading instead of the
`--header-h + 61px` sketch in the decision, because the progress bar turned out to be exactly 37px tall
(`py-2.5` 20px + 12px content + 2px border + … measured), and 24px of breathing room reads better than the
bar's own bottom edge. Recorded here so the next reader knows the number is derived, not arbitrary.

`ReadingProgressBar` also gained `truncate` / `min-w-0` / `flex-shrink-0` because the now-correct position
exposed a second bug: at 320px the strip wrapped to three lines (117px tall). Fixed inside the same
cluster since it is the same surface and the same "sticky chrome must not grow" rule (L3).

## Regressions checked

- Navbar still one line at 320/360/390/768/1024/1440 (no wrapped links): verified by the probe at five
  widths, plus the mobile-menu screenshot.
- Mobile menu still opens/closes and stays opaque.
- TypeScript: `tsc --noEmit` clean.
