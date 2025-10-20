import { Resend } from "resend";

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    token: string,
    name: string
) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    try {
        const { data, error } = await resend.emails.send({
            from:
                process.env.RESEND_FROM_EMAIL ||
                "InterCodeView <onboarding@resend.dev>",
            to: email,
            subject: "Verifica tu cuenta - InterCodeView",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .container {
                        background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                        border-radius: 16px;
                        padding: 40px;
                        text-align: center;
                        border: 2px solid #00ff9d;
                    }
                    .logo {
                        font-size: 36px;
                        font-weight: 900;
                        background: linear-gradient(to right, #00ff9d, #00cc7d);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 20px;
                    }
                    .content {
                        color: #ffffff;
                        margin: 30px 0;
                    }
                    .token-box {
                        background: rgba(0, 255, 157, 0.1);
                        border: 2px solid #00ff9d;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 30px 0;
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        color: #00ff9d;
                        font-family: 'Courier New', monospace;
                    }
                    .button {
                        display: inline-block;
                        background: linear-gradient(to right, #00ff9d, #00cc7d);
                        color: #000000;
                        text-decoration: none;
                        padding: 16px 40px;
                        border-radius: 8px;
                        font-weight: bold;
                        margin: 20px 0;
                        font-size: 16px;
                    }
                    .footer {
                        color: #888;
                        font-size: 14px;
                        margin-top: 30px;
                    }
                    .warning {
                        background: rgba(255, 193, 7, 0.1);
                        border-left: 4px solid #ffc107;
                        padding: 15px;
                        margin: 20px 0;
                        color: #ffffff;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">InterCodeView</div>
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
                        <p>© ${new Date().getFullYear()} InterCodeView - Plataforma de entrevistas de código</p>
                    </div>
                </div>
            </body>
            </html>
        `,
            text: `
            Bienvenido a InterCodeView, ${name}!
            
            Gracias por registrarte. Para verificar tu cuenta, usa el siguiente código:
            
            ${token}
            
            O visita: ${verificationUrl}
            
            Este código expirará en 24 horas.
            
            Si no creaste esta cuenta, puedes ignorar este correo.
        `,
        });

        if (error) {
            console.error("Error al enviar email con Resend:", error);
            return { success: false, error };
        }

        console.log("Email de verificación enviado a:", email);
        console.log("Resend response:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error al enviar email:", error);
        return { success: false, error };
    }
}

// Función para generar un código de 6 dígitos
export function generateVerificationToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
