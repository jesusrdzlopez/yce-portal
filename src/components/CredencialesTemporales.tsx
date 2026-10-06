"use client";

import { useState } from "react";

export default function CredencialesTemporales({
  nombre,
  email,
  passwordTemporal,
}: {
  nombre: string;
  email: string;
  passwordTemporal: string;
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    const texto = `Portal YCE México\nUsuario: ${email}\nContraseña temporal: ${passwordTemporal}\nAl entrar, el sistema te pedirá elegir una contraseña nueva.`;
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-900">
      <p className="font-semibold">Entrega estas credenciales a {nombre}.</p>
      <p className="mt-1">
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
