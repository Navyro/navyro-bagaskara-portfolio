# Findings — `/work/[slug]` Case study (4 slugs audited)

Slugs: `nexabank-mobile-app`, `elevate-design-system`, `luminary-ecommerce`, `healthpulse-dashboard`.

## Verdict per viewport/state

**1440x900 top** — `shots/1440x900-main.png`
Strong opening: eyebrow, big title, one-sentence summary, four-column metadata, full-bleed cover.

**1440x900 scrolled (sticky)** — `shots/1440x900-scrolled-stickybar.png`, `shots/1440x900-stickyheading.png`
The sticky stack is broken. The reading-progress bar pins itself at `top: 61px` while the header is
**77px** tall and carries a higher z-index (40 vs 30) — so **16px of the progress bar is hidden behind
the header**, including the top of its title text. The sticky section headings then pin at
`top: 96px`, i.e. 2px *inside* the progress bar, so their first line is clipped by it too. Three
different hardcoded offsets (61, 77, 96) that were never reconciled.

**390x844** — `shots/390x844-main.png`, `shots/390x844-full.png`
No overflow, metadata reflows to 2 columns without truncation. The same sticky offsets are wrong here
as well (header 69px vs bar at 61px).

**Section structure (all 4 slugs, measured)**
Dominant gap: `luminary-ecommerce` and `healthpulse-dashboard` jump **06 → 08**, because `testing`
is undefined and `CaseStudySection` returns `null` — while the surviving titles keep their
hardcoded numbers.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| C-1 | layout | `ReadingProgressBar` sticky offset | Pins at `top:61px`; header bottom is **77px** at 1440 and **69px** at 390/768, header z-index 40 vs bar 30. **16px of the bar is covered**; `elementFromPoint` at the bar's top row returns the header. | L5, H5 | `barTop 61`, `headerBottom 77`, `coveredPx 16`, `headerZ 40 / barZ 30` | P1 | measured |
| C-2 | layout | Sticky section headings | `position:sticky; top:96px` — the progress bar occupies 61→98, so the heading's first 2px of glyphs sit under it. Correct offset would be 77+37 = 114px. | L4, H6 | `heading [96,128]`, `bar [61,98]`, `overlapPx 2` | P2 | measured |
| C-3 | page | Section numbering | `luminary` and `healthpulse` render `01…06` then **`08`, `09`** — no 07. A reader assumes a section failed to load. | C1, H5 | heading list per slug | P2 | measured |
| C-4 | component | Cover image | 1024² source in a 16:9 box with `object-cover` → 43.8% vertical crop. | H2, D1 | `1024×1024` → `1182×664` | P2 | measured |
| C-5 | page | Next-project card heading | Its title is an `h3`, the same level as the nine content sections, so document outline offers no distinction between "a section of this case study" and "a different case study". | H3, C1 | `h3` list ends with the next project title | P2 | observed |
| C-6 | page | Body measure | 82 characters per line at 18px/28px in the content column. Slightly above the 80ch ceiling for reading surfaces. | D1 | `chPerLine 82`, `lh/size 1.56` | P3 | measured |
| C-7 | component | Progress bar copy | Reads "`0% COMPLETED`" at the top of the page. The reader has not completed anything. | C1 | text at scroll 0 | P3 | observed |

## Excellent as is

- No horizontal overflow at 320–1440; the 2-column metadata grid reflows without truncation (L6).
- Cover, metadata and CTA order matches how a reviewer scans a case study (L7).
- Nine-section narrative structure with a left label / right body split is a real case-study pattern, not filler (P1).
- Prev/next project links plus the large next-project card give three ways out, none of them a dead end.
