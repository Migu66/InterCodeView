"use client";

import { useState } from "react";
import { UserIcon } from "lucide-react";
import PrimaryButton from "@/components/basics/PrimaryButton";

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
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 relative overflow-hidden group">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <UserIcon className="w-7 h-7 text-green-400" />
                        </div>
                        <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                            Información del Perfil
                        </span>
                    </h2>
                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="px-6 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all duration-300 font-semibold border border-green-500/30 hover:border-green-500/60 cursor-pointer"
                        >
                            Editar
                        </button>
                    )}
                </div>

                <div
                    className={`transition-all duration-500 ease-in-out ${
                        isEditing
                            ? "max-h-[600px] opacity-100"
                            : "max-h-[400px] opacity-100"
                    }`}
                >
                    {!isEditing ? (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10 transform transition-all duration-300 hover:scale-[1.02]">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                                    Nombre
                                </label>
                                <p className="text-xl font-medium mt-2">
                                    {user?.name}
                                </p>
                            </div>
                            <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10 transform transition-all duration-300 hover:scale-[1.02]">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                                    Email
                                </label>
                                <p className="text-xl font-medium mt-2">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 animate-fade-in-up"
                        >
                            <div className="transform transition-all duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                                        Nombre
                                    </label>
                                    <span
                                        className={`text-xs font-mono transition-colors duration-300 ${
                                            profileForm.name.length > 50
                                                ? "text-red-400 animate-pulse"
                                                : "text-gray-500"
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
                                    className={`w-full px-5 py-3 bg-black/50 border-2 rounded-xl focus:outline-none transition-all duration-300 font-medium ${
                                        profileForm.name.length > 50
                                            ? "border-red-500 focus:border-red-500 shake"
                                            : "border-green-500/30 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20"
                                    }`}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                                <label className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                                    Email
                                </label>
                                <p className="text-lg text-gray-400 mt-2">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <PrimaryButton
                                    text="Guardar"
                                    type="submit"
                                    size="sm"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
