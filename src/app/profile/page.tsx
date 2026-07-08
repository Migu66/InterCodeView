"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import Cursor from "@/components/landing/Cursor";
import AvatarSection from "@/components/profile/AvatarSection";
import ProfileInfoSection from "@/components/profile/ProfileInfoSection";
import SecuritySection from "@/components/profile/SecuritySection";
import DeleteAccountSection from "@/components/profile/DeleteAccountSection";
import { signOut } from "next-auth/react";

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

    const handleDeleteAccount = async (password?: string) => {
        try {
            const response = await fetch("/api/profile/delete-account", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Cuenta eliminada correctamente", "success");

                // Limpiar cookies y cerrar sesión
                await fetch("/api/auth/logout", {
                    method: "POST",
                    credentials: "include",
                });

                // Cerrar sesión de NextAuth si existe
                await signOut({ redirect: false });

                // Esperar un poco y redirigir a la página de inicio
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                showToast(
                    data.message || "Error al eliminar la cuenta",
                    "error"
                );
                throw new Error(data.message || "Error al eliminar la cuenta");
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            showToast("Error de conexión", "error");
            throw error;
        }
    };

    const handleVerifyPassword = async (password: string): Promise<boolean> => {
        try {
            const response = await fetch("/api/profile/verify-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                return data.valid;
            }
            return false;
        } catch (error) {
            console.error("Error al verificar contraseña:", error);
            return false;
        }
    };

    return (
        <AuthGuard>
            <div className="icv relative min-h-screen">
                <Cursor />
                <div className="icv-scan" aria-hidden="true" />
                <Navbar />

                <main className="px-4 pb-24 pt-32 md:px-10 lg:px-24">
                    {/* Cabecera del expediente */}
                    <header className="mb-14">
                        <p className="icv-label mb-6">
                            <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                            EXP/07 — FICHA DEL CANDIDATO
                        </p>
                        <h1 className="icv-display text-[clamp(2.4rem,8vw,6rem)]">
                            <span className="text-[#eae0cc]">Expe</span>
                            <span className="icv-outline-amber">diente.</span>
                        </h1>
                    </header>

                    {/* Dossier: foto a la izquierda, secciones a la derecha */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <AvatarSection
                                user={user}
                                onAvatarChange={handleAvatarChange}
                                onRemoveAvatar={handleRemoveAvatar}
                                isUploading={isUploading}
                            />
                        </div>

                        <div className="space-y-4 lg:col-span-8">
                            <ProfileInfoSection
                                user={user}
                                onProfileUpdate={handleProfileUpdate}
                            />

                            {/* Seguridad - Solo mostrar si el usuario tiene contraseña */}
                            {user?.hasPassword && (
                                <SecuritySection
                                    onPasswordUpdate={handlePasswordUpdate}
                                />
                            )}

                            {/* Zona roja - Mostrar siempre */}
                            <DeleteAccountSection
                                onDeleteAccount={handleDeleteAccount}
                                onVerifyPassword={handleVerifyPassword}
                                hasPassword={!!user?.hasPassword}
                            />
                        </div>
                    </div>
                </main>

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
