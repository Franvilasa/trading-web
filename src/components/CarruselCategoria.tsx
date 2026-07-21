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
// - Se añade prop "color" para personalizar el acento (borde, dots, placa).
// - Al hacer hover, la rotación se ralentiza a 6s (efecto premium).
// - Placa de subtítulo con fondo oscuro y texto claro.
// ============================================================================

import { useEffect, useState } from "react";

export type ItemCarrusel =
  | { imagen: string; video?: never; subtitulo: string }
  | { video: string; imagen?: never; subtitulo: string };

type Props = {
  items: ItemCarrusel[];
  duracionMs?: number;
  /** Color de acento (hex) para bordes, dots y placa. */
  color?: string;
};

export default function CarruselCategoria({
  items,
  duracionMs = 3000,
  color = "#2D5D6B", // color por defecto si no se pasa
}: Props) {
  const [activo, setActivo] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Duración efectiva: si está en hover, usamos el doble (6s), sino la normal (3s)
  const duracionEfectiva = isHovering ? duracionMs * 2 : duracionMs;

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setTimeout(() => {
      setActivo((prev) => (prev + 1) % items.length);
    }, duracionEfectiva);
    return () => clearTimeout(id);
  }, [activo, items.length, duracionEfectiva]);

  if (items.length === 0) return null;

  const indiceActual = String(activo + 1).padStart(2, "0");
  const indiceTotal = String(items.length).padStart(2, "0");

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Marco paspartú: altura dinámica, borde con color, sombra suave */}
      <div
        className="relative max-w-lg mx-auto bg-[#F1EFE8] rounded-md p-4 transition-all duration-300"
        style={{
          border: `1px solid ${color}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
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

      {/* Dots: el activo usa el color de la categoría */}
      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setActivo(i)}
              aria-label={`Ver: ${it.subtitulo}`}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${
                i === activo ? "bg-[var(--ink)]" : "bg-[var(--line)]"
              }`}
              style={i === activo ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
      )}

      {/* Placa de subtítulo: fondo = color de la categoría, texto blanco */}
      <div
        className="mt-3 pt-2 flex items-baseline justify-between gap-4"
        style={{
          borderTop: `2px solid ${color}`,
        }}
      >
        <p
          className="text-sm font-[Inter] min-h-[1.5em] px-2 py-1 rounded-sm text-white"
          style={{
            backgroundColor: color,
            flex: 1,
          }}
        >
          {items[activo].subtitulo}
        </p>
        <span
          className="text-xs font-[IBM_Plex_Mono] whitespace-nowrap px-2 py-1 rounded-sm text-white/80"
          style={{
            backgroundColor: color,
          }}
        >
          {indiceActual} / {indiceTotal}
        </span>
      </div>
      
    </div>
  );
}