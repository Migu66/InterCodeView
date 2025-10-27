import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth-next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
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

        const { password } = await request.json();

        if (!password) {
            return NextResponse.json(
                { message: "La contraseña es requerida" },
                { status: 400 }
            );
        }

        // Obtener el usuario
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                { message: "Usuario no encontrado o sin contraseña" },
                { status: 404 }
            );
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        return NextResponse.json({ valid: isPasswordValid }, { status: 200 });
    } catch (error) {
        console.error("Error al verificar contraseña:", error);
        return NextResponse.json(
            { message: "Error al verificar la contraseña" },
            { status: 500 }
        );
    }
}
