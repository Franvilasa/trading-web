// page.tsx dentro de /app/legal -> URL "/legal"
import BloqueContenido from "@/components/BloqueContenido";
import { LEGAL } from "@/lib/constants/legal";

export default function AvisoLegal() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-bold mb-2">{LEGAL.titulo}</h1>

      <BloqueContenido titulo="Identificación">
        <p className="mb-2 text-amber-600 text-xs font-medium">
          Datos provisionales: la sociedad todavía no está constituida.
        </p>
        <ul className="space-y-1">
          <li>Denominación: {LEGAL.identificacion.denominacion}</li>
          <li>NIF/CIF: {LEGAL.identificacion.nif}</li>
          <li>Domicilio social: {LEGAL.identificacion.domicilio}</li>
          <li>Registro: {LEGAL.identificacion.registro}</li>
        </ul>
      </BloqueContenido>

      {LEGAL.secciones
        .filter((s) => s.titulo !== "Identificación")
        .map((seccion) => (
          <BloqueContenido key={seccion.titulo} titulo={seccion.titulo}>
            <p>{seccion.texto}</p>
          </BloqueContenido>
        ))}

      <BloqueContenido titulo={LEGAL.disclaimersCNMV.titulo}>
        <ul className="space-y-2 list-disc pl-4">
          {LEGAL.disclaimersCNMV.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </BloqueContenido>

      <BloqueContenido titulo={LEGAL.privacidadYCookies.titulo}>
        <p className="text-amber-600 text-xs font-medium mb-2">
          Sección pendiente de redactar conforme al RGPD.
        </p>
        <p>{LEGAL.privacidadYCookies.texto}</p>
      </BloqueContenido>
    </section>
  );
}
