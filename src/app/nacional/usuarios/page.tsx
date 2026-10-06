import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { etiquetaDistrito } from "@/lib/distritos";
import EncabezadoPortal from "@/components/EncabezadoPortal";
import FormularioNuevoUsuario from "@/components/FormularioNuevoUsuario";
import BotonRestablecer from "@/components/BotonRestablecer";
import { cambiarActivo, restablecerPassword } from "./actions";

export const metadata: Metadata = { title: "Usuarios | YCE México" };
export const dynamic = "force-dynamic";

const FILTROS = [
  { valor: "", texto: "Todos" },
  { valor: "ASESOR", texto: "Asesores" },
  { valor: "NACIONAL", texto: "Coordinación nacional" },
  { valor: "JOVEN", texto: "Participantes" },
];

const NOMBRE_ROL = { JOVEN: "Participante", ASESOR: "Asesor", NACIONAL: "Coordinación nacional" };
const LIMITE = 100;

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: Promise<{ rol?: string; q?: string }>;
}) {
  const session = await auth();
  if (!session) return null;

  const { rol, q } = await searchParams;
  const termino = q?.trim();

  const where: Prisma.UsuarioWhereInput = {
    ...(rol === "ASESOR" || rol === "NACIONAL" || rol === "JOVEN" ? { rol } : {}),
    ...(termino
      ? { OR: [{ nombre: { contains: termino } }, { email: { contains: termino } }] }
      : {}),
  };

  const [distritos, usuarios, total] = await Promise.all([
    prisma.distrito.findMany({ orderBy: { nombre: "asc" } }),
    prisma.usuario.findMany({
      where,
      include: { distrito: true },
      orderBy: [{ rol: "asc" }, { nombre: "asc" }],
      take: LIMITE,
    }),
    prisma.usuario.count({ where }),
  ]);

  const enlaceFiltro = (valor: string) =>
    `/nacional/usuarios?${new URLSearchParams({
      ...(valor ? { rol: valor } : {}),
      ...(termino ? { q: termino } : {}),
    }).toString()}`;

  return (
    <>
      <EncabezadoPortal titulo="Usuarios" nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Crear asesor o coordinación nacional</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">
            Los participantes crean su propia cuenta desde la página de registro.
          </p>
          <FormularioNuevoUsuario
            distritos={distritos.map((d) => ({ id: d.id, etiqueta: etiquetaDistrito(d.nombre) }))}
          />
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1">
              {FILTROS.map((filtro) => (
                <Link
                  key={filtro.valor}
                  href={enlaceFiltro(filtro.valor)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    (rol ?? "") === filtro.valor
                      ? "bg-blue-900 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {filtro.texto}
                </Link>
              ))}
            </div>
            <form className="flex gap-2">
              {rol && <input type="hidden" name="rol" value={rol} />}
              <input
                name="q"
                defaultValue={termino}
                placeholder="Buscar por nombre o correo"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
              />
              <button className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white">
                Buscar
              </button>
            </form>
          </div>

          <p className="mb-3 text-sm text-slate-500">
            {total} {total === 1 ? "usuario" : "usuarios"}
            {total > LIMITE && ` (mostrando los primeros ${LIMITE}; usa la búsqueda para acotar)`}
          </p>

          <div className="space-y-3">
            {usuarios.map((usuario) => {
              const esUnoMismo = usuario.id === session.user.id;
              return (
                <div
                  key={usuario.id}
                  className={`rounded-2xl border bg-white p-5 ${
                    usuario.activo ? "border-slate-200" : "border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {usuario.nombre}
                        {esUnoMismo && <span className="ml-2 text-xs text-slate-500">(tú)</span>}
                      </p>
                      <p className="text-sm text-slate-500">{usuario.email}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {NOMBRE_ROL[usuario.rol]}
                        {usuario.distrito && ` · ${etiquetaDistrito(usuario.distrito.nombre)}`}
                        {!usuario.activo && " · Desactivado"}
                        {usuario.debeCambiarPassword && " · Contraseña temporal pendiente"}
                      </p>
                    </div>

                    {!esUnoMismo && (
                      <div className="flex flex-col items-end gap-2">
                        <BotonRestablecer usuarioId={usuario.id} accion={restablecerPassword} />
                        <form action={cambiarActivo}>
                          <input type="hidden" name="usuarioId" value={usuario.id} />
                          <input type="hidden" name="activo" value={String(!usuario.activo)} />
                          <button
                            className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                              usuario.activo
                                ? "border-red-300 text-red-700 hover:bg-red-50"
                                : "border-green-300 text-green-700 hover:bg-green-50"
                            }`}
                          >
                            {usuario.activo ? "Desactivar" : "Reactivar"}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {usuarios.length === 0 && (
              <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                No hay usuarios con ese filtro.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
