"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Toast from "@/components/ui/Toast";
import AuthShell from "@/components/icv/AuthShell";
import BootScreen from "@/components/icv/BootScreen";
import ConsoleButton from "@/components/icv/ConsoleButton";
import Corners from "@/components/landing/Corners";

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
            <div className="icv relative flex min-h-screen items-center justify-center px-4">
                <div className="icv-scan" aria-hidden="true" />
                <div className="icv-panel w-full max-w-md p-10 text-center">
                    <Corners />
                    <p className="icv-label mb-8">
                        ACC/03 — VERIFICACIÓN COMPLETADA
                    </p>
                    <span className="icv-stamp text-2xl text-[#ffb000]">
                        VERIFICADO
                    </span>
                    <p className="mt-8 text-sm leading-relaxed text-[#97896d]">
                        Identidad confirmada. Redirigiendo al control de
                        acceso…
                    </p>
                    <p className="icv-label icv-blink mt-6 !text-[#ffb000]">
                        ▮ TRANSFIRIENDO
                    </p>
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
        <>
            <AuthShell
                code="ACC/03"
                procedure="VERIFICACIÓN DE IDENTIDAD"
                titleLines={[
                    { text: "Confirma", tone: "bone" },
                    { text: "la señal.", tone: "amber" },
                ]}
                intro={
                    email
                        ? `Hemos transmitido un código de 6 dígitos a ${email}.`
                        : "Hemos transmitido un código de 6 dígitos a tu correo."
                }
                backHref="/auth/login"
                backLabel="CONTROL DE ACCESO"
                panelTitle="CÓDIGO DE VERIFICACIÓN"
                below={
                    <p className="text-xs tracking-[0.08em] text-[#97896d]">
                        ¿YA VERIFICADO?{" "}
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
                <div className="space-y-6">
                    {error && (
                        <div className="border border-[#ff3d00] bg-[#ff3d00]/10 p-4 text-xs leading-relaxed tracking-[0.06em] text-[#ff3d00]">
                            <span className="icv-blink mr-2">▮</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label htmlFor="token" className="icv-label block">
                            INTRODUCE LOS 6 DÍGITOS
                        </label>
                        <input
                            id="token"
                            name="token"
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="icv-input icv-display text-center !text-3xl !tracking-[0.5em] !text-[#ffb000]"
                            placeholder="000000"
                            maxLength={6}
                            disabled={loading}
                        />
                    </div>

                    <ConsoleButton
                        onClick={handleVerify}
                        disabled={loading || !token}
                        label={loading ? "Verificando…" : "Confirmar código →"}
                        cursorLabel="VERIFICAR"
                        className="w-full"
                    />

                    <button
                        onClick={handleResendCode}
                        disabled={loading}
                        className="icv-link mx-auto block disabled:pointer-events-none disabled:opacity-40"
                        data-cursor-label="REENVIAR"
                    >
                        SIN SEÑAL — REENVIAR CÓDIGO
                    </button>
                </div>
            </AuthShell>

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

export default function VerifyPage() {
    return (
        <Suspense fallback={<BootScreen label="CARGANDO" />}>
            <VerifyContent />
        </Suspense>
    );
}
