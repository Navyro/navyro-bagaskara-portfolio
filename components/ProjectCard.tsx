"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectCover from "./ProjectCover";
import ProjectDeviceShot from "./ProjectDeviceShot";
import ProjectCardSlides from "./ProjectCardSlides";
import ScrollReveal from "./ScrollReveal";

interface ProjectCardProps {
  project: Project;
  /**
   * Classes for the height reserved above the cover.
   *
   * The homepage runs three columns, where titles wrap to different line counts (the
   * SIPENELITIAN title needs up to six lines at 1024px), so its covers need a taller
   * reservation to stay on one line. /work runs two columns with much shorter titles and
   * keeps the original value untouched.
   */
  headerHeight?: string;
  /**
   * Heading tag for the project title.
   *
   * /work has only an `h1` above the grid, so its cards act as the page's second level and
   * must be `h2`; skipping to `h3` there fails a heading-order check. The homepage already
   * has an `h2` section title, so its cards stay `h3`. The rendered size is set by the class,
   * not the tag, so this cannot change the layout.
   */
  titleAs?: "h2" | "h3";
}

/**
 * Work card. Hover is deliberately quiet.
 *
 * The mat used to flip its border to `--text-primary`, which read as a bright white outline in dark
 * mode. It now only warms its background from `--surface` to `--background` (two tokens the site
 * already uses for exactly this “raised vs page” contrast), so the card stays legible without
 * shouting. The normal drop shadow is kept and is NOT strengthened on hover, and nothing about the
 * card's position or size changes.
 *
 * The 3D tilt and the mouse-following glare are gone on purpose; a plain colour transition reads
 * calmer and keeps attention on the artwork.
 */
export default function ProjectCard({
  project,
  headerHeight = "lg:min-h-[17rem]",
  titleAs: TitleTag = "h3",
}: ProjectCardProps) {
  const hasSlides = Boolean(project.cardSlides && project.cardSlides.length > 1);

  return (
    <ScrollReveal className="h-full">
      <article className="group flex h-full flex-col gap-6 border-b border-border pb-14 pt-10 scroll-mt-24 transition-colors md:border-b-0 md:pb-0 md:pt-0">
        {/* On multi-column rows the header block is tall enough that every cover starts on the
            same line, so a row reads as one band instead of three staggered images. The height
            comes from the caller because it depends on the column count. */}
        <div className={`flex flex-col gap-6 ${headerHeight}`}>
          {/* Editorial Index Number & Tags Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-heading text-h3 font-extrabold tracking-widest text-accent">
            {project.number} —
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 text-meta font-semibold text-text-secondary shadow-2xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project Title & Metadata Sub-header */}
        <div className="space-y-2">
          <TitleTag className="break-words font-heading text-h3 font-extrabold tracking-tight text-balance text-text-primary group-hover:text-accent transition-colors md:text-h2 leading-tight">
            <Link
              href={`/work/${project.slug}`}
            >
              {project.title}
            </Link>
          </TitleTag>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta font-semibold tracking-wider text-text-muted uppercase pt-1">
            <span>{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true">•</span>
                <span>{project.year}</span>
              </>
            )}
            <span aria-hidden="true">•</span>
            <span>Role: {project.role}</span>
          </div>
        </div>
        </div>

        {/* Project visual — plain link. Hover only warms the mat background (see the wrapper below):
            no tilt, no glare, no border flip, and the box never moves or resizes. */}
        <div className="w-full">
          <Link
            href={`/work/${project.slug}`}
            className="relative block w-full rounded-card shadow-sm"
          >
            {/* `group-hover:[&>div]:bg-*` reaches the mat's own `bg-surface` without editing
                ProjectCover/ProjectDeviceShot, which are shared with the case-study pages. */}
            <div className="relative rounded-card [&>div]:transition-colors [&>div]:duration-200 group-hover:[&>div]:bg-background">
              {project.cardShot && project.cardShotAspect ? (
                hasSlides ? (
                  <ProjectCardSlides
                    slides={project.cardSlides!}
                    alt={`${project.title} — interface preview`}
                  >
                    {({ layers }) => (
                      <ProjectDeviceShot
                        src={project.cardShot!}
                        alt={`${project.title} — interface preview`}
                        device={project.screenFrame === "desktop" ? "laptop" : "phone"}
                        aspect={project.cardShotAspect!}
                        screenLayers={layers}
                      />
                    )}
                  </ProjectCardSlides>
                ) : (
                  <ProjectDeviceShot
                    src={project.cardShot}
                    alt={`${project.title} — interface preview`}
                    device={project.screenFrame === "desktop" ? "laptop" : "phone"}
                    aspect={project.cardShotAspect}
                  />
                )
              ) : (
                <ProjectCover src={project.coverImage} alt={project.title} ratio="4/5" />
              )}
            </div>
          </Link>
        </div>

        {/* Description & Link */}
        <div className="mt-auto flex flex-col flex-wrap items-start justify-between gap-4 pt-2 md:flex-row md:items-center">
          <p className="max-w-2xl text-body text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>

          <Link
            href={`/work/${project.slug}`}
            className="tap inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-heading text-control font-bold text-text-primary transition-colors hover:text-accent group-hover:translate-x-1"
          >
            <span>View Case Study</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}
