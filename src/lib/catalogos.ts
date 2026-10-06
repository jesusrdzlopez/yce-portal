export const CATEGORIAS_DOCUMENTO = [
  "SOLICITUD",
  "CARTA_PRESENTACION",
  "PASAPORTE",
  "FOTO",
  "FORMATO_SAM",
  "SEGURO_VIAJE",
  "COMPROBANTE_PAGO",
  "CONSENTIMIENTO",
] as const;

export type CategoriaDocumento = (typeof CATEGORIAS_DOCUMENTO)[number];

export const NOMBRE_CATEGORIA: Record<CategoriaDocumento, string> = {
  SOLICITUD: "Formato de solicitud (Excel)",
  CARTA_PRESENTACION: "Carta de presentación para la familia anfitriona",
  PASAPORTE: "Pasaporte escaneado",
  FOTO: "Foto personal tamaño credencial",
  FORMATO_SAM: "Formato SAM (solo menores de edad)",
  SEGURO_VIAJE: "Seguro de viaje",
  COMPROBANTE_PAGO: "Comprobante de pago del trámite",
  CONSENTIMIENTO: "Consentimiento y Aceptación de Condiciones de Participación (firmado)",
};

const EXTENSIONES_DOCUMENTO = [".pdf", ".jpg", ".jpeg", ".png"];

export const EXTENSIONES_POR_CATEGORIA: Record<CategoriaDocumento, string[]> = {
  SOLICITUD: [".xlsx", ".xls"],
  CARTA_PRESENTACION: [".pdf", ".doc", ".docx"],
  PASAPORTE: EXTENSIONES_DOCUMENTO,
  FOTO: [".jpg", ".jpeg", ".png"],
  FORMATO_SAM: EXTENSIONES_DOCUMENTO,
  SEGURO_VIAJE: EXTENSIONES_DOCUMENTO,
  COMPROBANTE_PAGO: EXTENSIONES_DOCUMENTO,
  CONSENTIMIENTO: EXTENSIONES_DOCUMENTO,
};

/** El Formato SAM solo se exige a participantes menores de edad. */
export function categoriasRequeridas(esMenor: boolean): CategoriaDocumento[] {
  return CATEGORIAS_DOCUMENTO.filter((c) => esMenor || c !== "FORMATO_SAM");
}

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
