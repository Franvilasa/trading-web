// page.tsx dentro de /app/contacto -> URL "/contacto"
import BloqueContenido from "@/components/BloqueContenido";

export default function Contacto() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Contacto</h1>
      <p className="text-neutral-600 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </p>

      <BloqueContenido titulo="Enlaces">
        {/* "a" normal de HTML porque son enlaces externos, no rutas internas de la web */}
        <ul className="space-y-1">
          <li>
            <a href="#" className="underline">
              LinkedIn (lorem ipsum, enlace pendiente)
            </a>
          </li>
          <li>
            <a href="#" className="underline">
              Email (lorem ipsum, enlace pendiente)
            </a>
          </li>
          <li>
            <a href="#" className="underline">
              Descargar CV (lorem ipsum, enlace pendiente)
            </a>
          </li>
        </ul>
      </BloqueContenido>
    </section>
  );
}
