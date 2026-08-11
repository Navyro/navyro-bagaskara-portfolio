"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const links = [
    { name: "HOME", href: "/" },
    { name: "WORK", href: "/work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="fixed inset-x-0 top-[61px] z-30 flex flex-col border-b border-border bg-background px-6 py-8 shadow-lg md:hidden animate-in slide-in-from-top-2">
      <nav className="flex flex-col gap-6">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href === "/work" && pathname.startsWith("/work"));
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`font-heading text-2xl font-bold tracking-tight transition-colors ${
                active ? "text-accent" : "text-text-primary hover:text-accent"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <hr className="my-2 border-border" />
        <Link
          href="/resume"
          onClick={onClose}
          className="inline-flex items-center gap-2 font-heading text-xl font-semibold text-text-primary hover:text-accent"
        >
          RESUME <ArrowUpRight size={18} />
        </Link>
      </nav>

      <div className="mt-8 pt-4">
        <p className="text-xs text-text-muted">Direct Email</p>
        <a
          href="mailto:navyro.bagaskara@email.com"
          className="text-sm font-medium text-text-primary hover:underline"
        >
          navyro.bagaskara@email.com
        </a>
      </div>
    </div>
  );
}
