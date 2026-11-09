# CL-10 — the `/work` filter cost a decision and returned one item

**Findings:** W-1, W-2, W-3.

**Measured before:** three buttons (`All`, `Web`, `Mobile`) over six projects: `Web` → 1 card,
`Mobile` → 5, `All` → 6. State lived in `useState`, so the filtered view had no URL and could not
be shared or linked; the page never said how many results a choice produced.

The acceptance criteria for this cluster were: *if the filter remains*, it must (a) state the
result count, (b) appear in the URL, (c) only be shown when `projects.length` justifies it.

## Proposals

### A — Remove the filter, state the fact it stood in for *(chosen)*

Delete the buttons and the client component; render the page on the server with one line derived
from the data: `6 proyek · 1 web · 5 mobile`.

- Satisfies (a) the number is now always visible, (b) nothing to share because nothing is hidden —
  `/work` is the complete list, (c) the control is gone, which is what "only when justified" means
  for a 6-item index with a 5/1 split.
- Side benefits: `/work` becomes a static route (no `useState`, no client bundle for the page
  shell), every card is in the server HTML, and there is one less interactive surface to keep
  accessible.
- Cost: a visitor who specifically wants only the web project has to scan six cards. At six items
  that is one screen.

### B — Keep the filter, make it URL-driven and counted

`?kategori=mobile`, a `results` count next to the buttons, and `aria-live` on the result count.

- Satisfies (a) and (b); (c) still argues against it: two categories where one holds 5 of 6 items
  is not a segmentation, it is a coin flip with one face.
- Real cost too: the page stays a client component, so a shared link needs client-side reading of
  `searchParams` and the cards leave the server HTML again.

### C — Keep a filter but re-cut the categories by discipline

Replace platform with something meaningful (e.g. `Riset`, `Desain`, `Pengembangan`).

- Rejected: each of the six projects spans several of those, so the taxonomy would be either
  duplicated tags or a fiction. Platform is at least true; discipline is not exclusive here.

## Scoring

| Criterion (weight) | A | B | C |
| --- | --- | --- | --- |
| Acceptance (a) (0.2) | 3 | 3 | 2 |
| Acceptance (b) (0.15) | 3 | 3 | 2 |
| Acceptance (c) (0.25) | 3 | 1 | 1 |
| Honest about what the data supports (0.25) | 3 | 2 | 1 |
| Cost / risk (0.15) | 3 | 1 | 1 |
| **Weighted** | **3.00** | **1.95** | **1.30** |

## Implemented (A)

- `app/work/page.tsx` is now a server component: no `useState`, no filter, no empty-state card
  (unreachable once every project always renders).
- Count line: `{projectsData.length} proyek · {breakdown}` where `breakdown` is reduced from
  `project.category`, so the sentence cannot disagree with the grid. It carries
  `data-work-count-value` for the assertion.
- New assertions: `work.count-matches-cards` (declared number == number of distinct `/work/...`
  links) and `work.no-dead-end-filter` (0 `[aria-pressed]` controls on the index; a regression
  guard so the filter is not quietly reintroduced without the URL + count work).

**Not changed:** the six project cards still show their platform label, so the information the
filter used to reveal is still on screen — it just is not a decision any more.
