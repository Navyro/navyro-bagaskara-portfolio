# Findings — `/` Home

## Verdict per viewport/state

**1440x900 (light)** — `shots/1440x900-main-light.png`, `shots/1440x900-full-revealed.png`
A confident, restrained editorial hero: one strong H1, one primary button, quiet accent use. The
weak points are the H1 (it types, erases and retypes forever, so the name is literally missing for
part of every cycle), a project meta row rendered in a grey that fails contrast, and covers that are
square artwork force-cropped into a 16:9 slot, cutting off their own titles.

**390x844 (light)** — `shots/390x844-main.png`, `shots/390x844-mobilemenu.png`
Hero holds up. Type scale collapses sensibly. Mobile menu is clean and opaque, but its panel starts at
`y=61` while the header ends at `y=69`, leaving an 8px seam of live page content above it.

**768x1024** — `shots/768x1024-main.png`
Same as 1440 with narrower hero. No overflow (`pageScrollX 0`), no wrapped controls.

**Dark mode** — `shots/1440x900-main.png`
Reads as a designed dark theme, not an inverted one. Nothing becomes invisible.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| H-1 | page | Hero `h1` typewriter | The name types in, waits, then deletes back to 1 character and retypes in a 2.9s loop. At 320/360/375px the H1 flips between 1 and 2 lines, growing the hero 39–40px on every cycle. At 1440 the name is empty for part of every cycle. | L5, H1, C1 | `h1Heights [43,83]`, `heroHeights [598,637]` at 320/360/375; `len [17,17,16,13,11,8,6,3,1,1,1,1,2,4,5…]` at 1440 | P1 | measured |
| H-2 | component | Project meta row (category · year · role), section numbers `05 —` | `text-text-muted` `#888888` on `#F7F7F5` = **3.99:1**, on `#FFFFFF` = 3.54:1, dark `#71717A` on `#17171A` = **3.70:1**. Informative text, small size → needs 4.5:1. 18 instances on this page. | A1 | `lowContrast[0..5] ratio 3.99`; `audit.json` | P2 | measured |
| H-3 | group | "Lihat Semua Proyek (4)" above **3** cards | Label announces 4, the list shows 3 (only `featured: true` render). No cue that the 4th sits behind the link. | C1, C2 | article count = 3, label text = "(4)" | P2 | measured |
| H-4 | group | Expertise: 3 skill cards in one row | Same row, same width (379px), heights **338 / 300 / 186** — a 152px ragged bottom and a visibly hollow third card. | D2, H6 | `{UI/UX Design 338, Front-End Stack 300, Tools & Workflow 186}` | P2 | measured |
| H-5 | page | Whole page type scale | **22 distinct size/weight combinations** on one page (11,12,14,16,18,20,24,30,36,48,60,72px × 400/500/600/700/800). Heading steps are not from a scale. | H3 | `type.n = 22`; `sizes` object | P2 | measured |
| H-6 | page | Project covers | All 4 covers are **1024×1024 square** rendered into **1182×664** with `object-fit:cover` → **43.8% of the artwork's height is cropped away**. The NexaBank cover's own title sits at the bottom edge and is cut off. | H2, D1 | `naturalWidth 1024 naturalHeight 1024`, box `1182×664`; vision confirms title lost | P2 | measured |
| H-7 | component | 15 inline links under 24px tall | `RESUME` 72×16, `View Case Study` 137×20, footer links 138×17. Below the 24×24 pointer minimum. | I4 | `smallTargets` (15 entries) | P2 | measured |
| H-8 | page | Spacing scale | Values **6 / 10 / 14 px** appear beside 4/8/12/16 (`gap-1.5`, `gap-2.5`, `py-3.5`) → 8 near-duplicate pairs. | D3 | `spacing.offScale [6,10,14]`, `nearDupes` 8 pairs | P3 | measured |
| H-9 | page | Footer tagline | Footer repeats the hero `shortStatement` word for word. | C2 | identical sentence in Hero and Footer | P3 | observed |
| H-10 | page | `ScrollReveal` blocks | If a block never intersects the viewport it stays at `opacity:0` forever — 21 blocks were measured invisible when the page was jumped past rather than scrolled (print, full-page capture, some crawlers, deep-link). Real scroll reveals fire correctly. | L5 | 21 blocks at opacity 0 after an instant jump; 3 (glare only) after a real scroll | P3 | measured |

## Excellent as is

- Accent discipline: one blue, used only for eyebrow, active nav underline and section numbers. No gradient soup, no badge clutter (H4).
- Grid: every region shares the 1280px container and the same 24/48px gutters; `pageScrollX = 0` at 320/390/768/1440 (L4, L6).
- `prefers-reduced-motion` is honoured — the typewriter is skipped and reveals render as static divs (A3).
- Focus ring is real and visible: `outline: solid 2px #1F4FFF, offset 3px` (I7, A1).
- Mobile menu is opaque, correctly stacked, and skips hidden desktop controls in the tab order (verified with real Tab presses).
- The project cards' 3D tilt is subtle (±6°) and does not produce distortion or visible glare artefacts.
