import { CLASES_SEMAFORO, NOMBRE_ESTADO_EXPEDIENTE, colorSemaforo } from "@/lib/catalogos";

export default function Semaforo({ estado }: { estado: string }) {
  const color = colorSemaforo(estado);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${CLASES_SEMAFORO[color]}`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          color === "rojo" ? "bg-red-500" : color === "amarillo" ? "bg-amber-500" : "bg-green-500"
        }`}
      />
      {NOMBRE_ESTADO_EXPEDIENTE[estado] ?? estado}
    </span>
  );
}
