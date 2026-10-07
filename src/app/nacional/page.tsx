import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import EncabezadoPortal from "@/components/EncabezadoPortal";
import PieSitio from "@/components/PieSitio";
import AsignarCupo from "@/components/AsignarCupo";

export default async function NacionalPage() {
  const session = await auth();
  if (!session) return null;

  const expedientes = await prisma.expediente.findMany({
    where: { estado: "VALIDADO" },
    include: { usuario: true, distrito: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <EncabezadoPortal titulo="Expedientes validados" nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        {expedientes.length === 0 && (
          <p className="text-slate-500">Todavía no hay expedientes validados por los distritos.</p>
        )}

        <div className="space-y-3">
          {expedientes.map((expediente) => (
            <div
              key={expediente.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{expediente.usuario.nombre}</p>
                <p className="text-sm text-slate-500">
                  {expediente.distrito.nombre} · {expediente.usuario.email}
                </p>
              </div>
              <AsignarCupo expedienteId={expediente.id} cupoActual={expediente.cupoAsignado} />
            </div>
          ))}
        </div>
      </main>
      <PieSitio />
    </>
  );
}
