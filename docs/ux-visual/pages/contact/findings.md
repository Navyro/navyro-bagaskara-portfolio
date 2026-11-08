# Findings — `/contact`

States reached: idle · empty submit (error) · invalid email (error) · submitting · success ·
"Kirim Pesan Lain" reset · dark mode · mobile 390.

## Verdict per viewport/state

**1440x900 idle** — `shots/1440x900-idle.png`
Well-composed two-column contact: direct email card, social card, then the form. The `LET'S TALK.`
headline is the right size for the page's job. Labels are clear, placeholders are examples rather
than repeats of the label.

**1440x900 success** — `shots/1440x900-success.png`
The success panel is clean and replaces the form without leaving debris. Which makes it worse: it is
a lie. See CT-1.

**1440x900 error (empty submit)** — `shots/1440x900-error-empty.png`
One red banner appears above the fields, the submit button stays in the viewport. But no field is
marked, and focus is not moved to the first missing field.

**1440x900 dark** — `shots/1440x900-dark.png`
A genuinely designed dark theme: inputs sit on `--background` inside a `--surface` card with visible
borders, cyan accent, no dead text.

**390x844** — `shots/390x844-idle.png`
Form stacks cleanly, 44px-tall inputs, no overflow.

## Findings

| id | level | element | problem | norm | evidence | severity | basis |
|---|---|---|---|---|---|---|---|
| CT-1 | page | Contact form submit | **Submitting sends nothing.** `handleSubmit` validates, then `setTimeout(1200)` and switches to "Pesan Berhasil Terkirim!". Measured: after a real submit with filled fields, `network requests = []` and the success panel is shown, fields cleared. A visitor's message is silently destroyed while the UI claims delivery. | C3, I2, I3 | `{requests: [], success: true}` | **P0** | measured |
| CT-2 | component | Email address in the email card and footer | Displays `navyro.bagaskara@email.com`, a placeholder domain that does not exist. The real address supplied in `TENTANG SAYA` is `navbagaskara@gmail.com`. Every `mailto:` on the site is therefore dead. | C1, I3 | `profileData.email` value | P1 | measured |
| CT-3 | component | Mobile menu email | `components/MobileMenu.tsx` hardcodes the same placeholder string instead of reading `profileData.email`; the two can drift. | H5 | source line 60 | P2 | measured |
| CT-4 | component | Field labels / card captions | `#888888` at 3.54:1 (light) and 3.70:1 (dark) on informative labels. | A1 | `lowContrast` 2 nodes both themes | P2 | measured |
| CT-5 | form | Validation feedback | Errors arrive as one global banner; the offending inputs keep their normal border, no `aria-invalid`, no `aria-describedby`, focus stays on the submit button. With 3 required fields the user must hunt. | I3, I8, A2 | DOM after empty submit | P2 | measured |
| CT-6 | form | Validation rules | `formData.email.includes("@") && includes(".")` accepts `a@.` and rejects nothing else. | I3 | source | P3 | observed |
| CT-7 | page | Field labels | Labels carry the required marker as literal text in the accessible name (`"NAMA LENGKAP *"`) rather than `aria-required`, so screen readers read an asterisk. | A2 | `snapshot -i` names | P3 | measured |

## Excellent as is

- Two-column contact layout: direct routes first, form second — matches how a recruiter triages (L7, I5).
- Placeholders demonstrate format (`cth. alexandra@company.com`) instead of restating the label (C4).
- Dark mode inputs are properly separated from their card, not invisible holes (A1).
- `mailto:` link, LinkedIn and GitHub are real anchors with `rel="noopener noreferrer"` (I1, A2).
- Success state replaces the form instead of appending below it, and offers "Kirim Pesan Lain" (I2) — the pattern is right, only the behaviour behind it is fake.
