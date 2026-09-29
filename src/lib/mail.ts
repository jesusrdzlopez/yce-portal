import nodemailer from "nodemailer";

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  : null;

export async function enviarCorreo(opciones: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!transporter) {
    console.log("--- [EMAIL SIMULADO, configura SMTP en .env para enviar de verdad] ---");
    console.log("Para:", opciones.to);
    console.log("Asunto:", opciones.subject);
    console.log(opciones.html.replace(/<[^>]+>/g, " "));
    console.log("------------------------------------------------------------------");
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: opciones.to,
    subject: opciones.subject,
    html: opciones.html,
  });
}

export function plantillaDocumentoSubido(params: {
  nombreJoven: string;
  categoria: string;
  urlPortal: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      <p><strong>${params.nombreJoven}</strong> subió un nuevo documento: <strong>${params.categoria}</strong>.</p>
      <p>
        <a href="${params.urlPortal}" style="background:#1d4ed8;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-right:10px;">
          Ver expediente
        </a>
      </p>
    </div>
  `;
}

export function plantillaCorreccionRequerida(params: {
  categoria: string;
  comentario: string;
  urlPortal: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      <p>Tu asesor solicitó una corrección en el documento <strong>${params.categoria}</strong>.</p>
      <p style="background:#fef2f2;border-left:4px solid #dc2626;padding:10px 14px;">${params.comentario}</p>
      <p>
        <a href="${params.urlPortal}" style="background:#1d4ed8;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Subir corrección
        </a>
      </p>
    </div>
  `;
}

export function plantillaValidado(params: { urlPortal: string }) {
  return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      <p>Tu expediente fue <strong>validado</strong> y enviado a la coordinación nacional. ¡Felicidades!</p>
      <p>
        <a href="${params.urlPortal}" style="background:#16a34a;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Ver mi expediente
        </a>
      </p>
    </div>
  `;
}
