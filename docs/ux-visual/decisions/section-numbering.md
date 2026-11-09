# CL-9 — case-study section numbers skip

**Finding:** C-3. Section titles were hardcoded strings (`"07. Usability Testing & Iteration"`)
authored next to the data, while `CaseStudySection` returns `null` when a section has no copy.
Four of six projects have no usability-testing text, so the visible sequence read `01 02 04 05 06
08 09` (mediassist) and `01 02 05 06 08` (jogging-id).

**Measured before** (headline numbers read from the rendered DOM):

| project | headings |
| --- | --- |
| sipenelitian-uaa | 01 02 03 04 05 06 07 08 09 |
| fanfunds | 01 02 03 04 05 06 07 08 09 |
| mediassist | 01 02 **04** 05 06 **08** 09 |
| jogging-id | 01 02 **05** 06 **08** |

## Proposals

### A — Number by rendered position *(chosen)*

One ordered array of section definitions; `Array.filter(sectionHasContent)`; the index provides
`String(i + 1).padStart(2, "0")`. The predicate lives next to the component that renders
(`export function sectionHasContent`) so "renders" and "is numbered" cannot drift apart.

- Passes: C-3 completely, on all six projects and on any future project with missing copy.
- Cost: one small refactor of the page body; no visual change.
- Risk: low. Numbers stop being data, which is correct — a number is positional, not content.

### B — Fill in the missing `testing` copy for all six projects

Would also close the gap, and a case study without testing *should* say why.

- Rejected for now: that is authoring, not fixing, and it would need facts the source material
  does not contain. Writing "kami melakukan usability testing" for projects where no testing was
  recorded would be fabricated content (C1). It stays a content task for the owner.

### C — Blank out numbers instead of computing them

Delete the numbers from the titles and keep the flat list.

- Rejected: numbering is a real reading aid on a 7–9 section page, and the site already uses
  `01 … 06` numbering for projects. Removing it would create an inconsistency instead of fixing one.

## Scoring

| Criterion (weight) | A | B | C |
| --- | --- | --- | --- |
| Correct on every project, now and later (0.4) | 3 | 3 | 3 |
| Does not invent content (0.25) | 3 | 0 | 3 |
| Keeps the reading aid (0.2) | 3 | 3 | 1 |
| Cost / risk (0.15) | 3 | 1 | 3 |
| **Weighted** | **3.00** | **1.75** | **2.45** |

## Implemented (A)

- `components/CaseStudySection.tsx` exports `sectionHasContent()`, takes an optional `number`, and
  renders `data-case-section` + `data-section-number` so the assertion has something to read.
- `app/work/[slug]/page.tsx` builds the section list once (the merged
  `informationArchitecture + userFlow` string and the gallery children included), filters it, then
  numbers by index.
- New assertion `casestudy.section-numbers`: numbers must equal `01..N` **and** each `h3` must
  start with its own number. Runner now visits `/work/mediassist` as well as `/work/fanfunds`,
  because fanfunds has every section and therefore could never have caught the original gap.
- Proven to bite: forcing `index + 2` turns 6 checks red with `numbers 02 03 … · expected 01 02 …`.
