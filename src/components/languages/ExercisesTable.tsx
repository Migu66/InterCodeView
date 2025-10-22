"use client";

import Link from "next/link";
import { FiCode, FiTrendingUp, FiZap } from "react-icons/fi";
import { FaCircle } from "react-icons/fa6";

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

const difficultyConfig = {
    EASY: {
        label: "Fácil",
        icon: FaCircle,
        color: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/30",
        hoverBg: "hover:bg-green-400/5",
    },
    MEDIUM: {
        label: "Medio",
        icon: FiTrendingUp,
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/30",
        hoverBg: "hover:bg-yellow-400/5",
    },
    HARD: {
        label: "Difícil",
        icon: FiZap,
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        borderColor: "border-red-400/30",
        hoverBg: "hover:bg-red-400/5",
    },
};

export default function ExercisesTable({
    exercises,
    difficulty,
    languageId,
    title,
    description,
    accentColor = "#00ff9d",
}: ExercisesTableProps) {
    const config = difficultyConfig[difficulty];
    const DifficultyIcon = config.icon;

    if (exercises.length === 0) {
        return null;
    }

    return (
        <section className="mb-16">
            {/* Header de la sección */}
            <div
                className={`${config.bgColor} ${config.borderColor} border rounded-2xl p-6 mb-6`}
            >
                <div className="flex items-center gap-4 mb-2">
                    <div
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />
                    <div>
                        <div className="flex items-center gap-3">
                            <DifficultyIcon
                                className={`text-2xl ${config.color}`}
                            />
                            <h2
                                className={`text-3xl font-bold ${config.color}`}
                            >
                                {title}
                            </h2>
                        </div>
                        <p className="text-gray-400 mt-1 text-sm">
                            {description} • {exercises.length}{" "}
                            {exercises.length === 1
                                ? "ejercicio"
                                : "ejercicios"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabla de ejercicios */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 w-20">
                                    #
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">
                                    Ejercicio
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 hidden md:table-cell">
                                    Descripción
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 w-32">
                                    Nivel
                                </th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400 w-32">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise) => (
                                <tr
                                    key={exercise.id}
                                    className={`border-b border-white/5 ${config.hoverBg} transition-colors group`}
                                >
                                    {/* Número */}
                                    <td className="py-4 px-6">
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-lg ${config.bgColor} ${config.color} text-sm font-bold`}
                                        >
                                            {exercise.order}
                                        </div>
                                    </td>

                                    {/* Título */}
                                    <td className="py-4 px-6">
                                        <Link
                                            href={`/languages/${languageId}/${exercise.id}`}
                                            className="block"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FiCode
                                                    className={`${config.color} text-lg flex-shrink-0`}
                                                />
                                                <span
                                                    className={`font-semibold text-white group-hover:${config.color} transition-colors`}
                                                >
                                                    {exercise.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </td>

                                    {/* Descripción (oculta en móvil) */}
                                    <td className="py-4 px-6 hidden md:table-cell">
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {exercise.description}
                                        </p>
                                    </td>

                                    {/* Badge de nivel */}
                                    <td className="py-4 px-6">
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}
                                        >
                                            <span
                                                className={`text-xs font-semibold ${config.color}`}
                                            >
                                                {config.label}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Botón */}
                                    <td className="py-4 px-6 text-right">
                                        <Link
                                            href={`/languages/${languageId}/${exercise.id}`}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bgColor} ${config.borderColor} border ${config.color} hover:border-current transition-all text-sm font-medium`}
                                        >
                                            <span className="hidden sm:inline">
                                                Resolver
                                            </span>
                                            <span className="sm:hidden">→</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
