import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const languages = await prisma.language.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json(languages);
    } catch (error) {
        console.error("Error al obtener lenguajes:", error);
        return NextResponse.json(
            { error: "Error al obtener lenguajes" },
            { status: 500 }
        );
    }
}
