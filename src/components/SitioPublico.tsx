import Link from "next/link";

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/programa", texto: "El programa" },
  { href: "/documentos", texto: "Documentos" },
  { href: "/directorio", texto: "Directorio" },
  { href: "/faq", texto: "FAQ" },
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-amber-400">
              YCE
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-slate-900">YCE México</span>
              <span className="block text-xs text-slate-500">Club de Leones</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
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

        <nav className="flex justify-center gap-1 border-t border-slate-100 px-2 py-1 sm:hidden">
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

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Programa de Intercambios y Campamentos Juveniles · Club de Leones de México</p>
          <p>ycemexico.org</p>
        </div>
      </footer>
    </>
  );
}
