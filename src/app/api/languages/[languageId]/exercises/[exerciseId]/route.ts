import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ languageId: string; exerciseId: string }> }
) {
    try {
        const { languageId, exerciseId } = await params;

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

        // Obtener el ejercicio
        const exercise = await prisma.exercise.findFirst({
            where: {
                id: exerciseId,
                languageId: language.id,
                isActive: true,
            },
        });

        if (!exercise) {
            return NextResponse.json(
                { error: "Ejercicio no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(exercise);
    } catch (error) {
        console.error("Error al obtener el ejercicio:", error);
        return NextResponse.json(
            { error: "Error al obtener el ejercicio" },
            { status: 500 }
        );
    }
}
