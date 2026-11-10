import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import SkillGroup from "@/components/SkillGroup";
import ExperienceItem from "@/components/ExperienceItem";
import ScrollReveal from "@/components/ScrollReveal";
import { projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  const approachSteps = [
    {
      number: "01",
      title: "Understand",
      description:
        "Understand user needs and business goals through qualitative research, interviews, and analysis of real pain points.",
    },
    {
      number: "02",
      title: "Simplify",
      description:
        "Simplify information architecture and cut bloated transaction steps into an intuitive flow.",
    },
    {
      number: "03",
      title: "Validate",
      description:
        "Test prototypes directly with users to confirm visual clarity and interface accessibility.",
    },
    {
      number: "04",
      title: "Build",
      description:
        "Convert Figma designs into precise, high-performance React, Next.js, and Tailwind CSS components.",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* 01 — SELECTED WORK */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                number="01 —"
                title="SELECTED WORK"
                subtitle="Selected case studies showing how a designer thinks and how the solution works."
              />
              <Link
                href="/work"
                className="tap mb-12 inline-flex items-center gap-1.5 font-heading text-control font-bold text-accent hover:underline md:mb-16"
              >
                View All Projects ({projectsData.length}) <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                headerHeight="lg:min-h-[26rem] xl:min-h-[19.5rem]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 02 — APPROACH */}
      <section className="w-full border-t border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
          <ScrollReveal>
            <SectionHeading
              number="02 —"
              title="APPROACH"
              subtitle="The working method behind turning complex problems into structured digital solutions."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, idx) => (
              <ScrollReveal key={step.number} delay={idx * 0.1} className="h-full">
                <div className="group flex h-full flex-col justify-between rounded-card border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-text-primary hover:shadow-sm">
                  <div>
                    <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
                      {step.number} —
                    </span>
                    <h3 className="mt-3 font-heading text-h3 font-bold text-text-primary transition-colors group-hover:text-accent">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-control text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — EXPERTISE */}
      <section className="w-full border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
          <ScrollReveal>
            <SectionHeading
              number="03 —"
              title="EXPERTISE"
              subtitle="The skills I use to build digital products, from user research through to a working implementation."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.1} className="h-full">
              <SkillGroup
                title="UI/UX Design"
                skills={profileData.skills.uiux}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="h-full">
              <SkillGroup
                title="Front-End Fundamentals"
                skills={profileData.skills.frontend}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="h-full">
              <SkillGroup
                title="Tools &amp; Workflow"
                skills={profileData.skills.tools}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 04 — EXPERIENCE */}
      <section className="w-full border-t border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-8">
              <SectionHeading
                number="04 —"
                title="EXPERIENCE"
                subtitle="Professional career path in product design and interface development."
              />
              <Link
                href="/about"
                className="tap mb-12 inline-flex items-center gap-1.5 font-heading text-control font-bold text-text-primary hover:text-accent md:mb-16"
              >
                View Career Details <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-6 max-w-4xl">
            {profileData.experience.slice(0, 2).map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <ExperienceItem item={exp} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — ABOUT */}
      <section className="w-full border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="font-heading text-meta font-bold tracking-widest text-text-muted">
                  05 —
                </span>
                <h2 className="mt-2 font-heading text-h2 font-bold tracking-tight text-text-primary">
                  ABOUT
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0.1}>
                <p className="text-h3 font-heading font-semibold text-text-primary leading-relaxed">
                  I'm Navyro, a UI/UX Designer with a focus on front-end development. I enjoy turning complex problems into digital experiences that are clear, usable, and well structured.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-body text-text-secondary leading-relaxed">
                  {profileData.fullBio}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="tap-block inline-flex items-center gap-2 font-heading text-control font-bold text-text-primary hover:text-accent"
                  >
                    More About Me <ArrowUpRight size={18} />
                  </Link>
                  <Link
                    href="/resume"
                    className="tap-block inline-flex items-center gap-2 font-heading text-control font-bold text-text-secondary hover:text-text-primary"
                  >
                    Download CV ↗
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CONTACT / LET'S TALK */}
      <section className="w-full border-t border-border py-24 lg:py-32 bg-surface">
        <div className="mx-auto max-w-editorial px-[24px] text-center lg:px-[48px]">
          <ScrollReveal>
            <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
              06 — LET'S TALK
            </span>
            <h2 className="mt-4 font-heading text-h2 font-extrabold tracking-tight text-text-primary sm:text-h1 lg:text-h1">
              Got a project or an opportunity in mind?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-h3 text-text-secondary">
              I'm open to conversations about work, collaboration, and relevant projects.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-btn bg-text-primary px-8 py-4 text-control font-semibold text-background transition-all hover:bg-accent hover:text-white"
              >
                Get in touch <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-btn border border-border bg-background px-8 py-4 text-control font-semibold text-text-primary transition-all hover:border-text-primary"
              >
                Resume ↗
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
