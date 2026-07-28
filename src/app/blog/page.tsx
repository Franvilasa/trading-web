// src/app/blog/page.tsx
// Feed del blog: lista cronológica inversa (más nuevo primero, ya viene
// ordenado así desde el índice). Cada entrada usa PostCard.

import PostCard from "@/components/blog/PostCard";
import { posts } from "@/lib/constants/blog";

export default function PaginaBlog() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-wider text-signal mb-2">
          Blog
        </p>
        <h1 className="text-3xl font-bold text-ink">
          Investigación y notas del laboratorio
        </h1>
      </header>

      {/* Si algún día no hay posts todavía, mostramos un aviso en vez de
          una parrilla vacía sin explicación. */}
      {posts.length === 0 ? (
        <p className="text-muted">Todavía no hay publicaciones.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
