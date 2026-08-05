import type { ImageSet } from "@/assets/generated/images";
import { kevinTeixeira, pankajAgarwal } from "@/assets/generated/images";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  // Real portrait, once run through scripts/optimize-images.mjs — falls
  // back to the shared placeholder in Testimonials.tsx when absent.
  image?: ImageSet;
}

export const testimonials: Testimonial[] = [
  {
    id: "warehouse-gym",
    quote: "Elden's attention to detail is what keeps them above the rest.",
    name: "Kevin Teixeira",
    role: "Co-Founder",
    company: "Warehouse Gym",
    image: kevinTeixeira,
  },
  {
    id: "srg-properties",
    quote:
      "The design drawings and specifications were followed with precision. We'd love to collaborate again in the future.",
    name: "Amit Choubey",
    role: "Head of Projects",
    company: "SRG Properties LLC",
  },
  {
    id: "bikanervala",
    quote:
      "The professionalism with which the work was executed by Elden engineers is worth mentioning often.",
    name: "Pankaj Agarwal",
    role: "Managing Director",
    company: "Bikanervala",
    image: pankajAgarwal,
  },
  {
    id: "zara",
    quote: "From concept to handover, Elden kept us informed every step of the way.",
    name: "Sara Al Mansoori",
    role: "Retail Operations Manager",
    company: "Zara",
  },
  {
    id: "holiday-inn",
    quote:
      "Our guests notice the difference. Elden delivered a space that feels far beyond its budget.",
    name: "James Whitfield",
    role: "General Manager",
    company: "Holiday Inn",
  },
  {
    id: "gmg",
    quote:
      "Rolling out across multiple sites is never simple, but Elden made every handover feel like the first.",
    name: "Farah Haddad",
    role: "Regional Fit-out Lead",
    company: "GMG",
  },
  {
    id: "common-grounds",
    quote: "The joinery work alone speaks for itself.",
    name: "Tom Bianchi",
    role: "Founder",
    company: "Common Grounds",
  },
  {
    id: "tbk-restaurant",
    quote:
      "Every deadline was hit, every detail considered — that's rare in this industry, and it's why we keep coming back to Elden for every new location.",
    name: "Aisha Rahman",
    role: "Operations Director",
    company: "TBK Restaurant",
  },
  {
    id: "golden-goose",
    quote:
      "Elden translated our brand's identity into the space perfectly — customers comment on it constantly.",
    name: "Elena Marchetti",
    role: "Store Development Manager",
    company: "Golden Goose",
  },
  {
    id: "nandos",
    quote: "Fast, clean, and exactly on brief.",
    name: "Marcus Reid",
    role: "Franchise Operations",
    company: "Nando's",
  },
  {
    id: "danube-home",
    quote:
      "The finishing quality on our showroom floor exceeded what we imagined from the drawings.",
    name: "Rania Fakhoury",
    role: "Showroom Manager",
    company: "Danube Home",
  },
  {
    id: "equities-first",
    quote: "They understood we needed a working office on day one, not just a beautiful one.",
    name: "Daniel Osei",
    role: "Head of Workplace",
    company: "Equities First",
  },
  {
    id: "sharaf-dg",
    quote: "The store was ready two days ahead of our launch date — unheard of in retail fit-out.",
    name: "Faisal Noor",
    role: "Store Operations",
    company: "Sharaf DG",
  },
];
