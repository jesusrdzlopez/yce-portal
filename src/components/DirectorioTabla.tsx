"use client";

import { useMemo, useState } from "react";
import type { AsesorICJ } from "@/lib/directorio";

function enlaceTelefono(telefono: string) {
  return `tel:+52${telefono.replace(/\D/g, "")}`;
}

export default function DirectorioTabla({ asesores }: { asesores: AsesorICJ[] }) {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return asesores;
    return asesores.filter(
      (a) =>
        a.distrito.toLowerCase().includes(termino) ||
        a.nombre.toLowerCase().includes(termino) ||
        a.correo.toLowerCase().includes(termino) ||
        (a.telefono ?? "").includes(termino)
    );
  }, [asesores, busqueda]);

  return (
    <div>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por distrito, nombre o correo…"
        className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-700 focus:outline-none"
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-blue-900 text-sm text-white">
            <tr>
              <th className="px-5 py-3 font-semibold">Distrito</th>
              <th className="px-5 py-3 font-semibold">Asesor ICJ</th>
              <th className="hidden px-5 py-3 font-semibold sm:table-cell">Correo</th>
              <th className="hidden px-5 py-3 font-semibold md:table-cell">Teléfono</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrados.map((asesor) => (
              <tr key={asesor.distrito} className="hover:bg-slate-50">
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex h-9 w-12 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-blue-900">
                    {asesor.distrito}
                  </span>
                </td>
                <td className="px-5 py-4 align-top">
                  <p className="font-medium text-slate-900">{asesor.nombre}</p>
                  <a
                    href={`mailto:${asesor.correo}`}
                    className="mt-1 block break-all text-sm text-blue-800 underline sm:hidden"
                  >
                    {asesor.correo}
                  </a>
                  {asesor.telefono && (
                    <a
                      href={enlaceTelefono(asesor.telefono)}
                      className="mt-1 block text-sm text-blue-800 underline md:hidden"
                    >
                      {asesor.telefono}
                    </a>
                  )}
                </td>
                <td className="hidden px-5 py-4 align-top sm:table-cell">
                  <a
                    href={`mailto:${asesor.correo}`}
                    className="break-all text-blue-800 underline hover:text-blue-950"
                  >
                    {asesor.correo}
                  </a>
                </td>
                <td className="hidden px-5 py-4 align-top md:table-cell">
                  {asesor.telefono ? (
                    <a
                      href={enlaceTelefono(asesor.telefono)}
                      className="whitespace-nowrap text-blue-800 underline hover:text-blue-950"
                    >
                      {asesor.telefono}
                    </a>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
