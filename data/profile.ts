export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  /**
   * Display string taken from the certificate itself. Month-only values ("Okt") are allowed
   * where the issuer prints no date — never fill in a year that is not documented.
   */
  date?: string;
  note?: string;
  /** Only featured items are rendered as open rows; the rest live in the grouped index. */
  featured?: boolean;
  group: string;
  /** Public verification URL, only when one was actually found in the source files. */
  url?: string;
}

export interface CertificationGroup {
  label: string;
  count: number;
  detail: string;
}

export interface ProfileData {
  name: string;
  role: string;
  shortStatement: string;
  fullBio: string;
  email: string;
  /** Optional: only rendered when the link is known to be correct. */
  linkedin?: string;
  instagram?: string;
  github?: string;
  location: string;
  resumeFilename: string;
  /** Same CV in Bahasa Indonesia, for local recruiters who prefer it. */
  resumeFilenameId: string;
  /** 12-page portfolio PDF, 12 MB: labelled with its size wherever it is offered. */
  portfolioFilename: string;
  skills: {
    uiux: string[];
    frontend: string[];
    tools: string[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  /** Grouped index of every credential, collapsed by default on /resume. */
  certificationGroups: CertificationGroup[];
}

/**
 * Single source of truth for identity. Every value below is taken from
 * `TENTANG SAYA/CV_Navyro_Bagaskara_EN.pdf` — do not add unverified facts.
 */
export const profileData: ProfileData = {
  name: "Navyro Bagaskara",
  role: "UI/UX Designer",
  shortStatement:
    "Information Systems graduate with a focus on UI/UX Design. I work from user research, information architecture, and user flows through to high-fidelity interfaces and interactive prototypes in Figma.",
  fullBio:
    "Information Systems graduate from Universitas Alma Ata (GPA 3.87/4.00) with a primary focus on UI/UX Design. My work starts with interviews and observation to understand user needs, then turns that into information architecture, user flows, wireframes, high-fidelity interfaces, and interactive prototypes in Figma. I also test designs with users using the System Usability Scale (SUS), build design systems, and work on content and social media design. On the technical side, I have a foundation in web development (HTML, CSS, JavaScript) that makes designs easier for developers to execute.",
  email: "navbagaskara@gmail.com",
  linkedin: "https://www.linkedin.com/in/navyro-bagaskara/",
  instagram: "https://www.instagram.com/navyroo/",
  location: "Bekasi, West Java, Indonesia",
  resumeFilename: "Navyro_Bagaskara_CV.pdf",
  resumeFilenameId: "Navyro_Bagaskara_CV_ID.pdf",
  portfolioFilename: "Navyro_Bagaskara_Portofolio.pdf",
  skills: {
    uiux: [
      "User Research (Interviews & Observation)",
      "Information Architecture",
      "User Flow & Sitemap",
      "Wireframing",
      "High-Fidelity UI Design",
      "Interactive Prototyping",
      "Design System",
      "Usability Testing & System Usability Scale (SUS)",
      "Design Thinking",
    ],
    frontend: [
      "HTML5 & Semantic Markup",
      "CSS3 & Responsive Layout",
      "JavaScript (Fundamentals)",
      "DOM Manipulation & Event Handling",
      "Front-End Web Fundamentals",
    ],
    tools: ["Figma", "Canva", "CapCut", "Adobe Lightroom", "Microsoft Word", "Microsoft Excel"],
  },
  experience: [
    {
      year: "Aug — Oct 2025",
      role: "UI/UX Designer Intern",
      company: "Dinas KOMINFO Kabupaten Bantul",
      description:
        "Interned as the sole designer on two internal application projects, from user research through to the prototypes handed over as the development reference.",
      achievements: [
        "Conducted interviews and observations with four employees to identify user needs for two application projects.",
        "Independently developed information architecture, user flows, wireframes, high-fidelity interfaces, and interactive prototypes using Figma.",
        "Presented designs to employees and the division head, then delivered the prototypes as references for further development.",
      ],
    },
    {
      year: "May 2024 — Jun 2025",
      role: "Communication and Information Staff",
      company: "HIMSI Universitas Alma Ata",
      description:
        "Responsible for the organization's publicity and information through the student association's Instagram channel.",
      achievements: [
        "Produced dozens of visual content pieces using Canva and Figma to support event publicity and organizational information.",
        "Designed event posters such as Industrial Visit 2024, Design System Study Club, and Figma Plugin Webinar.",
        "Designed the lanyard for the HIMSI committee.",
      ],
    },
    {
      year: "Jan — Apr 2025",
      role: "Communication and Information Team",
      company: "KKN-T Group 30, Universitas Alma Ata (Mangiran)",
      description:
        "Handled documentation and publicity for the KKN program across one full period.",
      achievements: [
        "Managed documentation and publicity for the entire KKN-T program.",
        "Edited the educational video used as program publicity material.",
        "Listed as a co-creator of two works registered for copyright with the Ministry of Law of the Republic of Indonesia.",
      ],
    },
    {
      year: "Nov 2024",
      role: "Webinar Speaker",
      company: "BISA AI Academy — “Optimizing Design with Figma Plugins”",
      description:
        "Led a technical webinar session on using Figma plugins to speed up the design workflow.",
      achievements: [
        "Delivered the presentation and practical demonstrations on using Figma plugins.",
        "Facilitated discussion among webinar participants, attended by dozens of people.",
      ],
    },
  ],
  education: [
    {
      year: "Sep 2022 — Jul 2026",
      degree: "Bachelor's Degree in Information Systems",
      institution: "Universitas Alma Ata",
      description:
        "GPA 3.87/4.00. Focused on UI/UX Design: user research, information architecture, interactive prototyping, and usability testing.",
    },
  ],
  // Sumber: TENTANG SAYA/ (35 file sertifikat, 34 kredensial unik).
  // MSIB sengaja tidak lagi ada di `experience` — sertifikatnya menjadi satu-satunya
  // tempat klaim tersebut, supaya tidak tampil dua kali dengan isi yang sama.
  certifications: [
    {
      title: "Flexible Kickstart UI UX Design Journey",
      issuer: "Rakamin Academy",
      date: "Nov 2026",
      note: "Excellent Grade",
      featured: true,
      group: "UI/UX & design",
    },
    {
      title: "Introduction to Figma",
      issuer: "Simplilearn SkillUp",
      date: "Nov 2026",
      featured: true,
      group: "UI/UX & design",
    },
    {
      title: "STEMSEL UI/UX Associate Certification",
      issuer: "STEMSEL Foundation",
      date: "Dec 2024 — Dec 2027",
      featured: true,
      group: "UI/UX & design",
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      issuer: "IBM SkillsBuild",
      date: "Oct 2026",
      featured: true,
      group: "UI/UX & design",
      url: "https://www.credly.com/go/ZB9Eoa6R",
    },
    {
      title: "UI/UX Certified Independent Study (SIB) — Batch 7",
      issuer: "Bisa.ai · MSIB Kampus Merdeka",
      date: "Dec 2024",
      featured: true,
      group: "Kampus Merdeka & university",
    },
    {
      title: "Front-End Web Development for Beginners",
      issuer: "Dicoding",
      date: "Jun 2024",
      featured: true,
      group: "Web development",
      url: "https://www.dicoding.com/certificates/81P2NKLOYXOY",
    },
    {
      title: "AI Fluency for Creative Work",
      issuer: "Anthropic × Ringling College of Art + Design",
      date: "Oct",
      featured: true,
      group: "AI & tooling",
    },
    {
      title: "AAEPT — Score 497",
      issuer: "Alma Ata Language Training Centre",
      date: "2024",
      note: "English proficiency",
      featured: true,
      group: "Kampus Merdeka & university",
    },

    // — Sisa kredensial: hanya muncul di indeks kelompok (tertutup secara default) —
    {
      title: "AI Fundamentals 2026",
      issuer: "Canva",
      date: "Nov 2026",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency: AI Capabilities & Limitations",
      issuer: "Anthropic",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency for Builders",
      issuer: "Anthropic × Codepath.org",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency for Students",
      issuer: "Anthropic × Ringling College of Art + Design",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "Claude 101",
      issuer: "Anthropic",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "Introduction to Claude Cowork",
      issuer: "Anthropic",
      date: "Oct",
      group: "AI & tooling",
    },
    {
      title: "Essential Skills: Adaptability",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Digital Disruption & Transformation",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Digital Literacy",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Self Efficacy",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Emotional Intelligence",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 95",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Social Influence",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 95",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Integrity at Work",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 94",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Emotional Resilience",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Oct 2026",
      note: "Score 90",
      group: "Soft skills",
    },
    {
      title: "Google Ads Creative Certification",
      issuer: "Google Skillshop",
      date: "Oct 2026",
      group: "Marketing & SEO",
    },
    {
      title: "Google Analytics Certification (2026)",
      issuer: "Google Skillshop",
      date: "Nov 2026",
      group: "Marketing & SEO",
    },
    {
      title: "Getting Started with Semrush for Agencies",
      issuer: "Semrush Academy",
      date: "2026",
      group: "Marketing & SEO",
    },
    {
      title: "Technical SEO and AI Search Essentials",
      issuer: "Semrush Academy",
      date: "2026",
      group: "Marketing & SEO",
    },
    {
      title: "SNI ISO 31000 Risk Management",
      issuer: "BSN e-learning",
      date: "Oct 2026",
      note: "Very Good",
      group: "Management & compliance",
    },
    {
      title: "SNI ISO 37001:2016 Anti-Bribery Management System",
      issuer: "BSN e-learning",
      date: "Oct 2026",
      note: "Very Good",
      group: "Management & compliance",
    },
    {
      title: "SNI ISO 45001:2018 Occupational Health & Safety Management",
      issuer: "BSN e-learning",
      date: "Oct 2026",
      note: "Very Good",
      group: "Management & compliance",
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      issuer: "Dicoding",
      date: "Jun 2024",
      group: "Web development",
      // Surfaced as a row so its verification link is visible: the Issuer prints one for it.
      featured: true,
      url: "https://www.dicoding.com/certificates/1OP8WRV11XQK",
    },
    {
      title: "JavaScript Programming Fundamentals",
      issuer: "Dicoding",
      date: "Jun 2024",
      group: "Web development",
      featured: true,
      url: "https://www.dicoding.com/certificates/72ZDV59RQZYW",
    },
    {
      title: "Certified Independent Study Batch 7 — Participation",
      issuer: "Kemdikbudristek — MSIB",
      date: "2024",
      group: "Kampus Merdeka & university",
    },
    {
      title: "Thematic KKN / Village Development Project",
      issuer: "LP2M Universitas Alma Ata",
      date: "Jan — Mar 2025",
      group: "Kampus Merdeka & university",
    },
  ],
  certificationGroups: [
    {
      label: "UI/UX & design",
      count: 4,
      detail: "Rakamin Academy, Simplilearn, STEMSEL Foundation, IBM SkillsBuild",
    },
    {
      label: "AI & tooling",
      count: 8,
      detail: "Canva AI Fundamentals 2026 plus 7 AI Fluency courses from Anthropic",
    },
    {
      label: "Soft skills",
      count: 8,
      detail: "GNIK × Ministry of Manpower of the Republic of Indonesia — scores 90 to 100",
    },
    {
      label: "Kampus Merdeka & university",
      count: 4,
      detail: "MSIB Batch 7, MSIB participation, KKN-T UAA, AAEPT",
    },
    {
      label: "Marketing & SEO",
      count: 4,
      detail: "Google Ads, Google Analytics, 2 Semrush Academy certificates",
    },
    {
      label: "Web development",
      count: 3,
      detail: "Dicoding — Web Fundamentals, JavaScript, and Front-End for Beginners",
    },
    {
      label: "Management & compliance",
      count: 3,
      detail: "BSN e-learning — ISO 31000, ISO 37001, ISO 45001 (Very Good)",
    },
  ],
};
