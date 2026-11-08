import React from "react";
import Image from "next/image";

interface ProjectCoverProps {
  src: string;
  alt: string;
  /** Frame aspect. Square artwork must never be shown in a wide frame. */
  ratio?: "4/5" | "16/9";
  priority?: boolean;
  className?: string;
  /** Responsive hint for the browser; must match the frame's real rendered width. */
  sizes?: string;
}

const RATIO_CLASS: Record<NonNullable<ProjectCoverProps["ratio"]>, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
};

/**
 * Single place that decides how project artwork is framed.
 *
 * The project covers are 1024x1024 square compositions whose titles sit near the bottom edge, so a
 * 16/9 frame with `object-cover` would crop ~44% of the design away. The frame therefore follows the
 * artwork (`object-contain` on a surface mat) instead of the other way round.
 */
export default function ProjectCover({
  src,
  alt,
  ratio = "4/5",
  priority = false,
  className = "",
  sizes = "(min-width: 768px) 45vw, 100vw",
}: ProjectCoverProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-card border border-border bg-surface p-4 ${RATIO_CLASS[ratio]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain object-center"
      />
    </div>
  );
}
