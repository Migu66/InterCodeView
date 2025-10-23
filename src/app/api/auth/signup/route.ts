import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validar que todos los campos estén presentes
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Todos los campos son obligatorios" },
                { status: 400 }
            );
        }

        // Validar longitud del nombre
        if (name.trim().length === 0) {
            return NextResponse.json(
                { error: "El nombre no puede estar vacío" },
                { status: 400 }
            );
        }

        if (name.length > 50) {
            return NextResponse.json(
                { error: "El nombre no puede tener más de 50 caracteres" },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "El formato del email no es válido" },
                { status: 400 }
            );
        }

        // Validar contraseña
        if (password.length < 8) {
            return NextResponse.json(
                { error: "La contraseña debe tener al menos 8 caracteres" },
                { status: 400 }
            );
        }

        // Validar que la contraseña contenga mayúsculas, minúsculas y números
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            return NextResponse.json(
                {
                    error: "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
                },
                { status: 400 }
            );
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Este email ya está registrado" },
                { status: 409 }
            );
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar token de verificación
        const verificationToken = generateVerificationToken();
        const tokenExpiry = new Date();
        tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Expira en 24 horas

        // Crear el usuario
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
                tokenExpiry,
                emailVerified: false,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        // Enviar email de verificación
        const emailResult = await sendVerificationEmail(
            email,
            verificationToken,
            name
        );

        if (!emailResult.success) {
			return NextResponse.json(
				{ error: "Error al enviar el email de verificación. Por favor, intenta de nuevo." },
				{ status: 500 }
			);
		}

        return NextResponse.json(
            {
                message:
                    "Usuario creado exitosamente. Por favor verifica tu email.",
                user,
                requiresVerification: true,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
