import { CONTACTO } from "@/lib/constants/contacto";

// Formulario de contacto: solo estructura por ahora.
// El atributo "action" apunta a CONTACTO.formulario.endpoint, que es un placeholder ("#").
// Cuando exista una cuenta de Formspree/Web3Forms, sustituir el endpoint en
// src/lib/constants/contacto.ts y este formulario empezará a enviar de verdad
// sin tocar nada más aquí.

export default function ContactoForm() {
  const { campos, endpoint, botonLabel, notaPendiente } = CONTACTO.formulario;

  return (
    <form
      action={endpoint}
      method="POST"
      className="space-y-4 max-w-md"
    >
      <div className="space-y-1">
        <label htmlFor={campos.nombre.name} className="text-sm font-medium text-neutral-700">
          {campos.nombre.label}
        </label>
        <input
          id={campos.nombre.name}
          name={campos.nombre.name}
          type={campos.nombre.type}
          required
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor={campos.email.name} className="text-sm font-medium text-neutral-700">
          {campos.email.label}
        </label>
        <input
          id={campos.email.name}
          name={campos.email.name}
          type={campos.email.type}
          required
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor={campos.mensaje.name} className="text-sm font-medium text-neutral-700">
          {campos.mensaje.label}
        </label>
        <textarea
          id={campos.mensaje.name}
          name={campos.mensaje.name}
          rows={5}
          required
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled
        className="px-5 py-2.5 rounded border border-neutral-300 text-neutral-400 text-sm font-medium cursor-not-allowed"
        title={notaPendiente}
      >
        {botonLabel}
      </button>

      <p className="text-xs text-neutral-400">{notaPendiente}</p>
    </form>
  );
}
