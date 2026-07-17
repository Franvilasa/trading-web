// src/lib/constants/marca.ts
// Datos de marca: nombre y logo, centralizados para no hardcodear en componentes.
//
// El isotipo actual es PROVISIONAL (boceto Recraft/Gemini). Se mantiene el concepto
// compositivo (pluma diagonal → velas japonesas ascendentes) pero el tratamiento visual
// (metalizado, código binario) queda descartado — ver 04-manual-marca.md sección 3.3.
// Pendiente de rediseño profesional a vectorial (SVG) — ver 01-spec-estado-actual.md sección 2.6.
//
// Cuando llegue el logo definitivo: sustituir el archivo en /public/marca/isotipo-goldea.png
// (o .svg) y poner esProvisional en false. No hace falta tocar ningún componente.

export const MARCA = {
  nombre: "GOLDEA",

  logo: {
    // El PNG ya incluye el wordmark "GOLDEA" integrado en la imagen (no se separa símbolo + texto en HTML).
    src: "/marca/isotipo-goldea.png",
    alt: "GOLDEA",
    esProvisional: true,
  },
} as const;
