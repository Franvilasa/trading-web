// src/components/blog/PlantillaPost.tsx
// Plantilla visual de un post individual del blog. Define UNA sola vez
// cómo se ve un post (banner, título, imagen, cuerpo, hashtags) y se
// reutiliza para todos los posts que vayan llegando (reales o de prueba).
// Hereda el sistema de diseño existente del sitio (tokens de globals.css),
// no inventa colores ni fuentes nuevas.

import type { Post } from "@/lib/types/blog";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PlantillaPost({ post }: Props) {
  // El cuerpo viene como texto con párrafos separados por línea en blanco.
  // Lo partimos aquí para poder pintar cada párrafo en su propia etiqueta <p>.
  const parrafos = post.cuerpo.split("\n\n");

  return (
    <article className="bg-bg text-ink">
      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Botón volver — ya apunta al feed real del blog. */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-signal transition-colors mb-6"
        >
          ← Volver
        </Link>

        {/* Cabecera de marca: mismo banner para todos los posts por ahora.
            PENDIENTE (asset, no código): el banner actual trae el wordmark
            "Goldea" incrustado. Si se oculta el navbar en las páginas del
            blog (ver conversación), la redundancia con el isotipo del
            navbar desaparece sola. Se muestra completo, sin recortar arriba
            ni abajo, y a la misma anchura que el resto del contenido del
            post — no a todo el ancho de la pantalla. */}
        <img
          src="/imagenes-blog/banner-goldea.png"
          alt="Goldea"
          className="w-full h-auto rounded mb-8"
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-10">
        {/* Título y fecha, en un bloque de color oscuro con texto claro:
            es el único momento "fuerte" de color de la página — el resto
            se mantiene sobrio a propósito (ver frontend-design: "spend
            your boldness in one place"). Sin subtítulo aquí (decisión de
            sesión: el subtítulo solo se usa en el feed y en el carrusel
            del home). */}
        <header className="mb-8 bg-ink rounded px-6 py-8">
          <p className="font-mono text-xs uppercase tracking-wider text-vela-alcista mb-3">
            Investigación
          </p>
          <h1 className="text-3xl font-bold leading-tight mb-2 text-bg">
            {post.titulo}
          </h1>
          <p className="font-mono text-sm text-bg/60">{post.fecha}</p>
        </header>

        {/* Imagen propia del post: el recorte de portada + logo que genera
            el agente (herramientas/composicion.py) cuando el origen es un
            paper. Cuando el origen es la lista manual de temas, no hay
            imagen — 'imagen' es opcional en type Post — y se muestra un
            fallback sobrio en vez de romper el layout o dejar un hueco. */}
        {post.imagen ? (
          <>
            <div className="mb-2 relative rounded overflow-hidden border border-line">
              <img src={post.imagen} alt={post.titulo} className="w-full h-auto" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <p className="font-mono text-xs text-muted mb-8">
              Portada del paper de origen
            </p>
          </>
        ) : (
          <div className="mb-8 rounded border border-line border-dashed py-10 flex items-center justify-center">
            <p className="font-mono text-xs text-muted uppercase tracking-wider">
              Goldea · Investigación
            </p>
          </div>
        )}

        {/* Cuerpo del post, un párrafo por bloque */}
        <div className="space-y-4 leading-relaxed">
          {parrafos.map((parrafo, indice) => (
            <p key={indice}>{parrafo}</p>
          ))}
        </div>

        {/* Hashtags al final, como etiquetas con color de marca en vez de
            texto gris plano — mismo tono que usan las velas alcistas en
            los gráficos (--vela-alcista), para que el color no sea
            decorativo suelto sino coherente con el resto del sitio. */}
        <footer className="mt-10 pt-6 border-t border-line flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-1 rounded-full bg-vela-alcista/10 text-vela-alcista"
            >
              #{tag}
            </span>
          ))}
        </footer>
      </div>
    </article>
  );
}
