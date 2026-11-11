# Domain cutover

The site's absolute origin comes from one value, `siteUrl` in `lib/site.ts`:

```
NEXT_PUBLIC_SITE_URL  →  fallback: VERCEL_PROJECT_PRODUCTION_URL  →  fallback: http://localhost:3000
```

Sitemap entries, `robots.txt`, the canonical link and the Open Graph image URL are all built from it, so
a domain change is one environment variable — no code edit, no find-and-replace. Because the value is
read during the build, it is applied by a **redeploy**, not by saving the variable alone.

## Steps, in order

1. **Add the domain in Vercel.** Project → Settings → Domains → add the domain. Choose which hostname is
   primary (`navyro-portfolio.com` or `www.`); the other becomes a redirect automatically.
2. **Point DNS** as the Vercel Domains page instructs:
   - apex `A` → `76.76.21.21`, or
   - `www` `CNAME` → `cname.vercel-dns.com`.
   If the registrar offers `ALIAS`/`ANAME` at the apex, that is better than a hard-coded `A` record.
3. **Set the variable** for Production:
   ```bash
   npx vercel env add NEXT_PUBLIC_SITE_URL production
   # paste the origin, no trailing slash: https://navyro-portfolio.com
   ```
4. **Redeploy** so the build picks it up:
   ```bash
   npm run ship
   ```
5. **Verify the deployment carries the new origin** — this is the check that catches a forgotten redeploy:
   ```bash
   BASE_URL=https://navyro-portfolio.com npm run check:seo
   ```
   `sitemap.absolute` and `sitemap-urls` must pass; if the sitemap still lists `*.vercel.app`, step 4 was
   skipped or the variable was saved for the wrong environment.

## After the cutover

- **Google Search Console**: add the domain property, submit `/sitemap.xml`, then
  `BASE_URL=https://navyro-portfolio.com npm run check:seo` covers the machine-checkable part only —
  indexing itself is manual.
- **Social cards**: paste the live URL into the LinkedIn Post Inspector and the X card validator once.
  `npm run check:og` proves the file, the metadata and the size; only a platform render proves the card.
- **Keep `*.vercel.app`** as an alias rather than deleting it, so links already shared in a CV or a chat
  keep working. Vercel redirects the alias to the primary domain once it is set.
- **Update the places that hard-code the live URL** if the domain changes again: `README.md` (two
  mentions), the CV/portfolio PDFs, and any case-study copy that names the site.

## Rollback

Remove `NEXT_PUBLIC_SITE_URL` in Vercel and redeploy. `siteUrl` falls back to
`VERCEL_PROJECT_PRODUCTION_URL`, so the site returns to absolute `*.vercel.app` URLs with no code change.
