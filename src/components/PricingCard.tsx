interface PricingCardProps {
  label: string;
  precio: number;
  moneda: string;
  sufijo: string;
  detalle: string;
  nota: string;
  destacado?: boolean;
  ctaLabel: string;
  onSelect: () => void;
}

export function PricingCard({
  label,
  precio,
  moneda,
  sufijo,
  detalle,
  nota,
  destacado,
  ctaLabel,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border bg-bg p-6 ${
        destacado ? "border-signal" : "border-line"
      }`}
    >
      {destacado && (
        <span className="mb-3 inline-block w-fit rounded-full bg-signal/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-signal">
          Ahorra con el anual
        </span>
      )}

      <h3 className="text-sm font-medium uppercase tracking-wide text-muted">
        {label}
      </h3>

      <p className="mt-3 font-mono text-4xl text-ink">
        {moneda === "EUR" ? "€" : moneda}
        {precio}
        <span className="text-base text-muted">{sufijo}</span>
      </p>

      <p className="mt-2 text-sm text-ink">{detalle}</p>
      <p className="mt-1 text-xs text-muted">{nota}</p>

      <button
        onClick={onSelect}
        className="mt-6 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
