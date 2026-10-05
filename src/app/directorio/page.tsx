import type { Metadata } from "next";
import SitioPublico from "@/components/SitioPublico";
import DirectorioTabla from "@/components/DirectorioTabla";
import { DIRECTORIO } from "@/lib/directorio";

export const metadata: Metadata = { title: "Directorio | YCE México" };

export default function DirectorioPage() {
  return (
    <SitioPublico activo="/directorio">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            Directorio
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Asesores ICJ por distrito</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Contacta a tu asesor distrital para resolver dudas sobre tu solicitud y tu expediente.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <DirectorioTabla asesores={DIRECTORIO} />
      </section>
    </SitioPublico>
  );
}
