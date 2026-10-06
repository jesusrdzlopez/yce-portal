import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import SitioPublico from "@/components/SitioPublico";

export const metadata: Metadata = { title: "Documentos | YCE México" };

const REQUISITOS = [
  { texto: "Formato de solicitud lleno en Excel", archivo: "solicitud-yce.xlsx" },
  { texto: "Carta de presentación para la familia anfitriona" },
  { texto: "Pasaporte escaneado" },
  { texto: "Foto personal tamaño credencial" },
  {
    texto:
      "Formato SAM en caso de ser menor de edad (Formato de Autorización de Salida del País de Niñas, Niños y Adolescentes)",
  },
  { texto: "Seguro de viaje" },
  { texto: "Comprobante de pago del trámite" },
];

export default function DocumentosPage() {
  const carpeta = path.join(process.cwd(), "public", "documentos");

  return (
    <SitioPublico activo="/documentos">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            Documentos
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Requisitos para tu expediente</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <ol className="space-y-3">
          {REQUISITOS.map((requisito, i) => {
            const disponible =
              requisito.archivo !== undefined &&
              fs.existsSync(path.join(carpeta, requisito.archivo));

            return (
              <li
                key={requisito.texto}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-base font-bold text-amber-400">
                    {i + 1}
                  </span>
                  <span className="font-medium text-slate-900">{requisito.texto}</span>
                </div>

                {requisito.archivo &&
                  (disponible ? (
                    <a
                      href={`/documentos/${requisito.archivo}`}
                      download
                      className="shrink-0 rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                      Descargar
                    </a>
                  ) : (
                    <span className="shrink-0 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500">
                      Próximamente
                    </span>
                  ))}
              </li>
            );
          })}
        </ol>

        <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 font-medium text-amber-900">
          Recuerda no comprar ningún vuelo hasta tener tu carta de aceptación final.
        </p>
      </section>
    </SitioPublico>
  );
}
