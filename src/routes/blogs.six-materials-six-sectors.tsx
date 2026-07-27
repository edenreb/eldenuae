import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/six-materials-six-sectors";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/six-materials-six-sectors")({
  head: () => ({
    meta: [
      { title: "Six materials, six sectors, one language — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "Six materials, six sectors, one language — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/six-materials-six-sectors" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Six materials, six sectors, one language — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/six-materials-six-sectors" }],
  }),
  component: SixMaterialsSixSectors,
});

function SixMaterialsSixSectors() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
