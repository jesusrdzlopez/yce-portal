"use client";

import { useActionState } from "react";
import { registrarJoven, type EstadoRegistro } from "@/app/registro/actions";

const CAMPO =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none";

export default function FormularioRegistro({
  distritos,
}: {
  distritos: { id: string; etiqueta: string }[];
}) {
  const [estado, accion, pendiente] = useActionState<EstadoRegistro, FormData>(registrarJoven, {});

  return (
    <form action={accion} className="mt-6 space-y-4">
      {estado.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {estado.error}
        </p>
      )}

      <div className="hidden" aria-hidden="true">
        <label>
          No llenar
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Nombre completo</label>
        <input name="nombre" required defaultValue={estado.valores?.nombre} className={CAMPO} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Correo</label>
        <input
          name="email"
          type="email"
          required
          defaultValue={estado.valores?.email}
          className={CAMPO}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Distrito</label>
        <select
          name="distritoId"
          required
          defaultValue={estado.valores?.distritoId ?? ""}
          className={CAMPO}
        >
          <option value="" disabled>
            Selecciona tu distrito
          </option>
          {distritos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.etiqueta}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Contraseña</label>
        <input name="password" type="password" required minLength={8} className={CAMPO} />
        <p className="mt-1 text-xs text-slate-500">
          Mínimo 8 caracteres, con mayúsculas, minúsculas y números.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Confirmar contraseña</label>
        <input name="confirmar" type="password" required minLength={8} className={CAMPO} />
      </div>

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-lg bg-blue-700 px-4 py-3 text-base font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {pendiente ? "Creando cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );
}
