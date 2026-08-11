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
      className={`mb-12 scroll-mt-24 md:mb-16 ${
        align === "center" ? "text-center mx-auto max-w-2xl" : ""
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-3">
        {number && (
          <span className="font-heading text-sm font-extrabold tracking-widest text-accent uppercase md:text-base">
            {number}
          </span>
        )}
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-base text-text-secondary md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
