import React from "react";

interface SkillGroupProps {
  title: string;
  skills: string[];
}

export default function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-6 md:p-8">
      <h3 className="font-heading text-h3 font-bold tracking-tight text-text-primary uppercase">
        {title}
      </h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-btn border border-border bg-background px-3.5 py-1.5 text-meta font-semibold text-text-primary transition-colors hover:border-text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
