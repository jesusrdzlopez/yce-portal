"use client";

import { useActionState, useEffect, useState } from "react";
import { actualizarNombre, type EstadoNombre } from "@/app/nacional/usuarios/actions";

export default function EditarNombre({ usuarioId, nombre }: { usuarioId: string; nombre: string }) {
  const [editando, setEditando] = useState(false);
  const [estado, accion, pendiente] = useActionState<EstadoNombre, FormData>(actualizarNombre, {});

  useEffect(() => {
    if (estado.guardado) setEditando(false);
  }, [estado]);

  if (!editando) {
    return (
      <button
        type="button"
        onClick={() => setEditando(true)}
        className="text-xs font-medium text-blue-800 underline hover:text-blue-950"
      >
        Editar nombre
      </button>
    );
  }

  return (
    <form action={accion} className="mt-2 flex flex-wrap items-center gap-2">
      <input type="hidden" name="usuarioId" value={usuarioId} />
      <input
        name="nombre"
        defaultValue={nombre}
        required
        autoFocus
        className="w-72 max-w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pendiente}
        className="rounded-lg bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {pendiente ? "Guardando…" : "Guardar"}
      </button>
      <button
        type="button"
        onClick={() => setEditando(false)}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
      >
        Cancelar
      </button>
      {estado.error && <p className="w-full text-sm text-red-600">{estado.error}</p>}
    </form>
  );
}
