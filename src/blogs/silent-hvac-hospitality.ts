import type { Post } from "@/lib/posts";

export const post: Post = {
  slug: "silent-hvac-hospitality",
  date: "02 Nov 2023",
  tag: "MEP",
  title: "Designing HVAC that you feel but never hear",
  excerpt:
    "Silent air handling in hospitality environments requires more than good equipment. A note on plenum design, cross-talk and where our engineers spend their obsessive hours.",
  readingMinutes: 6,
  author: "Elden Engineering",
  cover:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
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
};
