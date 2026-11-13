import React from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import { projectsData } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/work" } };

/**
 * Project index — server rendered.
 *
 * CL-10: this page used to carry a category filter that cost a decision and returned a single
 * item (5 of the 6 projects are one platform, 1 is the other), kept its state in `useState` so
 * the view was not shareable, and never said how many results it had. The filter is gone; what
 * remains is the fact it was standing in for — how many projects there are, split by platform,
 * derived from the data rather than typed.
 */
export default function WorkPage() {
  const platformCounts = projectsData.reduce<Record<string, number>>((acc, project) => {
    acc[project.category] = (acc[project.category] ?? 0) + 1;
    return acc;
  }, {});

  const breakdown = Object.entries(platformCounts)
    .map(([category, count]) => `${count} ${category.toLowerCase()}`)
    .join(" · ");

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
        {/* Page Header */}
        <ScrollReveal>
          <SectionHeading
            number="WORK"
            title="All Projects & Case Studies"
            subtitle="A documented look at how each product was designed, from user research and wireframing through to a structured interface build."
            as="h1"
          />
        </ScrollReveal>

        {/* Count line: the honest version of what the old filter implied */}
        <ScrollReveal delay={0.1}>
          <p
            data-work-count
            data-work-count-value={projectsData.length}
            className="mb-10 border-b border-border pb-6 text-meta font-semibold uppercase tracking-wider text-text-muted"
          >
            {projectsData.length} projects · {breakdown}
          </p>
        </ScrollReveal>

        {/* Project List */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} titleAs="h2" />
          ))}
        </div>
      </div>
    </div>
  );
}
