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

// Aviso de consola: panel plano con canal codificado por color.
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

    const channel = {
        success: { label: "OK", color: "#ffb000" },
        error: { label: "FALLO", color: "#ff3d00" },
        info: { label: "INFO", color: "#eae0cc" },
        warning: { label: "AVISO", color: "#ff3d00" },
    }[type];

    return (
        <div
            className={`fixed right-4 top-4 z-[90] ${isExiting ? "animate-slide-out-right" : "animate-slide-in-right"}`}
            style={{
                fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
            }}
        >
            <div
                className="relative flex min-w-[320px] max-w-md items-start gap-4 overflow-hidden border border-[rgba(234,224,204,0.16)] bg-[#16110a] px-5 py-4"
                style={{ borderLeft: `3px solid ${channel.color}` }}
            >
                {/* Canal */}
                <span
                    className="icv-blink mt-0.5 text-[0.6rem] tracking-[0.24em]"
                    style={{
                        color: channel.color,
                        animation: "icv-blink 1.2s steps(1) infinite",
                    }}
                >
                    ▮ {channel.label}
                </span>

                {/* Mensaje */}
                <p className="flex-1 text-xs leading-relaxed tracking-[0.04em] text-[#eae0cc]">
                    {message}
                </p>

                {/* Cerrar */}
                <button
                    onClick={handleClose}
                    className="text-[0.65rem] tracking-[0.2em] text-[#97896d] transition-colors duration-200 hover:text-[#ffb000]"
                    aria-label="Cerrar notificación"
                >
                    [X]
                </button>

                {/* Barra de tiempo restante */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgba(234,224,204,0.1)]">
                    <div
                        className="animate-progress h-full"
                        style={{
                            animationDuration: `${duration}ms`,
                            backgroundColor: channel.color,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
