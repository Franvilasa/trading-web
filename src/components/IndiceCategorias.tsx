"use client";

// ============================================================================
// COMPONENTE: IndiceCategorias
// Fila de botones (uno por categoría) arriba de la lista de tarjetas en
// Investigación Cuantitativa. Cada botón lleva un icono pequeño + el título
// de la categoría; al hacer click, hace scroll suave hasta esa sección.
// El botón de la categoría visible en pantalla se resalta automáticamente
// (vía IntersectionObserver), como el índice de un paper o un long-form.
// ============================================================================

import { useEffect, useState } from "react";

type ItemIndice = { slug: string; titulo: string; icono: string };

type Props = {
  items: ItemIndice[];
};

export default function IndiceCategorias({ items }: Props) {
  const [activo, setActivo] = useState(items[0]?.slug ?? "");

  // Observa qué sección de categoría está actualmente visible en el centro
  // de la pantalla y actualiza qué botón se marca como activo.
  useEffect(() => {
    const observadores = items.map(({ slug }) => {
      const el = document.getElementById(`cat-${slug}`);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActivo(slug);
          });
        },
        // Franja "activa" centrada en la pantalla, no todo el viewport,
        // para que el botón cambie cuando la sección está realmente a la vista.
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observadores.forEach((o) => o?.disconnect());
  }, [items]);

  const irA = (slug: string) => {
    document.getElementById(`cat-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Categorías de investigación" className="flex flex-wrap gap-2">
      {items.map(({ slug, titulo, icono }) => {
        const esActivo = slug === activo;
        return (
          <button
            key={slug}
            type="button"
            onClick={() => irA(slug)}
            aria-current={esActivo ? "true" : undefined}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-[Inter] cursor-pointer transition-colors ${
              esActivo
                ? "border-[var(--ink)] text-[var(--ink)] bg-white"
                : "border-[var(--line)] text-[var(--muted)] bg-transparent hover:border-[var(--ink)] hover:text-[var(--ink)]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icono} alt="" aria-hidden="true" className="w-4 h-4 opacity-70" />
            {titulo}
          </button>
        );
      })}
    </nav>
  );
}
