import React from "react";
import { ExperienceItem as ExperienceType } from "@/data/profile";

interface ExperienceItemProps {
  item: ExperienceType;
}

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <div className="relative border-l border-border pl-6 md:pl-8 py-4">
      <div className="absolute -left-[5px] top-6 h-2 w-2 rounded-full bg-accent" />
      <span className="text-meta font-bold tracking-widest text-text-muted uppercase">
        {item.year}
      </span>
      <h3 className="mt-1 font-heading text-h3 font-bold tracking-tight text-text-primary">
        {item.role}
      </h3>
      <p className="text-control font-semibold text-text-secondary">
        {item.company}
      </p>

      <p className="mt-3 text-body text-text-secondary leading-relaxed">
        {item.description}
      </p>

      {item.achievements && item.achievements.length > 0 && (
        <ul className="mt-4 space-y-2 text-control text-text-primary">
          {item.achievements.map((achieve, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-text-muted flex-shrink-0" />
              <span>{achieve}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
