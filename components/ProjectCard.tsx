"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectCover from "./ProjectCover";
import ScrollReveal from "./ScrollReveal";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Mouse position values relative to image container (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  // Glare overlay position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 25,
  });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <ScrollReveal className="h-full">
      <article className="group flex h-full flex-col gap-6 border-b border-border pb-14 pt-10 scroll-mt-24 transition-colors md:border-b-0 md:pb-0 md:pt-0">
        {/* On multi-column rows the header block is tall enough that every cover starts on the
            same line, so a row reads as one band instead of three staggered images. */}
        <div className="flex flex-col gap-6 lg:min-h-[17rem]">
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
          <h3 className="font-heading text-h3 font-extrabold tracking-tight text-balance text-text-primary group-hover:text-accent transition-colors md:text-h2 leading-tight">
            <Link
              href={`/work/${project.slug}`}
              data-cursor="project"
              data-cursor-text="VIEW ↗"
            >
              {project.title}
            </Link>
          </h3>

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

        {/* Interactive Mouse-Follow 3D Tilt Project Visual Container */}
        <motion.div
          style={{
            perspective: 1000,
          }}
          className="w-full"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            transition={{ duration: 0.15 }}
          >
            <Link
              ref={cardRef}
              href={`/work/${project.slug}`}
              data-cursor="project"
              data-cursor-text="VIEW ↗"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative block w-full rounded-card shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-card">
                <ProjectCover src={project.coverImage} alt={project.title} ratio="4/5" />

                {/* Dynamic Mouse Glare Lighting Effect */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`,
                  }}
                />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Description & Link */}
        <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-2 md:flex-row md:items-center">
          <p className="max-w-2xl text-body text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>

          <Link
            href={`/work/${project.slug}`}
            data-cursor="cta"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-heading text-control font-bold text-text-primary transition-colors hover:text-accent group-hover:translate-x-1"
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
