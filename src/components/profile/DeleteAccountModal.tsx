"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password?: string) => void;
    onVerifyPassword?: (password: string) => Promise<boolean>;
    hasPassword: boolean;
    isClosing: boolean;
}

export default function DeleteAccountModal({
    isOpen,
    onClose,
    onConfirm,
    onVerifyPassword,
    hasPassword,
    isClosing,
}: DeleteAccountModalProps) {
    const [password, setPassword] = useState("");
    const [confirmationText, setConfirmationText] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        if (hasPassword && onVerifyPassword) {
            setIsVerifying(true);
            try {
                const isValid = await onVerifyPassword(password);
                if (!isValid) {
                    setPasswordError("Contraseña incorrecta");
                    setIsVerifying(false);
                    return;
                }
            } catch {
                setPasswordError("Error al verificar la contraseña");
                setIsVerifying(false);
                return;
            }
            setIsVerifying(false);
        }

        onConfirm(password);
    };

    const handleConfirmationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm();
    };

    if (!isOpen || typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(5px)",
                animation: isClosing
                    ? "fadeOut 0.2s ease-out"
                    : "fadeIn 0.3s ease-out",
            }}
        >
            <div
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20 relative"
                style={{
                    animation: isClosing
                        ? "scaleOut 0.2s ease-out"
                        : "scaleIn 0.3s ease-out",
                }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-400">
                        Verificación requerida
                    </h3>
                </div>

                {hasPassword ? (
                    // Usuario con contraseña: pedir contraseña
                    <>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Para eliminar tu cuenta, primero debes confirmar tu
                            identidad ingresando tu contraseña.
                        </p>

                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-6">
                                <label className="text-red-400 text-sm font-semibold uppercase tracking-wide mb-2 block">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError("");
                                    }}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full px-5 py-3 bg-black/50 border-2 border-red-500/30 rounded-xl focus:outline-none focus:border-red-500 transition-all duration-300 font-medium focus:shadow-lg focus:shadow-red-500/20 text-white"
                                    autoFocus
                                    required
                                    disabled={isVerifying}
                                />
                                {passwordError && (
                                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={!password || isVerifying}
                                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isVerifying ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        </>
                                    ) : (
                                        "Continuar"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-transparent border-2 border-gray-500 text-gray-300 font-bold rounded-lg hover:bg-gray-500/10 transition-all duration-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    // Usuario OAuth sin contraseña: pedir escribir "ELIMINAR"
                    <>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Para confirmar la eliminación de tu cuenta, escribe{" "}
                            <strong className="text-red-400">ELIMINAR</strong>{" "}
                            en el campo de abajo.
                        </p>
                        <p className="text-gray-400 text-sm mb-6">
                            Esta acción es permanente y eliminará todos tus
                            datos.
                        </p>

                        <form onSubmit={handleConfirmationSubmit}>
                            <div className="mb-6">
                                <label className="text-red-400 text-sm font-semibold uppercase tracking-wide mb-2 block">
                                    Escribe &quot;ELIMINAR&quot; para confirmar
                                </label>
                                <input
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) =>
                                        setConfirmationText(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    placeholder="ELIMINAR"
                                    className="w-full px-5 py-3 bg-black/50 border-2 border-red-500/30 rounded-xl focus:outline-none focus:border-red-500 transition-all duration-300 font-medium focus:shadow-lg focus:shadow-red-500/20 text-white"
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={confirmationText !== "ELIMINAR"}
                                    className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Continuar
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-transparent border-2 border-gray-500 text-gray-300 font-bold rounded-lg hover:bg-gray-500/10 transition-all duration-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
