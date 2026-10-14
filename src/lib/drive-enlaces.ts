// Los archivos de Google Drive deben estar compartidos como "Cualquier persona con el enlace".

export function enlaceDescargaDrive(id: string) {
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

export function enlaceVistaDrive(id: string) {
  return `https://drive.google.com/file/d/${id}/view`;
}

export function urlImagenDrive(id: string, ancho = 1280) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${ancho}`;
}
