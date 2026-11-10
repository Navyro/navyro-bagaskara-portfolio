# Per-device project mockups on `/work` — verification

Scope: **only** the artwork inside each project card's image area on `/work`. Nothing else changed:
no layout, grid, spacing, type, colour tokens, header, footer, tags, copy, ordering or links.
`ProjectCover` (case-study pages, next-project card) is untouched.

## What each card shows

| # | Project | Device | Screenshot used | Asset ratio |
| --- | --- | --- | --- | --- |
| 01 | SIPENELITIAN | **laptop** | `public/images/projects/sipenelitian/screens/02-dashboard-admin.png` | 1440×1024 (1.4063) |
| 02 | FanFunds | **phone** | `public/images/projects/fanfunds/screens/03-home-discover.png` | 393×852 (0.4613) |
| 03 | Aplikasi Penagihan Limbah RT | **phone** | `public/images/projects/penagihan-limbah/screens/06-laporan.png` | 412×917 (0.4493) |
| 04 | Mediassist | **phone** | `public/images/projects/mediassist/screens/02-home-amelda.png` | 393×852 (0.4613) |
| 05 | Kick Swift | **phone** | `public/images/projects/kick-swift/screens/03-home.png` | 1125×2436 (0.4618) |
| 06 | Jogging ID | **phone** | `public/images/projects/jogging-id/screens/07-result.png` | 390×844 (0.4621) |

All six are **individual** screenshots from each project's own `screens/` set — the composite cover
compositions (`cover.jpg`) were not poured into a single frame anywhere.

Two screens were swapped after looking at them: Jogging ID's `03-home` was replaced by `07-result`
(the home screen's "Week 2" card is cut at the right edge and the floating run button covers the
recent-activities list, which reads as broken inside a mockup), and Penagihan's `03-dashboard` was
replaced by `06-laporan` (the dashboard is a green header over a mostly blank white area; the
report screen is filled with cards and a "Cetak PDF" action).

## Files changed

| File | Change |
| --- | --- |
| `components/ProjectDeviceShot.tsx` | new. CSS-only laptop/phone frames + `next/image`. |
| `data/projects.ts` | `Project` gains `cardShot?` and `cardShotAspect?`; the six projects get their chosen screenshot and its own aspect. |
| `components/ProjectCard.tsx` | renders `ProjectDeviceShot` when `cardShot` exists, otherwise the previous `ProjectCover`. Two-line import change. |

No change to `app/globals.css`, `tailwind.config.ts` or any other component.

---

## Round 2 — what the first version got wrong

The first version looked acceptable in a full-page screenshot but had four defects that only
surfaced by measuring the rendered boxes instead of trusting the picture.

### 1. The bezel was padding, so every screen letterboxed

The screenshot element used `aspect-ratio` on the **outer** box and then `p-[6px]` for the bezel.
Padding subtracts the same 12px from width *and* height, which **changes the box ratio**
(276.9×599.3 = 0.4621 became 264.9×587.3 = 0.4510 while the asset stays 0.4621). `object-contain`
then fitted the image to the tighter axis and left a white strip at the bottom and top.

Measured before the fix — pale strips of 7px on Jogging ID, and ~5px left/right on the laptop:

```
src 07-result.png  srcRatio 0.4621  boxRatio 0.4510  →  padY 7.0px   (white visible)
```

**Fix:** the screen box now *is* the asset ratio, and the bezel is drawn **behind** it with
`absolute -inset-[6px]`. Measured after:

```
02-dashboard-admin 1.4063 / 1.4063 padX 0 padY 0
03-home-discover   0.4613 / 0.4612 padX 0 padY 0
06-laporan         0.4493 / 0.4493 padX 0 padY 0
02-home-amelda     0.4613 / 0.4612 padX 0 padY 0
03-home            0.4618 / 0.4618 padX 0 padY 0
07-result          0.4621 / 0.4621 padX 0 padY 0
```

Six of six at exactly zero letterbox — the screens now reach the bezel on all four sides.

### 2. There was a doubled dynamic island

Three screenshots (Jogging ID, FanFunds, Mediassist) already contain a **status area with the notch
cut into the artwork**. The frame was also drawing its own island pill, so those three showed the
island twice. A top-strip inspection of all five phone assets confirmed no screenshot carries a
drawn device outline, only its own status bar.

**Fix:** the overlay island is gone. The frame is only a frame; the device detail comes from the
screenshot itself.

### 3. The laptop base touched the image edge

`w-[112%]` collapsed to 100% because the base is a flex item and the default `flex-shrink: 1` pulls
an over-wide item back to the container width — so the base was exactly as wide as the lid and ran
edge to edge inside the 16px mat padding (measured: base 538px, mat inner 538px).

**Fix:** the lid is now `w-[88%]` and the base `w-[106%] shrink-0`. Measured: lid 473px, base 501px,
base edge 35.5px from the mat edge, base 6px wider than the bezel on each side (a laptop foot, not a
plinth).

### 4. Nothing could drift outside the card on hover

The 6° card tilt is unchanged (it is a pre-existing compositor feature, not part of this task), but
it was measured at maximum tilt with the pointer in the card corner: the tilted artwork stays
strictly inside its own column with a clear gap to the neighbouring card, and the phone stays inside
its mat. No clipping wrapper was needed.

### Sizing rule now used for balance

A device occupies **88% of the mat along its dominant axis** — phones are limited by height, the
laptop by width. Equal *sizes* are never forced (the assets are 0.449–1.406 in ratio); only equal
breathing room is. Measured at 1440 (mat 572×715):

| Card | Device box | Gaps L/R/T/B |
| --- | --- | --- |
| SIPENELITIAN | 473×337 + base | 49/49/181/197 |
| FanFunds | 276×599 | 148/148/58/58 |
| Penagihan | 269×599 | 151/151/58/58 |
| Mediassist | 276×599 | 148/148/58/58 |
| Kick Swift | 277×599 | 148/148/58/58 |
| Jogging ID | 277×599 | 148/148/58/58 |

The phones land within 8px of each other in width despite five different asset ratios, which is what
"consistent without forcing equal size" looks like in numbers.

---

## Final verification

| Check | Result |
| --- | --- |
| Letterbox padding, all 6 | 0px / 0px |
| Card row heights, 1440 | 1147/1147 · 1147/1147 · 1121/1121 — **identical to before any mockup work** |
| Devices in DOM | 1 laptop (1.40625) + 5 phones (0.449–0.462) |
| CSS dynamic islands in production HTML | **0** |
| Card links | one link per card, all six slugs correct (`/work/sipenelitian-uaa` … `/work/jogging-id`) |
| Images loaded | 6/6 |
| Overflow past the mat | none (max −17px inside the border on every card) |
| 1440 light | six mats identical, laptop centred with ~34px side margin, no white slivers |
| 390 light | phone centred, ~69px side margin, frame intact |
| Dark 1440 | bezel `#2b2b31` + ring reads clearly against the near-black card |
| Hover, max tilt | artwork stays inside its column, no overlap with the neighbouring card |
| Vision review | "no white sliver, clipped edge, or duplicated frame/notch" on all three viewports |
| UX suite | **342 checks / 0 failures** |
| `npm run check` | 6 projects · 7 og · 10 seo — all pass |
| `next build` | exit 0; production `/work` HTML = 1 laptop frame + 5 phone frames + base at 106% |

## Honest notes

1. **The laptop card keeps air above and below** (181/197px vs 58/58 on the phones). A 16:11
   screenshot inside a 4/5 mat cannot fill it, and squeezing the mat flat would break the equal-height
   rows CL-7 fixed. The asymmetry is inherent to the aspect ratio, not a layout mistake — and it is
   the reason the laptop is limited by width rather than height.
2. **One screen per card, not a fan of three.** Three phones side by side in a 4/5 mat would shrink
   each to ~110px wide and make the UI unreadable; the full screenshot set is already shown in the
   case study body via `ProjectScreens`.
3. **Duplicate dev servers produced false failures twice in this task.** Running three `next dev`
   processes against one `.next` made `/about`, `/contact` and `/resume` return 404 and the suite
   reported 3 failures plus a SEO failure (375 checks / 3 failures). Killing every project node
   process, deleting `.next`, and starting one server returned **342/0** with the same code. No code
   was changed to "fix" those failures. The lesson is operational: one dev server, and never
   `next build` while `next dev` holds `.next`.

---

## Round 3 — independent re-verification (no code changes)

Re-ran everything from a clean state to confirm the result above is reproducible and not an artefact
of a stale build. No source file was edited in this round.

What was done: killed every project `node` process (two orphaned `next dev` stacks were found still
running on port 3001), deleted `.next`, then `npx tsc --noEmit` , `next build` and one
`next start -p 3000`.

| Check | Result |
| --- | --- |
| `tsc --noEmit` | exit 0, no output |
| `next build` | exit 0, 19/19 static pages generated |
| `npm run check:links` / `check:og` | pass (6 projects, 7 og checks) |
| `npm run check:seo` | **10/10 pass** against a single server on :3000 |
| UX suite (`scripts/run-ux-checks.sh`) | **342 checks / 0 failures** |
| Page errors in browser | 0 |
| All six case-study routes | 200 |
| Images loaded on `/work` | 6/6 |
| `app/globals.css`, `tailwind.config.ts`, `ProjectCover.tsx` | untouched (verified by `git status`) |

Measured mat/screen geometry at 1440×900 (mat **563×704**, inner 531×672, capturing a slightly
narrower column than Round 2's 572×715 because of scrollbar width):

| Card | Screen box | Screen ratio vs asset | Gap T / B |
| --- | --- | --- | --- |
| SIPENELITIAN (laptop) | 466×331 | 1.4063 / 1.4063 ✓ | 178 / 194 |
| FanFunds | 272×589 | 0.4613 / 0.4613 ✓ | 57 / 57 |
| Penagihan | 265×589 | 0.4493 / 0.4493 ✓ | 57 / 57 |
| Mediassist | 272×589 | 0.4613 / 0.4613 ✓ | 57 / 57 |
| Kick Swift | 272×589 | 0.4618 / 0.4618 ✓ | 57 / 57 |
| Jogging ID | 272×589 | 0.4621 / 0.4621 ✓ | 57 / 57 |

At 390×844 (mat 342×428): all six screens again match their asset ratio exactly, no horizontal
overflow, phones uniformly 156–160px wide.

Note on Round 2's gap figures (181/197 vs 58/58): they were taken at mat 572×715. Today's mat is
563×704, so the gaps read 178/194 vs 57/57. The 88% sizing rule and the zero-letterbox result are
identical in both; only the mat width differs.

### Why the laptop air is unavoidable (proved, not assumed)

A 1.4063 landscape screen can only reach the phones' shared 589px height if its width were
**809px** — but the mat's usable inner width is **531px**, short by 278px. So the laptop must be
limited by width, and the surplus becomes vertical air. Flattening the mat to remove it would change
the `aspect-[4/5]` box that all six cards share and break the equal-height rows.
