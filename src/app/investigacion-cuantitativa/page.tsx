// page.tsx dentro de /app/investigacion-cuantitativa -> URL "/investigacion-cuantitativa"
import BloqueContenido from "@/components/BloqueContenido";

export default function InvestigacionCuantitativa() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Investigación Cuantitativa</h1>
      <p className="text-neutral-600 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>

      {/* Cada bloque representa un "tipo" de modelo, sin revelar el detalle del alpha */}
      <BloqueContenido titulo="Análisis econométrico">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>

      <BloqueContenido titulo="Modelos de aprendizaje automático">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>

      <BloqueContenido titulo="Gestión de riesgo">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>
    </section>
  );
}
