import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      sector: z.enum([
        "Fitness",
        "F&B",
        "Retail",
        "Workplace",
        "Hospitality",
        "Wellness",
      ]),
      year: z.number(),
      location: z.string(),
      scope: z.array(z.string()),
      summary: z.string(),
      // hero = full-bleed feature-grade imagery, standard = solid supporting work,
      // compact = smaller card only, source quality doesn't support full-bleed use.
      tier: z.enum(["hero", "standard", "compact"]),
      featured: z.boolean().default(false),
      cover: image(),
      gallery: z.array(image()),
      order: z.number().default(0),
    }),
});

const journal = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/journal" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      cover: image(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { projects, journal };
