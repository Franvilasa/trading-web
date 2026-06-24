// Todo el copy y los datos de la sección "Alertas Operativas" vive aquí.
// Si cambia el nombre del sistema, el precio o el texto, se toca SOLO este archivo.

export const ALERTAS_OPERATIVAS = {
  slug: "alertas-operativas",
  navLabel: "Alertas Operativas",

  hero: {
    eyebrow: "Avisos en tiempo real",
    titulo: "Cuándo el sistema abre o cierra una posición, lo sabes en el instante en que ocurre.",
    cuerpo:
      "FX-Quant Lab es uno de los modelos del laboratorio, operando de forma sistemática. Este canal no muestra precios, volúmenes ni niveles de stop loss o take profit: únicamente el instante en que el sistema actúa. Su único objetivo es educativo e informativo.",
    notaSeparacionLegal:
      "El track record auditado del laboratorio se publica de forma independiente en la sección Track Record. Este canal no debe confundirse con una invitación a invertir ni con el rendimiento real de ninguna cuenta.",
  },

  ejemplo: {
    titulo: "Así llega un aviso",
    imagen: "/alertas-operativas/ejemplo-mensaje.png",
    alt: "Ejemplo de aviso del sistema FX-Quant Lab: apertura de posición corta en EURUSD con fecha y hora exactas, sin precio ni volumen.",
    pie: "Ejemplo ilustrativo de interfaz. No es una captura de un canal activo.",
  },

  demoEnVivo: {
    titulo: "El sistema, en directo",
    disclaimer:
      "Simulación ilustrativa. Los precios, velas y señales se generan aleatoriamente con fines demostrativos y no reflejan operativa ni datos reales.",
  },

  sistema: {
    nombre: "FX-Quant Lab",
    handle: "GOLDEA_Sistemas@NQ_L_S_01",
    descripcion:
      "Modelo sistemático intradía/swing sobre pares de divisas. Genera avisos de apertura y cierre de posición sin parámetros de ejecución.",
  },

  planes: {
    moneda: "EUR",
    mensual: {
      label: "Mensual",
      precio: 33,
      sufijo: "/mes",
      detalle: "Facturado mensualmente",
      nota: "Impuestos no incluidos",
    },
    anual: {
      label: "Anual",
      precio: 330,
      sufijo: "/año",
      detalle: "Facturado una vez al año",
      nota: "Equivalente a 2 meses sin coste frente al plan mensual",
      destacado: true,
    },
    incluye: [
      "Acceso a los avisos del sistema FX-Quant Lab",
      "Apertura y cierre de posición, con fecha y hora exactas",
      "Sin precio, volumen ni niveles de stop loss / take profit",
    ],
    ctaLabel: "Quiero acceso",
  },

  disclaimerPrecios:
    "Precio orientativo. El servicio está en fase de validación y todavía no se encuentra operativo: ningún pago se procesa al pulsar este botón. Cuando esté disponible, su contenido seguirá siendo exclusivamente educativo e informativo, sin constituir asesoramiento ni recomendación de inversión.",

  modalInteres: {
    titulo: "Gracias por tu interés",
    cuerpo:
      "Estamos validando este servicio antes de abrirlo. En cuanto esté listo, lo anunciaremos en el laboratorio.",
    cierreLabel: "Entendido",
  },
} as const;
