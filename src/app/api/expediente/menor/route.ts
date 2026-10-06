import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calcularEstadoExpediente } from "@/lib/expediente";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.rol !== "JOVEN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { esMenor } = await request.json();
  if (typeof esMenor !== "boolean") {
    return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
  }

  const expediente = await prisma.expediente.findUnique({
    where: { usuarioId: session.user.id },
    include: { documentos: true },
  });
  if (!expediente) {
    return NextResponse.json({ error: "No existe expediente" }, { status: 404 });
  }

  const estado = calcularEstadoExpediente(expediente.documentos, esMenor);
  await prisma.expediente.update({
    where: { id: expediente.id },
    data: { esMenor, estado },
  });

  return NextResponse.json({ ok: true, estado });
}
