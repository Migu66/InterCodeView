import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ languageId: string }> }
) {
    try {
        const { languageId } = await params;

        // Buscar el lenguaje por ID o por slug
        const language = await prisma.language.findFirst({
            where: {
                OR: [{ id: languageId }, { slug: languageId }],
            },
        });

        if (!language) {
            return NextResponse.json(
                { error: "Lenguaje no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(language);
    } catch (error) {
        console.error("Error al obtener el lenguaje:", error);
        return NextResponse.json(
            { error: "Error al obtener el lenguaje" },
            { status: 500 }
        );
    }
}
