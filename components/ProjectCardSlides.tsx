"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ProjectCardSlidesProps {
  slides: string[];
  alt: string;
  sizes?: string;
  /** Milliseconds each screen stays visible. 4.5s sits in the 4–5s range the owner asked for. */
  intervalMs?: number;
  /** Cross-fade length. Kept short so the change is soft but never feels sluggish. */
  fadeMs?: number;
}

/**
 * Auto-advancing phone screens inside the card's existing device mockup.
 *
 * Deliberately minimal: positioned `next/image` layers stacked inside the screen box, with only
 * `opacity` transitioning. The frame, the card and the layout never move — there is no zoom, no
 * pan and no scroll — so there is no reflow or layout shift while it cycles.
 *
 * Why no pan: every FanFunds screen is exactly 393x852, the same ratio as the phone screen box, so
 * there is no overflow to scroll across. Any pan would either show blank space or cut real UI.
 *
 * Accessibility:
 * - `prefers-reduced-motion` shows one static screen and never starts a timer.
 * - Only the first slide is `priority`, so the card is never blank on load; the rest lazy-load.
 */
export default function ProjectCardSlides({
  slides,
  alt,
  sizes = "(min-width: 768px) 46vw, 92vw",
  intervalMs = 4500,
  fadeMs = 700,
  children,
}: ProjectCardSlidesProps & {
  children: (state: { layers: React.ReactNode }) => React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Server-render (and the first client render) shows only the first screen. The remaining
  // layers are mounted after hydration, so the HTML never contains `opacity:0` content: with
  // JavaScript off every card still shows its screenshot, and `npm run check` stays honest.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read the OS setting and keep following it if the user changes it while the page is open.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const canPlay = slides.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!canPlay) return;

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [canPlay, intervalMs, slides.length]);

  const visible = !mounted || reduceMotion ? [slides[0]] : slides;
  const activeIndex = !mounted || reduceMotion ? 0 : index;

  const layers = visible.map((src, i) => {
    const isActive = i === activeIndex;
    return (
      <div
        key={src}
        className="absolute inset-0 ease-in-out motion-reduce:transition-none"
        style={{
          opacity: isActive ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: `${fadeMs}ms`,
        }}
        aria-hidden={isActive ? undefined : true}
      >
        <Image
          src={src}
          alt={isActive ? alt : ""}
          fill
          sizes={sizes}
          quality={88}
          priority={i === 0}
          className="object-contain"
        />
      </div>
    );
  });

  return <>{children({ layers })}</>;
}
