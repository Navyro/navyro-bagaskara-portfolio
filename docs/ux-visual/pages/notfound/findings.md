# Findings — `404` (`/not-found`)

## Verdict

**1440x900** — `shots/1440x900.png`
A short, honest error page: big `404`, plain sentence, two ways out (home + portfolio). Nothing
misleading. Two small gaps: the page still scrolls 237px on a 900px viewport (so the footer sits
partly below the fold on an otherwise one-glance page), and the page is not branded to match the
site's editorial rhythm — it is centred while every other page is left-aligned.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| N-1 | page | Whole page | `pageScrollY = 237` at 1440×900, driven by `min-h-[70vh]` + header + footer. An error page should resolve on one screen. | L1, D2 | `viewport.pageScrollY 237`; `main` fill 7% of 630px | P3 | measured |
| N-2 | page | Alignment | Centred composition contradicts the left-aligned editorial grid used by every other page. | H5, L4 | capture vs `/` capture | P3 | observed |

## Excellent as is

- Error text says what happened and what to do, in the user's language, without a stack trace (I3, C1).
- Two exits (`Beranda Utama`, `Lihat Portofolio`) with a clear primary/secondary split (H1).
- HTTP status is a real 404, no soft-404 (verified with curl on `/halaman-tidak-ada`).
