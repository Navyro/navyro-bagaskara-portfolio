# CL-1: Contact form reports success without sending

## Problem
`components/ContactForm.tsx` validates four fields, waits 1200ms via `setTimeout`, then renders
"Pesan Berhasil Terkirim!" and clears the inputs. There is no transport of any kind: no `fetch`, no route
handler, no `mailto`. Measured: submitting a filled form produced `network requests = []` and
`success = true`. The visitor's message is destroyed while the UI claims delivery. On a portfolio the
contact form *is* the product, so this is the highest-cost defect on the site.

Findings covered: CT-1. Evidence: `pages/contact/findings.md`, `pages/contact/audit.json`,
measured request log.

Acceptance criteria: a submit either leaves the site to a destination that carries all four field values,
or reaches a server route that returns a delivery result; the success panel may only appear after
confirmation; no state may claim delivery when nothing was sent.

## Options considered
| Option | Idea | Weighted score (Usability / Visual / Engineering) |
|--------|------|---------------------------------------------------|
| A Minimal | `mailto:` handoff built from the four fields + neutral "draft opened" panel with a copy button | **29 / 35** · 31 / 35 · **28 / 30** |
| B Restructure | `POST /api/contact` route → mail provider → four real states | 31 / 35 · 29 / 35 · 22 / 30 |
| C Convention | Delete the form; mailto CTA + pre-subjected intent links | 31 / 35 · 27 / 35 · 26 / 30 |

## Decision
**A**, with C's copy affordance already inside it and one graft from B: the failure path. If the visitor's
mail client does not open within 1s, the panel swaps its heading from "Draf pesan dibuka" to "Salin pesan
ini dan kirim ke navbagaskara@gmail.com" and focuses the copy button. The address comes from
`profileData.email` (single source of truth), which resolves CT-2/CT-3 as a side effect.

Explicitly rejected: B is the better product but cannot be implemented or verified here — it needs a
provider account and a deploy secret, and shipping an endpoint without them would replace one false
success with another. C removes the ability to capture a structured subject line and forces a mail-client
round trip for everyone.

## Why this is the best
- **Against B**: same correctness guarantee at ~1/4 the scope, no secret to provision, verifiable end to
  end in this environment. B remains the documented upgrade path once a provider exists.
- **Against C**: keeps the guided fields for people who want them, and keeps a visible recovery surface
  (composed subject/body + copy) for people whose mail client is not configured. C has no recovery at all.
- **Norms satisfied**: C3 (state is legible and truthful), I2 (feedback describes what actually happened),
  I3 (no data destroyed; the message survives in the panel), C1 (labels say what will happen).
- **Cost and what it rules out**: no server-side delivery, so there is no delivery receipt and no spam
  protection to add. The copy makes the panel bigger than a one-line toast.

## Implementation plan
1. `data/profile.ts`: keep `email` as the single contact value (already exists; value fixed by CL-11).
2. `components/ContactForm.tsx`:
   - import `profileData`; remove the `setTimeout` branch;
   - build `subject` = `formData.subject || "Pesan dari portfolio"`, `body` = name + email + message;
   - `window.location.href = \`mailto:${profileData.email}?subject=${enc(subject)}&body=${enc(body)}\``;
   - state machine `idle | composing | ready`; the `ready` panel shows To/Subject/Body, a copy button
     using `navigator.clipboard.writeText`, and "Kembali ke form" which keeps the field values;
   - no `<a href="mailto:...">` fallback is added to the panel — the composed body is shown instead, so
     the value is never lost.
3. `components/MobileMenu.tsx`: replace the hardcoded email with `profileData.email` (drift removal).
4. No token changes.

## Test plan
- Failing-first assertion (before the fix): \`submitting the form performs at least one of
  [navigation, fetch, mailto]\` — fails now because nothing happens.
- After: assert `form` submit sets `location.href` to a `mailto:` URL whose decoded `body` contains the
  typed message and whose `subject` matches the field.
- Manual: 320/390/768/1440 — field values survive the round trip; copy button writes the full body;
  panel never says "terkirim".
- Regression: the email address on `/contact`, `/resume`, footer and mobile menu all render the same
  string.
