"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
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
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 relative overflow-hidden group mt-5">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                            <Trash2 className="w-7 h-7 text-red-400" />
                        </div>
                        <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                            Eliminar cuenta
                        </span>
                    </h2>
                </div>

                <div
                    className={`transition-all duration-500 ease-in-out ${
                        showConfirmation
                            ? "max-h-[800px] opacity-100"
                            : "max-h-[200px] opacity-100"
                    }`}
                >
                    {!showConfirmation ? (
                        <div className="space-y-6">
                            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/10 animate-fade-in-up">
                                <div className="flex items-start gap-3 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-red-400 font-bold text-lg mb-2">
                                            Eliminar cuenta
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Esta acción es permanente y no se
                                            puede deshacer. Se eliminarán todos
                                            tus datos, progreso y configuración.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleInitialClick}
                                className="w-full px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 font-semibold border border-red-500/30 hover:border-red-500/60 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-5 h-5" />
                                Eliminar mi cuenta
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleDelete}
                            className="space-y-6 animate-fade-in-up"
                        >
                            <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-red-400 font-bold text-xl mb-3">
                                            ¿Estás completamente seguro?
                                        </h3>
                                        <p className="text-gray-300 mb-4 leading-relaxed">
                                            Esta acción eliminará
                                            permanentemente tu cuenta y todos
                                            los datos asociados:
                                        </p>
                                        <ul className="text-gray-400 space-y-2 list-disc list-inside mb-4">
                                            <li>Tu perfil y configuración</li>
                                            <li>
                                                Todo tu progreso en ejercicios
                                            </li>
                                            <li>Historial de actividades</li>
                                            <li>Datos personales</li>
                                        </ul>
                                        <p className="text-red-300 font-semibold">
                                            Esta acción no se puede revertir.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isDeleting}
                                    className="flex-1 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Eliminando...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-5 h-5" />
                                            Sí, eliminar mi cuenta
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isDeleting}
                                    className="flex-1 px-8 py-3 bg-transparent border-2 border-gray-500 text-gray-300 font-bold rounded-lg hover:bg-gray-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

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
