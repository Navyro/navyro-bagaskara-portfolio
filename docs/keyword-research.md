# What people actually type around "portfolio"

The question this answers: can a personal portfolio reach the top of Google for a portfolio query, and if
so, which one. The short answer is *not* for "portfolio" itself, but yes for a specific phrase.

## How the data was collected

Google's own autocomplete, not a keyword tool's estimate. Suggestions are ranked by how often people
complete the query, so the list is real demand rather than guessed volume:

```bash
# one seed, one alphabet letter
curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=id&gl=id&q=portofolio%20d"
```

Seeds `portofolio`, `portofolio ui ux`, `portofolio desain`, `contoh portofolio`, `portofolio website`,
`jasa ui ux`, `portofolio mahasiswa`, plus English seeds `portfolio`, `portfolio website`,
`portfolio design`, `ui ux portfolio` — each expanded across `a`–`z`, with `hl=id&gl=id` for Indonesian
and `hl=en&gl=us` for English. That returned **891 Indonesian** and **917 English** suggestions; 871 of the
Indonesian ones mention portofolio/portfolio after dropping shares, insurance and photo-album meanings.

## What the 871 are about

| Intent | Count | Who wins it now |
| --- | --- | --- |
| contoh / referensi / inspirasi | 331 | blog posts and galleries (portolabs.id, dibimbing.id, Behance) |
| lamaran kerja / CV / magang | 64 | career blogs |
| template / download / gratis | 55 | template marketplaces |
| tool / platform (figma, canva, behance) | 24 | the platforms themselves |
| ui/ux specific | 17 | **personal portfolio sites** |
| jasa / hire / freelance | 5 | agencies |
| how-to / panduan | 5 | blogs |

Two conclusions follow, and they point in opposite directions:

1. **The biggest cluster is the least useful.** 38% of the demand is people looking for *examples* to copy
   before they have a portfolio. Winning it means writing a guide, and the traffic is other beginners, not
   the people who would hire or interview Navyro.
2. **The small ui/ux cluster is the one worth having.** A check of the live SERP for
   `portofolio ui ux designer` returns individual designer portfolios (Portugal, Chile, Brazil, New York) —
   not directories. Google reads that query as "show me designers", so a personal site belongs there.

## Verdict per target

| Query | Realistic? | Why |
| --- | --- | --- |
| `portfolio` | no | Behance, Dribbble, Adobe, Squarespace, Canva own the top. Authority, not optimisation. |
| `portofolio ui ux designer` | yes, medium term | SERP is personal sites; needs the phrase on-page plus a few inbound links |
| `navyro portofolio`, `navyro bagaskara` | yes, now | the only competitor is the GitHub repo |
| `contoh portofolio ui ux` | only with an article | served by blogs; no portfolio page can win it |
| `case study <project name>` | yes | near-zero competition, and the pages already exist |

## What was changed because of this

`SITE_TITLE` became **"Navyro Bagaskara — UI/UX Designer Portfolio"**. It used to end in
"+ Front-End Fundamentals", which spent the title's strongest real estate on a phrase nobody searches and
pushed the useful words past the ~40 characters a search result shows. The front-end signal stays in the
description.

## What is left, and only the owner can do it

Ranking for `portofolio ui ux designer` needs inbound links more than on-page wording:

1. Behance / Dribbble / Figma Community profile linking to the site — the strongest single move.
2. A GitHub profile README (a repo named exactly `Navyro`) with the link in text.
3. One LinkedIn post carrying the URL.

Re-measure in Search Console → **Performance**: it lists the queries that actually produced impressions.
That is the only real scoreboard; autocomplete describes the market, not this site's standing in it.
