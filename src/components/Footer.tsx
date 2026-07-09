// Footer.tsx
// Pie de página que aparece al final de todas las secciones.
// Contacto y Legal viven aquí (movidos desde el Navbar, decisión de minimalismo, sesión 2026-06-25).
// Aquí irán más adelante también los iconos de redes sociales (spec, sección 4).
import Link from "next/link";

const enlacesFooter = [
  { texto: "Contacto", ruta: "/contacto" },
  { texto: "Aviso Legal", ruta: "/legal" },
];

export default function Footer() {
  // Calculamos el año actual automáticamente, para no tener que actualizarlo a mano cada enero.
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-neutral-500 space-y-4">
        {/* Enlaces movidos desde el Navbar */}
        <ul className="flex gap-6">
          {enlacesFooter.map((enlace) => (
            <li key={enlace.ruta}>
              <Link href={enlace.ruta} className="hover:text-neutral-900 transition-colors">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>

        {/* Disclaimer placeholder: este texto SÍ es importante mantenerlo,
            aunque el resto del contenido sea lorem ipsum, por el tema legal (CNMV) que comentasteis. */}
        <p>
          Aviso: las rentabilidades pasadas no garantizan resultados futuros.
          Contenido informativo, no constituye asesoramiento financiero.
        </p>
        <p>© {anioActual} NombreEmpresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
