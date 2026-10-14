// Los archivos de Google Drive deben estar compartidos como "Cualquier persona con el enlace".

/** Parser de CSV que respeta comillas, comas y saltos de línea dentro de una celda. */
export function parsearCsv(texto: string): string[][] {
  const filas: string[][] = [];
  let fila: string[] = [];
  let celda = "";
  let entreComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreComillas) {
      if (c === '"' && texto[i + 1] === '"') {
        celda += '"';
        i++;
      } else if (c === '"') {
        entreComillas = false;
      } else {
        celda += c;
      }
    } else if (c === '"') {
      entreComillas = true;
    } else if (c === ",") {
      fila.push(celda);
      celda = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(celda);
      filas.push(fila);
      fila = [];
      celda = "";
    } else {
      celda += c;
    }
  }
  if (celda !== "" || fila.length > 0) {
    fila.push(celda);
    filas.push(fila);
  }
  return filas;
}

const SEGUNDOS_CACHE = 600;

/** Descarga la primera hoja de un Google Sheet como filas de texto. Devuelve null si no es accesible. */
export async function obtenerFilasHoja(idHoja: string, urlPersonalizada?: string) {
  const url = urlPersonalizada ?? `https://docs.google.com/spreadsheets/d/${idHoja}/export?format=csv`;
  try {
    const respuesta = await fetch(url, { next: { revalidate: SEGUNDOS_CACHE } });
    if (!respuesta.ok) return null;
    const tipo = respuesta.headers.get("content-type") ?? "";
    if (tipo.includes("text/html")) return null; // Google devuelve la página de inicio de sesión
    return parsearCsv(await respuesta.text());
  } catch {
    return null;
  }
}

/**
 * Indica si un archivo de Drive se puede descargar sin iniciar sesión. Si no es público, Google
 * responde con una página HTML de acceso y el botón de descarga se muestra como "Próximamente".
 */
export async function archivoDriveDisponible(id: string): Promise<boolean> {
  const control = new AbortController();
  try {
    // Sin opciones de caché de Next: la página se genera de forma estática y se vuelve a generar
    // cada `revalidate` segundos, así que este chequeo no corre en cada visita.
    const respuesta = await fetch(`https://drive.google.com/uc?export=download&id=${id}`, {
      signal: control.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const tipo = respuesta.headers.get("content-type") ?? "";
    const disponible = respuesta.ok && !tipo.includes("text/html");
    control.abort(); // no hace falta leer el archivo completo
    return disponible;
  } catch {
    return false;
  }
}

export type ImagenDrive = { id: string; nombre: string };

const EXTENSION_IMAGEN = /\.(jpe?g|png|webp|gif)$/i;

/** Lista las imágenes de una carpeta pública de Drive. Devuelve [] si no es accesible. */
export async function obtenerImagenesCarpeta(idCarpeta: string): Promise<ImagenDrive[]> {
  try {
    const respuesta = await fetch(`https://drive.google.com/embeddedfolderview?id=${idCarpeta}`, {
      next: { revalidate: SEGUNDOS_CACHE },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!respuesta.ok) return [];
    const html = await respuesta.text();

    const imagenes: ImagenDrive[] = [];
    const patron =
      /id="entry-([\w-]+)"[\s\S]*?<div class="flip-entry-title">([^<]*)<\/div>/g;
    for (const coincidencia of html.matchAll(patron)) {
      const nombre = coincidencia[2].trim();
      if (EXTENSION_IMAGEN.test(nombre)) imagenes.push({ id: coincidencia[1], nombre });
    }
    return imagenes;
  } catch {
    return [];
  }
}
