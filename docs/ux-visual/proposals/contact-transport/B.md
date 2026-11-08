# CL-1 / B — Restructure: the form posts to a server route that really sends

## Change
Add `app/api/contact/route.ts` (App Router POST). The route validates with a schema, delivers through
a provider (Resend / Formspree / SMTP) configured by env vars, and returns `{ ok: true }` or a typed
error. `ContactForm` awaits `fetch('/api/contact')` and renders four real states:
idle → submitting → success (only after `ok`) → failure with retry **and** a mailto fallback.

## Before / after
- Before: 4 fields, 1 fake state, 0 requests.
- After: same 4 fields, 4 states, server-acknowledged delivery.

```
Form ──POST /api/contact──► route.ts ──► provider ──► inbox
                                 │
        ┌────────────────────────┴───────────┐
        ▼ 200 ok                            ▼ 5xx / timeout
  "Pesan terkirim"                    "Belum terkirim" + [Coba lagi]
   (after ACK)                        + [Kirim lewat email ↗ mailto]
```

## Components / tokens / files
- `app/api/contact/route.ts` (new) · `components/ContactForm.tsx` · `.env.example` · README note.
- Honeypot field + per-IP rate limit inside the route.
- Tokens: reuse `--accent`; the semantic red/green pair already inlined in the component.

## Effort
~150 lines, one provider account, one deploy secret, spam handling.

## Risks
- Needs a third-party account and a secret that cannot be provisioned or verified locally without it.
- Sends real mail to a real inbox; a wrong `To:` leaks messages.
- Adds an unauthenticated endpoint that must be rate limited and abuse protected.

## Acceptance criteria
1b ✅ reaches a server route that returns a delivery result; the success panel may only appear after
confirmation. Also satisfies "no state claims delivery when nothing was sent".
