// page.tsx (dentro de /app)
// Esta es la página de INICIO: la que se ve al entrar en la web sin ninguna ruta extra,
// es decir, la que corresponde a "/".
import BloqueContenido from "@/components/BloqueContenido";

export default function Home() {
  return (
    // "section" con padding (espaciado interno) y un ancho máximo centrado,
    // para que el texto no ocupe todo el ancho de pantallas muy grandes.
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      {/* Bloque "hero": el titular grande de presentación de la empresa */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Lorem ipsum dolor sit amet trading algorítmico
        </h1>
        <p className="text-neutral-600 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Bloque destacado con un dato de track record, a modo de "anticipo" */}
      <BloqueContenido titulo="Track record verificado">
        Lorem ipsum dolor sit amet consectetur. Ver datos completos en la
        sección Track Record.
      </BloqueContenido>

      {/* Bloque que resume brevemente la metodología, como anticipo de esa sección */}
      <BloqueContenido titulo="Metodología cuantitativa">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.
      </BloqueContenido>
    </section>
  );
}
