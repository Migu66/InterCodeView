"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiStar, FiTrendingUp } from "react-icons/fi";

interface SuccessAnimationProps {
    onComplete?: () => void;
    score?: number;
}

export default function SuccessAnimation({
    onComplete,
    score = 100,
}: SuccessAnimationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Ocultar después de 4 segundos
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
                onComplete();
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative">
                {/* Círculos de fondo animados */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-[#00ff9d]/10 animate-ping"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-48 h-48 rounded-full bg-[#00ff9d]/20 animate-ping"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>

                {/* Contenido principal */}
                <div className="relative bg-[#1a1a1a] border-2 border-[#00ff9d] rounded-2xl p-12 shadow-2xl animate-scaleIn">
                    {/* Ícono de éxito */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-[#00ff9d]/20 flex items-center justify-center animate-pulse">
                                <FiCheck
                                    size={48}
                                    className="text-[#00ff9d]"
                                    strokeWidth={3}
                                />
                            </div>
                            {/* Estrellas decorativas */}
                            <FiStar
                                className="absolute -top-2 -right-2 text-yellow-400 animate-bounce"
                                size={24}
                            />
                            <FiStar
                                className="absolute -bottom-2 -left-2 text-yellow-400 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                                size={20}
                            />
                            <FiStar
                                className="absolute top-0 -left-4 text-yellow-400 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                                size={16}
                            />
                        </div>
                    </div>

                    {/* Texto principal */}
                    <h2 className="text-4xl font-bold text-center mb-4 text-white animate-slideUp">
                        ¡Está Perfecto!
                    </h2>

                    <p
                        className="text-center text-gray-300 text-lg mb-6 animate-slideUp"
                        style={{ animationDelay: "0.1s" }}
                    >
                        Has resuelto el ejercicio correctamente
                    </p>

                    {/* Score */}
                    <div
                        className="flex items-center justify-center gap-3 text-[#00ff9d] animate-slideUp"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <FiTrendingUp size={24} />
                        <span className="text-3xl font-bold">{score}</span>
                        <span className="text-xl text-gray-400">/100</span>
                    </div>

                    {/* Confeti visual */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-[#00ff9d] rounded-full animate-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: "-10px",
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    animationDuration: `${2 + Math.random()}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotateZ(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(600px) rotateZ(720deg);
                        opacity: 0;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-slideUp {
                    animation: slideUp 0.5s ease-out;
                }

                .animate-confetti {
                    animation: confetti linear infinite;
                }
            `}</style>
        </div>
    );
}
