# CL-6: No type scale — 22 size/weight combinations and 11px text

## Problem
Every component picks its own text size. Measured on `/` at 1440: **22 distinct size/weight pairs**
(`11/600, 12/400, 12/600, 12/700, 14/400, 14/500, 14/600, 14/700, 16/400, 16/800, 18/400, 18/700, 20/600,
20/700, 20/800, 24/400, 30/700, 36/700, 48/800, 60/800, 72/300, 72/800`), 20 on `/work` and `/about`.
Thirteen nodes render at **11px** (project tag chips). Section headings come in three different sizes for
the same semantic role depending on which page calls `SectionHeading` (`text-3xl sm:text-4xl lg:text-5xl`
vs `text-3xl sm:text-4xl` vs `lg:text-5xl`).

Findings: H-5, plus the 11px subset of W-5. Evidence: `type.n` and `type.sizes` in every
`pages/*/audit*.json`.

Acceptance criteria: ≤5 distinct text sizes per page excluding the hero display size; no text below 12px;
one heading ramp applied by `SectionHeading` on every page.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | Raise the 11px floor to 12px and collapse the section ramp | 27 / 35 · 23 / 35 · 22 / 30 |
| B Restructure | Six-step semantic ramp (`display/h1/h2/h3/body/meta`) in config; components stop choosing sizes | **33 / 35** · **35 / 35** · 28 / 30 |
| C Convention | Fluid `clamp()` modular scale, breakpoint-free | 26 / 35 · 30 / 35 · 23 / 30 |

## Decision
**B**, grafted with C's fluid behaviour for the hero only: `text-display` uses
`clamp(2.5rem, 1.6rem + 4.4vw, 4.5rem)` so the name never wraps at 320–414 (which is what made CL-3's
shift visible). All other steps stay discrete.

Rejected A: it moves the number from 22 to 15 and leaves the real defect — that each component invents a
size — untouched, so the next component will invent another one. Rejected C: `clamp()` on every step makes
768px land between designed sizes, and this design is deliberately stepped at that breakpoint; it also
increases risk for the same acceptance criteria B meets.

## Why this is the best
- **Against A**: A cannot reach "≤5 sizes per page" because the callers still choose. B removes the
  choice, so the criterion holds structurally rather than statistically.
- **Against C**: B is verifiable by grep (no raw `text-2xl` on a text node) and by measurement (≤5 sizes),
  while C trades determinism for smoothness the design does not ask for.
- **Norms satisfied**: H3 (a small set from the system, clear steps, ≤5 per screen), D1 (body 16/1.65,
  meta 12/1.4, display 72/1.05 — each matched to its surface), A4 (nothing below 12px), H5 (the same
  semantic role looks the same on every page).
- **Costs and what it rules out**: a six-step ramp cannot express the current 18px case-study lead or the
  60px contact headline, so those two become documented exceptions (`text-h2`/`text-h1` at a larger step)
  rather than free-form sizes. The diff is the largest of the eight clusters and needs a full re-check.

## Implementation plan
1. `tailwind.config.ts` → `theme.extend.fontSize`:
   ```
   display: ["clamp(2.5rem, 1.6rem + 4.4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }]
   h1:      ["3rem",   { lineHeight: "1.1"  }]
   h2:      ["2.25rem",{ lineHeight: "1.15" }]
   h3:      ["1.25rem",{ lineHeight: "1.3"  }]
   body:    ["1rem",   { lineHeight: "1.65" }]
   meta:    ["0.75rem",{ lineHeight: "1.4", letterSpacing: "0.06em" }]
   ```
2. `components/SectionHeading.tsx`: title → `text-h2`; number → `text-meta font-bold uppercase`.
3. `components/ProjectCard.tsx`: title → `text-h1 lg:text-display` is too much — use `text-h2` at `md+`,
   `text-h3` below… final: `text-[1.75rem] lg:text-h2` is not allowed by the ramp; use `text-h2` with
   `md:text-h1`; chips → `text-meta`.
4. `components/ProjectMeta.tsx`, `SkillGroup`, `ExperienceItem`, `CaseStudySection`: → `text-meta` /
   `text-body` / `text-h3`.
5. Pages: delete every `sm:text-* md:text-* lg:text-*` **size** class on text nodes (keep layout ones).
6. `components/Hero.tsx`: `h1` → `text-display`; statement → `text-lg md:text-xl` may remain as the one
   documented exception, or move to `text-body` + `text-h3` above `md`. Choose `text-lg md:text-h3`.

## Test plan
- Failing-first: count distinct `fontSize + fontWeight` pairs on `/`, `/work`, `/about`, `/resume` → assert
  `<= 6` (hero display counted separately) and assert no computed `fontSize < 12px` → fails today
  (22 pairs, 11px present).
- Assert every section heading on `/`, `/about`, `/work` has identical computed `fontSize` at 1440.
- Assert grep: no `text-[11px]` and no `text-2xl|text-3xl|text-4xl|text-5xl` on text nodes in
  `components/` and `app/`.
- Visual: `look_at_image` on `/` and `/work` at 1440 — confirm the hierarchy still steps clearly.
