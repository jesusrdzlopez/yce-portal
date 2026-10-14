import type { Metadata } from "next";
import Image from "next/image";
import SitioPublico from "@/components/SitioPublico";
import DirectorioTabla from "@/components/DirectorioTabla";
import { obtenerDirectorio } from "@/lib/directorio";

export const metadata: Metadata = { title: "Directorio | YCE México" };
// El directorio se lee de la hoja de Drive y se refresca cada 10 minutos.
export const revalidate = 600;

export default async function DirectorioPage() {
  const asesores = await obtenerDirectorio();

  return (
    <SitioPublico activo="/directorio">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              Directorio
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Asesores ICJ por distrito</h1>
            <p className="mt-3 max-w-2xl text-blue-100">
              Contacta a tu asesor distrital para resolver dudas sobre tu solicitud y tu expediente.
            </p>
          </div>
          <Image
            src="/logos/yce-mexico.webp"
            alt="México · Youth Camps & Exchange"
            width={640}
            height={612}
            unoptimized
            className="hidden h-36 w-auto shrink-0 drop-shadow-xl md:block"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <DirectorioTabla asesores={asesores} />
      </section>
    </SitioPublico>
  );
}
