# CL-12 — the 404 page: forced height, centred grid

**Findings:** N-1 (page scrolls 237px on a one-glance screen), N-2 (centred composition breaks the
left-aligned editorial grid).

**Measured before:** at 1440×900 → `doc 1140 / win 900`, `main 630` (from `min-h-[70vh]`),
content block only 235 tall, footer 433. So ~240px of the scroll was emptiness invented by a
fixed viewport slice, and the headline sat at x=479 while every other page starts at x=128.

## Proposals

### A — Delete the forced height, move onto the editorial grid *(chosen)*

Wrapper becomes `flex-1` only (no `min-h-*`), content left-aligned in `max-w-editorial` with the
same `px-6 lg:px-12` as the navbar and footer. Copy tightened so the block is 235px, which leaves
`main = 390 = 900 − 77 (header) − 433 (footer)` — the page fills the viewport and stops there.

- Passes: N-1 fully, N-2 fully. No new components; one file.
- Costs: the paragraph loses one clause, and the headline drops "Sepertinya" to fit one line.
- Risk: none to other routes — the file is only rendered by `not-found.tsx`.

### B — Keep the centred composition, just compress the padding

Change `min-h-[70vh] py-20` to `py-12`. Saves ~160px, still scrolls ~80px at 900, and every other
page keeps a left edge this one does not share.

- Passes: neither finding completely. Rejected: it fixes the symptom the finding named and ignores
  the one it described as the cause of the page feeling off-brand.

### C — Full-bleed branded error hero (big 404 numeral, accent wash, same exits)

Visually the strongest option, and genuinely tempting for the one page a lost visitor lands on.

- Rejected for now: needs a new visual idea that exists nowhere else on the site (the site has no
  display-numeral treatment), so it becomes a design decision of its own rather than a P3 cleanup.
  It is recorded here in case the site later adopts oversized numerals for section openers (CL-9).

## Scoring

| Criterion (weight) | A | B | C |
| --- | --- | --- | --- |
| Fixes N-1 (0.3) | 3 | 1 | 3 |
| Fixes N-2 (0.25) | 3 | 0 | 2 |
| Consistency with the rest of the site (0.2) | 3 | 2 | 2 |
| Cost / risk (0.15) | 3 | 3 | 1 |
| Preserves the honest, plain tone (0.1) | 3 | 3 | 2 |
| **Weighted** | **3.00** | **1.45** | **2.35** |

## Implemented (A)

`app/not-found.tsx`:

- wrapper: `mx-auto flex w-full max-w-editorial flex-1 flex-col justify-center px-6 py-10 lg:px-12 lg:py-12`
  and a `data-not-found` hook for the assertions.
- eyebrow `404 — Halaman tidak ditemukan`, `h1` at `text-h1` reading "Halaman ini tidak ada.",
  one clause of context, then the two exits. Primary is now the accent-filled button (it was
  `bg-text-primary`, i.e. black in light mode — the same action that is accent-blue everywhere
  else on the site).

`tests/ux/layout.assertions.js` — four independent claims, plus `/nope:not-found` added to
`scripts/run-ux-checks.sh` so the route is actually visited:

| assertion | what it forbids |
| --- | --- |
| `notfound.exits-in-view` | any exit below the fold (measured from scroll 0) |
| `notfound.no-forced-height` | `<main>` taller than its content unless it is filling leftover space |
| `notfound.no-blank-scroll` | overflow larger than the footer, i.e. scrolling into emptiness |
| `notfound.left-grid` | a headline whose left edge differs from the navbar content edge by >2px |

Proven to bite: restoring the old markup (`min-h-[70vh]`, centred) turns the suite red with 5
failures across exactly the two defects (headline at 479.8 vs nav 128; `main` 716.8 vs leftover
239.2). Restoring the fix returns 12/12.
