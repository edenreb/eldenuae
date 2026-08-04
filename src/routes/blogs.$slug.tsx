import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Elden" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `/blogs/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} — Elden Journal` },
        { name: "description", content: p.excerpt },
        { name: "author", content: p.author },
        { property: "og:title", content: `${p.title} — Elden` },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: p.cover },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.tag },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${p.title} — Elden` },
        { name: "twitter:description", content: p.excerpt },
        { name: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-elden-green">404</p>
        <h1 className="mt-4 font-display text-5xl">Article not found</h1>
        <Link
          to="/blogs"
          className="mt-8 inline-flex rounded-full bg-elden-blue px-6 py-3 text-sm text-primary-foreground"
        >
          Back to Journal
        </Link>
      </div>
    </div>
  ),
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  return <BlogPost post={post} related={related} />;
}
