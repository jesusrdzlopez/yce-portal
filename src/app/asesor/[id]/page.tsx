import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { documentosVigentes } from "@/lib/expediente";
import {
  CATEGORIAS_DOCUMENTO,
  NOMBRE_CATEGORIA,
  NOMBRE_ESTADO_DOCUMENTO,
  colorSemaforo,
  CLASES_SEMAFORO,
} from "@/lib/catalogos";
import EncabezadoPortal from "@/components/EncabezadoPortal";
import Semaforo from "@/components/Semaforo";
import AccionesDocumento from "@/components/AccionesDocumento";

export default async function DetalleExpedienteAsesor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) return null;

  const { id } = await params;
  const expediente = await prisma.expediente.findUnique({
    where: { id },
    include: { documentos: true, usuario: true },
  });
  if (!expediente) notFound();

  if (session.user.rol === "ASESOR" && expediente.distritoId !== session.user.distritoId) {
    redirect("/asesor");
  }

  const vigentes = documentosVigentes(expediente.documentos);

  return (
    <>
      <EncabezadoPortal titulo={expediente.usuario.nombre} nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">{expediente.usuario.email}</p>
          <Semaforo estado={expediente.estado} />
        </div>

        <div className="space-y-4">
          {CATEGORIAS_DOCUMENTO.map((categoria) => {
            const doc = vigentes.find((d) => d.categoria === categoria);
            const color = doc ? colorSemaforo(doc.estado) : "rojo";

            return (
              <div key={categoria} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-slate-900">{NOMBRE_CATEGORIA[categoria]}</h2>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${CLASES_SEMAFORO[color]}`}
                  >
                    {doc ? NOMBRE_ESTADO_DOCUMENTO[doc.estado] : "Falta por subir"}
                  </span>
                </div>

                {doc ? (
                  <>
                    <a
                      href={`/api/documentos/${doc.id}/archivo`}
                      target="_blank"
                      className="mt-2 inline-block text-sm text-blue-700 underline"
                    >
                      Ver archivo (versión {doc.version})
                    </a>
                    {doc.estado !== "VALIDADO" && <AccionesDocumento documentoId={doc.id} />}
                  </>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">El joven todavía no sube este documento.</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
