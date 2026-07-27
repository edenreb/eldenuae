import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, getRelated } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
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
