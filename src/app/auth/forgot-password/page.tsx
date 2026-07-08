"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/Toast";
import AuthShell from "@/components/icv/AuthShell";
import ConsoleButton from "@/components/icv/ConsoleButton";
import Corners from "@/components/landing/Corners";

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
            <div className="icv relative flex min-h-screen items-center justify-center px-4">
                <div className="icv-scan" aria-hidden="true" />
                <div className="icv-panel w-full max-w-md p-10">
                    <Corners />
                    <p className="icv-label mb-6">
                        ACC/04 — TRANSMISIÓN ENVIADA
                        <span className="icv-blink ml-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                    </p>
                    <h1 className="icv-display text-2xl text-[#eae0cc]">
                        Revisa tu correo.
                    </h1>
                    <p className="mt-6 text-sm leading-relaxed text-[#97896d]">
                        Código de rescate transmitido a{" "}
                        <span className="text-[#ffb000]">{email}</span>. Úsalo
                        para restablecer tu contraseña.
                    </p>
                    <p className="icv-label mt-6 border border-[rgba(234,224,204,0.16)] p-3 !text-[#ff3d00]">
                        AVISO — EL CÓDIGO EXPIRA EN 1 HORA
                    </p>
                    <ConsoleButton
                        onClick={() => router.push("/auth/reset-password")}
                        label="Ir a restablecer →"
                        cursorLabel="SEGUIR"
                        className="mt-8 w-full"
                    />
                    <Link
                        href="/auth/login"
                        className="icv-link mx-auto mt-6 block w-fit"
                        data-cursor-label="VOLVER"
                    >
                        ← CONTROL DE ACCESO
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <AuthShell
            code="ACC/04"
            procedure="RESCATE DE CREDENCIALES"
            titleLines={[
                { text: "Señal", tone: "bone" },
                { text: "perdida.", tone: "amber" },
            ]}
            intro="Indica tu correo y transmitiremos un código de rescate para restablecer la contraseña."
            backHref="/auth/login"
            backLabel="CONTROL DE ACCESO"
            panelTitle="SOLICITUD DE RESCATE"
            below={
                <p className="text-xs tracking-[0.08em] text-[#97896d]">
                    ¿LA RECORDASTE?{" "}
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
                <div className="space-y-2">
                    <label htmlFor="email" className="icv-label block">
                        CORREO ELECTRÓNICO
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="icv-input"
                        placeholder="tu@email.com"
                    />
                </div>

                <ConsoleButton
                    type="submit"
                    disabled={isLoading}
                    label={
                        isLoading ? "Transmitiendo…" : "Transmitir código →"
                    }
                    cursorLabel="ENVIAR"
                    className="w-full"
                />
            </form>
        </AuthShell>
    );
}
