import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    // Aplicar rate limiting
    const rateLimit = await checkRateLimit(
        request,
        rateLimitConfigs.emailVerification
    );

    if (!rateLimit.success) {
        return NextResponse.json(
            { error: rateLimit.message },
            {
                status: 429,
                headers: {
                    "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                    "Retry-After": "3600", // 1 hora
                },
            }
        );
    }

    try {
        const body = await request.json();
        const { token, email } = body;

        // Validar que el token esté presente
        if (!token) {
            return NextResponse.json(
                { error: "El token es obligatorio" },
                { status: 400 }
            );
        }

        // Buscar el usuario con el token
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token,
                ...(email && { email }), // Si se proporciona email, también validarlo
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Token inválido o usuario no encontrado" },
                { status: 404 }
            );
        }

        // Verificar si ya está verificado
        if (user.emailVerified) {
            return NextResponse.json(
                { message: "Este email ya ha sido verificado" },
                { status: 200 }
            );
        }

        // Verificar si el token ha expirado
        if (user.tokenExpiry && new Date() > user.tokenExpiry) {
            return NextResponse.json(
                {
                    error: "El token ha expirado. Por favor solicita uno nuevo.",
                },
                { status: 400 }
            );
        }

        // Verificar el email
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationToken: null,
                tokenExpiry: null,
            },
        });

        return NextResponse.json(
            {
                message: "Email verificado exitosamente",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    emailVerified: true,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al verificar email:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// Endpoint para reenviar el código de verificación
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "El email es obligatorio" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { message: "Este email ya ha sido verificado" },
                { status: 200 }
            );
        }

        // Generar nuevo token
        const { generateVerificationToken, sendVerificationEmail } =
            await import("@/lib/email");
        const newToken = generateVerificationToken();
        const tokenExpiry = new Date();
        tokenExpiry.setHours(tokenExpiry.getHours() + 24);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationToken: newToken,
                tokenExpiry,
            },
        });

        // Reenviar email
        await sendVerificationEmail(email, newToken, user.name);

        return NextResponse.json(
            { message: "Código de verificación reenviado exitosamente" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al reenviar código:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
