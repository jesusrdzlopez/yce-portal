"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const nombreLegible = (nombre: string) => nombre.replace(/\.[^.]+$/, "");

export default function GaleriaDrive({ imagenes }: { imagenes: Imagen[] }) {
  const [orden, setOrden] = useState<Imagen[]>(imagenes);
  const [pausada, setPausada] = useState(false);
  const [abierta, setAbierta] = useState<number | null>(null);
  const pista = useRef<HTMLDivElement>(null);

  // El orden aleatorio se aplica tras montar, para no desfasar el HTML del servidor.
  useEffect(() => {
    setOrden(mezclar(imagenes));
  }, [imagenes]);

  const mover = useCallback((direccion: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.firstElementChild as HTMLElement | null;
    const paso = tarjeta ? tarjeta.offsetWidth + 16 : el.clientWidth;
    const alFinal = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (direccion === 1 && alFinal) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (direccion === -1 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: direccion * paso, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (pausada || abierta !== null || orden.length < 2) return;
    const temporizador = setInterval(() => mover(1), 4500);
    return () => clearInterval(temporizador);
  }, [pausada, abierta, orden.length, mover]);

  useEffect(() => {
    if (abierta === null) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((i) => (i === null ? i : (i + 1) % orden.length));
      if (e.key === "ArrowLeft") setAbierta((i) => (i === null ? i : (i - 1 + orden.length) % orden.length));
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierta, orden.length]);

  if (orden.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPausada(true)}
      onMouseLeave={() => setPausada(false)}
      onTouchStart={() => setPausada(true)}
    >
      <div
        ref={pista}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:thin]"
      >
        {orden.map((imagen, i) => (
          <button
            key={imagen.id}
            type="button"
            onClick={() => setAbierta(i)}
            aria-label={`Ampliar ${nombreLegible(imagen.nombre)}`}
            className="aspect-[2/5] w-[46%] shrink-0 snap-start overflow-hidden rounded-2xl bg-slate-200 shadow-md transition hover:shadow-xl sm:w-[30%] lg:w-[23%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlImagenDrive(imagen.id)}
              alt={`Campamento ${nombreLegible(imagen.nombre)}`}
              loading={i < 6 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {orden.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3.5 py-2 text-xl font-bold text-blue-950 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3.5 py-2 text-xl font-bold text-blue-950 shadow hover:bg-white"
          >
            ›
          </button>
        </>
      )}

      {abierta !== null && orden[abierta] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setAbierta(null)}
        >
          <button
            type="button"
            onClick={() => setAbierta(null)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3.5 py-2 text-lg font-bold text-blue-950 hover:bg-white"
          >
            ✕
          </button>
          {orden.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAbierta((abierta - 1 + orden.length) % orden.length);
                }}
                aria-label="Anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3.5 py-2 text-xl font-bold text-blue-950 hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAbierta((abierta + 1) % orden.length);
                }}
                aria-label="Siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3.5 py-2 text-xl font-bold text-blue-950 hover:bg-white"
              >
                ›
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlImagenDrive(orden[abierta].id, 1000)}
            alt={`Campamento ${nombreLegible(orden[abierta].nombre)}`}
            className="max-h-[92vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
