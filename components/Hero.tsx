"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-background pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 border-b border-border">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Step 1 — Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-meta font-bold tracking-widest text-accent uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {profileData.role}
          </motion.div>

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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8 max-w-2xl text-h3 text-text-secondary leading-relaxed font-normal"
          >
            {profileData.shortStatement}
          </motion.p>

          {/* Step 4 — Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
