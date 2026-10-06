"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SubidaDocumento({
  categoria,
  extensiones,
}: {
  categoria: string;
  extensiones: string[];
}) {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function manejarCambio(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setEnviando(true);
    setError(null);

    const formData = new FormData();
    formData.append("categoria", categoria);
    formData.append("archivo", archivo);

    try {
      const respuesta = await fetch("/api/documentos/upload", {
        method: "POST",
        body: formData,
      });
      if (!respuesta.ok) {
        const cuerpo = await respuesta.json().catch(() => ({}));
        throw new Error(cuerpo.error ?? "No se pudo subir el archivo");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir el archivo");
    } finally {
      setEnviando(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={extensiones.join(",")}
        onChange={manejarCambio}
        disabled={enviando}
        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
      />
      {enviando && <p className="mt-1 text-sm text-slate-500">Subiendo…</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
