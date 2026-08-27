// src/lib/constants/blog/2026-08-27_Games_and_economic_behaviour.ts
// Post generado automaticamente por el puente agente -> blog
// (herramientas/puente_blog.py, repo goldea-agente-redes).
// No editar a mano salvo correccion puntual: la proxima ejecucion del
// agente no vuelve a tocar este archivo, solo crea archivos nuevos.

import type { Post } from "@/lib/types/blog";

export const post_2026_08_27_Games_and_economic_behaviour: Post = {
  titulo: `La intuición nos engaña: información privilegiada no implica manipulación rentable`,
  subtitulo: `La intuición dice que información privilegiada = manipulación rentable. Peck (2014) lo desmiente: en equilibrio, bulls compran caro y venden barato. Los no informados ganan. El proceso de formación de precios importa.`,
  fecha: "2026-08-27",
  imagen: "/imagenes-blog/2026-08-27_Games_and_economic_behaviour.png",
  hashtags: ["FinanzasCuantitativas", "MicroestructuraDeMercado", "TeoríaDeJuegos", "InformaciónAsimétrica", "InvestigaciónEconómica"],
  cuerpo: `La intuición nos dice que quien tiene información privilegiada puede manipular el mercado a su favor. El modelo de James Peck (2014) lo desmiente.

En un juego de mercado estratégico con dos períodos, traders informados (bulls) con posición larga en el activo intentan manipular el precio en período 1 para influir en las creencias de los consumidores no informados. Compran para hacer creer que el activo vale más, elevando así el precio en período 2.

Lo que ocurre en equilibrio es exactamente lo opuesto a lo esperado. Los bulls compran en período 1, pero el precio revela el estado de naturaleza. Los consumidores corrigen sus expectativas. El precio en período 1 es siempre superior al de período 2: p1(θ) > p2(θ). Los bulls incurren en pérdidas de arbitraje: compran caro, venden barato.

Mientras tanto, los bears y consumidores no informados venden en período 1 hasta sus límites de venta corta y obtienen ganancias.

El resultado más notable: cuando todos son racionales, la parte no restringida del mercado está en desventaja. Si se eliminan las restricciones de venta corta, no existe equilibrio completamente revelador. La batalla entre bulls y bears intentando manipular en direcciones opuestas genera una escalada sin solución de equilibrio con ofertas y bids finitos.

Esto contrasta con los modelos de noise traders, donde traders informados siempre se benefician a costa de los no informados.

¿La conclusión? La racionalidad completa de los agentes no garantiza que la información privilegiada sea rentable. El proceso de formación de precios importa.`,
};
