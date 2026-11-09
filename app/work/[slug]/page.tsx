import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectCover from "@/components/ProjectCover";
import ProjectScreens from "@/components/ProjectScreens";
import CaseStudySection, { sectionHasContent } from "@/components/CaseStudySection";
import ScrollReveal from "@/components/ScrollReveal";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { projectsData } from "@/data/projects";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.slug === params.slug);
  const nextProject =
    projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject =
    projectsData[
      (currentIndex - 1 + projectsData.length) % projectsData.length
    ];

  const gallery = project.galleryImages && project.galleryImages.length > 1 && (
    <ProjectScreens
      images={project.galleryImages.slice(1)}
      frame={project.screenFrame}
      title={project.title}
    />
  );

  // Ordered source of truth for the case-study body. Numbering is assigned after filtering,
  // so the visible sequence is always 01..N with no gaps.
  const sections = [
    { title: "Project Overview", content: project.caseStudy.overview },
    { title: "Problem Statement", content: project.caseStudy.problem },
    {
      title: "User Research & Insights",
      content: project.caseStudy.research,
      bulletItems: project.caseStudy.keyInsights,
    },
    { title: "Define & Strategy", content: project.caseStudy.define },
    {
      title: "Information Architecture & Flow",
      content:
        [project.caseStudy.informationArchitecture, project.caseStudy.userFlow]
          .filter(Boolean)
          .join("\n\n") || undefined,
    },
    { title: "Wireframing & UI Design", content: project.caseStudy.uiDesign, children: gallery },
    { title: "Usability Testing & Iteration", content: project.caseStudy.testing },
    { title: "Final Result & Impact", content: project.caseStudy.finalResult },
    { title: "Personal Reflection & Learnings", content: project.caseStudy.reflection },
  ].filter(sectionHasContent);

  return (
    <article className="w-full py-12 lg:py-20">
      {/* Feature ③: Sticky Case Study Reading Progress Bar */}
      <ReadingProgressBar number={project.number} title={project.title} />

      <div className="mx-auto max-w-editorial px-6 lg:px-12 pt-8">
        {/* Back Link */}
        <Link
          href="/work"
          className="tap inline-flex items-center gap-2 text-meta font-semibold tracking-wider text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} /> KEMBALI KE DAFTAR PROYEK
        </Link>

        {/* Header Title */}
        <div className="max-w-4xl">
          <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
            {project.category} · CASE STUDY #{project.number}
          </span>
          <h1 className="mt-4 font-heading text-h2 font-extrabold tracking-tight text-text-primary sm:text-h1 lg:text-h1 leading-[1.15]">
            {project.title}
          </h1>
          <p className="mt-6 text-h3 text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="mt-12">
          <ProjectMeta
            role={project.role}
            year={project.year}
            duration={project.duration}
            team={project.team}
            tools={project.tools}
          />
        </div>

        {/* Main Cover Visual Container — the cover artwork is 4:5, so the frame follows it
            instead of a 16:9 box that would leave wide empty gutters on both sides. */}
        <div className="mt-12">
          <ProjectCover
            src={project.coverImage}
            alt={project.title}
            ratio="4/5"
            priority
            sizes="(min-width: 768px) 560px, 100vw"
            className="mx-auto max-w-[560px] shadow-sm"
          />
        </div>

        {/* Action CTAs if live/prototype links exist */}
        {(project.caseStudy.prototypeUrl || project.caseStudy.liveUrl) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.caseStudy.prototypeUrl && (
              <a
                href={project.caseStudy.prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-accent px-6 py-3 text-control font-semibold text-white transition-all hover:bg-accent-hover shadow-sm"
              >
                {project.caseStudy.prototypeLabel ?? "Buka Prototype di Figma"}{" "}
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.caseStudy.liveUrl && (
              <a
                href={project.caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-control font-semibold text-text-primary transition-all hover:border-text-primary"
              >
                Kunjungi Live Website <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        )}

        {/* Detailed Case Study Content Sections — the numbers come from this array, so a
            section without copy can never leave a gap (CL-9). */}
        <div className="mt-16 border-t border-border">
          {sections.map((section, index) => (
            <CaseStudySection
              key={section.title}
              number={String(index + 1).padStart(2, "0")}
              title={section.title}
              content={section.content}
              bulletItems={section.bulletItems}
            >
              {section.children}
            </CaseStudySection>
          ))}
        </div>

        {/* Feature ③: Interactive Next Project Transition Showcase Card */}
        <div className="mt-24 border-t border-border pt-16">
          <ScrollReveal>
            <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
              NEXT CASE STUDY TRANSITION
            </span>

            <Link
              href={`/work/${nextProject.slug}`}
              data-cursor="project"
              data-cursor-text="NEXT ↗"
              className="group mt-6 block rounded-card border border-border bg-surface p-8 lg:p-12 transition-all duration-300 hover:border-accent hover:shadow-xl"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-heading text-control font-extrabold tracking-widest text-text-muted">
                    {nextProject.number} — {nextProject.category}
                  </span>
                  <h3 className="font-heading text-h3 font-extrabold tracking-tight text-text-primary group-hover:text-accent transition-colors md:text-h2 lg:text-h2">
                    {nextProject.title}
                  </h3>
                  <p className="text-control text-text-secondary leading-relaxed max-w-xl">
                    {nextProject.shortDescription}
                  </p>
                  <div className="pt-2 inline-flex items-center gap-2 font-heading text-control font-bold text-accent">
                    <span>Lanjut ke Case Study Berikutnya</span>
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-2" />
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <ProjectCover src={nextProject.coverImage} alt={nextProject.title} ratio="4/5" />
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Quick Prev / Next Footer Links */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-meta font-semibold">
            <Link
              href={`/work/${prevProject.slug}`}
              className="tap inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={14} /> {prevProject.title}
            </Link>
            <Link
              href={`/work/${nextProject.slug}`}
              className="tap inline-flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
            >
              {nextProject.title} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
