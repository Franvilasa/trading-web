// src/app/blog/[slug]/page.tsx
// Ruta dinámica real de un post individual del blog (ej. /blog/2026-07-27-prueba-lorem-ipsum).
// Sustituye a la ruta de prueba temporal /blog/prueba del paso anterior.

import { notFound } from "next/navigation";
import PlantillaPost from "@/components/blog/PlantillaPost";
import { posts, buscarPostPorSlug } from "@/lib/constants/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js necesita saber de antemano qué slugs existen, para poder
// generar cada página del blog en build time (más rápido y sin depender
// de un servidor corriendo en cada visita).
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PaginaPost({ params }: Props) {
  const { slug } = await params;
  const post = buscarPostPorSlug(slug);

  // Si alguien entra a una URL de post que no existe (o ya se borró),
  // mostramos la página 404 estándar de Next.js en vez de romper la app.
  if (!post) {
    notFound();
  }

  return <PlantillaPost post={post} />;
}
