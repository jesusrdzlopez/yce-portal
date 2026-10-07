import Image from "next/image";
import Link from "next/link";
import PieSitio from "@/components/PieSitio";

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/programa", texto: "El programa" },
  { href: "/documentos", texto: "Documentos" },
  { href: "/directorio", texto: "Directorio" },
  { href: "/politicas", texto: "Políticas generales del programa" },
];

export default function SitioPublico({
  children,
  activo,
}: {
  children: React.ReactNode;
  activo: string;
}) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
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
              <span className="block text-xs text-slate-500">Club de Leones</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {ENLACES.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  activo === enlace.href
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {enlace.texto}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Iniciar sesión
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center gap-1 border-t border-slate-100 px-2 py-1 lg:hidden">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                activo === enlace.href ? "bg-blue-50 text-blue-900" : "text-slate-600"
              }`}
            >
              {enlace.texto}
            </Link>
          ))}
        </nav>
      </header>

      <div className="flex-1">{children}</div>

      <PieSitio />
    </>
  );
}
