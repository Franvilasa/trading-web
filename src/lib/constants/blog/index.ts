// src/lib/constants/blog/index.ts
// Reúne todos los posts del blog en un solo array, cada uno con su slug
// (el identificador que va en la URL, ej. /blog/2026-07-27-prueba-lorem-ipsum).
//
// El slug se deriva del nombre del archivo del post, no se escribe a mano
// dentro de cada post — así nunca hay que recordar añadirlo, y como el
// nombre de archivo ya incluye fecha + nombre del paper (ver spec del
// agente), ya es único por diseño.
//
// Cuando llegue un post nuevo: 1) importarlo aquí, 2) añadir una línea al
// array de abajo con su slug (= nombre del archivo sin ".ts").

import type { Post } from "@/lib/types/blog";
import { post_2026_07_29_10_Country_and_industry_convergence_of_equity } from "./2026-07-29_10_Country_and_industry_convergence_of_equity";
import { post_2026_07_29_1_Phillips_Sul_Transition_Modeling_and_Econometric_Convergence_Tests } from "./2026-07-29_1_Phillips-Sul_Transition_Modeling_and_Econometric_Convergence_Tests";
import { post_2026_07_29_2_A_review_of_Phillips_Sul_approach_based_club_convergence_tests } from "./2026-07-29_2_A_review_of_Phillips-Sul_approach-based_club_convergence_tests";
import { post_2026_07_29_3_ConvergenceClubs__A_Package_for_Performing_the_Phillips_and_Suls_R_Studio } from "./2026-07-29_3_ConvergenceClubs__A_Package_for_Performing_the_Phillips_and_Suls_R_Studio";
import { post_2026_07_29_4_Economic_Transition_and_Growth } from "./2026-07-29_4_Economic_Transition_and_Growth";
import { post_2026_07_29_5_MultipleWelfare_Clubs_across_Countries } from "./2026-07-29_5_MultipleWelfare_Clubs_across_Countries";
import { post_2026_07_29_6_Analysis_of_club_convergence_for_economies } from "./2026-07-29_6_Analysis_of_club_convergence_for_economies";
import { post_2026_07_30_7_Convergence_or_divergence_patterns_in_income_distribution_across_countries } from "./2026-07-30_7_Convergence_or_divergence_patterns_in_income_distribution_across_countries";
import { post_2026_08_03_8_clubes_desindustrializacion } from "./2026-08-03_8_clubes_desindustrializacion";
import { post_2026_08_10_9_Per_capita_carbon_dioxide_emissions_across_U_S_states_by_sector_and } from "./2026-08-10_9_Per_capita_carbon_dioxide_emissions_across_U_S_states_by_sector_and";

// Un post, pero con su slug ya calculado y adjunto.
export type PostConSlug = Post & { slug: string };

export const posts: PostConSlug[] = [
  {
    ...post_2026_08_10_9_Per_capita_carbon_dioxide_emissions_across_U_S_states_by_sector_and,
    slug: "2026-08-10_9_Per_capita_carbon_dioxide_emissions_across_U_S_states_by_sector_and",
  },
  {
    ...post_2026_08_03_8_clubes_desindustrializacion,
    slug: "2026-08-03_8_clubes_desindustrializacion",
  },
  {
    ...post_2026_07_30_7_Convergence_or_divergence_patterns_in_income_distribution_across_countries,
    slug: "2026-07-30_7_Convergence_or_divergence_patterns_in_income_distribution_across_countries",
  },
  {
    ...post_2026_07_29_6_Analysis_of_club_convergence_for_economies,
    slug: "2026-07-29_6_Analysis_of_club_convergence_for_economies",
  },
  {
    ...post_2026_07_29_5_MultipleWelfare_Clubs_across_Countries,
    slug: "2026-07-29_5_MultipleWelfare_Clubs_across_Countries",
  },
  {
    ...post_2026_07_29_4_Economic_Transition_and_Growth,
    slug: "2026-07-29_4_Economic_Transition_and_Growth",
  },
  {
    ...post_2026_07_29_3_ConvergenceClubs__A_Package_for_Performing_the_Phillips_and_Suls_R_Studio,
    slug: "2026-07-29_3_ConvergenceClubs__A_Package_for_Performing_the_Phillips_and_Suls_R_Studio",
  },
  {
    ...post_2026_07_29_2_A_review_of_Phillips_Sul_approach_based_club_convergence_tests,
    slug: "2026-07-29_2_A_review_of_Phillips-Sul_approach-based_club_convergence_tests",
  },
  {
    ...post_2026_07_29_1_Phillips_Sul_Transition_Modeling_and_Econometric_Convergence_Tests,
    slug: "2026-07-29_1_Phillips-Sul_Transition_Modeling_and_Econometric_Convergence_Tests",
  },
  {
    ...post_2026_07_29_10_Country_and_industry_convergence_of_equity,
    slug: "2026-07-29_10_Country_and_industry_convergence_of_equity",
  },
]
  // Más nuevo primero, por fecha — así el feed y el carrusel no tienen
  // que ordenar nada por su cuenta, ya llega ordenado desde aquí.
  .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

// Busca un post por su slug. Devuelve undefined si no existe
// (ej. alguien entra a una URL de post que ya no existe).
export function buscarPostPorSlug(slug: string): PostConSlug | undefined {
  return posts.find((post) => post.slug === slug);
}
