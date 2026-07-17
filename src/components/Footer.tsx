// Footer.tsx
// Pie de página que aparece al final de todas las secciones.
// Contacto y Legal viven aquí (movidos desde el Navbar, decisión de minimalismo, sesión 2026-06-25).
// Aquí irán más adelante también los iconos de redes sociales (spec, sección 4) —
// pendientes de URLs reales, ver 01-spec-estado-actual.md sección 2.4.
import Link from "next/link";
import { MARCA } from "@/lib/constants/marca";

const enlacesFooter = [
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Aviso Legal", ruta: "/legal" },
];

export default function Footer() {
  // Calculamos el año actual automáticamente, para no tener que actualizarlo a mano cada enero.
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-muted space-y-4">
        {/* Enlaces movidos desde el Navbar */}
        <ul className="flex gap-6">
          {enlacesFooter.map((enlace) => (
            <li key={enlace.ruta}>
              <Link href={enlace.ruta} className="hover:text-ink transition-colors">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>

        {/* Disclaimer CNMV: contenido real, no placeholder — mantenerlo aunque
            el resto de copy siga siendo provisional. */}
        <p>
          Aviso: las rentabilidades pasadas no garantizan resultados futuros.
          Contenido informativo, no constituye asesoramiento financiero.
        </p>
        <p>© {anioActual} {MARCA.nombre}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
