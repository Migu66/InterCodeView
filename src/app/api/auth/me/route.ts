import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getAuthUser();

        if (!user) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: true,
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
        console.error("Error al verificar usuario:", error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
