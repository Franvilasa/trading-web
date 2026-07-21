"use client";

import { useState } from "react";

type ItemIndice = { slug: string; titulo: string; icono: string; color: string };

type Props = {
  items: ItemIndice[];
};

export default function IndiceCategorias({ items }: Props) {
  const [activo, setActivo] = useState(items[0]?.slug ?? "");
  const [hovered, setHovered] = useState<string | null>(null);

  const irA = (slug: string) => {
    setActivo(slug);
    document.getElementById(`cat-${slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="flex flex-wrap gap-2 sticky top-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg z-10">
      {items.map(({ slug, titulo, icono, color }) => {
        const esActivo = slug === activo;
        const esHover = hovered === slug;
        // El color se muestra si está activo O si está en hover
        const mostrarColor = esActivo || esHover;

        return (
          <button
            key={slug}
            type="button"
            onClick={() => irA(slug)}
            onMouseEnter={() => setHovered(slug)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-[Inter] cursor-pointer transition-all duration-200
              ${mostrarColor
                ? "bg-white shadow-sm"
                : "border-[var(--line)] text-[var(--muted)] bg-transparent"
              }`}
            style={mostrarColor ? { borderColor: color, color: color } : {}}
          >
            <img src={icono} alt="" aria-hidden="true" className="w-4 h-4 opacity-70" />
            {titulo}
          </button>
        );
      })}
    </nav>
  );
}
