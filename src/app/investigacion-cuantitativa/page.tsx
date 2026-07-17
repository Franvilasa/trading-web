// ============================================================================
// PÁGINA: Investigación Cuantitativa
// Ruta del archivo en el proyecto: src/app/investigacion-cuantitativa/page.tsx
// ============================================================================
// Qué hace esta página: muestra el bloque introductorio (posicionamiento)
// y una lista apilada de 6 tarjetas, una por categoría de conocimiento. Cada
// tarjeta tiene: icono + título + frase corta + tags (columna izquierda) y
// un carrusel de imágenes/vídeo con su propio subtítulo por slide (columna
// derecha).
//
// Contenido y decisiones de esta página: ver spec 02.2
// (02.2-spec-investigacion-cuantitativa.md).
//
// Rediseño (sesión 2026-07-17, ver 02.2 sección 7):
// - Se corrige el bug de la imagen rota de "Visualización de clusters":
//   el archivo real es .jpg, no .png (spec original: visualizacion_cluster.JPG).
// - Cada categoría gana icono, frase de una línea y tags — antes solo había
//   un título flotando junto al carrusel.
// - ICONOS PROPIOS: coloca tus archivos en public/investigacion/iconos/
//   con el nombre de archivo indicado en cada categoría (ajusta la extensión
//   si tus iconos son .png en vez de .svg). Son decorativos (aria-hidden).
// ============================================================================

import CarruselCategoria, { ItemCarrusel } from "@/components/CarruselCategoria";
import IndiceCategorias from "@/components/IndiceCategorias";
// Nota: el "@/" es un alias que en Next.js suele apuntar a la carpeta "src/".
// Si en tu proyecto los componentes viven en otra ruta, dime y ajustamos los imports.

export const metadata = {
  title: "Investigación Cuantitativa — Lab Cuantitativo",
  descripcion:
    "Metodología y conocimiento técnico aplicado: machine learning, econometría, predicción, teoría de juegos y trading cuantitativo.",
};

// ============================================================================
// DATOS DE CONTENIDO
// 6 categorías (Modelos Econométricos y Predicción se separaron en sesión
// 2026-06-24 por desequilibrio de material — ver spec 02.2, sección 3).
//
// IMPORTANTE — nomenclatura de archivos de imagen/vídeo:
// Las imágenes originales del usuario tienen nombres con espacios/tildes.
// Al colocarlas en public/investigacion/ hay que RENOMBRARLAS siguiendo el
// slug indicado en el comentario de cada item, MANTENIENDO la extensión
// real del archivo (.jpg sigue siendo .jpg, no lo conviertas a .png "de
// oído" — así se coló el bug de "visualizacion_cluster").
// ============================================================================
type Categoria = {
  titulo: string;
  /** Identificador corto usado como ancla de scroll (id="cat-{slug}"). */
  slug: string;
  /** Ruta del icono propio del usuario. Decorativo (aria-hidden). */
  icono: string;
  /** Frase de una línea, explica qué es la categoría. */
  frase: string;
  /** 2-3 tags cortos en mayúsculas/mono, técnicas o herramientas asociadas. */
  tags: string[];
  items: ItemCarrusel[];
};

const categorias: Categoria[] = [
  {
    titulo: "Machine Learning",
    slug: "machine-learning",
    icono: "/investigacion/iconos/icon-ml.svg",
    frase: "Aprendizaje supervisado y no supervisado aplicado a datos reales.",
    tags: ["Regresión", "Clustering", "Validación cruzada"],
    items: [
      // decision tree.png
      { imagen: "/investigacion/ml-01-decision-tree.png", subtitulo: "Ejemplo de árbol de decisión" },
      // lasso_cv_validation_curves.png
      { imagen: "/investigacion/ml-02-lasso-cv.png", subtitulo: "Validación cruzada de un modelo Lasso" },
      // lasso_predictions_vs_real.png
      { imagen: "/investigacion/ml-03-lasso-predicciones.png", subtitulo: "Predicciones Lasso frente a valores reales" },
      // segmentacion con Kmeans.PNG
      { imagen: "/investigacion/ml-04-kmeans.png", subtitulo: "Caso de uso de segmentación con K-means" },
      // visualizacion_cluster.JPG — OJO: archivo real en .jpg, no .png (bug corregido)
      { imagen: "/investigacion/ml-05-cluster.jpg", subtitulo: "Visualización de clusters" },
    ],
  },
  {
    titulo: "Deep Learning e IA",
    slug: "deep-learning-ia",
    icono: "/investigacion/iconos/icon-genai.svg",
    frase: "Redes neuronales aplicadas a series temporales y clasificación.",
    tags: ["CNN", "Backpropagation", "PyTorch"],
    items: [
      // diagrama redes neuronales.PNG
      { imagen: "/investigacion/dl-01-arquitectura.png", subtitulo: "Arquitectura de una red neuronal" },
      // Ciclo de entrenamiento de una convolución.PNG
      { imagen: "/investigacion/dl-02-ciclo-convolucion.png", subtitulo: "Ciclo de entrenamiento de una red convolucional" },
      // codigo entrenamiento red neuronal.PNG
      { imagen: "/investigacion/dl-03-codigo-entrenamiento.png", subtitulo: "Código de entrenamiento de una red neuronal" },
      // comparaciones predictivas con deep learning sobre datos historicos.PNG
      { imagen: "/investigacion/dl-04-comparativa-predictiva.png", subtitulo: "Comparativa predictiva con deep learning" },
      // test comparacion lasso vs nn.PNG
      { imagen: "/investigacion/dl-05-lasso-vs-nn.png", subtitulo: "Lasso frente a red neuronal" },
    ],
  },
  {
    titulo: "Modelos Econométricos",
    slug: "modelos-econometricos",
    icono: "/investigacion/iconos/icon-econometria.svg",
    frase: "Especificación, diagnóstico y validación de series temporales.",
    tags: ["ARIMA", "GARCH", "VAR"],
    items: [
      // analisisi de residuos Ljung-Box sobre Holt-Winters.PNG
      { imagen: "/investigacion/econometria-01-ljungbox-holtwinters.png", subtitulo: "Test de residuos sobre un modelo Holt-Winters" },
      // extracto expresiones mates.PNG (Cholesky / IRF de un VAR)
      { imagen: "/investigacion/econometria-02-var-irf.png", subtitulo: "Funciones de impulso-respuesta de un modelo VAR" },
      // correlogramas.PNG
      { imagen: "/investigacion/econometria-03-correlogramas.png", subtitulo: "Ejemplo de correlograma" },
      // especificaciones codigo R modelos GMM.PNG
      { imagen: "/investigacion/econometria-04-gmm-r.png", subtitulo: "Especificación en R de un modelo GMM" },
      // analisis efectos EGARCH en el Ibex.PNG
      { imagen: "/investigacion/econometria-05-egarch-ibex.png", subtitulo: "Modelo EGARCH aplicado al Ibex" },
    ],
  },
  {
    titulo: "Predicción",
    slug: "prediccion",
    icono: "/investigacion/iconos/icon-prediccion.svg",
    frase: "Forecast aplicado a variables macroeconómicas y financieras.",
    tags: ["Forecast", "Contrafactual", "Convergencia"],
    items: [
      // prediciciones sobre variables macroeconomicas.PNG
      { imagen: "/investigacion/prediccion-01-variables-macro.png", subtitulo: "Predicción de variables macroeconómicas" },
      // prediccion arima.PNG
      { imagen: "/investigacion/prediccion-02-arima.png", subtitulo: "Ejemplo de predicción ARIMA" },
      // curvas de transicion clubes convergencia.PNG
      { imagen: "/investigacion/prediccion-03-curvas-transicion.png", subtitulo: "Caso de uso de curvas de transición" },
      // construccion de serie contrafactual en ausencia de datos.PNG
      { imagen: "/investigacion/prediccion-04-serie-contrafactual.png", subtitulo: "Construcción de una serie contrafactual" },
      // analisis variables macro.PNG
      { imagen: "/investigacion/prediccion-05-analisis-macro.png", subtitulo: "Análisis de variables macro" },
    ],
  },
  {
    titulo: "Teoría de Juegos",
    slug: "teoria-de-juegos",
    icono: "/investigacion/iconos/icon-abm.svg",
    frase: "Modelos basados en agentes y equilibrios estratégicos.",
    tags: ["ABM", "Payoff", "Bayesiano"],
    items: [
      // parametrizacion inicial de ABM.PNG
      { imagen: "/investigacion/juegos-01-abm-parametrizacion.png", subtitulo: "Parametrización de un modelo basado en agentes" },
      // simulaciones de un AMB emergencia de patrones.PNG
      { imagen: "/investigacion/juegos-02-abm-simulacion.png", subtitulo: "Emergencia de patrones en una simulación ABM" },
      // matriz de pagos ABM1.PNG
      { imagen: "/investigacion/juegos-03-matriz-pagos.png", subtitulo: "Ejemplo de matriz de pagos" },
      // representacion de juego bayesiano solo 2 jugadores.PNG
      { imagen: "/investigacion/juegos-04-juego-bayesiano.png", subtitulo: "Representación de un juego bayesiano" },
      // Nota: 4 items, no 5 — aceptado así (spec 02.2, sección 4.5).
      // Ampliable más adelante sin tocar el componente.
    ],
  },
  {
    titulo: "Probabilidad y Trading Cuantitativo",
    slug: "probabilidad-trading",
    icono: "/investigacion/iconos/icon-trading.svg",
    frase: "Probabilidad condicionada aplicada a un bot de trading real.",
    tags: ["Logit", "Backtesting", "Gestión de riesgo"],
    items: [
      // codigo bot y mt5 operando.PNG
      { imagen: "/investigacion/trading-01-bot-mt5.png", subtitulo: "Bot de trading operando sobre MT5" },
      // pantallazo bot operando.PNG
      { imagen: "/investigacion/trading-02-bot-operando.png", subtitulo: "Bot en ejecución en tiempo real" },
      // pantallazo bot operando2.PNG
      { imagen: "/investigacion/trading-03-bot-operando-2.png", subtitulo: "Otro ejemplo de operativa del bot" },
      // pantallazo snipet order manager.PNG
      { imagen: "/investigacion/trading-04-order-manager.png", subtitulo: "Fragmento del gestor de órdenes" },
      // 0623(1).mp4 — vídeo, no imagen (spec 02.2, sección 5)
      { video: "/investigacion/trading-05-scroll-codigo.mp4", subtitulo: "Recorrido por el código del sistema" },
    ],
  },
];

export default function PaginaInvestigacionCuantitativa() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col gap-12">
      {/* --------------------------------------------------------------
          BLOQUE INTRODUCTORIO
          Texto corto de posicionamiento, encima de la lista de tarjetas.
          El texto de abajo es un PLACEHOLDER (copy final pendiente,
          ver spec 02.2, sección 7 punto 4 — sin fecha asignada todavía).
      -------------------------------------------------------------- */}
      <header className="max-w-[700px]">
        <h1 className="font-[Fraunces] text-[var(--ink)] text-4xl mb-4">
          Investigación Cuantitativa
        </h1>
        <p className="font-[Inter] text-[var(--muted)] text-lg">
          Proceso de mejora continua permanente: desarrollo científico
          aplicado, desde modelos econométricos hasta teoría de juegos.
        </p>
      </header>

      {/* --------------------------------------------------------------
          ÍNDICE DE CATEGORÍAS
          Fila de botones con icono, uno por categoría. Al hacer click,
          salta a la sección correspondiente. Se resalta solo mediante
          IntersectionObserver dentro del propio componente.
      -------------------------------------------------------------- */}
      <IndiceCategorias
        items={categorias.map(({ slug, titulo, icono }) => ({ slug, titulo, icono }))}
      />

      {/* --------------------------------------------------------------
          LISTA DE TARJETAS (una debajo de otra, no en rejilla)
          Cada tarjeta es horizontal por dentro: icono + título + frase +
          tags a la izquierda, carrusel a la derecha — igual que el
          planteamiento del Hero del Home. En móvil se apila.
      -------------------------------------------------------------- */}
      <div className="flex flex-col gap-10">
        {categorias.map((categoria) => (
          <section
            key={categoria.titulo}
            id={`cat-${categoria.slug}`}
            className="bg-[var(--bg)] border border-[var(--line)] rounded-lg p-6 flex flex-col md:flex-row md:items-start gap-6 scroll-mt-24"
          >
            {/* Columna de texto: icono + título + frase + tags.
                md:w-1/3 = un tercio del ancho en pantallas medianas+. */}
            <div className="md:w-1/3 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categoria.icono}
                alt=""
                aria-hidden="true"
                className="w-10 h-10 mb-3 opacity-70"
              />
              <h2 className="font-[Fraunces] text-[var(--ink)] text-2xl mb-2">
                {categoria.titulo}
              </h2>
              <p className="font-[Inter] text-sm text-[var(--muted)] mb-3 max-w-[280px]">
                {categoria.frase}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categoria.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-[IBM_Plex_Mono] text-[11px] tracking-wide text-[#2D5D6B] border border-[var(--line)] rounded-sm px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Columna del carrusel: ocupa el resto del ancho disponible. */}
            <div className="md:w-2/3 w-full">
              <CarruselCategoria items={categoria.items} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
