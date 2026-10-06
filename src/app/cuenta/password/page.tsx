import type { Metadata } from "next";
import { auth } from "@/auth";
import EncabezadoPortal from "@/components/EncabezadoPortal";
import FormularioPassword from "@/components/FormularioPassword";

export const metadata: Metadata = { title: "Cambiar contraseña | YCE México" };

export default async function PasswordPage() {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <EncabezadoPortal titulo="Cambiar contraseña" nombreUsuario={session.user.name ?? ""} />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10">
        {session.user.debeCambiarPassword && (
          <p className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Por seguridad, debes elegir una contraseña nueva antes de continuar.
          </p>
        )}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FormularioPassword />
        </div>
      </main>
    </>
  );
}
