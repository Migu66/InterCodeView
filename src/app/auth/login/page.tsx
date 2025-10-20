"use client";

import { useState } from "react";
import Link from "next/link";
import DotGrid from "@/components/ui/DotGrid";
import PrimaryButton from "@/components/basics/PrimaryButton";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implementar lógica de inicio de sesión
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
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
            <div className="relative z-10 w-full max-w-md px-6 py-12">
                {/* Back to Home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">
                        ←
                    </span>
                    Volver al inicio
                </Link>

                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black tracking-tighter mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500">
                            InterCodeView
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400">Bienvenido de nuevo</p>
                </div>

                {/* Form Card */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10 animate-fade-in-up">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
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
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="tu@email.com"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-green-400"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 bg-black/50 border border-green-500/30 rounded focus:ring-2 focus:ring-green-500/20 text-green-500"
                                />
                                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Recordarme
                                </span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton
                            text="Iniciar sesión"
                            href="/auth/login"
                            size="lg"
                            className="w-full"
                        />
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-green-500/30"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-900 text-gray-400">
                                o continúa con
                            </span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <button className="w-full px-6 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 flex items-center justify-center gap-3">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Continuar con GitHub
                        </button>

                        <button className="w-full px-6 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 flex items-center justify-center gap-3">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continuar con Google
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            ¿No tienes una cuenta?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
