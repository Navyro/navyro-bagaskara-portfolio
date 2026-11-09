import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
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

/* Absolute URLs are required for Open Graph / Twitter cards. Set NEXT_PUBLIC_SITE_URL
   in production (e.g. https://navyro.vercel.app); on Vercel the project URL is used as a
   fallback so a preview deployment still previews correctly. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Navyro Bagaskara — UI/UX Designer & Front-End",
  type: "image/png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Navyro Bagaskara — UI/UX Designer + Front-End",
  description:
    "Personal Portfolio & Case Studies of Navyro Bagaskara. Specializing in UI/UX Design, Product Strategy, and Front-End Web Development with Next.js & Tailwind CSS.",
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
    title: "Navyro Bagaskara — UI/UX Designer + Front-End",
    description:
      "Personal Portfolio & Case Studies showcasing UI/UX thinking and Front-End execution.",
    type: "website",
    locale: "id_ID",
    siteName: "Navyro Bagaskara",
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navyro Bagaskara — UI/UX Designer + Front-End",
    description:
      "Portfolio & case studies: dari riset pengguna sampai prototipe dan kode siap produksi.",
    images: [ogImage],
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
      <body className="font-sans antialiased bg-background text-text-primary flex min-h-screen flex-col transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
