import { mkdir, writeFile } from "fs/promises";
import path from "path";

const STORAGE_ROOT = path.join(process.cwd(), "storage", "uploads");

export async function guardarArchivo(params: {
  expedienteId: string;
  categoria: string;
  version: number;
  nombreOriginal: string;
  buffer: Buffer;
}) {
  const carpeta = path.join(STORAGE_ROOT, params.expedienteId);
  await mkdir(carpeta, { recursive: true });

  const extension = path.extname(params.nombreOriginal) || "";
  const nombreArchivo = `${params.categoria}-v${params.version}${extension}`;
  const rutaCompleta = path.join(carpeta, nombreArchivo);

  await writeFile(rutaCompleta, params.buffer);

  // Ruta relativa que se guarda en la base de datos.
  return path.join(params.expedienteId, nombreArchivo);
}

export function rutaAbsoluta(rutaRelativa: string) {
  return path.join(STORAGE_ROOT, rutaRelativa);
}
