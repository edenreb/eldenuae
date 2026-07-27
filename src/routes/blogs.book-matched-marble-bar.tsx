import { createFileRoute } from "@tanstack/react-router";
import { post } from "@/blogs/book-matched-marble-bar";
import { getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/book-matched-marble-bar")({
  head: () => ({
    meta: [
      { title: "Behind the scenes of a book-matched marble bar — Elden Journal" },
      { name: "description", content: post.excerpt },
      { name: "author", content: post.author },
      { property: "og:title", content: "Behind the scenes of a book-matched marble bar — Elden" },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blogs/book-matched-marble-bar" },
      { property: "og:image", content: post.cover },
      { property: "article:published_time", content: post.date },
      { property: "article:section", content: post.tag },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Behind the scenes of a book-matched marble bar — Elden" },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: post.cover },
    ],
    links: [{ rel: "canonical", href: "/blogs/book-matched-marble-bar" }],
  }),
  component: BookMatchedMarbleBar,
});

function BookMatchedMarbleBar() {
  return <BlogPost post={post} related={getRelated(post.slug)} />;
}
