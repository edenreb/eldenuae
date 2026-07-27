import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/mep-insights";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/mep-insights")({
  head: () => ({
    meta: [
      { title: "MEP INsights — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "MEP INsights — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/mep-insights" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MEP INsights — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/mep-insights" }],
  }),
  component: MepInsights,
});

function MepInsights() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
