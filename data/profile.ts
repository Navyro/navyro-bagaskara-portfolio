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
  skills: {
    uiux: string[];
    frontend: string[];
    tools: string[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
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
      year: "Sep — Des 2024",
      role: "Independent Study UI/UX Design & Game Development",
      company: "BISA AI Academy (MSIB Batch 7)",
      description:
        "Mengikuti program studi independen bersertifikat Kampus Merdeka dan berkontribusi sebagai UI/UX Designer pada proyek capstone FanFunds.",
      achievements: [
        "Mengerjakan layar aplikasi, design system, dan prototipe interaktif capstone menggunakan Figma.",
        "Terlibat dalam penyusunan user persona, user flow, dan A/B testing bersama 30 responden.",
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
};
