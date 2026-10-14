import { obtenerFilasHoja } from "@/lib/drive";

export type AsesorICJ = { distrito: string; nombre: string; correo: string; coasesor?: boolean };

export const ID_HOJA_CONTACTO = "1JQQy2rnuzfHQnhPXa8_oT0owaO-LeKJBuV2ElDBNfbI";

// Lista que se muestra mientras la hoja de Drive no sea pública o no responda.
const DIRECTORIO_RESPALDO: AsesorICJ[] = [
  { distrito: "B1", nombre: "Jesús Adrián Barrios González", correo: "adryanbarrios123@gmail.com" },
  { distrito: "B2", nombre: "Maria Del Rosario Perez Castaneda", correo: "ma.rosario_6@hotmail.com" },
  { distrito: "B3", nombre: "Patricia Flores", correo: "patriciaflores2@live.com" },
  { distrito: "B4", nombre: "José Ismael Huerta Ledesma", correo: "jismaelhl@gmail.com" },
  { distrito: "B5", nombre: "Estefania Martinez Ortiz", correo: "emartinez_ortiz@hotmail.com" },
  { distrito: "B6", nombre: "Francisco José Gomez y Martinez", correo: "fcogomezm@prodigy.net.mx" },
  { distrito: "B7", nombre: "Alberto Valdez Gorrochotegui", correo: "emgoaz1938@yahoo.com" },
  { distrito: "B8", nombre: "Francisco García Arvizo", correo: "garcia_arvizu@yahoo.com" },
  { distrito: "B9", nombre: "Jesus Camacho Angulo", correo: "jesuscamachoangulo@hotmail.com" },
  { distrito: "BM", nombre: "Jessica Rodríguez López", correo: "intermexicobm@gmail.com" },
];

/**
 * Lee el directorio de la hoja de Drive (columnas A = distrito, B = asesor, C = correo), de modo
 * que cualquier asesor o co-asesor que se agregue ahí aparece solo. Si la hoja no es accesible,
 * usa la lista de respaldo.
 */
export async function obtenerDirectorio(): Promise<AsesorICJ[]> {
  const filas = await obtenerFilasHoja(ID_HOJA_CONTACTO, process.env.DIRECTORIO_CSV_URL);
  if (!filas) return DIRECTORIO_RESPALDO;

  const asesores = filas
    .map((fila): AsesorICJ => {
      const celdaDistrito = (fila[0] ?? "").trim();
      // Los co-asesores vienen como "B5 co asesor": se separa el distrito de la etiqueta.
      const coasesor = celdaDistrito.match(/^(.+?)\s+co[\s-]?asesor(a)?$/i);
      return {
        distrito: coasesor ? coasesor[1].trim() : celdaDistrito,
        nombre: (fila[1] ?? "").trim(),
        correo: (fila[2] ?? "").trim(),
        ...(coasesor ? { coasesor: true } : {}),
      };
    })
    // Descarta el encabezado (su columna C no es un correo) y las filas vacías.
    .filter((a) => a.nombre !== "" && a.correo.includes("@"));

  return asesores.length > 0 ? asesores : DIRECTORIO_RESPALDO;
}
