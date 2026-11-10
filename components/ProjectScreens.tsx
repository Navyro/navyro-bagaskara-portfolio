import React from "react";
import Image from "next/image";

interface ProjectScreensProps {
  images: string[];
  frame: "phone" | "desktop";
  title: string;
  /** The project's own width/height, so the frame never squashes a differently-sized asset. */
  aspect: number;
}

/**
 * Gallery of the real product screens inside the case-study body.
 *
 * Column counts follow how much room a screenshot actually needs, not a fixed grid:
 * - Phones get ONE column on mobile. At two columns each screen rendered ~147px wide, which made the
 *   in-app text about 5px tall — unreadable. One column roughly doubles it.
 * - Two columns from `sm` up. Three columns was tried first, but the section body sits in a
 *   `lg:col-span-8` column (~780px), so three screens came out only ~218px wide — barely bigger than
 *   the two-column layout this replaces. Two columns use that 780px properly (~378px each).
 * - Desktop screens are wide and stay one per row; they never need a grid.
 *
 * `sizes` matches the real rendered width at each breakpoint. It used to claim a flat 280px while the
 * image rendered at ~328px on a 1280–1440px viewport, so the browser picked a too-small file and
 * upscaled it (soft edges). The values below track the grid arithmetic instead.
 */
export default function ProjectScreens({ images, frame, title, aspect }: ProjectScreensProps) {
  if (images.length === 0) return null;

  if (frame === "phone") {
    return (
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {images.map((src, idx) => (
          <li
            key={src}
            className="mx-auto w-full max-w-[320px] overflow-hidden rounded-card border border-border bg-surface p-2 sm:mx-0 sm:max-w-none sm:p-3"
          >
            <div
              className="relative w-full overflow-hidden rounded-[10px] bg-white"
              style={{ aspectRatio: aspect }}
            >
              <Image
                src={src}
                alt={`${title} — screen ${idx + 1}`}
                fill
                sizes="(min-width: 640px) 380px, 88vw"
                quality={90}
                className="object-contain object-top"
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-8 space-y-6">
      {images.map((src, idx) => (
        <li
          key={src}
          className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-sm sm:p-4"
        >
          <div
            className="relative w-full overflow-hidden rounded-[10px] bg-white"
            style={{ aspectRatio: aspect }}
          >
            <Image
              src={src}
              alt={`${title} — screen ${idx + 1}`}
              fill
              sizes="(min-width: 1280px) 1180px, 100vw"
              quality={90}
              className="object-contain object-center"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
