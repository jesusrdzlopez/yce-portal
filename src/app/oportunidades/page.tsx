import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SitioPublico from "@/components/SitioPublico";
import TablaCampamentos from "@/components/TablaCampamentos";
import GaleriaDrive from "@/components/GaleriaDrive";
import { COLUMNAS, ID_CARPETA_GALERIA, obtenerCampamentos } from "@/lib/campamentos";
import { obtenerImagenesCarpeta } from "@/lib/drive";

export const metadata: Metadata = { title: "Oportunidades de intercambio | YCE México" };
// La tabla y la galería se leen de Drive; se refrescan cada 10 minutos.
export const revalidate = 600;

const DEBE_PARTICIPANTE = [
  "Contar con el patrocinio de un club de Leones.",
  "Estar preparado para representar a su comunidad o país de origen y al club de Leones patrocinador.",
  "Apreciar la oportunidad de explorar las costumbres de otra cultura.",
  "Proporcionar pruebas de seguro (médico, de salud y de viaje) y del acuerdo de exención de responsabilidad civil.",
  "Tomar la iniciativa para aprender el idioma del país anfitrión (es decir, saludos y frases básicas).",
];

const RESPONSABLE_FAMILIA = [
  "Los pasajes de ida y vuelta",
  "Las cuotas del campamento",
  "El seguro médico y para viajes",
  "La documentación de viaje (como pasaportes y visas)",
  "El dinero para gastos personales",
];

const PASOS_SOLICITUD = [
  "Toma en cuenta los requisitos y las fechas límite para enviar la solicitud.",
  "Prepara una pequeña lista de países a los que te interesaría ir.",
  "Comunícate con el club de Leones local para solicitar que sea tu club patrocinador.",
  "Comunícate con el asesor del programa del distrito al que pertenece el club patrocinador para verificar la elegibilidad y empiecen a preparar tu expediente.",
  "Las solicitudes se iniciarán exclusivamente con el asesor distrital para que posteriormente sean autorizadas por el asesor nacional.",
  "Ningún trámite se iniciará sin haber cubierto la cuota de participación nacional.",
];

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-slate-700">
          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Seccion({
  titulo,
  id,
  children,
}: {
  titulo: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="border-b-2 border-amber-400 pb-2 text-2xl font-bold text-blue-950">{titulo}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function OportunidadesPage() {
  const [campamentos, imagenes] = await Promise.all([
    obtenerCampamentos(),
    obtenerImagenesCarpeta(ID_CARPETA_GALERIA),
  ]);

  return (
    <SitioPublico activo="/oportunidades">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              Oportunidades de intercambio
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">¿Te gustaría vivir la experiencia?</h1>
            <p className="mt-3 max-w-2xl text-blue-100">
              Conoce los requisitos, los costos y los campamentos disponibles.
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

      <div className="mx-auto max-w-6xl px-4 py-4 pb-16">
        <div className="max-w-3xl">
          <Seccion titulo="Requisitos para participar">
            <p className="leading-relaxed text-slate-700">
              El programa de intercambio de YCE está dirigido a jóvenes entre 15 y 22 años, pero
              puede variar según el programa específico.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              El participante en el intercambio debe:
            </h3>
            <Lista items={DEBE_PARTICIPANTE} />
          </Seccion>

          <Seccion titulo="¿Cuáles son los costos?">
            <p className="leading-relaxed text-slate-700">
              Los costos de los programas varían de un país a otro. Existe una cuota de participación
              nacional que deberá cubrirse para iniciar tu trámite.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              Las familias anfitrionas cubren el costo del alojamiento y las comidas durante la
              estancia con ellos.
            </p>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              El joven participante y su familia generalmente son responsables de:
            </h3>
            <Lista items={RESPONSABLE_FAMILIA} />
            <p className="mt-5 text-slate-700">
              Para mayores detalles consulta la{" "}
              <Link href="/politicas" className="font-semibold text-blue-800 underline">
                política del programa
              </Link>
              .
            </p>
          </Seccion>

          <Seccion titulo="¿Cómo hacer la solicitud?">
            <ul className="space-y-2.5">
              <li className="flex gap-3 leading-relaxed text-slate-700">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                <span>
                  Consulta nuestro{" "}
                  <a href="#lista-de-campamentos" className="font-semibold text-blue-800 underline">
                    directorio de campamentos
                  </a>{" "}
                  o el directorio internacional para ver dónde se ofrecen actualmente programas de
                  campamentos e intercambios juveniles.
                </span>
              </li>
              {PASOS_SOLICITUD.map((paso) => (
                <li key={paso} className="flex gap-3 leading-relaxed text-slate-700">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  {paso}
                </li>
              ))}
            </ul>
          </Seccion>
        </div>

        <Seccion titulo="Lista de campamentos" id="lista-de-campamentos">
          {campamentos && campamentos.length > 0 ? (
            <TablaCampamentos
              columnas={COLUMNAS.map(({ clave, etiqueta }) => ({ clave, etiqueta }))}
              campamentos={campamentos}
            />
          ) : (
            <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
              La lista de campamentos se está actualizando. Vuelve a consultarla en unos minutos.
            </p>
          )}
        </Seccion>

        {imagenes.length > 0 && (
          <section className="mt-14">
            <GaleriaDrive imagenes={imagenes} />
          </section>
        )}
      </div>
    </SitioPublico>
  );
}
