// Copy de la página Track Record. El link de Darwinex se reutiliza en
// varios sitios de la página (widgets + botón final), así que vive aquí
// una sola vez.

export const TRACK_RECORD = {
  darwinUrlBase: "https://www.darwinex.com/es/invest/JTBB",

  contexto:
    "El índice JTBB es el track record público de uno de los modelos sistemáticos de nuestro laboratorio, operando desde 2023 en cuenta real sobre la plataforma de Darwinex. Las métricas que se muestran a continuación no son un backtest, están calculadas y verificadas públicamente por Darwinex a partir de la operativa real ejecutada, sin intervención manual de nuestra parte.",

  invertible:
    "JTBB es a su vez un instrumento invertible, ya que Darwinex lo convierte en un activo negociable (un 'DARWIN'), que cualquier usuario de la plataforma puede comprar o vender directamente, como cualquier instrumento financiero, por ejemplo commodities, acciones, o ETF, con Darwinex como entidad gestora. Goldea Lab no gestiona capital de terceros, pero puedes invertir en nuestro sistema aquí.",

  botonInvertir: {
    label: "Ver JTBB en Darwinex",
    href: "https://www.darwinex.com/es/invest/JTBB?utm_source=WidgetDarwin&utm_medium=Referral&utm_campaign=CTAInvertible&utm_content=fxhack",
  },
} as const;
