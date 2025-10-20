"use client";

import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: () => void;
    duration?: number;
}

// Sistema de gestión de toasts global
let showToastFunction:
    | ((
          message: string,
          type?: "success" | "error" | "info" | "warning"
      ) => void)
    | null = null;

export function showToast(
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
) {
    if (showToastFunction) {
        showToastFunction(message, type);
    }
}

export function ToastContainer() {
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
    } | null>(null);

    useEffect(() => {
        showToastFunction = (
            message: string,
            type: "success" | "error" | "info" | "warning" = "success"
        ) => {
            setToast({ message, type });
        };

        return () => {
            showToastFunction = null;
        };
    }, []);

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
    );
}

export default function Toast({
    message,
    type = "success",
    onClose,
    duration = 3000,
}: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose();
        }, 300); // Duración de la animación de salida
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration]);

    const bgColor = {
        success: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600",
        error: "bg-gradient-to-br from-red-500 via-rose-500 to-pink-600",
        info: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600",
        warning:
            "bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-600",
    };

    const accentColor = {
        success: "bg-emerald-400/30",
        error: "bg-red-400/30",
        info: "bg-blue-400/30",
        warning: "bg-amber-400/30",
    };

    const icon = {
        success: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        ),
        error: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        ),
        info: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        warning: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        ),
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 ${isExiting ? "animate-slide-out-right" : "animate-slide-in-right"}`}
        >
            <div
                className={`relative flex items-start gap-4 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-2xl ${bgColor[type]} text-white min-w-[340px] max-w-md border border-white/30 overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
            >
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Patrón de fondo decorativo */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>
                </div>

                {/* Barra de progreso */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
                    <div
                        className="h-full bg-white/60 animate-progress"
                        style={{ animationDuration: `${duration}ms` }}
                    ></div>
                </div>

                {/* Icono con animación */}
                <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${accentColor[type]} flex items-center justify-center backdrop-blur-sm animate-bounce-subtle relative z-10`}
                >
                    {icon[type]}
                </div>

                {/* Contenido del mensaje */}
                <div className="flex-1 pt-1 relative z-10">
                    <p className="font-semibold text-base leading-tight tracking-wide drop-shadow-lg">
                        {message}
                    </p>
                </div>

                {/* Botón de cerrar mejorado */}
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 hover:bg-white/20 active:bg-white/30 rounded-full p-1.5 transition-all duration-200 hover:rotate-90 relative z-10 mt-0.5"
                    aria-label="Cerrar notificación"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
