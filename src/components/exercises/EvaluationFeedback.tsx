"use client";

import { useEffect, useState } from "react";
import Corners from "@/components/landing/Corners";

interface EvaluationFeedbackProps {
    status: "perfect" | "good" | "needs_improvement";
    message: string;
    score: number;
    feedback: string;
    suggestions?: string[];
}

// Veredictos del auditor: sello + color de señal
const statusConfig = {
    perfect: { stamp: "APTO", color: "#ffb000" },
    good: { stamp: "CASI", color: "#eae0cc" },
    needs_improvement: { stamp: "REINTENTAR", color: "#ff3d00" },
};

export default function EvaluationFeedback({
    status,
    message,
    score,
    feedback,
}: EvaluationFeedbackProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Animación de entrada cuando el componente se monta
    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);
        return () => clearTimeout(timer);
    }, [status, message, score]); // Re-animar cuando cambian estos valores

    const config = statusConfig[status];

    const scoreColor =
        score >= 90 ? "#ffb000" : score >= 70 ? "#eae0cc" : "#ff3d00";

    return (
        <div
            className={`icv-panel p-6 transition-all md:p-8 ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
            }`}
            style={{
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            <Corners />

            {/* Cabecera del informe */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-6">
                <div>
                    <p className="icv-label mb-4">
                        INFORME DE AUDITORÍA — MOTOR IA
                        <span className="icv-blink ml-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                    </p>
                    <span
                        className="icv-stamp text-sm md:text-base"
                        style={{ color: config.color }}
                    >
                        {config.stamp}
                    </span>
                    <p className="mt-4 text-sm text-[#eae0cc]">{message}</p>
                </div>

                {/* Puntuación */}
                <div className="text-right">
                    <p
                        className="icv-display text-[clamp(2.6rem,6vw,4.5rem)] leading-none"
                        style={{ color: scoreColor }}
                    >
                        {score}
                    </p>
                    <p className="icv-label mt-1">/ 100 PUNTOS</p>
                </div>
            </div>

            {/* Transcripción del veredicto */}
            <div className="border-t border-[rgba(234,224,204,0.16)] pt-6">
                <div className="space-y-3 text-[0.8rem] leading-relaxed text-[#97896d]">
                    {feedback.split("\n\n").map((paragraph, index) => {
                        // Detectar secciones con **texto** para negritas
                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                        return (
                            <p key={index}>
                                {parts.map((part, i) => {
                                    if (
                                        part.startsWith("**") &&
                                        part.endsWith("**")
                                    ) {
                                        // Texto destacado
                                        return (
                                            <strong
                                                key={i}
                                                className="font-semibold text-[#eae0cc]"
                                            >
                                                {part.slice(2, -2)}
                                            </strong>
                                        );
                                    }
                                    return <span key={i}>{part}</span>;
                                })}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
