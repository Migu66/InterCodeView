import { RateLimiter } from "limiter";
import { NextRequest } from "next/server";

// Mapas para almacenar los limitadores por IP
const limiters = new Map<string, RateLimiter>();

interface RateLimitConfig {
    tokensPerInterval: number;
    interval: "second" | "minute" | "hour" | "day";
    message?: string;
}

/**
 * Obtiene o crea un rate limiter para una IP específica
 */
function getLimiter(identifier: string, config: RateLimitConfig): RateLimiter {
    if (!limiters.has(identifier)) {
        const limiter = new RateLimiter({
            tokensPerInterval: config.tokensPerInterval,
            interval: config.interval,
        });
        limiters.set(identifier, limiter);
    }
    return limiters.get(identifier)!;
}

/**
 * Obtiene el identificador del cliente (IP o user ID)
 */
function getIdentifier(request: NextRequest, userId?: string): string {
    // Si hay un userId, usarlo como identificador principal
    if (userId) {
        return `user:${userId}`;
    }

    // Intentar obtener la IP real del cliente
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    // Fallback a unknown si no se puede obtener la IP
    return "unknown";
}

/**
 * Verifica si una petición excede el rate limit
 * @returns true si la petición está permitida, false si excede el límite
 */
export async function checkRateLimit(
    request: NextRequest,
    config: RateLimitConfig,
    userId?: string
): Promise<{ success: boolean; remaining: number; message?: string }> {
    const identifier = getIdentifier(request, userId);
    const limiter = getLimiter(identifier, config);

    try {
        const remainingTokens = await limiter.removeTokens(1);

        if (remainingTokens >= 0) {
            return {
                success: true,
                remaining: Math.floor(remainingTokens),
            };
        } else {
            return {
                success: false,
                remaining: 0,
                message:
                    config.message ||
                    "Demasiadas solicitudes. Por favor, intenta más tarde.",
            };
        }
    } catch (error) {
        console.error("Error en rate limiter:", error);
        // En caso de error, permitir la petición
        return {
            success: true,
            remaining: -1,
        };
    }
}

/**
 * Limpia los limitadores antiguos periódicamente para evitar memory leaks
 */
const LIMITER_CLEANUP_INTERVAL = 1000 * 60 * 10; // 10 minutos

setInterval(() => {
    // Limitar el tamaño del mapa para evitar memory leaks
    if (limiters.size > 1000) {
        const keysToDelete = Array.from(limiters.keys()).slice(0, 500);
        keysToDelete.forEach((key) => limiters.delete(key));
    }
}, LIMITER_CLEANUP_INTERVAL);

// Configuraciones predefinidas para diferentes tipos de rutas
export const rateLimitConfigs = {
    // Para rutas de autenticación (login, signup)
    auth: {
        tokensPerInterval: 5,
        interval: "minute" as const,
        message:
            "Demasiados intentos de inicio de sesión. Por favor, espera unos minutos.",
    },

    // Para rutas de API generales
    api: {
        tokensPerInterval: 100,
        interval: "minute" as const,
        message: "Límite de solicitudes excedido. Intenta más tarde.",
    },

    // Para operaciones sensibles (cambio de contraseña, eliminación de cuenta)
    sensitive: {
        tokensPerInterval: 3,
        interval: "minute" as const,
        message:
            "Demasiados intentos. Por favor, espera antes de intentar nuevamente.",
    },

    // Para endpoints de reset de contraseña
    passwordReset: {
        tokensPerInterval: 3,
        interval: "hour" as const,
        message:
            "Demasiadas solicitudes de restablecimiento de contraseña. Intenta en una hora.",
    },

    // Para verificación de email
    emailVerification: {
        tokensPerInterval: 5,
        interval: "hour" as const,
        message: "Demasiadas solicitudes de verificación. Intenta más tarde.",
    },
};
