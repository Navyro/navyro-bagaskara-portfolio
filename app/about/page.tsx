import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
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
            <span className="font-heading text-xs font-bold tracking-widest text-accent uppercase">
              ABOUT
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              {profileData.name}
            </h1>
            <p className="mt-4 font-heading text-lg font-semibold text-text-secondary md:text-xl">
              {profileData.role} — {profileData.location}
            </p>
          </div>
        </ScrollReveal>

        {/* Professional Profile Narrative */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 border-b border-border pb-16">
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl font-bold tracking-tight text-text-primary">
                Profil &amp; Pendekatan Kerja
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-base text-text-secondary md:text-lg leading-relaxed">
            <ScrollReveal delay={0.15}>
              <p>{profileData.fullBio}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                Fokus utama saya adalah menciptakan produk yang mudah dipahami oleh pengguna sekaligus efisien untuk dipelihara oleh tim teknis. Dengan keahlian ganda dalam riset pengalaman pengguna dan eksekusi kode Front-End, saya mampu memastikan bahwa visi desain diterjemahkan tanpa distorsi ke dalam produk akhir.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  data-cursor="cta"
                  className="inline-flex items-center gap-2 rounded-btn bg-text-primary px-6 py-3 text-sm font-semibold text-background hover:bg-black transition-colors"
                >
                  Lihat &amp; Unduh Resume <Download size={16} />
                </Link>
                <Link
                  href="/contact"
                  data-cursor="cta"
                  className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary hover:border-text-primary transition-colors"
                >
                  Hubungi Langsung <ArrowUpRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Experience Timeline Section */}
        <div className="mt-16 border-b border-border pb-16">
          <ScrollReveal>
            <SectionHeading
              number="01"
              title="Pengalaman Kerja Profesional"
              subtitle="Jejak kontribusi dalam proyek industri dan perancangan antarmuka."
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
            <SectionHeading number="02" title="Pendidikan Formal" />
          </ScrollReveal>
          <div className="mt-6 space-y-6 max-w-4xl">
            {profileData.education.map((edu, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="rounded-card border border-border bg-surface p-6 md:p-8">
                  <span className="text-xs font-bold tracking-widest text-text-muted uppercase">
                    {edu.year}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-bold text-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-accent">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-base text-text-secondary leading-relaxed">
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
              title="Kompetensi Teknis &amp; Tools"
              subtitle="Teknologi dan perangkat lunak yang dikuasai untuk mendukung workflow perancangan."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <SkillGroup
                title="UI/UX Design"
                skills={profileData.skills.uiux}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <SkillGroup
                title="Front-End Stack"
                skills={profileData.skills.frontend}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
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
