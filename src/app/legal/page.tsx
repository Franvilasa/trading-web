// page.tsx dentro de /app/legal -> URL "/legal"
import BloqueContenido from "@/components/BloqueContenido";

export default function AvisoLegal() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Aviso Legal</h1>
      <p className="text-neutral-600 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>

      <BloqueContenido titulo="Disclaimer de inversión">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>

      <BloqueContenido titulo="Política de privacidad y cookies">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </BloqueContenido>
    </section>
  );
}
