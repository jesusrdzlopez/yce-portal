import { randomInt } from "crypto";

const MINIMO = 8;

/** Devuelve un mensaje de error o null si la contraseña es aceptable. */
export function validarPassword(password: string): string | null {
  if (password.length < MINIMO) return `La contraseña debe tener al menos ${MINIMO} caracteres.`;
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "La contraseña debe incluir mayúsculas, minúsculas y números.";
  }
  return null;
}

// Sin caracteres ambiguos (0/O, 1/l/I) para que se pueda dictar o copiar sin errores.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

export function generarPasswordTemporal(longitud = 12): string {
  let resultado = "";
  for (let i = 0; i < longitud; i++) resultado += ALFABETO[randomInt(ALFABETO.length)];
  // Garantiza mayúscula, minúscula y número.
  return /[A-Z]/.test(resultado) && /[a-z]/.test(resultado) && /[0-9]/.test(resultado)
    ? resultado
    : generarPasswordTemporal(longitud);
}
