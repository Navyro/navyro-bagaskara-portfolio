# CL-1 / A — Minimal: honest mailto handoff

## Change
Keep the same card and fields. Replace the fake `setTimeout` success with a real `mailto:` handoff:
on submit, validate, then navigate to a `mailto:navbagaskara@gmail.com?subject=…&body=…` built from
the four fields, and render a **neutral** panel that says the draft was handed to the mail app, while
showing the composed text and a copy button.

## Before / after
- Before: Submit → 1200ms → "Pesan Berhasil Terkirim!" → fields cleared → nothing was sent.
- After: Submit → mail client opens pre-filled → panel reads "Draf pesan dibuka di aplikasi email
  Anda" with the message text visible and a "Salin pesan" button; fields keep their values.

```
┌─────────────────────────────────────┐
│ Kirim Pesan Langsung                │
│ Isi formulir di bawah ini…          │
│                                     │
│ [Nama Lengkap *] [Alamat Email *]   │
│ [Subjek / Topik                ]    │
│ [Pesan *                       ]    │
│                                     │
│ [ Kirim Pesan            ➤ ]        │
└─────────────────────────────────────┘
        │ submit
        ▼
┌─────────────────────────────────────┐
│ ✉ Draf pesan dibuka                 │
│   di aplikasi email Anda.           │
│                                     │
│ Kepada: navbagaskara@gmail.com      │
│ Subjek: Proyek redesain dashboard   │
│ ┌─────────────────────────────────┐ │
│ │ Halo, saya ingin berdiskusi…    │ │
│ └─────────────────────────────────┘ │
│ [Salin pesan]  [Kembali ke form]    │
└─────────────────────────────────────┘
```

## Components / tokens / files
- `components/ContactForm.tsx` (submit handler + neutral panel).
- `data/profile.ts` → single `email` source (grafted from CL-11; same field, no new scope).
- No new tokens.

## Effort
~40 lines changed, no dependency, no server.

## Risks
- A visitor with no configured mail client sees nothing open. Mitigated by the panel showing address,
  subject, body and a copy button, so the message is never lost.
- Some browsers block programmatic navigation; this runs inside the click handler's own task, so it
  counts as a user gesture.

## Acceptance criteria
1a ✅ leaves the site to a real destination carrying all four values. No delivery claim: the panel
describes a draft, not a sent message.
