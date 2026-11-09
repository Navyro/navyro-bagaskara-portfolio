# CL-12 (404 one screen) + favicons — verification

## Part 1 — the 404 page

| viewport | before (`doc`/`win`, headline x) | after (`doc`/`win`, headline x) |
| --- | --- | --- |
| 1440×900 | 1140 / 900, x=479 | **900 / 900**, x=128 — no scroll |
| 1440×1080 | 1266 / 1080, x=479 | **1080 / 1080**, x=128 — no scroll |
| 1366×768 | 1140 / 768 | 841 / 768 (73px — footer content only) |
| 768×1024 | 1502 / 1024 | 1100 / 1024 (footer content only) |
| 390×844 | 1551 / 844 | 1404 / 844 (footer content only) |

Headline left edge now equals the navbar content edge at every width (128 / 128 at 1440, 24 / 24 at
390 and 768). Both exits sit at y≈364 on desktop — no scrolling needed to act.

The `1366×768` / tablet / phone rows still scroll, and that is correct rather than unfinished: the
site footer alone is 433px (891px stacked on a phone), so on a 768px-tall screen the footer cannot
fit under any 404 design. The assertion therefore separates the two facts — `no-blank-scroll` only
fails when the overflow *exceeds* the footer, which is exactly the old 240px void.

### What the four assertions measure

```
notfound.exits-in-view      both exits above the fold, measured from scroll 0
notfound.no-forced-height   main <= max(content, viewport - header - footer) + 8
notfound.no-blank-scroll    scrollHeight - innerHeight <= footer height
notfound.left-grid          |h1.left - navbar link.left| <= 2
```

Two measurement traps hit while writing them, both fixed rather than papered over:

1. The suite scrolls to the bottom to settle reveals, so the first version measured exits at
   `bottom = -87` (above the viewport). The block now scrolls to `top: 0` before measuring.
2. Comparing `h1` *centre* to the page centre failed at 390 because a block-level `h1` spans the
   full column even when its text is left aligned — the box centre is the page centre. It now
   compares left edges against the navbar, which is the claim that actually matters.

## Part 2 — favicons

There was no favicon: browser tabs, bookmarks and "add to home screen" showed a blank page glyph.

| Artefact | Size | Weight |
| --- | --- | --- |
| `app/icon.png` | 512×512 | 5.6 KB |
| `app/apple-icon.png` | 180×180 | 3.2 KB |

Rendered from `scripts/icon.html` by `scripts/build-icons.cjs` (`npm run build:icons`): Manrope 800
"NB" in white on the site accent `#1F4FFF`, full-bleed square. Chromium again, not sharp — sharp's
SVG text path falls back to a serif for the webfont, which would have baked a wrong typeface into
the most-seen asset on the site. The script refuses to write if Manrope did not load, if the frame
is not exactly 512×512, if anything overflows, or if the mark is under 200×120 (illegible at 16px).

Verified:

| Check | Result |
| --- | --- |
| `<link rel="icon">` in served HTML | `/icon.png?f4c80042…` type=image/png sizes=512x512 |
| `<link rel="apple-touch-icon">` | `/apple-icon.png?ffabfd63…` sizes=180x180 |
| `/icon.png`, `/apple-icon.png` | 200, `image/png`, 5767 / 3327 bytes |
| PNG header dimensions | 512×512 and 180×180 (read from IHDR in the gate) |
| 16px legibility | downscaled to 16 then blown up: both letters still separable, no blob |
| New gate | `icons.present` in `npm run check:seo`; deleting `app/apple-icon.png` makes it fail with "run npm run build:icons" |

## Suite

| Stage | Checks | Failures |
| --- | --- | --- |
| Before this round | 237 | 0 |
| After `/nope` added to the runner | 285 | 3 → 0 |

The 3 transient failures were `reveal.no-js-safe` on the 404 route: that check demanded at least
one reveal target, and the 404 page has none. The invariant is "nothing hidden", which is also
true when there is nothing to hide, so the guard was corrected to `hidden === 0`, not deleted.

Final: **285 checks / 0 failures**, `npm run check` 3 gates green (6 projects, 7 og checks, 9 seo
checks), `next build` exit 0.

## Still open

CL-9 (section numbering), CL-10 (`/work` filter wording), and a web app manifest — deliberately not
added here: a manifest needs real theme colours and a maskable icon variant, and a which-is-wrong
manifest is worse than none. Next cheapest step is a `manifest.ts` plus a 512px maskable icon from
the same source.
