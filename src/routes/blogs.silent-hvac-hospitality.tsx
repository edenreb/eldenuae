import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/silent-hvac-hospitality";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/silent-hvac-hospitality")({
  head: () => ({
    meta: [
      { title: "Designing HVAC that you feel but never hear — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "Designing HVAC that you feel but never hear — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/silent-hvac-hospitality" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Designing HVAC that you feel but never hear — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/silent-hvac-hospitality" }],
  }),
  component: SilentHvacHospitality,
});

function SilentHvacHospitality() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
