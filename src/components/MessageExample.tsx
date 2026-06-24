import Image from "next/image";
import { ALERTAS_OPERATIVAS } from "../lib/constants/alertasOperativas";

export function MessageExample() {
  const { ejemplo } = ALERTAS_OPERATIVAS;

  return (
    <figure className="mx-auto w-full max-w-[480px]">
      <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-sm">
        <Image
          src={ejemplo.imagen}
          alt={ejemplo.alt}
          width={700}
          height={280}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-[var(--muted)]">
        {ejemplo.pie}
      </figcaption>
    </figure>
  );
}
