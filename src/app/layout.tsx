import type { Metadata } from "next";
import "./globals.css";
// Importamos los dos componentes compartidos que acabamos de crear.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Nota: usamos la fuente del sistema operativo (configurada en globals.css)
// en vez de descargar una fuente de Google Fonts. Así la web no depende
// de una conexión externa para mostrar el texto, y carga más rápido.

// Metadatos de la web: el título que aparece en la pestaña del navegador, etc.
export const metadata: Metadata = {
  title: "NombreEmpresa | Trading algorítmico",
  description: "Portfolio de metodología y track record en trading algorítmico",
};

// RootLayout es la "plantilla maestra": envuelve TODAS las páginas.
// "children" representa el contenido específico de cada página (Home, Track record, etc.).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* El Navbar aparece arriba siempre */}
        <Navbar />
        {/* "main" envuelve el contenido propio de cada página visitada */}
        <main className="flex-1">{children}</main>
        {/* El Footer aparece abajo siempre */}
        <Footer />
      </body>
    </html>
  );
}
