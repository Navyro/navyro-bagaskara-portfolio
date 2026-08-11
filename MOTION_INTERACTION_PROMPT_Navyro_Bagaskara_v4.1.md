# MOTION & INTERACTION PROMPT
## Portfolio Website — Navyro Bagaskara
### Version 4.1 — Motion + Context-Aware Cursor

This document is an ADDENDUM to:

- `PRD.md`
- `DESIGN.md`
- `IMPLEMENTATION.md`

Read those documents before implementation.

---

# 1. PURPOSE

The portfolio must not feel static.

The desired experience is:

**Professional Editorial + Minimalist + Interactive + Memorable**

Motion and interaction should strengthen the portfolio's personal branding and demonstrate UI/UX + Front-End capability.

The animation must feel intentionally designed.

It must NOT feel like:

- an AI-generated website;
- a generic portfolio template;
- a motion-design demo;
- a gaming website;
- an experimental WebGL site.

The principle is:

> **Make the interface feel alive without making the interface noisy.**

---

# 2. IMPORTANT IMPLEMENTATION RULE

This is an existing website.

DO NOT rebuild the website from scratch.

Before changing code:

1. Read `PRD.md`.
2. Read `DESIGN.md`.
3. Read `IMPLEMENTATION.md`.
4. Read this document.
5. Inspect the existing codebase.
6. Inspect the current components.
7. Inspect the current animation implementation, if any.
8. Reuse existing good components and styles.

Refine the existing website.

Do not replace the current visual direction unnecessarily.

---

# 3. MOTION STACK

Preferred:

**Motion for React**

Use Motion for:

- entrance animation;
- scroll reveal;
- stagger;
- hover interaction;
- layout transition;
- subtle scroll-linked motion.

Use normal CSS/Tailwind transitions for simple interactions.

Do NOT install multiple animation libraries.

GSAP should only be introduced if a genuinely complex scroll timeline is required.

For this portfolio, Motion should be the default.

---

# 4. MOTION PRIORITY

## MUST HAVE

1. Hero entrance animation
2. Name typewriter/reveal
3. Hero stagger
4. Scroll reveal
5. Project hover interaction
6. Project image reveal
7. Navbar scroll state
8. Button micro-interaction

## SHOULD HAVE

9. Context-aware custom cursor
10. Section number reveal
11. Experience hover interaction
12. Expertise hover interaction
13. Contact CTA reveal
14. Subtle project parallax

## OPTIONAL

15. Scroll progress indicator
16. One magnetic CTA
17. Page transition
18. Desktop-only enhanced cursor behavior

Do not implement optional effects if they make the page feel busy.

---

# 5. HERO ENTRANCE

The hero should have a deliberate entrance sequence.

Sequence:

### 5.1 Eyebrow

```text
UI/UX DESIGNER + FRONT-END
```

Animation:

- opacity: 0 → 1
- y: 10px → 0

Duration:

400–500ms

---

### 5.2 Name

```text
Navyro Bagaskara
```

Use a refined typewriter/reveal effect.

Example:

```text
N
Na
Nav
Navy
Navyro
Navyro B
Navyro Ba
...
Navyro Bagaskara|
```

The effect must:

- run once;
- feel natural;
- finish quickly;
- not repeat on scroll;
- not delete and retype;
- not look like a terminal;
- not block the rest of the website.

Typing speed:

approximately 50–90ms per character.

After completion:

- caret blinks briefly;
- caret disappears;
- name remains static.

If `prefers-reduced-motion` is enabled:

```text
Navyro Bagaskara
```

appears immediately.

---

### 5.3 Role / Description

Reveal after the name.

Use:

- opacity;
- y movement;
- short delay.

---

### 5.4 CTA

Reveal last:

```text
View Selected Work ↗
Contact Me ↗
```

Use a short stagger.

---

# 6. HERO PARALLAX

If the hero contains an appropriate decorative element or image, use very subtle scroll movement.

Maximum movement:

approximately 8–12px.

Do not create dramatic parallax.

If there is no suitable element, skip this effect.

---

# 7. INITIAL PAGE REVEAL

The page may use a subtle first-load reveal.

Preferred:

- opacity;
- small vertical movement.

Do NOT use:

- loading percentage;
- full-screen loader;
- spinning logo;
- 3-second intro;
- fake loading animation.

The page should become usable immediately.

Maximum perceived intro:

approximately 700–1000ms.

---

# 8. SCROLL REVEAL

Major sections should reveal when entering the viewport.

Preferred:

```text
opacity: 0 → 1
transform: translateY(24px) → translateY(0)
```

Duration:

500–700ms.

Use once per section.

Do not repeatedly animate sections every time the user scrolls past them.

---

# 9. STAGGERED SECTION REVEAL

For major sections:

```text
01 — SELECTED WORK
02 — APPROACH
03 — EXPERTISE
04 — EXPERIENCE
05 — ABOUT
06 — CONTACT
```

Use subtle stagger.

Suggested sequence:

1. section number;
2. heading;
3. description;
4. content.

Delay:

approximately 70–120ms between elements.

Do not animate every paragraph character-by-character.

---

# 10. SELECTED WORK — PRIMARY INTERACTION

Selected Work is the main proof of capability.

Projects should feel interactive without becoming flashy.

Each project should have:

- entrance reveal;
- image interaction;
- title/link interaction;
- clear case study CTA.

---

# 11. PROJECT IMAGE REVEAL

When the project enters the viewport:

Use a subtle image reveal.

Possible combination:

- opacity;
- scale 1.02 → 1;
- clip-path/mask reveal.

Example concept:

```text
Initial:
clip-path: inset(8% 0 8% 0)

Final:
clip-path: inset(0 0 0 0)
```

Keep the effect subtle.

---

# 12. PROJECT IMAGE HOVER

Desktop only.

On hover:

```text
scale: 1 → 1.02
```

or maximum:

```text
scale: 1 → 1.03
```

Duration:

400–600ms.

Optional:

- slight brightness change;
- subtle overlay.

Do NOT use:

- rotation;
- distortion;
- glitch;
- shake;
- extreme zoom.

---

# 13. PROJECT TITLE HOVER

When hovering a project link:

- arrow moves approximately 4–6px;
- underline expands;
- title may move 1–2px.

Use only the interactions that look best together.

Do not animate everything simultaneously.

---

# 14. PROJECT CURSOR INTERACTION

This is a key signature interaction.

The portfolio should use a **context-aware custom cursor on desktop**.

The cursor changes according to what the user is interacting with.

This should feel like a UI/UX interaction rather than a decorative cursor effect.

---

# 15. DEFAULT CUSTOM CURSOR

Desktop default:

A small circular cursor.

Recommended:

- 8–12px visual size;
- solid or thin outline;
- high enough contrast;
- subtle lag/lerp;
- smooth movement.

The cursor should follow the pointer naturally.

Do not make it huge.

Do not create a permanent cursor trail.

Do not use particle effects.

Do not use neon glow.

---

# 16. CURSOR SMOOTHNESS

The cursor may have slight easing so it feels refined.

Recommended:

- pointer position follows immediately;
- visual cursor follows with very small interpolation.

The delay must be subtle.

The user should never feel that the cursor is disconnected from the mouse.

---

# 17. CURSOR — PROJECT HOVER

When hovering over a project image or project link:

Change the cursor into a compact contextual indicator.

Preferred:

```text
VIEW ↗
```

or:

```text
OPEN ↗
```

The cursor may expand into a small circle or rounded shape.

Example conceptual appearance:

```text
      ┌──────────┐
      │  VIEW ↗  │
      └──────────┘
```

Keep it compact.

The cursor should communicate:

> This area is interactive.

---

# 18. CURSOR — CASE STUDY

For case study links:

```text
VIEW
CASE STUDY ↗
```

If the label becomes too large, use:

```text
VIEW ↗
```

Prefer short labels.

---

# 19. CURSOR — IMAGE

When hovering over a project image:

Preferred:

```text
VIEW ↗
```

The image can simultaneously:

- scale 1–2%;
- reveal a subtle overlay;
- show the contextual cursor.

Do not add all three at excessive intensity.

The cursor should remain the main interaction cue.

---

# 20. CURSOR — NORMAL LINK

When hovering a normal navigation link:

The cursor may:

- expand slightly;
- reduce opacity;
- change from circle to ring.

Do NOT display text for every navigation link.

Example:

```text
Normal:
●

Hover:
○
```

This keeps navigation elegant.

---

# 21. CURSOR — CTA

For a primary CTA:

```text
View Selected Work ↗
```

the cursor may:

- expand slightly;
- follow with subtle easing;
- optionally show a small arrow.

Do not show a large `CLICK` label.

---

# 22. CURSOR — EMAIL

When hovering an email link:

Optional cursor state:

```text
EMAIL ↗
```

This should only be used if it remains visually clean.

If the cursor starts showing too many labels throughout the site, remove this state.

---

# 23. CURSOR — EXTERNAL LINK

For external links:

```text
OPEN ↗
```

This is optional.

Do not create a unique cursor state for every possible link type.

---

# 24. CONTEXT-AWARE CURSOR STATE MODEL

Implement the cursor using explicit states.

Conceptually:

```ts
type CursorState =
  | "default"
  | "link"
  | "project"
  | "cta"
  | "email"
  | "external"
```

The actual implementation may differ depending on the existing architecture.

Centralize cursor state rather than creating separate cursor logic in every component.

---

# 25. CURSOR COMPONENT

Preferred conceptual architecture:

```text
CursorProvider
    ↓
CustomCursor
    ↓
data-cursor attributes
```

Interactive elements may use:

```html
data-cursor="project"
```

or equivalent React props/context.

Example conceptual API:

```tsx
<InteractiveCursor type="project">
  ...
</InteractiveCursor>
```

Do not duplicate cursor implementation across every project card.

---

# 26. CURSOR MOBILE BEHAVIOR

Custom cursor MUST NOT be used on:

- phones;
- tablets;
- touch devices.

Use native cursor behavior.

The contextual cursor is a desktop enhancement.

The website must remain fully functional without it.

---

# 27. CURSOR ACCESSIBILITY

The custom cursor must never replace the native pointer as the only feedback mechanism.

The underlying element must still have:

- visible hover state;
- keyboard focus state;
- accessible label;
- normal click behavior.

If the custom cursor fails, the website must remain fully usable.

---

# 28. CURSOR REDUCED MOTION

When:

```text
prefers-reduced-motion: reduce
```

disable:

- cursor lag;
- cursor interpolation;
- cursor scale animation;
- cursor morphing;
- custom cursor transitions.

It is acceptable to use the native cursor entirely.

---

# 29. CURSOR PERFORMANCE

Use efficient pointer tracking.

Do NOT:

- update React state on every pointer event if unnecessary;
- trigger expensive re-renders;
- use large DOM trees;
- run multiple animation loops.

Prefer:

- Motion values;
- `requestAnimationFrame`;
- transform;
- opacity;
- scale.

Avoid layout-changing properties.

---

# 30. CUSTOM CURSOR — IMPORTANT DESIGN LIMIT

The custom cursor is a signature detail.

It must NOT dominate the website.

The user should notice it after interacting with the site, not before reading the content.

If the cursor becomes the first thing people notice:

**make it smaller/subtler.**

---

# 31. OPTIONAL MAGNETIC CTA

One primary CTA may use a subtle magnetic interaction.

Candidate:

```text
View Selected Work
```

Maximum movement:

4–6px.

Only desktop.

Do not use magnetic effects on every button.

Do not use it if it interferes with clicking.

---

# 32. NAVBAR SCROLL INTERACTION

Initial:

```text
transparent / integrated
```

After scrolling:

```text
slightly opaque
+
subtle backdrop blur
+
thin border
```

Transition:

200–300ms.

Keep navbar compact.

---

# 33. SCROLL PROGRESS

Optional thin progress indicator.

At top of viewport:

```text
━━━━━━━━━━━━━━━━
```

Recommended:

- 1–2px;
- accent blue;
- fixed;
- subtle.

Do not make it a large progress component.

---

# 34. EXPERIENCE INTERACTION

Experience rows may respond to hover.

Possible:

- role title moves 2px;
- arrow appears;
- timeline marker changes;
- border transitions.

Keep the effect editorial.

Do not turn experience into interactive cards unless the existing design already supports it.

---

# 35. EXPERTISE INTERACTION

For:

```text
UI/UX DESIGN
FRONT-END
TOOLS
```

use subtle hover:

- title movement;
- underline;
- border;
- opacity.

Avoid:

- progress bars;
- animated skill percentages;
- floating skill tags.

---

# 36. ABOUT TEXT REVEAL

The About statement can reveal line-by-line.

Example:

```text
I'm Navyro, a UI/UX Designer
with an interest in Front-End
development.
```

Use:

- opacity;
- y movement.

Do NOT type every character.

The hero is the only place where typewriter is strongly recommended.

---

# 37. CONTACT CTA

When the Contact section enters:

1. section number;
2. heading;
3. description;
4. buttons.

Reveal sequentially.

Buttons receive subtle hover interaction.

Do not use continuous pulsing.

---

# 38. PAGE TRANSITIONS

Optional.

If implemented:

- fade;
- small y movement;
- 250–400ms.

Avoid:

- page wipes;
- long curtains;
- spinning transitions;
- loading screens.

The user must not wait for animation.

---

# 39. CASE STUDY ENTRY

When opening a case study:

1. project title;
2. metadata;
3. hero image;
4. overview;
5. content.

Use quick, subtle transitions.

Do not animate every section of the case study.

Reading should remain the priority.

---

# 40. MOBILE

On mobile:

KEEP:

- hero reveal;
- typewriter;
- scroll reveal;
- image reveal;
- button transitions.

DISABLE/SIMPLIFY:

- custom cursor;
- magnetic CTA;
- hover-only overlay;
- complex parallax;
- cursor-specific labels.

Touch interaction must remain natural.

---

# 41. PERFORMANCE

Animate primarily:

- `transform`;
- `opacity`;
- `scale`;
- `clip-path` where appropriate.

Avoid repeatedly animating:

- width;
- height;
- top;
- left;
- margin;
- padding.

Do not run continuous animation loops without a clear purpose.

Do not animate dozens of elements simultaneously.

---

# 42. TIMING SYSTEM

Use consistent timing.

```text
Micro interaction:     150–200ms
Hover:                 200–300ms
Component reveal:      400–600ms
Hero:                  400–800ms
Page transition:       250–400ms
```

Use smooth easing.

Avoid exaggerated bounce.

---

# 43. ACCESSIBILITY

All motion must respect accessibility.

Requirements:

- semantic HTML;
- keyboard navigation;
- visible focus;
- descriptive links;
- alt text;
- reduced motion;
- no hover-only essential content.

The custom cursor must never be the only interaction feedback.

---

# 44. DO NOT USE THESE EFFECTS

Do NOT add:

- glitch;
- RGB split;
- neon;
- cursor trail;
- particle trail;
- giant blob cursor;
- animated gradient background;
- random particles;
- excessive blur;
- 3D spinning;
- shaking;
- bouncing;
- constant pulsing;
- text scrambling;
- fake terminal effect;
- excessive parallax;
- infinite marquee without purpose.

These conflict with the professional editorial direction.

---

# 45. FINAL MOTION EXPERIENCE

The intended experience:

```text
PAGE LOAD
    ↓
UI/UX DESIGNER + FRONT-END
    ↓
Navyro Bagaskara types in
    ↓
Role / description reveal
    ↓
CTA reveal
    ↓
Scroll
    ↓
Section number reveal
    ↓
Project image reveals
    ↓
Project image subtly responds to cursor
    ↓
Cursor changes to VIEW ↗
    ↓
Open case study
    ↓
Continue scrolling
    ↓
Approach reveals
    ↓
Expertise responds subtly
    ↓
Experience responds subtly
    ↓
About reveals
    ↓
Contact CTA arrives
    ↓
Footer
```

The motion should create rhythm.

It should not make every element move.

---

# 46. FINAL QUALITY TEST

After implementation, inspect the site as a recruiter.

Ask:

### First impression

Does the animation make the website more memorable?

### Professionalism

Does it still look professional?

### Interaction

Does the cursor provide useful feedback?

### Performance

Does the page still feel fast?

### Accessibility

Does the website remain usable without motion?

### Personality

Does the interaction make the portfolio feel like it belongs to Navyro?

If an effect looks impressive but does not improve the experience:

**REMOVE IT.**

---

# 47. DEFINITION OF DONE

The motion implementation is complete when:

- [ ] Hero has a polished entrance.
- [ ] Name has a one-time typewriter/reveal.
- [ ] Hero CTA reveals naturally.
- [ ] Sections reveal on scroll.
- [ ] Selected Work has meaningful hover interaction.
- [ ] Project images have subtle motion.
- [ ] Navbar responds to scroll.
- [ ] Buttons have micro-interactions.
- [ ] Context-aware cursor works on desktop.
- [ ] Cursor changes appropriately over projects.
- [ ] Cursor does not appear on touch devices.
- [ ] Reduced-motion mode works.
- [ ] Keyboard users retain full functionality.
- [ ] Motion does not cause noticeable performance problems.
- [ ] No excessive animation exists.
- [ ] No generic AI-style visual effects were introduced.

---

# 48. FINAL PRINCIPLE

The website should communicate:

**"I understand interaction design."**

not:

**"Look how many animations I can add."**

Motion is part of the portfolio itself.

Every interaction should demonstrate:

- hierarchy;
- feedback;
- usability;
- restraint;
- personality;
- technical implementation quality.

The final result should feel:

**Professional**
+
**Editorial**
+
**Minimalist**
+
**Interactive**
+
**Memorable**
+
**Fast**
+
**Accessible**
