"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Corners from "@/components/landing/Corners";
import ConsoleButton from "@/components/icv/ConsoleButton";

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
            className="icv fixed inset-0 z-[95] flex items-center justify-center p-4"
            style={{
                backgroundColor: "rgba(15, 12, 8, 0.85)",
                animation: isClosing
                    ? "fadeOut 0.2s ease-out"
                    : "fadeIn 0.3s ease-out",
            }}
        >
            <div
                className="icv-panel w-full max-w-md border-[#ff3d00]/50 bg-[#16110a] p-8"
                style={
                    {
                        animation: isClosing
                            ? "scaleOut 0.2s ease-out"
                            : "scaleIn 0.3s ease-out",
                        "--icv-amber": "#ff3d00",
                    } as React.CSSProperties
                }
            >
                <Corners />
                <p className="icv-label mb-2 !text-[#ff3d00]">
                    <span className="icv-blink mr-2">▮</span>
                    ZONA ROJA — VERIFICACIÓN REQUERIDA
                </p>
                <h3 className="icv-display mt-4 text-lg text-[#eae0cc]">
                    Confirma tu identidad.
                </h3>

                {hasPassword ? (
                    // Usuario con contraseña: pedir contraseña
                    <>
                        <p className="mt-4 text-xs leading-relaxed tracking-[0.04em] text-[#97896d]">
                            Para iniciar la expulsión debes confirmar tu
                            identidad introduciendo tu contraseña.
                        </p>

                        <form onSubmit={handlePasswordSubmit} className="mt-6">
                            <label className="icv-label mb-2 block">
                                CONTRASEÑA
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                placeholder="••••••••"
                                className={`icv-input ${passwordError ? "icv-input--error" : ""}`}
                                autoFocus
                                required
                                disabled={isVerifying}
                            />
                            {passwordError && (
                                <p className="mt-2 text-[0.65rem] tracking-[0.14em] text-[#ff3d00]">
                                    <span className="icv-blink mr-1">▮</span>
                                    {passwordError.toUpperCase()}
                                </p>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-6">
                                <ConsoleButton
                                    type="submit"
                                    disabled={!password || isVerifying}
                                    red
                                    label={
                                        isVerifying
                                            ? "Verificando…"
                                            : "Continuar →"
                                    }
                                    cursorLabel="SEGUIR"
                                    className="!px-6 !py-3 !text-[0.65rem]"
                                />
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="icv-link"
                                    data-cursor-label="ABORTAR"
                                >
                                    ABORTAR
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    // Usuario OAuth sin contraseña: pedir escribir "ELIMINAR"
                    <>
                        <p className="mt-4 text-xs leading-relaxed tracking-[0.04em] text-[#97896d]">
                            Para confirmar la expulsión escribe{" "}
                            <strong className="text-[#ff3d00]">
                                ELIMINAR
                            </strong>{" "}
                            en el campo de abajo. Esta acción es permanente y
                            destruirá todos tus datos.
                        </p>

                        <form
                            onSubmit={handleConfirmationSubmit}
                            className="mt-6"
                        >
                            <label className="icv-label mb-2 block">
                                ESCRIBE &quot;ELIMINAR&quot; PARA CONFIRMAR
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
                                className="icv-input"
                                autoFocus
                                required
                            />

                            <div className="mt-6 flex flex-wrap items-center gap-6">
                                <ConsoleButton
                                    type="submit"
                                    disabled={confirmationText !== "ELIMINAR"}
                                    red
                                    label="Continuar →"
                                    cursorLabel="SEGUIR"
                                    className="!px-6 !py-3 !text-[0.65rem]"
                                />
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="icv-link"
                                    data-cursor-label="ABORTAR"
                                >
                                    ABORTAR
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
