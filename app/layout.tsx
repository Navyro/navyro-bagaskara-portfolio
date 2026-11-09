import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profileData } from "@/data/profile";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profileData.name,
  jobTitle: profileData.role,
  description: profileData.shortStatement,
  url: siteUrl,
  image: `${siteUrl}${OG_IMAGE.url}`,
  email: `mailto:${profileData.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bekasi",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  // Every fact below matches TENTANG SAYA/CV_Navyro_Bagaskara_EN.pdf verbatim.
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profileData.education[0].institution,
  },
  knowsAbout: [
    ...profileData.skills.uiux,
    ...profileData.skills.frontend,
    ...profileData.skills.tools,
  ],
  sameAs: profileData.linkedin ? [profileData.linkedin] : [],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Navyro Bagaskara",
    "UI/UX Designer",
    "Front-End Developer",
    "Product Design",
    "Next.js Portfolio",
    "Design Systems",
    "Tailwind CSS",
  ],
  authors: [{ name: "Navyro Bagaskara" }],
  openGraph: {
    title: SITE_TITLE,
    description:
      "Personal Portfolio & Case Studies showcasing UI/UX thinking and Front-End execution.",
    type: "website",
    locale: "id_ID",
    siteName: "Navyro Bagaskara",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Portfolio & case studies: dari riset pengguna sampai prototipe dan kode siap produksi.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Progressive enhancement for the scroll reveal (components/ScrollReveal.tsx).
          Runs before first paint, so JS-enabled visitors never see content flash in and out.
          The failsafe removes the class again after 2.5s if the bundle never mounted, so a
          failed chunk leaves every block visible instead of blank.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.classList.add("reveal-ready");' +
              'window.setTimeout(function(){if(!window.__revealAlive){document.documentElement.classList.remove("reveal-ready");}},2500);',
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary flex min-h-screen flex-col transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <a href="#main" className="skip-link">
            Lewati ke konten utama
          </a>
          <CustomCursor />
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* Person structured data: name, role, city, university, tools — nothing that is
            not already stated on the page or in the CV. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
