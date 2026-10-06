import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { etiquetaDistrito } from "@/lib/distritos";
import FormularioRegistro from "@/components/FormularioRegistro";

export const metadata: Metadata = { title: "Crear cuenta | YCE México" };
export const dynamic = "force-dynamic";

export default async function RegistroPage() {
  const distritos = await prisma.distrito.findMany({ orderBy: { nombre: "asc" } });

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <Image
          src="/logos/yce-mexico.webp"
          alt="México · Youth Camps & Exchange"
          width={640}
          height={612}
          unoptimized
          className="mx-auto mb-4 h-24 w-auto"
        />
        <h1 className="text-center text-xl font-semibold text-slate-900">Crear cuenta de participante</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Con tu cuenta podrás subir tu expediente y ver su avance.
        </p>

        <FormularioRegistro
          distritos={distritos.map((d) => ({ id: d.id, etiqueta: etiquetaDistrito(d.nombre) }))}
        />

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-blue-800 underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
