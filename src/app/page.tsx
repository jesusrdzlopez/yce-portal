import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const PASOS = [
  {
    titulo: "Sube tus documentos",
    texto: "Pasaporte, carta Lions, seguro médico y carta médica, todo en un solo lugar.",
  },
  {
    titulo: "Tu asesor los revisa",
    texto: "Tu asesor distrital valida cada documento o te indica qué corregir.",
  },
  {
    titulo: "Coordinación nacional",
    texto: "Solo los expedientes completos y validados llegan a la asignación de cupos.",
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
    <main className="flex flex-1 flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold text-slate-900">YCE México</span>
          <Link
            href="/login"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
          Club de Leones de México
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Programa de Intercambios y Campamentos Juveniles
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Portal para gestionar el expediente de cada participante de forma segura, desde la
          carga de documentos hasta la asignación de cupos internacionales.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white hover:bg-blue-800"
        >
          Entrar al portal
        </Link>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-16 sm:grid-cols-3">
        {PASOS.map((paso, i) => (
          <div key={paso.titulo} className="rounded-2xl border border-slate-200 bg-white p-6">
            <span className="text-sm font-semibold text-blue-700">Paso {i + 1}</span>
            <h2 className="mt-1 font-medium text-slate-900">{paso.titulo}</h2>
            <p className="mt-2 text-sm text-slate-600">{paso.texto}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
