import { Resend } from "resend";
import { getEmailTemplate } from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envía un email de verificación de cuenta al usuario
 * @param email - Email del destinatario
 * @param token - Código de verificación de 6 dígitos
 * @param name - Nombre del usuario
 * @returns Resultado del envío del email
 */
export async function sendVerificationEmail(
    email: string,
    token: string,
    name: string
) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    const htmlContent = `
        <div class="content">
            <h1 style="color: #00ff9d;">¡Bienvenido, ${name}!</h1>
            <p style="font-size: 18px;">Gracias por registrarte en InterCodeView.</p>
            <p>Para completar tu registro, verifica tu cuenta con el siguiente código:</p>
            
            <div class="token-box">${token}</div>
            
            <p>O haz clic en el botón de abajo:</p>
            <a href="${verificationUrl}" class="button">Verificar mi cuenta</a>
            
            <div class="warning">
                <strong>⚠️ Importante:</strong> Este código expirará en 24 horas.
            </div>
        </div>
        <div class="footer">
            <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
        </div>
    `;

    const textContent = `
        Bienvenido a InterCodeView, ${name}!
        
        Gracias por registrarte. Para verificar tu cuenta, usa el siguiente código:
        
        ${token}
        
        O visita: ${verificationUrl}
        
        Este código expirará en 24 horas.
        
        Si no creaste esta cuenta, puedes ignorar este correo.
    `;

    try {
        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ||
                "InterCodeView <onboarding@resend.dev>",
            to: email,
            subject: "Verifica tu cuenta - InterCodeView",
            html: getEmailTemplate(htmlContent),
            text: textContent,
        });

        if (error) {
            return { success: false, error };
        }
		
        return { success: true, data };
    } catch (error) {
        console.error("Error al enviar email de verificación:", error);
        return { success: false, error };
    }
}
