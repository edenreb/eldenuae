export type Post = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  readingMinutes: number;
  author: string;
  cover: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "site-safety-induction",
    date: "23 Apr 2022",
    tag: "Site Practice",
    title: "MEP INsights",
    excerpt:
      "At Elden, employee welfare starts with safety. As a specialist in interior fit-out, we induct every trade before a single tool leaves the store.",
    readingMinutes: 5,
    author: "Elden Studio",
    cover:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "Safety is the first material we install on any site. Before drywall, before joinery, before the first cable is pulled, our crews walk the space and understand its risks together.",
          "Because Elden delivers across hospitality, retail, commercial and cultural sectors, no two inductions look the same — a live restaurant has different constraints from a shell-and-core office tower.",
        ],
      },
      {
        heading: "The induction protocol",
        paragraphs: [
          "Every operative — from lead engineer to sub-contracted carpenter — attends a site-specific briefing. We map circulation, isolation points, emergency exits and hot-work zones on a single A3 that stays with the site file.",
          "Personal protective equipment is issued on arrival, not assumed. Boots, eyewear, hi-vis and a printed access card with photo ID are the minimum for step-on.",
        ],
      },
      {
        heading: "Why it earns time back",
        paragraphs: [
          "A ten-minute daily toolbox talk removes hours of downstream confusion. When a fit-out schedule is tight — and in Dubai they always are — the crew that knows the site is the crew that finishes on program.",
        ],
      },
    ],
  },
  {
    slug: "site-safety-induction",
    date: "23 Apr 2022",
    tag: "Site Practice",
    title: "Site Safety Induction",
    excerpt:
      "At Elden, employee welfare starts with safety. As a specialist in interior fit-out, we induct every trade before a single tool leaves the store.",
    readingMinutes: 5,
    author: "Elden Studio",
    cover:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "Safety is the first material we install on any site. Before drywall, before joinery, before the first cable is pulled, our crews walk the space and understand its risks together.",
          "Because Elden delivers across hospitality, retail, commercial and cultural sectors, no two inductions look the same — a live restaurant has different constraints from a shell-and-core office tower.",
        ],
      },
      {
        heading: "The induction protocol",
        paragraphs: [
          "Every operative — from lead engineer to sub-contracted carpenter — attends a site-specific briefing. We map circulation, isolation points, emergency exits and hot-work zones on a single A3 that stays with the site file.",
          "Personal protective equipment is issued on arrival, not assumed. Boots, eyewear, hi-vis and a printed access card with photo ID are the minimum for step-on.",
        ],
      },
      {
        heading: "Why it earns time back",
        paragraphs: [
          "A ten-minute daily toolbox talk removes hours of downstream confusion. When a fit-out schedule is tight — and in Dubai they always are — the crew that knows the site is the crew that finishes on program.",
        ],
      },
    ],
  },
  {
    slug: "site-safety-induction",
    date: "16 July 2026",
    tag: "MEP Insights",
    title: "Site Safety Induction",
    excerpt:
      "At Elden, employee welfare starts with safety. As a specialist in interior fit-out, we induct every trade before a single tool leaves the store.",
    readingMinutes: 5,
    author: "Elden Studio",
    cover:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "Safety is the first material we install on any site. Before drywall, before joinery, before the first cable is pulled, our crews walk the space and understand its risks together.",
          "Because Elden delivers across hospitality, retail, commercial and cultural sectors, no two inductions look the same — a live restaurant has different constraints from a shell-and-core office tower.",
        ],
      },
      {
        heading: "The induction protocol",
        paragraphs: [
          "Every operative — from lead engineer to sub-contracted carpenter — attends a site-specific briefing. We map circulation, isolation points, emergency exits and hot-work zones on a single A3 that stays with the site file.",
          "Personal protective equipment is issued on arrival, not assumed. Boots, eyewear, hi-vis and a printed access card with photo ID are the minimum for step-on.",
        ],
      },
      {
        heading: "Why it earns time back",
        paragraphs: [
          "A ten-minute daily toolbox talk removes hours of downstream confusion. When a fit-out schedule is tight — and in Dubai they always are — the crew that knows the site is the crew that finishes on program.",
        ],
      },
    ],
  },
  {
    slug: "book-matched-marble-bar",
    date: "15 Mar 2024",
    tag: "Joinery",
    title: "Behind the scenes of a book-matched marble bar",
    excerpt:
      "How a single 3.6m slab of emerald marble travels from quarry to cafe — templated, cut, wet-polished and re-joined so you can never quite see it.",
    readingMinutes: 7,
    author: "Elden Studio",
    cover:
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "A book-matched slab is a moment of theatre. Two halves of the same block, opened like a novel, mirror one another vein for vein. Done well, the seam disappears; done badly, the whole gesture reads cheap.",
        ],
      },
      {
        heading: "Quarry to workshop",
        paragraphs: [
          "The slabs are hand-selected in Verona and shipped as a numbered pair. In Al Quoz they are laid flat, templated in ply against the finished joinery, and dry-fitted before any diamond blade touches them.",
          "We wet-cut every edge on a bridge saw, then hand-finish the arris to a soft 1mm chamfer so the seam catches shadow instead of light.",
        ],
      },
      {
        heading: "Installation night",
        paragraphs: [
          "Marble of this scale moves on suction lifters and a six-person crew. The bar carcass is levelled to 0.5mm across its length before the stone lands — anything more and the vein alignment reads off across the room.",
        ],
      },
    ],
  },
  {
    slug: "silent-hvac-hospitality",
    date: "02 Nov 2023",
    tag: "MEP",
    title: "Designing HVAC that you feel but never hear",
    excerpt:
      "Silent air handling in hospitality environments requires more than good equipment. A note on plenum design, cross-talk and where our engineers spend their obsessive hours.",
    readingMinutes: 6,
    author: "Elden Engineering",
    cover:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "The best hospitality rooms feel comfortable without ever announcing why. Air moves, temperature holds, conversation carries — and no one hears the machine that made it happen.",
        ],
      },
      {
        heading: "Where noise actually comes from",
        paragraphs: [
          "It is rarely the fan. Nine times out of ten, it is regain across a poorly sized grille, or cross-talk between two adjacent rooms sharing a plenum. We treat both at design stage, not on site.",
          "Our specification defaults to lined plenums, low-face-velocity diffusers, and acoustically decoupled hangers. The cost delta is small; the perceived quality difference is enormous.",
        ],
      },
      {
        heading: "Commissioning is the last design act",
        paragraphs: [
          "We balance every zone twice: once with the building empty, once with the intended occupancy load. A restaurant at 6pm is a different acoustic environment from the same room at 10am.",
        ],
      },
    ],
  },
  {
    slug: "six-materials-six-sectors",
    date: "10 Sep 2023",
    tag: "Craft",
    title: "Six materials, six sectors, one language",
    excerpt:
      "How we build a material palette that can travel from a gym to a fine-dining room and still feel like the same studio built both.",
    readingMinutes: 4,
    author: "Elden Studio",
    cover:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80&auto=format&fit=crop",
    body: [
      {
        paragraphs: [
          "A studio voice is not a colour or a font — it is a way of pairing materials. Ours leans on six recurring characters: marble, walnut, brushed brass, concrete, emerald stone and glass.",
          "Any project we take on speaks in some accent of those six. That is why a warehouse gym and a fine-dining room can share our fingerprint without looking like siblings dressed alike.",
        ],
      },
      {
        heading: "The rule of restraint",
        paragraphs: [
          "We rarely use more than three of the six on a single project. Restraint is what keeps the palette from becoming a signature at the expense of the brief.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, count);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.tag === current.tag ? -1 : b.tag === current.tag ? 1 : 0))
    .slice(0, count);
}
