export const CATEGORIAS_DOCUMENTO = [
  "PASAPORTE",
  "CARTA_LIONS",
  "SEGURO_MEDICO",
  "CARTA_MEDICA",
] as const;

export type CategoriaDocumento = (typeof CATEGORIAS_DOCUMENTO)[number];

export const NOMBRE_CATEGORIA: Record<CategoriaDocumento, string> = {
  PASAPORTE: "Pasaporte",
  CARTA_LIONS: "Carta Lions",
  SEGURO_MEDICO: "Seguro médico",
  CARTA_MEDICA: "Carta médica",
};

export const NOMBRE_ESTADO_DOCUMENTO: Record<string, string> = {
  FALTANTE: "Falta por subir",
  PENDIENTE: "Pendiente de revisión",
  CORRECCION: "Corrección requerida",
  VALIDADO: "Validado",
};

export const NOMBRE_ESTADO_EXPEDIENTE: Record<string, string> = {
  INCOMPLETO: "Incompleto",
  PENDIENTE: "Pendiente de revisión",
  CORRECCION: "Corrección requerida",
  VALIDADO: "Validado",
};

// Semáforo: rojo = incompleto, amarillo = pendiente/corrección, verde = validado
export function colorSemaforo(estado: string): "rojo" | "amarillo" | "verde" {
  if (estado === "VALIDADO") return "verde";
  if (estado === "INCOMPLETO" || estado === "FALTANTE") return "rojo";
  return "amarillo";
}

export const CLASES_SEMAFORO: Record<"rojo" | "amarillo" | "verde", string> = {
  rojo: "bg-red-100 text-red-800 border-red-300",
  amarillo: "bg-amber-100 text-amber-800 border-amber-300",
  verde: "bg-green-100 text-green-800 border-green-300",
};
