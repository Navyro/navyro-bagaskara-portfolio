# CL-13 (no-JS-safe reveals) + SEO bundle — verification

Two pieces of work share one commit because they touch the same three files
(`app/layout.tsx`, `app/globals.css`, `tests/ux/layout.assertions.js`).

---

# Part 1 — CL-13: content no longer depends on JavaScript to be visible

## The defect, measured

| Route | Elements server-rendered with `style="opacity:0"` (before) |
| --- | --- |
| `/` | 24 |
| `/about` | 16 |
| `/work` | 8 |
| `/work/fanfunds` | 1 |
| `/contact` | 4 |
| `/resume` | 2 |

`ScrollReveal` used framer-motion `initial={{ opacity: 0 }}`, and framer writes that initial
state into the server-rendered HTML. If the bundle fails, is blocked, or JS is off, the page
looked like a header and a footer with empty space between them. The hero had the same problem
through three `motion.div`/`motion.p` entrance animations.

## The fix: CSS owns the hidden state, and only when JS proves it is alive

1. `app/layout.tsx` `<head>` runs one inline script **before first paint**:
   `document.documentElement.classList.add("reveal-ready")` plus a 2.5s failsafe that removes
   the class again unless `window.__revealAlive` was set by a mounted component.
2. `app/globals.css` hides reveal targets **only** under `.reveal-ready`:
   `.reveal-ready [data-reveal]:not([data-revealed]) { opacity: 0 }`.
3. `components/ScrollReveal.tsx` no longer uses framer-motion. It renders a plain visible
   `<div data-reveal>`, sets `data-revealed` when an IntersectionObserver fires (same 40px
   margin, same 0.55s easing, same per-item delay through `transition-delay`), and reveals
   immediately when `prefers-reduced-motion: reduce`.
4. `components/Hero.tsx` entrance animations became a CSS `@keyframes rise-in` (`.rise`,
   `.rise-1`, `.rise-2`). A CSS animation needs no JavaScript, so the hero copy cannot go blank.

Failure modes this covers:

| Scenario | Result |
| --- | --- |
| JS disabled by the user | `.reveal-ready` never added → everything visible |
| Chunk 404 / blocked by an extension | failsafe removes the class after 2.5s → everything visible |
| Hydration crashes before scroll | same failsafe path |
| Normal visitor | identical reveal animation, no layout change |
| `prefers-reduced-motion` | no animation, everything revealed on mount |

## Verified

| Check | Result |
| --- | --- |
| Inline `opacity:0` in server HTML, all 6 routes | **0** (was 24/16/8/1/4/2) |
| Dead-bundle simulation (no `.reveal-ready`, no `data-revealed`, transitions off) | **0 hidden, 0 displaced** out of 21 targets on `/` |
| With JS, after scrolling the page | **21/21 revealed**, 0 hidden |
| Document heights at 1440 (before → after) | 6188 / 3916 / 4527 / 6766 / 1594 / 2945 — **all identical**, no layout shift |
| Reduced motion (`set media reduced-motion`) | 21/21 revealed immediately, `transition-duration ≈ 0`, hero `animation-name: none` |
| New assertion | `reveal.no-js-safe` — 18 checks (6 routes × 3 viewports), all pass |

Note: the first probe reported 17 hidden because it scrolled with `scroll-behavior: smooth`;
scroll events never settled. The suite sets `scrollBehavior = auto` for exactly this reason. The
component was fine — the measurement was wrong, and re-running it correctly is what changed the
verdict.

---

# Part 2 — SEO and the skip link

## What was added

| File | Purpose |
| --- | --- |
| `lib/site.ts` | Single source of the absolute origin + title/description/OG constants. `metadataBase`, sitemap and robots all import it. |
| `app/sitemap.ts` | 11 URLs: 5 static routes + the 6 case studies (which previously existed only as dynamic routes). No `lastModified` — nothing in the repo tracks a real date, and an invented one is worse than none. |
| `app/robots.ts` | `Allow: /` plus an absolute `Sitemap:`. The `host:` directive was removed after the first run: it expects a bare hostname and only Yandex reads it. |
| JSON-LD `Person` | name, jobTitle, description, url, image, email, address (Bekasi / Jawa Barat / ID), `alumniOf` (from `profileData.education[0]`), `knowsAbout` (from `profileData.skills`), `sameAs` (LinkedIn only). |
| Skip link | `<a href="#main">Lewati ke konten utama</a>` + `<main id="main" tabIndex={-1}>`, styled in `@layer components` so it is off-screen until focused. |

Every JSON-LD value is read from `data/profile.ts`, which is itself sourced from the CV — no new
claims. Server-colocation note: the biography says **Universitas Alma Ata**, and the CV says the
same three times; the earlier "Alma Yogyakarta" note in an older summary was wrong and is not
used anywhere.

## Verified

| Check | Result |
| --- | --- |
| `/sitemap.xml` | 200, **11 `<loc>`**, 0 relative, all 11 answer **200** |
| `/robots.txt` | 200, `Allow: /`, absolute `Sitemap:` |
| JSON-LD | parses as JSON, `@type: Person`, sameAs only absolute `https` |
| Skip link at rest | `top: -54px` (off-screen), height 45 |
| Tab from page top | focus lands on `.skip-link`, `top: 0` (visible, cyan focus ring) |
| Enter | `location.hash === "#main"`, focus on `MAIN#main`, page scrolls 77px |
| New assertions | `a11y.skip-link` + `a11y.main-focusable` — 36 checks (6 routes × 3 viewports) |
| New gate | `npm run check:seo` — 8 checks; proven to fail by pointing `BASE_URL` at a 404 path |

## Suite progression

| Stage | Checks | Failures |
| --- | --- | --- |
| After CL-7 + OG image | 183 | 0 |
| After CL-13 + SEO | **237** | **0** |

## Still open

CL-12 (the 404 page can still scroll 240px of empty space), CL-9 (section numbering), CL-10
(`/work` filter wording), plus `app/icon.png` / manifest. The sitemap and JSON-LD are only
"correct" once `NEXT_PUBLIC_SITE_URL` is set in production — otherwise they publish localhost.
