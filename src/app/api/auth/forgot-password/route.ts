import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { sendPasswordResetEmail, generateVerificationToken } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validar que el email esté presente
        if (!email) {
            return NextResponse.json(
                { error: "El email es requerido" },
                { status: 400 }
            );
        }

        // Buscar el usuario por email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Por seguridad, siempre devolvemos el mismo mensaje
        // para no revelar si el email existe o no
        if (!user) {
            return NextResponse.json(
                {
                    message:
                        "Si el email existe en nuestro sistema, recibirás un correo con instrucciones.",
                },
                { status: 200 }
            );
        }

        // Generar token de reset
        const resetToken = generateVerificationToken();
        const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        // Guardar el token en la base de datos
        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpiry: resetExpiry,
            },
        });

        // Enviar email con el token
        const emailResult = await sendPasswordResetEmail(
            email,
            resetToken,
            user.name
        );

        if (!emailResult.success) {
            return NextResponse.json(
                {
                    error: "Error al enviar el correo. Por favor, intenta de nuevo.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message:
                    "Si el email existe en nuestro sistema, recibirás un correo con instrucciones.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en forgot-password:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
