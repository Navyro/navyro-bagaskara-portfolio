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
  /**
   * Screenshot shown inside the device mockup on the /work card, plus its own aspect ratio
   * (width / height) so the frame can never crop the UI. Chosen from the project's own
   * `screens/` set — see docs/ux-visual/verification/project-device-mockups.md.
   */
  cardShot?: string;
  cardShotAspect?: number;
  /**
   * Optional screens that cycle inside the card's device frame on /work. Only set for a project
   * whose owner has approved the live preview (currently FanFunds). Every entry must be a real
   * screenshot from that project's own `screens/` folder with the same aspect as `cardShotAspect`,
   * otherwise the frame would have to crop it. Omit the field and the card shows `cardShot` only.
   */
  cardSlides?: string[];
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
    title: "SIPENELITIAN — Research Data Management System, Universitas Alma Ata",
    category: "Web",
    tags: ["UI/UX Design", "Web App", "Design Thinking", "Usability Testing"],
    role: "UI/UX Designer",
    year: "2026",
    duration: "May — Jul 2026",
    team: "LP2M Universitas Alma Ata development team",
    tools: ["Figma"],
    screenFrame: "desktop",
    shortDescription:
      "Research data management system for LP2M Universitas Alma Ata — from user interviews through to usability testing with 20 lecturers, scoring 76.75 on the System Usability Scale.",
    featured: true,
    coverImage: "/images/projects/sipenelitian/cover.jpg",
    cardShot: "/images/projects/sipenelitian/screens/02-dashboard-admin.png",
    cardShotAspect: 1440/1024,
    // Three of the real 1440x1024 app screens, matching cardShotAspect exactly so the laptop screen
    // never crops or letterboxes. This is a desktop admin app whose screens all share one table
    // layout, so the candidates were picked by measured pixel difference: these three are the most
    // distinct available (login form, usulan detail, monitoring logbook). A fourth near-identical
    // table was left out on purpose — cycling between look-alike tables would read as a stall.
    cardSlides: [
      "/images/projects/sipenelitian/screens/01-login.png",
      "/images/projects/sipenelitian/screens/05-usulan-masuk-detail-klik-update-ubah-status.png",
      "/images/projects/sipenelitian/screens/06-laporan-kemajuan-detail-monitoring-logbook.png",
    ],
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
      prototypeLabel: "Open Prototype in Figma",
      prototypeUrl:
        "https://www.figma.com/proto/NdKat89nkFRm125a1HWl3y/Sistem-Informasi-Pengelolaan-Data-Penelitian-UAA?node-id=1479-95355&t=xU7iF3NW7SaXaF4R-1&scaling=scale-down&content-scaling=fixed&page-id=1365%3A20569",
      overview:
        "SIPENELITIAN is a research data management system for LP2M at Universitas Alma Ata. It handles the full flow — research proposals and internal grants, progress-report monitoring with logbooks, through to final reports and signed approval sheets — with two user roles: lecturer-researcher and LP2M admin.",
      problem:
        "Research data scattered across many files made it hard for the LP2M admin to see where each proposal stood: which were still awaiting review, which were running, and which were late reporting progress. The design challenge was consolidating all of those states into a single interface without adding to the admin's workload.",
      research:
        "The project followed a Design Thinking process, starting with interviews and observation inside the LP2M UAA environment to map the existing proposal and reporting flows, then translating that into an information architecture and a high-fidelity prototype.",
      keyInsights: [
        "The proposal list needs to show status and budget year together, so the admin can filter without opening documents one by one.",
        "Status changes have to be possible directly from the proposal detail page, not from a separate menu.",
        "Logbooks and research outputs are attached to the progress report so the activity history never separates from its report.",
      ],
      define:
        "The roles are clearly separated. Lecturers submit proposals and upload reports; the LP2M admin verifies, changes status, and downloads approval files. Each gets its own sign-in page and navigation, sharing one table pattern so the admin never has to relearn a page.",
      informationArchitecture:
        "Login → Admin Dashboard → Internal Grants (add program) → Incoming Proposals (all years) → Proposal Detail (status change) → Progress Reports (monitoring & logbook) → Final Reports (download approval sheet) → Manage Users.",
      userFlow:
        "Admin flow: sign in → read the dashboard summary → review incoming proposals → open detail → update status.\nLecturer flow: sign in → submit a proposal → fill in the logbook → upload the final report.",
      uiDesign:
        "The interface was designed in Figma as a desktop dashboard: data tables with status markers, a detail panel beside the list, and internal-grant and manage-users forms that follow the same table pattern. Status colours are applied consistently to distinguish each stage of a proposal.",
      testing:
        "Usability testing ran with 20 lecturers. It produced a System Usability Scale (SUS) score of 76.75 — “Acceptable” for acceptability and “Good” for usability.",
      finalResult:
        "The prototype covers eight core screens: login, admin dashboard, add internal grant program, all-years proposal list, proposal detail with status change, progress-report monitoring detail with logbook, final report with approval-sheet download, and manage users.",
      reflection:
        "In administrative systems, clear status matters more than visual polish. What got retested most was the placement of status and of the status-change button.",
    },
  },
  {
    slug: "fanfunds",
    number: "02",
    title: "FanFunds — Donation App for Creators",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Design System", "A/B Testing"],
    role: "UI/UX Designer",
    year: "2024",
    duration: "Oct — Dec 2024",
    team: "MSIB Batch 7 capstone team, BISA AI Academy",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "A donation app for creators, built as the MSIB Batch 7 independent-study capstone — covering user personas, user flows, a design system, and A/B testing with 30 respondents.",
    featured: true,
    coverImage: "/images/projects/fanfunds/cover.jpg",
    cardShot: "/images/projects/fanfunds/screens/03-home-discover.png",
    cardShotAspect: 393/852,
    // Four real FanFunds screens, all 393x852 like cardShot, so the phone screen never crops or
    // stretches. Chosen for visual variety: discover feed, creator profile, following feed, payment.
    cardSlides: [
      "/images/projects/fanfunds/screens/03-home-discover.png",
      "/images/projects/fanfunds/screens/07-profil-kreator-leaderboard.png",
      "/images/projects/fanfunds/screens/04-home-following.png",
      "/images/projects/fanfunds/screens/09-donate-step-4.png",
    ],
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
      prototypeLabel: "Open Prototype in Figma",
      prototypeUrl:
        "https://www.figma.com/proto/bKf9mTxPznmVp6EMoLCzCU/FanFunds?node-id=240-1604&t=sq8asbpd6QJ80FUn-1&scaling=scale-down&content-scaling=fixed&page-id=235%3A152&starting-point-node-id=240%3A1470&show-proto-sidebar=1",
      overview:
        "FanFunds is a donation app for creators: supporters find creators, give support, then see where they stand on the leaderboard. It was the MSIB Batch 7 capstone at BISA AI Academy, where I contributed as UI/UX Designer.",
      problem:
        "Donation apps often stop at a single completed transaction. The challenge was making support feel like an ongoing relationship between creator and supporter — through creator updates, notifications, and a leaderboard.",
      research:
        "My research contribution covered building the user personas and user flows the design rests on, followed by A/B testing with 30 respondents to compare design variants.",
      keyInsights: [
        "A donor's standing should be visible from the profile page, not only in the global leaderboard list.",
        "Notifications separate creator updates from news about other donors, so the two never blur into one message type.",
      ],
      define:
        "The experience splits into three axes: finding creators (discover), giving support (donate), and tracking the impact of that support (leaderboard and notifications).",
      informationArchitecture:
        "Splash → Onboarding → Home (Discover / Following) → Search → Leaderboard → Creator Profile → Supporter Profile → Donate → Notifications.",
      userFlow:
        "Donor: onboarding → discover → choose a creator → tiered donation → confirmation. After donating, standing and support history appear on the supporter profile and the leaderboard.",
      uiDesign:
        "The home, explore, payment, and leaderboard screens were designed in Figma alongside the project design system. Button, creator-card, and donation-progress components are reused across screens to keep them consistent.",
      testing:
        "A/B testing ran with 30 respondents to compare design variants before finalisation.",
      finalResult:
        "Eleven screens: splash, onboarding, two home variants (discover and following), search, leaderboard list, creator profile, supporter profile, the donation steps, and two donor notifications.",
      reflection:
        "Working in a capstone team got me used to handing over design-system components, not just design files.",
    },
  },
  {
    slug: "penagihan-limbah-rt",
    number: "03",
    title: "Household Waste Billing App",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "User Research"],
    role: "UI/UX Designer (Independent)",
    year: "2025",
    duration: "Aug — Oct 2025",
    team: "Individual",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "A waste-fee billing app for neighbourhood administrators: record residents' bills, flag arrears, and compile monthly reports. Built independently, from user research through to an interactive prototype.",
    featured: true,
    coverImage: "/images/projects/penagihan-limbah/cover.jpg",
    cardShot: "/images/projects/penagihan-limbah/screens/06-laporan.png",
    cardShotAspect: 412/917,
    // Four real 412x917 screens, same ratio as cardShot. Chosen for variety: dashboard totals,
    // an individual arrears bill, the RT group bill, and the monthly report.
    cardSlides: [
      "/images/projects/penagihan-limbah/screens/03-dashboard.png",
      "/images/projects/penagihan-limbah/screens/04-tagihan-individu-tunggakan-1.png",
      "/images/projects/penagihan-limbah/screens/05-detail-tagihan-kelompok-warga-rt-01-feb-nunggak.png",
      "/images/projects/penagihan-limbah/screens/06-laporan.png",
    ],
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
      prototypeLabel: "Open Prototype in Figma",
      prototypeUrl:
        "https://www.figma.com/proto/HiSWS6WN1JP6xyUHWsshhp/Desain-Aplikasi-Penagihan-Limbah-Rumah-Tangga?node-id=52-55&t=U5BmMRSFI1nO4jwn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
      overview:
        "A household waste billing app for RT administrators: record residents' bills, flag arrears, and compile income reports. Built independently from user research and information architecture through to an interactive prototype.",
      problem:
        "Waste-fee collection at the neighbourhood level is usually still manual, so arrears are hard to trace and the monthly report has to be recalculated every period.",
      research:
        "User research was carried out independently through interviews and observation, to understand how RT administrators record fees and chase arrears.",
      keyInsights: [
        "Administrators think in groups of residents (RT), not individuals — the app's data structure has to follow that mental model.",
        "Arrears have to appear as a prominent status, not hidden inside a bill's detail.",
      ],
      define:
        "The app splits into two experience sides: admin (login, dashboard, manage bills, reports) and resident (viewing bills and arrears).",
      informationArchitecture:
        "Splash → Admin Login → Dashboard → Individual Bill → Group Bill Detail → Reports.",
      userFlow:
        "Admin signs in → sees the income summary on the dashboard → opens a resident's bill → checks arrears per RT group → compiles the period report.",
      uiDesign:
        "The interface was built in Figma on one visual language: bill status cards, arrears tables, and an income summary on the dashboard. Paid and overdue are distinguished by colour, not text alone.",
      finalResult:
        "Six screens: splash screen, admin login, dashboard, individual bill with arrears, group bill detail for RT 01 residents, and reports.",
      reflection:
        "Doing everything alone, from research to prototype, meant every decision had to have a reason I could explain — not just look tidy.",
    },
  },
  {
    slug: "mediassist",
    number: "04",
    title: "Mediassist — Healthcare & Doctor Consultation",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Team Project"],
    role: "UI/UX Designer — Doctor List & Doctor Detail screens",
    team: "4 people (Akbar, Amelda, Navyro Bagaskara, Dimas)",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "A healthcare app concept for finding doctors, checking clinic schedules, and consulting over chat. Built by a four-person team with screens split per member.",
    featured: false,
    coverImage: "/images/projects/mediassist/cover.jpg",
    cardShot: "/images/projects/mediassist/screens/02-home-amelda.png",
    cardShotAspect: 393/852,
    // Four real 393x852 screens, same ratio as cardShot. Chosen for variety: home, doctor list,
    // doctor detail, and the appointment schedule.
    cardSlides: [
      "/images/projects/mediassist/screens/02-home-amelda.png",
      "/images/projects/mediassist/screens/03-list-dokter-navyro.png",
      "/images/projects/mediassist/screens/04-detail-dokter-navyro.png",
      "/images/projects/mediassist/screens/05-jadwal-amelda.png",
    ],
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
      prototypeLabel: "Open Figma File",
      prototypeUrl:
        "https://www.figma.com/design/azEpKDmPIhQx2HWyPGqLIS/Tugas-Kelompok-Kelas-UI-UX?node-id=11-125&t=gglQfxRG8MB2f9qn-1",
      overview:
        "Mediassist is a healthcare app concept: find a doctor, check the schedule, then consult over chat. A four-person team project with screens split per member.",
      problem:
        "Finding a doctor and arranging a consultation usually scatters across separate channels — a doctor list in one place, schedules in another, consultation in a third. This concept brings all three into one flow.",
      define:
        "Work was split per screen: onboarding, home, and schedule were owned by other members; I built the doctor list and doctor detail; chat was handled by another member.",
      informationArchitecture:
        "Onboarding → Home → Doctor List → Doctor Detail → Schedule → Chat.",
      userFlow:
        "A user meets the service through onboarding → browses available doctors → opens a doctor's detail to check profile and clinic schedule → continues to scheduling or chat.",
      uiDesign:
        "Screens I designed: the doctor list with doctor cards and specialty filters, and the doctor detail holding profile, clinic schedule, and consultation action. Both reuse the same components as the team's home and schedule screens, so the app reads as one product.",
      finalResult:
        "Six screens forming one flow: onboarding, home, doctor list, doctor detail, schedule, and chat.",
      reflection:
        "On a team project, component consistency between members decides final quality more than the complexity of any single screen.",
    },
  },
  {
    slug: "kick-swift",
    number: "05",
    title: "Kick Swift — Shoe Shopping App Concept",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "E-Commerce"],
    role: "UI/UX Designer",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "A shoe shopping app concept: catalogue, search, product detail with size selection, and a shopping cart.",
    featured: false,
    coverImage: "/images/projects/kick-swift/cover.jpg",
    cardShot: "/images/projects/kick-swift/screens/03-home.png",
    cardShotAspect: 1125/2436,
    // Four real 1125x2436 screens, same ratio as cardShot. Chosen for variety: home, search,
    // product detail, and the cart.
    cardSlides: [
      "/images/projects/kick-swift/screens/03-home.png",
      "/images/projects/kick-swift/screens/04-search.png",
      "/images/projects/kick-swift/screens/05-details.png",
      "/images/projects/kick-swift/screens/06-troli.png",
    ],
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
      prototypeLabel: "Open Prototype in Figma",
      prototypeUrl:
        "https://www.figma.com/proto/G42kCFdLB90IHhbSvz6OO2/Srudi-Indemendent?node-id=76-8592&starting-point-node-id=312%3A1485&t=TVNSPIIDYlreerF2-1",
      overview:
        "Kick Swift is a shoe shopping app concept: a catalogue with categories and popular products, search, product detail, and cart.",
      problem:
        "In shoe shopping, size is the riskiest decision. Users need to see size availability and materials before adding a product to the cart, without backing out to the catalogue.",
      informationArchitecture:
        "Splash → Onboarding → Home → Search → Product Detail (gallery, material, size) → Cart.",
      userFlow:
        "A user opens the app → browses categories or searches → opens a product detail → picks a size → adds to cart → reviews the summary before checkout.",
      uiDesign:
        "Home shows categories, popular shoes, and products being searched for. The detail page holds the gallery, materials, and size picker. The cart summarises items with prices before checkout, with a visual hierarchy that makes price and the action button the focus.",
      finalResult:
        "Six screens: splash, onboarding, home, search, product detail, and cart.",
    },
  },
  {
    slug: "jogging-id",
    number: "06",
    title: "Jogging ID — Running Tracker & Challenges",
    category: "Mobile",
    tags: ["UI/UX Design", "Mobile App", "Activity Tracking"],
    role: "UI/UX Designer",
    tools: ["Figma"],
    screenFrame: "phone",
    shortDescription:
      "A running-tracker app concept: recording route, time, and workout results, plus saved history and weekly challenges.",
    featured: false,
    coverImage: "/images/projects/jogging-id/cover.jpg",
    cardShot: "/images/projects/jogging-id/screens/07-result.png",
    cardShotAspect: 390/844,
    // Four real 390x844 screens, same ratio as cardShot. Chosen for variety: home, the running
    // workout result, the run summary, and the profile.
    // `08-challenges.png` is 390x845 (one pixel taller than the screen box) so it is deliberately
    // left out — including it would letterbox or crop by a pixel.
    cardSlides: [
      "/images/projects/jogging-id/screens/03-home.png",
      "/images/projects/jogging-id/screens/06-result-workout.png",
      "/images/projects/jogging-id/screens/07-result.png",
      "/images/projects/jogging-id/screens/09-profile.png",
    ],
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
      prototypeLabel: "Open Prototype in Figma",
      prototypeUrl:
        "https://www.figma.com/proto/G42kCFdLB90IHhbSvz6OO2/Srudi-Indemendent?node-id=118-2108&t=A9QefFLcqlliVKj8-1&scaling=min-zoom&content-scaling=fixed&page-id=117%3A632",
      overview:
        "Jogging ID is a running-tracker app concept: record route, time, and workout results, then save history and weekly challenges.",
      problem:
        "While running, a user can only glance at the screen for a fraction of a second. The most important information — distance, time, and pace — has to be readable without pulling attention off the road.",
      informationArchitecture:
        "Splash → Onboarding → Home → Start Run → Running Session → Result Summary → History → Challenges → Profile.",
      userFlow:
        "A user opens home → taps start run → monitors distance, time, and pace during the session → ends the session → gets a result summary saved to history.",
      uiDesign:
        "The running-session screen uses large, high-contrast typography for distance, time, and pace, with a pause button easy to reach one-handed. The result summary shows route and workout data, while the challenges page uses a weekly progress system so users have a reason to come back.",
      finalResult:
        "Nine screens: splash, onboarding, home, start run, outdoor running session, workout summary, results, challenges, and profile.",
    },
  },
];
