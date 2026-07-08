"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ExerciseStatementProps {
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
}

// Dificultad → señal (hueso / ámbar / rojo)
const difficultyConfig = {
    EASY: { tag: "FÁCIL", color: "#eae0cc" },
    MEDIUM: { tag: "MEDIO", color: "#ffb000" },
    HARD: { tag: "DIFÍCIL", color: "#ff3d00" },
};

export default function ExerciseStatement({
    description,
    difficulty,
}: ExerciseStatementProps) {
    const config = difficultyConfig[difficulty] ?? {
        tag: difficulty,
        color: "#97896d",
    };

    return (
        <div className="flex h-[calc(100vh-305px)] min-h-[400px] flex-col">
            {/* Cabecera del plan de vuelo */}
            <div className="flex items-center justify-between border border-[rgba(234,224,204,0.16)] bg-[#16110a] px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className="icv-blink h-2 w-2 bg-[#ffb000]" />
                    <span className="icv-label !text-[#eae0cc]">
                        PLAN DE VUELO — ENUNCIADO
                    </span>
                </div>
                <span
                    className="text-[0.65rem] tracking-[0.2em]"
                    style={{ color: config.color }}
                >
                    [{config.tag}]
                </span>
            </div>

            {/* Contenido */}
            <div className="icv-terminal icv-scroll flex-1 overflow-y-auto border-t-0 p-6">
                <div className="icv-md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {description || "Sin enunciado disponible"}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
