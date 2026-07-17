"use client";

// ============================================================================
// COMPONENTE: CarruselCategoria
// Carrusel reutilizable usado dentro de cada tarjeta de categoría en
// Investigación Cuantitativa. Cada "item" es una imagen O un vídeo, con su
// propio subtítulo. Rota automáticamente cada 3 segundos (spec 02.2,
// sección 2) y permite saltar manualmente con el ticker de progreso.
//
// Rediseño (sesión 2026-07-17, ver 02.2 sección 7):
// - El marco ya no fuerza aspect-[4/3]. Ahora es un "passe-partout" de
//   altura fija: un fondo tipo paspartú (#F1EFE8) con la imagen centrada
//   dentro vía object-contain, para que capturas de código muy anchas y
//   fórmulas cuadradas convivan sin desbordar ni verse minúsculas.
// - El subtítulo ahora es una "placa" con índice (03 / 05), no un párrafo
//   suelto.
//
// Ajuste (misma sesión, feedback tras probar en local): se vuelve a los
// dots clásicos en vez del ticker — permiten saltar a una foto concreta de
// forma más clara. Se colocan justo debajo de la imagen, antes de la placa
// de subtítulo.
// ============================================================================

import { useEffect, useState } from "react";

// Un item puede ser imagen o vídeo, nunca los dos a la vez.
// El subtítulo es obligatorio siempre (cambia con el item activo).
export type ItemCarrusel =
  | { imagen: string; video?: never; subtitulo: string }
  | { video: string; imagen?: never; subtitulo: string };

type Props = {
  items: ItemCarrusel[];
  /** Duración de cada slide en ms. Por defecto 3000 (spec 02.2, sección 2). */
  duracionMs?: number;
};

export default function CarruselCategoria({ items, duracionMs = 3000 }: Props) {
  const [activo, setActivo] = useState(0);

  // Auto-rotación. Se reinicia el temporizador cada vez que "activo" cambia,
  // tanto si cambia por el propio timer como si el usuario salta manualmente
  // (así no se "salta" de inmediato al siguiente).
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setTimeout(() => {
      setActivo((prev) => (prev + 1) % items.length);
    }, duracionMs);
    return () => clearTimeout(id);
  }, [activo, items.length, duracionMs]);

  if (items.length === 0) return null;

  // Índice tipo "03 / 05" para la placa de subtítulo.
  const indiceActual = String(activo + 1).padStart(2, "0");
  const indiceTotal = String(items.length).padStart(2, "0");

  return (
    <div className="w-full">
      {/* Marco "passe-partout": altura fija (no aspect ratio), fondo tipo
          paspartú, imagen centrada dentro sin recortar ni desbordar. */}
      <div className="relative w-full h-[280px] bg-[#F1EFE8] border border-[var(--line)] rounded-md p-5">
        <div className="relative w-full h-full bg-white border border-[var(--line)] overflow-hidden">
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
      </div>

      {/* Dots: salto manual a un slide concreto, justo debajo de la imagen. */}
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

      {/* Placa de subtítulo: nombre del hallazgo + índice, separados por
          una línea hairline arriba (estilo cartela de museo, no párrafo). */}
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
