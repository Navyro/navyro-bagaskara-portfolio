import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DesignArchive from "@/components/DesignArchive";
import ScrollReveal from "@/components/ScrollReveal";
import { designsData } from "@/data/designs";

/**
 * The visual design archive: posters, feed sets and print work made for organisations.
 *
 * Kept separate from /work on purpose. /work is a narrative — research, decisions, outcome —
 * and a poster cannot carry that. Mixing the two would blur the position this site argues
 * for (a UI/UX designer who can also build), so this page is evidence of visual craft and
 * links back to the case studies rather than competing with them.
 */
export const metadata: Metadata = {
  // Every other route inherits the site title. This one names the page and keeps the name, so a
  // search result reads "Visual Design Archive — Navyro Bagaskara" instead of a bare page label.
  title: "Visual Design Archive — Navyro Bagaskara",
  description:
    "Posters, Instagram feed sets and print work by Navyro Bagaskara — event campaigns for HIMSI Universitas Alma Ata and a webinar for MSIB BISA AI Academy.",
  alternates: { canonical: "/design" },
  openGraph: {
    title: "Visual Design Archive — Navyro Bagaskara",
    description:
      "Posters, feed sets and print work: event campaigns, holiday illustrations and merchandise, all designed in Figma.",
    url: "/design",
  },
};

export default function DesignPage() {
  // Derived, never typed: the counts in the header and in each group come from the same array
  // that renders the tiles, so they cannot drift.
  const total = designsData.length;
  const clients = [...new Set(designsData.map((piece) => piece.client))];
  const years = [...new Set(designsData.map((piece) => piece.year).filter(Boolean))].sort();

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
        <ScrollReveal>
          <SectionHeading
            number="DESIGN"
            title="Visual Design Archive"
            subtitle="Posters, feed sets and print work made for organisations — the visual half of the practice, kept apart from the case studies so each can be read on its own terms."
            as="h1"
          />
        </ScrollReveal>

        {/* The facts row. Every value is derived from designsData, so adding a piece updates it. */}
        <ScrollReveal>
          <dl className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4 md:mb-20">
            {[
              { label: "Pieces", value: String(total) },
              { label: "Made for", value: clients.length === 1 ? "1 organisation" : `${clients.length} organisations` },
              { label: "Year", value: years.length ? years.join(" · ") : "Undated" },
              { label: "Tool", value: "Figma" },
            ].map((fact) => (
              <div key={fact.label} className="bg-surface px-4 py-5">
                <dt className="text-meta uppercase tracking-wider text-text-muted">{fact.label}</dt>
                <dd className="mt-1 font-heading text-h3 font-bold text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <DesignArchive />

        {/* A way out of the gallery: the archive proves range, the next step is a conversation. */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-card border border-border bg-surface p-6 md:mt-24 md:flex-row md:items-center md:p-8">
          <div>
            <p className="font-heading text-h3 font-bold text-text-primary">Need a campaign set, not one poster?</p>
            <p className="mt-2 max-w-xl text-body leading-relaxed text-text-secondary">
              Event posters, feed templates and print pieces are designed as one system, so a programme keeps a
              single voice from the first teaser to the last recap.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="tap inline-flex min-h-11 items-center gap-2 rounded-btn bg-accent px-5 py-3 text-control font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:text-inverse-text"
            >
              Start a conversation
            </Link>
            <Link
              href="/work"
              className="tap inline-flex min-h-11 items-center gap-2 text-control font-semibold text-text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              See the UI/UX case studies <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
