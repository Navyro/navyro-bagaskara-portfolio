# CL-8 — Small targets: verification

**Cluster:** interactive text was 17–20px tall because links were bare text with no padding — 15 on `/`,
12 on `/work`, 11 on a case study, 8 on `/contact` and `/resume`. Decision: **A (padding + negative margin
so the glyphs stay put and only the hit box grows)**, with B's graft for `View Case Study`. See
`docs/ux-visual/decisions/small-targets.md`.

Acceptance: every pointer target ≥24×24px at ≥768px and ≥44×44px at ≤767px, and adjacent hit boxes must not
overlap.

## What changed

### Two utilities in `app/globals.css` (components layer)

```css
@layer components {
  .tap,
  .tap-block { padding-block: .25rem; margin-block: -.25rem; }
  .tap { display: inline-flex; align-items: center; }
  .tap-block { display: block; }
}

@media (max-width: 767px) {
  .tap,
  .tap-block { padding-block: .875rem; margin-block: 0; }
}
```

Desktop: 8px of padding grows a 17px link to 25px, and the matching `-my-1` puts the layout back exactly
where it was. Mobile: 28px of padding grows it to 45px, and the margin is **not** cancelled, because a
cancelled 14px margin would make rows overlap by up to 16px.

`.tap-block` exists for elements that are stacked (footer lists, contact rows): the same padding, but
`display: block` so the row itself gets taller instead of a padding box floating over the next line. Where a
component already sets `flex` / `inline-flex`, the utility wins over the components layer, so the row layout
is untouched.

### Where it was applied

| Location | Before | After (1440 / 390) |
| --- | --- | --- |
| Navbar `RESUME` | 72×17 | 72×25 / desktop only |
| Navbar logo | 81×26 (mobile) | 81×46 |
| Theme toggle | 36×36 (mobile) | 36×36 / **44×44** |
| Menu button | 67×20 (mobile) | 67×44 |
| Footer nav + connect links | 52–138×17–20 | 342×48 on mobile, 25–28 on desktop |
| `View Case Study` (×3 home, ×6 `/work`) | 137×20 | 137×28 / 137×48 |
| `Lihat Semua Proyek`, `Lihat Detail Karir` | 179×20, 134×20 | 179×28 / 342×48 |
| `Selengkapnya Tentang Saya`, `Download Resume ↗` | 215×20, 138×20 | 48 tall on mobile |
| `KEMBALI KE DAFTAR PROYEK` | 213×17 | 213×25 / 213×45 |
| Prev / next project links | 441×17, 283×17 | 25 desktop, 45 mobile |
| `/contact` email, LinkedIn, WhatsApp rows | 276×26 | 276×34 / 276×54 |
| `/about` `Lihat & Unduh Resume` | 224×**43.6** | 224×44 (`min-h-11`) |

### One non-obvious fix: a dead link that looked alive

The footer rendered `<a href={profileData.github}>` even though `profileData.github` is `undefined` — the
markup produced an anchor with no `href`: it looks like a link, does nothing, and was invisible to a
`a[href]` target check. Removed; the row now renders only when the URL is real (`{profileData.github && …}`).
The user has no GitHub in the source material, so the footer shows only Email and LinkedIn.

## Assertion added

```
targets.no-overlap   no two visible targets' boxes intersect
```

Without it, the previous cluster's fix can be undone by a well-meant padding. Two exclusions, both
deliberate:

- **nested** anchors (`a` inside `a`) are not collisions — one box contains the other by design;
- pairs involving an element inside a `position: sticky | fixed` ancestor are skipped. The header is sticky,
  so any scrolled content passing underneath overlaps it geometrically; that is normal layering, not a
  broken target. The first version of the assertion reported 4 such false positives on `/work`@1440 before
  this rule was added.

## Measured

| Surface | doc height before | after | overlap |
| --- | --- | --- | --- |
| `/` @1440 | 6131 | **6131** | 0 → 0 |
| `/work` @1440 | 4527 | **4527** | 0 → 0 |
| `/work/fanfunds` @1440 | 6686 | 6690 (+4) | 0 → 0 |
| `/about` @1440 | 3858 | **3858** | — |
| `/contact` @1440 | 1594 | **1594** | — |
| `/resume` @1440 | 2945 | **2945** | — |
| `/` @390 | 10336 | 10525 (+189) | 0 → **0** |
| `/work` @390 | 7235 | 7491 (+256) | 0 → **0** |
| `/contact` @390 | 2503 | 2691 (+188) | 0 → **0** |

Desktop layout did not move, which is what the negative margins are for — that also means the fix **cannot**
be seen in a before/after screenshot, so it is verified from the DOM only. Mobile grew because targets there
grow for real; that is the intended trade (a 45px row instead of a 17px row with a 16px overlap).

`/work/fanfunds` is +4px on desktop: the prev/next row (`border-t pt-8`) contains `.tap` links whose 4px of
padding is cancelled by `-my-1`, but the flex row's height comes from the tallest item's margin box, so 4px
survives. Checked visually at 1440 — no visible shift.

## Suite

| Stage | Checks | Failures |
| --- | --- | --- |
| After CL-6 | 147 | 20 |
| After CL-8 | **165** | **2** |

The 18 extra checks are `targets.no-overlap` across 6 routes × 3 viewports. All target checks pass at all
three viewports. The 2 remaining failures are `cards.equal-height-in-row` on `/`@1440 and `/`@768 — CL-7,
untouched by this cluster.

## Visual check

`look_at_image` after the change:

- `/`@390 header — logo, 44×44 theme button and MENU are vertically centred, nothing clipped;
- `/`@390 footer — four navigation rows ~48px apart, no crowding, `CONNECT` starts after a clear gap;
- `/`@390 card — `View Case Study` sits ~40px below the description, reads as a separate action;
- `/contact`@390 — email card, WhatsApp row and LinkedIn row separated, no overlap.

## Still open in this area

- `<details>` summary on `/resume` is 56px tall — already compliant.
- `/work` filter chips (`All` 48×44, `Web` 61×44, `Mobile` 75×44) are already compliant at both
  viewports; no change was needed. Their *number* is a CL-10 question (four filters that can return an
  overlapping or near-empty list), not a size question.
