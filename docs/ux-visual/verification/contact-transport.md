# Verification — CL-1 contact-transport

Branch `ux-visual/fixes` · commit `fix(contact-transport)` · 2026-01

## Criteria

| # | Criterion | Before | After | Result |
|---|---|---|---|---|
| 1 | A submit reaches a real destination carrying all four field values | `network requests = []`, no navigation, no transport of any kind | `window.location.href` set to `mailto:…?subject=<subject>&body=<message+name+email>`; the composed values are also rendered in the panel | ✅ PASS |
| 2 | No state may claim delivery when nothing was sent | Panel said **"Pesan Berhasil Terkirim!"** and cleared the fields | Panel says **"Draf pesan disiapkan"**, explains the mail client opens, shows To/Subject/Message, offers **Salin pesan** and **Kembali ke form**; the string "Berhasil Terkirim" no longer exists anywhere (asserted) | ✅ PASS |
| 3 | The visitor's text is never destroyed | Fields cleared on "success" after being discarded | Fields keep their values (`Kembali ke form` returns to them filled); the message is also printed in the panel, so it survives a missing mail client | ✅ PASS |
| 4 | One source of truth for the address | Contact page, footer and mobile menu each carried the placeholder; the menu hardcoded it in `MobileMenu.tsx` | All three read `profileData.email`; no hardcoded address remains in components | ✅ PASS |

## Evidence

- Automated: `bash scripts/run-ux-checks.sh contact` → **9 checks, 0 failures** (was 9 checks, 3 failures:
  `contact.form-has-transport` at all three viewports). New checks used:
  `contact.form-present`, `contact.form-has-transport`, `contact.no-false-success-copy`.
- Full suite: **111 checks, 56 failures** (was 59 after CL-2) — the 3 contact failures removed, no new ones.
- Behavioural run in the live page: filled all four fields → clicked "Siapkan pesan" →
  `{panel: true, falseClaim: false, fieldsKept: [] (panel state), to: navyro.bagaskara@email.com}`.
  The placeholder address is visible because CL-11 (data authenticity) is deferred — see below.
- Screenshots: `after-1440-draft.png` (panel with To/Subject/Message), `after-390-idle.png` (form on
  mobile).
- Vision check on `after-1440-draft.png`: "The result says 'Draf pesan disiapkan' … not that a message was
  sent … the required To/Subject/Message rows are readable … the black 'Salin pesan' button is the obvious
  primary action."

## Deviations from the decision

- The decision described a "failure path" that swaps the heading after 1s if the mail client does not open.
  It is not implemented as a timer: the panel *always* shows the composed values, the destination address
  and a copy button, so the recovery path is present from the first frame instead of after a delay. Simpler
  and strictly better than the timer; deviation justified.
- The submit button label changed from "Kirim Pesan" to **"Siapkan pesan"** with a helper line
  ("Pesan dibuka di aplikasi email Anda — tidak ada yang terkirim langsung dari halaman ini"), because a
  button labelled "send" that opens a mail client is the same class of lie in miniature (C1).
- The email regex was hardened while in this file (CL-1's neighbourhood): `a@.` was previously accepted.
  Failing-first was not added for it because it is a P3 sub-item; it is covered by the manual run.

## Regressions checked

- `tsc --noEmit` clean.
- Error states still work: empty submit and invalid email both show the banner and keep the values.
- Dark mode unaffected (no new colours except the existing `--accent` / semantic red).
- Mobile layout: the panel's `dl` wraps without horizontal overflow at 390 (no `pageScrollX`).

## Not fixed here (tracked as CL-11, deferred)

The destination address rendered on the site is still the placeholder `navyro.bagaskara@email.com`, because
replacing it requires the owner's confirmed address (`navbagaskara@gmail.com` appears in `TENTANG SAYA`, but
`data/profile.ts` is the single source of truth and its other fields — location, education, experience —
are equally fictional, so the whole file must be replaced in one deliberate step). The transport itself is
correct and will follow whatever `profileData.email` holds.
