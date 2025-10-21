"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import DotGrid from "@/components/ui/DotGrid";
import { showToast } from "@/components/ui/Toast";
import PasswordToggleButton from "@/components/ui/PasswordToggleButton";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get("token");

    const [formData, setFormData] = useState({
        token: tokenFromUrl || "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (tokenFromUrl) {
            setFormData((prev) => ({ ...prev, token: tokenFromUrl }));
        }
    }, [tokenFromUrl]);

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres";
        }
        if (!/[A-Z]/.test(password)) {
            return "La contraseña debe contener al menos una mayúscula";
        }
        if (!/[a-z]/.test(password)) {
            return "La contraseña debe contener al menos una minúscula";
        }
        if (!/[0-9]/.test(password)) {
            return "La contraseña debe contener al menos un número";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!formData.token) {
            showToast("Por favor ingresa el código de verificación", "error");
            return;
        }

        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) {
            showToast(passwordError, "error");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            showToast("Las contraseñas no coinciden", "error");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: formData.token,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast(
                    data.message || "Contraseña restablecida exitosamente",
                    "success"
                );
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                showToast(
                    data.error || "Error al restablecer la contraseña",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Error al conectar con el servidor", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
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

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">
                        ←
                    </span>
                    Volver al login
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black tracking-tighter mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500">
                            InterCodeView
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Restablecer contraseña
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Token Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="token"
                                className="block text-sm font-semibold text-green-400"
                            >
                                Código de verificación
                            </label>
                            <input
                                id="token"
                                name="token"
                                type="text"
                                required
                                value={formData.token}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-center text-2xl tracking-widest font-mono"
                                placeholder="123456"
                                maxLength={6}
                            />
                            <p className="text-xs text-gray-400">
                                Ingresa el código de 6 dígitos que recibiste por
                                correo
                            </p>
                        </div>

                        {/* New Password Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-semibold text-green-400"
                            >
                                Nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <PasswordToggleButton
                                    showPassword={showPassword}
                                    onToggle={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            </div>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li
                                    className={
                                        formData.newPassword.length >= 8
                                            ? "text-green-400"
                                            : ""
                                    }
                                >
                                    ✓ Mínimo 8 caracteres
                                </li>
                                <li
                                    className={
                                        /[A-Z]/.test(formData.newPassword)
                                            ? "text-green-400"
                                            : ""
                                    }
                                >
                                    ✓ Una letra mayúscula
                                </li>
                                <li
                                    className={
                                        /[a-z]/.test(formData.newPassword)
                                            ? "text-green-400"
                                            : ""
                                    }
                                >
                                    ✓ Una letra minúscula
                                </li>
                                <li
                                    className={
                                        /[0-9]/.test(formData.newPassword)
                                            ? "text-green-400"
                                            : ""
                                    }
                                >
                                    ✓ Un número
                                </li>
                            </ul>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-semibold text-green-400"
                            >
                                Confirmar nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all pr-12"
                                    placeholder="••••••••"
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
                            {formData.confirmPassword &&
                                formData.newPassword !==
                                    formData.confirmPassword && (
                                    <p className="text-xs text-red-400">
                                        Las contraseñas no coinciden
                                    </p>
                                )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                        >
                            {isLoading
                                ? "Restableciendo..."
                                : "Restablecer contraseña"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            ¿No recibiste el código?{" "}
                            <Link
                                href="/auth/forgot-password"
                                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                            >
                                Solicitar uno nuevo
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
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
                    <div className="relative z-10 text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 mx-auto"></div>
                        <p className="mt-4 text-green-400">Cargando...</p>
                    </div>
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
}
