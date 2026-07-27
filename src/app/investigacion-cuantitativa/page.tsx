// ============================================================================
// PÁGINA: Investigación Cuantitativa
// Ruta del archivo en el proyecto: src/app/investigacion-cuantitativa/page.tsx
// ============================================================================
// Rediseño (sesión 2026-07-21): se añaden colores por categoría, borde lateral,
// alternancia de layout, subrayado de título, y se pasa color al carrusel.
// ============================================================================

import CarruselCategoria, { ItemCarrusel } from "@/components/CarruselCategoria";
import IndiceCategorias from "@/components/IndiceCategorias";

export const metadata = {
  title: "Investigación Cuantitativa — Lab Cuantitativo",
  descripcion:
    "Metodología y conocimiento técnico aplicado: machine learning, econometría, predicción, teoría de juegos y trading cuantitativo.",
};

type Categoria = {
  titulo: string;
  slug: string;
  icono: string;
  frase: string;
  tags: string[];
  items: ItemCarrusel[];
  color: string;
};

const categorias: Categoria[] = [
  {
    titulo: "Machine Learning",
    slug: "machine-learning",
    icono: "/investigacion/iconos/icon-ml.svg",
    frase: "Aprendizaje supervisado y no supervisado aplicado a datos reales.",
    tags: ["Regresión", "Clustering", "Validación cruzada"],
    color: "#3B82F6",
    items: [
      { imagen: "/investigacion/ml-01-decision-tree.png", subtitulo: "Ejemplo de árbol de decisión" },
      { imagen: "/investigacion/ml-02-lasso-cv.png", subtitulo: "Validación cruzada de un modelo Lasso" },
      { imagen: "/investigacion/ml-03-lasso-predicciones.png", subtitulo: "Predicciones Lasso frente a valores reales" },
      { imagen: "/investigacion/ml-04-kmeans.png", subtitulo: "Caso de uso de segmentación con K-means" },
      { imagen: "/investigacion/ml-05-cluster.jpg", subtitulo: "Visualización de clusters" },
    ],
  },
  {
    titulo: "Deep Learning e IA",
    slug: "deep-learning-ia",
    icono: "/investigacion/iconos/icon-genai.svg",
    frase: "Redes neuronales aplicadas a series temporales y clasificación.",
    tags: ["CNN", "Backpropagation", "PyTorch"],
    color: "#8B5CF6",
    items: [
      { imagen: "/investigacion/dl-01-arquitectura.png", subtitulo: "Arquitectura de una red neuronal" },
      { imagen: "/investigacion/dl-02-ciclo-convolucion.png", subtitulo: "Ciclo de entrenamiento de una red convolucional" },
      { imagen: "/investigacion/dl-03-codigo-entrenamiento.png", subtitulo: "Código de entrenamiento de una red neuronal" },
      { imagen: "/investigacion/dl-04-comparativa-predictiva.png", subtitulo: "Comparativa predictiva con deep learning" },
      { imagen: "/investigacion/dl-05-lasso-vs-nn.png", subtitulo: "Lasso frente a red neuronal" },
    ],
  },
  {
    titulo: "Modelos Econométricos",
    slug: "modelos-econometricos",
    icono: "/investigacion/iconos/icon-econometria.svg",
    frase: "Especificación, diagnóstico y validación de series temporales.",
    tags: ["ARIMA", "GARCH", "VAR"],
    color: "#10B981",
    items: [
      { imagen: "/investigacion/econometria-01-ljungbox-holtwinters.png", subtitulo: "Test de residuos sobre un modelo Holt-Winters" },
      { imagen: "/investigacion/econometria-02-var-irf.png", subtitulo: "Funciones de impulso-respuesta de un modelo VAR" },
      { imagen: "/investigacion/econometria-03-correlogramas.png", subtitulo: "Ejemplo de correlograma" },
      { imagen: "/investigacion/econometria-04-gmm-r.png", subtitulo: "Especificación en R de un modelo GMM" },
      { imagen: "/investigacion/econometria-05-egarch-ibex.png", subtitulo: "Modelo EGARCH aplicado al Ibex" },
    ],
  },
  {
    titulo: "Predicción",
    slug: "prediccion",
    icono: "/investigacion/iconos/icon-prediccion.svg",
    frase: "Forecast aplicado a variables macroeconómicas y financieras.",
    tags: ["Forecast", "Contrafactual", "Convergencia"],
    color: "#F59E0B",
    items: [
      { imagen: "/investigacion/prediccion-01-variables-macro.png", subtitulo: "Predicción de variables macroeconómicas" },
      { imagen: "/investigacion/prediccion-02-arima.png", subtitulo: "Ejemplo de predicción ARIMA" },
      { imagen: "/investigacion/prediccion-03-curvas-transicion.png", subtitulo: "Caso de uso de curvas de transición" },
      { imagen: "/investigacion/prediccion-04-serie-contrafactual.png", subtitulo: "Construcción de una serie contrafactual" },
      { imagen: "/investigacion/prediccion-05-analisis-macro.png", subtitulo: "Análisis de variables macro" },
    ],
  },
  {
    titulo: "Teoría de Juegos",
    slug: "teoria-de-juegos",
    icono: "/investigacion/iconos/icon-abm.svg",
    frase: "Modelos basados en agentes y equilibrios estratégicos.",
    tags: ["ABM", "Payoff", "Bayesiano"],
    color: "#EF4444",
    items: [
      { imagen: "/investigacion/juegos-01-abm-parametrizacion.png", subtitulo: "Parametrización de un modelo basado en agentes" },
      { imagen: "/investigacion/juegos-02-abm-simulacion.png", subtitulo: "Emergencia de patrones en una simulación ABM" },
      { imagen: "/investigacion/juegos-03-matriz-pagos.png", subtitulo: "Ejemplo de matriz de pagos" },
      { imagen: "/investigacion/juegos-04-juego-bayesiano.png", subtitulo: "Representación de un juego bayesiano" },
    ],
  },
  {
    titulo: "Probabilidad y Trading Cuantitativo",
    slug: "probabilidad-trading",
    icono: "/investigacion/iconos/icon-trading.svg",
    frase: "Probabilidad condicionada aplicada a un bot de trading real.",
    tags: ["Logit", "Backtesting", "Gestión de riesgo"],
    color: "#06B6D4",
    items: [
      { imagen: "/investigacion/trading-01-bot-mt5.png", subtitulo: "Bot de trading operando sobre MT5" },
      { imagen: "/investigacion/trading-02-bot-operando.png", subtitulo: "Bot en ejecución en tiempo real" },
      { imagen: "/investigacion/trading-03-bot-operando-2.png", subtitulo: "Otro ejemplo de operativa del bot" },
      { imagen: "/investigacion/trading-04-order-manager.png", subtitulo: "Fragmento del gestor de órdenes" },
      { video: "/investigacion/trading-05-scroll-codigo.mp4", subtitulo: "Recorrido por el código del sistema" },
    ],
  },
];

export default function PaginaInvestigacionCuantitativa() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-12">
      <header className="max-w-[700px]">
        <h1 className="font-sans font-bold tracking-tight text-ink text-4xl mb-4">
          Investigación Cuantitativa
        </h1>
        <p className="font-sans text-muted text-lg">
          Proceso de mejora continua permanente: desarrollo científico
          aplicado, desde modelos econométricos hasta teoría de juegos.
        </p>
      </header>

      <IndiceCategorias
        items={categorias.map(({ slug, titulo, icono, color }) => ({ slug, titulo, icono, color }))}
      />

      <div className="flex flex-col gap-10">
        {categorias.map((categoria, index) => {
          const esPar = index % 2 === 0;
          return (
            <section
              key={categoria.titulo}
              id={`cat-${categoria.slug}`}
              className="bg-bg border border-line rounded-lg py-5 px-30 scroll-mt-24 border-l-4"
              style={{ borderLeftColor: categoria.color }}
            >
              <div className={`flex flex-col md:flex-row md:items-start gap-1 w-full ${esPar ? '' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/3 flex-shrink-0">
                  <img
                    src={categoria.icono}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 opacity-70"
                  />
                  <h2
                    className="font-sans font-bold tracking-tight text-ink text-2xl mb-2 border-b-2 pb-1 inline-block"
                    style={{ borderBottomColor: categoria.color }}
                  >
                    {categoria.titulo}
                  </h2>
                  <p className="font-sans text-sm text-muted mb-3 max-w-[280px]">
                    {categoria.frase}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {categoria.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] tracking-wide text-[#2D5D6B] border border-line rounded-sm px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-2/3 w-full">
                  <CarruselCategoria items={categoria.items} color={categoria.color} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}