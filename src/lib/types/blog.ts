// src/lib/types/blog.ts
// Contrato compartido: todo post del blog debe cumplir esta forma.
// Lo usan tanto los archivos de post individuales (src/lib/constants/blog/*.ts)
// como los componentes que los consumen (plantilla de post, PostCard).

export type Post = {
  titulo: string;      // versión LinkedIn (la más completa) — título del artículo
  subtitulo: string;   // versión X reutilizada como bajada/excerpt
  fecha: string;        // formato "YYYY-MM-DD", ej. "2026-07-27"
  imagen?: string;        // ruta pública, ej. "/imagenes-blog/2026-07-27-nombre-del-paper.png"
  hashtags: string[];     // ej. ["ia", "papers"]
  cuerpo: string;          // cuerpo largo del post (texto de LinkedIn ya revisado)
};
