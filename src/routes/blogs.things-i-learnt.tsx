import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/things-i-learnt";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/things-i-learnt")({
  head: () => ({
    meta: [
      { title: "Things I learnt. — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "Things I learnt. — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/things-i-learnt" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Things I learnt. — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/things-i-learnt" }],
  }),
  component: ThingsILearnt,
});

function ThingsILearnt() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
