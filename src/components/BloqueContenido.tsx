// BloqueContenido.tsx
// Componente reutilizable: una "caja" con un título y un texto dentro.
// Lo usaremos en todas las páginas para los distintos bloques (ej. "Gráfico", "Métricas"...)
// En lugar de copiar y pegar el mismo HTML en cada página, lo definimos una vez aquí.

// Esto define qué datos espera recibir el componente: un título (texto) y un contenido (texto).
type Props = {
  titulo: string;
  children: React.ReactNode; // "children" es lo que se ponga DENTRO de <BloqueContenido>...</BloqueContenido>
};

export default function BloqueContenido({ titulo, children }: Props) {
  return (
    <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
      <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
      <div className="text-neutral-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
