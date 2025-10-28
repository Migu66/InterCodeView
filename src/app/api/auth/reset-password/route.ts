import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    // Aplicar rate limiting
    const rateLimit = await checkRateLimit(request, rateLimitConfigs.sensitive);

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

    try {
        const { token, newPassword } = await request.json();

        // Validaciones
        if (!token || !newPassword) {
            return NextResponse.json(
                { error: "Token y nueva contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Validar requisitos de contraseña
        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "La contraseña debe tener al menos 8 caracteres" },
                { status: 400 }
            );
        }

        if (!/[A-Z]/.test(newPassword)) {
            return NextResponse.json(
                {
                    error: "La contraseña debe contener al menos una mayúscula",
                },
                { status: 400 }
            );
        }

        if (!/[a-z]/.test(newPassword)) {
            return NextResponse.json(
                {
                    error: "La contraseña debe contener al menos una minúscula",
                },
                { status: 400 }
            );
        }

        if (!/[0-9]/.test(newPassword)) {
            return NextResponse.json(
                { error: "La contraseña debe contener al menos un número" },
                { status: 400 }
            );
        }

        // Buscar usuario con el token de reset
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gte: new Date(), // El token no debe haber expirado
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    error: "Token inválido o expirado. Por favor, solicita un nuevo código.",
                },
                { status: 400 }
            );
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña y limpiar los tokens de reset
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json(
            {
                message:
                    "Contraseña restablecida exitosamente. Ya puedes iniciar sesión.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en reset-password:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
