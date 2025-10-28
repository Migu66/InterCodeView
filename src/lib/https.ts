import { NextRequest, NextResponse } from "next/server";

/**
 * Verifica si la petición usa HTTPS en producción
 * @param request - NextRequest object
 * @returns NextResponse con redirección o null si todo está bien
 */
export function enforceHTTPS(request: NextRequest): NextResponse | null {
    // Solo forzar HTTPS en producción
    if (process.env.NODE_ENV !== "production") {
        return null;
    }

    // Verificar el protocolo
    const proto = request.headers.get("x-forwarded-proto");
    const host = request.headers.get("host");

    // Si no es HTTPS, redirigir
    if (proto !== "https") {
        const httpsUrl = `https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`;

        return NextResponse.redirect(httpsUrl, 301);
    }

    return null;
}

/**
 * Middleware para verificar HTTPS en API routes
 * Úsalo al inicio de tus handlers de API
 */
export function checkHTTPSMiddleware(
    request: NextRequest
): NextResponse | null {
    return enforceHTTPS(request);
}
