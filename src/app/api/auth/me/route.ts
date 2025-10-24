import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { auth } from "@/lib/auth-next";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Primero intentar obtener la sesión de NextAuth
        const session = await auth();

        if (session?.user) {
            // Usuario autenticado con NextAuth (OAuth)
            const dbUser = await prisma.user.findUnique({
                where: { email: session.user.email as string },
            });

            if (!dbUser) {
                return NextResponse.json(
                    { error: "Usuario no encontrado" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                {
                    success: true,
                    user: {
                        id: dbUser.id,
                        name: dbUser.name,
                        email: dbUser.email,
                        avatarUrl: dbUser.avatarUrl,
                        provider: dbUser.provider,
                        hasPassword: !!dbUser.password,
                    },
                },
                { status: 200 }
            );
        }

        // Si no hay sesión de NextAuth, intentar con el método tradicional (JWT)
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        // Obtener información completa del usuario de la base de datos
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                    provider: dbUser?.provider || "credentials",
                    hasPassword: !!dbUser?.password,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al verificar usuario:", error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
