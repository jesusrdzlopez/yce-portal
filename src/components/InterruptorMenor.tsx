"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterruptorMenor({ esMenorInicial }: { esMenorInicial: boolean }) {
  const [esMenor, setEsMenor] = useState(esMenorInicial);
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  async function cambiar(valor: boolean) {
    setEsMenor(valor);
    setGuardando(true);
    try {
      await fetch("/api/expediente/menor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ esMenor: valor }),
      });
      router.refresh();
    } finally {
      setGuardando(false);
    }
  }

  return (
    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <input
        type="checkbox"
        checked={esMenor}
        disabled={guardando}
        onChange={(e) => cambiar(e.target.checked)}
        className="mt-1 h-5 w-5 accent-blue-900"
      />
      <span className="text-sm text-slate-700">
        <strong className="block text-slate-900">Soy menor de edad</strong>
        Si eres menor de edad, debes subir también el Formato SAM (Autorización de Salida del País de
        Niñas, Niños y Adolescentes).
      </span>
    </label>
  );
}
