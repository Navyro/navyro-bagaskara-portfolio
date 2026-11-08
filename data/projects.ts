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
  /** Verified prototype/file link. Label says which: a /proto URL is a prototype, a /design URL is a file. */
  prototypeUrl?: string;
  prototypeLabel?: string;
  liveUrl?: string;
  testing?: string;
  finalResult: string;
  reflection?: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: "UI/UX" | "Web" | "Mobile" | "Front-End";
  tags: string[];
  role: string;
  /** Only filled when the source material states it. */
  year?: string;
  duration?: string;
  team?: string;
  tools: string[];
  /** Framing used for this project's screenshots. */
  screenFrame: "phone" | "desktop";
  shortDescription: string;
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  caseStudy: CaseStudyData;
}

/**
 * Real projects only. Sources: `TENTANG SAYA/CV_Navyro_Bagaskara_EN.pdf` (dates, roles,
 * measured results, prototype links) and the screenshot sets under `TENTANG SAYA/`
 * (screen names, team attribution in filenames). Nothing here is invented: fields the
 * sources do not state stay empty and are not rendered.
 */
export const projectsData: Project[] = [
  {
    slug: "sipenelitian-uaa",
    number: "01",
    title: "SIPENELITIAN — Sistem Informasi Pengelolaan Data Penelitian UAA",
    category: "Web",
    tags: ["UI/UX Design", "Web App", "Design Thinking", "Usability Testing"],
    role: "UI/UX Designer",
    year: "2026",
    duration: "Mei — Juli 2026",
    team: "Tim pengembangan LP2M Universitas Alma Ata",
    tools: ["Figma"],
    screenFrame: "desktop",
    shortDescription:
      "Sistem informasi pengelolaan data penelitian untuk LP2M Universitas Alma Ata — dari wawancara pengguna hingga pengujian usability bersama 20 dosen dengan skor SUS 76,75.",
    featured: true,
    coverImage: "/images/projects/sipenelitian/cover.jpg",
    galleryImages: [
      "/images/projects/sipenelitian/cover.jpg",
      "/images/projects/sipenelitian/screens/01-login.png",
      "/images/projects/sipenelitian/screens/02-dashboard-admin.png",
      "/images/projects/sipenelitian/screens/03-hibah-internal-tambah-program-hibah.png",
      "/images/projects/sipenelitian/screens/04-usulan-masuk-semua-tahun.png",
      "/images/projects/sipenelitian/screens/05-usulan-masuk-detail-klik-update-ubah-status.png",
      "/images/projects/sipenelitian/screens/06-laporan-kemajuan-detail-monitoring-logbook.png",
      "/images/projects/sipenelitian/screens/07-sistem-informasi-pengelolaan-data-penelitian-uaa-laporan-akhir-download-lembar-pengesahan.png",
      "/images/projects/sipenelitian/screens/08-sistem-informasi-pengelolaan-data-penelitian-uaa-kelola-user-user-ditambahkan.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka Prototype di Figma",
      prototypeUrl:
        "https://www.figma.com/proto/NdKat89nkFRm125a1HWl3y/Sistem-Informasi-Pengelolaan-Data-Penelitian-UAA?node-id=1479-95355&t=xU7iF3NW7SaXaF4R-1&scaling=scale-down&content-scaling=fixed&page-id=1365%3A20569",
      overview:
        "SIPENELITIAN adalah sistem informasi untuk mengelola data penelitian di LP2M Universitas Alma Ata. Sistem ini menangani alur dari usulan penelitian dan hibah internal, pemantauan laporan kemajuan beserta logbook, sampai laporan akhir dan lembar pengesahan — dengan dua peran pengguna: dosen peneliti dan admin LP2M.",
      problem:
        "Data penelitian yang tersebar di banyak berkas membuat admin LP2M sulit melihat posisi tiap usulan: mana yang masih menunggu tinjauan, mana yang sedang berjalan, dan mana yang terlambat melaporkan kemajuan. Tantangan desainnya adalah menyatukan seluruh status itu ke dalam satu antarmuka tanpa menambah beban kerja admin.",
      research:
        "Proyek dikerjakan dengan proses Design Thinking, dimulai dari wawancara dan observasi di lingkungan LP2M UAA untuk memetakan alur usulan dan pelaporan yang berjalan, lalu diterjemahkan menjadi information architecture dan prototipe high-fidelity.",
      keyInsights: [
        "Daftar usulan perlu menampilkan status dan tahun anggaran sekaligus, agar admin dapat menyaring tanpa membuka dokumen satu per satu.",
        "Perubahan status harus bisa dilakukan langsung dari halaman detail usulan, bukan dari menu terpisah.",
        "Logbook dan luaran penelitian ditempelkan pada laporan kemajuan supaya riwayat kegiatan tidak terpisah dari laporannya.",
      ],
      define:
        "Peran dipisahkan dengan jelas. Dosen mengajukan usulan dan mengunggah laporan; admin LP2M memverifikasi, mengubah status, dan mengunduh berkas pengesahan. Masing-masing mendapat halaman masuk dan navigasi sendiri, dengan pola tabel yang sama agar admin tidak perlu mempelajari ulang tiap halaman.",
      informationArchitecture:
        "Login → Dashboard Admin → Hibah Internal (tambah program) → Usulan Masuk (semua tahun) → Detail Usulan (perubahan status) → Laporan Kemajuan (monitoring & logbook) → Laporan Akhir (unduh lembar pengesahan) → Kelola User.",
      userFlow:
        "Alur admin: masuk → membaca ringkasan di dashboard → meninjau usulan masuk → membuka detail → memperbarui status.\nAlur dosen: masuk → mengajukan usulan → mengisi logbook → mengunggah laporan akhir.",
      uiDesign:
        "Antarmuka dirancang di Figma sebagai dashboard desktop: tabel data dengan penanda status, panel detail di samping daftar, serta form hibah internal dan kelola user yang mengikuti pola tabel yang sama. Warna status dipakai konsisten untuk membedakan tahap usulan.",
      testing:
        "Usability testing dilakukan bersama 20 dosen. Hasilnya skor System Usability Scale (SUS) 76,75 — kategori “Acceptable” untuk acceptability dan “Good” untuk usability.",
      finalResult:
        "Prototipe mencakup delapan layar utama: login, dashboard admin, tambah program hibah internal, daftar usulan semua tahun, detail usulan dengan perubahan status, detail monitoring laporan kemajuan & logbook, laporan akhir dengan unduh lembar pengesahan, dan kelola user.",
      reflection:
        "Pada sistem administratif, kejelasan status lebih menentukan daripada kemewahan visual. Bagian yang paling sering diuji ulang justru penempatan status dan tombol perubahan status.",
    },
  },
  {
    slug: "fanfunds",
    number: "02",
    title: "FanFunds — Aplikasi Donasi untuk Kreator",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Design System", "A/B Testing"],
    role: "UI/UX Designer",
    year: "2024",
    duration: "Oktober — Desember 2024",
    team: "Tim capstone MSIB Batch 7, BISA AI Academy",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "Aplikasi donasi untuk kreator, dikerjakan sebagai proyek capstone studi independen MSIB Batch 7 — mencakup user persona, user flow, design system, dan A/B testing bersama 30 responden.",
    featured: true,
    coverImage: "/images/projects/fanfunds/cover.jpg",
    galleryImages: [
      "/images/projects/fanfunds/cover.jpg",
      "/images/projects/fanfunds/screens/01-splash-screen.png",
      "/images/projects/fanfunds/screens/02-onboarding.png",
      "/images/projects/fanfunds/screens/03-home-discover.png",
      "/images/projects/fanfunds/screens/04-home-following.png",
      "/images/projects/fanfunds/screens/05-search.png",
      "/images/projects/fanfunds/screens/06-list-leaderboard.png",
      "/images/projects/fanfunds/screens/07-profil-kreator-leaderboard.png",
      "/images/projects/fanfunds/screens/08-profile-supporter.png",
      "/images/projects/fanfunds/screens/09-donate-step-4.png",
      "/images/projects/fanfunds/screens/10-notification-donatur-news.png",
      "/images/projects/fanfunds/screens/11-notification-donatur-update.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka Prototype di Figma",
      prototypeUrl:
        "https://www.figma.com/proto/bKf9mTxPznmVp6EMoLCzCU/FanFunds?node-id=240-1604&t=sq8asbpd6QJ80FUn-1&scaling=scale-down&content-scaling=fixed&page-id=235%3A152&starting-point-node-id=240%3A1470&show-proto-sidebar=1",
      overview:
        "FanFunds adalah aplikasi donasi untuk kreator: pendukung dapat menemukan kreator, memberikan dukungan, lalu melihat posisinya di leaderboard. Proyek ini dikerjakan sebagai capstone MSIB Batch 7 di BISA AI Academy, dengan saya berkontribusi sebagai UI/UX Designer.",
      problem:
        "Aplikasi donasi sering berhenti pada satu transaksi selesai. Tantangannya adalah membuat dukungan terasa sebagai hubungan berkelanjutan antara kreator dan pendukung — lewat pembaruan kreator, notifikasi, dan leaderboard.",
      research:
        "Kontribusi riset mencakup penyusunan user persona dan user flow sebagai dasar perancangan, lalu dilanjutkan A/B testing bersama 30 responden untuk menguji varian rancangan.",
      keyInsights: [
        "Posisi donatur perlu terlihat dari halaman profil, tidak hanya di daftar leaderboard global.",
        "Notifikasi dibedakan antara pembaruan kreator dan kabar donatur lain, agar keduanya tidak melebur menjadi satu jenis pesan.",
      ],
      define:
        "Pengalaman dibagi menjadi tiga sumbu: menemukan kreator (discover), memberi dukungan (donate), dan memantau dampak dukungan (leaderboard serta notifikasi).",
      informationArchitecture:
        "Splash → Onboarding → Home (Discover / Following) → Pencarian → Leaderboard → Profil Kreator → Profil Supporter → Donasi → Notifikasi.",
      userFlow:
        "Donatur: onboarding → discover → memilih kreator → donasi bertahap → konfirmasi. Setelah donasi, posisi dan riwayat dukungan muncul di profil supporter dan leaderboard.",
      uiDesign:
        "Layar home, explore, pembayaran, dan leaderboard dirancang di Figma bersama design system proyek. Komponen tombol, kartu kreator, dan status progres donasi dipakai ulang lintas layar agar konsisten.",
      testing:
        "A/B testing dilakukan bersama 30 responden untuk membandingkan varian rancangan sebelum difinalisasi.",
      finalResult:
        "Sebelas layar: splash, onboarding, dua varian home (discover dan following), pencarian, daftar leaderboard, profil kreator, profil supporter, langkah donasi, serta dua notifikasi donatur.",
      reflection:
        "Bekerja dalam tim capstone membuat saya terbiasa menyerahkan komponen design system, bukan sekadar file desain.",
    },
  },
  {
    slug: "penagihan-limbah-rt",
    number: "03",
    title: "Aplikasi Penagihan Limbah Rumah Tangga",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "User Research"],
    role: "UI/UX Designer (Mandiri)",
    year: "2025",
    duration: "Agustus — Oktober 2025",
    team: "Individu",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "Aplikasi penagihan iuran limbah untuk pengurus RT: mencatat tagihan warga, menandai tunggakan, dan menyusun laporan bulanan. Dikerjakan mandiri dari riset pengguna hingga prototipe interaktif.",
    featured: true,
    coverImage: "/images/projects/penagihan-limbah/cover.jpg",
    galleryImages: [
      "/images/projects/penagihan-limbah/cover.jpg",
      "/images/projects/penagihan-limbah/screens/01-splash-screen.png",
      "/images/projects/penagihan-limbah/screens/02-admin-login.png",
      "/images/projects/penagihan-limbah/screens/03-dashboard.png",
      "/images/projects/penagihan-limbah/screens/04-tagihan-individu-tunggakan-1.png",
      "/images/projects/penagihan-limbah/screens/05-detail-tagihan-kelompok-warga-rt-01-feb-nunggak.png",
      "/images/projects/penagihan-limbah/screens/06-laporan.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka Prototype di Figma",
      prototypeUrl:
        "https://www.figma.com/proto/HiSWS6WN1JP6xyUHWsshhp/Desain-Aplikasi-Penagihan-Limbah-Rumah-Tangga?node-id=52-55&t=U5BmMRSFI1nO4jwn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
      overview:
        "Aplikasi penagihan limbah rumah tangga untuk pengurus RT: mencatat tagihan warga, menandai tunggakan, dan menyusun laporan pemasukan. Dikerjakan secara mandiri dari riset pengguna, information architecture, hingga prototipe interaktif.",
      problem:
        "Pencatatan iuran limbah di tingkat RT umumnya masih manual, sehingga tunggakan sulit dilacak dan laporan bulanan harus dihitung ulang setiap periode.",
      research:
        "Riset pengguna dilakukan secara mandiri melalui wawancara dan observasi untuk memahami cara pengurus RT mencatat iuran dan menagih tunggakan.",
      keyInsights: [
        "Pengurus berpikir per kelompok warga (RT), bukan per individu — struktur data aplikasi harus mengikuti cara berpikir itu.",
        "Tunggakan perlu tampil sebagai status yang menonjol, bukan tersembunyi di dalam detail tagihan.",
      ],
      define:
        "Aplikasi dibagi menjadi dua sisi pengalaman: admin (login, dashboard, kelola tagihan, laporan) dan warga (melihat tagihan serta tunggakannya).",
      informationArchitecture:
        "Splash → Admin Login → Dashboard → Tagihan Individu → Detail Tagihan Kelompok → Laporan.",
      userFlow:
        "Admin masuk → melihat ringkasan pemasukan di dashboard → membuka tagihan warga → memeriksa tunggakan per kelompok RT → menyusun laporan periode.",
      uiDesign:
        "Antarmuka disusun di Figma dengan satu bahasa visual: kartu status tagihan, tabel tunggakan, dan ringkasan pemasukan pada dashboard. Status lunas dan menunggak dibedakan lewat warna, bukan hanya teks.",
      finalResult:
        "Enam layar: splash screen, admin login, dashboard, tagihan individu dengan tunggakan, detail tagihan kelompok warga RT 01, dan laporan.",
      reflection:
        "Mengerjakan sendiri dari riset sampai prototipe menuntut setiap keputusan punya alasan yang bisa dijelaskan, bukan hanya terlihat rapi.",
    },
  },
  {
    slug: "mediassist",
    number: "04",
    title: "Mediassist — Layanan Kesehatan & Konsultasi Dokter",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Team Project"],
    role: "UI/UX Designer — layar Daftar Dokter & Detail Dokter",
    team: "4 orang (Akbar, Amelda, Navyro Bagaskara, Dimas)",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "Konsep aplikasi layanan kesehatan untuk mencari dokter, melihat jadwal praktik, dan berkonsultasi lewat chat. Dikerjakan tim beranggotakan empat orang dengan pembagian layar per anggota.",
    featured: false,
    coverImage: "/images/projects/mediassist/cover.jpg",
    galleryImages: [
      "/images/projects/mediassist/cover.jpg",
      "/images/projects/mediassist/screens/01-onboarding-akbar.png",
      "/images/projects/mediassist/screens/02-home-amelda.png",
      "/images/projects/mediassist/screens/03-list-dokter-navyro.png",
      "/images/projects/mediassist/screens/04-detail-dokter-navyro.png",
      "/images/projects/mediassist/screens/05-jadwal-amelda.png",
      "/images/projects/mediassist/screens/06-chat-dimas.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka File Figma",
      prototypeUrl:
        "https://www.figma.com/design/azEpKDmPIhQx2HWyPGqLIS/Tugas-Kelompok-Kelas-UI-UX?node-id=11-125&t=gglQfxRG8MB2f9qn-1",
      overview:
        "Mediassist adalah konsep aplikasi layanan kesehatan: mencari dokter, melihat jadwal, lalu berkonsultasi lewat chat. Proyek tim beranggotakan empat orang dengan pembagian layar per anggota.",
      problem:
        "Mencari dokter dan mengatur jadwal konsultasi biasanya tersebar di kanal berbeda — daftar dokter di satu tempat, jadwal di tempat lain, konsultasi di tempat ketiga. Konsep ini menyatukan ketiganya dalam satu alur.",
      define:
        "Pekerjaan dibagi per layar: onboarding, home, dan jadwal dipegang anggota lain; saya mengerjakan daftar dokter dan detail dokter; chat dikerjakan anggota lainnya.",
      informationArchitecture:
        "Onboarding → Home → Daftar Dokter → Detail Dokter → Jadwal → Chat.",
      userFlow:
        "Pengguna mengenal layanan lewat onboarding → melihat dokter yang tersedia → membuka detail dokter untuk memeriksa profil dan jadwal praktik → melanjutkan ke penjadwalan atau chat.",
      uiDesign:
        "Layar yang saya rancang: daftar dokter dengan kartu dokter dan penyaring spesialis, serta detail dokter berisi profil, jadwal praktik, dan aksi konsultasi. Keduanya memakai komponen yang sama dengan layar home dan jadwal milik anggota tim agar satu aplikasi terasa utuh.",
      finalResult:
        "Enam layar yang membentuk satu alur: onboarding, home, daftar dokter, detail dokter, jadwal, dan chat.",
      reflection:
        "Pada proyek tim, konsistensi komponen antaranggota lebih menentukan kualitas akhir daripada kerumitan satu layar.",
    },
  },
  {
    slug: "kick-swift",
    number: "05",
    title: "Kick Swift — Konsep Aplikasi Belanja Sepatu",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "E-Commerce"],
    role: "UI/UX Designer",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "Konsep aplikasi belanja sepatu: katalog, pencarian, detail produk dengan pemilihan ukuran, dan keranjang belanja.",
    featured: false,
    coverImage: "/images/projects/kick-swift/cover.jpg",
    galleryImages: [
      "/images/projects/kick-swift/cover.jpg",
      "/images/projects/kick-swift/screens/01-splash3.png",
      "/images/projects/kick-swift/screens/02-onboard-1.png",
      "/images/projects/kick-swift/screens/03-home.png",
      "/images/projects/kick-swift/screens/04-search.png",
      "/images/projects/kick-swift/screens/05-details.png",
      "/images/projects/kick-swift/screens/06-troli.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka Prototype di Figma",
      prototypeUrl:
        "https://www.figma.com/proto/G42kCFdLB90IHhbSvz6OO2/Srudi-Indemendent?node-id=76-8592&starting-point-node-id=312%3A1485&t=TVNSPIIDYlreerF2-1",
      overview:
        "Kick Swift adalah konsep aplikasi belanja sepatu: katalog dengan kategori dan produk populer, pencarian, detail produk, dan keranjang.",
      problem:
        "Pada belanja sepatu, ukuran adalah keputusan paling rawan. Pengguna perlu melihat ketersediaan ukuran dan material sebelum menambah produk ke keranjang, tanpa harus mundur ke katalog.",
      informationArchitecture:
        "Splash → Onboarding → Home → Pencarian → Detail Produk (galeri, material, ukuran) → Keranjang.",
      userFlow:
        "Pengguna membuka aplikasi → menelusuri kategori atau mencari → membuka detail produk → memilih ukuran → menambahkan ke keranjang → memeriksa ringkasan sebelum checkout.",
      uiDesign:
        "Home menampilkan kategori, sepatu populer, dan produk yang sedang dicari. Halaman detail memuat galeri, material, dan pemilih ukuran. Keranjang merangkum item beserta harga sebelum checkout, dengan hierarki visual yang menempatkan harga dan tombol aksi sebagai fokus.",
      finalResult:
        "Enam layar: splash, onboarding, home, pencarian, detail produk, dan keranjang.",
    },
  },
  {
    slug: "jogging-id",
    number: "06",
    title: "Jogging ID — Pelacak Lari & Tantangan",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Activity Tracking"],
    role: "UI/UX Designer",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "Konsep aplikasi pelacak lari: mencatat rute, waktu, dan hasil latihan, serta menyimpan riwayat dan tantangan mingguan.",
    featured: false,
    coverImage: "/images/projects/jogging-id/cover.jpg",
    galleryImages: [
      "/images/projects/jogging-id/cover.jpg",
      "/images/projects/jogging-id/screens/01-splash-screen-3.png",
      "/images/projects/jogging-id/screens/02-on-boarding.png",
      "/images/projects/jogging-id/screens/03-home.png",
      "/images/projects/jogging-id/screens/04-start-run.png",
      "/images/projects/jogging-id/screens/05-week-1-day-1-out-door.png",
      "/images/projects/jogging-id/screens/06-result-workout.png",
      "/images/projects/jogging-id/screens/07-result.png",
      "/images/projects/jogging-id/screens/08-challenges.png",
      "/images/projects/jogging-id/screens/09-profile.png",
    ],
    caseStudy: {
      prototypeLabel: "Buka Prototype di Figma",
      prototypeUrl:
        "https://www.figma.com/proto/G42kCFdLB90IHhbSvz6OO2/Srudi-Indemendent?node-id=118-2108&t=A9QefFLcqlliVKj8-1&scaling=min-zoom&content-scaling=fixed&page-id=117%3A632",
      overview:
        "Jogging ID adalah konsep aplikasi pelacak lari: mencatat rute, waktu, dan hasil latihan, lalu menyimpan riwayat serta tantangan mingguan.",
      problem:
        "Saat berlari, pengguna hanya bisa melirik layar sepersekian detik. Informasi terpenting — jarak, waktu, dan pace — harus terbaca tanpa mengalihkan perhatian dari jalan.",
      informationArchitecture:
        "Splash → Onboarding → Home → Mulai Lari → Sesi Berlari → Ringkasan Hasil → Riwayat → Tantangan → Profil.",
      userFlow:
        "Pengguna membuka home → menekan mulai lari → memantau jarak, waktu, dan pace selama sesi → menyelesaikan sesi → menerima ringkasan hasil yang tersimpan di riwayat.",
      uiDesign:
        "Layar sesi berlari memakai tipografi besar dan kontras tinggi untuk jarak, waktu, dan pace, dengan tombol jeda yang mudah dijangkau satu tangan. Ringkasan hasil menampilkan rute dan data latihan, sementara halaman tantangan memakai sistem progres mingguan agar pengguna punya alasan kembali.",
      finalResult:
        "Sembilan layar: splash, onboarding, home, mulai lari, sesi lari luar ruangan, ringkasan latihan, hasil, tantangan, dan profil.",
    },
  },
];
