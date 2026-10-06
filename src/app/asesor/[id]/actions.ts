"use server";

import { auth } from "@/auth";
import { restablecerPasswordUsuario } from "@/lib/usuarios";

export type EstadoRestablecer = {
  error?: string;
  credenciales?: { nombre: string; email: string; passwordTemporal: string };
};

export async function restablecerPasswordJoven(
  _anterior: EstadoRestablecer,
  formData: FormData
): Promise<EstadoRestablecer> {
  const session = await auth();
  if (!session || session.user.rol !== "ASESOR") return { error: "No autorizado." };

  const resultado = await restablecerPasswordUsuario(
    { id: session.user.id, rol: session.user.rol, distritoId: session.user.distritoId },
    String(formData.get("usuarioId") ?? "")
  );
  if (!resultado.ok) return { error: resultado.error };
  return {
    credenciales: {
      nombre: resultado.nombre,
      email: resultado.email,
      passwordTemporal: resultado.passwordTemporal,
    },
  };
}
