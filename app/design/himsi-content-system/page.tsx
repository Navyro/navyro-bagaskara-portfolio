import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { designsData } from "@/data/designs";

/**
 * A short case study about the *system* behind the archive, not another gallery.
 *
 * It is deliberately honest about the parts that did not hold: the four holiday posts share a
 * frame but not a type scale, the date moves between four positions, and one post dropped the
 * footer bar. A case study that claims a perfect system would be contradicted by the images on
 * the same page — and by anyone opening /design.
 *
 * Nothing here is a metric. There is no engagement data in this repository, so the page talks
 * about decisions and evidence a reader can verify by looking.
 */
export const metadata: Metadata = {
  title: "Content system for an Instagram feed — HIMSI case study",
  description:
    "How eleven posts for a student organisation were designed on one frame: the rules that held, the parts that drifted, and what a locked template file would fix.",
  alternates: { canonical: "/design/himsi-content-system" },
  openGraph: {
    title: "Content system for an Instagram feed — HIMSI case study",
    description:
      "One frame, four post types, and an honest account of where the system drifted: typography, dates and a missing footer.",
    url: "/design/himsi-content-system",
  },
};

function piece(slug: string) {
  const found = designsData.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`design piece not found: ${slug}`);
  return found;
}

function Figure({
  slugs,
  caption,
  columns = 4,
}: {
  slugs: string[];
  caption: string;
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 4
      ? "grid grid-cols-2 gap-3 sm:grid-cols-4"
      : columns === 3
        ? "grid grid-cols-1 gap-3 sm:grid-cols-3"
        : "grid grid-cols-1 gap-3 sm:grid-cols-2";

  return (
    <figure className="mt-8">
      <div className={gridClass}>
        {slugs.map((slug) => {
          const item = piece(slug);
          return (
            <div key={slug} className="overflow-hidden rounded-card border border-border bg-surface">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 640px) 22vw, 45vw"
                className="h-auto w-full"
              />
            </div>
          );
        })}
      </div>
      <figcaption className="mt-3 text-meta leading-relaxed text-text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-border pt-10 lg:grid-cols-[200px_1fr] lg:gap-12">
      <div>
        <p className="font-heading text-meta font-extrabold uppercase tracking-wider text-accent">{label}</p>
        <h2 className="mt-2 font-heading text-h3 font-bold leading-snug text-text-primary">{title}</h2>
      </div>
      <div className="max-w-3xl space-y-4 text-body leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export default function HimsiContentSystemPage() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="mx-auto max-w-editorial px-[24px] lg:px-[48px]">
        <Link
          href="/design"
          className="tap mb-8 inline-flex items-center gap-2 text-control font-semibold text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft size={16} /> Visual design archive
        </Link>

        <ScrollReveal>
          <SectionHeading
            number="CASE STUDY"
            title="A content system for one Instagram feed"
            subtitle="Eleven pieces designed for a student organisation, and the frame that stopped them from reading as eleven different feeds — including the parts of the frame that did not hold."
            as="h1"
          />
        </ScrollReveal>

        <dl className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
          {[
            { label: "Organisation", value: "HIMSI UAA" },
            { label: "Period", value: "2024 — 2025" },
            { label: "Role", value: "Communication & information" },
            { label: "Pieces", value: "11 archived" },
          ].map((fact) => (
            <div key={fact.label} className="bg-surface px-4 py-5">
              <dt className="text-meta uppercase tracking-wider text-text-muted">{fact.label}</dt>
              <dd className="mt-1 font-heading text-h3 font-bold leading-tight text-text-primary">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="space-y-12">
          <Section label="01 — Situation" title="Every post started from an empty canvas">
            <p>
              A student organisation publishes all year: event announcements, commemoration days,
              member spotlights, and documentation from the week before. Each post used to be designed
              from scratch, so the result depended on which template happened to be open that day.
            </p>
            <p>
              The tell was four holiday posts made within a few months of each other. They shared a
              ground and a logo, and still looked like four different hands had designed them.
            </p>
          </Section>

          <Section label="02 — The frame" title="Four rules that made the feed recognisable">
            <ul className="space-y-3">
              <li>
                <strong className="text-text-primary">One ground.</strong> Dark navy with a light
                texture, on every post, so the feed has a single colour field in a crowded scroll.
              </li>
              <li>
                <strong className="text-text-primary">One lockup.</strong> The three-emblem logo sits
                top-left and the cabinet wordmark top-right, in the same corners every time.
              </li>
              <li>
                <strong className="text-text-primary">One picture zone.</strong> A single illustration
                runs through the middle band; the poster is read as an image, not as a paragraph.
              </li>
              <li>
                <strong className="text-text-primary">One footer.</strong> Division credit and the
                social row sit on a solid bar at the bottom, so the organisation is named on every
                post even when it is screenshotted out of the feed.
              </li>
            </ul>
            <Figure
              slugs={["feed-17-agustus", "feed-sumpah-pemuda", "feed-pancasila", "feed-hari-ibu"]}
              caption="Four occasions, one frame: same ground, same lockup, same picture zone. The differences below the surface are the interesting part."
            />
          </Section>

          <Section label="03 — Where it drifted" title="The frame held; the details did not">
            <p>
              Keeping the ground and the lockup was enough to make the feed cohere, but it did not make
              it consistent. Three things slipped, and each one is visible in the pieces above:
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-text-primary">The headline voice changed per post</strong> —
                condensed sans on two, brush lettering on one, a serif mix on another. A reader cannot
                tell whether that is a decision or an accident.
              </li>
              <li>
                <strong className="text-text-primary">The date moved between four positions</strong> —
                a ribbon at the bottom, a stroke under the title, inside the title block, and a green
                ribbon under the illustration.
              </li>
              <li>
                <strong className="text-text-primary">One post lost the footer bar entirely</strong>,
                taking the division credit and the social links with it.
              </li>
            </ul>
          </Section>

          <Section label="04 — The system leaves the screen" title="Print, judged the way it will be seen">
            <p>
              The same palette carried into two lanyards — one for the board, one for general members —
              designed together with their mockup. An ID holder is never judged on a blank artboard, so
              the mockup is part of the deliverable, not decoration.
            </p>
            <Figure
              slugs={["lanyard-kepengurusan", "lanyard-non-kepengurusan"]}
              caption="Two variants, one palette: board and general members, each shown on the object it will be printed on."
              columns={2}
            />
          </Section>

          <Section label="05 — What I would change" title="Lock the slots, not just the style">
            <p>
              If I rebuilt this now, the frame would live in a template file with locked slots rather
              than in habits: two headline styles instead of five, one fixed date position, and the
              footer bar built into the file so it cannot be forgotten on a busy week.
            </p>
            <p>
              The other change is editorial, not visual: fewer holiday posts, more of the work that
              shows what the organisation actually does. A feed that only marks dates is a calendar,
              not a portfolio.
            </p>
          </Section>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-card border border-border bg-surface p-6 md:flex-row md:items-center md:p-8">
          <div>
            <p className="font-heading text-h3 font-bold text-text-primary">See the pieces themselves</p>
            <p className="mt-2 max-w-xl text-body leading-relaxed text-text-secondary">
              All eleven are in the archive, with the client, year and role attached to each one.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/design"
              className="tap inline-flex min-h-11 items-center gap-2 rounded-btn bg-accent px-5 py-3 text-control font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:text-inverse-text"
            >
              Open the archive
            </Link>
            <Link
              href="/work"
              className="tap inline-flex min-h-11 items-center gap-2 text-control font-semibold text-text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              UI/UX case studies <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
