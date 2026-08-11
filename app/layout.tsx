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

export const metadata: Metadata = {
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
