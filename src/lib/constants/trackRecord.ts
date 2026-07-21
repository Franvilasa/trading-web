// Copy de la página Track Record. El link de Darwinex se reutiliza en
// varios sitios de la página (widgets + botón final), así que vive aquí
// una sola vez.

export const TRACK_RECORD = {
  // DarwinexZero: solo consulta de rendimiento, sin restricción geográfica.
  // Es el enlace que debe verse siempre y desde cualquier país.
  darwinZeroUrl: "https://www.darwinexzero.com/es/darwin/JTBB/performance",

  // Darwinex (invest): plataforma de inversión real. Darwinex la restringe
  // fuera de España, así que solo se ofrece como enlace secundario con nota.
  darwinInvestUrl: "https://www.darwinex.com/es/invest/JTBB",

  contexto:
    "El índice JTBB es el track record público de uno de los modelos sistemáticos de nuestro laboratorio, operando desde 2023 en cuenta real sobre la plataforma de Darwinex. Las métricas que se muestran a continuación no son un backtest, están calculadas y verificadas públicamente por Darwinex a partir de la operativa real ejecutada, sin intervención manual de nuestra parte.",

  invertible:
    "JTBB es a su vez un instrumento invertible, ya que Darwinex lo convierte en un activo negociable (un 'DARWIN'), que cualquier usuario de la plataforma puede comprar o vender directamente, como cualquier instrumento financiero, por ejemplo commodities, acciones, o ETF, con Darwinex como entidad gestora. Goldea Lab no gestiona capital de terceros, pero puedes invertir en nuestro sistema aquí.",

  // Botón principal: consulta de rendimiento, visible para cualquier visitante.
  botonVerPerformance: {
    label: "Ver JTBB en DarwinexZero",
    href: "https://www.darwinexzero.com/es/darwin/JTBB/performance",
  },

  // Enlace secundario, discreto (no botón destacado): invertir de verdad.
  // Restringido geográficamente por Darwinex, de ahí la nota junto al enlace.
  enlaceInvertir: {
    label: "Invertir en JTBB en Darwinex",
    nota: "Disponible solo fuera de España.",
    href: "https://www.darwinex.com/es/invest/JTBB?utm_source=WidgetDarwin&utm_medium=Referral&utm_campaign=CTAInvertible&utm_content=fxhack",
  },
} as const;
