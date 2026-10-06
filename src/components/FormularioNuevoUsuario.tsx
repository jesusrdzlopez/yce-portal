"use client";

import { useActionState, useState } from "react";
import { crearUsuario, type EstadoUsuario } from "@/app/nacional/usuarios/actions";
import CredencialesTemporales from "@/components/CredencialesTemporales";

const CAMPO =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none";

export default function FormularioNuevoUsuario({
  distritos,
}: {
  distritos: { id: string; etiqueta: string }[];
}) {
  const [estado, accion, pendiente] = useActionState<EstadoUsuario, FormData>(crearUsuario, {});
  const [rol, setRol] = useState("ASESOR");

  return (
    <div className="space-y-4">
      {estado.credenciales && <CredencialesTemporales {...estado.credenciales} />}

      <form action={accion} key={estado.credenciales?.email ?? "nuevo"} className="grid gap-4 sm:grid-cols-2">
        {estado.error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">
            {estado.error}
          </p>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">Tipo de usuario</label>
          <select name="rol" value={rol} onChange={(e) => setRol(e.target.value)} className={CAMPO}>
            <option value="ASESOR">Asesor de distrito (co-asesor incluido)</option>
            <option value="NACIONAL">Coordinación nacional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Distrito</label>
          <select
            name="distritoId"
            required={rol === "ASESOR"}
            disabled={rol !== "ASESOR"}
            defaultValue=""
            className={`${CAMPO} disabled:bg-slate-100`}
          >
            <option value="">{rol === "ASESOR" ? "Selecciona un distrito" : "No aplica"}</option>
            {distritos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.etiqueta}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre completo</label>
          <input name="nombre" required className={CAMPO} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Correo</label>
          <input name="email" type="email" required className={CAMPO} />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pendiente}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-base font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {pendiente ? "Creando…" : "Crear usuario"}
          </button>
          <p className="mt-2 text-xs text-slate-500">
            Se genera una contraseña temporal que verás una sola vez. La persona debe cambiarla al
            entrar por primera vez.
          </p>
        </div>
      </form>
    </div>
  );
}
