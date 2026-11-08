# CL-1 / C — Convention: mailto-only contact, no form

## Change
Delete the form. The convention for a one-person portfolio with no backend is a **mailto CTA**,
optionally with copy-address and pre-subjected intent links. Replace the right column with the address,
a large "Tulis email" action, and two or three ready-made subject entries.

## Before / after
- Before: 4-field form that discards input.
- After: one action, zero false promises, one fewer surface to maintain.

```
┌────────────────────┬───────────────────────────────┐
│ ALAMAT EMAIL UTAMA │  Mulai percakapan             │
│ navbagaskara@      │                               │
│ gmail.com          │  [ Kerja sama proyek       ↗ ]│
│ Waktu respon <24j  │  [ Posisi penuh waktu      ↗ ]│
│                    │  [ Konsultasi Front-End    ↗ ]│
│ PROFIL PROFESIONAL │                               │
│ LinkedIn      ↗    │  [ Salin email ]              │
│ GitHub        ↗    │                               │
└────────────────────┴───────────────────────────────┘
```

## Components / tokens / files
- `components/ContactForm.tsx` → replaced by a small `ContactActions`.
- `app/contact/page.tsx` right column rewritten.
- Reuses `--surface`, `--border`, `rounded-card`, `rounded-btn`, `--accent`.

## Effort
~60 lines removed, ~80 added. No server, no dependency.

## Risks
- Loses structured fields; a recruiter who expects a form inside the page must switch to their mail
  client, which is a real drop-off for corporate users on browser-only mail.
- No in-page capture, so no event when a draft is attempted.

## Acceptance criteria
1a ✅ every path leaves to a real destination carrying a subject. No delivery claim anywhere.
Simplest possible: zero states instead of four.
