// --- IMPORTACIÓN DE COMPONENTES ---
import HeroQuantitativeLab from '@/components/HeroQuantitativeLab';
import PropuestaValor from '@/components/PropuestaValor';
import CarruselBlog from "@/components/blog/CarruselBlog";

export default function Home() {
  return (
    // Contenedor principal de la página de inicio (Home)
    <main className="min-h-screen bg-bg">

      {/* Hero animado: no se toca, está cerrado en el spec (sección 6) */}
      <HeroQuantitativeLab />

      {/* Bloque de Propuesta de Valor: 3 frases + 2 CTAs (Track Record / Alertas Operativas) */}
      <PropuestaValor />

      {/* Últimas publicaciones del blog */}
      <CarruselBlog />

      {/* ZONA PROVISIONAL DE CONTENIDO:
        Próximos módulos posibles (futuro, no v1): KPIs (rentabilidad acumulada/anual),
        carrusel de redes sociales, enlace a simulador ABM / Wyckoff.
      */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <p className="text-xs font-mono text--muted">
        
          [ "Todos los modelos son erróneos, pero algunos son útiles." — George E. P. Box ]
        </p>
      </div>

    </main>
  );
}
