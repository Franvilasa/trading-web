// Contenido del Aviso Legal.
// Los datos de identificación de empresa son PLACEHOLDERS: la sociedad todavía
// no está constituida. No usar estos datos como reales bajo ningún concepto.
// Cuando exista la entidad real, sustituir SOLO el bloque "identificacion".

export const LEGAL = {
  titulo: "Aviso Legal",

  identificacion: {
    // TODO: pendiente de decidir forma jurídica y jurisdicción (España: S.L. / autónomo;
    // u otra jurisdicción si se decide constituir fuera de España).
    denominacion: "GOLDEA Lab [forma jurídica pendiente]",
    nif: "[NIF/CIF pendiente]",
    domicilio: "[domicilio social pendiente]",
    registro: "[inscripción registral pendiente]",
    pendiente: true,
  },

  secciones: [
    {
      titulo: "Objeto y aceptación",
      texto:
        "Este aviso legal regula el acceso y uso de este sitio web. Navegar por él implica la aceptación de las condiciones aquí descritas. El uso del sitio debe ajustarse a la ley, la buena fe y el orden público.",
    },
    {
      titulo: "Identificación",
      // Esta sección se renderiza aparte usando "identificacion" arriba.
      texto: "",
    },
    {
      titulo: "Condiciones de acceso y uso",
      texto:
        "El acceso al sitio es libre. El uso de determinados formularios o servicios puede requerir la cumplimentación previa de los datos solicitados. El usuario garantiza la veracidad de los datos que facilite y se compromete a hacer un uso adecuado del sitio: no introducir contenido ilícito, no intentar vulnerar la seguridad del sitio, y no reproducir ni distribuir sus contenidos sin autorización.",
    },
    {
      titulo: "Propiedad intelectual e industrial",
      texto:
        "Los contenidos de este sitio (textos, gráficos, código, diseño, metodología descrita) son propiedad de su titular o se usan con la correspondiente autorización. Queda prohibida su reproducción, distribución o comunicación pública sin permiso expreso, salvo el uso estrictamente necesario para la navegación normal del sitio.",
    },
    {
      titulo: "Enlaces a terceros",
      texto:
        "Este sitio incluye enlaces a plataformas de terceros (como Darwinex) sobre las que no se ejerce control ni responsabilidad. La existencia de un enlace no implica relación, recomendación ni respaldo entre las partes salvo que se indique expresamente.",
    },
    {
      titulo: "Exclusión de responsabilidad",
      texto:
        "No se garantiza la disponibilidad continua del sitio ni la ausencia de errores. El titular del sitio no asume responsabilidad por daños derivados del uso incorrecto del sitio por parte de terceros, ni por el contenido de sitios enlazados que no gestiona directamente.",
    },
    {
      titulo: "Legislación aplicable",
      texto:
        "[Pendiente de confirmar jurisdicción según el lugar de constitución de la entidad]. En tanto no se determine lo contrario, cualquier controversia relativa a este sitio se entenderá sometida a la legislación española.",
    },
  ],

  disclaimersCNMV: {
    titulo: "Advertencias sobre riesgo e inversión",
    items: [
      "Las rentabilidades pasadas no garantizan resultados futuros. Toda la información sobre resultados mostrada en este sitio es de carácter informativo.",
      "Este sitio no presta servicios de inversión ni de asesoramiento financiero. La gestión y ejecución de cualquier instrumento invertible mostrado (DARWIN) corresponde exclusivamente a Darwinex, entidad regulada independiente de este laboratorio.",
      "La sección Alertas Operativas tiene un propósito exclusivamente educativo e informativo. No constituye recomendación de inversión, no incluye precios, volúmenes ni niveles de stop loss / take profit, y no debe interpretarse como invitación a operar ni a invertir.",
      "El track record mostrado en la sección Track Record y cualquier comunicación de Alertas Operativas son informaciones legalmente independientes entre sí y no deben confundirse.",
    ],
  },

  privacidadYCookies: {
    titulo: "Privacidad y cookies",
    texto:
      "[Pendiente de redactar conforme al RGPD: tratamiento de datos del formulario de contacto, finalidad, plazo de conservación, derechos del usuario, y uso de cookies técnicas/analíticas si se incorporan en el futuro.]",
    pendiente: true,
  },
} as const;
