"use client";

import { useState } from "react";
import { ALERTAS_OPERATIVAS } from "../../lib/constants/alertasOperativas";
import { MessageExample } from "../../components/MessageExample";
import { PricingCard } from "../../components/PricingCard";
import { InterestModal } from "../../components/InterestModal";
import { LiveSignalDemo } from "../../components/LiveSignalDemo";
// import BloqueContenido from "../../components/BloqueContenido";
// Nota: BloqueContenido ya existe en tu proyecto (caja título + contenido).
// Si quieres que esta página herede el mismo wrapper que el resto de
// placeholders, envuelve cada <section> de abajo con <BloqueContenido título="...">.

export default function AlertasOperativasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { hero, sistema, planes, disclaimerPrecios } = ALERTAS_OPERATIVAS;

  return (
    <main className="bg-bg text-ink">
      {/* Cabecera */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-signal">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 font-sans font-bold tracking-tight text-3xl leading-tight sm:text-4xl">
          {hero.titulo}
        </h1>
        <p className="mt-6 text-base text-muted">{hero.cuerpo}</p>
        <p className="mt-6 text-sm text-muted">
          {hero.notaSeparacionLegal}
        </p>
      </section>

      {/* Demo animada (ilustrativa, no datos reales) */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-6 text-center text-xl font-medium">
          {ALERTAS_OPERATIVAS.demoEnVivo.titulo}
        </h2>
        <LiveSignalDemo />
      </section>

      {/* Mensaje de ejemplo */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-6 text-center text-xl font-medium">
          {ALERTAS_OPERATIVAS.ejemplo.titulo}
        </h2>
        <MessageExample />
      </section>

      {/* Sistema disponible + Pricing */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-medium">{sistema.nombre}</h2>
          <p className="mt-1 font-mono text-sm text-muted">
            {sistema.handle}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            {sistema.descripcion}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <PricingCard
            label={planes.mensual.label}
            precio={planes.mensual.precio}
            moneda={planes.moneda}
            sufijo={planes.mensual.sufijo}
            detalle={planes.mensual.detalle}
            nota={planes.mensual.nota}
            ctaLabel={planes.ctaLabel}
            onSelect={() => setModalOpen(true)}
          />
          <PricingCard
            label={planes.anual.label}
            precio={planes.anual.precio}
            moneda={planes.moneda}
            sufijo={planes.anual.sufijo}
            detalle={planes.anual.detalle}
            nota={planes.anual.nota}
            destacado={planes.anual.destacado}
            ctaLabel={planes.ctaLabel}
            onSelect={() => setModalOpen(true)}
          />
        </div>

        <ul className="mx-auto mt-10 max-w-md space-y-2 text-sm text-ink">
          {planes.incluye.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-signal">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-muted">
          {disclaimerPrecios}
        </p>
      </section>

      <InterestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
