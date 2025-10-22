"use client";

import Link from "next/link";
import { FiCode } from "react-icons/fi";

interface ExerciseCardProps {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    languageId: string;
    order: number;
}

const difficultyConfig = {
    EASY: {
        label: "Fácil",
        color: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/30",
    },
    MEDIUM: {
        label: "Medio",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/30",
    },
    HARD: {
        label: "Difícil",
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        borderColor: "border-red-400/30",
    },
};

export default function ExerciseCard({
    id,
    title,
    description,
    difficulty,
    languageId,
    order,
}: ExerciseCardProps) {
    const config = difficultyConfig[difficulty];

    return (
        <Link href={`/languages/${languageId}/${id}`}>
            <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-[#00ff9d]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff9d]/10 cursor-pointer">
                {/* Badge de dificultad */}
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border mb-4`}
                >
                    <span className={`text-xs font-semibold ${config.color}`}>
                        {config.label}
                    </span>
                </div>

                {/* Número del ejercicio */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00ff9d]/10 text-[#00ff9d] text-sm font-bold">
                            {order}
                        </div>
                        <FiCode className="text-[#00ff9d] text-xl" />
                    </div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff9d] transition-colors">
                    {title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">
                        Haz clic para comenzar
                    </span>
                    <div className="text-[#00ff9d] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                    </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00ff9d]/0 to-[#00ff9d]/0 group-hover:from-[#00ff9d]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </div>
        </Link>
    );
}
