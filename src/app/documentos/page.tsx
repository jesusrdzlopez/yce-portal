import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import SitioPublico from "@/components/SitioPublico";

export const metadata: Metadata = { title: "Documentos | YCE México" };

const DOCUMENTOS = [
  {
    titulo: "Solicitud de participación",
    descripcion: "Formato oficial para iniciar tu solicitud al programa.",
    archivo: "solicitud-participacion.pdf",
  },
  {
    titulo: "Carta Lions",
    descripcion: "Formato de la carta del Club de Leones que respalda tu candidatura.",
    archivo: "carta-lions.pdf",
  },
  {
    titulo: "Carta médica",
    descripcion: "Formato que debe llenar y firmar tu médico.",
    archivo: "carta-medica.pdf",
  },
  {
    titulo: "Requisitos de seguro médico",
    descripcion: "Cobertura mínima que debe tener tu seguro para viajar.",
    archivo: "requisitos-seguro-medico.pdf",
  },
  {
    titulo: "Guía del participante",
    descripcion: "Todo lo que necesitas saber antes, durante y después del intercambio.",
    archivo: "guia-participante.pdf",
  },
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
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Descarga los formatos de tu solicitud</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Descárgalos, complétalos y después sube tu expediente desde el portal con tu cuenta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {DOCUMENTOS.map((doc) => {
            const disponible = fs.existsSync(path.join(carpeta, doc.archivo));

            return (
              <div
                key={doc.archivo}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-900">
                    PDF
                  </span>
                  <div>
                    <h2 className="font-semibold text-slate-900">{doc.titulo}</h2>
                    <p className="mt-1 text-sm text-slate-600">{doc.descripcion}</p>
                  </div>
                </div>

                {disponible ? (
                  <a
                    href={`/documentos/${doc.archivo}`}
                    download
                    className="shrink-0 rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Descargar
                  </a>
                ) : (
                  <span className="shrink-0 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500">
                    Próximamente
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-semibold text-amber-900">¿Ya tienes todos tus documentos?</h2>
          <p className="mt-1 text-sm text-amber-900/80">
            Inicia sesión para subir tu pasaporte, carta Lions, seguro médico y carta médica.
          </p>
        </div>
      </section>
    </SitioPublico>
  );
}
