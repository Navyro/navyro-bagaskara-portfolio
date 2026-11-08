# CL-6 / B — Restructure: a real type ramp in the design system, components stop choosing sizes

## Change
Move every text size out of components into a six-step ramp in `tailwind.config.ts`, and make
components use *semantic* classes:

| semantic | size / line-height | used by |
|---|---|---|
| `text-display` | 72 / 1.05 | hero name |
| `text-h1` | 48 / 1.1 | page titles |
| `text-h2` | 36 / 1.15 | section headings |
| `text-h3` | 20 / 1.3 | card titles, case-study section labels |
| `text-body` | 16 / 1.65 | paragraphs |
| `text-meta` | 12 / 1.4, tracking wide | meta rows, chips, labels |

Then: `SectionHeading` → `text-h2`; `ProjectCard` title → `text-h1` at `lg`, `text-h2` below;
`CaseStudySection` label → `text-h3`; chips → `text-meta`; `ProjectMeta` → `text-meta`. Remove every
`text-[11px]` and the surplus `text-lg/md:text-lg` overrides in `app/page.tsx`.

## Before / after
- Before: 22 combos, every component picks its own scale.
- After: 6 named steps; a page cannot drift because it has no sizes to choose.

```
screens  ┌──────────────────────────────────────────┐
         │ display 72                               │
         │ h1 48   ┌──────┬──────┐                  │
         │ h2 36   │ card │ card │  h3 20 (titles)  │
         │ body 16 │ body │ body │  meta 12 (chips) │
         └──────────────────────────────────────────┘
```

## Components / tokens / files
- `tailwind.config.ts` (`fontSize` entries with paired line-heights), `app/globals.css` (optional
  `@layer components` classes), then 9 components + 6 pages.

## Effort
~60 class swaps; the biggest diff of the three but the change is mechanical.

## Risks
- A 6-step ramp cannot express every current intent (the 18px case-study lead, the 60px contact CTA), so
  a few exceptions must be documented or the ramp feels arbitrary.
- Large diff → broad re-verification.

## Acceptance criteria
≤5 distinct sizes per page; no size below 12px; every component uses a semantic ramp class rather than a
raw `text-2xl`; section headings identical across pages.
