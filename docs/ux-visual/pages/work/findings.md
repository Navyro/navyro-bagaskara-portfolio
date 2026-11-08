# Findings — `/work` Work index

## Verdict per viewport/state

**1440x900 (light)** — `shots/1440x900-main.png`
Clear page title, unmistakable active filter chip (black fill / white text), first card visible above the
fold. The problem is not the look but the economics: **four filter chips to narrow four projects**, and
every chip returns exactly one item — a decision the user must make that buys them nothing.

**1440x900 hover** — `shots/1440x900-hover-card.png`
Tilt and the `VIEW ↗` cursor badge read as intentional and stay subtle. No distortion.

**390x844 / 768x1024**
Filters wrap cleanly (`wrappedControls: []`), no horizontal overflow, cards reflow to one column.

**Filter states** (all 5 reached)
`All → 4 cards`, `UI/UX → 1 (HealthPulse)`, `Web → 1 (Luminary)`, `Mobile → 1 (NexaBank)`,
`Front-End → 1 (Elevate)`. No empty state is reachable, so the hand-written empty state is dead code.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| W-1 | group | Filter chip row | 5 chips filter a list of 4. Each specific chip yields exactly 1 card. The filter costs a decision and returns no narrowing value; the whole list is already visible by scrolling once. | I5, D5 | card counts per chip: 4/1/1/1/1 | P2 | measured |
| W-2 | page | Filter state | Active filter exists only in React state: `location.search + location.hash = ""` for every filter. The view cannot be shared, bookmarked, or restored with Back. | I6, P2 | `url=""` after every chip click | P2 | measured |
| W-3 | page | Result feedback | After choosing a chip the page silently reshuffles with no "1 of 4" count or announcement. | C3 | no count node in DOM | P3 | measured |
| W-4 | component | Project covers | Same 1024² → 1182×664 `object-cover` crop as the home page: 43.8% of the artwork lost. | H2, D1 | `naturalWidth 1024` vs box `1182×664` | P2 | measured |
| W-5 | component | Tag chips + meta row | 12 sub-24px targets; 21 low-contrast nodes at 3.99:1. | I4, A1 | `smallTargets 12`, `lowContrast 21` | P2 | measured |

## Excellent as is

- Active filter state is unambiguous (filled vs outlined) and needs no legend (C3, H1).
- Chip row is 34px tall with even gaps — comfortable for pointer and touch (I4).
- Filter logic is genuinely correct for all four categories; no false positives from tag matching.
- Page title, eyebrow and explainer are three distinct jobs, not the same sentence three times.
