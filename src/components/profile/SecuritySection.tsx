"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import PrimaryButton from "@/components/basics/PrimaryButton";
import PasswordToggleButton from "@/components/ui/PasswordToggleButton";

interface SecuritySectionProps {
    onPasswordUpdate: (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => Promise<void>;
}

export default function SecuritySection({
    onPasswordUpdate,
}: SecuritySectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onPasswordUpdate(
                passwordForm.currentPassword,
                passwordForm.newPassword,
                passwordForm.confirmPassword
            );
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setIsEditing(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 relative overflow-hidden group">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Lock className="w-7 h-7 text-green-400" />
                        </div>
                        <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                            Seguridad
                        </span>
                    </h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all duration-300 font-semibold border border-green-500/30 hover:border-green-500/60 cursor-pointer"
                        >
                            Cambiar Contraseña
                        </button>
                    )}
                </div>

                <div
                    className={`transition-all duration-500 ease-in-out ${
                        isEditing
                            ? "max-h-[800px] opacity-100"
                            : "max-h-[200px] opacity-100"
                    }`}
                >
                    {!isEditing ? (
                        <div className="bg-green-500/5 rounded-xl p-6 border border-green-500/10 animate-fade-in-up">
                            <p className="text-gray-400 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-green-400" />
                                Haz clic en &quot;Cambiar Contraseña&quot; para
                                actualizar tu contraseña
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 animate-fade-in-up"
                        >
                            <div className="transform transition-all duration-300">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide mb-2 block">
                                    Contraseña Actual
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordForm.currentPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-5 py-3 bg-black/50 border-2 border-green-500/30 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 font-medium focus:shadow-lg focus:shadow-green-500/20 pr-12"
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <PasswordToggleButton
                                        showPassword={showCurrentPassword}
                                        onToggle={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="transform transition-all duration-300">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide mb-2 block">
                                    Nueva Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordForm.newPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-5 py-3 bg-black/50 border-2 border-green-500/30 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 font-medium focus:shadow-lg focus:shadow-green-500/20 pr-12"
                                        disabled={isSubmitting}
                                        required
                                        minLength={6}
                                    />
                                    <PasswordToggleButton
                                        showPassword={showNewPassword}
                                        onToggle={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="transform transition-all duration-300">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide mb-2 block">
                                    Confirmar Nueva Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-5 py-3 bg-black/50 border-2 border-green-500/30 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 font-medium focus:shadow-lg focus:shadow-green-500/20 pr-12"
                                        disabled={isSubmitting}
                                        required
                                    />
                                    <PasswordToggleButton
                                        showPassword={showConfirmPassword}
                                        onToggle={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <PrimaryButton
                                    text="Cambiar Contraseña"
                                    type="submit"
                                    size="sm"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-bold rounded-lg cursor-pointer hover:bg-green-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
