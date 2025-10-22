"use client";

import { FiBook, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface ExerciseStatementProps {
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function ExerciseStatement({
    description,
    difficulty,
}: ExerciseStatementProps) {
    const getDifficultyConfig = (diff: string) => {
        switch (diff) {
            case "EASY":
                return {
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                    border: "border-green-500/30",
                    icon: FiCheckCircle,
                    text: "Fácil",
                };
            case "MEDIUM":
                return {
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/30",
                    icon: FiAlertCircle,
                    text: "Medio",
                };
            case "HARD":
                return {
                    color: "text-red-500",
                    bg: "bg-red-500/10",
                    border: "border-red-500/30",
                    icon: FiAlertCircle,
                    text: "Difícil",
                };
            default:
                return {
                    color: "text-gray-500",
                    bg: "bg-gray-500/10",
                    border: "border-gray-500/30",
                    icon: FiBook,
                    text: diff,
                };
        }
    };

    const config = getDifficultyConfig(difficulty);
    const Icon = config.icon;

    return (
        <div className="h-[calc(100vh-305px)] flex flex-col">
            {/* Statement Header */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-t-lg px-4 py-3 flex items-center gap-2">
                <FiBook className="text-[#00ff9d]" size={20} />
                <span className="text-sm font-semibold text-gray-300">
                    Enunciado del Ejercicio
                </span>
            </div>

            {/* Statement Content */}
            <div className="flex-1 bg-[#0d0d0d] border-l border-r border-b border-gray-800 rounded-b-lg p-6 overflow-y-auto custom-scrollbar">
                {/* Difficulty Badge */}
                <div className="mb-6">
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} border ${config.border}`}
                    >
                        <Icon className={config.color} size={16} />
                        <span
                            className={`text-sm font-semibold ${config.color}`}
                        >
                            Nivel: {config.text}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                    <div
                        className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: formatDescription(description),
                        }}
                    />
                </div>

                {/* Example Section (si existe en la descripción) */}
                {description.includes("Ejemplo") && (
                    <div className="mt-6 p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg">
                        <h3 className="text-[#00ff9d] font-semibold mb-2 flex items-center gap-2">
                            <span>📝</span>
                            <span>Ejemplos</span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Revisa los ejemplos en el enunciado para entender
                            mejor el problema.
                        </p>
                    </div>
                )}

                {/* Tips Section */}
                <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                        <span>💡</span>
                        <span>Consejos</span>
                    </h3>
                    <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                        <li>Lee cuidadosamente el enunciado</li>
                        <li>Planifica tu solución antes de codificar</li>
                        <li>Optimiza tu solución si es posible</li>
                    </ul>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #0d0d0d;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #444;
                }
            `}</style>
        </div>
    );
}

// Función auxiliar para formatear la descripción con HTML básico
function formatDescription(description: string): string {
    return description
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\n/g, "<br />")
        .replace(
            /`(.*?)`/g,
            '<code class="bg-gray-800 px-2 py-1 rounded text-[#00ff9d] text-sm">$1</code>'
        );
}
