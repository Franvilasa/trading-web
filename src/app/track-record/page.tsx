// page.tsx dentro de /app/track-record -> esta página vive en la URL "/track-record"
import BloqueContenido from "@/components/BloqueContenido";

export default function TrackRecord() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Track Record</h1>
      <p className="text-neutral-600 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>

      {/* Aquí más adelante irá el gráfico interactivo con los datos reales de Darwinex */}
      <BloqueContenido titulo="Gráfico de rentabilidad">
        [Aquí irá el gráfico interactivo — lorem ipsum por ahora]
      </BloqueContenido>

      {/* Aquí irán las métricas clave: rentabilidad, drawdown, ratio de Sharpe, etc. */}
      <BloqueContenido titulo="Métricas clave">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
        tempor incididunt.
      </BloqueContenido>

      {/* Disclaimer legal específico de esta sección, por mostrar datos de rentabilidad */}
      <BloqueContenido titulo="Aviso legal">
        Lorem ipsum: rentabilidades pasadas no garantizan resultados futuros.
      </BloqueContenido>
    </section>
  );
}
