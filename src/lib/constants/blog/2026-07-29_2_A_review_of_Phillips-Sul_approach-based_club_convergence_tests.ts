// src/lib/constants/blog/2026-07-29_2_A_review_of_Phillips-Sul_approach-based_club_convergence_tests.ts
// Post generado automaticamente por el puente agente -> blog
// (herramientas/puente_blog.py, repo goldea-agente-redes).
// No editar a mano salvo correccion puntual: la proxima ejecucion del
// agente no vuelve a tocar este archivo, solo crea archivos nuevos.

import type { Post } from "@/lib/types/blog";

export const post_2026_07_29_2_A_review_of_Phillips_Sul_approach_based_club_convergence_tests: Post = {
  titulo: `Boosted HP: reduciendo el sesgo de extremos en la convergencia de unidades`,
  subtitulo: `El *boosted HP* corrige el sesgo de extremos del filtro HP en el métodoской  PS, mejorando el poder del test log‑t y haciendo más fiables los grupos de convergencia, especialmente en muestras pequeñas.`,
  fecha: "2026-07-29",
  imagen: "/imagenes-blog/2026-07-29_2_A_review_of_Phillips-Sul_approach-based_club_convergence_tests.png",
  hashtags: ["Econometría", "Análisis", "ConvergenciaClub", "DataScience", "PSApproach"],
  cuerpo: `📊 ¿Tu panel de datos está “agregado” por el filtro HP?

En el método Phillips‑Sul (PS) la convergencia de unidades se mide a partir de la componente de tendencia extraída de cada serie temporal. Tradicionalmente se emplea el filtro Hodrick‑Prescott (HP). Sin embargo, las observaciones finales tienden a influir en el tramo de tendencia, provocando un sesgo de extremo que sobre‑dimensiona el test log‑t cuando el coeficiente de convergencia \\(\\alpha\\) es pequeño (P(r_T)≈0.3). En series de muestra corta, este sesgo provoca la generación de un exceso de grupos de convergencia o el rechazo de la convergencia aunque existan grupos verdaderos.

🔧 En 2021, Phillips y Shi propusieron el *boosted HP filter*: se aplica el filtro HP repetidamente hasta que los rez sleeves cíclicos queden eliminados. El resultado es:

- Suavizado perfecto de la tendencia, eliminando el sesgo de los extremos.
- No es necesario transformar arbitrariamente el tamaño inicial del panel; se puede usar la serieフソ completa devuelta.
- Mejora significativa del poder del test log‑.Entity en muestras pequeñas (P(r_T) < 0.3).

📈 Tomal (2022) aplicó el *boosted HP* en rentas de alquiler y halló que los clubes identificados eran más coherentes con la teoría de convergencia y menos sensibles a las decisiones de filtrado.

**Conclusión**
Si utilizMuon el método PS, optar por el *boosted HP* reduce la incertidumbre derivada del filtro, te permite usar todas las observaciones disponibles y hace que tus conclusiones sobre los clubes de convergencia sean más fiables.

#Econometría #Análisis #ConvergenciaClub #DataScience #PSApproach`,
};
