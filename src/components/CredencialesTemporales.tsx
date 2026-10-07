"use client";

import { useState } from "react";
import type { Credenciales } from "@/lib/usuarios";

export default function CredencialesTemporales({
  nombre,
  distrito,
  email,
  passwordTemporal,
}: Credenciales) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    const texto = [
      "Portal YCE México",
      `Nombre: ${nombre}`,
      `Distrito: ${distrito}`,
      `Usuario: ${email}`,
      `Contraseña temporal: ${passwordTemporal}`,
      "Al entrar, el sistema te pedirá elegir una contraseña nueva.",
    ].join("\n");
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-900">
      <p className="font-semibold">Entrega estas credenciales a {nombre}.</p>
      <p className="mt-1">
        Distrito: <strong>{distrito}</strong>
      </p>
      <p>
        Usuario: <strong>{email}</strong>
      </p>
      <p>
        Contraseña temporal:{" "}
        <code className="rounded bg-white px-2 py-0.5 font-mono text-base text-slate-900">
          {passwordTemporal}
        </code>
      </p>
      <p className="mt-2 text-xs text-green-800">
        Solo se muestra ahora; si se pierde, restablécela de nuevo. Tendrá que cambiarla al entrar.
      </p>
      <button
        type="button"
        onClick={copiar}
        className="mt-3 rounded-lg bg-green-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-800"
      >
        {copiado ? "Copiado" : "Copiar para enviar"}
      </button>
    </div>
  );
}
