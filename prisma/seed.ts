import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DISTRITOS = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];
const EMAILS_PRUEBA = ["asesor1@ycemexico.org", "asesor2@ycemexico.org", "joven1@ycemexico.org"];
const DISTRITOS_PRUEBA = ["Distrito A-1", "Distrito B-2"];

async function crearDistritos() {
  for (const nombre of DISTRITOS) {
    await prisma.distrito.upsert({ where: { nombre }, update: {}, create: { nombre } });
  }
  console.log(`Distritos reales asegurados: ${DISTRITOS.join(", ")}`);
}

/** Borra los usuarios y distritos de demostración. Solo corre con LIMPIAR_PRUEBAS=true. */
async function limpiarPruebas() {
  const usuarios = await prisma.usuario.findMany({
    where: { email: { in: EMAILS_PRUEBA } },
    include: { expediente: true },
  });

  for (const usuario of usuarios) {
    if (usuario.expediente) {
      const expedienteId = usuario.expediente.id;
      await prisma.historialEvento.deleteMany({ where: { expedienteId } });
      await prisma.documento.deleteMany({ where: { expedienteId } });
      await prisma.expediente.delete({ where: { id: expedienteId } });
    }
    await prisma.usuario.delete({ where: { id: usuario.id } });
  }

  for (const nombre of DISTRITOS_PRUEBA) {
    const distrito = await prisma.distrito.findUnique({
      where: { nombre },
      include: { _count: { select: { usuarios: true, expedientes: true } } },
    });
    if (distrito && distrito._count.usuarios === 0 && distrito._count.expedientes === 0) {
      await prisma.distrito.delete({ where: { id: distrito.id } });
    }
  }

  console.log(`Limpieza de pruebas: ${usuarios.length} usuarios de demostración eliminados.`);
}

async function crearUsuariosDePrueba(password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const b1 = await prisma.distrito.findUniqueOrThrow({ where: { nombre: "B1" } });

  const emailNacional = process.env.SEED_NACIONAL_EMAIL ?? "nacional@ycemexico.org";
  await prisma.usuario.upsert({
    where: { email: emailNacional },
    update: {},
    create: {
      nombre: "Coordinación Nacional",
      email: emailNacional,
      passwordHash,
      rol: "NACIONAL",
      debeCambiarPassword: true,
    },
  });

  const asesor = await prisma.usuario.upsert({
    where: { email: "asesor1@ycemexico.org" },
    update: {},
    create: {
      nombre: "Asesor de prueba B1",
      email: "asesor1@ycemexico.org",
      passwordHash,
      rol: "ASESOR",
      distritoId: b1.id,
    },
  });

  const joven = await prisma.usuario.upsert({
    where: { email: "joven1@ycemexico.org" },
    update: {},
    create: {
      nombre: "Participante de prueba",
      email: "joven1@ycemexico.org",
      passwordHash,
      rol: "JOVEN",
      distritoId: b1.id,
    },
  });
  await prisma.expediente.upsert({
    where: { usuarioId: joven.id },
    update: {},
    create: { usuarioId: joven.id, distritoId: b1.id },
  });

  console.log("Usuarios de prueba creados (contraseña: la de SEED_PASSWORD):");
  console.log(`- ${emailNacional} (NACIONAL, debe cambiar la contraseña al entrar)`);
  console.log(`- ${asesor.email} (ASESOR, B1)`);
  console.log("- joven1@ycemexico.org (JOVEN, B1)");
}

async function main() {
  await crearDistritos();

  if (process.env.LIMPIAR_PRUEBAS === "true") await limpiarPruebas();

  const seedPassword = process.env.SEED_PASSWORD;
  if (!seedPassword || seedPassword.length < 8) {
    console.log("SEED_PASSWORD no definido (mínimo 8 caracteres): no se crean usuarios de prueba.");
    return;
  }
  await crearUsuariosDePrueba(seedPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
