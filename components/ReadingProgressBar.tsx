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
    <div className="sticky top-[61px] z-30 w-full border-b border-border bg-background/95 backdrop-blur-md transition-all py-2.5">
      <div className="mx-auto flex max-w-editorial items-center justify-between px-6 lg:px-12 text-xs font-semibold">
        <div className="flex items-center gap-2 text-text-secondary">
          <BookOpen size={14} className="text-accent" />
          <span className="hidden sm:inline font-heading uppercase text-text-muted">
            Reading Case Study:
          </span>
          <span className="text-text-primary font-bold">
            {number} — {title}
          </span>
        </div>

        <div className="flex items-center gap-4 text-text-muted">
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
