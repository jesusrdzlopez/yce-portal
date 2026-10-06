"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { validarPassword } from "@/lib/password";

export type EstadoPassword = { error?: string };

export async function cambiarPassword(
  _anterior: EstadoPassword,
  formData: FormData
): Promise<EstadoPassword> {
  const session = await auth();
  if (!session) redirect("/login");

  const actual = String(formData.get("actual") ?? "");
  const nueva = String(formData.get("nueva") ?? "");
  const confirmar = String(formData.get("confirmar") ?? "");

  const usuario = await prisma.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario) redirect("/login");

  if (!(await bcrypt.compare(actual, usuario.passwordHash))) {
    return { error: "La contraseña actual no es correcta." };
  }
  const errorPassword = validarPassword(nueva);
  if (errorPassword) return { error: errorPassword };
  if (nueva !== confirmar) return { error: "Las contraseñas nuevas no coinciden." };
  if (nueva === actual) return { error: "La contraseña nueva debe ser distinta a la actual." };

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { passwordHash: await bcrypt.hash(nueva, 10), debeCambiarPassword: false },
  });

  redirect("/");
}
