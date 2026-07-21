'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// --- CONFIGURACIÓN DEL SISTEMA DE DISEÑO ---
// Colores hardcodeados a propósito (decisión de esta sesión): el canvas 2D
// no lee variables CSS directamente, así que se mantienen igual que en la
// versión original. Migrar a tokens queda pendiente para otra sesión.
const COLORES = {
  fondo: '#FAFAF7',
  textoInk: '#14171C',
  pib: 'rgba(20, 23, 28, 0.20)',
  signal: 'rgba(45, 93, 107, 0.65)',
  velaAlcista: 'rgba(45, 110, 125, 0.90)',
  velaBajista: 'rgba(215, 126, 34, 0.90)',
};

const FORMULAS_LATEX = [
  'dM_t = \\theta(\\mu - M_t)dt + \\sigma dW_t',
  'E[R_i] = R_f + \\beta_i(E[R_m] - R_f)',
  'w^* = \\Sigma^{-1}\\mu / (\\iota^T \\Sigma^{-1}\\mu)',
  '\\frac{\\partial V}{\\partial t} + rS \\frac{\\partial V}{\\partial S} = rV',
  '\\nabla_w L(w) = \\frac{1}{n} \\sum \\nabla_w l_i(w) + \\lambda ||w||^2',
  'H_t = \\Omega + \\alpha \\varepsilon^2_{t-1} + \\beta H_{t-1}',
  'X_t = X_0 + \\int_0^t f(X_s, s)ds + \\int_0^t g(X_s, s)dW_s',
  'V(t) = \\int_t^T e^{-r(s-t)} E[\\Pi_s | \\mathcal{F}_t] ds',
  '\\Delta y_t = \\Pi y_{t-1} + \\sum_{i=1}^{p-1} \\Gamma_i \\Delta y_{t-i} + \\varepsilon_t'
];

interface Vela {
  apertura: number;
  maximo: number;
  minimo: number;
  cierre: number;
  posicionX: number;
}

interface ItemFormulaRender {
  img: HTMLImageElement;
  x: number;
  y: number;
  velocidad: number;
  anchoImg: number;
  altoImg: number;
}

export default function HeroQuantitativeLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let idAnimacion: number;
    let ancho = (canvas.width = canvas.offsetWidth);
    let alto = (canvas.height = canvas.offsetHeight);

    const ajustarPantalla = () => {
      if (!canvas) return;
      ancho = canvas.width = canvas.offsetWidth;
      alto = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', ajustarPantalla);

    // --- VARIABLES DE CONTROL (idénticas a la versión original) ---
    let tiempo = 400;
    const puntosPIB: { x: number; y: number }[] = [];
    const puntosActivo: { x: number; y: number }[] = [];
    let valorActualActivo = alto * 0.45;

    const listaVelas: Vela[] = [];
    const anchoVela = 7;
    const espacioVela = 4;
    const espacioTotalVela = anchoVela + espacioVela;
    let proximaVelaX = 0;
    let ultimoCierre = alto * 0.78;

    const formulasEnPantalla: ItemFormulaRender[] = [];

    const generarImagenFormula = (latex: string): Promise<{ img: HTMLImageElement; w: number; h: number }> => {
      return new Promise((resolve) => {
        const htmlString = katex.renderToString(latex, { displayMode: false, throwOnError: false });
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="600" height="100">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:18px;color:rgba(51,65,85,0.25);padding-top:15px;">
                ${htmlString}
              </div>
            </foreignObject>
          </svg>
        `;
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        img.onload = () => {
          resolve({ img, w: 450, h: 60 });
        };
      });
    };

    // --- PROYECCIÓN SIMPLE (efecto Star Wars) ---
    // Cuanto mayor es x, mayor es la escala (los elementos se agrandan).
    const proyectar = (x: number, y: number, ancho: number, alto: number) => {
      const escala = 0.3 + (x / ancho) * 1.5;
      return { px: x, py: y, escala };
    };

    // --- RENDERIZADO PRINCIPAL ---
    const renderizar = () => {
      tiempo += 1;

      ctx.fillStyle = COLORES.fondo;
      ctx.fillRect(0, 0, ancho, alto);

      const progresoXLineas = (tiempo * 1.1) % ancho;
      const progresoXVelas = (tiempo * 1.1) % ancho;

      if (progresoXLineas < 1.5) {
        puntosPIB.length = 0;
        puntosActivo.length = 0;
        listaVelas.length = 0;
        formulasEnPantalla.length = 0;
        valorActualActivo = alto * 0.45;
        ultimoCierre = alto * 0.78;
        proximaVelaX = 0;
      }

      if (tiempo % 140 === 0 && formulasEnPantalla.length < 5) {
        const latexAleatorio = FORMULAS_LATEX[Math.floor(Math.random() * FORMULAS_LATEX.length)];
        generarImagenFormula(latexAleatorio).then(({ img, w, h }) => {
          formulasEnPantalla.push({
            img,
            x: ancho * 0.45 + Math.random() * (ancho * 0.30),
            y: alto * 0.15 + Math.random() * (alto * 0.55),
            velocidad: 0.15 + Math.random() * 0.2,
            anchoImg: w,
            altoImg: h
          });
        });
      }

      // 1. SERIE PIB (MACRO) con perspectiva
      const lineaBasePIB = alto * 0.28;
      const tendenciaPIB = (progresoXLineas / ancho) * -30;
      const cicloLargo = Math.sin(progresoXLineas * 0.015) * 20;
      const cicloCorto = Math.cos(progresoXLineas * 0.05) * 6;
      const ruidoPIB = Math.sin(progresoXLineas * 0.3) * 1.5;
      const pibYActual = lineaBasePIB + tendenciaPIB + cicloLargo + cicloCorto + ruidoPIB;

      if (puntosPIB.length === 0 || puntosPIB[puntosPIB.length - 1].x < progresoXLineas) {
        puntosPIB.push({ x: progresoXLineas, y: pibYActual });
      }

      ctx.beginPath();
      for (let i = 0; i < puntosPIB.length; i++) {
        const { px, py, escala } = proyectar(puntosPIB[i].x, puntosPIB[i].y, ancho, alto);
        ctx.lineWidth = 2.0 * escala;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = COLORES.pib;
      ctx.stroke();

      // 2. PRECIO (ACTIVO) y ACTUALIZACIÓN
      if (tiempo % 1 === 0) {
        const cambioAleatorio = (Math.random() - 0.495) * 4.5;
        valorActualActivo = Math.max(alto * 0.38, Math.min(alto * 0.62, valorActualActivo + cambioAleatorio));
        puntosActivo.push({ x: progresoXLineas, y: valorActualActivo });
      }

      ctx.beginPath();
      for (let i = 0; i < puntosActivo.length; i++) {
        const { px, py, escala } = proyectar(puntosActivo[i].x, puntosActivo[i].y, ancho, alto);
        ctx.lineWidth = 2.5 * escala;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = COLORES.signal;
      ctx.stroke();

      // 3. EJE DE COORDENADAS (CRUZ) - Solo la punta viva
      if (puntosActivo.length > 0) {
        const ultimoPunto = puntosActivo[puntosActivo.length - 1];
        const { px, py } = proyectar(ultimoPunto.x, ultimoPunto.y, ancho, alto);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.04)';
        ctx.lineWidth = 1;
        ctx.moveTo(px, 0);
        ctx.lineTo(px, alto);
        ctx.moveTo(0, py);
        ctx.lineTo(ancho, py);
        ctx.stroke();
      }

      // 4. SEÑALES DE COMPRA/VENTA (triángulos) con escala
      // Antes se ocultaban hasta ancho*0.38 para no chocar con el texto superpuesto.
      // Ahora el canvas vive en su propia columna (ya no hay texto encima), así
      // que pueden aparecer desde el borde izquierdo del gráfico.
      for (let i = 10; i < puntosActivo.length; i += 75) {
        const p = puntosActivo[i];
        if (p.x < ancho - 40) {
          const { px, py, escala } = proyectar(p.x, p.y, ancho, alto);
          const esCompra = Math.sin(p.x) > 0;
          const tamaño = 6 * escala;

          ctx.beginPath();
          ctx.fillStyle = esCompra ? 'rgba(34, 197, 94, 0.75)' : 'rgba(239, 68, 68, 0.75)';
          if (esCompra) {
            ctx.moveTo(px, py + tamaño);
            ctx.lineTo(px - tamaño * 0.6, py + tamaño * 1.6);
            ctx.lineTo(px + tamaño * 0.6, py + tamaño * 1.6);
          } else {
            ctx.moveTo(px, py - tamaño);
            ctx.lineTo(px - tamaño * 0.6, py - tamaño * 1.6);
            ctx.lineTo(px + tamaño * 0.6, py - tamaño * 1.6);
          }
          ctx.fill();
        }
      }

      // 5. FÓRMULAS KATEX con perspectiva y escalado
      for (let i = formulasEnPantalla.length - 1; i >= 0; i--) {
        const f = formulasEnPantalla[i];
        f.x += f.velocidad;
        if (f.x > ancho + 100) { formulasEnPantalla.splice(i, 1); continue; }

        const { px, py, escala } = proyectar(f.x, f.y, ancho, alto);
        const anchoEscalado = f.anchoImg * escala;
        const altoEscalado = f.altoImg * escala;
        ctx.drawImage(f.img, px - anchoEscalado / 2, py - altoEscalado / 2, anchoEscalado, altoEscalado);
      }

      // 6. VELAS JAPONESAS (con perspectiva)
      // Igual que en el punto 4: ya no se recorta el tramo izquierdo,
      // las velas nacen justo en el borde izquierdo del gráfico.
      if (progresoXVelas >= proximaVelaX) {
        const esAlcista = Math.random() > 0.47;
        const tamañoCuerpo = Math.random() * 14 + 4;
        const apertura = ultimoCierre;
        const cierre = esAlcista ? apertura - tamañoCuerpo : apertura + tamañoCuerpo;
        const cuerpoMasAlto = Math.min(apertura, cierre);
        const cuerpoMasBajo = Math.max(apertura, cierre);
        const maximo = cuerpoMasAlto - (Math.random() * 9 + 1);
        const minimo = cuerpoMasBajo + (Math.random() * 9 + 1);

        if (cierre > alto * 0.88) ultimoCierre = alto * 0.82;
        else if (cierre < alto * 0.65) ultimoCierre = alto * 0.72;
        else ultimoCierre = cierre;

        listaVelas.push({ apertura, maximo, minimo, cierre, posicionX: proximaVelaX });
        proximaVelaX += espacioTotalVela;
      }

      listaVelas.forEach((vela) => {
        if (vela.posicionX > ancho - 40) return;

        const { px, py, escala } = proyectar(vela.posicionX, (vela.apertura + vela.cierre) / 2, ancho, alto);
        const esVelaVerde = vela.cierre < vela.apertura;

        const anchoVelaEscalado = anchoVela * escala;
        const altoCuerpoEscalado = Math.max(1, Math.abs(vela.apertura - vela.cierre) * escala);
        const altoMaximoEscalado = (vela.maximo - vela.minimo) * escala;

        const centroY = py;
        const cuerpoSuperior = centroY - (altoCuerpoEscalado / 2);
        const mechaSuperior = centroY - (altoMaximoEscalado / 2);
        const mechaInferior = centroY + (altoMaximoEscalado / 2);

        // Mechas
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.55)';
        ctx.lineWidth = 1.5 * escala;
        ctx.moveTo(px, mechaSuperior);
        ctx.lineTo(px, mechaInferior);
        ctx.stroke();

        // Cuerpo
        ctx.fillStyle = esVelaVerde ? COLORES.velaAlcista : COLORES.velaBajista;
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.5)';
        ctx.lineWidth = 0.75 * escala;

        const xVela = px - (anchoVelaEscalado / 2);
        ctx.fillRect(xVela, cuerpoSuperior, anchoVelaEscalado, altoCuerpoEscalado);
        ctx.strokeRect(xVela, cuerpoSuperior, anchoVelaEscalado, altoCuerpoEscalado);
      });

      // 7. DIFUMINADO DEL BORDE DERECHO (nuevo, pedido esta sesión)
      // En vez de que las velas/líneas terminen en un corte seco contra el
      // borde derecho del gráfico, los últimos px se funden con el color
      // de fondo — efecto "se pierde en el horizonte" en vez de pared.
      const anchoDifuminado = ancho * 0.12; // ~12% final del gráfico
      const inicioDifuminado = ancho - anchoDifuminado;
      const degradadoDerecha = ctx.createLinearGradient(inicioDifuminado, 0, ancho, 0);
      degradadoDerecha.addColorStop(0, 'rgba(250, 250, 247, 0)'); // transparente
      degradadoDerecha.addColorStop(1, COLORES.fondo);            // opaco, color de fondo
      ctx.fillStyle = degradadoDerecha;
      ctx.fillRect(inicioDifuminado, 0, anchoDifuminado, alto);

      idAnimacion = requestAnimationFrame(renderizar);
    };

    renderizar();

    return () => {
      cancelAnimationFrame(idAnimacion);
      window.removeEventListener('resize', ajustarPantalla);
    };
  }, []);

  return (
    // Altura: placeholder 400px, pendiente de tu valor definitivo.
    <div className="relative w-full h-[400px] bg-bg overflow-hidden border-b border-line">
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center gap-8">

        {/* COLUMNA 1: TEXTO (~30%) — ya no flota sobre el canvas, es su propia columna */}
        <div className="w-full md:w-[30%] text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-signal/10 border border-signal/20 text-[10px] font-mono tracking-wider text-signal">
            <span className="w-1 h-1 rounded-full bg-signal animate-pulse" />
            LABORATORIO I+D+i
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-ink">
            Análisis Económico <br />
            <span className="text-signal">Cuantitativo</span>
          </h1>
          <p className="text-xs font-mono leading-relaxed text-muted">
            Modelos econométricos y de machine learning validados <br />
            con track record real.
          </p>
        </div>

        {/* COLUMNA 2: ANIMACIÓN (~70%) — el canvas ahora vive solo aquí dentro,
            no debajo de todo el Hero. En móvil se oculta (mejora de responsive). */}
        <div className="hidden md:block relative w-[70%] h-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        </div>

      </div>
    </div>
  );
}
