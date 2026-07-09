// Copy y configuración de la página de Contacto.
// El enlace de LinkedIn sigue pendiente (TODO). El CV se ha retirado por ahora.
// El formulario apunta a un endpoint placeholder: sustituir por la URL real
// de Formspree (o servicio equivalente) cuando exista cuenta/dominio.

export const CONTACTO = {
  titulo: "Contacto",
  intro:
    "Para consultas sobre metodología, colaboraciones o procesos de selección, puedes escribir directamente o revisar el perfil profesional.",

  enlaces: [
    {
      texto: "LinkedIn",
      // TODO: sustituir por la URL real del perfil de LinkedIn
      href: "#",
      pendiente: true,
    },
  ],

  formulario: {
    // TODO: sustituir por la URL real de Formspree/Web3Forms cuando exista cuenta.
    // Formspree: https://formspree.io/f/TU_ID_AQUI
    endpoint: "#",
    campos: {
      nombre: { label: "Nombre", name: "nombre", type: "text" },
      email: { label: "Email", name: "email", type: "email" },
      mensaje: { label: "Mensaje", name: "mensaje" },
    },
    botonLabel: "Enviar",
    notaPendiente:
      "Formulario en construcción: aún no está conectado a ningún servicio de envío.",
  },
} as const;
