# Free subdomain: navyro-portfolio.is-a.dev

**Status: merged and live** — <https://navyro-portfolio.is-a.dev> serves the site and
[is-a-dev/register#60844](https://github.com/is-a-dev/register/pull/60844) is closed as merged. The rest of
this file records what was submitted, so the next domain (a paid one, later) can follow the same route.

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

## What happened after the merge

Done on 2026-11-12, in this order: `vercel domains verify` reported `verified: true`, `NEXT_PUBLIC_SITE_URL`
was set to `https://navyro-portfolio.is-a.dev` for production, the site was redeployed, and
`BASE_URL=https://navyro-portfolio.is-a.dev npm run check:seo` passed 11 of 11 checks — including
`sitemap-urls`, which proves every advertised URL answers 200 on the new origin.

Every page also gained a canonical link at that point: two hostnames serving identical pages otherwise split
their own ranking, and the alias stays attached on purpose (see below), so the canonical is what keeps the
is-a.dev domain the one Google credits.

## If it ever needs to be redone

Check the whole chain — pull request, CNAME, TXT and what the hostname serves — in one go:

```bash
npm run check:domain
```

It prints `WAIT` for everything that is still pending and says when the name is live. Underneath it uses
public DNS and GitHub's public API only, so it needs no tokens.

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

## If the pull request ever stalls

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
