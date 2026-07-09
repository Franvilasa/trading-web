// Todo el copy del bloque "Propuesta de Valor" del Home vive aquí.
// Si cambia el texto o las rutas de los botones, se toca SOLO este archivo.

export const PROPUESTA_VALOR = {
  frases: [
    "Operar mercados financieros con ventaja estadística real es difícil y la mayoría de estrategias discrecionales no sobreviven al ruido.",
    "Este laboratorio aplica econometría, análisis cuantitativo, machine learning e inteligencia artificial al trading algorítmico.",
    "El resultado es un instrumento invertible en Darwinex y un sistema de alertas que documenta un proceso de investigación con resultados verificables.",
  ],

  botones: [
    {
      label: "Ver Track Record",
      href: "/track-record",
    },
    {
      label: "Ver Alertas Operativas",
      href: "/alertas-operativas",
    },
  ],
} as const;
