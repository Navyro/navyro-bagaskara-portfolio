import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="w-full bg-inverse-bg text-inverse-text border-t border-border transition-colors duration-200">
      <div className="mx-auto max-w-editorial px-[24px] py-16 lg:px-[48px] lg:py-20">
        <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-12">
          {/* Brand & Positioning */}
          <div className="lg:col-span-6">
            <h2 className="font-heading text-h3 font-bold tracking-tight text-inverse-text lg:text-h2">
              NAVYRO BAGASKARA
            </h2>
            <p className="mt-2 text-control font-medium tracking-wide opacity-80">
              UI/UX DESIGNER + FRONT-END FUNDAMENTALS
            </p>
            <p className="mt-6 max-w-md text-control opacity-70 leading-relaxed">
              {profileData.shortStatement}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            {/* opacity-50 measured 3.53:1 against the footer surface; 60 clears WCAG AA for 12px text. */}
            <p className="text-meta font-semibold tracking-wider opacity-60 uppercase">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col max-md:gap-0 md:gap-3 text-control">
              <li>
                <Link
                  href="/work"
                  className="tap-block transition-colors hover:text-accent"
                >
                  Work &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="tap-block transition-colors hover:text-accent"
                >
                  About &amp; Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="tap-block transition-colors hover:text-accent"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="tap-block transition-colors hover:text-accent"
                >
                  Resume / CV ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Social Links */}
          <div className="lg:col-span-3">
            <p className="text-meta font-semibold tracking-wider opacity-60 uppercase">
              Connect
            </p>
            <ul className="mt-4 flex flex-col max-md:gap-0 md:gap-3 text-control">
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="tap-block inline-flex items-center gap-1 transition-colors hover:text-accent"
                >
                  Email <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-block inline-flex items-center gap-1 transition-colors hover:text-accent"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
              </li>
              {/* Only rendered when the URL is real: an <a> without an href is a dead
                  target that looks clickable and does nothing. */}
              {profileData.github && (
                <li>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-block inline-flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    GitHub <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 text-meta opacity-60 md:flex-row">
          <p>© {new Date().getFullYear()} Navyro Bagaskara. All rights reserved.</p>
          <p className="font-mono">Design System v4.0 · Next.js 14 · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
