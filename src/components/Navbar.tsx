// Navbar.tsx
// Este es el menú de navegación que aparece arriba en TODAS las páginas.
// "Link" es un componente especial de Next.js: funciona como un <a> normal de HTML,
// pero es más rápido porque no recarga toda la página al hacer clic.
import Link from "next/link";

// Definimos aquí la lista de secciones del menú.
// Si en el futuro quieres añadir o quitar una sección, solo tocas esta lista.
// Contacto y Legal NO van aquí: viven en el Footer (decisión de minimalismo, sesión 2026-06-25).
const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Track Record", ruta: "/track-record" },
  { texto: "Investigación Cuantitativa", ruta: "/investigacion-cuantitativa" },
  { texto: "Alertas Operativas", ruta: "/alertas-operativas" },
];

export default function Navbar() {
  return (
    // <header> es la etiqueta semántica de HTML para la cabecera de la página.
    // Las clases de Tailwind (bg-..., flex, etc.) van entre comillas en "className".
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Nombre/logo provisional de la empresa, en texto, hasta integrar el logo real */}
        <Link href="/" className="font-semibold text-lg tracking-tight">
          NombreEmpresa
        </Link>

        {/* Recorremos la lista "enlaces" y generamos un <Link> por cada uno.
            Esto evita escribir el mismo bloque de código a mano por cada sección. */}
        <ul className="hidden md:flex gap-6 text-sm text-neutral-600">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link href={enlace.ruta} className="hover:text-neutral-900 transition-colors">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
