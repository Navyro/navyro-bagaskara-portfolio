# Google Search Console

Search Console is how Google is told the site exists and what to crawl. It does not make a site famous on
its own — it shows what queries already lead to it, which pages are indexed, and what breaks. Being *known*
still comes from other people linking to the site (LinkedIn post, GitHub profile, CV, applications).

## What is already done

- `https://navyro-portfolio.is-a.dev/sitemap.xml` lists all 11 routes and every URL answers 200
  (`npm run check:seo`).
- `robots.txt` allows crawling and advertises the sitemap absolutely.
- Every page has a self-referencing canonical, the Person JSON-LD block is valid, and the social card is
  1200x630 and under 1 MB.

## Verification, in order

Search Console → **Add property** → **URL prefix** → `https://navyro-portfolio.is-a.dev/` → **HTML file**.
Google shows a filename such as `google1a2b3c4d5e6f.html` (download it if you like, the name is the part
that matters).

```bash
npm run gsc:verify -- google1a2b3c4d5e6f.html   # writes public/google1a2b3c4d5e6f.html
npm run ship                                   # deploy
curl -s https://navyro-portfolio.is-a.dev/google1a2b3c4d5e6f.html
```

That `curl` must print exactly `google-site-verification: google1a2b3c4d5e6f.html`. Then press **Verify** in
Search Console, and submit the sitemap:

- Sitemaps → Add a new sitemap → `sitemap.xml`

The script keeps one verification file at a time: a new token deletes the previous one, so `public/` does not
accumulate stale files.

## Why HTML file and not DNS

A DNS TXT record would need a pull request to `is-a.dev/register`, because the records for this subdomain are
managed in that repository. The HTML file is one command, needs no reviewer, and proves the same thing.

## What to expect afterwards

- Indexing is not instant: days, sometimes a couple of weeks for all pages.
- **URL prefix** properties cover only that exact hostname, which is correct here — the `vercel.app` alias and
  the is-a.dev domain are separate properties, and only the domain matters.
- Check **Pages** for anything "Crawled - currently not indexed"; on a small site that is usually just age,
  not a defect.
- **Performance** shows real queries after a few weeks. It is worth revisiting once there is data.
