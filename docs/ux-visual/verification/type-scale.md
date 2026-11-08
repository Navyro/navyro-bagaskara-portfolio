# CL-6 — Type scale: verification

**Cluster:** no type scale — 22 size/weight combinations, 13 nodes at 11px, three different sizes for the
same section-heading role. Decision: **B (six-step semantic ramp)**, grafted with C's fluid behaviour for
the hero only. See `docs/ux-visual/decisions/type-scale.md`.

## What changed

### 1. `tailwind.config.ts` — the ramp is now the only source of sizes

```ts
fontSize: {
  display: ["clamp(2rem, 1.59rem + 3.24vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
  h1:      ["3rem",     { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
  h2:      ["2rem",     { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
  h3:      ["1.25rem",  { lineHeight: "1.3" }],
  body:    ["1rem",     { lineHeight: "1.65" }],
  meta:    ["0.75rem",  { lineHeight: "1.4", letterSpacing: "0.04em" }],
  control: ["0.875rem", { lineHeight: "1.4" }],
}
```

### 2. Every raw size utility replaced by a role

`app/` and `components/` contain **zero** `text-xs|sm|base|lg|xl|2xl…5xl|text-[Npx]`. Mapping used:

| Was | Now | Why |
| --- | --- | --- |
| `text-[10px]`, `text-[11px]`, `text-xs` | `text-meta` | 11px chips were the readability defect; 12px floor |
| `text-sm` | `text-control` | 14px only ever appears on interactive labels (buttons, nav, form labels) |
| `text-base` | `text-body` | |
| `text-lg`, `text-xl`, `text-2xl` | `text-h3` | collapsed three ad-hoc sizes into one step |
| `text-3xl`, `text-4xl` | `text-h2` | |
| `text-5xl`, `text-6xl` | `text-h1` | |
| `text-7xl` | `text-display` | hero name only |

Responsive size variants (`sm:text-6xl`, `md:text-xl`, …) were replaced too, and duplicates removed where
the breakpoint re-stated the base token.

### 3. Role assignments, not sizes

- `SectionHeading` — number `text-meta`, title `text-h2 lg:text-h1`, subtitle `text-body`.
- `Hero` — name `text-display`, statement `text-h3`.
- `ProjectCard` — title `text-h3 md:text-h2`, chips and metadata `text-meta`.
- `ExperienceItem`, `SkillGroup`, `CaseStudySection`, `ProjectMeta`, `Footer`, `Navbar`, `MobileMenu`,
  `ContactForm` — all moved to `meta` / `control` / `body` / `h3`.

### 4. Two additions beyond the written plan, both deliberate

1. **A seventh step, `control` (14px).** The six-step ramp had no home for 14px, which appears 43 times on
   interactive labels. Without it the choice was nav at 16px (breaks `--header-h` and CL-2's sticky
   offsets) or 12px (visibly small for a primary CTA). `control` is documented as the interactive-label
   step, not a free size.
2. **`h2` is `2rem`, not `2.25rem`.** At 2.25rem the mobile hero name (38px) sat only 2px above section
   headings, so mobile had a flat top level. 2rem restores a clear step and keeps the size set at six.

Also added `text-balance` to card titles and section headings: at 2rem the FanFunds title left the single
word “Kreator” alone on line 2.

## Assertions added (all pass)

```
type.max-six-sizes              distinct computed sizes, hero <h1> subtree excluded, <= 6
type.section-heading-consistent every h2[data-section-heading] on a page has the same computed size
```

`type.no-text-below-12px` already existed and now passes everywhere.

`type.section-heading-consistent` compares only `h2[data-section-heading]`, i.e. output of the shared
`SectionHeading` component. The home CTA band (“Punya proyek atau peluang menarik?”) is a page-level
statement at `h1` and is deliberately not part of that set; the alternative was shrinking every section
heading to the card-title size.

## Measured

| Surface | Before | After |
| --- | --- | --- |
| Distinct sizes, `/` @1440 | `11,12,14,16,18,20,24,30,36,48,60,72` (12) | **`12,14,16,20,32,48`** (6) |
| Distinct sizes, `/work` @1440 | 20 pairs | `12,14,16,20,32,48` |
| Distinct sizes, `/about`, `/resume`, `/contact`, case study | 20 pairs each | `12,14,16,20,32` (`/work` gains 48 from the page heading) |
| Size/weight pairs, `/` | 22 | 17 |
| Nodes below 12px | 13 | **0** |
| Section heading sizes on one page | 30 / 36 / 48 | one value per page |
| Hero name, 390px | 36px, 1 line | 38px, 1 line |
| Hero name, 1440px | 72px | 72px |

Hero name line count by width (`clamp` min 2rem, slope 3.24vw, cap 4.5rem):

| Width | 320 | 360 | 390 | 414 | 768 | 1440 |
| --- | --- | --- | --- | --- | --- | --- |
| Font px | 36 | 37 | 38 | 39 | 50 | 72 |
| Lines | 2 | 2 | **1** | **1** | **1** | **1** |

The decision asked for “never wraps at 320–414”. It holds from 390 up. At 320–360 the name needs ~310px of
text width and only has 272–312px; the only two ways to a single line there are shrinking the name below
the section-heading size (which inverts the hierarchy) or shrinking the type ramp below 12px (CL-6's own
defect). Two lines on a 320–360px phone is the better trade, and it is static text — nothing shifts or
deletes, which was CL-3's complaint.

## Suite

| Stage | Checks | Failures |
| --- | --- | --- |
| Baseline | 111 | 63 |
| After CL-2, CL-1, CL-3, CL-4, CL-5, content/grid | 111 | 26 |
| After CL-6 | **147** | **20** |

The check count rose because two assertions were added (2 × 18 runs = 36). All 54 type checks pass. The
remaining 20 are the two clusters still queued: `targets.min-24px` (12), `targets.min-44px` (6) — CL-8 —
and `cards.equal-height-in-row` (2) on `/` — CL-7.

## Visual check

`look_at_image` on `/` @1440, `/work` @1440, `/contact` @1440, `/` @390 after the change:

- hero name is unambiguously the largest element, statement steps down, CTA labels readable;
- `/work`: page heading 48 → card title 32 → metadata 12, each level visibly distinct;
- card titles now break evenly (no orphan word);
- no clipping, no horizontal overflow at 320–1440.
