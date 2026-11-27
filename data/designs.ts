/**
 * The visual design archive: posters, feed sets, and print work made for organisations
 * rather than for this site's case studies.
 *
 * Two rules shaped this list.
 *
 * 1. **Only work whose design decisions are visible.** The HIMSI feed folder also held a
 *    dozen "rekap kegiatan" photo collages that were the same template with a different
 *    photo dump; they show attendance, not craft. They are not here.
 * 2. **No work that duplicates a case study.** The folder's app mockups (shoe shop, map
 *    with a countdown) are Kick Swift and Jogging ID, which already have full case
 *    studies. Repeating them here would pad the archive with the same screens.
 *
 * Cards that carry someone else's portrait were also left out, because publishing a
 * colleague's face on a personal site is their decision, not this site's.
 *
 * `year` is only set where the artwork itself shows the date. Where it does not, the
 * field is absent rather than guessed.
 */
export type DesignCategory = "poster" | "social" | "print";

export interface DesignPiece {
  slug: string;
  /** File name under public/images/design/, already converted to WebP. */
  src: string;
  /** Intrinsic size of that file, so the grid reserves space and nothing shifts on load. */
  width: number;
  height: number;
  title: string;
  client: string;
  year?: string;
  /** What was actually done, in the order it was done. */
  role: string;
  tools: string;
  /** One sentence of context: the event, the brief, or the constraint. */
  caption: string;
  /** Description for screen readers and image search. */
  alt: string;
  category: DesignCategory;
}

export const designCategoryCopy: Record<
  DesignCategory,
  { label: string; count: string; blurb: string }
> = {
  poster: {
    label: "Poster & flyer",
    count: "Event campaigns",
    blurb:
      "Announcement pieces: one screen has to carry the date, the place, the speaker and a way to register, and still read from a phone.",
  },
  social: {
    label: "Social media",
    count: "Feed & illustration",
    blurb:
      "Feed posts for a student organisation: holiday pieces built on custom illustration, and a webinar promo for a national programme.",
  },
  print: {
    label: "Print & merchandise",
    count: "Physical objects",
    blurb:
      "Lanyards designed with their mockup, because an ID holder is judged in the hand, not on a screen.",
  },
};

export const designsData: DesignPiece[] = [
  {
    slug: "makrab-dies-natalis",
    src: "/images/design/makrab-dies-natalis.webp",
    width: 606,
    height: 1029,
    title: "Makrab & Dies Natalis — committee reveal",
    client: "HIMSI Universitas Alma Ata",
    role: "Poster & typography",
    tools: "Figma",
    caption:
      "A committee introduction poster for the PDD division (publication, documentation and design), built around oversized type behind the portrait.",
    alt: "Portrait poster for a Makrab and Dies Natalis committee member, with oversized background typography, a red PDD badge and the name Navyro Bagaskara.",
    category: "poster",
  },
  {
    slug: "study-club-uiux",
    src: "/images/design/study-club-uiux.webp",
    width: 588,
    height: 735,
    title: "Study Club — design system in UI/UX",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Poster & event assets",
    tools: "Figma",
    caption:
      "One poster holding the topic, the speaker, the room and a registration QR — everything a student needs to show up.",
    alt: "Study Club poster for Information System students on design systems in UI/UX design, with speaker details, schedule, room number and a registration QR code.",
    category: "poster",
  },
  {
    slug: "kunjungan-industri",
    src: "/images/design/kunjungan-industri.webp",
    width: 622,
    height: 739,
    title: "Kunjungan Industri 2024",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Poster & event assets",
    tools: "Figma",
    caption:
      "An industrial visit poster: the date, the dress code, a registration QR and a note that seats are limited.",
    alt: "Dark navy poster for an industrial visit to a server technology company, listing the date, dress code, a registration QR code and a limited quota of sixty people.",
    category: "poster",
  },
  {
    slug: "coming-soon-teaser",
    src: "/images/design/coming-soon-teaser.webp",
    width: 1224,
    height: 408,
    title: "Coming soon — teaser banner",
    client: "HIMSI Universitas Alma Ata",
    role: "Teaser banner",
    tools: "Figma",
    caption:
      "A wide teaser for a student-commission programme: the full announcement comes later, so the banner only has to hold attention.",
    alt: "Wide dark blue teaser banner reading Coming Soon with a megaphone icon and the line Stay Tuned.",
    category: "poster",
  },
  {
    slug: "webinar-figma-plugins",
    src: "/images/design/webinar-figma-plugins.webp",
    width: 622,
    height: 622,
    title: "Webinar — Figma plugins",
    client: "MSIB BISA AI Academy, Batch 7",
    year: "2024",
    role: "Promotion design & speaker",
    tools: "Figma",
    caption:
      "Promotion for a webinar about speeding up design work with Figma plugins — designed by the speaker.",
    alt: "Blue square webinar poster about optimising design with Figma plugins, showing the date, a free badge and the speakers details.",
    category: "social",
  },
  {
    slug: "feed-17-agustus",
    src: "/images/design/feed-17-agustus.webp",
    width: 398,
    height: 497,
    title: "Independence day feed",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Feed design & illustration",
    tools: "Figma",
    caption:
      "A holiday post carried by a drawn scene rather than a stock photo, so the organisation's feed keeps one visual voice.",
    alt: "Independence day feed post with an illustration of children holding a flag ribbon and the date 17 August 2024.",
    category: "social",
  },
  {
    slug: "feed-sumpah-pemuda",
    src: "/images/design/feed-sumpah-pemuda.webp",
    width: 398,
    height: 497,
    title: "Sumpah Pemuda feed",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Feed design & illustration",
    tools: "Figma",
    caption:
      "Dark ground, one red gesture: a commemorative post for 28 October 2024 that stays legible at feed size.",
    alt: "Dark blue commemorative feed post for Sumpah Pemuda on 28 October 2024 with a red raised fist illustration.",
    category: "social",
  },
  {
    slug: "feed-pancasila",
    src: "/images/design/feed-pancasila.webp",
    width: 399,
    height: 498,
    title: "Pancasila day feed",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Feed design & illustration",
    tools: "Figma",
    caption:
      "Red and white on a national holiday, with the Garuda drawn as a line illustration instead of a lifted emblem.",
    alt: "Red and white feed post for Hari Kesaktian Pancasila on 1 October 2024 with an illustrated Garuda eagle.",
    category: "social",
  },
  {
    slug: "feed-hari-ibu",
    src: "/images/design/feed-hari-ibu.webp",
    width: 399,
    height: 498,
    title: "Mother's day feed",
    client: "HIMSI Universitas Alma Ata",
    year: "2024",
    role: "Feed design & illustration",
    tools: "Figma",
    caption:
      "The softest of the holiday set: a warm palette and a hand-drawn mother and child, for 22 December 2024.",
    alt: "Warm-toned feed post for Hari Ibu on 22 December 2024 with an illustration of a mother and child.",
    category: "social",
  },
  {
    slug: "lanyard-kepengurusan",
    src: "/images/design/lanyard-kepengurusan.webp",
    width: 604,
    height: 604,
    title: "Lanyard — board members",
    client: "HIMSI Universitas Alma Ata",
    role: "Merchandise design & mockup",
    tools: "Figma",
    caption:
      "Three lanyards on a patterned ground: the design is judged in the mockup, because that is how it will be seen.",
    alt: "Product mockup of three purple lanyards for the student association board on a light hexagonal pattern background.",
    category: "print",
  },
  {
    slug: "lanyard-non-kepengurusan",
    src: "/images/design/lanyard-non-kepengurusan.webp",
    width: 604,
    height: 604,
    title: "Lanyard — general members",
    client: "HIMSI Universitas Alma Ata",
    role: "Merchandise design & mockup",
    tools: "Figma",
    caption:
      "The members' version, kept in the same visual system as the board lanyard so one event does not show two identities.",
    alt: "Product mockup of a purple lanyard for general members of a student association, shown flat on a light background with floral decoration.",
    category: "print",
  },
];
