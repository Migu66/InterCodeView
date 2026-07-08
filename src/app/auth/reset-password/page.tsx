"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/components/ui/Toast";
import PasswordToggleButton from "@/components/ui/PasswordToggleButton";
import AuthShell from "@/components/icv/AuthShell";
import BootScreen from "@/components/icv/BootScreen";
import ConsoleButton from "@/components/icv/ConsoleButton";

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

    const CHECKS: { label: string; ok: boolean }[] = [
        {
            label: "MÍNIMO 8 CARACTERES",
            ok: formData.newPassword.length >= 8,
        },
        {
            label: "UNA LETRA MAYÚSCULA",
            ok: /[A-Z]/.test(formData.newPassword),
        },
        {
            label: "UNA LETRA MINÚSCULA",
            ok: /[a-z]/.test(formData.newPassword),
        },
        { label: "UN NÚMERO", ok: /[0-9]/.test(formData.newPassword) },
    ];

    return (
        <AuthShell
            code="ACC/05"
            procedure="NUEVO CÓDIGO DE ACCESO"
            titleLines={[
                { text: "Rearma", tone: "bone" },
                { text: "el acceso.", tone: "amber" },
            ]}
            intro="Introduce el código de rescate recibido por correo y define tu nueva contraseña."
            backHref="/auth/login"
            backLabel="CONTROL DE ACCESO"
            panelTitle="RESTABLECIMIENTO DE CONTRASEÑA"
            below={
                <p className="text-xs tracking-[0.08em] text-[#97896d]">
                    ¿SIN CÓDIGO?{" "}
                    <Link
                        href="/auth/forgot-password"
                        className="icv-link !text-[#ffb000]"
                        data-cursor-label="RESCATE"
                    >
                        SOLICITAR UNO NUEVO
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="token" className="icv-label block">
                        CÓDIGO DE RESCATE (6 DÍGITOS)
                    </label>
                    <input
                        id="token"
                        name="token"
                        type="text"
                        required
                        value={formData.token}
                        onChange={handleChange}
                        className="icv-input icv-display text-center !text-3xl !tracking-[0.5em] !text-[#ffb000]"
                        placeholder="000000"
                        maxLength={6}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="newPassword" className="icv-label block">
                        NUEVA CONTRASEÑA
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="icv-input pr-12"
                            placeholder="••••••••"
                        />
                        <PasswordToggleButton
                            showPassword={showPassword}
                            onToggle={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <ul className="space-y-1 pt-2 text-[0.6rem] tracking-[0.2em]">
                        {CHECKS.map((check) => (
                            <li
                                key={check.label}
                                className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-1"
                            >
                                <span
                                    className={
                                        check.ok
                                            ? "text-[#eae0cc]"
                                            : "text-[#97896d]"
                                    }
                                >
                                    {check.label}
                                </span>
                                <span
                                    className={
                                        check.ok
                                            ? "text-[#ffb000]"
                                            : "text-[#97896d]"
                                    }
                                >
                                    {check.ok ? "OK" : "PENDIENTE"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="icv-label block"
                    >
                        CONFIRMAR NUEVA CONTRASEÑA
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`icv-input pr-12 ${
                                formData.confirmPassword &&
                                formData.newPassword !==
                                    formData.confirmPassword
                                    ? "icv-input--error"
                                    : ""
                            }`}
                            placeholder="••••••••"
                        />
                        <PasswordToggleButton
                            showPassword={showConfirmPassword}
                            onToggle={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        />
                    </div>
                    {formData.confirmPassword &&
                        formData.newPassword !== formData.confirmPassword && (
                            <p className="text-[0.65rem] tracking-[0.14em] text-[#ff3d00]">
                                <span className="icv-blink mr-1">▮</span>
                                LAS CONTRASEÑAS NO COINCIDEN
                            </p>
                        )}
                </div>

                <ConsoleButton
                    type="submit"
                    disabled={isLoading}
                    label={
                        isLoading ? "Rearmando…" : "Restablecer contraseña →"
                    }
                    cursorLabel="REARMAR"
                    className="w-full"
                />
            </form>
        </AuthShell>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<BootScreen label="CARGANDO" />}>
            <ResetPasswordForm />
        </Suspense>
    );
}
