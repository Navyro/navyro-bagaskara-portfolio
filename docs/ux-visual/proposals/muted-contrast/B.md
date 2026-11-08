# CL-4 / B — Restructure: split the role of the token — text vs decoration

## Change
The token is doing two jobs and doing one of them badly. Split it:

- **`--text-tertiary`** (new, accessible 4.8:1+) for anything that carries information: project meta
  rows, section numbers, resume section headers, card captions, `FILTER:` label.
- **`--text-muted`** (keep `#888888`) for non-informative decoration only: separators `•`, dividers,
  placeholder bullets.

Then apply the split across the components that render the 18–21 offending nodes: `ProjectCard`,
`SectionHeading`, `ProjectMeta`, `SkillGroup`, `ContactPage` cards, `ResumePage` headers, `WorkPage`
filter label. Chips move from `text-[11px] text-text-secondary` up to the tertiary token with the new
size floor (see CL-6).

## Before / after
- Before: one token, two incompatible jobs, 3.54–3.99:1 on text.
- After: decoration stays quiet; information becomes legible. The visual hierarchy is *clearer*, not
  flatter, because size and case now do the work instead of illegibility.

```
semantic level      token            contrast     used for
1 primary           --text-primary   16.1 : 1     headings, body
2 secondary         --text-secondary  7.4 : 1     descriptions
3 tertiary  (new)   --text-tertiary   4.8 : 1     meta, labels, numbers
4 decoration (only) --text-muted     3.99 : 1     • separators, rules
```

## Components / tokens / files
- `app/globals.css` + `tailwind.config.ts` (new `text-tertiary` colour).
- `ProjectCard`, `SectionHeading`, `ProjectMeta`, `SkillGroup`, `app/contact/page.tsx`,
  `app/resume/page.tsx`, `app/work/page.tsx`, `ExperienceItem`.

## Effort
~20 class swaps across 8 files + 1 token.

## Risks
- More tokens = more places to drift; needs a documented rule for which token is which.
- Larger diff than A, so more surfaces to re-screenshot.

## Acceptance criteria
0 informative low-contrast nodes; each token has exactly one documented meaning; the rendered hierarchy
of a project card still reads title > meta > decoration at a glance.
