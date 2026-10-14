"use client";

import { useEffect, useState } from "react";
import { urlImagenDrive } from "@/lib/drive-enlaces";

type Imagen = { id: string; nombre: string };

function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function GaleriaDrive({ imagenes }: { imagenes: Imagen[] }) {
  const [orden, setOrden] = useState<Imagen[]>(imagenes);
  const [actual, setActual] = useState(0);
  const [pausada, setPausada] = useState(false);

  // El orden aleatorio se aplica tras montar, para no desfasar el HTML del servidor.
  useEffect(() => {
    setOrden(mezclar(imagenes));
    setActual(0);
  }, [imagenes]);

  useEffect(() => {
    if (pausada || orden.length < 2) return;
    const temporizador = setInterval(() => setActual((i) => (i + 1) % orden.length), 5000);
    return () => clearInterval(temporizador);
  }, [pausada, orden.length]);

  if (orden.length === 0) return null;

  const mover = (paso: number) => setActual((i) => (i + paso + orden.length) % orden.length);

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-lg"
      onMouseEnter={() => setPausada(true)}
      onMouseLeave={() => setPausada(false)}
    >
      <div className="relative aspect-[16/9] w-full">
        {orden.map((imagen, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={imagen.id}
            src={urlImagenDrive(imagen.id)}
            alt={imagen.nombre.replace(/\.[^.]+$/, "")}
            loading={Math.abs(i - actual) <= 1 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === actual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {orden.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-lg font-bold text-blue-950 hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-lg font-bold text-blue-950 hover:bg-white"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex max-w-[90%] -translate-x-1/2 flex-wrap justify-center gap-1.5">
            {orden.map((imagen, i) => (
              <button
                key={imagen.id}
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${i === actual ? "bg-amber-400" : "bg-white/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
