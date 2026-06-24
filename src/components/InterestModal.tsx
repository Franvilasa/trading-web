"use client";

import { useEffect, useRef } from "react";
import { ALERTAS_OPERATIVAS } from "../lib/constants/alertasOperativas";

interface InterestModalProps {
  open: boolean;
  onClose: () => void;
}

export function InterestModal({ open, onClose }: InterestModalProps) {
  const { modalInteres } = ALERTAS_OPERATIVAS;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-[var(--bg)] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="interest-modal-title"
          className="text-lg font-semibold text-[var(--ink)]"
        >
          {modalInteres.titulo}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{modalInteres.cuerpo}</p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-5 w-full rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
        >
          {modalInteres.cierreLabel}
        </button>
      </div>
    </div>
  );
}
