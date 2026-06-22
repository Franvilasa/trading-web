// --- IMPORTACIÓN DEL COMPONENTE ANIMADO ---
// Le decimos a Next.js que traiga el diseño que acabamos de guardar en la carpeta de componentes
import HeroQuantitativeLab from '@/components/HeroQuantitativeLab';

export default function Home() {
  return (
    // Contenedor principal de la página de inicio (Home)
    <main className="min-h-screen bg-[#FAFAF7]">
      
      {/* Inyectamos el Hero animado aquí arriba. 
        Automáticamente ocupará el ancho completo y el diseño que programamos.
      */}
      <HeroQuantitativeLab />

      {/* ZONA PROVISIONAL DE CONTENIDO:
        Aquí es donde en el futuro añadiremos el resto de bloques de la Home 
        (Métricas, Pilares de investigación, Equipo, etc.) según lo vayamos decidiendo.
      */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <p className="text-xs font-mono text-[#6B7280]">
          [ Módulos del Home en desarrollo: Bloque de métricas, Pilares y Equipo ]
        </p>
      </div>

    </main>
  );
}