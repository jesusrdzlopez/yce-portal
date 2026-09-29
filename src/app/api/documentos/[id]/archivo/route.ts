import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rutaAbsoluta } from "@/lib/storage";

const TIPOS_MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const documento = await prisma.documento.findUnique({
    where: { id },
    include: { expediente: true },
  });
  if (!documento) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const puedeVer =
    session.user.rol === "NACIONAL" ||
    (session.user.rol === "ASESOR" && session.user.distritoId === documento.expediente.distritoId) ||
    (session.user.rol === "JOVEN" && session.user.id === documento.expediente.usuarioId);

  if (!puedeVer) {
    return NextResponse.json({ error: "No tienes permiso para ver este archivo" }, { status: 403 });
  }

  const archivo = await readFile(rutaAbsoluta(documento.archivoUrl));
  const extension = path.extname(documento.nombreArchivo).toLowerCase();

  return new NextResponse(new Uint8Array(archivo), {
    headers: {
      "Content-Type": TIPOS_MIME[extension] ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${documento.nombreArchivo}"`,
    },
  });
}
