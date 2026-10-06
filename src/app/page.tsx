import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SitioPublico from "@/components/SitioPublico";

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
      <section className="relative flex min-h-[calc(100vh-10rem)] items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
            Distrito Múltiple B México · 2026-2027
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
            Programa de Campamentos e{" "}
            <span className="text-amber-400">Intercambio Juveniles</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Promoviendo el entendimiento entre los pueblos del mundo.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-xl bg-amber-400 px-7 py-3.5 text-base font-semibold text-blue-950 shadow-lg hover:bg-amber-300"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/politicas"
              className="rounded-xl border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10"
            >
              Políticas del programa
            </Link>
          </div>
        </div>
      </section>
    </SitioPublico>
  );
}
