'use client'; // Indica a Next.js que este componente usa animaciones en el navegador

import React, { useEffect, useRef } from 'react';

// --- CONFIGURACIÓN DE TU PALETA DE COLORES REAL ---
const COLORES = {
  fondo: '#FAFAF7',          // Tu color claro de fondo (--bg)
  textoInk: '#14171C',       // Tu color oscuro para texto principal (--ink)
  pib: 'rgba(20, 23, 28, 0.05)', // Gris/negro extremadamente tenue para la línea macro
  signal: 'rgba(45, 93, 107, 0.18)', // Tu azul-petróleo (#2D5D6B) con baja opacidad
  velaAlcista: 'rgba(45, 93, 107, 0.25)', // Velas que suben (usamos tu color de datos)
  velaBajista: 'rgba(200, 133, 42, 0.25)', // Velas que bajan (tu color de alerta puntual #C8852A)
  lineaEje: '#E3E1DC',       // Tu color de líneas divisorias (--line)
  textoMuted: '#6B7280',     // Tu color gris para datos secundarios (--muted)
};

// Definición de la estructura que tendrá cada vela japonesa (datos puramente matemáticos)
interface Vela {
  apertura: number;
  maximo: number;
  minimo: number;
  cierre: number;
  posicionX: number;
}

export default function HeroQuantitativeLab() {
  // El "ref" es como una variable que nos permite enganchar y controlar el elemento <canvas> de HTML
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Esto se ejecuta solo cuando la web se carga en el navegador
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let idAnimacion: number;
    // Ajustamos el tamaño del lienzo al tamaño real de la pantalla
    let ancho = (canvas.width = canvas.offsetWidth);
    let alto = (canvas.height = canvas.offsetHeight);

    // Si el usuario cambia el tamaño de la ventana, recalculamos el tamaño del lienzo
    const ajustarPantalla = () => {
      if (!canvas) return;
      ancho = canvas.width = canvas.offsetWidth;
      alto = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', ajustarPantalla);

    // --- VARIABLES DE CONTROL PARA LAS 3 SERIES ---
    let tiempo = 0; // Contador de fotogramas para hacer avanzar la simulación
    
    // 1. Historial de la Serie PIB
    const puntosPIB: { x: number; y: number }[] = [];
    
    // 2. Historial de la Serie Activo Volátil (Movimiento Browniano)
    const puntosActivo: { x: number; y: number }[] = [];
    let valorActualActivo = alto * 0.5; // Empezamos en la mitad vertical de su zona

    // 3. Historial de Velas Japonesas
    const listaVelas: Vela[] = [];
    const anchoVela = 6; // Ancho en píxeles del cuerpo de la vela
    const espacioVela = 4; // Separación entre velas
    const espacioTotalVela = anchoVela + espacioVela;
    let proximaVelaX = 0; // Dónde se dibujará la siguiente vela
    let ultimoCierre = alto * 0.75; // Punto de partida vertical de los precios

    // --- BUCLE DE RENDERIZADO (Se ejecuta a 60 fotogramas por segundo) ---
    const renderizar = () => {
      tiempo += 1;

      // Pintamos el fondo limpio en cada fotograma
      ctx.fillStyle = COLORES.fondo;
      ctx.fillRect(0, 0, ancho, alto);

      // Progreso horizontal del dibujo (avanza lento de izquierda a derecha)
      const progresoX = (tiempo * 0.6) % ancho; 

      // Si la línea llega al final de la pantalla, reiniciamos el dibujo desde cero
      if (progresoX === 0 || tiempo === 1) {
        puntosPIB.length = 0;
        puntosActivo.length = 0;
        listaVelas.length = 0;
        valorActualActivo = alto * 0.45;
        ultimoCierre = alto * 0.75;
        proximaVelaX = 0;
      }

      // Función para desvanecer elementos cerca de los bordes del gráfico
      const calcularOpacidadFade = (x: number) => {
        if (x < 60) return x / 60; // Aparece suave al inicio
        if (x > ancho - 60) return (ancho - x) / 60; // Desaparece suave al final
        return 1;
      };

      // ========================================================
      // 1. CÁLCULO Y DIBUJO: SERIE TIPO PIB (Zona Superior)
      // ========================================================
      const lineaBasePIB = alto * 0.25;
      const tendenciaPIB = (progresoX / ancho) * -40; // Simula crecimiento (sube en el canvas)
      const estacionalidadPIB = Math.sin(progresoX * 0.02) * 10; // Ciclos económicos sinusoides
      const ruidoPIB = Math.sin(progresoX * 0.2) * 1.2; // Pequeñas fluctuaciones diarias
      const pibYActual = lineaBasePIB + tendenciaPIB + estacionalidadPIB + ruidoPIB;

      if (puntosPIB.length === 0 || puntosPIB[puntosPIB.length - 1].x < progresoX) {
        puntosPIB.push({ x: progresoX, y: pibYActual });
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
      // 2. CÁLCULO Y DIBUJO: PRECIO DE ACTIVO (Zona Media)
      // ========================================================
      if (tiempo % 2 === 0) { // Ralentizamos el cálculo para que sea un avance pausado
        const cambioAleatorio = (Math.random() - 0.49) * 3.5; // Simulación Random Walk
        // Evitamos que la línea se salga de los márgenes de su zona asignada
        valorActualActivo = Math.max(alto * 0.35, Math.min(alto * 0.60, valorActualActivo + cambioAleatorio));
        puntosActivo.push({ x: progresoX, y: valorActualActivo });
      }

      ctx.beginPath();
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = COLORES.signal;
      for (let i = 0; i < puntosActivo.length; i++) {
        if (i === 0) ctx.moveTo(puntosActivo[i].x, puntosActivo[i].y);
        else ctx.lineTo(puntosActivo[i].x, puntosActivo[i].y);
      }
      ctx.stroke();

      // ========================================================
      // 3. CÁLCULO Y DIBUJO: VELAS JAPONESAS REALISTAS (Zona Inferior)
      // ========================================================
      if (progresoX >= proximaVelaX) {
        const esAlcista = Math.random() > 0.48; // Dirección matemática de la vela
        const tamañoCuerpo = Math.random() * 12 + 2; // Altura del cuerpo real
        
        const apertura = ultimoCierre;
        const cierre = esAlcista ? apertura - tamañoCuerpo : apertura + tamañoCuerpo;
        
        const cuerpoMasAlto = Math.min(apertura, cierre);
        const cuerpoMasBajo = Math.max(apertura, cierre);
        
        // Las mechas de máximo y mínimo nacen proporcionalmente de los extremos del cuerpo
        const maximo = cuerpoMasAlto - (Math.random() * 6);
        const minimo = cuerpoMasBajo + (Math.random() * 6);

        // Control de contención vertical de la serie de velas
        if (cierre > alto * 0.85) ultimoCierre = alto * 0.80;
        else if (cierre < alto * 0.62) ultimoCierre = alto * 0.68;
        else ultimoCierre = cierre;

        listaVelas.push({ apertura, maximo, minimo, cierre, posicionX: proximaVelaX });
        proximaVelaX += espacioTotalVela;
      }

      // Dibujamos cada una de las velas calculadas en la pantalla
      listaVelas.forEach((vela) => {
        const opacidad = calcularOpacidadFade(vela.posicionX);
        if (opacidad <= 0) return;

        const esVelaVerde = vela.cierre < vela.apertura; 
        const centroX = Math.floor(vela.posicionX + anchoVela / 2);

        // A. Dibujar la mecha vertical (línea fina central de Máximo a Mínimo)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(20, 23, 28, 0.15)';
        ctx.lineWidth = 1;
        ctx.moveTo(centroX, Math.floor(vela.maximo));
        ctx.lineTo(centroX, Math.floor(vela.minimo));
        ctx.stroke();

        // B. Dibujar el cuerpo rectangular (Apertura a Cierre)
        ctx.fillStyle = esVelaVerde ? COLORES.velaAlcista : COLORES.velaBajista;
        const cuerpoY = Math.floor(Math.min(vela.apertura, vela.cierre));
        const cuerpoH = Math.max(1, Math.floor(Math.abs(vela.apertura - vela.cierre)));
        
        ctx.fillRect(vela.posicionX, cuerpoY, anchoVela, cuerpoH);
      });

      // ========================================================
      // MÁSCARA DE DEGRADADO (Protección estricta de legibilidad)
      // ========================================================
      // Hace opaca la zona de texto (izquierda) y se vuelve transparente hacia la derecha
      const degradado = ctx.createLinearGradient(0, 0, ancho, 0);
      degradado.addColorStop(0, COLORES.fondo);
      degradado.addColorStop(0.38, COLORES.fondo); // 38% del ancho completamente limpio de ruido
      degradado.addColorStop(0.58, 'rgba(250, 250, 247, 0.5)');
      degradado.addColorStop(1, 'rgba(250, 250, 247, 0)');
      
      ctx.fillStyle = degradado;
      ctx.fillRect(0, 0, ancho, alto);

      idAnimacion = requestAnimationFrame(renderizar);
    };

    renderizar();

    // Limpieza de memoria al desmontar el componente
    return () => {
      cancelAnimationFrame(idAnimacion);
      window.removeEventListener('resize', ajustarPantalla);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] bg-[#FAFAF7] overflow-hidden border-b border-[#E3E1DC]">
      {/* El lienzo de dibujo técnico */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Capa de interfaz de usuario (UI) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center">
        {/* Franja del 40% izquierdo con textos totalmente legibles */}
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

        {/* Zona del 60% derecho libre para la simulación visual */}
        <div className="hidden md:block md:w-[60%] h-full" />
      </div>
    </div>
  );
}