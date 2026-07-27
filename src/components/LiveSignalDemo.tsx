"use client";

import { useEffect, useRef, useState } from "react";
import { ALERTAS_OPERATIVAS } from "../lib/constants/alertasOperativas";

type EstadoBot = "wait" | "enter" | "hold" | "close";

interface Vela {
  apertura: number;
  maximo: number;
  minimo: number;
  cierre: number;
  posicionX: number;
}

interface Marcador {
  x: number;
  y: number;
  tipo: "buy" | "sell";
  vida: number;
}

interface LineaAlerta {
  x: number;
  tipo: "buy" | "sell";
  vida: number;
}

export function LiveSignalDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pnl, setPnl] = useState("+0.0%");
  const [pos, setPos] = useState("—");
  const [botText, setBotText] = useState("monitorizando");
  const [botColor, setBotColor] = useState("#6B7280");
  const [log, setLog] = useState<string[]>([]);

  function pushLog(msg: string) {
    setLog((prev) => [msg, ...prev].slice(0, 2));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function fit() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * devicePixelRatio;
      canvas!.height = rect.height * devicePixelRatio;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(canvas);

    const alto = 160;
    const anchoVela = 6,
      espacioVela = 4,
      espacioTotalVela = anchoVela + espacioVela;

    let listaVelas: Vela[] = [];
    let proximaVelaX = 0;
    let ultimoCierre = alto * 0.55;
    let progresoXVelas = 0;

    const VELOCIDAD = 0.9 * 0.85; // -15% velocidad de generación de velas
    const VOLATILIDAD = 1.5; // +20% tamaño de cuerpo/mechas

    let marcadores: Marcador[] = [];
    let lineasAlerta: LineaAlerta[] = [];
    const VIDA_MARCADOR = 90;
    const FPS_ESTIMADO = 60;
    const VIDA_LINEA = FPS_ESTIMADO * 1; // ~1 segundo

    function generarVelaSiToca(): Vela | null {
      progresoXVelas += VELOCIDAD;
      if (progresoXVelas - proximaVelaX >= espacioTotalVela) {
        const esAlcista = Math.random() > 0.47;
        const tamañoCuerpo = (Math.random() * 10 + 2) * VOLATILIDAD;
        const apertura = ultimoCierre;
        const cierre = esAlcista ? apertura - tamañoCuerpo : apertura + tamañoCuerpo;
        const cuerpoMasAlto = Math.min(apertura, cierre);
        const cuerpoMasBajo = Math.max(apertura, cierre);
        const maximo = cuerpoMasAlto - Math.random() * 5 * VOLATILIDAD;
        const minimo = cuerpoMasBajo + Math.random() * 5 * VOLATILIDAD;

        if (cierre > alto * 0.85) ultimoCierre = alto * 0.78;
        else if (cierre < alto * 0.2) ultimoCierre = alto * 0.32;
        else ultimoCierre = cierre;

        const vela: Vela = { apertura, maximo, minimo, cierre, posicionX: proximaVelaX };
        listaVelas.push(vela);
        proximaVelaX += espacioTotalVela;
        return vela;
      }
      return null;
    }

    let scrollOffset = 0;
    let state: EstadoBot = "wait";
    let stateTimer = 0;
    let entryVela: Vela | null = null;
    let entryPrice = 0;

    function marcarSenal(vela: Vela | null, tipo: "buy" | "sell") {
      if (!vela) return;
      const y = tipo === "buy" ? vela.maximo : vela.minimo;
      marcadores.push({ x: vela.posicionX + anchoVela / 2, y, tipo, vida: 0 });
      lineasAlerta.push({ x: vela.posicionX + anchoVela / 2, tipo, vida: 0 });
    }

    let rafId: number;

    function loop() {
      const nueva = generarVelaSiToca();
      scrollOffset = Math.max(0, proximaVelaX - canvas!.clientWidth + 120);
      if (nueva) listaVelas = listaVelas.filter((v) => v.posicionX > scrollOffset - 120);

      stateTimer++;
      if (state === "wait" && stateTimer > 130) {
        state = "enter";
        stateTimer = 0;
        entryVela = listaVelas[listaVelas.length - 1] ?? null;
        entryPrice = entryVela ? entryVela.cierre : ultimoCierre;
        setBotColor("#1FA855");
        setBotText("ejecutando orden");
        marcarSenal(entryVela, "buy");
        pushLog("orden ejecutada · compra a " + (entryPrice / alto).toFixed(3));
        setPos("long");
      } else if (state === "enter" && stateTimer > 20) {
        state = "hold";
        stateTimer = 0;
        setBotColor("#1FA855");
        setBotText("gestionando posición");
      } else if (state === "hold" && stateTimer > 150) {
        state = "close";
        stateTimer = 0;
        marcarSenal(listaVelas[listaVelas.length - 1] ?? null, "sell");
        const cur = ultimoCierre;
        const pnlValor = (((entryPrice - cur) / alto) * 100).toFixed(2);
        const positivo = Number(pnlValor) >= 0;
        setPnl((positivo ? "+" : "") + pnlValor + "%");
        pushLog("posición cerrada · pnl " + (positivo ? "+" : "") + pnlValor + "%");
        setPos("—");
        entryVela = null;
        setBotColor("#6B7280");
        setBotText("monitorizando");
      } else if (state === "close" && stateTimer > 80) {
        state = "wait";
        stateTimer = 0;
      }

      marcadores.forEach((m) => m.vida++);
      marcadores = marcadores.filter((m) => m.vida < VIDA_MARCADOR);
      lineasAlerta.forEach((l) => l.vida++);
      lineasAlerta = lineasAlerta.filter((l) => l.vida < VIDA_LINEA);

      draw();
      rafId = requestAnimationFrame(loop);
    }

    function draw() {
      const w = canvas!.clientWidth,
        h = canvas!.clientHeight;
      ctx!.clearRect(0, 0, w, h);
      const escala = h / alto;

      function fadeX(x: number) {
        if (x < 30) return x / 30;
        if (x > w - 30) return (w - x) / 30;
        return 1;
      }

      if ((state === "hold" || state === "enter") && entryVela) {
        const ey = h - entryPrice * escala;
        ctx!.strokeStyle = "#C8852A";
        ctx!.globalAlpha = 0.35;
        ctx!.setLineDash([3, 3]);
        ctx!.beginPath();
        ctx!.moveTo(0, ey);
        ctx!.lineTo(w, ey);
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = 1;
      }

      lineasAlerta.forEach((l) => {
        const x = l.x - scrollOffset;
        if (x < -10 || x > w + 10) return;
        const t = l.vida / VIDA_LINEA;
        const alpha = Math.max(0, 0.55 * (1 - t));
        ctx!.globalAlpha = alpha;
        ctx!.strokeStyle = l.tipo === "buy" ? "#1FA855" : "#D64545";
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      });
      ctx!.globalAlpha = 1;

      listaVelas.forEach((vela) => {
        const x = vela.posicionX - scrollOffset;
        if (x < -anchoVela || x > w) return;
        const a = fadeX(x);
        if (a <= 0) return;
        const esVerde = vela.cierre < vela.apertura;
        const centroX = Math.floor(x + anchoVela / 2);

        ctx!.globalAlpha = a;
        ctx!.strokeStyle = "rgba(20,23,28,0.25)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(centroX, vela.maximo * escala);
        ctx!.lineTo(centroX, vela.minimo * escala);
        ctx!.stroke();

        ctx!.fillStyle = esVerde ? "#2D6E7D" : "#D77E22";
        const cuerpoY = Math.min(vela.apertura, vela.cierre) * escala;
        const cuerpoH = Math.max(1, Math.abs(vela.apertura - vela.cierre) * escala);
        ctx!.fillRect(x, cuerpoY, anchoVela, cuerpoH);
      });

      marcadores.forEach((m) => {
        const x = m.x - scrollOffset;
        if (x < -25 || x > w + 25) return;
        const t = m.vida / VIDA_MARCADOR;
        const escalaPop = t < 0.12 ? t / 0.12 : 1;
        const alpha = t < 0.12 ? 1 : Math.max(0, 1 - (t - 0.12) / 0.88);
        const size = 9 * escalaPop;
        const offset = 22;
        const y = m.tipo === "buy" ? m.y * escala + offset : m.y * escala - offset;
        const dir = m.tipo === "buy" ? 1 : -1;

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = m.tipo === "buy" ? "#1FA855" : "#D64545";
        ctx!.beginPath();
        ctx!.moveTo(x, y - dir * size);
        ctx!.lineTo(x - size * 0.85, y + dir * size * 0.6);
        ctx!.lineTo(x + size * 0.85, y + dir * size * 0.6);
        ctx!.closePath();
        ctx!.fill();
      });

      ctx!.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const { demoEnVivo } = ALERTAS_OPERATIVAS;

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div
        className="rounded-lg border border-line bg-bg p-4"
      >
        <div className="overflow-hidden rounded-lg bg-bg" style={{ height: 280 }}>
          <div className="flex items-center justify-between px-3.5 py-2.5 font-mono text-[11px] text-muted">
            <span className="tracking-wide">EURUSD · simulación</span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: botColor }}
              />
              {botText}
            </span>
          </div>

          <canvas ref={canvasRef} className="block h-40 w-full" />

          <div className="flex font-mono text-[11px]">
            <div className="flex-1 px-3.5 py-2">
              <div className="text-muted">P&amp;L</div>
              <div
                className="font-medium"
                style={{ color: pnl.startsWith("-") ? "#D77E22" : "#2D6E7D" }}
              >
                {pnl}
              </div>
            </div>
            <div className="flex-1 px-3.5 py-2 text-right">
              <div className="text-muted">posición</div>
              <div className="font-medium text-ink">{pos}</div>
            </div>
          </div>

          <div className="h-[34px] overflow-hidden px-3.5 pb-2.5 font-mono text-[10.5px] leading-snug text-muted">
            {log.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        {demoEnVivo.disclaimer}
      </p>
    </div>
  );
}
