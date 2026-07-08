"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { useAuth } from "@/contexts/AuthContext";
import PasswordToggleButton from "@/components/ui/PasswordToggleButton";
import { signIn } from "next-auth/react";
import AuthShell from "@/components/icv/AuthShell";
import BootScreen from "@/components/icv/BootScreen";
import ConsoleButton from "@/components/icv/ConsoleButton";
import OAuthButtons from "@/components/icv/OAuthButtons";

export default function SignUpPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        if (!authLoading && user) {
            router.push("/languages");
        }
    }, [user, authLoading, router]);
    const [toastType, setToastType] = useState<"success" | "error" | "info">(
        "success"
    );

    const handleOAuthSignIn = async (provider: "google" | "github") => {
        try {
            await signIn(provider, {
                callbackUrl: "/languages",
            });
        } catch (error) {
            console.error(`Error al iniciar sesión con ${provider}:`, error);
            setToastMessage(
                `Error al iniciar sesión con ${provider === "google" ? "Google" : "GitHub"}`
            );
            setToastType("error");
            setShowToast(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validar nombre
        if (!formData.name.trim()) {
            setError("El nombre es requerido");
            return;
        }

        if (formData.name.length > 50) {
            setError("El nombre no puede tener más de 50 caracteres");
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Validar longitud de contraseña
        if (formData.password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        // Validar que la contraseña contenga mayúsculas, minúsculas y números
        const hasUpperCase = /[A-Z]/.test(formData.password);
        const hasLowerCase = /[a-z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            setError(
                "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al crear la cuenta");
                return;
            }

            // Guardar email para poder reenviar el código
            localStorage.setItem("pendingVerificationEmail", formData.email);

            // Mostrar toast de éxito
            setToastMessage(
                "¡Cuenta creada! Revisa tu email para verificar tu cuenta."
            );
            setToastType("success");
            setShowToast(true);

            // Redirigir a la página de verificación
            setTimeout(() => {
                router.push("/auth/verify");
            }, 2000);
        } catch (err) {
            console.error("Error:", err);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Mostrar pantalla de carga mientras se verifica la autenticación
    if (authLoading) {
        return <BootScreen label="VERIFICANDO SESIÓN" />;
    }

    return (
        <>
            <AuthShell
                code="ACC/02"
                procedure="ALTA DE CANDIDATO"
                titleLines={[
                    { text: "Reserva", tone: "bone" },
                    { text: "tu plaza.", tone: "amber" },
                ]}
                intro="Alta inmediata en el programa de entrenamiento. Gratis para siempre, sin tarjeta."
                panelTitle="EXPEDIENTE NUEVO — DATOS DEL CANDIDATO"
                below={
                    <p className="text-xs tracking-[0.08em] text-[#97896d]">
                        ¿YA TIENES EXPEDIENTE?{" "}
                        <Link
                            href="/auth/login"
                            className="icv-link !text-[#ffb000]"
                            data-cursor-label="ENTRAR"
                        >
                            INICIAR SESIÓN
                        </Link>
                    </p>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="border border-[#ff3d00] bg-[#ff3d00]/10 p-4 text-xs leading-relaxed tracking-[0.06em] text-[#ff3d00]">
                            <span className="icv-blink mr-2">▮</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="name" className="icv-label block">
                                NOMBRE COMPLETO
                            </label>
                            <span
                                className={`text-[0.65rem] tracking-[0.14em] ${formData.name.length > 50 ? "text-[#ff3d00]" : "text-[#97896d]"}`}
                            >
                                {formData.name.length}/50
                            </span>
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            maxLength={50}
                            value={formData.name}
                            onChange={handleChange}
                            className={`icv-input ${formData.name.length > 50 ? "icv-input--error" : ""}`}
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="icv-label block">
                            CORREO ELECTRÓNICO
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="icv-input"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="icv-label block">
                            CONTRASEÑA
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="icv-input pr-12"
                                placeholder="••••••••"
                            />
                            <PasswordToggleButton
                                showPassword={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="icv-label block"
                        >
                            CONFIRMAR CONTRASEÑA
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="icv-input pr-12"
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
                    </div>

                    <ConsoleButton
                        type="submit"
                        disabled={loading}
                        label={
                            loading
                                ? "Registrando…"
                                : "Iniciar secuencia de alta →"
                        }
                        cursorLabel="ALTA"
                        className="w-full"
                    />
                </form>

                <OAuthButtons onOAuth={handleOAuthSignIn} />
            </AuthShell>

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}
