"use client";

// ============================================================================
// COMPONENTE: CarruselCategoria
// Carrusel reutilizable usado dentro de cada tarjeta de categoría en
// Investigación Cuantitativa. Cada "item" es una imagen O un vídeo, con su
// propio subtítulo. Rota automáticamente cada 3 segundos (decisión de spec,
// ver 02.3 sección 3) y permite saltar manualmente con los puntos (dots).
// ============================================================================

import { useEffect, useState } from "react";

// Un item puede ser imagen o vídeo, nunca los dos a la vez.
// El subtítulo es obligatorio siempre (cambia con el item activo).
export type ItemCarrusel =
  | { imagen: string; video?: never; subtitulo: string }
  | { video: string; imagen?: never; subtitulo: string };

type Props = {
  items: ItemCarrusel[];
  /** Duración de cada slide en ms. Por defecto 3000 (spec 02.3, sección 3). */
  duracionMs?: number;
};

export default function CarruselCategoria({ items, duracionMs = 3000 }: Props) {
  const [activo, setActivo] = useState(0);

  // Auto-rotación. Se reinicia el temporizador cada vez que "activo" cambia,
  // tanto si cambia por el propio timer como si el usuario hace click en un dot
  // (así el dot no se "salta" de inmediato al siguiente).
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setTimeout(() => {
      setActivo((prev) => (prev + 1) % items.length);
    }, duracionMs);
    return () => clearTimeout(id);
  }, [activo, items.length, duracionMs]);

  if (items.length === 0) return null;

  return (
    <div className="w-full">
      {/* Marco del slide activo. Todos los items se renderizan superpuestos
          (position absolute) y se cruzan en opacidad — crossfade, no salto
          duro ni desplazamiento lateral. Transición rápida: 350ms. */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-[var(--line)] bg-white">
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[350ms] ease-in-out"
            style={{ opacity: i === activo ? 1 : 0 }}
            aria-hidden={i !== activo}
          >
            {"imagen" in item && item.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imagen}
                alt={item.subtitulo}
                className="w-full h-full object-contain"
              />
            ) : "video" in item && item.video ? (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* Subtítulo: cambia con el slide activo, no es fijo por tarjeta */}
      <p className="mt-3 text-sm text-[var(--muted)] font-[Inter] min-h-[1.5em]">
        {items[activo].subtitulo}
      </p>

      {/* Dots: salto manual a un slide concreto */}
      {items.length > 1 && (
        <div className="mt-2 flex gap-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setActivo(i)}
              aria-label={`Ver: ${it.subtitulo}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activo ? "bg-[var(--ink)]" : "bg-[var(--line)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
