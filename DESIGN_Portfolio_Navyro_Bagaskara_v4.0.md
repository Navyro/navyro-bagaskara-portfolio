# Portfolio Design System & Architecture

## 1. Design Overview

- Product : Personal Portfolio Website
- Positioning : UI/UX Designer + Front-End
- Primary Goal : Personal Branding
- Primary Audience : Recruiter / Hiring Manager / Company
- Primary Content : UI/UX projects and case studies
- Visual Direction : **Professional Editorial + Minimalist**
- Design Principle : Clear, intentional, mature, human, and professional.
- Primary Experience : Recruiter dapat memahami profil, karya, proses, dan cara menghubungi pemilik portfolio dengan cepat.

Dokumen ini merupakan pedoman visual dan interface yang mengikuti PRD v4.0.

---

## 2. Design Goals

Website harus:

1. Menampilkan personal branding yang kuat.
2. Menjadikan project sebagai bukti kompetensi utama.
3. Menampilkan proses berpikir UI/UX, bukan hanya screenshot.
4. Menunjukkan kemampuan Front-End melalui kualitas implementasi website.
5. Memiliki visual yang profesional dan tidak terasa seperti template generik.
6. Memiliki hierarchy yang jelas.
7. Tetap cepat, responsif, dan accessible.

### Desired Impression

Pengunjung sebaiknya berpikir:

> “Orang ini memang designer.”

Bukan:

> “Ini terlihat seperti template AI.”

---

# 3. Visual Direction

## 3.1 Primary Style

**Professional Editorial + Minimalist**

Karakter:

- clean;
- editorial;
- confident;
- restrained;
- typography-driven;
- spacious;
- image-led;
- intentional.

Website tidak menggunakan gaya dashboard, SaaS landing page, atau futuristic AI sebagai identitas utama.

## 3.2 Visual Hierarchy

Prioritas visual:

1. Nama dan professional positioning.
2. Selected Work.
3. Project visual.
4. Case study content.
5. Experience / Skills.
6. Resume / Contact.

Dekorasi tidak boleh mengalahkan karya.

---

# 4. Anti-Generic / Anti-AI Rules

Hindari penggunaan:

- gradient besar tanpa fungsi;
- glassmorphism sebagai gaya utama;
- blob shapes;
- floating 3D objects yang tidak berkaitan dengan project;
- neon glow;
- excessive shadows;
- terlalu banyak rounded cards;
- terlalu banyak pill/chip;
- dashboard-style sections;
- excessive badges;
- cursor effect yang mengganggu;
- parallax berlebihan;
- animasi yang terus bergerak;
- copywriting generik;
- section dekoratif tanpa fungsi.

### Card Usage

Card hanya digunakan jika memang membantu grouping atau hierarchy.

Project tidak harus selalu ditampilkan sebagai:

```text
┌──────────────────────┐
│ IMAGE                │
├──────────────────────┤
│ TITLE                │
│ DESCRIPTION          │
│ TAGS                 │
└──────────────────────┘
```

Alternatif yang lebih editorial:

```text
01

PROJECT NAME
UI/UX DESIGN · WEB

[ LARGE PROJECT VISUAL ]

Short project description.

View case study →
```

---

# 5. Design Language

## 5.1 Tone

Visual tone:

- professional;
- calm;
- precise;
- confident;
- personal;
- contemporary.

## 5.2 Density

Gunakan density rendah hingga sedang.

Prioritaskan:

- whitespace;
- clear grouping;
- short copy;
- large visuals.

## 5.3 Decoration

Dekorasi hanya digunakan apabila memiliki fungsi visual yang jelas.

---

# 6. Typography

## 6.1 Font Strategy

Recommended:

- Heading / Display : **Manrope**
- Body / UI : **Inter**
- Fallback : system sans-serif

Manrope memberikan karakter yang lebih distinctive pada heading, sedangkan Inter menjaga readability untuk body dan UI.

## 6.2 Type Scale

| Token | Desktop | Mobile | Weight | Usage |
|---|---:|---:|---|---|
| Display | 72–96px | 48–64px | 600–700 | Hero |
| H1 | 56–72px | 40–48px | 600–700 | Page title |
| H2 | 40–48px | 32–36px | 600 | Section heading |
| H3 | 28–32px | 24–28px | 600 | Project / subsection |
| Body Large | 20px | 18px | 400 | Lead paragraph |
| Body | 16–18px | 16px | 400 | Main content |
| Small | 14px | 14px | 400–500 | Metadata |
| Caption | 12–13px | 12–13px | 400–500 | Supporting information |

## 6.3 Typography Rules

- Jangan menggunakan terlalu banyak font family.
- Maksimal dua font family.
- Heading harus memiliki hierarchy yang jelas.
- Body text harus mudah dibaca.
- Hindari paragraph terlalu lebar.
- Gunakan line-height yang cukup untuk readability.
- Gunakan uppercase hanya untuk metadata atau label tertentu.

---

# 7. Color System

## 7.1 Direction

Gunakan **light editorial theme** sebagai default.

Alasan:

- portfolio project lebih mudah menjadi visual focus;
- screenshot UI terlihat lebih natural;
- readability tinggi;
- terasa profesional;
- sesuai dengan editorial/minimalist direction.

## 7.2 Color Tokens

| Token | Recommended Value | Usage |
|---|---|---|
| Background | `#F7F7F5` | Main background |
| Surface | `#FFFFFF` | Image / elevated surface bila diperlukan |
| Primary Text | `#171717` | Heading dan main text |
| Secondary Text | `#666666` | Supporting text |
| Muted Text | `#8A8A8A` | Metadata |
| Border | `#E5E5E2` | Divider / subtle border |
| Accent | `#1F4FFF` | CTA / active state |
| Accent Hover | `#163FCC` | Hover |
| Inverse Background | `#171717` | Dark section / footer |
| Inverse Text | `#F7F7F5` | Text pada dark section |

Accent color harus digunakan secara hemat.

## 7.3 Color Rules

Jangan menggunakan:

- banyak accent colors;
- neon gradients;
- glow effects;
- warna berbeda untuk setiap project.

Project boleh memiliki warna visualnya sendiri melalui screenshot/mockup tanpa mengubah global design system.

---

# 8. Layout & Grid

## 8.1 Container

Recommended:

```text
max-width : 1280px
margin    : auto
padding   : 24px mobile
padding   : 40px tablet
padding   : 48px desktop
```

Tailwind implementation dapat menggunakan:

```text
max-w-7xl mx-auto px-6 lg:px-12
```

Nilai final dapat disesuaikan melalui hasil visual testing.

## 8.2 Grid

Desktop:

- 12-column grid.

Tablet:

- 8-column grid.

Mobile:

- 4-column grid.

## 8.3 Alignment

Gunakan alignment yang konsisten.

Prioritas:

- left alignment untuk editorial content;
- center alignment hanya jika memang mendukung hierarchy;
- jangan membuat setiap section centered.

---

# 9. Spacing System

Gunakan spacing scale yang konsisten.

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

## Section Spacing

Desktop:

```text
96–160px
```

Mobile:

```text
64–96px
```

Spacing harus disesuaikan dengan hierarchy, bukan diterapkan secara mekanis.

---

# 10. Border Radius

Gunakan radius secara moderat.

Recommended:

| Element | Radius |
|---|---:|
| Button | 8px |
| Input | 8px |
| Image | 8–12px |
| Project visual | 8–12px |
| Small UI element | 6–8px |

Hindari `rounded-full` sebagai default.

Pill shape hanya digunakan untuk:

- category;
- metadata;
- status tertentu.

---

# 11. Shadow & Elevation

Default:

**No shadow.**

Gunakan border dan whitespace sebagai hierarchy.

Shadow hanya digunakan apabila element memang membutuhkan elevation.

Contoh:

- modal;
- dropdown;
- floating navigation;
- mobile menu.

---

# 12. Navigation

## Desktop

Recommended:

```text
NAVYRO                         WORK   ABOUT   CONTACT   RESUME ↗
```

Karakter:

- minimal;
- fixed atau sticky jika diperlukan;
- tidak terlalu tinggi;
- clean;
- transparent/solid sesuai background.

## Mobile

Gunakan:

```text
NAVYRO                                      MENU
```

Menu membuka navigation panel sederhana.

## Navigation States

- default;
- hover;
- active;
- focus.

Tidak perlu animasi kompleks.

---

# 13. Home Page Architecture

```text
NAVBAR
│
├── HERO
│
├── SELECTED WORK
│
├── ABOUT PREVIEW
│
├── EXPERIENCE / SKILLS
│
├── CONTACT CTA
│
└── FOOTER
```

## 13.1 Hero

Hero harus sederhana dan langsung menjelaskan:

- Name;
- Role;
- short professional statement;
- CTA.

Recommended structure:

```text
UI/UX DESIGNER
+ FRONT-END

Navyro Bagaskara

[Short professional statement]

View work →
Contact →
```

Jangan memenuhi hero dengan:

- banyak badges;
- skill chips;
- statistics yang tidak diperlukan;
- decorative 3D;
- floating cards.

---

# 14. Selected Work

Project menjadi visual utama website.

Recommended:

```text
SELECTED WORK

01
PROJECT NAME
UI/UX DESIGN · WEB

[ LARGE VISUAL ]

Short description.

View case study →
```

## Project Metadata

Gunakan metadata sederhana:

```text
Role
Year
Type
Tools
```

Tidak perlu menampilkan semua metadata pada card.

---

# 15. Work Page

Struktur:

```text
WORK

Selected projects and case studies.

01 PROJECT
02 PROJECT
03 PROJECT
04 PROJECT
```

Project list dapat menggunakan:

- editorial list;
- asymmetric grid;
- large image layout.

Gunakan filtering hanya jika jumlah project sudah cukup banyak.

---

# 16. Project Detail / Case Study

Case study adalah bagian terpenting untuk portfolio UI/UX.

## Structure

```text
PROJECT HEADER
│
├── Overview
├── Problem
├── Research
├── Key Insights
├── Define
├── Ideation
├── Information Architecture
├── User Flow
├── Wireframe
├── UI Design
├── Prototype
├── Testing
├── Final Result
└── Reflection
```

Tidak semua section wajib ditampilkan.

Hanya gunakan bagian yang benar-benar dilakukan dalam project.

## Case Study Visual Rules

- Gunakan image besar.
- Hindari screenshot terlalu kecil.
- Gunakan whitespace untuk memisahkan tahap.
- Beri caption jika diperlukan.
- Jelaskan keputusan desain secara singkat.
- Tampilkan kontribusi pribadi dengan jelas.

---

# 17. About Page

Struktur:

```text
ABOUT

Short professional introduction.

EXPERIENCE

EDUCATION

SKILLS

TOOLS

RESUME
```

About harus terasa seperti professional profile, bukan autobiography panjang.

---

# 18. Skills Presentation

Kelompokkan skill:

### UI/UX

- User Research
- Information Architecture
- User Flow
- Wireframing
- Prototyping
- UI Design
- Usability Testing

### Front-End

Hanya tampilkan teknologi yang benar-benar dikuasai.

Contoh:

- HTML
- CSS
- JavaScript
- TypeScript
- React / Next.js
- Tailwind CSS

### Tools

- Figma
- GitHub
- VS Code
- Canva
- tools lain yang benar-benar digunakan.

Jangan memasukkan skill hanya karena pernah mencoba.

---

# 19. Experience

Gunakan layout editorial sederhana.

Contoh:

```text
2025
UI/UX Design Intern
Organization Name

Short description of responsibilities
and relevant contribution.
```

Hindari timeline dekoratif yang terlalu kompleks.

---

# 20. Resume

CTA:

```text
Download Resume ↗
```

Button harus terlihat tetapi tidak menjadi visual paling dominan.

Resume disediakan dalam PDF.

---

# 21. Contact

Recommended structure:

```text
LET'S TALK.

Available for opportunities,
collaboration, or relevant projects.

EMAIL
LinkedIn
GitHub
```

Contact form bersifat optional.

Jika form digunakan, state:

- default;
- focus;
- validation error;
- loading;
- success;
- failure.

---

# 22. Footer

Footer minimal.

```text
Navyro Bagaskara

UI/UX Designer + Front-End

Email
LinkedIn
GitHub

© 2026 Navyro Bagaskara
```

Tidak perlu menambahkan banyak link yang tidak relevan.

---

# 23. Components

## Core Components

- Navbar
- MobileMenu
- Hero
- SectionHeading
- ProjectList
- ProjectCard
- ProjectMeta
- CaseStudySection
- ImageBlock
- Button
- TextLink
- ExperienceItem
- SkillGroup
- ContactCTA
- Footer

## Component States

Interactive components harus memiliki:

- default;
- hover;
- focus;
- active;
- disabled bila relevan;
- error bila relevan.

---

# 24. Buttons & Links

## Primary CTA

Digunakan untuk:

- View Work;
- Contact;
- Download Resume.

## Secondary CTA

Digunakan untuk:

- View Case Study;
- External project;
- Prototype.

## Text Link

Digunakan untuk:

- navigation;
- metadata;
- supporting action.

### Rules

- Jangan membuat semua link berbentuk button.
- Gunakan button hanya untuk action penting.
- Gunakan underline/transition sederhana pada text link.

---

# 25. Interaction & Motion

Motion harus **subtle dan purposeful**.

## Recommended

- opacity transition;
- transform kecil;
- image scale 1–3%;
- underline transition;
- menu transition;
- page transition yang ringan.

## Recommended Technology

Gunakan **CSS transitions / Tailwind transitions terlebih dahulu**.

Library animation tambahan hanya digunakan jika memang memberikan nilai UX yang jelas.

Jika membutuhkan animation library yang kompleks, **Framer Motion** dapat digunakan secara terbatas.

AOS tidak menjadi dependency wajib.

## Motion Duration

Recommended:

```text
150ms  → micro interaction
200ms  → button / link
300ms  → component transition
400–600ms → larger entrance
```

Hindari animasi panjang yang memperlambat akses ke content.

## Reduced Motion

Website harus menghormati:

```text
prefers-reduced-motion
```

---

# 26. Image Direction

Project image adalah salah satu elemen visual utama.

## Rules

- gunakan image berkualitas tinggi;
- gunakan aspect ratio yang konsisten bila sesuai;
- optimalkan ukuran file;
- gunakan lazy loading untuk image non-critical;
- gunakan alt text;
- jangan menambahkan device mockup jika tidak membantu konteks.

## Case Study

Untuk final UI:

- gunakan screenshot besar;
- gunakan full-width visual bila diperlukan;
- gunakan crop yang menjaga detail interface;
- jangan terlalu banyak decorative frame.

---

# 27. Responsive Design

## Desktop

- 12-column grid;
- large typography;
- large project visual;
- editorial composition;
- full navigation.

## Tablet

- adaptive grid;
- reduced type scale;
- balanced spacing.

## Mobile

- 4-column grid;
- single-column content;
- compact navigation;
- touch-friendly target;
- readable typography;
- no horizontal scrolling.

## Mobile Priority

Pada mobile, prioritas:

1. Identity.
2. Selected Work.
3. Case Study.
4. About.
5. Resume.
6. Contact.

---

# 28. Accessibility

Minimum requirements:

- semantic HTML;
- correct heading hierarchy;
- visible focus state;
- keyboard navigation;
- sufficient contrast;
- descriptive link text;
- alt text;
- accessible button labels;
- reduced motion support;
- touch targets yang memadai.

Jangan menggunakan warna sebagai satu-satunya indikator status.

---

# 29. Technical Design Alignment

Design harus diimplementasikan menggunakan stack PRD v4.0:

```text
Next.js
TypeScript
Tailwind CSS
GitHub
Vercel
```

## Design-to-Code Principles

- Figma menjadi source of truth untuk visual.
- Components dibuat reusable.
- Design tokens diterjemahkan menjadi CSS/Tailwind variables.
- Tidak membuat component hanya untuk satu penggunaan jika pola dapat direuse.
- Jangan membuat abstraction berlebihan.
- Responsive behavior harus ditentukan sejak tahap design.
- Semantic HTML tetap menjadi prioritas.

---

# 30. Design Tokens

Recommended token structure:

```text
Colors
├── background
├── surface
├── text-primary
├── text-secondary
├── text-muted
├── border
├── accent
└── accent-hover

Typography
├── display
├── h1
├── h2
├── h3
├── body-lg
├── body
├── small
└── caption

Spacing
├── 4
├── 8
├── 12
├── 16
├── 24
├── 32
├── 48
├── 64
├── 80
├── 96
├── 128
└── 160

Radius
├── sm
├── md
└── lg
```

---

# 31. Design QA Checklist

## Visual

- [ ] Visual direction terasa professional.
- [ ] Website tidak terlihat seperti template AI.
- [ ] Typography memiliki hierarchy.
- [ ] Spacing konsisten.
- [ ] Grid konsisten.
- [ ] Project menjadi fokus utama.
- [ ] Warna tidak berlebihan.
- [ ] Shadow tidak berlebihan.
- [ ] Card tidak digunakan secara berlebihan.
- [ ] Dekorasi memiliki fungsi.

## UX

- [ ] Recruiter memahami role dengan cepat.
- [ ] Work mudah ditemukan.
- [ ] Case study mudah dibaca.
- [ ] Resume mudah ditemukan.
- [ ] Contact mudah ditemukan.
- [ ] Navigation jelas.
- [ ] Mobile experience nyaman.

## Accessibility

- [ ] Contrast diperiksa.
- [ ] Keyboard navigation bekerja.
- [ ] Focus state terlihat.
- [ ] Alt text tersedia.
- [ ] Heading hierarchy benar.
- [ ] Reduced motion didukung.

## Responsive

- [ ] Desktop tested.
- [ ] Tablet tested.
- [ ] Mobile tested.
- [ ] Tidak ada horizontal overflow.
- [ ] Image tidak rusak.
- [ ] Typography tetap readable.

---

# 32. Design Decision Summary

| Area | Decision |
|---|---|
| Visual Direction | Professional Editorial + Minimalist |
| Theme | Light editorial |
| Primary Font | Manrope |
| Body Font | Inter |
| Color | Neutral + single accent |
| Layout | Editorial grid |
| Grid | 12 / 8 / 4 columns |
| Container | Max ~1280px |
| Radius | Moderate |
| Shadow | Minimal |
| Project Presentation | Large visual + concise metadata |
| Case Study | Content-led |
| Animation | Subtle and purposeful |
| Animation Dependency | Not required |
| UI Framework | Tailwind CSS |
| Front-End Framework | Next.js |
| Language | TypeScript |
| Deployment | Vercel |
| Version Control | GitHub |
| Backend | Not required for MVP |
| CMS | Not required for MVP |
| Admin Dashboard | Not required |
| Comments | Not required |
| Public Database | Not required |

---

# 33. Final Design Principle

> **Make the work the interface.**

Website harus menunjukkan kemampuan desain melalui:

- typography;
- spacing;
- hierarchy;
- composition;
- interaction;
- responsive behavior;
- accessibility;
- performance.

Jangan menggunakan efek visual untuk membuktikan bahwa website dibuat dengan teknologi modern.

**Kualitas desain dan pengalaman pengguna adalah showcase utama.**
