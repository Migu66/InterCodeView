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

        // Obtener los ejercicios del lenguaje agrupados por dificultad
        const exercises = await prisma.exercise.findMany({
            where: {
                languageId: language.id,
                isActive: true,
            },
            orderBy: [{ difficulty: "asc" }, { order: "asc" }],
        });

        // Agrupar ejercicios por dificultad
        const groupedExercises = {
            easy: exercises.filter((ex) => ex.difficulty === "EASY"),
            medium: exercises.filter((ex) => ex.difficulty === "MEDIUM"),
            hard: exercises.filter((ex) => ex.difficulty === "HARD"),
        };

        return NextResponse.json({
            language,
            exercises: groupedExercises,
            total: exercises.length,
        });
    } catch (error) {
        console.error("Error al obtener ejercicios:", error);
        return NextResponse.json(
            { error: "Error al obtener los ejercicios" },
            { status: 500 }
        );
    }
}
