# CL-8 / A — Minimal: give the text links a real hit area

## Change
Keep every label and its position; add padding and a negative margin so the visual stays identical while
the target grows to ≥24px (pointer) / ≥44px (touch).

- `components/ProjectCard.tsx` "View Case Study": `py-2 -my-2` plus `px-1 -mx-1` (20px → 36px tall).
- `components/Navbar.tsx` "RESUME": `py-1.5 -my-1.5` (16px → 28px).
- `components/Footer.tsx` nav/connect links: `py-1 -my-1` (17px → 33px).
- `app/page.tsx` "Lihat Semua Proyek", "Lihat Detail Karir", "Selengkapnya Tentang Saya",
  "Download Resume ↗": `py-2 -my-2`.
- Focus ring offset already global; nothing else changes.

## Before / after
- Before: `RESUME` 72×16, `View Case Study` 137×20, footer links 138×17 — 15 targets under 24px on `/`.
- After: every one ≥28px tall on desktop; `py-3 -my-3` under 767px for ≥44px touch.

```
BEFORE                AFTER
┌────────────┐        ┌ ─ ─ ─ ─ ─ ─ ─ ─ ┐  hit box 36px
│ View Case →│ 20px   │  View Case →    │ ← glyph row 20px
└────────────┘        └ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

## Components / tokens / files
- `ProjectCard`, `Navbar`, `Footer`, `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.

## Effort
~18 class changes, zero markup restructure.

## Risks
- Negative margins next to existing `gap`/`space-y` can make two stacked link rows overlap their hit
  areas. Needs a per-location check rather than a blanket rule.
- Increases the chance of accidentally widening a link's clickable area onto neighbouring text.

## Acceptance criteria
Every anchor's own box ≥24×24px at ≥768 and ≥44×44px at ≤767; no two adjacent hit boxes overlap.
