"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import DotGrid from "@/components/ui/DotGrid";
import Toast from "@/components/ui/Toast";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    const [token, setToken] = useState(tokenFromUrl || "");
    const [email, setEmail] = useState(emailFromUrl || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error" | "info">(
        "success"
    );

    // Guardar email en localStorage si viene en la URL
    useEffect(() => {
        if (emailFromUrl) {
            localStorage.setItem("pendingVerificationEmail", emailFromUrl);
            setEmail(emailFromUrl);
        }
    }, [emailFromUrl]);

    // Auto-verificar si viene token en la URL
    useEffect(() => {
        if (tokenFromUrl) {
            handleVerify();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFromUrl]);

    const handleVerify = async () => {
        if (!token) {
            setError("Por favor ingresa el código de verificación");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al verificar el código");
                setToastMessage(data.error || "Error al verificar");
                setToastType("error");
                setShowToast(true);
                return;
            }

            setSuccess(true);
            setToastMessage("¡Email verificado exitosamente! Redirigiendo...");
            setToastType("success");
            setShowToast(true);

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (err) {
            console.error("Error:", err);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        setError("");

        try {
            const email = localStorage.getItem("pendingVerificationEmail");
            if (!email) {
                setError(
                    "No se encontró el email. Por favor regístrate nuevamente."
                );
                return;
            }

            const response = await fetch("/api/auth/verify", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al reenviar el código");
                return;
            }

            setToastMessage("Código reenviado exitosamente. Revisa tu email.");
            setToastType("info");
            setShowToast(true);
        } catch (err) {
            console.error("Error:", err);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
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

                <div className="relative z-10 w-full max-w-md px-6 py-12 text-center">
                    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10">
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-green-400 mb-3">
                                ¡Verificado!
                            </h1>
                            <p className="text-gray-300">
                                Tu email ha sido verificado exitosamente.
                                Redirigiendo al login...
                            </p>
                        </div>
                    </div>
                </div>

                {showToast && (
                    <Toast
                        message={toastMessage}
                        type={toastType}
                        onClose={() => setShowToast(false)}
                    />
                )}
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
                    href="/"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">
                        ←
                    </span>
                    Volver al inicio
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black tracking-tighter mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500">
                            Verificar Email
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Ingresa el código que enviamos a tu correo
                    </p>
                    {email && (
                        <p className="text-sm text-green-400 mt-2">
                            Enviado a:{" "}
                            <span className="font-semibold">{email}</span>
                        </p>
                    )}
                </div>

                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10">
                    <div className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

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
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white text-center text-2xl tracking-widest font-mono placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="123456"
                                maxLength={6}
                                disabled={loading}
                            />
                            <p className="text-sm text-gray-400 text-center">
                                Ingresa el código de 6 dígitos
                            </p>
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={loading || !token}
                            className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? "Verificando..." : "Verificar código"}
                        </button>

                        <div className="text-center space-y-3">
                            <button
                                onClick={handleResendCode}
                                disabled={loading}
                                className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors disabled:opacity-50"
                            >
                                ¿No recibiste el código? Reenviar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        ¿Ya verificaste tu cuenta?{" "}
                        <Link
                            href="/auth/login"
                            className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                    <div className="text-white">Cargando...</div>
                </div>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}
