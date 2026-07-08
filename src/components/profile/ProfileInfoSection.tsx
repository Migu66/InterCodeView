"use client";

import { useState } from "react";
import Corners from "@/components/landing/Corners";
import ConsoleButton from "@/components/icv/ConsoleButton";

interface ProfileInfoSectionProps {
    user: {
        name: string;
        email: string;
    } | null;
    onProfileUpdate: (name: string) => Promise<void>;
}

export default function ProfileInfoSection({
    user,
    onProfileUpdate,
}: ProfileInfoSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onProfileUpdate(profileForm.name);
            setIsEditing(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = () => {
        setProfileForm({ name: user?.name || "" });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setProfileForm({ name: user?.name || "" });
        setIsEditing(false);
    };

    return (
        <div className="icv-panel p-6 md:p-8">
            <Corners />
            <div className="mb-8 flex items-center justify-between">
                <h2 className="icv-label !text-[#eae0cc]">
                    DATOS DEL CANDIDATO
                </h2>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        data-cursor-label="EDITAR"
                        className="border border-[rgba(234,224,204,0.16)] px-4 py-2 text-[0.6rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:border-[#ffb000] hover:text-[#ffb000]"
                    >
                        EDITAR FICHA
                    </button>
                )}
            </div>

            {!isEditing ? (
                <dl className="space-y-4">
                    <div className="flex flex-col gap-1 border-b border-[rgba(234,224,204,0.08)] pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                        <dt className="icv-label">NOMBRE</dt>
                        <dd className="text-sm text-[#eae0cc]">
                            {user?.name}
                        </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-[rgba(234,224,204,0.08)] pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                        <dt className="icv-label">CORREO</dt>
                        <dd className="break-all text-sm text-[#eae0cc]">
                            {user?.email}
                        </dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <dt className="icv-label">ESTADO</dt>
                        <dd className="text-[0.7rem] tracking-[0.2em] text-[#ffb000]">
                            CANDIDATO ACTIVO
                        </dd>
                    </div>
                </dl>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="icv-label block">NOMBRE</label>
                            <span
                                className={`text-[0.65rem] tracking-[0.14em] ${
                                    profileForm.name.length > 50
                                        ? "text-[#ff3d00]"
                                        : "text-[#97896d]"
                                }`}
                            >
                                {profileForm.name.length}/50
                            </span>
                        </div>
                        <input
                            type="text"
                            value={profileForm.name}
                            maxLength={50}
                            onChange={(e) =>
                                setProfileForm({
                                    ...profileForm,
                                    name: e.target.value,
                                })
                            }
                            className={`icv-input ${profileForm.name.length > 50 ? "icv-input--error" : ""}`}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="icv-label block">
                            CORREO (NO EDITABLE)
                        </label>
                        <p className="border border-[rgba(234,224,204,0.08)] bg-[#120d06] px-4 py-3 text-sm text-[#97896d]">
                            {user?.email}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <ConsoleButton
                            type="submit"
                            disabled={isSubmitting}
                            label={
                                isSubmitting ? "Guardando…" : "Guardar ficha →"
                            }
                            cursorLabel="GUARDAR"
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
