import React from "react";

interface CaseStudySectionProps {
  /** "01", "02", … — derived from position among the sections that actually render. */
  number?: string;
  title: string;
  content?: string;
  bulletItems?: string[];
  children?: React.ReactNode;
}

/**
 * Single source of truth for "does this section render?" — the page uses it to number only the
 * sections that will appear (CL-9: hardcoded "07." titles left gaps like 02 → 04 whenever a
 * project had no usability-testing copy).
 */
export function sectionHasContent({
  content,
  bulletItems,
  children,
}: Pick<CaseStudySectionProps, "content" | "bulletItems" | "children">) {
  return Boolean(content) || Boolean(bulletItems && bulletItems.length > 0) || Boolean(children);
}

export default function CaseStudySection({
  number,
  title,
  content,
  bulletItems,
  children,
}: CaseStudySectionProps) {
  if (!sectionHasContent({ content, bulletItems, children })) {
    return null;
  }

  return (
    <section
      data-case-section
      data-section-number={number}
      className="py-10 border-b border-border last:border-b-0"
    >
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-12">
        {/* Left Column Section Title */}
        <div className="lg:col-span-4">
          <h2 className="font-heading text-h3 font-bold tracking-tight text-text-primary sticky top-[calc(var(--header-h)+var(--sticky-gap)+13px)]">
            {number ? `${number}. ${title}` : title}
          </h2>
        </div>

        {/* Right Column Detailed Content */}
        <div className="lg:col-span-8 space-y-6">
          {content && (
            <p className="text-body text-text-secondary md:text-h3 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          )}

          {bulletItems && bulletItems.length > 0 && (
            <ul className="space-y-3 pt-2">
              {bulletItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-body text-text-primary"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
