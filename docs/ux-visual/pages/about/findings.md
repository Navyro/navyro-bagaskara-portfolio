# Findings — `/about`

## Verdict per viewport/state

**1440x900 (light)** — `shots/1440x900-main.png`, `shots/1440x900-full.png`
Clean, well-ordered page: name → narrative → `01` experience → `02` education → `03` skills, on one
shared grid with a real timeline (dots on the rule, aligned to their text). The two flaws are the
three skill cards ending at three different heights (338 / 300 / 186px) and muted small labels at
3.54:1.

**390x844 / 768x1024**
Cards stack; timeline stays aligned; no overflow.

**Note on a suspected defect that turned out fine:** the source passes `title="Tools &amp; Workflow"`
as a JSX *attribute string*. Measured `textContent` is `Tools & Workflow` — JSX attribute literals
decode entities, so nothing is broken. Recorded here so it is not "fixed" twice.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| A-1 | group | 3 skill cards in one row | Widths identical (379px), tops aligned, heights **338 / 300 / 186**. The third card is 45% the height of the first, leaving a hollow column on a page that otherwise has a strict grid. | D2, H6 | `{338, 300, 186}` | P2 | measured |
| A-2 | component | Small muted labels (`ABOUT`, section numbers, card captions) | `#888888` at 3.54:1 on `#FFFFFF`, 3.99:1 on `#F7F7F5`. | A1 | `lowContrast` 4 nodes, ratio 3.54 | P2 | measured |
| A-3 | page | Hero block | Name + role + location as three stacked lines with no portrait or visual anchor; the densest page in the site has no image at all, while every work page is image-led. | D2, P1 | full-page capture | P3 | observed |
| A-4 | page | Spacing scale | Same off-scale 6/10/14px values as the home page. | D3 | `spacing.offScale` | P3 | measured |

## Excellent as is

- Experience timeline: dot on the rule, dates, titles and body copy share one left edge per level, 3 entries, no drift (H6).
- Section numbering `01/02/03` is applied consistently and matches the corresponding blocks on the home page (H5).
- The page never repeats the home page verbatim except the bio, which is legitimately reused context (C2).
- Education section is compact and honest — one card, no padding theatre (D2).
