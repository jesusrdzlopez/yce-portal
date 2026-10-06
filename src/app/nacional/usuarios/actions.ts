"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generarPasswordTemporal } from "@/lib/password";
import { restablecerPasswordUsuario } from "@/lib/usuarios";

export type EstadoUsuario = {
  error?: string;
  credenciales?: { nombre: string; email: string; passwordTemporal: string };
};

async function exigirNacional() {
  const session = await auth();
  if (!session || session.user.rol !== "NACIONAL") throw new Error("No autorizado");
  return session;
}

const esquema = z.object({
  rol: z.enum(["ASESOR", "NACIONAL"]),
  nombre: z.string().trim().min(3, "Escribe el nombre completo.").max(120),
  email: z.string().trim().toLowerCase().email("Escribe un correo válido.").max(190),
  distritoId: z.string().optional(),
});

export async function crearUsuario(
  _anterior: EstadoUsuario,
  formData: FormData
): Promise<EstadoUsuario> {
  await exigirNacional();

  const datos = esquema.safeParse({
    rol: formData.get("rol"),
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    distritoId: formData.get("distritoId") || undefined,
  });
  if (!datos.success) return { error: datos.error.issues[0].message };

  const { rol, nombre, email, distritoId } = datos.data;

  if (rol === "ASESOR") {
    if (!distritoId) return { error: "Elige el distrito del asesor." };
    const distrito = await prisma.distrito.findUnique({ where: { id: distritoId } });
    if (!distrito) return { error: "Distrito no válido." };
  }

  if (await prisma.usuario.findUnique({ where: { email } })) {
    return { error: "Ya existe un usuario con ese correo." };
  }

  const passwordTemporal = generarPasswordTemporal();
  await prisma.usuario.create({
    data: {
      nombre,
      email,
      rol,
      distritoId: rol === "ASESOR" ? distritoId : null,
      passwordHash: await bcrypt.hash(passwordTemporal, 10),
      debeCambiarPassword: true,
    },
  });

  revalidatePath("/nacional/usuarios");
  return { credenciales: { nombre, email, passwordTemporal } };
}

export async function restablecerPassword(
  _anterior: EstadoUsuario,
  formData: FormData
): Promise<EstadoUsuario> {
  const session = await exigirNacional();
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

export async function cambiarActivo(formData: FormData) {
  const session = await exigirNacional();
  const usuarioId = String(formData.get("usuarioId") ?? "");
  const activo = formData.get("activo") === "true";

  if (usuarioId === session.user.id) return;

  await prisma.usuario.update({ where: { id: usuarioId }, data: { activo } });
  revalidatePath("/nacional/usuarios");
}
