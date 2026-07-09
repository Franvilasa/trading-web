// Navbar.tsx
// Este es el menú de navegación que aparece arriba en TODAS las páginas.
// "Link" es un componente especial de Next.js: funciona como un <a> normal de HTML,
// pero es más rápido porque no recarga toda la página al hacer clic.
// 1. "use client" es obligatorio porque usamos useState (interacción del usuario)
"use client";

import Link from "next/link";
import { useState } from "react";

const enlaces = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Track Record", ruta: "/track-record" },
  { texto: "Investigación Cuantitativa", ruta: "/investigacion-cuantitativa" },
  { texto: "Alertas Operativas", ruta: "/alertas-operativas" },
];

export default function Navbar() {
  // isOpen = "¿está el menú desplegado?"
  // setIsOpen = la función para cambiarlo
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-tight">
          NombreEmpresa
        </Link>

        {/* --- BOTÓN HAMBURGUESA (solo visible en móvil) --- */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Al pulsar, cambia entre abierto/cerrado
          className="md:hidden p-2 rounded-md hover:bg-neutral-100"
          aria-label="Menú de navegación"
        >
          {/* Icono de tres rayas (SVG simple) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* --- MENÚ DE ESCRITORIO (visible en pantallas grandes) --- */}
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

      {/* --- MENÚ DE MÓVIL DESPLEGABLE (se muestra cuando isOpen es true) --- */}
      {/* Si isOpen es true, añade "flex"; si es false, añade "hidden" */}
      <div className={`${isOpen ? "flex" : "hidden"} md:hidden flex-col items-center gap-4 pb-4 border-t border-neutral-200 pt-4 bg-white`}>
        {enlaces.map((enlace) => (
          <Link
            key={enlace.ruta}
            href={enlace.ruta}
            onClick={() => setIsOpen(false)} // Al hacer clic en un enlace, se cierra el menú
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {enlace.texto}
          </Link>
        ))}
      </div>
    </header>
  );
}