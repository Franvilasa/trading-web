// Footer.tsx
// Pie de página que aparece al final de todas las secciones.
// Aquí irán más adelante los enlaces legales (aviso legal, privacidad) y los disclaimers.
export default function Footer() {
  // Calculamos el año actual automáticamente, para no tener que actualizarlo a mano cada enero.
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-neutral-500 space-y-2">
        {/* Disclaimer placeholder: este texto SÍ es importante mantenerlo,
            aunque el resto del contenido sea lorem ipsum, por el tema legal (CNMV) que comentasteis. */}
        <p>
          Aviso: las rentabilidades pasadas no garantizan resultados futuros.
          Contenido informativo, no constituye asesoramiento financiero.
        </p>
        <p>© {anioActual} NombreEmpresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
