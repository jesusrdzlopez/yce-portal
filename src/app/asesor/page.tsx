import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import EncabezadoPortal from "@/components/EncabezadoPortal";
import Semaforo from "@/components/Semaforo";

export default async function AsesorPage() {
  const session = await auth();
  if (!session) return null;

  const expedientes = await prisma.expediente.findMany({
    where: { distritoId: session.user.distritoId ?? undefined },
    include: { usuario: true },
    orderBy: { usuario: { nombre: "asc" } },
  });

  return (
    <>
      <EncabezadoPortal titulo="Jóvenes de mi distrito" nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {expedientes.length === 0 && (
          <p className="text-slate-500">Todavía no hay jóvenes registrados en tu distrito.</p>
        )}

        <div className="space-y-3">
          {expedientes.map((expediente) => (
            <Link
              key={expediente.id}
              href={`/asesor/${expediente.id}`}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300"
            >
              <div>
                <p className="font-medium text-slate-900">{expediente.usuario.nombre}</p>
                <p className="text-sm text-slate-500">{expediente.usuario.email}</p>
              </div>
              <Semaforo estado={expediente.estado} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
