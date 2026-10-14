import type { Metadata } from "next";
import SitioPublico from "@/components/SitioPublico";
import BotonDescarga from "@/components/BotonDescarga";
import BotonPayPal from "@/components/BotonPayPal";
import { archivoDriveDisponible } from "@/lib/drive";

export const metadata: Metadata = { title: "Documentos | YCE México" };
// Los botones se activan solos cuando el archivo de Drive se hace público.
export const revalidate = 600;

const ID = {
  solicitudInicial: "1Q95dXffqN2_T3kiY3fvZHCgw134hhtYH",
  formularioXlsx: "16jVl35ioJI2QTMJXTuijNTQn4ir0e61p",
  guiaLlenado: "1nt3QEYoTN2coA-1wHSF1WfeT6FOpJQkp",
  consentimiento: "1c17kre_UIQ9XEFxoXggIsAkhv0pFHgV_",
};

const ENLACE_MERCADO_PAGO = "https://mpago.la/2yxtr8R";

function Formato({ texto }: { texto: string }) {
  return (
    <span className="ml-2 inline-block rounded-md bg-blue-50 px-2 py-0.5 align-middle text-xs font-bold tracking-wide text-blue-900">
      {texto}
    </span>
  );
}

function Nota({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-slate-600">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
      <span>{children}</span>
    </li>
  );
}

function Requisito({
  numero,
  titulo,
  children,
}: {
  numero: number;
  titulo: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-base font-bold text-amber-400">
          {numero}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold leading-snug text-slate-900">{titulo}</h2>
          {children}
        </div>
      </div>
    </li>
  );
}

export default async function DocumentosPage() {
  const [solicitud, formulario, guia, consentimiento] = await Promise.all([
    archivoDriveDisponible(ID.solicitudInicial),
    archivoDriveDisponible(ID.formularioXlsx),
    archivoDriveDisponible(ID.guiaLlenado),
    archivoDriveDisponible(ID.consentimiento),
  ]);

  return (
    <SitioPublico activo="/documentos">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            Documentos
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Requisitos para tu expediente</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-6 leading-relaxed text-slate-700">
          Crea una carpeta de documentos digitales para enviar por email a tu asesor distrital.
          Deberá contener los siguientes documentos:
        </p>

        <ol className="space-y-4">
          <Requisito
            numero={1}
            titulo={
              <>
                Formato de solicitud de participación inicial lleno (YCE1401 09/18 SP)
                <Formato texto="PDF" />
              </>
            }
          >
            <div className="mt-3">
              <BotonDescarga idDrive={ID.solicitudInicial} disponible={solicitud} />
            </div>
          </Requisito>

          <Requisito
            numero={2}
            titulo={
              <>
                Carta de presentación personal para tu posible familia anfitriona
                <Formato texto="PDF" />
              </>
            }
          >
            <ul className="mt-3 space-y-2">
              <Nota>
                Debes incluir información sobre tus intereses, estudios y pasatiempos; miembros de tu
                familia y su ocupación; comunidad de origen; viajes previos; expectativas del
                intercambio; requisitos dietéticos, de salud o religiosos. La carta deberá estar
                escrita en inglés y puedes incluir fotografías.
              </Nota>
            </ul>
          </Requisito>

          <Requisito numero={3} titulo="Fotografía personal a color del solicitante">
            <ul className="mt-3 space-y-2">
              <Nota>
                Puede ser en tamaño pasaporte, 4:3 o 4x6”. Debe poder verse muy bien tu cara.
              </Nota>
            </ul>
          </Requisito>

          <Requisito
            numero={4}
            titulo={
              <>
                Copia de tu pasaporte
                <Formato texto="PDF" />
              </>
            }
          >
            <ul className="mt-3 space-y-2">
              <Nota>Debe tener vigencia de 6 meses o más al momento de iniciar el viaje.</Nota>
            </ul>
          </Requisito>

          <Requisito
            numero={5}
            titulo={
              <>
                Formulario de aplicación oficial completamente lleno
                <Formato texto="XLSX" />
                <span className="mx-1 text-slate-400">y</span>
                <span className="text-slate-900">adicionalmente la última hoja firmada en</span>
                <Formato texto="PDF" />
              </>
            }
          >
            <div className="mt-3">
              <BotonDescarga
                idDrive={ID.formularioXlsx}
                texto="Application form 2026"
                disponible={formulario}
                respaldoLocal="/documentos/Application-Form-2026.xlsx"
              />
            </div>
            <ul className="mt-4 space-y-2">
              <Nota>No olvides llenar TODOS los campos requeridos.</Nota>
              <Nota>
                Además del documento lleno en formato Excel o XLSX, tendrás que añadir de forma
                independiente la última hoja, correspondiente al apartado de firmas. Puedes
                imprimirla y escanearla con las firmas autógrafas o generar la hoja en PDF y poner
                las firmas digitales.
              </Nota>
              <Nota>
                Esta hoja debe tener las firmas del solicitante, Presidente del Club de Leones
                patrocinador y Padre o Tutor del solicitante. <strong>Formato PDF.</strong>
              </Nota>
            </ul>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-800">
                Aquí tienes una guía de cómo llenarlo
              </p>
              <BotonDescarga
                idDrive={ID.guiaLlenado}
                texto="Guía para llenar el formato de aplicación"
                disponible={guia}
              />
            </div>
          </Requisito>

          <Requisito
            numero={6}
            titulo={
              <>
                Comprobante de pago de cuota de participación
                <Formato texto="PDF" />
              </>
            }
          >
            <ul className="mt-3 space-y-2">
              <Nota>No se iniciará ningún trámite sin que se acredite el pago.</Nota>
              <Nota>Puedes hacerlo mediante transferencia o depósito bancario a la siguiente cuenta:</Nota>
            </ul>

            <dl className="mt-4 grid gap-x-6 gap-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Banco</dt>
                <dd className="font-semibold text-slate-900">BBVA</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">A nombre de</dt>
                <dd className="font-semibold text-slate-900">JESSICA RODRIGUEZ LOPEZ</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Número de cuenta</dt>
                <dd className="font-mono font-semibold text-slate-900">158 323 4853</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">CLABE</dt>
                <dd className="font-mono font-semibold text-slate-900">012 936 01583234853 7</dd>
              </div>
            </dl>

            <p className="mt-5 text-sm text-slate-600">
              También puede hacerse por medio de nuestros métodos digitales:
            </p>
            <div className="mt-3 flex flex-col items-start gap-5 sm:flex-row sm:items-start">
              <a
                href={ENLACE_MERCADO_PAGO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-3xl bg-[#009EE3] px-8 py-[0.6rem] text-base font-bold text-white hover:bg-[#0088c7]"
              >
                Pagar con Mercado Pago
              </a>
              <BotonPayPal />
            </div>
          </Requisito>

          <Requisito
            numero={7}
            titulo={
              <>
                Consentimiento para el tratamiento de datos personales y aceptación de condiciones
                de participación en el programa, firmado
                <Formato texto="PDF" />
              </>
            }
          >
            <div className="mt-3">
              <BotonDescarga idDrive={ID.consentimiento} disponible={consentimiento} />
            </div>
            <ul className="mt-4 space-y-2">
              <Nota>
                Puede enviarse solo la última hoja con las firmas autógrafas correspondientes, con
                firmas digitales o impresa y digitalizada con firmas autógrafas.
              </Nota>
            </ul>
          </Requisito>
        </ol>

        <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 font-medium text-amber-900">
          Recuerda no comprar ningún vuelo hasta tener tu carta de aceptación final.
        </p>
      </section>
    </SitioPublico>
  );
}
