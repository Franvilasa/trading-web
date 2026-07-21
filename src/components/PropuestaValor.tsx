import { PROPUESTA_VALOR } from "@/lib/constants/home";

// Bloque de texto + 2 CTAs que va inmediatamente después del Hero en el Home.
// Sustituye al antiguo placeholder "Quiénes somos" / "Equipo".
// Texto y enlaces viven en src/lib/constants/home.ts, no aquí.

export default function PropuestaValor() {
  return (
    <section className="border-b border-[#E3E1DC] bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="space-y-4 text-justify">
          {PROPUESTA_VALOR.frases.map((frase, i) => (
            <p
              key={i}
              className="text-base md:text-lg leading-relaxed text-[#14171C]"
            >
              {frase}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {PROPUESTA_VALOR.botones.map((boton) => (
            <a
              key={boton.href}
              href={boton.href}
              className="inline-flex items-center px-5 py-2.5 rounded border border-[#2D5D6B] text-[#2D5D6B] text-sm font-medium font-mono tracking-tight hover:bg-[#2D5D6B] hover:text-[#FAFAF7] hover:shadow-[0_0_14px_rgba(45,93,107,0.45)] transition-all"
            >
              {boton.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
