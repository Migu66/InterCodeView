"use client";

import { useState, useRef } from "react";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/languages/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, User as UserIcon, Lock } from "lucide-react";
import PrimaryButton from "@/components/basics/PrimaryButton";
import Toast from "@/components/ui/Toast";

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Estado para editar perfil
    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
    });

    // Estado para cambiar contraseña
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profileForm.name.trim()) {
            showToast("El nombre no puede estar vacío", "error");
            return;
        }

        if (profileForm.name.length > 50) {
            showToast("El nombre no puede tener más de 50 caracteres", "error");
            return;
        }

        try {
            console.log("📤 Enviando actualización de perfil:", {
                name: profileForm.name,
            });

            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: profileForm.name }),
            });

            const data = await response.json();

            console.log("📥 Respuesta del servidor:", data);

            if (response.ok) {
                showToast("Perfil actualizado correctamente", "success");
                await refreshUser();
                setIsEditingProfile(false);
            } else {
                showToast(
                    data.message || data.error || "Error al actualizar perfil",
                    "error"
                );
            }
        } catch (error) {
            console.error("❌ Error en handleProfileSubmit:", error);
            showToast("Error de conexión", "error");
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !passwordForm.currentPassword ||
            !passwordForm.newPassword ||
            !passwordForm.confirmPassword
        ) {
            showToast("Todos los campos son requeridos", "error");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showToast("Las contraseñas no coinciden", "error");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            showToast(
                "La contraseña debe tener al menos 6 caracteres",
                "error"
            );
            return;
        }

        try {
            console.log("🔐 Enviando cambio de contraseña");

            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: user?.name,
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            });

            const data = await response.json();

            console.log("📥 Respuesta del servidor:", data);

            if (response.ok) {
                showToast("Contraseña actualizada correctamente", "success");
                setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setIsEditingPassword(false);
            } else {
                showToast(
                    data.message || data.error || "Error al cambiar contraseña",
                    "error"
                );
            }
        } catch (error) {
            console.error("❌ Error en handlePasswordSubmit:", error);
            showToast("Error de conexión", "error");
        }
    };

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
            console.log("📸 Subiendo avatar:", file.name, file.size, "bytes");

            const formData = new FormData();
            formData.append("avatar", file);

            const response = await fetch("/api/profile/upload-avatar", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            console.log("📥 Respuesta del servidor:", data);

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
            console.error("❌ Error en handleAvatarChange:", error);
            showToast("Error de conexión", "error");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
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
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="pt-24 px-6 pb-12 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Mi Perfil
                    </h1>

                    {/* Avatar Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                                    {user?.avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={user.avatarUrl}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="w-16 h-16 text-white" />
                                    )}
                                </div>
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isUploading}
                                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="mt-4 text-gray-400 text-sm">
                                {isUploading
                                    ? "Subiendo..."
                                    : "Haz clic en el icono para cambiar tu foto"}
                            </p>
                            {user?.avatarUrl && (
                                <button
                                    onClick={handleRemoveAvatar}
                                    className="mt-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                                >
                                    Eliminar foto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <UserIcon className="w-6 h-6" />
                                Información del Perfil
                            </h2>
                            {!isEditingProfile && (
                                <button
                                    onClick={() => {
                                        setIsEditingProfile(true);
                                        setProfileForm({
                                            name: user?.name || "",
                                        });
                                    }}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Editar
                                </button>
                            )}
                        </div>

                        {!isEditingProfile ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Nombre
                                    </label>
                                    <p className="text-lg">{user?.name}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Email
                                    </label>
                                    <p className="text-lg">{user?.email}</p>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleProfileSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="text-gray-400 text-sm">
                                            Nombre
                                        </label>
                                        <span
                                            className={`text-xs ${profileForm.name.length > 50 ? "text-red-400" : "text-gray-500"}`}
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
                                        className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none transition-colors ${profileForm.name.length > 50 ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-blue-500"}`}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Email
                                    </label>
                                    <p className="text-lg text-gray-500">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <PrimaryButton
                                        text="Guardar"
                                        type="submit"
                                        size="sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditingProfile(false)
                                        }
                                        className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Password Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Lock className="w-6 h-6" />
                                Seguridad
                            </h2>
                            {!isEditingPassword && (
                                <button
                                    onClick={() => setIsEditingPassword(true)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Cambiar Contraseña
                                </button>
                            )}
                        </div>

                        {!isEditingPassword ? (
                            <p className="text-gray-400">
                                Haz clic en &quot;Cambiar Contraseña&quot; para
                                actualizar tu contraseña
                            </p>
                        ) : (
                            <form
                                onSubmit={handlePasswordSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Contraseña Actual
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordForm.newPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">
                                        Confirmar Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <PrimaryButton
                                        text="Cambiar Contraseña"
                                        type="submit"
                                        size="sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditingPassword(false);
                                            setPasswordForm({
                                                currentPassword: "",
                                                newPassword: "",
                                                confirmPassword: "",
                                            });
                                        }}
                                        className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
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
