"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-background pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 border-b border-border">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        {/* Two columns from lg up: copy left, portrait right. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 max-w-4xl">
          {/* Step 1 — Eyebrow */}
          <div className="rise inline-flex items-center gap-2 text-meta font-bold tracking-widest text-accent uppercase">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {profileData.role}
          </div>

          {/* Step 2 — Identity is text, not a performance: the name is always complete. */}
          <h1 className="mt-6 flex items-baseline font-heading text-display font-extrabold text-text-primary leading-[1.05]">
            <span>{profileData.name}</span>
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="ml-1 inline-block h-[0.9em] w-[3px] flex-shrink-0 bg-accent"
              />
            )}
          </h1>

          {/* Step 3 — Statement */}
          <p className="rise rise-1 mt-8 max-w-2xl text-h3 text-text-secondary leading-relaxed font-normal">
            {profileData.shortStatement}
          </p>

          {/* Step 4 — Action CTAs */}
          <div className="rise rise-2 mt-10 flex flex-wrap items-center gap-4">
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/work"
                data-cursor="cta"
                className="group inline-flex items-center gap-2.5 rounded-btn bg-text-primary px-7 py-3.5 text-control font-semibold text-background transition-colors hover:bg-accent hover:text-white shadow-sm"
              >
                <span>View Selected Work</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/contact"
                data-cursor="cta"
                className="group inline-flex items-center gap-2.5 rounded-btn border border-border bg-surface px-7 py-3.5 text-control font-semibold text-text-primary transition-colors hover:border-text-primary hover:bg-background"
              >
                <span>Contact Me</span>
                <ArrowUpRight
                  size={16}
                  className="text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Portrait — real photo, 4:5 crop, no overlay so it stays honest in light and dark. */}
        <div className="rise rise-3 lg:col-span-5">
          <div className="mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
            <div className="overflow-hidden rounded-card border border-border bg-surface shadow-sm">
              <Image
                src="/images/profile-navyro.jpg"
                alt={`${profileData.name} — ${profileData.role}`}
                width={1000}
                height={1250}
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 320px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
