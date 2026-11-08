import React from "react";

interface ProjectMetaProps {
  role: string;
  year?: string;
  duration?: string;
  team?: string;
  tools: string[];
}

export default function ProjectMeta({
  role,
  year,
  duration,
  team,
  tools,
}: ProjectMetaProps) {
  const yearLabel = year ? (duration ? `${year} (${duration})` : year) : undefined;

  return (
    <div className="grid grid-cols-2 gap-6 rounded-card border border-border bg-surface p-6 sm:grid-cols-4 md:p-8">
      <div>
        <span className="block text-meta font-semibold uppercase tracking-wider text-text-muted">
          Role
        </span>
        <span className="mt-1 block text-control font-semibold text-text-primary">
          {role}
        </span>
      </div>

      <div>
        <span className="block text-meta font-semibold uppercase tracking-wider text-text-muted">
          {duration ? "Year & Duration" : "Year"}
        </span>
        <span className="mt-1 block text-control font-semibold text-text-primary">
          {yearLabel ?? "—"}
        </span>
      </div>

      {team && (
        <div>
          <span className="block text-meta font-semibold uppercase tracking-wider text-text-muted">
            Team
          </span>
          <span className="mt-1 block text-control font-semibold text-text-primary">
            {team}
          </span>
        </div>
      )}

      <div>
        <span className="block text-meta font-semibold uppercase tracking-wider text-text-muted">
          Tools
        </span>
        <div className="mt-1 flex flex-wrap gap-1">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-meta font-medium text-text-secondary bg-background px-2 py-0.5 rounded border border-border"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
