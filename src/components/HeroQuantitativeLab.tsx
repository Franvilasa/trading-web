'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// --- CONFIGURACIÓN DEL SISTEMA DE DISEÑO ---
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

    // --- VARIABLES DE CONTROL ---
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

      // 1. DIBUJO: SERIE SUPERIOR MACRO
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
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = COLORES.pib;
      for (let i = 0; i < puntosPIB.length; i++) {
        if (i === 0) ctx.moveTo(puntosPIB[i].x, puntosPIB[i].y);
        else ctx.lineTo(puntosPIB[i].x, puntosPIB[i].y);
      }
      ctx.stroke();

      // ========================================================
      // 2. DIBUJO: PRECIO DE ACTIVO + EJE COORDENADAS + SEÑALES
      // ========================================================
      if (tiempo % 1 === 0) { 
        const cambioAleatorio = (Math.random() - 0.495) * 4.5; 
        valorActualActivo = Math.max(alto * 0.38, Math.min(alto * 0.62, valorActualActivo + cambioAleatorio));
        puntosActivo.push({ x: progresoXLineas, y: valorActualActivo });
      }

      // --- DIBUJO DEL EJE DE COORDENADAS DINÁMICO ---
      // Una cruz sutil que sigue la punta de la línea de precio actual
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(20, 23, 28, 0.04)'; // Súper sutil para no ensuciar
      ctx.lineWidth = 1;
      
      // Línea Vertical (desde arriba hasta el centro)
      ctx.moveTo(progresoXLineas, 0);
      ctx.lineTo(progresoXLineas, alto);
      
      // Línea Horizontal Cruzada
      ctx.moveTo(0, valorActualActivo);
      ctx.lineTo(ancho, valorActualActivo);
      ctx.stroke();

      // --- DIBUJO DE LA LÍNEA DE PRECIO ---
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = COLORES.signal;
      for (let i = 0; i < puntosActivo.length; i++) {
        if (i === 0) ctx.moveTo(puntosActivo[i].x, puntosActivo[i].y);
        else ctx.lineTo(puntosActivo[i].x, puntosActivo[i].y);
      }
      ctx.stroke();

      // --- MARCAS SUTILES DE COMPRA / VENTA (TRIÁNGULOS ALEATORIOS FIJOS) ---
      for (let i = 10; i < puntosActivo.length; i += 75) { 
        const p = puntosActivo[i];

        if (p.x > ancho * 0.38 && p.x < ancho - 40) {
          // Usamos el seno de la posición X para simular aleatoriedad, 
          // pero que se mantenga fija para esa misma marca en cada frame.
          const esCompra = Math.sin(p.x) > 0; 
          
          ctx.beginPath();
          ctx.fillStyle = esCompra ? 'rgba(34, 197, 94, 0.75)' : 'rgba(239, 68, 68, 0.75)'; 
          
          if (esCompra) {
            // Triángulo Verde (Compra)
            ctx.moveTo(p.x, p.y + 10);
            ctx.lineTo(p.x - 4, p.y + 16);
            ctx.lineTo(p.x + 4, p.y + 16);
          } else {
            // Triángulo Rojo (Venta)
            ctx.moveTo(p.x, p.y - 10);
            ctx.lineTo(p.x - 4, p.y - 16);
            ctx.lineTo(p.x + 4, p.y - 16);
          }
          ctx.fill();
        }
      }

      // 3. CAPA INTERMEDIA: FÓRMULAS
      for (let i = formulasEnPantalla.length - 1; i >= 0; i--) {
        const f = formulasEnPantalla[i];
        f.x += f.velocidad;
        if (f.x > ancho + 100) { formulasEnPantalla.splice(i, 1); continue; }
        ctx.drawImage(f.img, f.x, f.y - 15);
      }

      // 4. MÁSCARA DE DEGRADADO (Sólo tapa las líneas traseras del texto)
      const degradado = ctx.createLinearGradient(0, 0, ancho, 0);
      degradado.addColorStop(0, COLORES.fondo);
      degradado.addColorStop(0.41, COLORES.fondo); 
      degradado.addColorStop(0.51, 'rgba(250, 250, 247, 0.25)'); 
      
      ctx.fillStyle = degradado;
      ctx.fillRect(0, 0, ancho, alto);

      // 5. DIBUJO: VELAS JAPONESAS (Al final del todo -> Cero niebla)
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
        if (vela.posicionX < ancho * 0.38 || vela.posicionX > ancho - 40) return;
        const esVelaVerde = vela.cierre < vela.apertura; 
        const centroX = Math.floor(vela.posicionX + anchoVela / 2);

        // Mechas sólidas
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.55)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(centroX, Math.floor(vela.maximo));
        ctx.lineTo(centroX, Math.floor(vela.minimo));
        ctx.stroke();

        // Cuerpos de alto contraste con borde
        ctx.fillStyle = esVelaVerde ? COLORES.velaAlcista : COLORES.velaBajista;
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.5)';
        ctx.lineWidth = 0.75;
        
        const cuerpoY = Math.floor(Math.min(vela.apertura, vela.cierre));
        const cuerpoH = Math.max(1, Math.floor(Math.abs(vela.apertura - vela.cierre)));
        
        ctx.fillRect(vela.posicionX, cuerpoY, anchoVela, cuerpoH);
        ctx.strokeRect(vela.posicionX, cuerpoY, anchoVela, cuerpoH);
      });

      idAnimacion = requestAnimationFrame(renderizar);
    };

    renderizar();

    return () => {
      cancelAnimationFrame(idAnimacion);
      window.removeEventListener('resize', ajustarPantalla);
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] bg-[#FAFAF7] overflow-hidden border-b border-[#E3E1DC]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
        <div className="w-full md:w-[40%] text-left space-y-4 pointer-events-none select-none">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#2D5D6B]/10 border border-[#2D5D6B]/20 text-[10px] font-mono tracking-wider text-[#2D5D6B]">
            <span className="w-1 h-1 rounded-full bg-[#2D5D6B] animate-pulse" />
            QUANT RESEARCH LAB
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-[#14171C]">
            Modelos de <br />
            <span className="text-[#2D5D6B]">Inferencia Estadística</span>
          </h1>
          <p className="text-xs font-mono leading-relaxed text-[#6B7280]">
            Análisis cuantitativo de series temporales y optimización matemática aplicado a estrategias de trading algorítmico sistemático.
          </p>
        </div>
        <div className="hidden md:block md:w-[60%] h-full" />
      </div>
    </div>
  );
}