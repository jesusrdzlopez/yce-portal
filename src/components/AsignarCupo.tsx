"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AsignarCupo({
  expedienteId,
  cupoActual,
}: {
  expedienteId: string;
  cupoActual: string | null;
}) {
  const [valor, setValor] = useState(cupoActual ?? "");
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  async function guardar() {
    setGuardando(true);
    try {
      await fetch(`/api/expediente/${expedienteId}/cupo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cupo: valor }),
      });
      router.refresh();
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Cupo / destino"
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
      />
      <button
        onClick={guardar}
        disabled={guardando}
        className="rounded-lg bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
      >
        Guardar
      </button>
    </div>
  );
}
