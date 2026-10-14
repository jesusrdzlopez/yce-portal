import { enlaceDescargaDrive } from "@/lib/drive-enlaces";

const CLASES =
  "inline-block rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800";

export default function BotonDescarga({
  idDrive,
  texto = "Descargar",
  disponible,
  respaldoLocal,
}: {
  idDrive: string;
  texto?: string;
  disponible: boolean;
  /** Ruta de una copia en el sitio que se usa mientras el archivo de Drive no sea público. */
  respaldoLocal?: string;
}) {
  if (disponible) {
    return (
      <a href={enlaceDescargaDrive(idDrive)} className={CLASES}>
        {texto}
      </a>
    );
  }

  if (respaldoLocal) {
    return (
      <a href={respaldoLocal} download className={CLASES}>
        {texto}
      </a>
    );
  }

  return (
    <span className="inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500">
      {texto} · próximamente
    </span>
  );
}
