"use client";

import Link from "next/link";

interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    order: number;
}

interface ExercisesTableProps {
    exercises: Exercise[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    languageId: string;
    title: string;
    description: string;
    accentColor?: string;
}

// Mapa de dificultad → sección y color de señal (hueso / ámbar / rojo)
const difficultyConfig = {
    EASY: {
        section: "A",
        tag: "FÁCIL",
        color: "#eae0cc",
    },
    MEDIUM: {
        section: "B",
        tag: "MEDIO",
        color: "#ffb000",
    },
    HARD: {
        section: "C",
        tag: "DIFÍCIL",
        color: "#ff3d00",
    },
};

export default function ExercisesTable({
    exercises,
    difficulty,
    languageId,
    title,
    description,
}: ExercisesTableProps) {
    const config = difficultyConfig[difficulty];

    if (exercises.length === 0) {
        return null;
    }

    return (
        <section className="mb-20">
            {/* Cabecera de sección con letra gigante */}
            <div className="mb-6 flex items-end gap-6">
                <span
                    className="icv-display icv-outline text-[clamp(3rem,8vw,6rem)] leading-none"
                    aria-hidden="true"
                >
                    {config.section}
                </span>
                <div className="pb-2">
                    <h2
                        className="icv-display text-base tracking-[0.1em] md:text-xl"
                        style={{ color: config.color }}
                    >
                        SECCIÓN {config.section} — {title.toUpperCase()}
                    </h2>
                    <p className="icv-label mt-2">
                        {description.toUpperCase()} ·{" "}
                        {String(exercises.length).padStart(2, "0")}{" "}
                        {exercises.length === 1 ? "EJERCICIO" : "EJERCICIOS"}
                    </p>
                </div>
            </div>

            {/* Manifiesto */}
            <div className="overflow-x-auto border border-[rgba(234,224,204,0.16)]">
                <table className="w-full min-w-[560px] border-collapse">
                    <thead>
                        <tr className="border-b border-[rgba(234,224,204,0.16)] bg-[#16110a]">
                            <th className="icv-label w-24 px-5 py-3 text-left !text-[#97896d]">
                                REF
                            </th>
                            <th className="icv-label px-5 py-3 text-left !text-[#97896d]">
                                EJERCICIO
                            </th>
                            <th className="icv-label hidden px-5 py-3 text-left !text-[#97896d] lg:table-cell">
                                DESCRIPCIÓN
                            </th>
                            <th className="icv-label w-32 px-5 py-3 text-left !text-[#97896d]">
                                NIVEL
                            </th>
                            <th className="icv-label w-36 px-5 py-3 text-right !text-[#97896d]">
                                ACCIÓN
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr
                                key={exercise.id}
                                className="icv-mrow border-b border-[rgba(234,224,204,0.08)] last:border-b-0"
                            >
                                {/* Referencia */}
                                <td className="px-5 py-4 align-top">
                                    <span
                                        className="text-[0.7rem] tracking-[0.2em]"
                                        style={{ color: config.color }}
                                    >
                                        {config.section}-
                                        {String(exercise.order).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>
                                </td>

                                {/* Título */}
                                <td className="px-5 py-4 align-top">
                                    <Link
                                        href={`/languages/${languageId}/exercises/${exercise.id}`}
                                        className="text-sm text-[#eae0cc] transition-colors duration-300 hover:text-[#ffb000]"
                                        data-cursor-label="ABRIR"
                                    >
                                        {exercise.title}
                                    </Link>
                                </td>

                                {/* Descripción (oculta en pantallas pequeñas) */}
                                <td className="hidden px-5 py-4 align-top lg:table-cell">
                                    <p className="line-clamp-2 max-w-md text-[0.7rem] leading-relaxed tracking-[0.04em] text-[#97896d]">
                                        {exercise.description}
                                    </p>
                                </td>

                                {/* Nivel */}
                                <td className="px-5 py-4 align-top">
                                    <span
                                        className="text-[0.65rem] tracking-[0.2em]"
                                        style={{ color: config.color }}
                                    >
                                        [{config.tag}]
                                    </span>
                                </td>

                                {/* Acción */}
                                <td className="px-5 py-4 text-right align-top">
                                    <Link
                                        href={`/languages/${languageId}/exercises/${exercise.id}`}
                                        className="icv-link"
                                        data-cursor-label="RESOLVER"
                                    >
                                        RESOLVER →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
