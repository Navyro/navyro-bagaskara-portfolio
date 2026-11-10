import React from "react";
import Image from "next/image";

type Device = "laptop" | "phone";

interface ProjectDeviceShotProps {
  src: string;
  alt: string;
  device: Device;
  /** The screenshot's own width / height. The screen box follows it exactly, so nothing is cropped. */
  aspect: number;
  sizes?: string;
  /**
   * Optional replacement for the single static screen. When provided it is rendered inside the
   * device screen box instead of one `next/image` (used by the card slideshows). Works for both the
   * phone and the laptop frame. The frame, bezel and box stay identical, so nothing about the card
   * geometry changes.
   */
  screenLayers?: React.ReactNode;
  /** Extra classes for the outer mat — used for the card's subtle hover tint. */
  className?: string;
}

/**
 * A project screenshot presented inside a device frame, used only on the /work cards.
 *
 * The mat is the same box the covers already used (`aspect-[4/5]`, `rounded-card`, `border-border`,
 * `bg-surface`, `p-4`), so card geometry, row alignment and the grid do not move.
 *
 * Two rules keep the presentation honest:
 *
 * 1. **The screen box is exactly the screenshot's aspect.** The bezel is drawn *behind* the box with
 *    a negative inset, not as padding around it. Padding (or a border) shrinks both dimensions by
 *    the same amount, which changes the box ratio and makes `object-contain` letterbox a few pixels
 *    of white at the edges — that was the pale strip visible at the top and bottom of the phones.
 * 2. **No drawn dynamic island.** Every phone screenshot already carries its own status area with a
 *    notch, so an overlay pill showed the island twice. The frame is only a frame.
 *
 * The bezel is a fixed near-black in both themes (the screenshots are light); a token-coloured
 * bezel turns white in dark mode and swallows the screen, so a ring keeps it readable instead.
 *
 * Sizing rule for balance across six different aspect ratios: a device takes 88% of the mat along
 * its dominant axis — phones are limited by height, the laptop by width. Equal *sizes* are never
 * forced, only equal breathing room.
 */
export default function ProjectDeviceShot({
  src,
  alt,
  device,
  aspect,
  sizes = "(min-width: 768px) 46vw, 92vw",
  screenLayers,
  className = "",
}: ProjectDeviceShotProps) {
  const screen = (
    <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
      {screenLayers ?? (
        <Image src={src} alt={alt} fill sizes={sizes} quality={88} className="object-contain" />
      )}
    </div>
  );

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-card border border-border bg-surface p-4 ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        {device === "phone" ? (
          <div className="relative" style={{ height: "88%", aspectRatio: aspect }}>
            {/* bezel sits outside the screen box so the screen keeps the asset's exact ratio */}
            <div className="absolute -inset-[6px] rounded-[2.1rem] bg-[#151517] shadow-[0_12px_32px_-14px_rgba(0,0,0,0.55)] ring-1 ring-black/25 dark:bg-[#2b2b31] dark:ring-white/20" />
            <div className="relative h-full w-full">{screen}</div>
            {/* side buttons, desktop only: at phone width they read as noise */}
            <div className="absolute -right-[7px] top-[26%] hidden h-[10%] w-[2px] rounded-r-sm bg-[#151517] dark:bg-[#3a3a41] sm:block" />
            <div className="absolute -left-[7px] top-[20%] hidden h-[7%] w-[2px] rounded-l-sm bg-[#151517] dark:bg-[#3a3a41] sm:block" />
          </div>
        ) : (
          <div className="flex w-[88%] flex-col items-center">
            {/* lid — exact asset ratio, bezel drawn behind it */}
            <div
              className="relative w-full shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)]"
              style={{ aspectRatio: aspect }}
            >
              <div className="absolute -inset-[6px] rounded-[10px] bg-[#151517] ring-1 ring-black/25 dark:bg-[#2b2b31] dark:ring-white/20" />
              <div className="relative h-full w-full overflow-hidden rounded-[5px] bg-white">
                {screenLayers ?? (
                  <Image src={src} alt={alt} fill sizes={sizes} quality={88} className="object-contain" />
                )}
              </div>
            </div>
            {/* base — a laptop foot, not a plinth: 106% of the lid, never clipped by the flex row */}
            <div className="relative mt-[6px] h-[10px] w-[106%] shrink-0 rounded-b-[7px] bg-gradient-to-b from-[#33333a] to-[#1d1d20] ring-1 ring-black/25 dark:ring-white/15">
              <div className="absolute left-1/2 top-0 h-[3px] w-[16%] -translate-x-1/2 rounded-b-[3px] bg-black/40" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
