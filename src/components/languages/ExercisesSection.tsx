"use client";

import ExerciseCard from "./ExerciseCard";

interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    order: number;
}

interface ExercisesSectionProps {
    exercises: Exercise[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    languageId: string;
    title: string;
    description: string;
    accentColor?: string;
}

const difficultyColors = {
    EASY: {
        accent: "text-green-400",
        border: "border-green-400/30",
        bg: "bg-green-400/5",
    },
    MEDIUM: {
        accent: "text-yellow-400",
        border: "border-yellow-400/30",
        bg: "bg-yellow-400/5",
    },
    HARD: {
        accent: "text-red-400",
        border: "border-red-400/30",
        bg: "bg-red-400/5",
    },
};

export default function ExercisesSection({
    exercises,
    difficulty,
    languageId,
    title,
    description,
    accentColor = "#00ff9d",
}: ExercisesSectionProps) {
    const colors = difficultyColors[difficulty];

    if (exercises.length === 0) {
        return null;
    }

    return (
        <section className="mb-16">
            {/* Header de la sección */}
            <div
                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 mb-8`}
            >
                <div className="flex items-center gap-4 mb-2">
                    <div
                        className={`w-2 h-12 ${colors.bg} rounded-full`}
                        style={{ backgroundColor: accentColor }}
                    />
                    <div>
                        <h2 className={`text-3xl font-bold ${colors.accent}`}>
                            {title}
                        </h2>
                        <p className="text-gray-400 mt-1">
                            {description} • {exercises.length}{" "}
                            {exercises.length === 1
                                ? "ejercicio"
                                : "ejercicios"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de ejercicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        id={exercise.id}
                        title={exercise.title}
                        description={exercise.description}
                        difficulty={exercise.difficulty}
                        languageId={languageId}
                        order={exercise.order}
                    />
                ))}
            </div>
        </section>
    );
}
