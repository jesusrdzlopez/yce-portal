import type { Metadata } from "next";
import Image from "next/image";
import SitioPublico from "@/components/SitioPublico";

export const metadata: Metadata = { title: "El programa | YCE México" };

const OBJETIVOS = [
  "Fomentar el entendimiento entre jóvenes de distintos países y culturas.",
  "Vivir otro país desde adentro, con una familia anfitriona y con jóvenes de todo el mundo.",
  "Desarrollar autonomía, tolerancia e interés por otras culturas.",
  "Construir amistades internacionales que duren más allá del campamento.",
];

const NO_ES = [
  {
    titulo: "No es turismo",
    texto: "Se trata de conocer un país desde adentro, no de recorrerlo como visitante.",
  },
  {
    titulo: "No es una escuela de idiomas",
    texto: "El idioma del campamento suele ser el inglés; el aprendizaje viene de convivir.",
  },
  {
    titulo: "No garantiza un destino",
    texto: "Los cupos y campamentos se asignan según disponibilidad y el perfil de cada candidato.",
  },
];

export default function ProgramaPage() {
  return (
    <SitioPublico activo="/programa">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              El programa
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Intercambios y Campamentos Juveniles
            </h1>
            <p className="mt-3 max-w-2xl text-blue-100">
              Un programa de Lions para que jóvenes conozcan el mundo y construyan puentes entre
              culturas.
            </p>
          </div>
          <Image
            src="/logos/yce-mexico.webp"
            alt="México · Youth Camps & Exchange"
            width={640}
            height={612}
            unoptimized
            className="hidden h-36 w-auto shrink-0 drop-shadow-xl md:block"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">¿Qué es?</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              El Programa de Intercambios y Campamentos Juveniles (YCE, por sus siglas en inglés)
              es una iniciativa de Lions que permite a jóvenes vivir una experiencia internacional:
              convivir con una familia anfitriona y compartir un campamento con participantes de
              distintos países.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              En México, el programa es operado por el Club de Leones a través de asesores
              distritales y una coordinación nacional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Objetivos</h2>
            <ul className="mt-4 space-y-3">
              {OBJETIVOS.map((objetivo) => (
                <li key={objetivo} className="flex gap-3 text-slate-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  {objetivo}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Lo que el programa no es</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {NO_ES.map((item) => (
              <div key={item.titulo} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.texto}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SitioPublico>
  );
}
