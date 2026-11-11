"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen } from "lucide-react";

interface ReadingProgressBarProps {
  number: string;
  title: string;
}

export default function ReadingProgressBar({
  number,
  title,
}: ReadingProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });

  const [readingPercent, setReadingPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setReadingPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="sticky top-[var(--header-h)] z-30 w-full border-b border-border bg-background/95 backdrop-blur-md transition-all py-2.5 print:hidden">
      <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-between gap-y-1 px-[24px] lg:px-[48px] text-meta font-semibold">
        <div className="flex min-w-0 items-center gap-2 text-text-secondary">
          <BookOpen size={14} className="flex-shrink-0 text-accent" />
          <span className="hidden flex-shrink-0 font-heading uppercase text-text-muted sm:inline">
            Reading Case Study:
          </span>
          <span className="truncate font-bold text-text-primary">
            {number} — {title}
          </span>
        </div>

        <div className="ml-4 flex min-w-0 shrink flex-wrap items-center gap-x-3 gap-y-1 text-text-muted sm:gap-x-4">
          <span>{readingPercent}% COMPLETED</span>
          {/* Fixed px width on purpose: a rem width doubles when the user scales text up and
              pushes this row past the viewport. */}
          <div className="h-1.5 w-[72px] shrink-0 overflow-hidden rounded-full bg-border sm:w-[96px]">
            <motion.div
              style={{ scaleX: progressScaleX }}
              className="h-full w-full origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
