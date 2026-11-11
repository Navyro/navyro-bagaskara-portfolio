# Free subdomain: navyro.is-a.dev

is-a.dev hands out free `*.is-a.dev` subdomains through pull requests to
[is-a-dev/register](https://github.com/is-a-dev/register). There is no registrar, no payment and no
expiry, and the records live in that repository's `domains/` folder as JSON.

**Chosen name:** `navyro.is-a.dev` — verified unclaimed on 2026-11-11 (a `404` on
`domains/navyro.json` means the name is free).

## State when this was written

The domain is **already attached to the Vercel project** `navyro-bagaskara-portfolio` with
`verified: false`, waiting on the DNS records below. Adding it through the API returned:

```
verification: TXT _vercel.navyro.is-a.dev = vc-domain-verify=navyro.is-a.dev,d076e5b3497d1ecfde8a
recommendedIPv4: 76.76.21.21
```

## The two files to submit

Both already exist in this folder, ready to be copied into the fork:

| Local file | Goes to | Records |
| --- | --- | --- |
| `navyro.json` | `domains/navyro.json` | `A 76.76.21.21` |
| `_vercel.navyro.json` | `domains/_vercel.navyro.json` | `TXT vc-domain-verify=…` |

Underscore in the filename is allowed by is-a.dev as long as it is not the root label — `_vercel` is a
prefix label, so this naming is the documented form for Vercel verification.

## Pull request steps

1. Fork <https://github.com/is-a-dev/register>.
2. In the fork, open the `domains/` folder and create the two files above with exactly those contents.
3. Commit to a branch and open a pull request into `is-a-dev/register:main`.
4. Fill the PR template: record type `A` + `TXT`, and state the site it points to
   (`https://navyro-bagaskara-portfolio.vercel.app`).
5. Wait for review and merge. A bot checks JSON validity and record shape on the PR, so a red check is
   usually a typo rather than a rejection.

## After the merge

DNS needs a few minutes to propagate, then:

```bash
npx vercel domains verify navyro.is-a.dev
```

Vercel flips `verified` to true once it can read the TXT record. Then finish the cutover as described in
[../domain-cutover.md](../domain-cutover.md), with one difference: this is a subdomain, so there is no
apex and no redirect choice to make.

```bash
npx vercel env add NEXT_PUBLIC_SITE_URL production   # https://navyro.is-a.dev
npm run ship
BASE_URL=https://navyro.is-a.dev npm run check:seo   # expect 10/10
```

## Worth knowing before committing to a free subdomain

- It is a real HTTPS domain and Google indexes it, so Search Console, the sitemap and the social card
  all work normally.
- It cannot be sold or transferred, the maintainers can revoke it for abuse, and it reads as a
  developer domain to a recruiter. Moving to a paid `.com` later means repeating the env-var and
  redeploy step, plus updating the link on the CV.
- `www.navyro.is-a.dev` would need its own JSON file; skip it, since a subdomain without `www` is the
  normal shape for is-a.dev.
