import React from "react";

interface ProjectMetaProps {
  role: string;
  year: string;
  duration: string;
  team: string;
  tools: string[];
}

export default function ProjectMeta({
  role,
  year,
  duration,
  team,
  tools,
}: ProjectMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-card border border-border bg-surface p-6 sm:grid-cols-4 md:p-8">
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Role
        </span>
        <span className="mt-1 block text-sm font-semibold text-text-primary">
          {role}
        </span>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Year &amp; Duration
        </span>
        <span className="mt-1 block text-sm font-semibold text-text-primary">
          {year} ({duration})
        </span>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Team
        </span>
        <span className="mt-1 block text-sm font-semibold text-text-primary">
          {team}
        </span>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Tools
        </span>
        <div className="mt-1 flex flex-wrap gap-1">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-medium text-text-secondary bg-background px-2 py-0.5 rounded border border-border"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
