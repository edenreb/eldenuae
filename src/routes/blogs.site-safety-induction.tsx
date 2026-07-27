import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/site-safety-induction";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/site-safety-induction")({
  head: () => ({
    meta: [
      { title: "Site Safety Induction — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "Site Safety Induction — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/site-safety-induction" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Site Safety Induction — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/site-safety-induction" }],
  }),
  component: SiteSafetyInduction,
});

function SiteSafetyInduction() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
