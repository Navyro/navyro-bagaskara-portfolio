"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import ScrollProgressBar from "./ScrollProgressBar";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "WORK", href: "/work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/work" && pathname.startsWith("/work")) return true;
    return pathname === path;
  };

  return (
    <>
      <ScrollProgressBar />

      <header className="sticky top-0 z-40 h-[var(--header-h)] w-full border-b border-border bg-background/90 backdrop-blur-md transition-all duration-200">
        {/* Fixed px padding by design: a rem value doubles under 200% text zoom and is wider than
            a 320px viewport on small phones. px-6/px-12 at the default 16px root equal these. */}
        <div className="mx-auto flex h-full max-w-editorial items-center justify-between px-[24px] lg:px-[48px]">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="inline-flex items-center font-heading text-h3 font-bold tracking-tight text-text-primary transition-opacity hover:opacity-75 max-md:py-2.5 max-md:-my-2.5"
          >
            NAVYRO<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation + Theme Toggle */}
          <div className="hidden min-w-0 items-center gap-[32px] overflow-x-auto md:flex">
            <nav className="flex items-center gap-[32px]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-meta font-semibold tracking-wider transition-colors duration-200 ${ isActive(link.href) ? "text-text-primary" : "text-text-secondary hover:text-text-primary" }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent animate-in fade-in" />
                  )}
                </Link>
              ))}

              {/* Resume Link */}
              <Link
                href="/resume"
                className="tap inline-flex items-center gap-1 text-meta font-semibold tracking-wider text-text-primary transition-colors hover:text-accent"
              >
                RESUME <ArrowUpRight size={14} className="text-text-muted" />
              </Link>
            </nav>

            <ThemeToggle />
          </div>

          {/* Mobile Actions (Theme Toggle + Hamburger) */}
          <div className="flex items-center gap-[12px] md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="tap flex shrink-0 items-center justify-center gap-2 min-w-[44px] text-meta font-semibold tracking-wider text-text-primary"
              aria-label="Toggle navigation menu"
            >
              {/* Label is decorative here: `aria-label` already names the button, and hiding the text
                  below `sm` keeps the header from overflowing when a user scales text up. */}
              <span className="hidden sm:inline">{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
