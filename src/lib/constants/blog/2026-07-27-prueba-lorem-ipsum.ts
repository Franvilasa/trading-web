// src/lib/constants/blog/2026-07-27-prueba-lorem-ipsum.ts
// Post de PRUEBA (datos lorem ipsum) para construir y probar la plantilla
// del blog antes de conectar contenido real generado por el agente.
// Sigue el contrato definido en src/lib/types/blog.ts (type Post).

import type { Post } from "@/lib/types/blog";

export const post_2026_07_27_prueba_lorem_ipsum: Post = {
  // Primera línea de linkedin.txt (versión más completa) → título del post
  titulo: "Lorem ipsum dolor sit amet consectetur adipiscing elit",

  // Contenido de x.txt (versión corta) → usado SOLO en feed y carrusel,
  // no se muestra dentro de la página del post individual (decisión de sesión).
  subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",

  fecha: "2026-07-27",

  // Imagen ya compuesta por el agente (recorte de portada + logo, composicion.py)
  imagen: "/imagenes-blog/prueba-1.png",

  hashtags: ["ia", "papers", "econometria"],

  // Cuerpo largo, líneas intermedias de linkedin.txt (ya revisado por el agente Revisor)
  cuerpo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
};
