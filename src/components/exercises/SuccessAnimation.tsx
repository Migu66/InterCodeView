"use client";

import { useEffect, useState } from "react";
import Corners from "@/components/landing/Corners";

interface SuccessAnimationProps {
    onComplete?: () => void;
    score?: number;
}

// Sello de misión cumplida: overlay carbón + estampado APTO
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
        <div className="icv-success-overlay fixed inset-0 z-[75] flex items-center justify-center bg-[#0f0c08]/90 px-4">
            <div className="icv-panel icv-success-panel w-full max-w-md p-10 text-center">
                <Corners />

                <p className="icv-label mb-8">
                    TRANSMISIÓN DEL AUDITOR — VEREDICTO FINAL
                </p>

                {/* Sello estampado */}
                <span className="icv-stamp icv-success-stamp inline-block text-[clamp(2.4rem,8vw,4rem)] text-[#ffb000]">
                    APTO
                </span>

                <p className="icv-display mt-8 text-lg text-[#eae0cc]">
                    Misión cumplida.
                </p>
                <p className="mt-3 text-xs leading-relaxed tracking-[0.06em] text-[#97896d]">
                    Ejercicio superado sin observaciones del auditor.
                </p>

                {/* Lectura de puntuación */}
                <dl className="mt-8 flex items-baseline justify-center gap-3">
                    <dd className="icv-display text-4xl text-[#ffb000]">
                        {score}
                    </dd>
                    <dt className="icv-label">/ 100 PUNTOS</dt>
                </dl>

                <p className="icv-label icv-blink mt-8 !text-[#ffb000]">
                    ▮ REGISTRANDO EN EL EXPEDIENTE
                </p>
            </div>

            <style jsx>{`
                .icv-success-overlay {
                    animation: icv-success-fade 0.3s ease-out;
                }

                .icv-success-panel {
                    animation: icv-success-pop 0.5s
                        cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .icv-success-stamp {
                    animation: icv-success-stamp 0.45s
                        cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s backwards;
                }

                @keyframes icv-success-fade {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes icv-success-pop {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes icv-success-stamp {
                    from {
                        transform: rotate(-14deg) scale(1.7);
                        opacity: 0;
                    }
                    to {
                        transform: rotate(-6deg) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
