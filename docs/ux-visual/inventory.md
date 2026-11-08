# Inventory — Navyro Bagaskara Portfolio (v4.0)

Run: 2026-01 · URL `http://localhost:3000` (next dev, PID in `.ux-logs/dev.pid`)
Session: `ux-visual-navyro` · Viewports: `1440x900`, `768x1024`, `390x844`
Auth: none (public marketing/content site, no login).

## Stack & design system

- Next.js 14.2.35 (App Router), React 18, TypeScript, Tailwind 3.4, Framer Motion 13, next-themes.
- Tokens in `app/globals.css` (`:root` + `.dark`), mapped in `tailwind.config.ts`:
  `--background #F7F7F5 / #0E0E10`, `--surface #FFFFFF / #17171A`,
  `--text-primary #171717 / #F4F4F6`, `--text-secondary #555555 / #A0A0AB`,
  `--text-muted #888888 / #71717A`, `--border #E2E2DF / #27272A`,
  `--accent #1F4FFF / #38BDF8`, `--accent-hover #163FCC / #0284C7`,
  `--inverse-bg #171717 / #F4F4F6`, `--inverse-text #F7F7F5 / #0E0E10`.
- Radius: `btn 8px`, `card 12px`. Max width: `editorial 1280px`. Fonts: Manrope (heading), Inter (sans).
- No component library (no shadcn/radix). Hand-rolled primitives:
  `SectionHeading`, `ScrollReveal`, `ProjectCard`, `SkillGroup`, `ExperienceItem`,
  `ProjectMeta`, `CaseStudySection`, `ThemeToggle`, `CustomCursor`, `ReadingProgressBar`,
  `ScrollProgressBar`, `Navbar`, `MobileMenu`, `Footer`, `ContactForm`, `Hero`.
- No enforcement script, no lint rule for tokens. No `npm run lint` config output yet.
- Missing scale tokens commonly needed: no `bp` tokens, no fixed header-height token
  (this causes the `top-[61px]` hardcode below), no `shadow` scale, no spacing tokens
  beyond Tailwind defaults + 18/22/26/30.

## Layouts

| Layout | Used by |
|---|---|
| `RootLayout` (`app/layout.tsx`) — CustomCursor + Navbar + main + Footer + ThemeProvider | every route |
| Marketing editorial column (`max-w-editorial px-6 lg:px-12`) | all pages |

## Pages and states to reach

### `/` Home (`app/page.tsx`)
States: loaded | scrolled-to-each-section | dark | mobile-menu-open | hero mid-typewriter.
Sections: Hero (typewriter name) · 01 SELECTED WORK (4 featured cards) · 02 APPROACH (4 cards)
· 03 EXPERTISE (3 SkillGroups) · 04 EXPERIENCE (2 ExperienceItems) · 05 ABOUT · 06 LET'S TALK.
Also: "Lihat Semua Proyek (4)" link, "View Selected Work", "Contact Me" CTAs.

### `/work` Work index (`app/work/page.tsx`, client component)
States: All | UI/UX | Web | Mobile | Front-End | a filter with **zero results** (empty state).
Contains a filter button row + 4 ProjectCards.

### `/work/[slug]` Case studies — 4 slugs
`nexabank-mobile-app`, `elevate-design-system`, `luminary-ecommerce`, `healthpulse-dashboard`.
States: top (metadata + cover + CTAs) · mid (9 sections) · ReadingProgressBar sticky ·
next-project card · prev/next footer links.
Note: `healthpulse-dashboard` is `featured: false` and has fewer populated sections
(no `testing`, no `research`→ has research, no `wireframes`) → sections 07 renders while
05 may render partial empty strings. Verify.

### `/about` (`app/about/page.tsx`)
States: loaded. Sections: header · narrative · 01 Experience (3) · 02 Education (1) · 03 Skills (3).

### `/contact` (`app/contact/page.tsx`)
States: idle | submit empty (**validation error**) | invalid email (**error**) | submitting |
**success panel** ("Pesan Berhasil Terkirim!") | "Kirim Pesan Lain" reset |
very long message (textarea long content).
Also: email mailto link, LinkedIn/GitHub external links.

### `/resume` (`app/resume/page.tsx`)
States: loaded (on-screen CV) · "Unduh Resume PDF" download link.

### `/not-found` (`app/not-found.tsx`)
Reachable via any unknown path, e.g. `/does-not-exist`. States: loaded.

### Transient UI (global)
- Mobile menu overlay (`MobileMenu`) at ≤767px: open + closed, active-route indicator.
- Theme toggle light ↔ dark, on every page.
- Custom cursor modes: `default`, `link`, `cta`, `project` (with `VIEW ↗` label) — pointer devices only.
- Navbar active-route underline.
- ReadingProgressBar (case study only).

## Component groups

| Group | Components |
|---|---|
| Top chrome | Navbar (logo, 3 links + RESUME, ThemeToggle), MobileMenu, ScrollProgressBar |
| Hero | Hero eyebrow, typewriter h1, statement, 2 CTAs |
| Work list | ProjectCard (index no. + tag row + title + meta + 3D tilt visual + description + link) |
| Case study | ProjectMeta grid, cover, CTA row, 9 × CaseStudySection, gallery, next-project card, prev/next |
| Cards | SkillGroup, ExperienceItem, Approach cards, Education card |
| Forms | ContactForm (name, email, subject, message, submit, error banner, success panel) |
| Footer | brand + nav list + connect list + bottom bar |

## Known issues to watch (from code read, to confirm by measurement)

1. `app/page.tsx:147` and `app/about/page.tsx` pass `title="Tools &amp; Workflow"` as a
   JSX **string** → renders literal `Tools &amp; Workflow`.
2. `ContactForm` submit only calls `setTimeout(1200)` → claims "Pesan Berhasil Terkirim!"
   with no transport. C3/I2/I3.
3. `MobileMenu` hardcodes `navyro.bagaskara@email.com` (mismatched with `profileData.email`
   and the real address in `TENTANG SAYA`).
4. `ReadingProgressBar` uses `top-[61px]`, Navbar is `py-4` + ~28px content = 60-61px at
   mobile, `lg:py-5` at desktop → overlap risk. L5.
5. `<img>` used instead of `next/image` for covers/gallery → no `srcset`, no CLS guard.
6. `ProjectCard` accepts `priorityImage` but never uses it (dead prop).
7. `Project.category` is a 4-value union but `/work` filter also matches `tags` → filter
   semantics ambiguous (e.g. does "Front-End" match the tag or the category).
8. Placeholder content vs real assets (data authenticity) — out of scope for visual review,
   tracked separately.

## Not in scope for this run

- Backend/email transport implementation (reported as a finding, fix may be deferred).
- Real-content migration from `TENTANG SAYA/`.
- SEO (sitemap/robots).
