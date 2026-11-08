"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import { projectsData, Project } from "@/data/projects";

type CategoryFilter = "All" | Project["category"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  // Filters come from the data itself: a filter that can only ever return an empty list
  // is not a filter, it is a dead end.
  const categories: CategoryFilter[] = [
    "All",
    ...Array.from(new Set(projectsData.map((p) => p.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        {/* Page Header */}
        <ScrollReveal>
          <SectionHeading
            number="WORK"
            title="Seluruh Proyek & Case Studies"
            subtitle="Eksplorasi dokumentasi proses perancangan produk dari tahap riset pengguna, wireframing, hingga pengembangan antarmuka terstruktur."
          />
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-border pb-6">
            <span className="mr-2 text-xs font-bold tracking-wider text-text-muted uppercase">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-cursor="cta"
                aria-pressed={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`inline-flex min-h-11 items-center rounded-btn px-4 text-xs font-semibold tracking-wide transition-all ${
                  activeFilter === cat
                    ? "bg-text-primary text-background shadow-sm"
                    : "border border-border bg-surface text-text-secondary hover:border-text-primary hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project List */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="my-16 rounded-card border border-border bg-surface p-12 text-center">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              Tidak ada proyek dalam kategori ini
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Silakan pilih kategori filter lain di atas untuk melihat karya.
            </p>
            <button
              type="button"
              data-cursor="cta"
              onClick={() => setActiveFilter("All")}
              className="mt-6 rounded-btn bg-text-primary px-6 py-2.5 text-xs font-semibold text-background hover:bg-black"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
