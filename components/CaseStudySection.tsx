import React from "react";

interface CaseStudySectionProps {
  title: string;
  content?: string;
  bulletItems?: string[];
  children?: React.ReactNode;
}

export default function CaseStudySection({
  title,
  content,
  bulletItems,
  children,
}: CaseStudySectionProps) {
  if (!content && (!bulletItems || bulletItems.length === 0) && !children) {
    return null;
  }

  return (
    <section className="py-10 border-b border-border last:border-b-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column Section Title */}
        <div className="lg:col-span-4">
          <h3 className="font-heading text-xl font-bold tracking-tight text-text-primary lg:text-2xl sticky top-[calc(var(--header-h)+var(--sticky-gap)+13px)]">
            {title}
          </h3>
        </div>

        {/* Right Column Detailed Content */}
        <div className="lg:col-span-8 space-y-6">
          {content && (
            <p className="text-base text-text-secondary md:text-lg leading-relaxed whitespace-pre-line">
              {content}
            </p>
          )}

          {bulletItems && bulletItems.length > 0 && (
            <ul className="space-y-3 pt-2">
              {bulletItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base text-text-primary"
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
