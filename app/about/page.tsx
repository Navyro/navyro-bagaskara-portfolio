import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SkillGroup from "@/components/SkillGroup";
import ExperienceItem from "@/components/ExperienceItem";
import ScrollReveal from "@/components/ScrollReveal";
import { profileData } from "@/data/profile";

export default function AboutPage() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-4xl">
            <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
              ABOUT
            </span>
            <h1 className="mt-4 font-heading text-h2 font-extrabold tracking-tight text-text-primary sm:text-h1 lg:text-h1">
              {profileData.name}
            </h1>
            <p className="mt-4 font-heading text-h3 font-semibold text-text-secondary">
              {profileData.role} — {profileData.location}
            </p>
          </div>
        </ScrollReveal>

        {/* Professional Profile Narrative */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 border-b border-border pb-16">
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.1}>
              <h3 className="font-heading text-h3 font-bold tracking-tight text-text-primary">
                Profile &amp; Approach
              </h3>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-body text-text-secondary md:text-h3 leading-relaxed">
            <ScrollReveal delay={0.15}>
              <p>{profileData.fullBio}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                My focus is building products that are easy for people to understand and efficient for engineering teams to maintain. With hands-on experience in both user experience research and front-end code, I make sure the design vision reaches the final product without distortion.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  data-cursor="cta"
                  className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-text-primary px-6 py-3 text-control font-semibold text-background hover:bg-black transition-colors"
                >
                  View &amp; Download CV <Download size={16} />
                </Link>
                <Link
                  href="/contact"
                  data-cursor="cta"
                  className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-control font-semibold text-text-primary hover:border-text-primary transition-colors"
                >
                  Get in Touch <ArrowUpRight size={16} />
                </Link>
                <a
                  href={`/${profileData.portfolioFilename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="cta"
                  className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-control font-semibold text-text-primary hover:border-text-primary transition-colors"
                >
                  Portfolio PDF (12 MB) <FileText size={16} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Experience Timeline Section */}
        <div className="mt-16 border-b border-border pb-16">
          <ScrollReveal>
            <SectionHeading
              number="01"
              title="Professional Experience"
              subtitle="A record of contributions to industry projects and interface design."
            />
          </ScrollReveal>
          <div className="mt-8 space-y-6 max-w-4xl">
            {profileData.experience.map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <ExperienceItem item={exp} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16 border-b border-border pb-16">
          <ScrollReveal>
            <SectionHeading number="02" title="Education" />
          </ScrollReveal>
          <div className="mt-6 space-y-6 max-w-4xl">
            {profileData.education.map((edu, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="rounded-card border border-border bg-surface p-6 md:p-8">
                  <span className="text-meta font-bold tracking-widest text-text-muted uppercase">
                    {edu.year}
                  </span>
                  <h3 className="mt-1 font-heading text-h3 font-bold text-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-control font-semibold text-accent">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-body text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Skills & Tools Section */}
        <div className="mt-16">
          <ScrollReveal>
            <SectionHeading
              number="03"
              title="Skills &amp; Tools"
              subtitle="The technologies and software I use to support the design workflow."
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
                title="Front-End Stack"
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
      </div>
    </div>
  );
}
