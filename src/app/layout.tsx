import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
// Importamos los dos componentes compartidos que acabamos de crear.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Carga real de las dos fuentes de marca (manual de marca, sección 3) vía
// next/font/google: se descargan una vez en build y se sirven desde nuestro
// propio dominio — no hay llamada a Google en producción, así que se
// mantiene el motivo original (no depender de una conexión externa).
// Cada una expone una variable CSS que globals.css usa como --font-sans/--font-mono.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Metadatos de la web: el título que aparece en la pestaña del navegador, etc.
export const metadata: Metadata = {
  title: "GOLDEA | Trading algorítmico",
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
    <html lang="es" className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}>
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
