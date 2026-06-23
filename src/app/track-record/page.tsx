// ============================================================================
// PÁGINA: Track Record
// Ruta del archivo en el proyecto: src/app/track-record/page.tsx
// ============================================================================
// Qué hace esta página: muestra los dos "widgets" oficiales de Darwinex
// (el gráfico y la tabla de rentabilidades) dentro de tarjetas con nuestro
// propio estilo. Las imágenes las actualiza Darwinex automáticamente en sus
// servidores — nosotros solo las mostramos y las enmarcamos.
// ============================================================================

// "Metadata" es información para el navegador/buscadores (título de la
// pestaña, descripción). No se ve en la página, pero es buena práctica
// en Next.js definirla en cada página.
export const metadata = {
  title: "Track Record — Lab Cuantitativo",
  descripcion: "Track record real (no backtest) del DARWIN JTBB en Darwinex.",
};

// Componente principal de la página. En Next.js, el archivo page.tsx debe
// exportar por defecto una función que devuelve el contenido (JSX = HTML
// "mezclado" con código).
export default function PaginaTrackRecord() {
  return (
    // <main> = contenedor principal del contenido de la página
    // (el Navbar y el Footer ya viven en layout.tsx, no se repiten aquí).
    // Clases de Tailwind explicadas:
    //   max-w-[900px] mx-auto  → ancho máximo y centrado horizontal
    //   px-6 py-16              → espacio interno (horizontal / vertical)
    //   flex flex-col gap-8     → apila los hijos en columna, con espacio entre ellos
    <main className="max-w-[900px] mx-auto px-6 py-16 flex flex-col gap-8">
      {/* Título visible de la página.
          font-[Fraunces] usa la tipografía de titulares acordada.
          text-[var(--ink)] usa el color de texto del sistema de diseño. */}
      <h1 className="font-[Fraunces] text-[var(--ink)] text-4xl">
        Track Record
      </h1>

      {/* ------------------------------------------------------------------
          TARJETA 1: Gráfico de evolución del DARWIN JTBB
      ------------------------------------------------------------------ */}
      {/* Clases de la tarjeta explicadas:
            bg-[var(--bg)]        → fondo hueso del sistema de diseño
            border border-[var(--line)] → borde sutil (no sombra fuerte)
            rounded-lg            → esquinas ligeramente redondeadas
            p-6                    → espacio interno
            flex justify-center    → centra la imagen dentro de la tarjeta */}
      <section className="bg-[var(--bg)] border border-[var(--line)] rounded-lg p-6 flex justify-center">
        {/* <a> envuelve la imagen: al hacer click, lleva a la página
            oficial de Darwinex de JTBB. target="_blank" abre en una
            pestaña nueva, para que el visitante no se vaya de nuestra web. */}
        <a
          href="https://www.darwinex.com/invest/JTBB?utm_source=WidgetDarwin&utm_medium=Referral&utm_campaign=WidgetChart&utm_content=fxhack"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* La imagen viene directamente del servidor de Darwinex y se
              actualiza sola: nosotros no la generamos ni la editamos.
              max-w-full h-auto → nunca desborda la tarjeta, mantiene proporción. */}
          <img
            src="https://prodx-widgets.s3-eu-west-1.amazonaws.com/JTBB.5.8-widgets-darwin-chart-darwin-all-bg-transparent-l-es.png"
            alt="Gráfico de evolución del DARWIN JTBB"
            className="max-w-full h-auto"
          />
        </a>
      </section>

      {/* ------------------------------------------------------------------
          TARJETA 2: Tabla de rentabilidades del DARWIN JTBB
          (debajo de la tarjeta del gráfico, tal como se decidió)
      ------------------------------------------------------------------ */}
      <section className="bg-[var(--bg)] border border-[var(--line)] rounded-lg p-6 flex justify-center">
        <a
          href="https://www.darwinex.com/invest/JTBB?utm_source=WidgetDarwin&utm_medium=Referral&utm_campaign=WidgetReturn&utm_content=fxhack"
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

      {/* NOTA: el disclaimer legal NO va aquí a propósito.
          Se decidió que viva en su propio sitio (Aviso Legal / componente
          reutilizable), pendiente de definir en otra sesión. */}
    </main>
  );
}
