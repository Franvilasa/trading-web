"use client";

// ============================================================================
// COMPONENTE: CarruselCategoria
// Carrusel reutilizable usado dentro de cada tarjeta de categoría en
// Investigación Cuantitativa. Cada "item" es una imagen O un vídeo, con su
// propio subtítulo. Rota automáticamente cada 3 segundos y permite saltar
// manualmente con dots.
//
// MODIFICACIÓN (sesión 2026-07-21):
// - El contenedor se adapta a la altura natural de cada imagen (ya no es
//   altura fija 280px). La imagen activa define el alto del marco.
// - Las imágenes inactivas flotan encima con opacity 0 (sin ocupar espacio)
//   para mantener la transición crossfade de 350ms.
// - La imagen ocupa todo el ancho y su altura es automática (w-full h-auto),
//   respetando la proporción original sin recortes ni franjas forzadas.
// ============================================================================

import { useEffect, useState } from "react";

export type ItemCarrusel =
  | { imagen: string; video?: never; subtitulo: string }
  | { video: string; imagen?: never; subtitulo: string };

type Props = {
  items: ItemCarrusel[];
  duracionMs?: number;
};

export default function CarruselCategoria({ items, duracionMs = 3000 }: Props) {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setTimeout(() => {
      setActivo((prev) => (prev + 1) % items.length);
    }, duracionMs);
    return () => clearTimeout(id);
  }, [activo, items.length, duracionMs]);

  if (items.length === 0) return null;

  const indiceActual = String(activo + 1).padStart(2, "0");
  const indiceTotal = String(items.length).padStart(2, "0");

  return (
    <div className="w-full">
      {/* Marco paspartú: altura DINÁMICA (la que dicte la imagen activa) */}
      <div className="relative max-w-md mx-auto bg-[#F1EFE8] border border-[var(--line)] rounded-md p-5">
        <div className="relative w-full bg-white border border-[var(--line)] overflow-hidden">
          {items.map((item, i) => {
            const esActivo = i === activo;

            const contenido =
              "imagen" in item && item.imagen ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imagen}
                  alt={item.subtitulo}
                  className="w-full h-auto object-contain block"
                />
              ) : "video" in item && item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain block"
                />
              ) : null;

            return (
              <div
                key={i}
                className={`transition-opacity duration-[350ms] ease-in-out ${
                  esActivo ? "relative" : "absolute inset-0 opacity-0 pointer-events-none"
                }`}
                style={{ opacity: esActivo ? 1 : 0 }}
              >
                {contenido}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setActivo(i)}
              aria-label={`Ver: ${it.subtitulo}`}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                i === activo ? "bg-[var(--ink)]" : "bg-[var(--line)]"
              }`}
            />
          ))}
        </div>
      )}

      {/* Placa de subtítulo */}
      <div className="mt-3 pt-2 border-t border-[var(--line)] flex items-baseline justify-between gap-4">
        <p className="text-sm text-[var(--ink)] font-[Inter] min-h-[1.5em]">
          {items[activo].subtitulo}
        </p>
        <span className="text-xs text-[var(--muted)] font-[IBM_Plex_Mono] whitespace-nowrap">
          {indiceActual} / {indiceTotal}
        </span>
      </div>
    </div>
  );
}