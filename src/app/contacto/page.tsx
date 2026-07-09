// page.tsx dentro de /app/contacto -> URL "/contacto"
import BloqueContenido from "@/components/BloqueContenido";
import ContactoForm from "@/components/ContactoForm";
import { CONTACTO } from "@/lib/constants/contacto";

export default function Contacto() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">{CONTACTO.titulo}</h1>
      <p className="text-neutral-600 max-w-2xl">{CONTACTO.intro}</p>

      <BloqueContenido titulo="Escríbenos">
        <ContactoForm />
      </BloqueContenido>

      <BloqueContenido titulo="Enlaces">
        <ul className="space-y-1">
          {CONTACTO.enlaces.map((enlace) => (
            <li key={enlace.texto}>
              <a
                href={enlace.href}
                className={
                  enlace.pendiente
                    ? "underline text-neutral-400 cursor-not-allowed"
                    : "underline"
                }
              >
                {enlace.texto}
                {enlace.pendiente && " (enlace pendiente)"}
              </a>
            </li>
          ))}
        </ul>
      </BloqueContenido>
    </section>
  );
}
