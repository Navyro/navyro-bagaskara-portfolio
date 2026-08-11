# IMPLEMENTATION.md

## Portfolio Website — AI Agent Implementation Specification

This document is the implementation guide for the personal portfolio website.

Before changing code, the AI coding agent MUST read:

1. `PRD.md`
2. `DESIGN.md`
3. `IMPLEMENTATION.md`

If the three documents conflict, use this priority:

1. Product requirements in `PRD.md`
2. Visual and UX requirements in `DESIGN.md`
3. Implementation guidance in this document

Do not silently invent requirements.

---

# 1. Objective

Build and refine a professional personal portfolio website for:

**Navyro Bagaskara**

Positioning:

**UI/UX Designer + Front-End**

Primary goal:

Build personal branding and help recruiters/hiring managers quickly understand the designer's profile, work, experience, capabilities, and contact information.

The website itself must also demonstrate Front-End ability through:

- responsive implementation;
- accessibility;
- performance;
- clean component architecture;
- thoughtful interaction;
- visual accuracy;
- attention to detail.

---

# 2. Critical Instruction: Refine, Do Not Rebuild Blindly

This is an existing portfolio implementation.

DO NOT immediately delete or replace the current project.

Before coding:

- inspect the repository;
- inspect the current framework;
- inspect `package.json`;
- inspect the route structure;
- inspect existing components;
- inspect current styling;
- inspect assets;
- inspect project data/content;
- identify reusable components;
- identify which current sections already satisfy the requirements.

Preserve useful existing implementation.

Refactor where necessary.

Only replace a component when there is a clear reason.

Avoid rewriting the entire application simply to match the specification.

---

# 3. Technology Stack

The intended stack is:

- Next.js
- TypeScript
- Tailwind CSS
- GitHub
- Vercel

The implementation should remain aligned with this stack.

## Do Not Add Unnecessary Technology

MVP does NOT require:

- database;
- authentication;
- admin dashboard;
- Supabase;
- Firebase;
- REST API;
- GraphQL;
- CMS;
- comments;
- microservices;
- complex backend.

Do not introduce a dependency merely because it is popular.

---

# 4. Development Workflow

Follow this sequence.

## Phase 1 — Inspect

Analyze:

- project structure;
- dependencies;
- routes;
- components;
- styles;
- assets;
- content;
- current responsive behavior.

Do not modify code during this phase unless required to run or inspect the project.

## Phase 2 — Map

Create an internal mapping:

| Requirement | Existing Implementation | Action |
|---|---|---|
| Hero | Existing hero | Refine |
| Selected Work | Existing section | Refine |
| Approach | Existing section | Refine |
| Expertise | Existing section | Refine |
| Experience | Existing section | Refine |
| About | Missing / incomplete | Add or refine |
| Contact | Existing CTA | Refine |
| Footer | Existing footer | Refine |

Do not literally create this table in the website. It is an implementation planning reference.

## Phase 3 — Implement

Implement the highest-impact changes first:

1. Hero
2. Selected Work
3. Editorial section numbering
4. Approach
5. Expertise
6. Experience
7. About
8. Contact
9. Footer
10. Responsive refinement
11. Accessibility
12. Performance

## Phase 4 — Validate

Test:

- desktop;
- tablet;
- mobile;
- keyboard navigation;
- focus states;
- image loading;
- direct routes;
- case study routes;
- 404 behavior;
- production build.

---

# 5. Design Direction

The website must follow:

**Professional Editorial + Minimalist**

The visual language should be:

- clean;
- mature;
- confident;
- calm;
- intentional;
- typography-driven;
- image-led;
- human;
- contemporary.

The website should NOT look like:

- AI-generated portfolio;
- generic template;
- SaaS landing page;
- dashboard;
- futuristic AI website;
- Dribbble-style concept page.

---

# 6. Anti-AI Design Rules

Do not add:

- giant gradient backgrounds;
- neon glow;
- glassmorphism;
- floating 3D objects;
- blob decorations;
- excessive rounded cards;
- excessive pill tags;
- excessive shadows;
- animated backgrounds;
- unnecessary cursor effects;
- excessive parallax;
- excessive page transitions;
- fake statistics;
- fake testimonials;
- fake client logos;
- generic buzzword-heavy copy.

If an effect does not improve hierarchy, usability, or communication, do not add it.

---

# 7. Global Visual System

## Background

Primary:

`#F7F7F5`

Surface:

`#FFFFFF`

Primary text:

`#171717`

Secondary text:

`#666666`

Muted:

`#8A8A8A`

Border:

`#E5E5E2`

Accent:

`#1F4FFF`

Accent hover:

`#163FCC`

Inverse background:

`#171717`

Inverse text:

`#F7F7F5`

Use the accent sparingly.

Do not introduce additional global accent colors.

---

# 8. Typography

Use:

- Manrope for headings/display;
- Inter for body/UI;
- system sans-serif fallback.

Do not add additional font families.

Typography should have strong hierarchy.

Recommended desktop:

- Display: 72–96px
- H1: 56–72px
- H2: 40–48px
- H3: 28–32px
- Body large: 20px
- Body: 16–18px
- Small: 14px
- Caption: 12–13px

Recommended mobile:

- Display: 48–64px
- H1: 40–48px
- H2: 32–36px
- H3: 24–28px
- Body: 16px

Do not make all text large.

Maintain hierarchy.

---

# 9. Layout

Use a responsive editorial grid.

Desktop:

12 columns

Tablet:

8 columns

Mobile:

4 columns

Recommended container:

`max-width: 1280px`

Recommended horizontal padding:

- mobile: 24px
- tablet: 40px
- desktop: 48px

Use whitespace intentionally.

Do not compress sections merely to make the page shorter.

---

# 10. Spacing

Use a consistent spacing scale:

```text
4
8
12
16
24
32
48
64
80
96
128
160
```

Section spacing:

Desktop:

96–160px

Mobile:

64–96px

Do not mechanically apply the same spacing to every section.

Hierarchy determines spacing.

---

# 11. Border Radius

Use moderate radius.

Recommended:

- buttons: 8px
- inputs: 8px
- images: 8–12px
- project visuals: 8–12px
- small UI: 6–8px

Do not use `rounded-full` by default.

---

# 12. Shadow

Default:

No shadow.

Use borders and whitespace to establish hierarchy.

Only use shadows where actual elevation is needed:

- modal;
- dropdown;
- floating navigation;
- mobile menu.

---

# 13. Navigation

Desktop navigation should remain minimal.

Recommended structure:

```text
NAVYRO                         WORK   ABOUT   CONTACT   RESUME ↗
```

Mobile:

```text
NAVYRO                                      MENU
```

States:

- default;
- hover;
- active;
- focus.

Do not use complex navigation animations.

Navigation should remain accessible by keyboard.

---

# 14. Homepage Structure

Preferred order:

```text
NAVBAR

01 — HERO

02 — SELECTED WORK

03 — APPROACH

04 — EXPERTISE

05 — EXPERIENCE

06 — ABOUT

07 — CONTACT

FOOTER
```

Do not blindly force the structure if the existing implementation has a clearly superior composition. However, the final experience must communicate the same information hierarchy.

---

# 15. Hero Implementation

The hero is the first priority.

It must immediately communicate:

**Navyro Bagaskara**
**UI/UX Designer + Front-End**

Recommended content hierarchy:

```text
UI/UX DESIGNER + FRONT-END

Navyro Bagaskara

Short professional statement.

View Selected Work ↗
Contact Me ↗
```

Optional:

```text
SCROLL ↓
```

The hero should not contain:

- skill chips;
- technology badges;
- statistics;
- floating cards;
- decorative 3D;
- excessive illustrations.

Make the name visually dominant.

The hero should feel editorial, not like a SaaS hero.

---

# 16. Section Numbering

Introduce a subtle numbering system:

```text
01 — SELECTED WORK
02 — APPROACH
03 — EXPERTISE
04 — EXPERIENCE
05 — ABOUT
06 — CONTACT
```

Use it consistently.

Do not make the numbers oversized decoration.

They should behave like editorial metadata.

---

# 17. Selected Work

Selected Work is the primary portfolio proof.

Each project should expose:

- number;
- title;
- category;
- year;
- role;
- short description;
- project visual;
- case study link.

Recommended structure:

```text
01

NexaBank — Mobile Banking Experience Redesign

UI/UX DESIGN · MOBILE · 2026

ROLE
UI/UX Designer

FOCUS
Research · UX Flow · UI Design

[ LARGE PROJECT VISUAL ]

Short concise description.

View case study ↗
```

Keep metadata concise.

The recruiter should understand the project within approximately 3–5 seconds.

Do not force all projects into identical rounded cards.

Editorial alternatives are allowed:

- full-width image;
- asymmetric layout;
- image + text split;
- alternating layout.

---

# 18. Project Data Architecture

For MVP, project data should be local.

Preferred approaches:

- typed local TypeScript data; or
- Markdown/MDX.

Choose the simplest maintainable option based on the existing project.

No database is required.

Create a consistent project model.

Example conceptual structure:

```ts
type Project = {
  slug: string
  title: string
  category: string
  year: string
  role: string
  description: string
  coverImage: string
  focus?: string[]
}
```

Do not invent project information.

Use actual content when available.

---

# 19. Project Detail / Case Study

Case study pages should be content-led.

Possible structure:

```text
Project Header
Overview
Problem
Research
Key Insights
Define
Ideation
Information Architecture
User Flow
Wireframe
UI Design
Prototype
Testing
Final Result
Reflection
```

Only render sections that actually exist for the project.

Do not invent research or testing.

Case study visuals should be large and readable.

Avoid tiny screenshots.

---

# 20. Approach

Refactor the current philosophy section to improve scanability.

Preferred structure:

```text
02 — APPROACH

Short introduction.

01 — Understand
Short explanation.

02 — Simplify
Short explanation.

03 — Validate
Short explanation.

04 — Build
Short explanation.
```

Only use principles supported by actual experience/process.

Avoid long paragraphs.

---

# 21. Expertise

Do not make Expertise look like a dashboard.

Prefer editorial grouping.

Example:

```text
03 — EXPERTISE

01
UI/UX DESIGN

User Research
Information Architecture
User Flow
Wireframing
Prototyping
UI Design
Usability Testing

02
FRONT-END

HTML
CSS
JavaScript
TypeScript
React / Next.js
Tailwind CSS

03
TOOLS

Figma
GitHub
VS Code
...
```

Use only genuine skills.

Avoid excessive pills/tags.

---

# 22. Experience

Experience should communicate:

- role;
- organization;
- period;
- contribution.

Preferred structure:

```text
04 — EXPERIENCE

01
UI/UX DESIGNER & FRONT-END SPECIALIST
Organization
2025 — Present

Short summary.

Key contribution:
- ...
- ...
```

Keep descriptions concise.

Do not turn the homepage into a full CV.

---

# 23. About

Add/refine an About preview.

Preferred:

```text
05 — ABOUT

I'm Navyro, a UI/UX Designer with
an interest in Front-End development.

I enjoy turning complex problems
into clear, usable, thoughtful
digital experiences.

More about me ↗
```

Optional supporting information:

- education;
- location;
- availability;
- resume.

Do not write a long autobiography on the homepage.

---

# 24. Resume

Provide a clear:

`Download Resume ↗`

Resume should be a PDF.

Do not make Resume the strongest CTA on the page.

Selected Work should remain the primary CTA.

---

# 25. Contact

Preferred:

```text
06 — LET'S TALK

Punya proyek atau peluang menarik?

Saya terbuka untuk berdiskusi mengenai
pekerjaan, kolaborasi, maupun project yang relevan.

Get in touch ↗
Resume ↗
```

Use natural human language.

Avoid generic AI copywriting.

If there is no backend contact form requirement, prefer direct contact links such as email and social profiles.

---

# 26. Footer

Keep the black footer.

Recommended hierarchy:

```text
NAVYRO BAGASKARA
UI/UX DESIGNER + FRONT-END

Short professional statement.

CONTACT
Email

SOCIAL
LinkedIn
GitHub

© 2026 Navyro Bagaskara
```

Keep it minimal.

---

# 27. Components

Prefer reusable components.

Suggested components:

```text
Navbar
MobileMenu
Hero
SectionLabel
SectionHeading
ProjectList
ProjectCard
ProjectMeta
CaseStudySection
ImageBlock
Button
TextLink
ExperienceItem
SkillGroup
AboutPreview
ContactCTA
Footer
```

Do not create unnecessary abstractions.

Do not create components solely because a pattern appears once.

---

# 28. Component Rules

Interactive components need:

- default;
- hover;
- focus;
- active;
- disabled when applicable;
- error when applicable.

Use semantic HTML.

Examples:

- links for navigation;
- buttons for actions;
- headings for hierarchy;
- lists for lists.

Do not use `<div>` as a replacement for every semantic element.

---

# 29. Buttons and Links

Primary CTA:

- View Selected Work
- Contact Me

Secondary:

- View Case Study
- Download Resume
- External Project

Do not make every link a button.

Use simple hover behavior.

Examples:

- opacity change;
- underline;
- subtle translation;
- small arrow movement.

---

# 30. Motion

Motion should be subtle.

Use CSS/Tailwind transitions first.

Recommended:

- 150ms micro interaction;
- 200ms button/link;
- 300ms component;
- 400–600ms larger entrance.

Avoid long animation sequences.

Respect:

`prefers-reduced-motion`

Do not install an animation library unless required.

If Framer Motion already exists and is useful, use it selectively.

---

# 31. Images

Use high-quality project images.

Rules:

- optimize images;
- use appropriate dimensions;
- use lazy loading for non-critical images;
- provide alt text;
- avoid unnecessary mockups;
- preserve UI readability.

If Next.js Image is available, use it appropriately.

Do not blindly optimize at the expense of visual quality.

---

# 32. Responsive Requirements

Desktop:

- 12-column grid;
- large type;
- large visuals;
- editorial composition.

Tablet:

- 8-column grid;
- reduced typography;
- balanced spacing.

Mobile:

- 4-column grid;
- single-column content where appropriate;
- compact navigation;
- touch-friendly controls;
- no horizontal overflow.

Check at minimum:

- 1440px;
- 1280px;
- 1024px;
- 768px;
- 390px;
- 375px.

Do not optimize only for one viewport.

---

# 33. Accessibility

Required:

- semantic HTML;
- heading hierarchy;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- descriptive links;
- alt text;
- accessible button labels;
- reduced motion support.

Do not use color as the only state indicator.

---

# 34. Performance

Priorities:

- optimized images;
- minimal JavaScript;
- minimal dependencies;
- optimized fonts;
- no unnecessary third-party scripts;
- avoid layout shift;
- good Core Web Vitals.

Do not add heavy libraries for small interactions.

---

# 35. SEO

Each important route should have appropriate:

- title;
- description;
- Open Graph metadata where appropriate;
- canonical URL when required.

Project pages should have unique metadata.

Do not keyword-stuff.

---

# 36. Routing

Required conceptual routes:

```text
/
 /work
 /work/[slug]
 /about
```

Optional:

```text
/resume
```

Contact can be a section or dedicated route depending on the existing implementation.

Direct navigation to project routes must work.

404 behavior must be intentional.

---

# 37. Content Integrity

NEVER invent:

- clients;
- metrics;
- awards;
- testimonials;
- research participants;
- user testing results;
- employment history;
- project outcomes;
- certifications.

If information is unavailable:

- preserve existing placeholder;
- use a clearly marked placeholder;
- or omit the element.

Do not present assumptions as facts.

---

# 38. Git / Repository

Maintain:

- clean repository;
- `.gitignore`;
- README;
- meaningful commit history;
- no secrets;
- no API keys in source;
- no unnecessary generated files.

Suggested commit progression:

```text
chore: inspect and establish design tokens
refactor: refine portfolio layout
feat: improve hero section
feat: refine selected work
feat: add about preview
refactor: improve responsive behavior
fix: accessibility and navigation states
perf: optimize images and fonts
```

Do not create dozens of meaningless commits.

---

# 39. Validation Checklist

## Product

- [ ] Role is immediately clear.
- [ ] Selected Work is easy to find.
- [ ] Case studies are accessible.
- [ ] About is accessible.
- [ ] Resume is accessible.
- [ ] Contact is easy to find.

## Visual

- [ ] Professional Editorial + Minimalist direction is clear.
- [ ] Typography hierarchy is strong.
- [ ] Spacing is consistent.
- [ ] Project visuals dominate appropriately.
- [ ] Accent color is restrained.
- [ ] Cards are not excessive.
- [ ] No unnecessary gradients.
- [ ] No unnecessary glassmorphism.
- [ ] No AI-template aesthetics.

## UX

- [ ] Recruiter can scan the homepage quickly.
- [ ] Navigation is understandable.
- [ ] Project contribution is clear.
- [ ] CTA hierarchy is clear.
- [ ] Case study navigation is logical.

## Responsive

- [ ] 1440px works.
- [ ] 1280px works.
- [ ] 1024px works.
- [ ] 768px works.
- [ ] 390px works.
- [ ] 375px works.
- [ ] No horizontal overflow.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Contrast is acceptable.
- [ ] Images have alt text.
- [ ] Heading hierarchy is correct.
- [ ] Reduced motion is respected.

## Technical

- [ ] TypeScript has no avoidable errors.
- [ ] Production build succeeds.
- [ ] Routes work directly.
- [ ] Images load correctly.
- [ ] No secrets are exposed.
- [ ] No unnecessary dependencies were added.

---

# 40. Definition of Done

The implementation is considered complete when:

1. The website follows `PRD.md`.
2. The website follows `DESIGN.md`.
3. The visual direction feels professional and human.
4. The homepage communicates the designer's identity within seconds.
5. Selected Work is the strongest visual proof.
6. Case studies are easy to access.
7. About, Experience, Expertise, Resume, and Contact are understandable.
8. Responsive layouts work across target viewports.
9. Accessibility basics are implemented.
10. Production build succeeds.
11. No unnecessary backend or CMS exists.
12. No fake content has been introduced.
13. The website does not look like an AI-generated portfolio template.

---

# 41. Final Instruction to AI Agent

Before making changes, READ:

- `PRD.md`
- `DESIGN.md`
- `IMPLEMENTATION.md`

Then inspect the existing codebase.

Do not rebuild blindly.

Do not over-design.

Do not add unnecessary technology.

Do not invent content.

Preserve the current strengths.

Fix the hierarchy and weak areas.

Make the work the interface.

The final result should feel like:

**a real designer's professional portfolio**

not:

**an AI-generated portfolio template.**
