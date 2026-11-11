import React from "react";
import Link from "next/link";
import { Download, CheckCircle2, ChevronDown, FileText, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { profileData } from "@/data/profile";
import { publicFileSize } from "@/lib/fileSize";

export default function ResumePage() {
  // Read from the file so the label can never drift away from the actual PDF again.
  const portfolioSize = publicFileSize(profileData.portfolioFilename);
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
        {/* Page Header */}
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-border pb-12">
            <div>
              <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
                CURRICULUM VITAE
              </span>
              <h1 className="mt-2 break-words font-heading text-h2 font-extrabold tracking-tight text-text-primary sm:text-h1">
                Professional Resume
              </h1>
              <p className="mt-3 text-body text-text-secondary">
                Qualifications summary, career experience, and technical skills.
              </p>
            </div>

            <div className="flex min-w-0 flex-wrap gap-3 print:hidden">
              <a
                href={`/${profileData.portfolioFilename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-btn border border-border bg-surface px-4 py-3 text-left text-control font-semibold text-text-primary transition-all hover:border-text-primary sm:px-6"
              >
                <span className="min-w-0 break-words">Portfolio PDF{portfolioSize ? ` (${portfolioSize})` : ""}</span>{" "}
                <FileText size={16} className="shrink-0" />
              </a>
              <a
                href={`/${profileData.resumeFilename}`}
                download={profileData.resumeFilename}
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-btn bg-accent px-4 py-3.5 text-left text-control font-semibold text-white dark:text-inverse-text transition-all hover:bg-accent-hover shadow-sm sm:px-7"
              >
                <span className="min-w-0 break-words">CV — English (PDF)</span> <Download size={16} className="shrink-0" />
              </a>
              <a
                href={`/${profileData.resumeFilenameId}`}
                download={profileData.resumeFilenameId}
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-btn border border-border bg-surface px-4 py-3 text-left text-control font-semibold text-text-primary transition-all hover:border-text-primary sm:px-6"
              >
                <span className="min-w-0 break-words">CV — Bahasa Indonesia (PDF)</span> <Download size={16} className="shrink-0" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* On-Screen Resume View Document Container */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 rounded-card border border-border bg-surface p-5 shadow-sm sm:p-8 md:p-12">
            {/* Header section */}
            <div className="border-b border-border pb-8">
              <h2 className="break-words font-heading text-h2 font-bold text-text-primary">
                {profileData.name}
              </h2>
              <p className="mt-1 text-body font-semibold text-accent">
                {profileData.role}
              </p>
              <div className="mt-4 flex min-w-0 flex-wrap gap-4 text-meta font-medium text-text-secondary">
                <span className="min-w-0 break-all">Email: {profileData.email}</span>
                <span>•</span>
                <span>Location: {profileData.location}</span>
                <span>•</span>
                <span className="min-w-0 break-all">LinkedIn: linkedin.com/in/navyrobagaskara</span>
              </div>
            </div>

            {/* Bio Summary */}
            <div className="py-8 border-b border-border">
              <h3 className="font-heading text-meta font-bold uppercase tracking-wider text-text-muted">
                Qualifications Summary
              </h3>
              <p className="mt-3 text-body text-text-primary leading-relaxed">
                {profileData.fullBio}
              </p>
            </div>

            {/* Work History */}
            <div className="py-8 border-b border-border space-y-8">
              <h3 className="font-heading text-meta font-bold uppercase tracking-wider text-text-muted">
                Work Experience
              </h3>

              {profileData.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <h4 className="min-w-0 break-words font-heading text-h3 font-bold text-text-primary">
                      {exp.role} — <span className="text-text-secondary">{exp.company}</span>
                    </h4>
                    <span className="text-meta font-semibold text-text-muted">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-control text-text-secondary">{exp.description}</p>
                  <ul className="mt-2 space-y-1 text-meta text-text-primary">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="py-8 border-b border-border">
              <h3 className="font-heading text-meta font-bold uppercase tracking-wider text-text-muted">
                Education
              </h3>
              {profileData.education.map((edu, idx) => (
                <div key={idx} className="mt-4 flex flex-wrap items-baseline justify-between">
                  <div>
                    <h4 className="font-heading text-body font-bold text-text-primary">
                      {edu.degree}
                    </h4>
                    <p className="text-meta font-semibold text-accent">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-meta font-semibold text-text-muted">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Certifications — 8 rows shown, the complete 34 listed as a grouped index */}
            <div className="py-8 border-b border-border">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-meta font-bold uppercase tracking-wider text-text-muted">
                  Certifications &amp; Training
                </h3>
                <span className="text-meta font-semibold text-text-muted">
                  {profileData.certifications.length} credentials
                </span>
              </div>

              <ul className="mt-4 divide-y divide-border">
                {profileData.certifications
                  .filter((cert) => cert.featured)
                  .map((cert) => (
                    <li
                      key={cert.title}
                      className="grid grid-cols-1 gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,17rem)_6.5rem] sm:items-baseline"
                    >
                      <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-control font-semibold text-text-primary">
                          {cert.title}
                        </span>
                        {cert.note && (
                          <span className="rounded-full border border-border bg-background px-2 py-0.5 text-meta font-semibold text-accent">
                            {cert.note}
                          </span>
                        )}
                        {/* The issuer's own verification page, when one exists in the data. */}
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${cert.title}`}
                            className="tap inline-flex items-center gap-0.5 text-meta font-semibold text-accent underline-offset-2 hover:underline"
                          >
                            Verify
                            <ArrowUpRight size={12} aria-hidden="true" />
                          </a>
                        )}
                      </span>
                      <span className="text-meta text-text-secondary">{cert.issuer}</span>
                      {cert.date && (
                        <span className="text-meta font-semibold text-text-muted sm:whitespace-nowrap sm:text-right">
                          {cert.date}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>

              <p className="mt-3 text-meta leading-relaxed text-text-muted">
                Anthropic does not print a date on this certificate; the October month was confirmed
                directly by the owner and the year is not stated.
              </p>

              <details className="group mt-1">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-meta font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-open:rotate-180"
                  />
                  All {profileData.certifications.length} certificates by group
                </summary>
                <ul className="mt-1 space-y-2.5 border-t border-border pt-4">
                  {profileData.certificationGroups.map((group) => (
                    <li
                      key={group.label}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                    >
                      <span className="text-control font-semibold text-text-primary sm:w-56 sm:shrink-0">
                        {group.label}
                      </span>
                      <span className="text-meta font-semibold text-accent">
                        {group.count} certificates
                      </span>
                      <span className="text-meta text-text-secondary sm:flex-1">
                        {group.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Skills */}
            <div className="pt-8 space-y-4">
              <h3 className="font-heading text-meta font-bold uppercase tracking-wider text-text-muted">
                Skills &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...profileData.skills.uiux,
                  ...profileData.skills.frontend,
                  ...profileData.skills.tools,
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-border bg-background px-3 py-1 text-meta font-semibold text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
