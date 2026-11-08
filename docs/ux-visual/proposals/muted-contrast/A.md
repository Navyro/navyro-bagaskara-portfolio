# CL-4 / A — Minimal: darken the muted token until it passes

## Change
Change one token pair in `app/globals.css`:

- light `--text-muted: #888888` → **`#6B6B6B`** (4.83:1 on `#F7F7F5`, 5.29:1 on `#FFFFFF`)
- dark `--text-muted: #71717A` → **`#9C9CA6`** (4.79:1 on `#17171A`, 5.63:1 on `#0E0E10`)

Nothing else changes: no layout, no sizes, no component edits.

## Before / after
- Before: 3.99:1 (light on background), 3.54:1 (light on surface), 3.70:1 (dark) — 18–21 nodes per page.
- After: ≥4.79:1 everywhere, both surfaces, both themes.

```
--text-muted  light            dark
before        #888888 3.99 ✗   #71717A 3.70 ✗
after         #6B6B6B 4.83 ✓   #9C9CA6 4.79 ✓
```

## Components / tokens / files
- `app/globals.css` (2 values). Nothing else.

## Effort
Two lines. Zero risk to layout.

## Risks
- Muted text becomes less "whispered": the visual gap between `--text-secondary` and `--text-muted`
  narrows (`#555` → `#6B6B6B`), so the three-level text hierarchy flattens slightly. Mitigated by
  relying on size/case for the third level, which the design already does.
- Any node sitting on a non-standard background (accent, inverse) must be re-checked.

## Acceptance criteria
`layout-audit.lowContrast` returns 0 informative nodes on all 7 routes in light and dark; every
remaining low-contrast node is decorative (bullet, divider, glare).
