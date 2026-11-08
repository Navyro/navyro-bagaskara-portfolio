import React from "react";

interface SkillGroupProps {
  title: string;
  skills: string[];
}

export default function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div
      data-skill-card
      className="flex h-full flex-col rounded-card border border-border bg-surface p-6 md:p-8"
    >
      <h3 className="font-heading text-h3 font-bold tracking-tight text-text-primary uppercase">
        {title}
      </h3>
      {/* flex-1 so the chips occupy the shared height; the footer then sits on a
          common baseline across the row instead of leaving a dead band. */}
      <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-btn border border-border bg-background px-3.5 py-1.5 text-meta font-semibold text-text-primary transition-colors hover:border-text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-meta font-semibold uppercase tracking-wider text-text-muted">
          Total
        </span>
        {/* Derived from the data, never typed by hand. */}
        <span data-skill-total={skills.length} className="text-meta font-bold text-text-primary">
          {skills.length}
        </span>
      </div>
    </div>
  );
}
