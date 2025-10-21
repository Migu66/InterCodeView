/**
 * Módulo de emails - Sistema de comunicación por correo electrónico
 *
 * Este archivo sirve como punto de entrada principal para todas las
 * funcionalidades de email de InterCodeView.
 *
 * La implementación real está organizada en archivos separados dentro
 * de la carpeta ./emails/ para mejor mantenibilidad:
 *
 * - verification.ts: Email de verificación de cuenta
 * - password-reset.ts: Email de recuperación de contraseña
 * - templates.ts: Plantillas y estilos comunes
 *
 * @see ./emails/index.ts para más información
 */

export {
    sendVerificationEmail,
    sendPasswordResetEmail,
    generateVerificationToken,
} from "./emails";
