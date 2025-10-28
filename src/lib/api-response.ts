import { NextResponse } from "next/server";

/**
 * Optimiza respuestas JSON con compresión automática
 */
export function jsonResponse<T>(
    data: T,
    status: number = 200,
    headers?: HeadersInit
): NextResponse {
    const response = NextResponse.json(data, {
        status,
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
    });

    return response;
}

/**
 * Respuesta con caché para datos estáticos o poco cambiantes
 */
export function cachedJsonResponse<T>(
    data: T,
    maxAge: number = 300, // 5 minutos por defecto
    status: number = 200
): NextResponse {
    return jsonResponse(data, status, {
        "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
    });
}

/**
 * Respuesta sin caché para datos dinámicos
 */
export function noCacheJsonResponse<T>(
    data: T,
    status: number = 200
): NextResponse {
    return jsonResponse(data, status, {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    });
}
