// src/lib/constants/blog/2026-08-27_public_debt_and_economic_growth_is_there_a_causal_effect.ts
// Post generado automaticamente por el puente agente -> blog
// (herramientas/puente_blog.py, repo goldea-agente-redes).
// No editar a mano salvo correccion puntual: la proxima ejecucion del
// agente no vuelve a tocar este archivo, solo crea archivos nuevos.

import type { Post } from "@/lib/types/blog";

export const post_2026_08_27_public_debt_and_economic_growth_is_there_a_causal_effect: Post = {
  titulo: `Deuda pública y crecimiento: la endogeneidad que desmonta la falacia causal`,
  subtitulo: `Asumir que una mayor deuda pública penaliza el crecimiento es un sesgo por endogeneidad. Al corregir la causalidad inversa con Variables Instrumentales, la relación negativa desaparece. En modelos cuantitativos, la correlación no implica causalidad.`,
  fecha: "2026-08-27",
  imagen: "/imagenes-blog/2026-08-27_public_debt_and_economic_growth_is_there_a_causal_effect.png",
  hashtags: ["Econometria", "FinanzasCuantitativas", "Macroeconomia", "Investigacion"],
  cuerpo: `En el análisis econométrico cuantitativo, confundir correlación con causalidad invalida la inferencia estadística y el diseño de modelos. El estudio de Panizza y Presbitero aborda la endogeneidad en la relación entre el ratio deuda/PIB y el crecimiento en economías de la OCDE. Aunque la estimación por Mínimos Cuadrados Ordinarios muestra una asociación negativa donde un incremento de 10 puntos porcentuales en la deuda se asocia con una reducción de 15 a 18 puntos básicos en el crecimiento, medir la deuda sobre PIB introduce correlación negativa mecánica y causalidad inversa. Al aplicar una estrategia de Variables Instrumentales basada en el efecto valoración de la deuda en moneda extranjera, la relación negativa desaparece por completo y pierde significatividad estadística. Para la construcción de modelos cuantitativos, tratar la endogeneidad resulta imprescindible para evitar sesgos estructurales.`,
};
