# Free subdomain: navyro-portfolio.is-a.dev

**Status: submitted, waiting on review.** The pull request already exists —
[is-a-dev/register#60844](https://github.com/is-a-dev/register/pull/60844), opened 2026-11-11, state `open`,
`mergeable_state: clean`. Nothing else has to be written; the rest of this file is the record of what was
submitted and what happens after the merge.

is-a.dev issues free `*.is-a.dev` subdomains by pull request, with no registrar, no payment and no expiry.
Records live as JSON files in that repository's `domains/` folder.

## What the pull request contains

| File in the PR | Records |
| --- | --- |
| `domains/navyro-portfolio.json` | `CNAME cname.vercel-dns.com` |
| `domains/_vercel.navyro-portfolio.json` | `TXT vc-domain-verify=navyro-portfolio.is-a.dev,d13104ceab801d75bbd5` |

Verified against the live Vercel project: the TXT value in the PR is exactly the challenge Vercel is
currently waiting for on the domain (`verified: false`), so the merge is the only remaining step.

A `CNAME` at a subdomain label is correct here — there is no apex record to worry about, which is why the
`A 76.76.21.21` route (used at an apex) is not needed.

## After the merge

DNS propagates within minutes, then Vercel confirms the TXT on its own. To check:

```bash
npx vercel domains verify navyro-portfolio.is-a.dev
```

When it reports verified, finish the cutover — one environment variable and a redeploy:

```bash
npx vercel env add NEXT_PUBLIC_SITE_URL production   # https://navyro-portfolio.is-a.dev
npm run ship
BASE_URL=https://navyro-portfolio.is-a.dev npm run check:seo   # expect 10/10
```

Then submit `https://navyro-portfolio.is-a.dev/sitemap.xml` in Google Search Console and re-check the
social card in the LinkedIn Post Inspector.

## If the pull request goes quiet

The repository gets a lot of submissions, so a wait of days is normal and not a signal of rejection — a red
check on the PR is usually a JSON typo. If the challenge needs regenerating (for example the domain is
removed and re-added in Vercel), the TXT value changes and the PR must be updated with the new one.

## Trade-offs, stated plainly

- Real HTTPS domain, indexed normally; Search Console, sitemap and social cards all behave as with a paid
  domain.
- It cannot be sold or transferred, the maintainers can revoke it, and it reads as a developer domain to a
  recruiter. Moving to a paid `.com` later means repeating the env-var and redeploy step and updating the
  link on the CV.
- `www.navyro-portfolio.is-a.dev` would need its own JSON file; skip it, since is-a.dev subdomains
  normally ship without `www`.
