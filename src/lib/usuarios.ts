import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generarPasswordTemporal } from "@/lib/password";
import { etiquetaDistrito } from "@/lib/distritos";

type Solicitante = { id: string; rol: "JOVEN" | "ASESOR" | "NACIONAL"; distritoId: string | null };

export type Credenciales = {
  nombre: string;
  distrito: string;
  email: string;
  passwordTemporal: string;
};

export type ResultadoRestablecer =
  | { ok: true; credenciales: Credenciales }
  | { ok: false; error: string };

/**
 * Coordinación nacional puede restablecer a cualquier usuario; un asesor solo a los
 * participantes de su propio distrito. La contraseña temporal obliga a cambiarla al entrar.
 */
export async function restablecerPasswordUsuario(
  solicitante: Solicitante,
  usuarioId: string
): Promise<ResultadoRestablecer> {
  const objetivo = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    include: { distrito: true },
  });
  if (!objetivo) return { ok: false, error: "Usuario no encontrado." };

  const permitido =
    solicitante.rol === "NACIONAL" ||
    (solicitante.rol === "ASESOR" &&
      objetivo.rol === "JOVEN" &&
      objetivo.distritoId !== null &&
      objetivo.distritoId === solicitante.distritoId);
  if (!permitido) return { ok: false, error: "No tienes permiso para restablecer esta cuenta." };
  if (objetivo.id === solicitante.id) {
    return { ok: false, error: "Para tu propia cuenta usa Cambiar contraseña." };
  }

  const passwordTemporal = generarPasswordTemporal();
  await prisma.usuario.update({
    where: { id: objetivo.id },
    data: { passwordHash: await bcrypt.hash(passwordTemporal, 10), debeCambiarPassword: true },
  });

  return {
    ok: true,
    credenciales: {
      nombre: objetivo.nombre,
      distrito: objetivo.distrito ? etiquetaDistrito(objetivo.distrito.nombre) : "Coordinación nacional",
      email: objetivo.email,
      passwordTemporal,
    },
  };
}
