// src/components/blog/PostCard.tsx
// Tarjeta de post: se usa tanto en el feed de /blog como en el carrusel
// del home. Un solo componente con dos variantes, para mantener
// consistencia visual entre ambos lugares (ver 04-spec-blog-agente-ia.md,
// sección 5).
//
// - variante "fila" (default): usada en el feed de /blog. Fila horizontal,
//   texto a la izquierda, imagen a la derecha. Reacciona al ancho de LA
//   VENTANA (sm:flex-row), por eso no sirve para el carrusel: ahí la
//   tarjeta es angosta aunque la ventana sea ancha, y se vería aplastada.
// - variante "vertical": usada en el carrusel del home. Imagen arriba,
//   texto abajo, ancho fijo — pensada para vivir en una fila deslizable
//   de varias tarjetas chicas.

import Link from "next/link";
import type { PostConSlug } from "@/lib/constants/blog";

type Props = {
  post: PostConSlug;
  variante?: "fila" | "vertical";
};

export default function PostCard({ post, variante = "fila" }: Props) {
  if (variante === "vertical") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block w-64 shrink-0 snap-start"
      >
        <div className="aspect-[3/2] overflow-hidden rounded bg-line mb-3">
          <img
            src={post.imagen}
            alt={post.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p className="font-mono text-xs text-muted mb-1">{post.fecha}</p>
        <h3 className="font-bold text-sm text-ink leading-snug line-clamp-2 group-hover:text-signal transition-colors">
          {post.titulo}
        </h3>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-line pb-8"
    >
      <div className="sm:w-2/3 order-2 sm:order-1">
        <p className="font-mono text-xs text-muted mb-2">{post.fecha}</p>
        <h3 className="text-xl font-bold text-ink leading-snug mb-2 group-hover:text-signal transition-colors">
          {post.titulo}
        </h3>
        <p className="text-sm text-muted line-clamp-3">{post.subtitulo}</p>
      </div>

      <div className="sm:w-1/3 order-1 sm:order-2 aspect-[3/2] overflow-hidden rounded bg-line shrink-0">
        <img
          src={post.imagen}
          alt={post.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
