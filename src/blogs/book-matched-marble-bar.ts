import type { Post } from "@/lib/posts";

export const post: Post = {
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
};
