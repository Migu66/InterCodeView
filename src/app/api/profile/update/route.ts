import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function PUT(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token");

        if (!token) {
            return NextResponse.json(
                { message: "No autenticado" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
            id: string;
        };

        const { name, currentPassword, newPassword } = await request.json();

        // Validaciones
        if (!name || name.trim().length === 0) {
            return NextResponse.json(
                { message: "El nombre es requerido" },
                { status: 400 }
            );
        }

        if (name.length > 50) {
            return NextResponse.json(
                { message: "El nombre no puede tener más de 50 caracteres" },
                { status: 400 }
            );
        }

        // Obtener el usuario actual
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Si se quiere cambiar la contraseña
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    {
                        message:
                            "La contraseña actual es requerida para cambiarla",
                    },
                    { status: 400 }
                );
            }

            // Verificar contraseña actual
            const isPasswordValid = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isPasswordValid) {
                return NextResponse.json(
                    { message: "La contraseña actual es incorrecta" },
                    { status: 400 }
                );
            }

            // Validar nueva contraseña
            if (newPassword.length < 8) {
                return NextResponse.json(
                    {
                        message:
                            "La nueva contraseña debe tener al menos 8 caracteres",
                    },
                    { status: 400 }
                );
            }

            // Hash de la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Actualizar usuario con nueva contraseña
            const updatedUser = await prisma.user.update({
                where: { id: decoded.id },
                data: {
                    name,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                },
            });

            // Generar nuevo token con los datos actualizados
            const newToken = generateToken({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatarUrl: updatedUser.avatarUrl,
            });
            await setAuthCookie(newToken);

            return NextResponse.json({
                message: "Perfil y contraseña actualizados correctamente",
                user: updatedUser,
            });
        }

        // Solo actualizar el nombre
        const updatedUser = await prisma.user.update({
            where: { id: decoded.id },
            data: { name },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
            },
        });

        // Generar nuevo token con los datos actualizados
        const newToken = generateToken({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatarUrl: updatedUser.avatarUrl,
        });
        await setAuthCookie(newToken);

        return NextResponse.json({
            message: "Perfil actualizado correctamente",
            user: updatedUser,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error al actualizar perfil",
                error:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            },
            { status: 500 }
        );
    }
}
