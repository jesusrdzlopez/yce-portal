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

/**
 * Recuperación de acceso: deja la cuenta de SEED_NACIONAL_EMAIL como coordinación nacional con
 * la contraseña de SEED_PASSWORD (que deberá cambiarse al entrar). Si el correo no existe, lo crea.
 * Solo corre con REINICIAR_NACIONAL=true, es decir, para quien controla las variables del servidor.
 */
async function reiniciarNacional(password: string) {
  const email = (process.env.SEED_NACIONAL_EMAIL ?? "").trim().toLowerCase();
  if (!email) {
    throw new Error("Define SEED_NACIONAL_EMAIL para reiniciar la cuenta de coordinación nacional.");
  }

  const nacionales = await prisma.usuario.findMany({
    where: { rol: "NACIONAL" },
    select: { email: true },
  });
  console.log(
    "Cuentas de coordinación nacional existentes:",
    nacionales.map((u) => u.email).join(", ") || "(ninguna)"
  );

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente && existente.rol !== "NACIONAL") {
    throw new Error(`${email} ya existe con otro rol; usa un correo distinto en SEED_NACIONAL_EMAIL.`);
  }

  // Una cuenta creada antes con mayúsculas en el correo debe reutilizarse, no duplicarse.
  const correoGuardado = nacionales.find((u) => u.email.toLowerCase() === email)?.email ?? email;

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.usuario.upsert({
    where: { email: correoGuardado },
    update: { passwordHash, activo: true, debeCambiarPassword: true },
    create: {
      nombre: "Coordinación Nacional",
      email,
      passwordHash,
      rol: "NACIONAL",
      debeCambiarPassword: true,
    },
  });
  console.log(`Cuenta ${email} reiniciada: entra con la contraseña de SEED_PASSWORD y cámbiala.`);
}

async function main() {
  await crearDistritos();

  if (process.env.LIMPIAR_PRUEBAS === "true") await limpiarPruebas();

  const seedPassword = process.env.SEED_PASSWORD;
  const passwordValida = Boolean(seedPassword && seedPassword.length >= 8);

  if (process.env.REINICIAR_NACIONAL === "true") {
    if (!passwordValida) throw new Error("REINICIAR_NACIONAL requiere SEED_PASSWORD de 8+ caracteres.");
    await reiniciarNacional(seedPassword as string);
    return;
  }

  if (!passwordValida) {
    console.log("SEED_PASSWORD no definido (mínimo 8 caracteres): no se crean usuarios de prueba.");
    return;
  }
  await crearUsuariosDePrueba(seedPassword as string);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
