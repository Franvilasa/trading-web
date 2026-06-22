// page.tsx dentro de /app/alertas-operativas -> URL "/alertas-operativas"
import BloqueContenido from "@/components/BloqueContenido";

export default function AlertasOperativas() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Alertas Operativas</h1>
      <p className="text-neutral-600 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>

      <BloqueContenido titulo="Cómo funcionan">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>

      <BloqueContenido titulo="Ejemplo de aviso">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>
    </section>
  );
}
