// --- IMPORTACIÓN DE COMPONENTES ---
import HeroQuantitativeLab from '@/components/HeroQuantitativeLab';
import PropuestaValor from '@/components/PropuestaValor';

export default function Home() {
  return (
    // Contenedor principal de la página de inicio (Home)
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero animado: no se toca, está cerrado en el spec (sección 6) */}
      <HeroQuantitativeLab />

      {/* Bloque de Propuesta de Valor: 3 frases + 2 CTAs (Track Record / Alertas Operativas) */}
      <PropuestaValor />

      {/* ZONA PROVISIONAL DE CONTENIDO:
        Próximos módulos posibles (futuro, no v1): KPIs (rentabilidad acumulada/anual),
        carrusel de redes sociales, enlace a simulador ABM / Wyckoff.
      */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <p className="text-xs font-mono text-[#6B7280]">
          [ Próximos módulos del Home: KPIs, carrusel de redes, ABM/Wyckoff ]
        </p>
      </div>

    </main>
  );
}
