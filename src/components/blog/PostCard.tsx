// src/components/blog/PostCard.tsx
// Tarjeta de post: se usa tanto en el feed de /blog como (más adelante) en
// el carrusel del home. Un solo componente, para que ambos lugares se vean
// consistentes entre sí (ver 04-spec-blog-agente-ia.md, sección 5).
//
// Layout: fila horizontal — título/subtítulo a la izquierda, imagen a la
// derecha (en móvil se apilan, imagen arriba). Decisión de sesión, en vez
// del cuadro vertical de la primera versión.

import Link from "next/link";
import type { PostConSlug } from "@/lib/constants/blog";

type Props = {
  post: PostConSlug;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-line pb-8"
    >
      {/* Texto — a la izquierda en escritorio */}
      <div className="sm:w-2/3 order-2 sm:order-1">
        <p className="font-mono text-xs text-muted mb-2">{post.fecha}</p>
        <h3 className="text-xl font-bold text-ink leading-snug mb-2 group-hover:text-signal transition-colors">
          {post.titulo}
        </h3>
        <p className="text-sm text-muted line-clamp-3">{post.subtitulo}</p>
      </div>

      {/* Imagen — a la derecha en escritorio, arriba en móvil. Recortada
          a una proporción fija: aquí sí se puede recortar (es una
          miniatura, no el contenido principal como en la página del post). */}
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
