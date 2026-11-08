# CL-3 / B — Restructure: static name, animate a separate detail line

## Change
Delete the typewriter. The `h1` renders the name as static text from first paint. The motion budget moves
to something that cannot hide identity: a short letter-spacing / clip-in reveal on the name (250ms, once)
and a blinking accent bar kept as a **separate decorative element** beside the `h1`, not inside it.

- `components/Hero.tsx`: drop the timer state machine entirely; `h1` = `{profileData.name}`.
- Add one `motion.span` caret as a sibling with `aria-hidden`, `w-[3px] h-[0.9em]`.
- Keep the existing `initial/animate` entrance already used by the eyebrow, statement and CTAs.

## Before / after
- Before: identity is a 2.9s animation loop; H1 text changes every 45–75ms.
- After: identity is text; motion is a 250ms clip reveal plus a static caret.

```
Before                          After
<h1> [typing…erasing…] </h1>    <h1> Navyro Bagaskara ▍ </h1>
      ▲ 43↔83px tall                 ▲ fixed, 1 line (2 <380px)
```

## Components / tokens / files
- `components/Hero.tsx` (~35 lines removed, ~10 added).

## Effort
Small. One file, no tokens.

## Risks
- Loses the "signature" typing effect the owner may like; this is a taste call, so it must be stated.
- A caret next to static text can look like a bug if it never blinks consistently — mitigate with a
  2-step opacity animation at 1.1s.

## Acceptance criteria
Full name present at first paint (DOM text complete before any JS), stable at 320–1440, hero height
constant; the caret is decorative only and never the sole carrier of information.
