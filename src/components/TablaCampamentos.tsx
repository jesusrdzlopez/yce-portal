"use client";

import { useMemo, useState } from "react";

type Columna = { clave: string; etiqueta: string };
type Fila = Record<string, string>;

function EnlaceSitio({ valor }: { valor: string }) {
  if (!valor) return <span className="text-slate-400">—</span>;
  const href = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-all text-blue-800 underline hover:text-blue-950"
    >
      Visitar sitio
    </a>
  );
}

function Celda({ columna, valor }: { columna: Columna; valor: string }) {
  if (columna.clave === "sitio") return <EnlaceSitio valor={valor} />;
  if (!valor) return <span className="text-slate-400">—</span>;
  if (columna.clave === "lugares") {
    return (
      <span className="inline-flex min-w-8 justify-center rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-blue-900">
        {valor}
      </span>
    );
  }
  return <>{valor}</>;
}

const ANCHA = new Set(["nombre", "actividadesFamilia", "actividadesCamp"]);

export default function TablaCampamentos({
  columnas,
  campamentos,
}: {
  columnas: Columna[];
  campamentos: Fila[];
}) {
  const [pais, setPais] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const paises = useMemo(
    () => Array.from(new Set(campamentos.map((c) => c.pais).filter(Boolean))).sort((a, b) => a.localeCompare(b, "es")),
    [campamentos]
  );

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return campamentos.filter((c) => {
      if (pais && c.pais !== pais) return false;
      if (!termino) return true;
      return Object.values(c).some((valor) => valor.toLowerCase().includes(termino));
    });
  }, [campamentos, pais, busqueda]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-700 focus:outline-none"
        >
          <option value="">Todos los países</option>
          {paises.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar campamento, lugar, idioma…"
          className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-700 focus:outline-none"
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {filtrados.length} de {campamentos.length} campamentos
      </p>

      {/* Escritorio: tabla con desplazamiento horizontal */}
      <div className="mt-3 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              {columnas.map((columna, i) => (
                <th
                  key={columna.clave}
                  className={`min-w-32 px-4 py-3 align-bottom font-semibold ${
                    i === 0 ? "sticky left-0 z-[1] bg-blue-900" : ""
                  }`}
                >
                  {columna.etiqueta}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrados.map((campamento, fila) => (
              <tr key={fila} className="group hover:bg-slate-50">
                {columnas.map((columna, i) => (
                  <td
                    key={columna.clave}
                    className={`px-4 py-3 align-top text-slate-700 ${
                      ANCHA.has(columna.clave) ? "min-w-56" : "whitespace-nowrap"
                    } ${i === 0 ? "sticky left-0 z-[1] bg-white font-medium text-slate-900 group-hover:bg-slate-50" : ""}`}
                  >
                    <Celda columna={columna} valor={campamento[columna.clave] ?? ""} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular: una tarjeta por campamento */}
      <div className="mt-3 space-y-4 md:hidden">
        {filtrados.map((campamento, fila) => (
          <article key={fila} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">{campamento.pais}</p>
            <h3 className="mt-1 font-semibold text-slate-900">{campamento.nombre || campamento.lugar}</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {columnas
                .filter((c) => c.clave !== "pais" && c.clave !== "nombre")
                .map((columna) => (
                  <div key={columna.clave}>
                    <dt className="text-xs font-medium text-slate-500">{columna.etiqueta}</dt>
                    <dd className="text-slate-800">
                      <Celda columna={columna} valor={campamento[columna.clave] ?? ""} />
                    </dd>
                  </div>
                ))}
            </dl>
          </article>
        ))}
      </div>

      {filtrados.length === 0 && (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
          No se encontraron campamentos con ese filtro.
        </p>
      )}
    </div>
  );
}
