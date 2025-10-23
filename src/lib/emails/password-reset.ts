import { Resend } from "resend";
import { getEmailTemplate } from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envía un email para restablecer la contraseña del usuario
 * @param email - Email del destinatario
 * @param token - Código de verificación de 6 dígitos
 * @param name - Nombre del usuario
 * @returns Resultado del envío del email
 */
export async function sendPasswordResetEmail(
    email: string,
    token: string,
    name: string
) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    const htmlContent = `
        <div class="content">
            <h1 style="color: #00ff9d;">Restablecer contraseña</h1>
            <p style="font-size: 18px;">Hola, ${name}!</p>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Usa el siguiente código para continuar:</p>
            
            <div class="token-box">${token}</div>
            
            <p>O haz clic en el botón de abajo:</p>
            <a href="${resetUrl}" class="button">Restablecer contraseña</a>
            
            <div class="warning">
                <strong>⚠️ Importante:</strong> Este código expirará en 1 hora.
            </div>
        </div>
        <div class="footer">
            <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
        </div>
    `;

    const textContent = `
        Restablecer contraseña - InterCodeView
        
        Hola, ${name}!
        
        Recibimos una solicitud para restablecer tu contraseña.
        Usa el siguiente código para continuar:
        
        ${token}
        
        O visita: ${resetUrl}
        
        Este código expirará en 1 hora.
        
        Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.
    `;

    try {
        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ||
                "InterCodeView <onboarding@resend.dev>",
            to: email,
            subject: "Restablecer contraseña - InterCodeView",
            html: getEmailTemplate(htmlContent),
            text: textContent,
        });

        if (error) {
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error al enviar email de reset:", error);
        return { success: false, error };
    }
}
