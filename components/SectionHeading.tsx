import React from "react";

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
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
        <h2 data-section-heading className="font-heading text-h2 font-extrabold tracking-tight text-balance text-text-primary lg:text-h1 leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
