# Findings — `/resume`

## Verdict

**1440x900 (light)** — `shots/1440x900-full.png`
The layout itself is the strongest of the content pages: a single document card, consistent rules
between sections, dates right-aligned against the titles, skill chips wrapping in one row, and a
clear blue primary action ("Unduh Resume PDF") that is unambiguous about what it does.

The problem is what the action delivers. **The PDF is a 932-byte placeholder stub** — a valid PDF
header with one empty page, not a CV. The on-screen CV is also essentially `/about` again.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| R-1 | component | "Unduh Resume PDF" | `href="/Navyro_Bagaskara_CV.pdf"` resolves to a real 200 but the file is **932 bytes** — `%PDF-1.4` with `Title (Navyro Bagaskara CV)` and one page containing no resume content. Downloading it yields a blank document. | C3, I3 | `curl` → 200, `size_download=932`; file head shows empty page tree | P1 | measured |
| R-2 | page | Whole page | Repeats `profileData.fullBio`, all 3 experience entries, education and all 18 skill tags — the same content as `/about`, with no print-only framing, no PDF preview and no differentiation. | C2, D5 | section list identical to `/about` | P2 | measured |
| R-3 | component | Section labels (`RINGKASAN KUALIFIKASI`, `PENGALAMAN KERJA`, dates) | `#888888` at **3.54:1** — 8 nodes, all informative. | A1 | `lowContrast` 8, ratio 3.54 | P2 | measured |
| R-4 | page | Contact line in the document header | Shows the placeholder email and a LinkedIn URL typed as literal text (`linkedin.com/in/navyrobagaskara`) while `/contact` uses the same fabricated handle. | C1 | rendered text | P3 | observed |

## Excellent as is

- Document-scale typography: one card, one column, rules between sections — reads like a CV rather than a landing page (P1, D1).
- Dates right-aligned to the same edge as achievement bullets; skill chips wrap without overflow (H6).
- Download is the single high-emphasis action on the page; nothing competes with it (H1).
- No horizontal overflow, no content clipped at 390/768/1440.
