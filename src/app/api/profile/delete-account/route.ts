import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth-next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";

export async function DELETE(request: NextRequest) {
    try {
        let userId: string | null = null;

        // Intentar obtener la sesión de NextAuth primero (OAuth)
        const session = await auth();
        if (session?.user?.email) {
            const dbUser = await prisma.user.findUnique({
                where: { email: session.user.email },
            });
            if (dbUser) {
                userId = dbUser.id;
            }
        }

        // Si no hay sesión de NextAuth, intentar con JWT tradicional
        if (!userId) {
            const cookieStore = await cookies();
            const token = cookieStore.get("auth-token");

            if (!token?.value) {
                return NextResponse.json(
                    { message: "No autenticado" },
                    { status: 401 }
                );
            }

            try {
                const decoded = jwt.verify(
                    token.value,
                    process.env.JWT_SECRET!
                ) as { userId: string };
                userId = decoded.userId;
            } catch (error) {
                console.error("Error al verificar token:", error);
                return NextResponse.json(
                    { message: "Token inválido" },
                    { status: 401 }
                );
            }
        }

        if (!userId) {
            return NextResponse.json(
                { message: "No autenticado" },
                { status: 401 }
            );
        }

        // Aplicar rate limiting usando el userId
        const rateLimit = await checkRateLimit(
            request,
            rateLimitConfigs.sensitive,
            userId
        );

        if (!rateLimit.success) {
            return NextResponse.json(
                { error: rateLimit.message },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "Retry-After": "60",
                    },
                }
            );
        }

        const { password } = await request.json();

        // Obtener el usuario actual
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Si el usuario tiene contraseña (no es OAuth), verificarla
        if (user.password) {
            if (!password) {
                return NextResponse.json(
                    { message: "La contraseña es requerida" },
                    { status: 400 }
                );
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return NextResponse.json(
                    { message: "Contraseña incorrecta" },
                    { status: 401 }
                );
            }
        }

        // Eliminar el usuario (esto eliminará también las relaciones en cascada si están configuradas)
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json(
            { message: "Cuenta eliminada exitosamente" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al eliminar cuenta:", error);
        return NextResponse.json(
            { message: "Error al eliminar la cuenta" },
            { status: 500 }
        );
    }
}
