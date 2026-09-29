"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccionesDocumento({ documentoId }: { documentoId: string }) {
  const [mostrarCorreccion, setMostrarCorreccion] = useState(false);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function validar() {
    setEnviando(true);
    setError(null);
    try {
      const respuesta = await fetch(`/api/documentos/${documentoId}/validar`, { method: "POST" });
      if (!respuesta.ok) throw new Error("No se pudo validar");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setEnviando(false);
    }
  }

  async function enviarCorreccion() {
    if (!comentario.trim()) {
      setError("Escribe qué debe corregir el joven");
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      const respuesta = await fetch(`/api/documentos/${documentoId}/corregir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comentario }),
      });
      if (!respuesta.ok) throw new Error("No se pudo enviar la corrección");
      setMostrarCorreccion(false);
      setComentario("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mt-3">
      {!mostrarCorreccion ? (
        <div className="flex gap-2">
          <button
            onClick={validar}
            disabled={enviando}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            Expediente revisado (Validar)
          </button>
          <button
            onClick={() => setMostrarCorreccion(true)}
            disabled={enviando}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            Solicitar corrección
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Explica qué debe corregir el joven…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={enviarCorreccion}
              disabled={enviando}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              Enviar corrección
            </button>
            <button
              onClick={() => setMostrarCorreccion(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
