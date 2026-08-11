"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fullTitle = profileData.name;

  const [displayedText, setDisplayedText] = useState(
    shouldReduceMotion ? fullTitle : ""
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(75);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < fullTitle.length) {
          setDisplayedText(fullTitle.substring(0, displayedText.length + 1));
          setTypingSpeed(75);
        } else {
          // Finished typing full name -> pause for 2.5s before deleting
          setTypingSpeed(2500);
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        if (displayedText.length > 0) {
          setDisplayedText(fullTitle.substring(0, displayedText.length - 1));
          setTypingSpeed(45);
        } else {
          // Finished deleting -> pause briefly then re-type
          setIsDeleting(false);
          setTypingSpeed(400);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingSpeed, fullTitle, shouldReduceMotion]);

  return (
    <section className="w-full bg-background pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 border-b border-border">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Step 1 — Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {profileData.role}
          </motion.div>

          {/* Step 2 — Continuous Typewriter Name Loop */}
          <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-[1.15] min-h-[1.2em]">
            <span className="sr-only">{fullTitle}</span>
            <span aria-hidden="true">
              {displayedText}
              {!shouldReduceMotion && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.65, repeat: Infinity }}
                  className="inline-block text-accent font-light ml-0.5"
                >
                  ▌
                </motion.span>
              )}
            </span>
          </h1>

          {/* Step 3 — Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl lg:text-2xl leading-relaxed font-normal"
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
                className="group inline-flex items-center gap-2.5 rounded-btn bg-text-primary px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-white shadow-sm"
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
                className="group inline-flex items-center gap-2.5 rounded-btn border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary hover:bg-background"
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
