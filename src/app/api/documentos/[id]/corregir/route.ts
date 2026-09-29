import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calcularEstadoExpediente } from "@/lib/expediente";
import { NOMBRE_CATEGORIA } from "@/lib/catalogos";
import { enviarCorreo, plantillaCorreccionRequerida } from "@/lib/mail";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user.rol !== "ASESOR" && session.user.rol !== "NACIONAL")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { comentario } = await request.json();
  if (!comentario || typeof comentario !== "string") {
    return NextResponse.json({ error: "Debes indicar qué corregir" }, { status: 400 });
  }

  const { id } = await params;
  const documento = await prisma.documento.findUnique({
    where: { id },
    include: { expediente: { include: { documentos: true, usuario: true } } },
  });
  if (!documento) {
    return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
  }
  if (session.user.rol === "ASESOR" && documento.expediente.distritoId !== session.user.distritoId) {
    return NextResponse.json({ error: "No puedes revisar expedientes de otro distrito" }, { status: 403 });
  }

  const documentoActualizado = await prisma.documento.update({
    where: { id },
    data: { estado: "CORRECCION", comentario },
  });

  const documentosActualizados = documento.expediente.documentos.map((d) =>
    d.id === id ? documentoActualizado : d
  );
  const nuevoEstado = calcularEstadoExpediente(documentosActualizados);

  await prisma.expediente.update({
    where: { id: documento.expedienteId },
    data: { estado: nuevoEstado },
  });

  await prisma.historialEvento.create({
    data: {
      expedienteId: documento.expedienteId,
      mensaje: `${session.user.name} solicitó corrección en ${documento.categoria}: ${comentario}`,
    },
  });

  await enviarCorreo({
    to: documento.expediente.usuario.email,
    subject: `Corrección requerida: ${NOMBRE_CATEGORIA[documento.categoria as keyof typeof NOMBRE_CATEGORIA]}`,
    html: plantillaCorreccionRequerida({
      categoria: NOMBRE_CATEGORIA[documento.categoria as keyof typeof NOMBRE_CATEGORIA],
      comentario,
      urlPortal: `${process.env.NEXTAUTH_URL ?? ""}/joven`,
    }),
  });

  return NextResponse.json({ ok: true, estado: nuevoEstado });
}
