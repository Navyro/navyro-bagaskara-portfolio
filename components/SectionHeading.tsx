import React from "react";

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /**
   * Heading level for the title. Defaults to `h2`, which is what every existing call site wants.
   * Pass `"h1"` only on a page whose main title this is, so the document has exactly one `h1`.
   */
  as?: "h1" | "h2";
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 scroll-mt-24 md:mb-16 ${ align === "center" ? "text-center mx-auto max-w-2xl" : "" }`}
    >
      <div className="flex flex-wrap items-baseline gap-3">
        {number && (
          <span className="font-heading text-meta font-extrabold uppercase text-accent">
            {number}
          </span>
        )}
        <Heading data-section-heading className="min-w-0 break-words font-heading text-h2 font-extrabold tracking-tight text-balance text-text-primary lg:text-h1 leading-tight">
          {title}
        </Heading>
      </div>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
