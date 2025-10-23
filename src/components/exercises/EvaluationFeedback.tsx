"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiXCircle } from "react-icons/fi";

interface EvaluationFeedbackProps {
    status: "perfect" | "good" | "needs_improvement";
    message: string;
    score: number;
    feedback: string;
    suggestions?: string[];
}

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

    const getStatusIcon = () => {
        switch (status) {
            case "perfect":
                return <FiCheckCircle className="text-green-500" size={32} />;
            case "good":
                return <FiAlertCircle className="text-yellow-500" size={32} />;
            case "needs_improvement":
                return <FiXCircle className="text-red-500" size={32} />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "perfect":
                return "border-green-500/50 bg-green-500/5";
            case "good":
                return "border-yellow-500/50 bg-yellow-500/5";
            case "needs_improvement":
                return "border-red-500/50 bg-red-500/5";
        }
    };

    const getScoreColor = () => {
        if (score >= 90) return "text-green-500";
        if (score >= 70) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div
            className={`border-2 rounded-lg p-6 ${getStatusColor()} transition-all duration-300 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
            }`}
            style={{
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getStatusIcon()}
                    <h3 className="text-xl font-bold text-white">{message}</h3>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor()}`}>
                        {score}
                    </div>
                    <div className="text-sm text-gray-400">de 100</div>
                </div>
            </div>

            {/* Feedback */}
            <div className="mb-4">
                <div className="text-gray-300 whitespace-pre-line space-y-3">
                    {feedback.split("\n\n").map((paragraph, index) => {
                        // Detectar secciones con **texto** para negritas
                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                        return (
                            <p key={index} className="leading-relaxed">
                                {parts.map((part, i) => {
                                    if (
                                        part.startsWith("**") &&
                                        part.endsWith("**")
                                    ) {
                                        // Texto en negrita
                                        return (
                                            <strong
                                                key={i}
                                                className="text-white font-semibold"
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
