import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const INICIO_POR_ROL = {
  JOVEN: { href: "/joven", texto: "Mi expediente" },
  ASESOR: { href: "/asesor", texto: "Participantes" },
  NACIONAL: { href: "/nacional", texto: "Expedientes" },
} as const;

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
    ...(rol ? [INICIO_POR_ROL[rol]] : []),
    ...(rol === "NACIONAL" ? [{ href: "/nacional/usuarios", texto: "Usuarios" }] : []),
    { href: "/cuenta/password", texto: "Contraseña" },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/lions-international.webp"
              alt="Lions International"
              width={44}
              height={44}
              unoptimized
              className="h-11 w-11"
            />
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-slate-900">YCE México</span>
              <span className="block text-xs text-slate-500">Portal · Club de Leones</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <nav className="flex gap-1">
              {enlaces.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  {enlace.texto}
                </Link>
              ))}
            </nav>
            <span className="hidden text-sm text-slate-500 md:inline">{nombreUsuario}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-10 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              Portal YCE México
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{titulo}</h1>
          </div>
          <Image
            src="/logos/yce-mexico.webp"
            alt="México · Youth Camps & Exchange"
            width={640}
            height={612}
            unoptimized
            className="hidden h-28 w-auto shrink-0 drop-shadow-xl md:block"
          />
        </div>
      </section>
    </>
  );
}
