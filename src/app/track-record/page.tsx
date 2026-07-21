// ============================================================================
// PÁGINA: Track Record
// Ruta del archivo en el proyecto: src/app/track-record/page.tsx
// ============================================================================
// Qué hace esta página: muestra los dos "widgets" oficiales de Darwinex
// (el gráfico y la tabla de rentabilidades) dentro de tarjetas con nuestro
// propio estilo. Las imágenes las actualiza Darwinex automáticamente en sus
// servidores — nosotros solo las mostramos y las enmarcamos.
// Además: un texto de contexto arriba (qué es el JTBB) y un bloque abajo
// que explica que es un instrumento invertible, con botón a Darwinex.
// ============================================================================

import { TRACK_RECORD } from "@/lib/constants/trackRecord";

export const metadata = {
  title: "Track Record — Lab Cuantitativo",
  descripcion: "Track record real (no backtest) del DARWIN JTBB en Darwinex.",
};

export default function PaginaTrackRecord() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-16 flex flex-col gap-8">
      <h1 className="font-[Fraunces] text-ink text-4xl">
        Track Record
      </h1>

      {/* TEXTO DE CONTEXTO: qué es el JTBB, por qué los datos son fiables */}
      <p className="text-ink text-base leading-relaxed max-w-[760px]">
        {TRACK_RECORD.contexto}
      </p>

      {/* ------------------------------------------------------------------
          TARJETA 1: Gráfico de evolución del DARWIN JTBB
      ------------------------------------------------------------------ */}
      <section className="bg-bg border border-line rounded-lg p-6 flex justify-center">
        <a
          href={TRACK_RECORD.darwinZeroUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://prodx-widgets.s3-eu-west-1.amazonaws.com/JTBB.5.8-widgets-darwin-chart-darwin-all-bg-transparent-l-es.png"
            alt="Gráfico de evolución del DARWIN JTBB"
            className="max-w-full h-auto"
          />
        </a>
      </section>

      {/* ------------------------------------------------------------------
          TARJETA 2: Tabla de rentabilidades del DARWIN JTBB
      ------------------------------------------------------------------ */}
      <section className="bg-bg border border-line rounded-lg p-6 flex justify-center">
        <a
          href={TRACK_RECORD.darwinZeroUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://prodx-widgets.s3-eu-west-1.amazonaws.com/JTBB.5.8-widgets-darwin-return-darwin-all-bg-light-0-es.png"
            alt="Tabla de rentabilidades del DARWIN JTBB"
            className="max-w-full h-auto"
          />
        </a>
      </section>

      {/* ------------------------------------------------------------------
          BLOQUE INVERTIBLE: qué significa "invertible" + botón a Darwinex
          (en el futuro, aquí mismo pueden añadirse enlaces a vídeos, etc.)
      ------------------------------------------------------------------ */}
      <section className="border-t border-line pt-8 flex flex-col gap-4">
        <p className="text-ink text-base leading-relaxed max-w-[760px]">
          {TRACK_RECORD.invertible}
        </p>

        {/* Botón principal: solo consulta de rendimiento, sin restricción geográfica */}
        <a
          href={TRACK_RECORD.botonVerPerformance.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center self-start px-5 py-2.5 rounded border border-signal text-signal text-sm font-medium font-mono tracking-tight hover:bg-signal hover:text-bg transition-colors"
        >
          {TRACK_RECORD.botonVerPerformance.label}
        </a>

        {/* Enlace secundario, discreto (no botón): invertir de verdad en Darwinex.
            Restringido geográficamente por Darwinex, de ahí la nota junto al enlace. */}
        <p className="text-xs font-mono text-muted">
          <a
            href={TRACK_RECORD.enlaceInvertir.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-signal transition-colors"
          >
            {TRACK_RECORD.enlaceInvertir.label}
          </a>
          {" — "}
          {TRACK_RECORD.enlaceInvertir.nota}
        </p>
      </section>

      {/* NOTA: el disclaimer legal NO va aquí a propósito.
          Vive en Aviso Legal (sección "Advertencias sobre riesgo e inversión"). */}
    </main>
  );
}
