/**
 * Estilos comunes para todos los emails de InterCodeView
 * Mantiene la consistencia visual en toda la comunicación
 */
export const emailStyles = `
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
`;

/**
 * Template base para todos los emails
 */
export function getEmailTemplate(content: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${emailStyles}</style>
        </head>
        <body>
            <div class="container">
                <div class="logo">InterCodeView</div>
                ${content}
                <div class="footer">
                    <p>© ${new Date().getFullYear()} InterCodeView - Plataforma de entrevistas de código</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
