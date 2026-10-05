import type { Metadata } from "next";
import SitioPublico from "@/components/SitioPublico";
import AvisoBorrador from "@/components/AvisoBorrador";

export const metadata: Metadata = { title: "Preguntas frecuentes | YCE México" };

const PREGUNTAS = [
  {
    pregunta: "¿Quién puede participar?",
    respuesta:
      "[Por confirmar] Edad, requisitos y si se necesita ser familiar de un Club de Leones.",
  },
  {
    pregunta: "¿Cuánto cuesta participar?",
    respuesta: "[Por confirmar] Costos del programa, del vuelo y del seguro médico.",
  },
  {
    pregunta: "¿Cuándo es la convocatoria?",
    respuesta: "[Por confirmar] Fechas de apertura y cierre de solicitudes.",
  },
  {
    pregunta: "¿Qué documentos necesito?",
    respuesta:
      "Pasaporte, carta Lions, seguro médico y carta médica. Los formatos se descargan en la sección Documentos y todo se sube desde el portal, nunca por correo.",
  },
  {
    pregunta: "¿Cómo sé en qué estado está mi expediente?",
    respuesta:
      "Al iniciar sesión verás un semáforo: rojo si falta algún documento, amarillo si está pendiente de revisión y verde cuando tu asesor lo validó.",
  },
  {
    pregunta: "¿Qué pasa si mi asesor pide una corrección?",
    respuesta:
      "Recibirás un correo con el documento que debes corregir y el motivo. Sube el archivo corregido en el portal y tu asesor volverá a revisarlo.",
  },
  {
    pregunta: "¿Puedo elegir el campamento al que voy?",
    respuesta:
      "[Por confirmar] Los cupos se asignan según disponibilidad; la coordinación nacional decide la asignación final.",
  },
  {
    pregunta: "¿Con quién hablo si tengo dudas?",
    respuesta:
      "Con el asesor ICJ de tu distrito. Encuentra sus datos de contacto en el Directorio.",
  },
];

export default function FaqPage() {
  return (
    <SitioPublico activo="/faq">
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">FAQ</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Preguntas frecuentes</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Resolvemos las dudas más comunes sobre tu solicitud.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <AvisoBorrador />

        <div className="space-y-3">
          {PREGUNTAS.map((item) => (
            <details
              key={item.pregunta}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-blue-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                {item.pregunta}
                <span className="text-xl text-blue-900 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </SitioPublico>
  );
}
