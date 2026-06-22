'use client'; // Componente de cliente para animaciones en el navegador

import React, { useEffect, useRef } from 'react';

// --- CONFIGURACIÓN DEL SISTEMA DE DISEÑO ---
const COLORES = {
  fondo: '#FAFAF7',          // Fondo claro (--bg)
  textoInk: '#14171C',       // Texto principal (--ink)
  pib: 'rgba(20, 23, 28, 0.20)', // Línea superior con más dinamismo
  signal: 'rgba(45, 93, 107, 0.68)', // Tu color de datos (--signal) a mayor velocidad
  velaAlcista: 'rgba(45, 93, 107, 0.65)', // Velas que suben
  velaBajista: 'rgba(200, 133, 42, 0.65)', // Velas que bajan (--alert)
  lineaEje: '#E3E1DC',       // Líneas divisorias (--line)
  textoMuted: 'rgba(107, 114, 128, 0.25)', // Gris para las fórmulas matemáticas sutiles
};

// Repertorio de expresiones matemáticas reales del Lab (Inferencia, Álgebra y ML)
// Repertorio ampliado con notación científica hiper-realista inspirada en libros y LaTeX
const FORMULAS_QUANT = [
  'dM_t = θ(μ - M_t)dt + σdW_t',               // Proceso de Ornstein-Uhlenbeck
  'E[R_i] = R_f + β_i(E[R_m] - R_f)',          // Modelo CAPM
  'L_G = ∑ ln f(y_t | F_t-1; θ)',             // Máxima verosimilitud temporal
  'w^* = Σ^-1 μ / (ι^T Σ^-1 μ)',               // Portfolio óptimo de Markowitz
  '∂V/∂t + rS ∂V/∂S + 1/2 σ² S² ∂²V/∂S² = rV', // Ecuación de Black-Scholes
  'K_k = P_k^- H^T (H P_k^- H^T + R)^-1',      // Ganancia del Filtro de Kalman
  'f(x_t) = α_0 + ∑ α_i x_t-i + ∑ γ_j ε_t-j',  // Modelo ARMA generalizado
  '∇_w L(w) = 1/n ∑ ∇_w l_i(w) + λ||w||²',     // Regularización Ridge / Lasso
  'P(Y_t = 1 | X) = 1 / (1 + e^-Xβ)',          // Regresión Logística Cuántica
  'J(w) = 1/2m ∑ (h_w(x^(i)) - y^(i))²',       // Función de coste MCO
  'Q(s,a) = R(s,a) + γ max Q(s\',a\')',        // Ecuación de Bellman (Q-Learning)
  'I_n = X^T (X X^T)^-1 X',                    // Matriz de proyección de sombrero
  'H_t = Ω + α ε²_t-1 + β H_t-1',              // Modelo GARCH(1,1) de volatilidad
  'f(x) = sign( ∑ α_i y_i K(x_i, x) + b )',    // Máquina de Vectores de Soporte (SVM)
  'AIC = 2k - 2ln(L^*)',                       // Criterio de Información de Akaike
  'dx_t = f(x_t, t)dt + g(x_t, t)dW_t'         // Ecuación Diferencial Estocástica
];

interface Vela {
  apertura: number;
  maximo: number;
  minimo: number;
  cierre: number;
  posicionX: number;
}

interface ItemFormula {
  texto: string;
  x: number;
  y: number;
  velocidad: number;
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

    // --- VARIABLES DE CONTROL Y ESTADO ---
    // TRUCO SEGURO: Inicializamos el tiempo en 400 en vez de 0.
    // Así, al cargar la página por primera vez, el dibujo ya va por la mitad del lienzo.
    let tiempo = 400; 
    
    // 1. Serie Superior (Ciclo con mayor dinamismo)
    const puntosPIB: { x: number; y: number }[] = [];
    
    // 2. Serie Media (Activo Volátil / Random Walk rápido)
    const puntosActivo: { x: number; y: number }[] = [];
    let valorActualActivo = alto * 0.45;

    // 3. Serie Inferior (Velas Japonesas - Frecuencia controlada)
    const listaVelas: Vela[] = [];
    const anchoVela = 6;
    const espacioVela = 4;
    const espacioTotalVela = anchoVela + espacioVela;
    let proximaVelaX = 0;
    let ultimoCierre = alto * 0.78;

    // 4. Capa Matemática (Fórmulas flotantes intermedias)
    const listaFormulas: ItemFormula[] = [];

    // --- BUCLE DE RENDERIZADO ---
    const renderizar = () => {
      tiempo += 1;

      // Limpieza del lienzo
      ctx.fillStyle = COLORES.fondo;
      ctx.fillRect(0, 0, ancho, alto);

      // Las líneas se dibujan de izquierda a derecha avanzando según el tiempo
      const progresoXLineas = (tiempo * 1.4) % ancho;
      const progresoXVelas = (tiempo * 0.9) % ancho;

      // Reset coordinado cuando da la vuelta el ciclo (aquí sí vuelve a 0 de forma natural)
      if (progresoXLineas < 1.5) {
        puntosPIB.length = 0;
        puntosActivo.length = 0;
        listaVelas.length = 0;
        listaFormulas.length = 0;
        valorActualActivo = alto * 0.45;
        ultimoCierre = alto * 0.78;
        proximaVelaX = 0;
      }

      // Gestor de opacidad para bordes limpios
      const calcularOpacidadFade = (x: number) => {
        if (x < 60) return x / 60;
        if (x > ancho - 60) return (ancho - x) / 60;
        return 1;
      };

      // ========================================================
      // 1. DIBUJO: SERIE SUPERIOR MACRO (Ciclos Dinámicos)
      // ========================================================
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
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = COLORES.pib;
      for (let i = 0; i < puntosPIB.length; i++) {
        if (i === 0) ctx.moveTo(puntosPIB[i].x, puntosPIB[i].y);
        else ctx.lineTo(puntosPIB[i].x, puntosPIB[i].y);
      }
      ctx.stroke();

      // ========================================================
      // 2. DIBUJO: PRECIO DE ACTIVO (Zona Media - Rápida)
      // ========================================================
      if (tiempo % 1 === 0) { 
        const cambioAleatorio = (Math.random() - 0.495) * 4.5; 
        valorActualActivo = Math.max(alto * 0.38, Math.min(alto * 0.62, valorActualActivo + cambioAleatorio));
        puntosActivo.push({ x: progresoXLineas, y: valorActualActivo });
      }

      ctx.beginPath();
      ctx.lineWidth = 1.75;
      ctx.strokeStyle = COLORES.signal;
      for (let i = 0; i < puntosActivo.length; i++) {
        if (i === 0) ctx.moveTo(puntosActivo[i].x, puntosActivo[i].y);
        else ctx.lineTo(puntosActivo[i].x, puntosActivo[i].y);
      }
      ctx.stroke();

      // ========================================================
      // 3. CAPA INTERMEDIA: FÓRMULAS MATEMÁTICAS FLOTANTES
      // ========================================================
      if (tiempo % 70 === 0 && listaFormulas.length < 5) {
        const textoAleatorio = FORMULAS_QUANT[Math.floor(Math.random() * FORMULAS_QUANT.length)];
        listaFormulas.push({
          texto: textoAleatorio,
          x: progresoXLineas,
          y: alto * 0.32 + Math.random() * (alto * 0.08),
          velocidad: 0.2 + Math.random() * 0.3 
        });
      }

      ctx.font = '10px IBM Plex Mono, monospace';
      listaFormulas.forEach((formula) => {
        formula.x += formula.velocidad; 
        const opacidadBorde = calcularOpacidadFade(formula.x);
        
        ctx.fillStyle = `rgba(107, 114, 128, ${0.28 * opacidadBorde})`;
        ctx.fillText(formula.texto, formula.x, formula.y);
      });

      // ========================================================
      // 4. DIBUJO: VELAS JAPONESAS (Zona Inferior)
      // ========================================================
      if (progresoXVelas >= proximaVelaX) {
        const esAlcista = Math.random() > 0.47; 
        const tamañoCuerpo = Math.random() * 14 + 2; 
        
        const apertura = ultimoCierre;
        const cierre = esAlcista ? apertura - tamañoCuerpo : apertura + tamañoCuerpo;
        
        const cuerpoMasAlto = Math.min(apertura, cierre);
        const cuerpoMasBajo = Math.max(apertura, cierre);
        
        const maximo = cuerpoMasAlto - (Math.random() * 7);
        const minimo = cuerpoMasBajo + (Math.random() * 7);

        if (cierre > alto * 0.88) ultimoCierre = alto * 0.82;
        else if (cierre < alto * 0.65) ultimoCierre = alto * 0.72;
        else ultimoCierre = cierre;

        listaVelas.push({ apertura, maximo, minimo, cierre, posicionX: proximaVelaX });
        proximaVelaX += espacioTotalVela;
      }

      listaVelas.forEach((vela) => {
        const opacidad = calcularOpacidadFade(vela.posicionX);
        if (opacidad <= 0) return;

        const esVelaVerde = vela.cierre < vela.apertura; 
        const centroX = Math.floor(vela.posicionX + anchoVela / 2);

        // Mecha
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.12)';
        ctx.lineWidth = 1;
        ctx.moveTo(centroX, Math.floor(vela.maximo));
        ctx.lineTo(centroX, Math.floor(vela.minimo));
        ctx.stroke();

        // Cuerpo
        ctx.fillStyle = esVelaVerde ? COLORES.velaAlcista : COLORES.velaBajista;
        const cuerpoY = Math.floor(Math.min(vela.apertura, vela.cierre));
        const cuerpoH = Math.max(1, Math.floor(Math.abs(vela.apertura - vela.cierre)));
        ctx.fillRect(vela.posicionX, cuerpoY, anchoVela, cuerpoH);
      });

      // ========================================================
      // MÁSCARA DE DEGRADADO (Protección de textos)
      // ========================================================
      const degradado = ctx.createLinearGradient(0, 0, ancho, 0);
      degradado.addColorStop(0, COLORES.fondo);
      degradado.addColorStop(0.38, COLORES.fondo); 
      degradado.addColorStop(0.47, 'rgba(250, 250, 247, 0.35)');
      degradado.addColorStop(1, 'rgba(250, 250, 247, 0)');
      
      ctx.fillStyle = degradado;
      ctx.fillRect(0, 0, ancho, alto);

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