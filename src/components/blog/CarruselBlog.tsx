"use client";

import PostCard from "./PostCard";
import { posts } from "@/lib/constants/blog";

export default function CarruselBlog() {
  const recientes = posts.slice(0, 10);

  if (recientes.length === 0) return null;

  const listaDuplicada = [...recientes, ...recientes];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      {/* Inyectamos el estilo de la animación directamente para no tocar tailwind.config */}
      <style jsx>{`
        @keyframes cinta {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animacion-cinta {
          animation: cinta 30s linear infinite;
        }
        .animacion-cinta:hover {
          animation-play-state: paused;
        }
      `}</style>

      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-signal mb-2">
          Blog
        </p>
        <h2 className="text-2xl font-bold text-ink">Últimas publicaciones</h2>
      </header>

      {/* Mantenemos tu overflow-x-auto para que el scroll manual SIGA FUNCIONANDO */}
      <div className="overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
        <div className="flex gap-6 w-max animacion-cinta">
          {listaDuplicada.map((post, index) => (
            <PostCard
              key={`${post.slug}-${index}`}
              post={post}
              variante="vertical"
            />
          ))}
        </div>
      </div>
    </section>
  );
}