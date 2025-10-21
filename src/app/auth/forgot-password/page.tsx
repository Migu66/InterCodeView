"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DotGrid from "@/components/ui/DotGrid";
import { showToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailSent(true);
                showToast(
                    data.message ||
                        "Te hemos enviado un email con instrucciones",
                    "success"
                );
            } else {
                showToast(data.error || "Error al enviar el correo", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Error al conectar con el servidor", "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (emailSent) {
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

                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-10 h-10 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-4 text-green-400">
                                ¡Revisa tu correo!
                            </h1>
                            <p className="text-gray-300 mb-6">
                                Te hemos enviado un email a{" "}
                                <span className="text-green-400 font-semibold">
                                    {email}
                                </span>{" "}
                                con un código de verificación para restablecer
                                tu contraseña.
                            </p>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                                <p className="text-sm text-yellow-400">
                                    ⏱️ El código expirará en 1 hora
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    router.push("/auth/reset-password")
                                }
                                className="w-full px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                Ir a restablecer contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        ¿Olvidaste tu contraseña?
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10">
                    <p className="text-gray-300 mb-6 text-center">
                        No te preocupes, te enviaremos un email con
                        instrucciones para restablecer tu contraseña.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-green-400"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                        >
                            {isLoading ? "Enviando..." : "Enviar instrucciones"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            ¿Recordaste tu contraseña?{" "}
                            <Link
                                href="/auth/login"
                                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
