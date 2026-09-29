import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.rol !== "NACIONAL") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { cupo } = await request.json();
  const { id } = await params;

  const expediente = await prisma.expediente.update({
    where: { id },
    data: { cupoAsignado: typeof cupo === "string" ? cupo : null },
  });

  await prisma.historialEvento.create({
    data: {
      expedienteId: id,
      mensaje: cupo
        ? `Coordinación nacional asignó el cupo: ${cupo}`
        : "Coordinación nacional quitó la asignación de cupo",
    },
  });

  return NextResponse.json({ ok: true, expediente });
}
