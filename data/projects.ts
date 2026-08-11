export interface CaseStudyData {
  overview: string;
  problem: string;
  research?: string;
  keyInsights?: string[];
  define?: string;
  ideation?: string;
  informationArchitecture?: string;
  userFlow?: string;
  wireframes?: string;
  uiDesign: string;
  prototypeUrl?: string;
  liveUrl?: string;
  testing?: string;
  finalResult: string;
  reflection: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: "UI/UX" | "Web" | "Mobile" | "Front-End";
  tags: string[];
  role: string;
  year: string;
  duration: string;
  team: string;
  tools: string[];
  shortDescription: string;
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  caseStudy: CaseStudyData;
}

export const projectsData: Project[] = [
  {
    slug: "nexabank-mobile-app",
    number: "01",
    title: "NexaBank — Mobile Banking Experience Redesign",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "User Research", "FinTech"],
    role: "Lead UI/UX Designer",
    year: "2024",
    duration: "3 Bulan",
    team: "1 UI/UX Designer, 2 Developers, 1 Product Manager",
    tools: ["Figma", "FigJam", "Protopie", "UsabilityHub"],
    shortDescription:
      "Perancangan ulang aplikasi perbankan seluler untuk menyederhanakan transaksi harian, meningkatkan kejelasan visual informasi keuangan, dan mengurangi rasio drop-off pengguna sebesar 28%.",
    featured: true,
    coverImage: "/images/nexabank-cover.png",
    galleryImages: [
      "/images/nexabank-cover.png",
      "/images/nexabank-screen1.svg",
      "/images/nexabank-screen2.svg",
    ],
    caseStudy: {
      overview:
        "NexaBank adalah aplikasi perbankan digital yang melayani lebih dari 150.000 pengguna aktif bulanan. Meskipun memiliki fitur finansial yang lengkap, pengguna sering mengeluhkan kerumitan navigasi saat ingin melakukan transfer cepat dan pembayaran tagihan rutin.",
      problem:
        "Berdasarkan analisis analitik dan ulasan pengguna di toko aplikasi, 42% pengguna mengalami kegagalan saat pertama kali mencoba transfer antarbank karena hirarki tombol yang tersembunyi dalam 4 tingkatan menu. Selain itu, tampilan saldo dan riwayat transaksi terasa menumpuk tanpa separasi visual yang jelas.",
      research:
        "Saya memimpin sesi wawancara mendalam terhadap 12 responden dari kelompok usia 22–45 tahun serta menyebarkan kuesioner ke 80 pengguna aktif. Hasilnya menunjukkan bahwa 75% pengguna hanya menggunakan 3 fitur utama sehari-hari: Cek Saldo, Transfer Cepat, dan Riwayat Transaksi.",
      keyInsights: [
        "Pengguna menginginkan akses langsung ke fitur utama tanpa perlu membuka hamburger menu.",
        "Keterangan status transaksi (Berhasil/Pending/Gagal) membutuhkan kontras visual yang lebih intuitif.",
        "Input nomor rekening memerlukan validasi langsung (real-time feedback) sebelum konfirmasi pembayaran.",
      ],
      define:
        "Fokus utama redesain ini adalah memangkas langkah transaksi dari 5 ketukan menjadi maksimal 2 ketukan dari halaman beranda (Home dashboard).",
      ideation:
        "Melalui eksplorasi sketsa dan pemetaan fungsionalitas, kami menyusun skema 'Quick Actions Bar' di bagian bawah layar utama, serta kartu saldo modular yang dapat di-swipe untuk melihat rekening sekunder.",
      informationArchitecture:
        "Mengorganisir ulang struktur navigasi bawah (Bottom Navigation Bar) menjadi 4 tab utama yang jelas: Beranda, Transaksi, Analisis Keuangan, dan Pengaturan Profil.",
      userFlow:
        "Alur Transfer Cepat: Beranda → Ketuk 'Transfer' → Pilih Kontak Favorit / Input Rekening → Masukkan Nominal → Otentikasi Biometrik → Struk Sukses.",
      wireframes:
        "Membuat wireframe low-fidelity untuk menguji tata letak informasi sebelum memasuki tahap visual design high-fidelity.",
      uiDesign:
        "Desain antarmuka menggunakan palet warna navy profesional dengan aksen biru elektrik terukur untuk memberikan kesan terpercaya dan modern. Tipografi mengutamakan keterbacaan angka finansial dengan bobot yang tegas.",
      prototypeUrl: "https://figma.com/proto/sample-nexabank",
      testing:
        "Uji keterpakaian (Usability Testing) menggunakan metode Unmoderated Task Execution pada 10 partisipan. Hasilnya menunjukkan penurunan durasi penyelesaian transaksi dari 45 detik menjadi 14 detik.",
      finalResult:
        "Aplikasi NexaBank versi baru berhasil meningkatkan kepuasan pengguna (CSAT) dari 3.2/5 menjadi 4.7/5 serta mengurangi tiket pengaduan kendala navigasi hingga 60%.",
      reflection:
        "Proyek ini mengajarkan pentingnya menyederhanakan hirarki visual untuk aplikasi finansial. Menghilangkan elemen dekoratif berlebihan mempercepat proses mental pengguna dalam mengelola uang mereka.",
    },
  },
  {
    slug: "elevate-design-system",
    number: "02",
    title: "Elevate OS — Enterprise Design System & Component Library",
    category: "Front-End",
    tags: ["Design System", "Front-End", "React", "TypeScript", "Tailwind CSS"],
    role: "UI/UX & Front-End Developer",
    year: "2024",
    duration: "4 Bulan",
    team: "2 UI Designers, 2 Front-End Engineers",
    tools: ["Figma", "React", "TypeScript", "Tailwind CSS", "Storybook"],
    shortDescription:
      "Arsitektur design system komprehensif yang menghubungkan komponen visual Figma ke dalam pustaka komponen kode React & TypeScript yang siap pakai untuk produk ekosistem enterprise.",
    featured: true,
    coverImage: "/images/elevate-cover.png",
    galleryImages: [
      "/images/elevate-cover.png",
      "/images/elevate-screen1.svg",
      "/images/elevate-screen2.svg",
    ],
    caseStudy: {
      overview:
        "Elevate OS diciptakan untuk menyelesaikan ketidakselarasan antarmuka antara tim desain dan tim teknis di 5 produk SaaS internal yang dikembangkan bersamaan.",
      problem:
        "Sebelum adanya Elevate OS, setiap produk menggunakan variasi warna tombol, spasi, dan variabel CSS yang berbeda. Hal ini menyebabkan inconsistency antarmuka, duplikasi kode hingga 40%, serta waktu handoff yang lambat.",
      research:
        "Kami melakukan audit UI pada lebih dari 120 layar produk eksisting dan menemukan 14 jenis warna biru yang berbeda serta 9 bentuk modal dialog yang redundan.",
      keyInsights: [
        "Variabel desain (Design Tokens) harus menjadi sumber kebenaran tunggal (single source of truth) untuk warna, spasi, dan tipografi.",
        "Komponen React harus memiliki API prop yang intuitif dan ketat menggunakan TypeScript interface.",
        "Dokumentasi komponen harus dapat diakses secara interaktif melalui Storybook.",
      ],
      define:
        "Standarisasi 3 layer utama: Layer 1 (Tokens), Layer 2 (Base Primitives seperti Button, Input, Badge), Layer 3 (Complex Patterns seperti Data Table, Modal Header).",
      ideation:
        "Menyusun konvensi penamaan token yang konsisten (misal: `color-bg-primary`, `space-4`, `radius-btn`) agar langsung selaras dengan utilitas Tailwind CSS.",
      uiDesign:
        "Desain komponen dibuat netral, bersih, dan berorientasi pada produktivitas dengan state lengkap: Default, Hover, Focus Ring, Active, Disabled, dan Loading Skeleton.",
      liveUrl: "https://github.com/navyrobagaskara/elevate-design-system",
      testing:
        "Diuji oleh 8 developer internal dengan membangun ulang halaman dashboard sampel. Hasil pengujian menunjukkan kecepatan pengembangan halaman baru meningkat hingga 2.5 kali lipat.",
      finalResult:
        "Elevate OS kini diadopsi sepenuhnya oleh seluruh tim produk, menghasilkan konsistensi visual 100% dan mengurangi ukuran bundel CSS produk hingga 30%.",
      reflection:
        "Membangun design system bukan sekadar membuat library UI, tetapi juga membangun jembatan komunikasi dan efisiensi antara desainer dan engineer.",
    },
  },
  {
    slug: "luminary-ecommerce",
    number: "03",
    title: "Luminary — Editorial E-Commerce Website",
    category: "Web",
    tags: ["UI/UX Design", "Web Development", "Next.js", "Editorial Style"],
    role: "UI/UX Designer + Front-End Specialist",
    year: "2023",
    duration: "2 Bulan",
    team: "Proyek Mandiri (Personal Project)",
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS"],
    shortDescription:
      "Pengalaman e-commerce bergaya editorial profesional untuk brand gaya hidup premium, mengombinasikan tata letak typography-led dengan antarmuka belanja tanpa hambatan.",
    featured: true,
    coverImage: "/images/luminary-cover.png",
    galleryImages: [
      "/images/luminary-cover.png",
      "/images/luminary-screen1.svg",
      "/images/luminary-screen2.svg",
    ],
    caseStudy: {
      overview:
        "Luminary adalah konsep platform e-commerce yang memadukan majalah editorial dengan toko online premium. Fokusnya adalah menyampaikan cerita di balik produk tanpa mengorbankan fungsionalitas belanja.",
      problem:
        "Banyak situs e-commerce merek independen terjebak antara tampilan yang terlalu ramai seperti marketplace generik atau terlalu artistik sehingga menyulitkan pembeli menemukan tombol beli dan keranjang.",
      research:
        "Melakukan studi komparatif terhadap 10 situs e-commerce gaya hidup global. Menemukan bahwa rasio konversi tertinggi dicapai saat katalog produk disajikan dengan visual besar dan ruang kosong (whitespace) yang lega.",
      keyInsights: [
        "Visual produk resolusi tinggi dengan pencahayaan alami memperkuat nilai estetik produk.",
        "Tipografi editorial (serif/sans-serif terkontrol) memberikan kesan eksklusif.",
        "Panel keranjang (Slide-over Cart) membuat alur belanja tetap lancar tanpa memindahkan pembeli dari halaman cerita produk.",
      ],
      define:
        "Merancang antarmuka web yang terasa seperti membalik halaman majalah mode, namun dibekali arsitektur Front-End Next.js yang sangat cepat.",
      uiDesign:
        "Menggunakan latar belakang krem abu-abu netral (#F7F7F5), teks hitam kontras murni (#171717), serta aksen warna terstruktur. Setiap kartu produk menonjolkan foto tanpa potongan bingkai berlebihan.",
      liveUrl: "https://luminary-editorial.vercel.app",
      finalResult:
        "Website Luminary berhasil dibangun penuh menggunakan Next.js App Router, memiliki skor performa Google Lighthouse 98, serta responsif sempurna di perangkat seluler maupun desktop.",
      reflection:
        "Menyeimbangkan keindahan visual editorial dengan ketersediaan informasi belanja yang jelas membutuhkan disiplin hirarki tipografi dan komposisi grid yang presisi.",
    },
  },
  {
    slug: "healthpulse-dashboard",
    number: "04",
    title: "HealthPulse — Patient Engagement & Telehealth Platform",
    category: "UI/UX",
    tags: ["UI/UX Design", "Healthcare", "Web App", "Dashboard"],
    role: "UI/UX Designer",
    year: "2023",
    duration: "3 Bulan",
    team: "1 UI/UX Designer, 1 Health Domain Expert",
    tools: ["Figma", "Miro", "Useberry"],
    shortDescription:
      "Platform dasbor kesehatan dan konsultasi medis jarak jauh yang dirancang untuk kemudahan penggunaan oleh dokter dan pasien dari berbagai tingkat literasi digital.",
    featured: false,
    coverImage: "/images/healthpulse-cover.png",
    galleryImages: [
      "/images/healthpulse-cover.png",
      "/images/healthpulse-screen1.svg",
    ],
    caseStudy: {
      overview:
        "HealthPulse menyatukan rekam medis mandiri, jadwal konsultasi dokter online, dan pengingat konsumsi obat dalam satu dasbor terpadu.",
      problem:
        "Aplikasi layanan kesehatan sering kali membingungkan bagi pengguna lansia atau orang yang membutuhkan pertolongan medis cepat karena istilah medis yang rumit dan tata letak dasbor yang padat.",
      research:
        "Mengadakan riset kualitatif dengan 6 pengguna lanjut usia dan 4 dokter umum. Hasil riset menekankan perlunya ukuran teks yang mudah dibaca dan tombol tindakan medis yang berukuran besar.",
      keyInsights: [
        "Ukuran target sentuh (touch target) pada perangkat tablet/seluler harus minimal 48px.",
        "Status janji temu dokter harus menampilkan indikator waktu secara eksplisit.",
        "Kontras warna antara teks dan latar belakang wajib memenuhi standar WCAG AAA.",
      ],
      define:
        "Menyederhanakan dasbor pasien menjadi 3 kartu ringkasan utama: Janji Mendatang, Jadwal Obat Hari Ini, dan Hasil Laboratorium Terbaru.",
      uiDesign:
        "Palet warna hijau sage tenang dan biru lembut untuk memberikan sensasi psikologis yang meredakan kecemasan pasien.",
      finalResult:
        "Prototipe HealthPulse berhasil lolos uji aksesibilitas dengan skor kemudahan navigasi 92/100 dalam pengujian dengan kelompok pengguna lansia.",
      reflection:
        "Desain untuk sektor kesehatan menuntut empati ekstra terhadap kondisi mental dan fisik pengguna saat mengakses aplikasi.",
    },
  },
];
