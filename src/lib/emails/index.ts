/**
 * Módulo central de emails
 * Exporta todas las funciones de envío de emails
 */

export { sendVerificationEmail } from "./verification";
export { sendPasswordResetEmail } from "./password-reset";

/**
 * Genera un código de verificación de 6 dígitos
 * @returns String con 6 dígitos aleatorios
 */
export function generateVerificationToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
