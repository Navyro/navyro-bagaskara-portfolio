"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    /** Set by the first mounted reveal; the <head> failsafe looks for it. */
    __revealAlive?: boolean;
  }
}

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

/**
 * Progressive-enhancement reveal.
 *
 * Content is rendered visible by the server and stays visible unless the client bundle
 * proves it is alive: app/layout.tsx adds `.reveal-ready` to <html> before first paint, and
 * that class is what arms the hidden pre-reveal state in globals.css. If the script tag is
 * stripped, JS is disabled, or the bundle never executes, the class is absent (or removed by
 * the 2.5s failsafe) and every block is simply on screen.
 *
 * Previously this used framer-motion with `initial={{ opacity: 0 }}`, which server-rendering
 * painted as `style="opacity:0"` on 24 blocks of the homepage — with JS off, the page looked
 * empty. No state is claimed here beyond what CSS and an IntersectionObserver can prove.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tell the <head> failsafe that the app really mounted.
    window.__revealAlive = true;

    // Honour reduced motion, and never hide anything if IntersectionObserver is missing.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "");
      return;
    }

    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      // Mirrors the old framer-motion viewport: reveal once, 40px before it really shows.
      { rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} data-reveal={direction} className={className}>
      {children}
    </div>
  );
}
