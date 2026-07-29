// src/lib/constants/blog/2026-07-29_4_Economic_Transition_and_Growth.ts
// Post generado automaticamente por el puente agente -> blog
// (herramientas/puente_blog.py, repo goldea-agente-redes).
// No editar a mano salvo correccion puntual: la proxima ejecucion del
// agente no vuelve a tocar este archivo, solo crea archivos nuevos.

import type { Post } from "@/lib/types/blog";

export const post_2026_07_29_4_Economic_Transition_and_Growth: Post = {
  titulo: `El error de las regresiones de Solow y la trampa de la convergencia aparente`,
  subtitulo: `Las regresiones de Solow pueden fallar al medir la convergencia económica si hay heterogeneidad tecnológica. Esto puede crear falsos positivos de divergencia que ocultan procesos de transición o convergence clubs.`,
  fecha: "2026-07-29",
  imagen: "/imagenes-blog/2026-07-29_4_Economic_Transition_and_Growth.png",
  hashtags: ["Econometría", "CrecimientoEconómico", "InvestigaciónCuantitativa", "DataScience", "Macroeconomía"],
  cuerpo: `Uno de los pilares de la macroeconomía clásica es la hipótesis de convergencia: la premisa de que las economías con menor nivel de ingresos crecerán a un ritmo superior al de las economías avanzadas hasta alcanzar un equilibrio. Sin embargo, la evidencia empírica suele ser mucho más compleja y, con frecuencia, los métodos estándar para medirla presentan errores estructurales.

En su estudio Economic Transition and Growth (Journal of Applied Econometrics), Phillips y Sul demuestran que las regresiones de Solow aumentadas —el estándar en la literatura— suelen ser inconsistentes cuando existe heterogeneidad en el progreso tecnológico.

¿Por qué importa este matiz técnico?

Si el ritmo de avance tecnológico no es uniforme y varía en el tiempo y entre países, la velocidad de convergencia deja de ser una constante para convertirse en una función de la trayectoria tecnológica previa. Esto genera dos problemas críticos en la econometría del crecimiento:

1. Sesgo por variables omitidas: El error de la regresión absorbe términos de tecnología que están correlacionados con el ingreso, invalidando las inferencias sobre si un país se está acercando o alejando de su estado estacionario.
2. Falsos positivos de divergencia: Un modelo puede sugerir que las economías están divergiendo cuando, en realidad, lo que ocurre es una transición hacia diferentes convergence clubs (grupos de economías que convergen entre sí, pero se alejan del promedio global).

Los autores proponen un enfoque basado en curvas de transición relativa. Este método permite distinguir entre una divergencia real y una fase de transición o la existencia de dichos grupos de convergencia.

Para los investigadores de datos y economistas cuantitativos, la lección es clara: antes de concluir que el crecimiento mundial está altamente fragmentado, es necesario asegurar que el modelo no esté confundiendo la heterogeneidad tecnológica con una divergencia estructural.`,
};
