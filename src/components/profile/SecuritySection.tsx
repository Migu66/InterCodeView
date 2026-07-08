"use client";

import { useState } from "react";
import Corners from "@/components/landing/Corners";
import ConsoleButton from "@/components/icv/ConsoleButton";
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
        <div className="icv-panel p-6 md:p-8">
            <Corners />
            <div className="mb-8 flex items-center justify-between">
                <h2 className="icv-label !text-[#eae0cc]">
                    CÓDIGOS DE ACCESO — SEGURIDAD
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        data-cursor-label="CAMBIAR"
                        className="border border-[rgba(234,224,204,0.16)] px-4 py-2 text-[0.6rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:border-[#ffb000] hover:text-[#ffb000]"
                    >
                        CAMBIAR CONTRASEÑA
                    </button>
                )}
            </div>

            {!isEditing ? (
                <dl className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <dt className="icv-label">CONTRASEÑA</dt>
                    <dd className="text-sm tracking-[0.3em] text-[#97896d]">
                        ••••••••{" "}
                        <span className="ml-3 text-[0.65rem] tracking-[0.2em] text-[#ffb000]">
                            [CIFRADA]
                        </span>
                    </dd>
                </dl>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="icv-label block">
                            CONTRASEÑA ACTUAL
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordForm.currentPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        currentPassword: e.target.value,
                                    })
                                }
                                className="icv-input pr-12"
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

                    <div className="space-y-2">
                        <label className="icv-label block">
                            NUEVA CONTRASEÑA
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="icv-input pr-12"
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

                    <div className="space-y-2">
                        <label className="icv-label block">
                            CONFIRMAR NUEVA CONTRASEÑA
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                value={passwordForm.confirmPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="icv-input pr-12"
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

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <ConsoleButton
                            type="submit"
                            disabled={isSubmitting}
                            label={
                                isSubmitting
                                    ? "Rearmando…"
                                    : "Rearmar códigos →"
                            }
                            cursorLabel="REARMAR"
                            className="!px-6 !py-3 !text-[0.65rem]"
                        />
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="icv-link disabled:pointer-events-none disabled:opacity-40"
                            data-cursor-label="CANCELAR"
                        >
                            CANCELAR
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
