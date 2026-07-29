// src/lib/constants/blog/2026-07-29_5_MultipleWelfare_Clubs_across_Countries.ts
// Post generado automaticamente por el puente agente -> blog
// (herramientas/puente_blog.py, repo goldea-agente-redes).
// No editar a mano salvo correccion puntual: la proxima ejecucion del
// agente no vuelve a tocar este archivo, solo crea archivos nuevos.

import type { Post } from "@/lib/types/blog";

export const post_2026_07_29_5_MultipleWelfare_Clubs_across_Countries: Post = {
  titulo: `Más allá del PIB: La fragmentación del bienestar global en clusters de convergencia`,
  subtitulo: `El PIB es insuficiente para medir el desarrollo. Mediante clustering, detectamos que no hay una convergencia global, sino convergence clubs con dinámicas de bienestar diferenciadas.`,
  fecha: "2026-07-29",
  imagen: "/imagenes-blog/2026-07-29_5_MultipleWelfare_Clubs_across_Countries.png",
  hashtags: ["Econometria", "MachineLearning", "Macroeconomia", "DataScience", "QuantitativeResearch"],
  cuerpo: `Tradicionalmente, la macroeconomía busca la la convergencia: la premisa de que las economías con menores niveles de ingresos crecerán a un ritmo superior que las desarrolladas hasta igualar sus niveles de bienestar. Sin embargo, el uso exclusivo del PIB per cápita como proxy de bienestar resulta insuficiente.

Un estudio reciente que analiza la hipótesis de convergencia mediante un índice de bienestar multidimensional (que integra consumo, ocio, esperanza de vida y desigualdad) arroja datos que desafían la narrativa simplista del crecimiento global.

Mediante el uso de unsupervised machine learning (específicamente algoritmos de clustering basados en densidad no paramétrica), la investigación identifica que no existe una convergencia global única, sino la formación de convergence clubs (clubes de convergencia).

Los hallazgos clave son:

1. Fragmentación en clusters: Los países no se desplazan hacia un único punto de equilibrio global, sino que se agrupan en tres clubes distintos con dinámicas de bienestar diferenciadas.
2. Beta vs. Sigma: Se observa una convergencia de tipo beta (los países dentro de un mismo club tienden a reducir su brecha interna), pero esto no garantiza la convergencia de tipo sigma (la dispersión total de la distribución no disminuye).
3. La excepción del núcleo rico: Solo los miembros del club de mayor bienestar muestran una reducción significativa en su dispersión interna, lo que sugiere que la convergencia robusta es un fenómeno limitado a los estratos de mayor nivel de desarrollo.

Conclusión técnica: La convergencia es un fenómeno observado, pero no es un proceso global unificado. Si el análisis se limita a promedios o al PIB, se pierde de vista la estructura real de la distribución del bienestar mundial.`,
};
