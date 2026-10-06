import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calcularEstadoExpediente } from "@/lib/expediente";
import { enviarCorreo, plantillaValidado } from "@/lib/mail";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || (session.user.rol !== "ASESOR" && session.user.rol !== "NACIONAL")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
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
    return NextResponse.json({ error: "No puedes validar expedientes de otro distrito" }, { status: 403 });
  }

  const documentoActualizado = await prisma.documento.update({
    where: { id },
    data: { estado: "VALIDADO", comentario: null },
  });

  const documentosActualizados = documento.expediente.documentos.map((d) =>
    d.id === id ? documentoActualizado : d
  );
  const nuevoEstado = calcularEstadoExpediente(
    documentosActualizados,
    documento.expediente.esMenor
  );

  await prisma.expediente.update({
    where: { id: documento.expedienteId },
    data: { estado: nuevoEstado },
  });

  await prisma.historialEvento.create({
    data: {
      expedienteId: documento.expedienteId,
      mensaje: `${session.user.name} validó el documento ${documento.categoria}.`,
    },
  });

  if (nuevoEstado === "VALIDADO") {
    await enviarCorreo({
      to: documento.expediente.usuario.email,
      subject: "Tu expediente fue validado",
      html: plantillaValidado({ urlPortal: `${process.env.NEXTAUTH_URL ?? ""}/joven` }),
    });
  }

  return NextResponse.json({ ok: true, estado: nuevoEstado });
}
