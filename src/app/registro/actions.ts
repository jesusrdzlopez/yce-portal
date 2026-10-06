"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { validarPassword } from "@/lib/password";

export type EstadoRegistro = {
  error?: string;
  valores?: { nombre: string; email: string; distritoId: string };
};

const esquema = z.object({
  nombre: z.string().trim().min(3, "Escribe tu nombre completo.").max(120),
  email: z.string().trim().toLowerCase().email("Escribe un correo válido.").max(190),
  distritoId: z.string().min(1, "Elige tu distrito."),
});

export async function registrarJoven(
  _anterior: EstadoRegistro,
  formData: FormData
): Promise<EstadoRegistro> {
  // Campo oculto que solo llenan los robots.
  if (formData.get("sitio_web")) return { error: "No se pudo completar el registro." };

  const valores = {
    nombre: String(formData.get("nombre") ?? ""),
    email: String(formData.get("email") ?? ""),
    distritoId: String(formData.get("distritoId") ?? ""),
  };
  const password = String(formData.get("password") ?? "");
  const confirmar = String(formData.get("confirmar") ?? "");

  const datos = esquema.safeParse(valores);
  if (!datos.success) return { error: datos.error.issues[0].message, valores };

  const errorPassword = validarPassword(password);
  if (errorPassword) return { error: errorPassword, valores };
  if (password !== confirmar) return { error: "Las contraseñas no coinciden.", valores };

  const distrito = await prisma.distrito.findUnique({ where: { id: datos.data.distritoId } });
  if (!distrito) return { error: "Elige un distrito válido.", valores };

  const existente = await prisma.usuario.findUnique({ where: { email: datos.data.email } });
  if (existente) {
    return { error: "Ya existe una cuenta con ese correo. Inicia sesión.", valores };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.usuario.create({
    data: {
      nombre: datos.data.nombre,
      email: datos.data.email,
      passwordHash,
      rol: "JOVEN",
      distritoId: distrito.id,
      expediente: { create: { distritoId: distrito.id } },
    },
  });

  await signIn("credentials", {
    email: datos.data.email,
    password,
    redirectTo: "/joven",
  });

  return {};
}
