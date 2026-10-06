import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { guardarArchivo } from "@/lib/storage";
import { calcularEstadoExpediente } from "@/lib/expediente";
import {
  CATEGORIAS_DOCUMENTO,
  EXTENSIONES_POR_CATEGORIA,
  NOMBRE_CATEGORIA,
  type CategoriaDocumento,
} from "@/lib/catalogos";
import { enviarCorreo, plantillaDocumentoSubido } from "@/lib/mail";

const TAMANO_MAXIMO = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.rol !== "JOVEN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const categoria = formData.get("categoria");
  const archivo = formData.get("archivo");

  if (typeof categoria !== "string" || !CATEGORIAS_DOCUMENTO.includes(categoria as never)) {
    return NextResponse.json({ error: "Categoría inválida" }, { status: 400 });
  }
  if (!(archivo instanceof File)) {
    return NextResponse.json({ error: "Archivo faltante" }, { status: 400 });
  }
  const extension = archivo.name.slice(archivo.name.lastIndexOf(".")).toLowerCase();
  const permitidas = EXTENSIONES_POR_CATEGORIA[categoria as CategoriaDocumento];
  if (!permitidas.includes(extension)) {
    return NextResponse.json(
      { error: `Formato no permitido. Sube un archivo ${permitidas.join(", ")}` },
      { status: 400 }
    );
  }
  if (archivo.size > TAMANO_MAXIMO) {
    return NextResponse.json({ error: "El archivo supera 10 MB" }, { status: 400 });
  }

  const expediente = await prisma.expediente.findUnique({
    where: { usuarioId: session.user.id },
    include: { documentos: true, distrito: true },
  });
  if (!expediente) {
    return NextResponse.json({ error: "No existe expediente para este usuario" }, { status: 404 });
  }

  const versionAnterior = expediente.documentos
    .filter((d) => d.categoria === categoria)
    .reduce((max, d) => Math.max(max, d.version), 0);
  const nuevaVersion = versionAnterior + 1;

  const buffer = Buffer.from(await archivo.arrayBuffer());
  const rutaRelativa = await guardarArchivo({
    expedienteId: expediente.id,
    categoria,
    version: nuevaVersion,
    nombreOriginal: archivo.name,
    buffer,
  });

  const documento = await prisma.documento.create({
    data: {
      expedienteId: expediente.id,
      categoria: categoria as never,
      archivoUrl: rutaRelativa,
      nombreArchivo: archivo.name,
      version: nuevaVersion,
      estado: "PENDIENTE",
    },
  });

  const todosLosDocumentos = [...expediente.documentos, documento];
  const nuevoEstado = calcularEstadoExpediente(todosLosDocumentos, expediente.esMenor);

  await prisma.expediente.update({
    where: { id: expediente.id },
    data: { estado: nuevoEstado },
  });

  await prisma.historialEvento.create({
    data: {
      expedienteId: expediente.id,
      mensaje: `Se subió ${NOMBRE_CATEGORIA[categoria as keyof typeof NOMBRE_CATEGORIA]} (versión ${nuevaVersion}).`,
    },
  });

  const asesores = await prisma.usuario.findMany({
    where: { rol: "ASESOR", distritoId: expediente.distritoId },
  });

  const urlPortal = `${process.env.NEXTAUTH_URL ?? ""}/asesor`;
  await Promise.all(
    asesores.map((asesor) =>
      enviarCorreo({
        to: asesor.email,
        subject: `Nuevo documento de ${session.user.name}`,
        html: plantillaDocumentoSubido({
          nombreJoven: session.user.name ?? "Un participante",
          categoria: NOMBRE_CATEGORIA[categoria as keyof typeof NOMBRE_CATEGORIA],
          urlPortal,
        }),
      })
    )
  );

  return NextResponse.json({ ok: true, documento });
}
