import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const distritoUno = await prisma.distrito.upsert({
    where: { nombre: "Distrito A-1" },
    update: {},
    create: { nombre: "Distrito A-1" },
  });

  const distritoDos = await prisma.distrito.upsert({
    where: { nombre: "Distrito B-2" },
    update: {},
    create: { nombre: "Distrito B-2" },
  });

  const passwordHash = await bcrypt.hash("cambia123", 10);

  await prisma.usuario.upsert({
    where: { email: "nacional@ycemexico.org" },
    update: {},
    create: {
      nombre: "Coordinación Nacional",
      email: "nacional@ycemexico.org",
      passwordHash,
      rol: "NACIONAL",
    },
  });

  const asesorUno = await prisma.usuario.upsert({
    where: { email: "asesor1@ycemexico.org" },
    update: {},
    create: {
      nombre: "Asesor Distrito A-1",
      email: "asesor1@ycemexico.org",
      passwordHash,
      rol: "ASESOR",
      distritoId: distritoUno.id,
    },
  });

  await prisma.usuario.upsert({
    where: { email: "asesor2@ycemexico.org" },
    update: {},
    create: {
      nombre: "Asesor Distrito B-2",
      email: "asesor2@ycemexico.org",
      passwordHash,
      rol: "ASESOR",
      distritoId: distritoDos.id,
    },
  });

  const joven = await prisma.usuario.upsert({
    where: { email: "joven1@ycemexico.org" },
    update: {},
    create: {
      nombre: "Joven de Prueba",
      email: "joven1@ycemexico.org",
      passwordHash,
      rol: "JOVEN",
      distritoId: distritoUno.id,
    },
  });

  await prisma.expediente.upsert({
    where: { usuarioId: joven.id },
    update: {},
    create: { usuarioId: joven.id, distritoId: distritoUno.id },
  });

  console.log("Seed completo. Usuarios de prueba (contraseña: cambia123):");
  console.log("- nacional@ycemexico.org (NACIONAL)");
  console.log(`- ${asesorUno.email} (ASESOR, ${distritoUno.nombre})`);
  console.log("- asesor2@ycemexico.org (ASESOR, Distrito B-2)");
  console.log("- joven1@ycemexico.org (JOVEN, Distrito A-1)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
