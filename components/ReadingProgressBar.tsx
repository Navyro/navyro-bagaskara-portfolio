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
    <div className="sticky top-[var(--header-h)] z-30 w-full border-b border-border bg-background/95 backdrop-blur-md transition-all py-2.5">
      <div className="mx-auto flex max-w-editorial items-center justify-between px-6 lg:px-12 text-xs font-semibold">
        <div className="flex min-w-0 items-center gap-2 text-text-secondary">
          <BookOpen size={14} className="flex-shrink-0 text-accent" />
          <span className="hidden flex-shrink-0 font-heading uppercase text-text-muted sm:inline">
            Reading Case Study:
          </span>
          <span className="truncate font-bold text-text-primary">
            {number} — {title}
          </span>
        </div>

        <div className="ml-4 flex flex-shrink-0 items-center gap-4 text-text-muted">
          <span>{readingPercent}% COMPLETED</span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
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
