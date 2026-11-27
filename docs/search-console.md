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

## IndexNow (Bing, Yandex, Seznam)

Google has no API for "request indexing", but the other engines share IndexNow. Ownership is proved by a
32-hex-character key file at the site root (`public/<key>.txt`, containing exactly the key), and each run
posts the sitemap's URLs to `api.indexnow.org`:

```bash
npm run indexnow              # every URL in the sitemap
npm run indexnow -- //work    # one path, right after editing it
```

On Git Bash the leading slash of `-- /work` gets rewritten into a Windows path before the script ever
sees it (`C:/Program Files/Git/work`), so use `//work` there; the script rejects anything that is not a
plain site path and says so rather than submitting `https://…/C:/Program Files/…`.

The script refuses to submit if the key file is not live yet, because a submission with a missing key is
rejected with 403 and looks like a protocol problem instead of an unfinished deploy. `200` or `202` means
accepted — the engines still crawl at their own pace.

This does not affect Google. For Google the lever is links from other sites, not pings.

## Re-checking in a few days

The first reading (25 Nov 2026, five days after verification) is the baseline to compare against:

| Signal | First reading |
| --- | --- |
| Sitemap | Sukses · 11 URLs found · last read 25 Nov |
| Indexed pages | 5 of 11 (the five static routes) |
| Not indexed | 6 · "Discovered — currently not indexed" · 0 crawled-not-indexed |
| Impressions | 1–12 per day, 0 clicks |

So the site is in the index and already appears for some queries; the six case studies are queued. Nothing
was broken, and no action beyond waiting and a couple of inbound links was needed.

What can be checked from the command line, without the Search Console login:

```bash
BASE_URL=https://navyro-portfolio.is-a.dev npm run check:seo     # 12 checks: sitemap, canonical, robots, JSON-LD
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://navyro-portfolio.is-a.dev/
```

What only the owner can read, in Search Console:

1. **Pages** — the indexed count should climb from 5 towards 11. A page that stays "Discovered" for weeks
   means it has too few internal links, not that the server is wrong.
2. **Performance** — impressions turning into clicks, and which queries trigger them.
3. **Sitemaps** — must stay "Sukses"; re-submitting a successful sitemap changes nothing.

Do not click "Validate" on "Discovered — currently not indexed". That reason is not an error Google can fix,
and validating it only marks the report as in progress.

## What to expect afterwards

- Indexing is not instant: days, sometimes a couple of weeks for all pages.
- **URL prefix** properties cover only that exact hostname, which is correct here — the `vercel.app` alias and
  the is-a.dev domain are separate properties, and only the domain matters.
- Check **Pages** for anything "Crawled - currently not indexed"; on a small site that is usually just age,
  not a defect.
- **Performance** shows real queries after a few weeks. It is worth revisiting once there is data.
