"use client";

import { FiBook, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
                <div className="prose prose-invert max-w-none markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {description || "Sin enunciado disponible"}
                    </ReactMarkdown>
                </div>

                {/* Example Section (si existe en la descripción) */}
                {description && description.includes("Ejemplo") && (
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

            <style jsx global>{`
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

                /* Estilos para el contenido markdown */
                .markdown-content {
                    color: #d1d5db;
                    line-height: 1.75;
                }

                .markdown-content h2 {
                    color: #00ff9d;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }

                .markdown-content h3 {
                    color: #00ff9d;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                }

                .markdown-content p {
                    margin-bottom: 1rem;
                    color: #d1d5db;
                }

                .markdown-content code {
                    background-color: #1a1a1a;
                    color: #00ff9d;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    font-family: "Courier New", monospace;
                }

                .markdown-content pre {
                    background-color: #0d0d0d;
                    border: 1px solid #333;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                }

                .markdown-content pre code {
                    background-color: transparent;
                    padding: 0;
                    color: #d1d5db;
                }

                .markdown-content ul {
                    list-style: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }

                .markdown-content li {
                    margin-bottom: 0.5rem;
                    color: #d1d5db;
                }

                .markdown-content strong {
                    color: white;
                    font-weight: 700;
                }

                .markdown-content blockquote {
                    border-left: 4px solid #00ff9d;
                    padding-left: 1rem;
                    color: #9ca3af;
                    font-style: italic;
                    margin: 1rem 0;
                }
            `}</style>
        </div>
    );
}
