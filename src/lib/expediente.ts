import type { Documento } from "@prisma/client";
import { categoriasRequeridas } from "@/lib/catalogos";

/** De cada categoría, se queda solo con la versión más reciente subida. */
export function documentosVigentes(documentos: Documento[]): Documento[] {
  const porCategoria = new Map<string, Documento>();
  for (const doc of documentos) {
    const actual = porCategoria.get(doc.categoria);
    if (!actual || doc.version > actual.version) {
      porCategoria.set(doc.categoria, doc);
    }
  }
  return Array.from(porCategoria.values());
}

export function calcularEstadoExpediente(
  documentos: Documento[],
  esMenor: boolean
): "INCOMPLETO" | "PENDIENTE" | "CORRECCION" | "VALIDADO" {
  const requeridas = categoriasRequeridas(esMenor);
  const vigentes = documentosVigentes(documentos).filter((d) =>
    (requeridas as string[]).includes(d.categoria)
  );

  const faltanCategorias = requeridas.some((cat) => !vigentes.some((d) => d.categoria === cat));
  if (faltanCategorias) return "INCOMPLETO";

  if (vigentes.some((d) => d.estado === "CORRECCION")) return "CORRECCION";

  const todosValidados = vigentes.every((d) => d.estado === "VALIDADO");
  if (todosValidados) return "VALIDADO";

  return "PENDIENTE";
}
