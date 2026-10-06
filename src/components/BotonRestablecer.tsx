"use client";

import { useActionState, useState } from "react";
import CredencialesTemporales from "@/components/CredencialesTemporales";

type Estado = {
  error?: string;
  credenciales?: { nombre: string; email: string; passwordTemporal: string };
};

export default function BotonRestablecer({
  usuarioId,
  accion,
}: {
  usuarioId: string;
  accion: (anterior: Estado, formData: FormData) => Promise<Estado>;
}) {
  const [estado, ejecutar, pendiente] = useActionState<Estado, FormData>(accion, {});
  const [confirmando, setConfirmando] = useState(false);

  return (
    <div className="space-y-2">
      {estado.credenciales ? (
        <CredencialesTemporales {...estado.credenciales} />
      ) : confirmando ? (
        <form action={ejecutar} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="usuarioId" value={usuarioId} />
          <span className="text-sm text-slate-600">¿Generar una contraseña temporal nueva?</span>
          <button
            type="submit"
            disabled={pendiente}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
          >
            {pendiente ? "Generando…" : "Sí, restablecer"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmando(false)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmando(true)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Restablecer contraseña
        </button>
      )}
      {estado.error && <p className="text-sm text-red-600">{estado.error}</p>}
    </div>
  );
}
