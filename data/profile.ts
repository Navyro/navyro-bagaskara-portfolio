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
  linkedin: string;
  github: string;
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

export const profileData: ProfileData = {
  name: "Navyro Bagaskara",
  role: "UI/UX Designer + Front-End",
  shortStatement:
    "Desainer UI/UX dengan pemahaman mendalam tentang Front-End. Berfokus pada penyelesaian masalah nyata, sistem desain terstruktur, dan antarmuka web yang intuitif.",
  fullBio:
    "Saya adalah UI/UX Designer & Front-End Specialist yang percaya bahwa desain yang baik bukan hanya tentang visual yang estetis, tetapi juga tentang kejelasan fungsi, kemudahan navigasi, dan efisiensi implementasi teknis. Dengan latar belakang dalam riset pengguna, wireframing, perancangan design system, serta eksekusi antarmuka menggunakan Next.js dan Tailwind CSS, saya menjembatani proses dari konsep desain hingga ke kode yang siap produksi.",
  email: "navyro.bagaskara@email.com",
  linkedin: "https://linkedin.com/in/navyrobagaskara",
  github: "https://github.com/navyrobagaskara",
  location: "Jakarta, Indonesia",
  resumeFilename: "Navyro_Bagaskara_CV.pdf",
  skills: {
    uiux: [
      "User Research",
      "Information Architecture",
      "User Flow & Sitemap",
      "Wireframing & Prototyping",
      "UI Design & Micro-interactions",
      "Design Systems & Tokenomics",
      "Usability Testing & Iteration",
    ],
    frontend: [
      "HTML5 & Semantic Markup",
      "CSS3 & Vanilla CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Git & Version Control",
    ],
    tools: ["Figma", "VS Code", "GitHub", "Vercel", "Canva", "Notion"],
  },
  experience: [
    {
      year: "2024 — Sekarang",
      role: "UI/UX Designer & Front-End Specialist",
      company: "Innovate Digital Studio",
      description:
        "Memimpin perancangan produk digital dan pengembangan antarmuka web untuk klien skala menengah hingga korporat.",
      achievements: [
        "Membangun design system terpusat yang memangkas waktu handoff desain-ke-kode hingga 35%.",
        "Merancang dan mengimplementasikan aplikasi web berbasis Next.js & Tailwind CSS dengan performa Lighthouse 95+.",
        "Melakukan usability testing berkala untuk menyempurnakan alur navigasi aplikasi finansial.",
      ],
    },
    {
      year: "2022 — 2024",
      role: "UI/UX Designer",
      company: "Nexus Product Lab",
      description:
        "Merancang pengalaman pengguna (UX) dan antarmuka (UI) untuk aplikasi seluler dan platform e-commerce.",
      achievements: [
        "Membuat wireframe high-fidelity dan prototipe interaktif di Figma untuk lebih dari 12 proyek klien.",
        "Mengembangkan sitemap dan information architecture yang meningkatkan conversion rate checkout pelanggan sebesar 22%.",
        "Bekerjasama erat dengan tim developer untuk memastikan keakuratan implementasi visual.",
      ],
    },
    {
      year: "2021 — 2022",
      role: "Front-End Developer Intern",
      company: "ByteCraft Technology",
      description:
        "Mengembangkan halaman web responsif dan komponen antarmuka terstruktur menggunakan React dan Tailwind CSS.",
      achievements: [
        "Mengonversi desain Figma ke dalam komponen React dengan type-safety TypeScript.",
        "Memastikan aksesibilitas (WCAG 2.1) dan optimasi gambar untuk mempercepat loading website.",
      ],
    },
  ],
  education: [
    {
      year: "2019 — 2023",
      degree: "Sarjana Komputer (S.Kom) - Teknik Informatika",
      institution: "Universitas Bina Nusantara",
      description:
        "Fokus pada Human-Computer Interaction (HCI), Software Engineering, dan Web Development. Lulus dengan predikat Sangat Memuaskan.",
    },
  ],
};
