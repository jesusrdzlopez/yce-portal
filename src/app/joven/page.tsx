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
import SubidaDocumento from "@/components/SubidaDocumento";

export default async function JovenPage() {
  const session = await auth();
  if (!session) return null;

  let expediente = await prisma.expediente.findUnique({
    where: { usuarioId: session.user.id },
    include: { documentos: true },
  });

  if (!expediente) {
    const usuario = await prisma.usuario.findUniqueOrThrow({ where: { id: session.user.id } });
    if (!usuario.distritoId) {
      throw new Error("Tu usuario no tiene un distrito asignado. Contacta a coordinación nacional.");
    }
    expediente = await prisma.expediente.create({
      data: { usuarioId: usuario.id, distritoId: usuario.distritoId },
      include: { documentos: true },
    });
  }

  const vigentes = documentosVigentes(expediente.documentos);

  return (
    <>
      <EncabezadoPortal titulo="Mi expediente" nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">Estado general de tu expediente</p>
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

                {doc?.estado === "CORRECCION" && doc.comentario && (
                  <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {doc.comentario}
                  </p>
                )}

                {doc && (
                  <a
                    href={`/api/documentos/${doc.id}/archivo`}
                    target="_blank"
                    className="mt-2 inline-block text-sm text-blue-700 underline"
                  >
                    Ver archivo actual (versión {doc.version})
                  </a>
                )}

                <div className="mt-3">
                  <SubidaDocumento categoria={categoria} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
