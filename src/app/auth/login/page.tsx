"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/Toast";
import { useAuth } from "@/contexts/AuthContext";
import PasswordToggleButton from "@/components/ui/PasswordToggleButton";
import { signIn } from "next-auth/react";
import AuthShell from "@/components/icv/AuthShell";
import BootScreen from "@/components/icv/BootScreen";
import ConsoleButton from "@/components/icv/ConsoleButton";
import OAuthButtons from "@/components/icv/OAuthButtons";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading, refreshUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        if (!loading && user) {
            router.push("/languages");
        }
    }, [user, loading, router]);

    const handleOAuthSignIn = async (provider: "google" | "github") => {
        try {
            await signIn(provider, {
                callbackUrl: "/languages",
            });
        } catch (error) {
            console.error(`Error al iniciar sesión con ${provider}:`, error);
            showToast(
                `Error al iniciar sesión con ${provider === "google" ? "Google" : "GitHub"}`,
                "error"
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Usar NextAuth para el login con credentials
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                // Verificar si es un error de email no verificado
                if (result.error === "Email no verificado") {
                    showToast(
                        "Tu cuenta no está verificada. Revisa tu correo.",
                        "warning"
                    );
                    router.push(
                        `/auth/verify?email=${encodeURIComponent(formData.email)}`
                    );
                } else {
                    // Error en la autenticación
                    showToast("Credenciales inválidas", "error");
                }
                setIsLoading(false);
                return;
            }

            if (result?.ok) {
                // Login exitoso
                showToast("¡Bienvenido de nuevo!", "success");
                // Actualizar el contexto de autenticación
                await refreshUser();
                // Redirigir al dashboard o página principal
                router.push("/languages");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
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

    // Mostrar pantalla de carga mientras se verifica la autenticación
    if (loading) {
        return <BootScreen label="VERIFICANDO SESIÓN" />;
    }

    return (
        <AuthShell
            code="ACC/01"
            procedure="CONTROL DE ACCESO"
            titleLines={[
                { text: "Vuelve", tone: "bone" },
                { text: "a cabina.", tone: "amber" },
            ]}
            intro="Introduce tus credenciales para retomar la simulación donde la dejaste."
            panelTitle="IDENTIFICACIÓN DEL CANDIDATO"
            below={
                <p className="text-xs tracking-[0.08em] text-[#97896d]">
                    ¿SIN CREDENCIALES?{" "}
                    <Link
                        href="/auth/signup"
                        className="icv-link !text-[#ffb000]"
                        data-cursor-label="ALTA"
                    >
                        SOLICITAR ALTA
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="icv-check"
                        />
                        <span className="icv-label !text-[#97896d]">
                            MANTENER ENLACE
                        </span>
                    </label>
                    <Link
                        href="/auth/forgot-password"
                        className="icv-link"
                        data-cursor-label="RESCATE"
                    >
                        CONTRASEÑA PERDIDA
                    </Link>
                </div>

                <ConsoleButton
                    type="submit"
                    disabled={isLoading}
                    label={
                        isLoading ? "Autenticando…" : "Reanudar simulación →"
                    }
                    cursorLabel="ENTRAR"
                    className="w-full"
                />
            </form>

            <OAuthButtons onOAuth={handleOAuthSignIn} />
        </AuthShell>
    );
}
