# Backlinks & index requests — the remaining manual steps

Everything a machine can do is already done; this file holds only what needs a click inside an
account. Copy is written from `data/projects.ts` and `data/profile.ts`, so nothing here claims
anything the site does not already say.

## Already done (no action needed)

| Item | Status |
|---|---|
| `sitemap.xml` — 13 URLs, all 200 | live |
| `robots.txt` + Google verification file | live |
| IndexNow (Bing, Yandex, Seznam, Naver) | 13 URLs → **200** |
| GitHub profile README → portfolio | https://github.com/Navyro/Navyro |

---

## 1. Google Search Console — request indexing

Automation cannot do this: Google exposes no public API for "Request indexing" (the Indexing API
only accepts `JobPosting` and `BroadcastEvent`). Four URLs, four clicks.

1. Open <https://search.google.com/search-console>
2. Pick the `navyro-portfolio.is-a.dev` property
3. Paste each URL into the search bar at the top, press Enter, then click **Request indexing**

| # | URL |
|---|---|
| 1 | `https://navyro-portfolio.is-a.dev/` |
| 2 | `https://navyro-portfolio.is-a.dev/contact` |
| 3 | `https://navyro-portfolio.is-a.dev/design` |
| 4 | `https://navyro-portfolio.is-a.dev/design/himsi-content-system` |

Baseline to compare against is recorded in `docs/search-console.md` (25 Nov 2026: 5 of 11 indexed).
Re-check in 2–3 days — "Discovered — currently not indexed" turning into "Indexed" is the signal.

---

## 2. Behance — two projects

Behance asks for an account, so this is manual. It accepts **Figma prototypes as embeds**; a live
website cannot be uploaded as a file, so the site goes in the description as a link.

### Steps

1. <https://www.behance.net> → **Create a project**
2. Cover image: use the project cover from `public/images/projects/<slug>/cover.jpg`
3. Paste the title, fields, description and tags below
4. In **Advanced settings** → *Project website* → put the case-study URL (this is the backlink)
5. Publish, then add the Behance URL back into your LinkedIn "Featured" section

### Project A — FanFunds

- **Title:** `FanFunds — Donation App for Creators`
- **Creative fields:** UI/UX Design, Mobile Design, Interaction Design
- **Tools:** Figma
- **Case study link:** `https://navyro-portfolio.is-a.dev/work/fanfunds`

**Description**

> FanFunds is a donation app for creators, built as the capstone project of MSIB Batch 7
> (independent study programme, BISA AI Academy) between October and December 2024.
>
> I worked as UI/UX Designer in the capstone team. The work started from user personas and user
> flows, continued into a design system that kept the screens consistent, and closed with A/B
> testing against 30 respondents to settle which version of the key screens to keep.
>
> Full process, screens and findings: https://navyro-portfolio.is-a.dev/work/fanfunds

- **Tags:** `ui design`, `mobile app`, `design system`, `figma`, `ux research`

### Project B — Household Waste Billing App

- **Title:** `Household Waste Billing App — Independent UI/UX Case Study`
- **Creative fields:** UI/UX Design, Mobile Design, User Research
- **Tools:** Figma
- **Case study link:** `https://navyro-portfolio.is-a.dev/work/penagihan-limbah-rt`

**Description**

> A waste-fee billing app for neighbourhood administrators: record residents' bills, flag arrears,
> and compile the monthly report in one place. Built independently in August–October 2025.
>
> I handled the whole process alone — user research, information architecture, user flows,
> wireframes, high-fidelity interfaces, and an interactive Figma prototype handed over as the
> development reference.
>
> Full process and screens: https://navyro-portfolio.is-a.dev/work/penagihan-limbah-rt

- **Tags:** `ui design`, `mobile app`, `ux research`, `figma`, `indonesia`

---

## 3. LinkedIn — one post

Paste as-is; it points at work that already exists rather than making claims.

> Saya baru merapikan portofolio desain saya jadi satu tempat.
>
> Isinya 6 studi kasus (dari riset pengguna, information architecture, user flow, sampai prototipe
> Figma) dan 11 karya visual, termasuk catatan proses untuk sistem konten HIMSI.
>
> Kalau kamu sedang butuh UI/UX designer untuk riset, perancangan alur, atau design system, silakan
> lihat: https://navyro-portfolio.is-a.dev
>
> Terbuka untuk diskusi dan masukan.

Then: profile → **Featured** → add link dengan judul `Portfolio — UI/UX Designer`.

---

## 4. Bing Webmaster (optional, 2 minutes)

IndexNow already told Bing about every URL. Submitting the sitemap there is a second, independent
signal: <https://www.bing.com/webmasters> → **Sitemaps** → `https://navyro-portfolio.is-a.dev/sitemap.xml`.
Import from Search Console is the fastest route if offered.

---

## After each step

Nothing in the repository changes, so no rebuild is needed. To confirm the links resolve:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://navyro-portfolio.is-a.dev/
```
