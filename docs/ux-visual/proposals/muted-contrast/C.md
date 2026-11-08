# CL-4 / C — Convention: derive all text colours from a guaranteed-contrast ramp

## Change
Stop hand-picking greys. Define the text ramp as four steps that are *computed* to hit contrast floors
against `--background` and `--surface`, and document the floors in the config. The category convention
for a design system with two themes is a documented contrast ramp (e.g. 16:1 / 8:1 / 5:1 / 3:1 for
non-text), not a set of arbitrary hex values.

- `tailwind.config.ts`: `text: { primary, secondary, tertiary, disabled }` mapped to CSS vars.
- `app/globals.css`: values chosen so tertiary ≥ 4.5:1 on **both** `--surface` and `--background`, in
  both themes; `disabled` allowed below the floor and used *only* on `:disabled` controls.
- Replace all `text-text-muted` uses on informative text with `text-tertiary`; keep `text-muted` for
  separators only (same split as B, but derived rather than picked).
- Add a comment block naming the floor each step must satisfy so a future edit can be checked.

## Before / after
- Before: 8 hex values picked by eye, three of them failing.
- After: a ramp with an explicit, testable contract.

```
--text-primary    #171717  on #F7F7F5 → 15.9 : 1   (needs ≥ 12)
--text-secondary  #555555  on #F7F7F5 →  7.1 : 1   (needs ≥ 7)
--text-tertiary   #6B6B6B  on #F7F7F5 →  4.8 : 1   (needs ≥ 4.5)
--text-muted      #888888  on #F7F7F5 →  3.99: 1   (non-text only)
```

## Components / tokens / files
- `tailwind.config.ts`, `app/globals.css`, plus the same component swaps as B.
- Optionally a tiny unit test that asserts the four ratios from the token values.

## Effort
As B, plus a contrast test (~30 lines).

## Risks
- More ceremony than a portfolio needs; a four-step ramp with a test is agency-scale practice.
- Still depends on discipline: nothing prevents a future `#999` unless the test covers rendered nodes,
  and a token-value test only covers the tokens.

## Acceptance criteria
0 informative low-contrast nodes across both themes; a test that fails if any ramp step drops below its
documented floor against its documented surface.
