import React from "react";
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { profileData } from "@/data/profile";

export default function ContactPage() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-heading text-meta font-bold tracking-widest text-accent uppercase">
              CONTACT
            </span>
            <h1 className="mt-4 font-heading text-h2 font-extrabold tracking-tight text-text-primary sm:text-h1 lg:text-display">
              LET'S TALK.
            </h1>
            <p className="mt-6 text-h3 text-text-secondary leading-relaxed">
              Open to UI/UX Designer roles, product design collaborations, and conversations
              about user research and design systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid: Direct Info + Contact Form */}
        <div className="mt-16 grid grid-cols-1 gap-[48px] lg:grid-cols-12">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="rounded-card border border-border bg-surface p-8">
                <span className="text-meta font-bold tracking-wider text-text-muted uppercase">
                  PRIMARY EMAIL
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="tap-block mt-3 block font-heading text-h3 font-bold text-text-primary hover:text-accent transition-colors break-all"
                >
                  {profileData.email}
                </a>
                <p className="mt-2 text-meta text-text-secondary">
                  Average response time: under 24 hours.
                </p>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-card border border-border bg-surface p-8 space-y-6">
                <span className="text-meta font-bold tracking-wider text-text-muted uppercase">
                  PROFESSIONAL PROFILE
                </span>

                <ul className="space-y-4">
                  <li>
                    <a
                      href={profileData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-block group flex items-center justify-between font-heading text-body font-bold text-text-primary transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-3">
                        <Instagram size={20} className="text-accent" />
                        <span>Instagram — @navyroo</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                  {profileData.linkedin && (
                    <li>
                      <a
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-block group flex items-center justify-between font-heading text-body font-bold text-text-primary transition-colors hover:text-accent"
                      >
                        <span className="flex items-center gap-3">
                          <Linkedin size={20} className="text-accent" />
                          <span>LinkedIn — navyro-bagaskara</span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
