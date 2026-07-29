// src/components/blog/CarruselBlog.tsx
// Fila de las publicaciones más recientes del blog, para el home.
// Deslizable horizontalmente (scroll con dedo/ratón). Reutiliza PostCard
// en su variante "vertical" para mantener consistencia visual con el feed.
// Reemplaza a CarruselCategoria.tsx para este uso — ese componente rota
// contenido DENTRO de una sola tarjeta, no sirve para mostrar varias
// tarjetas de posts distintos en fila (ver 04-spec-blog-agente-ia.md).

import PostCard from "./PostCard";
import { posts } from "@/lib/constants/blog";

export default function CarruselBlog() {
  // Los 10 más recientes — el índice ya viene ordenado por fecha.
  const recientes = posts.slice(0, 10);

  // Si todavía no hay posts, no mostramos la sección (nada que deslizar).
  if (recientes.length === 0) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-signal mb-2">
          Blog
        </p>
        <h2 className="text-2xl font-bold text-ink">Últimas publicaciones</h2>
      </header>

      {/* overflow-x-auto = permite deslizar horizontalmente.
          snap-x snap-mandatory = al soltar el scroll, "engancha" en la
          siguiente tarjeta en vez de quedar a medias. */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
        {recientes.map((post) => (
          <PostCard key={post.slug} post={post} variante="vertical" />
        ))}
      </div>
    </section>
  );
}
