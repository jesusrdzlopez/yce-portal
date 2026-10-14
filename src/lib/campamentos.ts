import { obtenerFilasHoja } from "@/lib/drive";

export const ID_HOJA_CAMPAMENTOS = "1V7rXBkX83k4-vRu1Ige1Nw8EbrtVYU5tjOdDMk0WooM";
export const ID_CARPETA_GALERIA = "1TQNhfx16iWJ_o2XtJ2DHNfjCi1fqjq2h";

function letraAIndice(letra: string) {
  return letra.split("").reduce((total, c) => total * 26 + (c.charCodeAt(0) - 64), 0) - 1;
}

// Letra de la columna en la hoja de Drive -> etiqueta que se muestra.
export const COLUMNAS = [
  { letra: "Z", clave: "pais", etiqueta: "País" },
  { letra: "T", clave: "lugar", etiqueta: "Lugar del campamento" },
  { letra: "C", clave: "nombre", etiqueta: "Nombre oficial del campamento" },
  { letra: "AA", clave: "lugares", etiqueta: "Lugares disponibles" },
  { letra: "H", clave: "limite", etiqueta: "Fecha límite de solicitud" },
  { letra: "I", clave: "edad", etiqueta: "Rango de edad" },
  { letra: "K", clave: "idioma", etiqueta: "Idioma oficial" },
  { letra: "L", clave: "cuota", etiqueta: "Cuota del campamento" },
  { letra: "M", clave: "divisa", etiqueta: "Divisa en que se paga la cuota" },
  { letra: "N", clave: "familia1Inicio", etiqueta: "Inicio de estancia familiar 1" },
  { letra: "O", clave: "familia1Fin", etiqueta: "Fin de estancia familiar 1" },
  { letra: "P", clave: "familia2Inicio", etiqueta: "Inicio de estancia familiar 2" },
  { letra: "Q", clave: "familia2Fin", etiqueta: "Fin de estancia familiar 2" },
  { letra: "R", clave: "actividadesFamilia", etiqueta: "Actividades con la familia anfitriona" },
  { letra: "S", clave: "sitio", etiqueta: "Sitio web del campamento" },
  { letra: "U", clave: "inicio", etiqueta: "Fecha de inicio del campamento" },
  { letra: "V", clave: "fin", etiqueta: "Fecha de término del campamento" },
  { letra: "Y", clave: "actividadesCamp", etiqueta: "Actividades en el campamento" },
] as const;

export type Campamento = Record<(typeof COLUMNAS)[number]["clave"], string>;

/** Devuelve null si la hoja no es accesible (por ejemplo, si todavía no es pública). */
export async function obtenerCampamentos(): Promise<Campamento[] | null> {
  const filas = await obtenerFilasHoja(ID_HOJA_CAMPAMENTOS, process.env.CAMPAMENTOS_CSV_URL);
  if (!filas) return null;

  return filas
    .slice(1) // la primera fila son los encabezados de la hoja
    .map((fila) => {
      const campamento = {} as Campamento;
      for (const columna of COLUMNAS) {
        campamento[columna.clave] = (fila[letraAIndice(columna.letra)] ?? "").trim();
      }
      return campamento;
    })
    .filter((c) => c.pais !== "" || c.nombre !== "");
}
