"use client";

import { useActionState } from "react";
import { cambiarPassword, type EstadoPassword } from "@/app/cuenta/password/actions";

const CAMPO =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none";

export default function FormularioPassword() {
  const [estado, accion, pendiente] = useActionState<EstadoPassword, FormData>(cambiarPassword, {});

  return (
    <form action={accion} className="space-y-4">
      {estado.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {estado.error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700">Contraseña actual</label>
        <input name="actual" type="password" required autoComplete="current-password" className={CAMPO} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Contraseña nueva</label>
        <input name="nueva" type="password" required minLength={8} autoComplete="new-password" className={CAMPO} />
        <p className="mt-1 text-xs text-slate-500">
          Mínimo 8 caracteres, con mayúsculas, minúsculas y números.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Confirmar contraseña nueva</label>
        <input name="confirmar" type="password" required minLength={8} autoComplete="new-password" className={CAMPO} />
      </div>
      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-lg bg-blue-700 px-4 py-3 text-base font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {pendiente ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}
