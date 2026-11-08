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
  phone: string;
  /** Optional: only rendered when the link is known to be correct. */
  linkedin?: string;
  github?: string;
  location: string;
  resumeFilename: string;
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
    "Lulusan Sistem Informasi dengan fokus UI/UX Design. Bekerja dari riset pengguna, information architecture, dan user flow hingga high-fidelity interface serta prototipe interaktif di Figma.",
  fullBio:
    "Saya lulusan Sistem Informasi Universitas Alma Ata (IPK 3,87/4,00) dengan fokus utama UI/UX Design. Pekerjaan saya dimulai dari wawancara dan observasi untuk memahami kebutuhan pengguna, lalu diterjemahkan menjadi information architecture, user flow, wireframe, high-fidelity interface, dan prototipe interaktif di Figma. Saya juga terbiasa menguji hasil desain dengan pengguna menggunakan metode System Usability Scale (SUS), menyusun design system, serta mengerjakan desain konten dan media sosial. Di sisi teknis, saya memiliki dasar pengembangan web (HTML, CSS, JavaScript) yang membuat desain lebih mudah dieksekusi oleh developer.",
  email: "navbagaskara@gmail.com",
  phone: "+62 857-1272-9833",
  linkedin: "https://www.linkedin.com/in/navyro-bagaskara/",
  location: "Bekasi, Jawa Barat, Indonesia",
  resumeFilename: "Navyro_Bagaskara_CV.pdf",
  portfolioFilename: "Navyro_Bagaskara_Portofolio.pdf",
  skills: {
    uiux: [
      "User Research (Wawancara & Observasi)",
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
      "JavaScript (Dasar)",
      "DOM Manipulation & Event Handling",
      "Front-End Web Dasar",
    ],
    tools: ["Figma", "Canva", "CapCut", "Adobe Lightroom", "Microsoft Word", "Microsoft Excel"],
  },
  experience: [
    {
      year: "Agu — Okt 2025",
      role: "UI/UX Designer Intern",
      company: "Dinas KOMINFO Kabupaten Bantul",
      description:
        "Magang sebagai satu-satunya desainer pada dua proyek aplikasi internal, mulai dari riset pengguna hingga prototipe yang diserahkan sebagai acuan pengembangan.",
      achievements: [
        "Melakukan wawancara dan observasi dengan empat pegawai untuk mengidentifikasi kebutuhan pengguna pada dua proyek aplikasi.",
        "Menyusun information architecture, user flow, wireframe, high-fidelity interface, dan prototipe interaktif secara mandiri menggunakan Figma.",
        "Mempresentasikan desain kepada pegawai dan kepala bidang, lalu menyerahkan prototipe sebagai referensi pengembangan lebih lanjut.",
      ],
    },
    {
      year: "Mei 2024 — Jun 2025",
      role: "Staff Komunikasi dan Informasi",
      company: "HIMSI Universitas Alma Ata",
      description:
        "Bertanggung jawab atas kebutuhan publikasi dan informasi organisasi melalui kanal Instagram himpunan.",
      achievements: [
        "Memproduksi puluhan konten visual menggunakan Canva dan Figma untuk mendukung publikasi acara dan informasi organisasi.",
        "Mengerjakan desain poster kegiatan seperti Kunjungan Industri 2024, Study Club Design System, dan Webinar Plugin Figma.",
        "Merancang desain lanyard kepengurusan HIMSI.",
      ],
    },
    {
      year: "Jan — Apr 2025",
      role: "Tim Komunikasi dan Informasi",
      company: "KKN-T Kelompok 30, Universitas Alma Ata (Mangiran)",
      description:
        "Menangani dokumentasi dan publikasi program kerja KKN selama satu periode penuh.",
      achievements: [
        "Mengelola dokumentasi dan publikasi seluruh rangkaian kegiatan KKN-T.",
        "Menyunting video edukasi yang digunakan sebagai materi publikasi program.",
        "Tercatat sebagai salah satu pencipta dua karya yang didaftarkan hak ciptanya ke Kementerian Hukum Republik Indonesia.",
      ],
    },
    {
      year: "Nov 2024",
      role: "Pembicara Webinar",
      company: "BISA AI Academy — “Mengoptimalkan Desain dengan Plugin Figma”",
      description:
        "Mengisi sesi webinar teknis tentang penggunaan plugin Figma untuk mempercepat alur kerja desain.",
      achievements: [
        "Menyampaikan materi dan demonstrasi praktik penggunaan plugin Figma.",
        "Memandu diskusi peserta webinar yang diikuti puluhan peserta.",
      ],
    },
  ],
  education: [
    {
      year: "Sep 2022 — Jul 2026",
      degree: "S1 Sistem Informasi",
      institution: "Universitas Alma Ata",
      description:
        "IPK 3,87/4,00. Fokus pada UI/UX Design: riset pengguna, information architecture, prototipe interaktif, dan usability testing.",
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
      date: "Des 2024 — Des 2027",
      featured: true,
      group: "UI/UX & design",
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      issuer: "IBM SkillsBuild",
      date: "Okt 2026",
      featured: true,
      group: "UI/UX & design",
      url: "https://www.credly.com/go/ZB9Eoa6R",
    },
    {
      title: "Studi Independen Bersertifikat UI/UX — Batch 7",
      issuer: "Bisa.ai · MSIB Kampus Merdeka",
      date: "Des 2024",
      featured: true,
      group: "Kampus Merdeka & kampus",
    },
    {
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding",
      date: "Jun 2024",
      featured: true,
      group: "Web development",
      url: "https://www.dicoding.com/certificates/81P2NKLOYXOY",
    },
    {
      title: "AI Fluency for Creative Work",
      issuer: "Anthropic × Ringling College of Art + Design",
      date: "Okt",
      featured: true,
      group: "AI & tooling",
    },
    {
      title: "AAEPT — skor 497",
      issuer: "Alma Ata Language Training Centre",
      date: "2024",
      note: "English proficiency",
      featured: true,
      group: "Kampus Merdeka & kampus",
    },

    // — Sisa kredensial: hanya muncul di indeks kelompok (tertutup secara default) —
    {
      title: "Dasar-Dasar AI 2026",
      issuer: "Canva",
      date: "Nov 2026",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency: AI Capabilities & Limitations",
      issuer: "Anthropic",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency for Builders",
      issuer: "Anthropic × Codepath.org",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "AI Fluency for Students",
      issuer: "Anthropic × Ringling College of Art + Design",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "Claude 101",
      issuer: "Anthropic",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "Introduction to Claude Cowork",
      issuer: "Anthropic",
      date: "Okt",
      group: "AI & tooling",
    },
    {
      title: "Essential Skills: Adaptability",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Digital Disruption & Transformation",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Digital Literacy",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Self Efficacy",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 100",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Emotional Intelligence",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 95",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Social Influence",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 95",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Integrity at Work",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 94",
      group: "Soft skills",
    },
    {
      title: "Essential Skills: Emotional Resilience",
      issuer: "GNIK × Kementerian Ketenagakerjaan RI",
      date: "Okt 2026",
      note: "Nilai 90",
      group: "Soft skills",
    },
    {
      title: "Google Ads Creative Certification",
      issuer: "Google Skillshop",
      date: "Okt 2026",
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
      title: "Manajemen Risiko Berbasis SNI ISO 31000",
      issuer: "BSN e-learning",
      date: "Okt 2026",
      note: "Sangat Baik",
      group: "Manajemen & kepatuhan",
    },
    {
      title: "SNI ISO 37001:2016 Sistem Manajemen Anti Penyuapan",
      issuer: "BSN e-learning",
      date: "Okt 2026",
      note: "Sangat Baik",
      group: "Manajemen & kepatuhan",
    },
    {
      title: "Sistem Manajemen K3 Berbasis SNI ISO 45001:2018",
      issuer: "BSN e-learning",
      date: "Okt 2026",
      note: "Sangat Baik",
      group: "Manajemen & kepatuhan",
    },
    {
      title: "Belajar Dasar Pemrograman Web",
      issuer: "Dicoding",
      date: "Jun 2024",
      group: "Web development",
      url: "https://www.dicoding.com/certificates/1OP8WRV11XQK",
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding",
      date: "Jun 2024",
      group: "Web development",
      url: "https://www.dicoding.com/certificates/72ZDV59RQZYW",
    },
    {
      title: "Kepesertaan Studi Independen Bersertifikat Batch 7",
      issuer: "Kemdikbudristek — MSIB",
      date: "2024",
      group: "Kampus Merdeka & kampus",
    },
    {
      title: "KKN Tematik / Proyek Membangun Desa",
      issuer: "LP2M Universitas Alma Ata",
      date: "Jan — Mar 2025",
      group: "Kampus Merdeka & kampus",
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
      detail: "Canva Dasar-Dasar AI 2026 dan 7 kursus AI Fluency dari Anthropic",
    },
    {
      label: "Soft skills",
      count: 8,
      detail: "GNIK × Kementerian Ketenagakerjaan RI — nilai 90 sampai 100",
    },
    {
      label: "Kampus Merdeka & kampus",
      count: 4,
      detail: "MSIB Batch 7, kepesertaan MSIB, KKN-T UAA, AAEPT",
    },
    {
      label: "Marketing & SEO",
      count: 4,
      detail: "Google Ads, Google Analytics, 2 sertifikat Semrush Academy",
    },
    {
      label: "Web development",
      count: 3,
      detail: "Dicoding — Dasar Web, JavaScript, dan Front-End untuk Pemula",
    },
    {
      label: "Manajemen & kepatuhan",
      count: 3,
      detail: "BSN e-learning — ISO 31000, ISO 37001, ISO 45001 (Sangat Baik)",
    },
  ],
};
