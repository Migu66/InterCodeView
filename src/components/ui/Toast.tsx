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
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = {
        success: "from-green-500/90 to-green-600/90",
        error: "from-red-500/90 to-red-600/90",
        info: "from-blue-500/90 to-blue-600/90",
        warning: "from-yellow-500/90 to-yellow-600/90",
    };

    const icon = {
        success: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
        ),
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
            <div
                className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl backdrop-blur-xl bg-gradient-to-r ${bgColor[type]} text-white min-w-[320px] max-w-md border border-white/20`}
            >
                <div className="flex-shrink-0">{icon[type]}</div>
                <p className="flex-1 font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
