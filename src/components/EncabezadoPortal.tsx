import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function EncabezadoPortal({
  titulo,
  nombreUsuario,
}: {
  titulo: string;
  nombreUsuario: string;
}) {
  const session = await auth();
  const rol = session?.user.rol;

  const enlaces = [
    ...(rol === "NACIONAL"
      ? [
          { href: "/nacional", texto: "Expedientes" },
          { href: "/nacional/usuarios", texto: "Usuarios" },
        ]
      : []),
    { href: "/cuenta/password", texto: "Contraseña" },
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
            Portal YCE México
          </p>
          <h1 className="text-lg font-semibold text-slate-900">{titulo}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex gap-1">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                {enlace.texto}
              </Link>
            ))}
          </nav>
          <span className="text-sm text-slate-500">{nombreUsuario}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
