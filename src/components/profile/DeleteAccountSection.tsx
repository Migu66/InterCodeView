"use client";

import { useState } from "react";
import Corners from "@/components/landing/Corners";
import ConsoleButton from "@/components/icv/ConsoleButton";
import DeleteAccountModal from "./DeleteAccountModal";

interface DeleteAccountSectionProps {
    onDeleteAccount: (password?: string) => Promise<void>;
    onVerifyPassword?: (password: string) => Promise<boolean>;
    hasPassword: boolean;
}

export default function DeleteAccountSection({
    onDeleteAccount,
    onVerifyPassword,
    hasPassword,
}: DeleteAccountSectionProps) {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [verifiedPassword, setVerifiedPassword] = useState<
        string | undefined
    >(undefined);

    const handleModalConfirm = (password?: string) => {
        setVerifiedPassword(password);
        setShowPasswordModal(false);
        setShowConfirmation(true);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            await onDeleteAccount(verifiedPassword);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowConfirmation(false);
            setShowPasswordModal(false);
            setVerifiedPassword(undefined);
            setIsClosing(false);
        }, 200);
    };

    const handleInitialClick = () => {
        // Siempre mostrar modal de verificación primero
        setShowPasswordModal(true);
    };

    return (
        // Zona roja: dentro de este panel el acento pasa a rojo señal
        <div
            className="icv-panel border-[#ff3d00]/40 p-6 md:p-8"
            style={{ "--icv-amber": "#ff3d00" } as React.CSSProperties}
        >
            <Corners />
            <div className="mb-8 flex items-center justify-between">
                <h2 className="icv-label !text-[#ff3d00]">
                    ZONA ROJA — EXPULSIÓN DEL PROGRAMA
                </h2>
                <span className="icv-blink h-2 w-2 bg-[#ff3d00]" />
            </div>

            {!showConfirmation ? (
                <div className="space-y-6">
                    <p className="max-w-xl text-xs leading-relaxed tracking-[0.04em] text-[#97896d]">
                        Acción permanente e irreversible. Se destruirán todos
                        tus datos: expediente, progreso en ejercicios y
                        configuración. No hay copia de seguridad ni vuelta
                        atrás.
                    </p>
                    <button
                        onClick={handleInitialClick}
                        data-cursor-label="PELIGRO"
                        className="border border-[#ff3d00]/50 px-6 py-3 text-[0.65rem] tracking-[0.22em] text-[#ff3d00] transition-colors duration-300 hover:border-[#ff3d00] hover:bg-[#ff3d00]/10"
                    >
                        INICIAR SECUENCIA DE EXPULSIÓN
                    </button>
                </div>
            ) : (
                <form onSubmit={handleDelete} className="space-y-6">
                    <div className="border border-[#ff3d00]/50 bg-[#ff3d00]/5 p-5">
                        <p className="icv-label mb-4 !text-[#ff3d00]">
                            <span className="icv-blink mr-2">▮</span>
                            CONFIRMACIÓN FINAL REQUERIDA
                        </p>
                        <p className="mb-4 text-xs leading-relaxed tracking-[0.04em] text-[#eae0cc]">
                            Esta acción eliminará permanentemente tu cuenta y
                            todos los datos asociados:
                        </p>
                        <ul className="space-y-2 text-[0.7rem] tracking-[0.06em] text-[#97896d]">
                            <li>
                                <span className="mr-2 text-[#ff3d00]">▪</span>
                                Tu perfil y configuración
                            </li>
                            <li>
                                <span className="mr-2 text-[#ff3d00]">▪</span>
                                Todo tu progreso en ejercicios
                            </li>
                            <li>
                                <span className="mr-2 text-[#ff3d00]">▪</span>
                                Historial de actividades
                            </li>
                            <li>
                                <span className="mr-2 text-[#ff3d00]">▪</span>
                                Datos personales
                            </li>
                        </ul>
                        <p className="mt-4 text-[0.65rem] tracking-[0.2em] text-[#ff3d00]">
                            NO SE PUEDE REVERTIR.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <ConsoleButton
                            type="submit"
                            disabled={isDeleting}
                            red
                            label={
                                isDeleting
                                    ? "Eliminando…"
                                    : "Confirmar expulsión →"
                            }
                            cursorLabel="EXPULSAR"
                            className="!px-6 !py-3 !text-[0.65rem]"
                        />
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isDeleting}
                            className="icv-link disabled:pointer-events-none disabled:opacity-40"
                            data-cursor-label="ABORTAR"
                        >
                            ABORTAR SECUENCIA
                        </button>
                    </div>
                </form>
            )}

            {/* Modal de Verificación */}
            <DeleteAccountModal
                isOpen={showPasswordModal}
                onClose={handleCancel}
                onConfirm={handleModalConfirm}
                onVerifyPassword={onVerifyPassword}
                hasPassword={hasPassword}
                isClosing={isClosing}
            />
        </div>
    );
}
