"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/languages/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import DotGrid from "@/components/ui/DotGrid";
import AvatarSection from "@/components/profile/AvatarSection";
import ProfileInfoSection from "@/components/profile/ProfileInfoSection";
import SecuritySection from "@/components/profile/SecuritySection";

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleProfileUpdate = async (name: string) => {
        if (!name.trim()) {
            showToast("El nombre no puede estar vacío", "error");
            throw new Error("El nombre no puede estar vacío");
        }

        if (name.length > 50) {
            showToast("El nombre no puede tener más de 50 caracteres", "error");
            throw new Error("El nombre no puede tener más de 50 caracteres");
        }

        try {
            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Perfil actualizado correctamente", "success");
                await refreshUser();
            } else {
                showToast(
                    data.message || data.error || "Error al actualizar perfil",
                    "error"
                );
                throw new Error(data.message || "Error al actualizar perfil");
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes("nombre")) {
                throw error;
            }
            showToast("Error de conexión", "error");
            throw error;
        }
    };

    const handlePasswordUpdate = async (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            showToast("Todos los campos son requeridos", "error");
            throw new Error("Todos los campos son requeridos");
        }

        if (newPassword !== confirmPassword) {
            showToast("Las contraseñas no coinciden", "error");
            throw new Error("Las contraseñas no coinciden");
        }

        if (newPassword.length < 8) {
            showToast(
                "La contraseña debe tener al menos 6 caracteres",
                "error"
            );
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        try {
            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: user?.name,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Contraseña actualizada correctamente", "success");
            } else {
                showToast(
                    data.message || data.error || "Error al cambiar contraseña",
                    "error"
                );
                throw new Error(data.message || "Error al cambiar contraseña");
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message.includes("contraseña")
            ) {
                throw error;
            }
            showToast("Error de conexión", "error");
            throw error;
        }
    };

    const handleAvatarChange = async (file: File) => {
        // Validar tipo
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            showToast("Solo se permiten imágenes (JPEG, PNG, WebP)", "error");
            return;
        }

        // Validar tamaño (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast("La imagen es demasiado grande. Máximo 5MB", "error");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await fetch("/api/profile/upload-avatar", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Avatar actualizado correctamente", "success");
                await refreshUser();
            } else {
                showToast(
                    data.message || data.error || "Error al subir avatar",
                    "error"
                );
            }
        } catch (error) {
            showToast("Error de conexión", "error");
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveAvatar = async () => {
        if (
            !confirm("¿Estás seguro de que quieres eliminar tu foto de perfil?")
        ) {
            return;
        }

        try {
            const response = await fetch("/api/profile/upload-avatar", {
                method: "DELETE",
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Avatar eliminado correctamente", "success");
                await refreshUser();
            } else {
                showToast(data.message || "Error al eliminar avatar", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Error de conexión", "error");
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white overflow-hidden relative">
                {/* DotGrid Background - Fixed Full Page */}
                <div className="fixed inset-0 z-0">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271e37"
                        activeColor="#00ff9d"
                        proximity={100}
                        shockRadius={180}
                        shockStrength={2}
                        resistance={1500}
                        returnDuration={3}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                    <Navbar />
                    <div className="pt-24 px-6 pb-12 max-w-5xl mx-auto">
                        {/* Avatar Section */}
                        <AvatarSection
                            user={user}
                            onAvatarChange={handleAvatarChange}
                            onRemoveAvatar={handleRemoveAvatar}
                            isUploading={isUploading}
                        />

                        {/* Profile Information */}
                        <ProfileInfoSection
                            user={user}
                            onProfileUpdate={handleProfileUpdate}
                        />

                        {/* Security Section */}
                        <SecuritySection
                            onPasswordUpdate={handlePasswordUpdate}
                        />
                    </div>
                </div>

                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </AuthGuard>
    );
}
