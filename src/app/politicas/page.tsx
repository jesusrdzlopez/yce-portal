import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import SitioPublico from "@/components/SitioPublico";
import ItemPolitica from "@/components/ItemPolitica";
import { APROBACION, BLOQUES, ELABORACION, FIRMAS, INTRO } from "@/lib/politicas";

export const metadata: Metadata = { title: "Políticas generales del programa | YCE México" };

const ARCHIVO_PDF = "normas-politicas-yce26.pdf";

const CLASES_TITULO = {
  2: "mt-14 border-b-2 border-amber-400 pb-2 text-2xl font-bold text-blue-950",
  3: "mt-10 text-xl font-bold text-blue-900",
  4: "mt-8 text-lg font-semibold text-slate-900",
} as const;

export default function PoliticasPage() {
  const hayPdf = fs.existsSync(path.join(process.cwd(), "public", "documentos", ARCHIVO_PDF));

  return (
    <SitioPublico activo="/politicas">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            MD B México 2026-2027
          </p>
          <h1 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
            Políticas generales del programa
          </h1>
          <p className="mt-3 max-w-3xl text-blue-100">
            Normas y Políticas del Programa de Campamentos e Intercambio Juveniles del Distrito
            Múltiple B México.
          </p>
          {hayPdf && (
            <a
              href={`/documentos/${ARCHIVO_PDF}`}
              download
              className="mt-6 inline-block rounded-xl bg-amber-400 px-6 py-3 font-semibold text-blue-950 hover:bg-amber-300"
            >
              Descargar documento en PDF
            </a>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <details open className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-wide text-blue-900">
              Contenido
            </summary>
            <nav className="mt-3 max-h-[60vh] space-y-1 overflow-y-auto text-sm">
              {BLOQUES.map((bloque) => (
                <a
                  key={bloque.id}
                  href={`#${bloque.id}`}
                  className={`block rounded-md px-2 py-1 hover:bg-blue-50 ${
                    bloque.nivel === 2
                      ? "mt-2 font-semibold text-slate-900"
                      : bloque.nivel === 3
                        ? "pl-4 font-medium text-slate-700"
                        : "pl-7 text-slate-600"
                  }`}
                >
                  {bloque.titulo}
                </a>
              ))}
              <a
                href="#aprobacion"
                className="mt-2 block rounded-md px-2 py-1 font-semibold text-slate-900 hover:bg-blue-50"
              >
                Aprobación
              </a>
            </nav>
          </details>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <p className="leading-relaxed text-slate-700">{INTRO}</p>

          {BLOQUES.map((bloque) => {
            const Titulo = `h${bloque.nivel}` as "h2" | "h3" | "h4";
            return (
              <section key={bloque.id} id={bloque.id} className="scroll-mt-24">
                <Titulo className={CLASES_TITULO[bloque.nivel]}>{bloque.titulo}</Titulo>

                {bloque.parrafos && (
                  <div className="mt-4 space-y-4">
                    {bloque.parrafos.map((parrafo) => (
                      <p key={parrafo} className="leading-relaxed text-slate-700">
                        {parrafo}
                      </p>
                    ))}
                  </div>
                )}

                {bloque.items && (
                  <div className="mt-4 space-y-4">
                    {bloque.items.map((item, i) => (
                      <ItemPolitica key={`${item.n}-${i}`} item={item} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          <section id="aprobacion" className="scroll-mt-24">
            <h2 className={CLASES_TITULO[2]}>Aprobación</h2>
            <p className="mt-4 leading-relaxed text-slate-700">{ELABORACION}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {FIRMAS.map((firma) => (
                <div key={firma.nombre} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="font-semibold text-slate-900">{firma.nombre}</p>
                  <p className="mt-1 text-sm text-slate-600">{firma.cargo}</p>
                  <p className="mt-1 text-sm text-slate-500">Distrito Múltiple B México · Ejercicio 2026-2027</p>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-lg font-semibold text-slate-900">Aprobado por</h3>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Distrito</th>
                    <th className="px-4 py-3 font-semibold">Gobernador</th>
                    <th className="px-4 py-3 font-semibold">Enterado: Asesor ICJ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {APROBACION.map((fila) => (
                    <tr key={fila.distrito}>
                      <td className="px-4 py-3 font-semibold text-blue-900">{fila.distrito}</td>
                      <td className="px-4 py-3 text-slate-700">{fila.gobernador}</td>
                      <td className="px-4 py-3 text-slate-700">{fila.asesor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </article>
      </div>
    </SitioPublico>
  );
}
