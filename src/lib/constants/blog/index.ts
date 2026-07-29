// src/lib/constants/blog/index.ts
// Reúne todos los posts del blog en un solo array, cada uno con su slug
// (el identificador que va en la URL, ej. /blog/2026-07-27-prueba-lorem-ipsum).
//
// El slug se deriva del nombre del archivo del post, no se escribe a mano
// dentro de cada post — así nunca hay que recordar añadirlo, y como el
// nombre de archivo ya incluye fecha + nombre del paper (ver spec del
// agente), ya es único por diseño.
//
// Cuando llegue un post nuevo: 1) importarlo aquí, 2) añadir una línea al
// array de abajo con su slug (= nombre del archivo sin ".ts").

import type { Post } from "@/lib/types/blog";
import { post_2026_07_29_10_Country_and_industry_convergence_of_equity } from "./2026-07-29_10_Country_and_industry_convergence_of_equity";

// Un post, pero con su slug ya calculado y adjunto.
export type PostConSlug = Post & { slug: string };

export const posts: PostConSlug[] = [
  {
    ...post_2026_07_29_10_Country_and_industry_convergence_of_equity,
    slug: "2026-07-29_10_Country_and_industry_convergence_of_equity",
  },
]
  // Más nuevo primero, por fecha — así el feed y el carrusel no tienen
  // que ordenar nada por su cuenta, ya llega ordenado desde aquí.
  .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

// Busca un post por su slug. Devuelve undefined si no existe
// (ej. alguien entra a una URL de post que ya no existe).
export function buscarPostPorSlug(slug: string): PostConSlug | undefined {
  return posts.find((post) => post.slug === slug);
}
