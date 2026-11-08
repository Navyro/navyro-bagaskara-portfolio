import React from "react";
import Link from "next/link";
import { Download, CheckCircle2, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { profileData } from "@/data/profile";

export default function ResumePage() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
        {/* Page Header */}
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-border pb-12">
            <div>
              <span className="font-heading text-xs font-bold tracking-widest text-accent uppercase">
                CURRICULUM VITAE
              </span>
              <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
                Resume Profesional
              </h1>
              <p className="mt-3 text-base text-text-secondary">
                Ringkasan kualifikasi, pengalaman karir, dan kemampuan teknis Navyro Bagaskara.
              </p>
            </div>

            <a
              href={`/${profileData.resumeFilename}`}
              download={profileData.resumeFilename}
              data-cursor="cta"
              className="inline-flex items-center gap-2 rounded-btn bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover shadow-sm"
            >
              Unduh Resume PDF <Download size={16} />
            </a>
          </div>
        </ScrollReveal>

        {/* On-Screen Resume View Document Container */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 rounded-card border border-border bg-surface p-8 shadow-sm md:p-12">
            {/* Header section */}
            <div className="border-b border-border pb-8">
              <h2 className="font-heading text-3xl font-bold text-text-primary">
                {profileData.name}
              </h2>
              <p className="mt-1 text-base font-semibold text-accent">
                {profileData.role}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-text-secondary">
                <span>Email: {profileData.email}</span>
                <span>•</span>
                <span>Lokasi: {profileData.location}</span>
                <span>•</span>
                <span>LinkedIn: linkedin.com/in/navyrobagaskara</span>
              </div>
            </div>

            {/* Bio Summary */}
            <div className="py-8 border-b border-border">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted">
                Ringkasan Kualifikasi
              </h3>
              <p className="mt-3 text-base text-text-primary leading-relaxed">
                {profileData.fullBio}
              </p>
            </div>

            {/* Work History */}
            <div className="py-8 border-b border-border space-y-8">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted">
                Pengalaman Kerja
              </h3>

              {profileData.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between">
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      {exp.role} — <span className="text-text-secondary">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-semibold text-text-muted">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{exp.description}</p>
                  <ul className="mt-2 space-y-1 text-xs text-text-primary">
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
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted">
                Pendidikan
              </h3>
              {profileData.education.map((edu, idx) => (
                <div key={idx} className="mt-4 flex flex-wrap items-baseline justify-between">
                  <div>
                    <h4 className="font-heading text-base font-bold text-text-primary">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-semibold text-accent">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-text-muted">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Certifications — 8 rows shown, the complete 34 listed as a grouped index */}
            <div className="py-8 border-b border-border">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted">
                  Sertifikasi &amp; Pelatihan
                </h3>
                <span className="text-xs font-semibold text-text-muted">
                  {profileData.certifications.length} kredensial
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
                        <span className="text-sm font-semibold text-text-primary">
                          {cert.title}
                        </span>
                        {cert.note && (
                          <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-semibold text-accent">
                            {cert.note}
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-text-secondary">{cert.issuer}</span>
                      {cert.date && (
                        <span className="whitespace-nowrap text-xs font-semibold text-text-muted sm:text-right">
                          {cert.date}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>

              <p className="mt-3 text-xs leading-relaxed text-text-muted">
                Anthropic tidak mencetak tanggal pada sertifikatnya; bulan Okt dikonfirmasi
                langsung oleh pemilik, tahun tidak dicantumkan.
              </p>

              <details className="group mt-1">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-open:rotate-180"
                  />
                  Semua {profileData.certifications.length} sertifikat menurut kelompok
                </summary>
                <ul className="mt-1 space-y-2.5 border-t border-border pt-4">
                  {profileData.certificationGroups.map((group) => (
                    <li
                      key={group.label}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                    >
                      <span className="text-sm font-semibold text-text-primary sm:w-56 sm:shrink-0">
                        {group.label}
                      </span>
                      <span className="text-xs font-semibold text-accent">
                        {group.count} sertifikat
                      </span>
                      <span className="text-xs text-text-secondary sm:flex-1">
                        {group.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Skills */}
            <div className="pt-8 space-y-4">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted">
                Keahlian &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ...profileData.skills.uiux,
                  ...profileData.skills.frontend,
                  ...profileData.skills.tools,
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-text-primary"
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
