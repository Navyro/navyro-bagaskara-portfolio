import React from "react";
import Image from "next/image";

interface ProjectScreensProps {
  images: string[];
  frame: "phone" | "desktop";
  title: string;
}

/**
 * Gallery of the real product screens. Phone screens keep their own tall ratio and sit in a
 * column grid; desktop screens stay full-width. Either way the artwork is never cropped.
 */
export default function ProjectScreens({ images, frame, title }: ProjectScreensProps) {
  if (images.length === 0) return null;

  if (frame === "phone") {
    return (
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {images.map((src, idx) => (
          <li
            key={src}
            className="overflow-hidden rounded-card border border-border bg-surface p-2 sm:p-3"
          >
            <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[10px]">
              <Image
                src={src}
                alt={`${title} — layar ${idx + 1}`}
                fill
                sizes="(min-width: 640px) 280px, 45vw"
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
          <div className="relative aspect-[1440/1024] w-full overflow-hidden rounded-[10px]">
            <Image
              src={src}
              alt={`${title} — layar ${idx + 1}`}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-contain object-center"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
