import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail, generateVerificationToken } from "@/lib/email";
import { generateToken, setAuthCookie } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, password, rememberMe } = await req.json();

        // Validar que se proporcionen email y contraseña
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Buscar el usuario por email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Verificar si el usuario existe
        if (!user) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // Verificar que el usuario tenga contraseña (no sea OAuth)
        if (!user.password) {
            return NextResponse.json(
                {
                    error: "Esta cuenta usa inicio de sesión con proveedor externo",
                },
                { status: 401 }
            );
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // Verificar si el email está verificado
        if (!user.emailVerified) {
            // Generar un nuevo token de verificación
            const verificationToken = generateVerificationToken();
            const tokenExpiry = new Date();
            tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token válido por 24 horas

            // Actualizar el usuario con el nuevo token
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    verificationToken,
                    tokenExpiry,
                },
            });

            // Enviar el email de verificación
            await sendVerificationEmail(email, verificationToken, user.name);

            // Retornar respuesta indicando que el email no está verificado
            return NextResponse.json(
                {
                    error: "Email no verificado",
                    message:
                        "Tu cuenta aún no ha sido verificada. Te hemos enviado un nuevo código de verificación.",
                    requiresVerification: true,
                    email: email,
                },
                { status: 403 }
            );
        }

        // Si todo está bien, crear token y establecer cookie
        const token = generateToken(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
            },
            rememberMe
        );

        await setAuthCookie(token, rememberMe);

        return NextResponse.json(
            {
                success: true,
                message: "Inicio de sesión exitoso",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
