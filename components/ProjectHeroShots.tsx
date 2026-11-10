import React from "react";
import Image from "next/image";

interface ProjectHeroShotsProps {
  /** Real screenshots to lay out. The first one is the primary (largest) shot. */
  images: string[];
  frame: "phone" | "desktop";
  title: string;
  /**
   * The project's own width/height. The screen box follows it exactly, so a project whose assets are
   * not 390x844 (e.g. the 412x917 billing app) is never squashed into the wrong frame.
   */
  aspect: number;
}

/**
 * Hero preview for the case-study pages, built from the real screenshots instead of the composite
 * `cover.jpg`.
 *
 * Why not the cover: every cover is a generated 4:5 canvas (1600x2000) that centres three screens
 * with roughly a quarter of the canvas left empty above and below, and its background is a light
 * gradient baked into the JPEG — so it cannot follow the theme. Laying out the real screens here
 * removes that empty space and lets the mat use `--background`, which flips with light/dark mode.
 * The cover files themselves are untouched; they are still used by the /work cards and by the
 * "Next Case Study" card.
 *
 * Layout rules:
 * - Phone projects get ONE stage holding all three screens at EQUAL size, spread across the full
 *   stage width. An earlier version made the first screen dominant with two smaller flanks; that
 *   read as "one big screen in the middle" and under-sold the other two. Equal thirds use the same
 *   height but give every screen the same weight.
 * - All three stay visible on mobile as well, stacked in one column. They must never be hidden: the
 *   supporting screens are part of what the project shows.
 * - Desktop projects show a wide primary screen with two supporting screens beneath, which is the
 *   shape those 1440x1024 assets actually want.
 *
 * Each screen keeps its own aspect ratio, so nothing is stretched or cropped, and every frame is
 * drawn behind the image rather than as padding so the ratio is never altered.
 */
export default function ProjectHeroShots({ images, frame, title, aspect }: ProjectHeroShotsProps) {
  if (images.length === 0) return null;

  if (frame === "desktop") {
    const [main, ...rest] = images;
    return (
      <div className="mt-8 space-y-4 sm:space-y-6">
        <ScreenFrame
          src={main}
          alt={`${title} — main screen`}
          sizes="(min-width: 1280px) 1180px, 100vw"
          aspect={aspect}
          priority
        />
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {rest.slice(0, 2).map((src) => (
              <ScreenFrame
                key={src}
                src={src}
                alt={`${title} — supporting screen`}
                sizes="(min-width: 640px) 580px, 100vw"
                aspect={aspect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const shown = images.slice(0, 3);

  return (
    <div className="mt-8">
      {/* One stage, not three separate cards: the screens share a single themed mat, so we do not
          stack three borders and three sets of padding. All three screens are equal and together
          they fill the stage edge to edge. */}
      <div className="relative overflow-hidden rounded-card border border-border bg-background p-4 sm:p-6">
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-3 sm:justify-items-stretch sm:gap-4 lg:gap-6">
          {shown.map((src, idx) => (
            <ScreenFrame
              key={src}
              src={src}
              alt={`${title} — screen ${idx + 1}`}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 30vw, 88vw"
              aspect={aspect}
              priority={idx === 0}
              bare
              className="w-full max-w-[320px] sm:max-w-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One screenshot on a device frame. The bezel is a ring drawn behind the image, not padding around
 * it, so the frame never changes the screenshot's own ratio.
 *
 * `bare` drops the extra mat + border, used when several screens share one outer stage so borders
 * are not doubled up.
 */
function ScreenFrame({
  src,
  alt,
  sizes,
  aspect,
  priority = false,
  bare = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  aspect: number;
  priority?: boolean;
  bare?: boolean;
  className?: string;
}) {
  const shell = bare
    ? "relative w-full"
    : "relative w-full overflow-hidden rounded-card border border-border bg-background p-2.5 shadow-sm sm:p-3";

  return (
    <div className={`${shell} ${className}`}>
      <div
        className="relative overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.45)] dark:ring-white/15"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}
