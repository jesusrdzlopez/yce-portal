// Los archivos de Google Drive deben estar compartidos como "Cualquier persona con el enlace".

export function enlaceDescargaDrive(id: string) {
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

export function enlaceVistaDrive(id: string) {
  return `https://drive.google.com/file/d/${id}/view`;
}

// Con ancho 600 cada miniatura pesa unos 180 KB; sin reducir, más de 1 MB.
export function urlImagenDrive(id: string, ancho = 600) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${ancho}`;
}
