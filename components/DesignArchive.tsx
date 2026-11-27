"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { designCategoryCopy, designsData, type DesignCategory, type DesignPiece } from "@/data/designs";

/**
 * The archive itself: three groups, one masonry column per breakpoint, one lightbox.
 *
 * Layout decisions worth keeping:
 *
 * - **A uniform grid with a mat, not a masonry column.** The pieces are 4:5, 1:1 and one 3:1
 *   banner. Masonry was tried first and read as untidy: every caption in a row started at a
 *   different height because each column stacked independently. A fixed 4:5 tile with
 *   `object-contain` keeps the whole artwork visible (no crop) and lines the rows, the captions
 *   and the group labels up. The one wide banner spans two columns at its own ratio instead of
 *   shrinking into a thin strip.
 * - **Groups instead of filter buttons.** /work dropped its filter because it returned one
 *   result and hid the count; here the same mistake would be subtler but still a mistake:
 *   three groups are scannable at a glance, and a filter would hide two thirds of the work
 *   behind a click. Every group states how many pieces it holds.
 * - **Captions are visible, never hover-only.** Half the visitors arrive on a phone, where
 *   there is no hover to reveal the client and the role. The tile carries client and year; the
 *   role and the caption live in the lightbox, where there is room to read them.
 */

const GROUPS: DesignCategory[] = ["poster", "social", "print"];

/** Display order, used for the lightbox's previous/next so it matches what the page shows. */
const ordered: DesignPiece[] = GROUPS.flatMap((group) => designsData.filter((p) => p.category === group));

const IMAGE_SIZES = "(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw";

function meta(piece: DesignPiece) {
  return [piece.client, piece.year, piece.role].filter(Boolean).join(" · ");
}

/** Tiles carry two facts only; a third would wrap to two lines on a phone and break row rhythm. */
function tileMeta(piece: DesignPiece) {
  return [piece.client, piece.year].filter(Boolean).join(" · ");
}

export default function DesignArchive() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    // Return focus to the tile that opened the lightbox, so keyboard users are not dropped
    // back at the top of the document.
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + ordered.length) % ordered.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : ordered[openIndex];

  return (
    <>
      <div className="space-y-16 md:space-y-20">
        {GROUPS.map((group) => {
          const pieces = ordered.filter((piece) => piece.category === group);
          const copy = designCategoryCopy[group];
          if (pieces.length === 0) return null;

          return (
            <section key={group} aria-labelledby={`design-${group}`} className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[220px_1fr] lg:gap-12 lg:pt-12 first:border-t-0 first:pt-0">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
                <div className="flex items-baseline gap-3">
                  <h2
                    id={`design-${group}`}
                    className="font-heading text-h3 font-extrabold tracking-tight text-text-primary"
                  >
                    {copy.label}
                  </h2>
                  <span className="text-meta font-semibold uppercase tracking-wider text-accent">
                    {pieces.length}
                  </span>
                </div>
                <p className="mt-1 text-meta uppercase tracking-wider text-text-muted">{copy.count}</p>
                <p className="mt-3 max-w-[220px] text-control leading-relaxed text-text-secondary">{copy.blurb}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {pieces.map((piece) => {
                  const index = ordered.indexOf(piece);
                  // A piece at or above 2:1 spans two columns at its own ratio, so a wide banner
                  // never sits letterboxed inside a portrait tile.
                  const wide = piece.width / piece.height >= 2;
                  return (
                    <button
                      key={piece.slug}
                      type="button"
                      onClick={(event) => {
                        lastTrigger.current = event.currentTarget;
                        setOpenIndex(index);
                      }}
                      className={`group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${wide ? "sm:col-span-2 xl:col-span-3" : ""}`}
                      aria-label={`Open “${piece.title}” larger`}
                    >
                      <div
                        className="relative overflow-hidden rounded-card border border-border bg-surface"
                        style={{ aspectRatio: wide ? `${piece.width} / ${piece.height}` : "4 / 5" }}
                      >
                        <Image
                          src={piece.src}
                          alt={piece.alt}
                          fill
                          sizes={wide ? "(min-width: 1280px) 60vw, 92vw" : IMAGE_SIZES}
                          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-surface text-text-primary opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          <Maximize2 size={14} />
                        </span>
                      </div>
                      <div className="mt-3 min-h-[3.25rem]">
                        <p className="text-control font-semibold leading-snug text-text-primary">{piece.title}</p>
                        <p className="mt-1 text-meta leading-relaxed text-text-secondary">{tileMeta(piece)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — enlarged view`}
          className="fixed inset-0 z-[120] flex flex-col bg-background-95 backdrop-blur-sm"
          onClick={(event) => {
            // Clicks on the backdrop close; clicks inside the figure do not.
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-meta font-semibold uppercase tracking-wider text-text-secondary">
              {openIndex + 1} / {ordered.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close enlarged view"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 sm:gap-6 sm:px-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid"
              aria-label="Previous piece"
            >
              <ArrowLeft size={18} />
            </button>

            <figure className="flex min-h-0 min-w-0 flex-col items-center">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="(min-width: 1024px) 70vw, 92vw"
                className="h-auto max-h-[58vh] w-auto max-w-full rounded-md object-contain shadow-lg"
                priority
              />
              {/* One panel, and the only place the caption exists: a copy above it as well was
                  duplicated text, and text sitting straight on the blurred page was the original
                  unreadable-caption bug. */}
              <figcaption className="mt-4 w-full max-w-3xl rounded-card border border-border bg-surface px-4 py-4 text-center shadow-xl ring-1 ring-black/5 sm:px-6 dark:ring-white/10">
                <p className="text-control font-semibold text-text-primary">{active.title}</p>
                <p className="mt-1 text-meta leading-relaxed text-text-secondary">{meta(active)}</p>
                <p className="mt-3 text-control leading-relaxed text-text-secondary">{active.caption}</p>
                <p className="mt-2 text-meta uppercase tracking-wider text-text-secondary">Tools: {active.tools}</p>
                <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="tap rounded-btn border border-border px-4 py-2 text-meta text-text-primary"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="tap rounded-btn border border-border px-4 py-2 text-meta text-text-primary"
                  >
                    Next
                  </button>
                </div>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:grid"
              aria-label="Next piece"
            >
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
