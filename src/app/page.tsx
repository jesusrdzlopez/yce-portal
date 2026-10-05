import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SitioPublico from "@/components/SitioPublico";

const PASOS = [
  {
    titulo: "Descarga los formatos",
    texto: "Obtén los documentos oficiales para iniciar tu solicitud en la sección Documentos.",
  },
  {
    titulo: "Sube tu expediente",
    texto: "Pasaporte, carta Lions, seguro médico y carta médica, siempre en el portal.",
  },
  {
    titulo: "Tu asesor lo revisa",
    texto: "Tu asesor distrital valida cada documento o te indica exactamente qué corregir.",
  },
  {
    titulo: "Asignación de cupo",
    texto: "Coordinación nacional recibe solo expedientes completos y asigna los cupos.",
  },
];

const ROLES = [
  {
    titulo: "Participantes",
    texto:
      "Sube y corrige tus documentos desde un solo lugar y consulta en todo momento el estado de tu expediente.",
    color: "bg-blue-900",
  },
  {
    titulo: "Asesores distritales",
    texto:
      "Revisa los expedientes de tu distrito con un semáforo claro y valida o solicita correcciones con un clic.",
    color: "bg-amber-400",
  },
  {
    titulo: "Coordinación nacional",
    texto:
      "Da seguimiento a los expedientes validados de todos los distritos y gestiona los cupos internacionales.",
    color: "bg-emerald-600",
  },
];

export default async function Home() {
  const session = await auth();

  if (session) {
    switch (session.user.rol) {
      case "JOVEN":
        redirect("/joven");
      case "ASESOR":
        redirect("/asesor");
      case "NACIONAL":
        redirect("/nacional");
    }
  }

  return (
    <SitioPublico activo="/">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
            Club de Leones de México
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Programa de Intercambios y{" "}
            <span className="text-amber-400">Campamentos Juveniles</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Un solo portal para armar tu expediente, recibir la revisión de tu asesor y avanzar
            hacia tu experiencia internacional.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-xl bg-amber-400 px-7 py-3.5 text-center text-base font-semibold text-blue-950 shadow-lg hover:bg-amber-300"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/documentos"
              className="rounded-xl border border-white/30 px-7 py-3.5 text-center text-base font-semibold text-white hover:bg-white/10"
            >
              Descargar documentos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-900">
            Cómo funciona
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Del primer documento a la asignación de cupo
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((paso, i) => (
            <li
              key={paso.titulo}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-base font-bold text-amber-400">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{paso.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-900">
            Un portal para cada rol
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-slate-900">
            Cada persona ve solo lo que necesita
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ROLES.map((rol) => (
              <div key={rol.titulo} className="overflow-hidden rounded-2xl border border-slate-200">
                <div className={`h-2 ${rol.color}`} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{rol.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{rol.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-blue-900 p-10 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">¿Necesitas ayuda con tu solicitud?</h2>
            <p className="mt-2 text-blue-100">
              Encuentra a tu asesor de distrito en el directorio y contáctalo directamente.
            </p>
          </div>
          <Link
            href="/directorio"
            className="shrink-0 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-blue-950 hover:bg-amber-300"
          >
            Ver directorio
          </Link>
        </div>
      </section>
    </SitioPublico>
  );
}
