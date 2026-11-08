import React from "react";
import { ArrowUpRight, Linkedin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { profileData } from "@/data/profile";

export default function ContactPage() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-6 lg:px-12">
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
              Terbuka untuk peluang sebagai UI/UX Designer, kerja sama desain produk, maupun
              diskusi seputar riset pengguna dan design system.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid: Direct Info + Contact Form */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="rounded-card border border-border bg-surface p-8">
                <span className="text-meta font-bold tracking-wider text-text-muted uppercase">
                  ALAMAT EMAIL UTAMA
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  data-cursor="cta"
                  className="mt-3 block font-heading text-h3 font-bold text-text-primary hover:text-accent transition-colors break-all"
                >
                  {profileData.email}
                </a>
                <p className="mt-2 text-meta text-text-secondary">
                  Waktu respon rata-rata: kurang dari 24 jam.
                </p>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-card border border-border bg-surface p-8 space-y-6">
                <span className="text-meta font-bold tracking-wider text-text-muted uppercase">
                  PROFIL PROFESIONAL
                </span>

                <ul className="space-y-4">
                  <li>
                    <a
                      href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="cta"
                      className="group flex items-center justify-between font-heading text-body font-bold text-text-primary transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-3">
                        <MessageCircle size={20} className="text-accent" />
                        <span>WhatsApp — {profileData.phone}</span>
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
                        data-cursor="cta"
                        className="group flex items-center justify-between font-heading text-body font-bold text-text-primary transition-colors hover:text-accent"
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
                  <li>
                    <a
                      href={`tel:${profileData.phone.replace(/[^0-9+]/g, "")}`}
                      data-cursor="cta"
                      className="group flex items-center justify-between font-heading text-body font-bold text-text-primary transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-3">
                        <Phone size={20} className="text-accent" />
                        <span>Telepon</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
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
