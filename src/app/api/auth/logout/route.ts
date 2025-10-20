import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export async function POST() {
    try {
        await removeAuthCookie();

        return NextResponse.json(
            {
                success: true,
                message: "Sesión cerrada exitosamente",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
