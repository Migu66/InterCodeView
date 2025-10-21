import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "tu-secreto-super-seguro-cambialo";

export interface UserPayload {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string | null;
}

// Generar token JWT
export function generateToken(
    user: UserPayload,
    rememberMe: boolean = false
): string {
    // Si rememberMe es true, el token dura 30 días
    // Si es false, el token dura 24 horas (suficiente para una sesión del navegador)
    const expiresIn = rememberMe ? "30d" : "24h";

    return jwt.sign(user, JWT_SECRET, {
        expiresIn,
    });
}

// Verificar token JWT
export function verifyToken(token: string): UserPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
        return decoded;
    } catch (error) {
        console.error("Error al verificar token:", error);
        return null;
    }
}

// Obtener usuario autenticado desde las cookies
export async function getAuthUser(): Promise<UserPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return null;
        }

        return verifyToken(token);
    } catch (error) {
        console.error("Error al obtener usuario autenticado:", error);
        return null;
    }
}

// Establecer cookie de autenticación
export async function setAuthCookie(
    token: string,
    rememberMe: boolean = false
) {
    const cookieStore = await cookies();

    // Configuración base de la cookie
    const cookieOptions: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "lax";
        path: string;
        maxAge?: number;
    } = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    };

    // Si rememberMe es true, la cookie dura 50 días
    // Si es false, es una cookie de sesión (se elimina al cerrar el navegador)
    if (rememberMe) {
        cookieOptions.maxAge = 60 * 60 * 24 * 50; // 50 días
    }

    cookieStore.set("auth-token", token, cookieOptions);
}

// Eliminar cookie de autenticación
export async function removeAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
}
