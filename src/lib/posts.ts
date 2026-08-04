import { post as mepInsights } from "@/blogs/mep-insights";
import { post as siteSafetyInduction } from "@/blogs/site-safety-induction";
import { post as bookMatchedMarbleBar } from "@/blogs/book-matched-marble-bar";
import { post as silentHvacHospitality } from "@/blogs/silent-hvac-hospitality";
import { post as sixMaterialsSixSectors } from "@/blogs/six-materials-six-sectors";

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
  mepInsights,
  siteSafetyInduction,
  bookMatchedMarbleBar,
  silentHvacHospitality,
  sixMaterialsSixSectors,
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
