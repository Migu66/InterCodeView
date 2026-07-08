"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Cursor from "@/components/landing/Cursor";
import Corners from "@/components/landing/Corners";
import { prefersReducedMotion } from "@/components/landing/split";

export interface AuthTitleLine {
    text: string;
    tone?: "bone" | "amber" | "outline";
}

interface AuthShellProps {
    code: string; // p. ej. "ACC/01"
    procedure: string; // p. ej. "CONTROL DE ACCESO"
    titleLines: AuthTitleLine[];
    intro?: string;
    backHref?: string;
    backLabel?: string;
    panelTitle: string;
    children: React.ReactNode;
    below?: React.ReactNode;
}

const TONE_CLASS: Record<NonNullable<AuthTitleLine["tone"]>, string> = {
    bone: "text-[#eae0cc]",
    amber: "text-[#ffb000]",
    outline: "icv-outline",
};

// Carcasa común de las pantallas de acceso: columna de procedimiento
// a la izquierda, panel de formulario a la derecha.
export default function AuthShell({
    code,
    procedure,
    titleLines,
    intro,
    backHref = "/",
    backLabel = "VOLVER A BASE",
    panelTitle,
    children,
    below,
}: AuthShellProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion()) {
                gsap.set(".icv-auth-reveal", { opacity: 1 });
                return;
            }
            gsap.fromTo(
                ".icv-auth-reveal",
                { opacity: 0, y: 26 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power4.out",
                    delay: 0.1,
                }
            );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className="icv relative min-h-screen">
            <Cursor />
            <div className="icv-scan" aria-hidden="true" />

            {/* Barra superior */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(234,224,204,0.16)] bg-[#0f0c08]">
                <div className="flex items-center justify-between px-4 py-4 md:px-10">
                    <Link
                        href="/"
                        className="icv-display text-sm tracking-[0.2em] text-[#eae0cc]"
                        data-cursor-label="BASE"
                    >
                        ICV<span className="icv-blink text-[#ffb000]">▮</span>
                    </Link>
                    <p className="icv-label hidden sm:block">
                        DOC {code} ·{" "}
                        <span className="text-[#ffb000]">SISTEMA EN LÍNEA</span>
                    </p>
                </div>
            </header>

            <main className="grid min-h-screen grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 md:px-10 lg:grid-cols-12 lg:gap-0 lg:px-24">
                {/* Columna de procedimiento */}
                <section className="lg:col-span-5">
                    <Link
                        href={backHref}
                        className="icv-auth-reveal icv-link opacity-0"
                        data-cursor-label="VOLVER"
                    >
                        ← {backLabel}
                    </Link>

                    <p className="icv-auth-reveal icv-label mb-6 mt-10 opacity-0">
                        <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                        {code} — {procedure}
                    </p>

                    <h1 className="icv-auth-reveal opacity-0">
                        {titleLines.map((line, i) => (
                            <span
                                key={i}
                                className={`icv-display block text-[clamp(2.4rem,6vw,4.6rem)] ${TONE_CLASS[line.tone ?? "bone"]}`}
                            >
                                {line.text}
                            </span>
                        ))}
                    </h1>

                    {intro && (
                        <p className="icv-auth-reveal mt-8 max-w-sm text-sm leading-relaxed text-[#97896d] opacity-0">
                            {intro}
                        </p>
                    )}

                    {/* Auto-test decorativo */}
                    <dl
                        className="icv-auth-reveal mt-12 hidden max-w-sm space-y-2 text-[0.65rem] tracking-[0.2em] text-[#97896d] opacity-0 lg:block"
                        aria-hidden="true"
                    >
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt>ENLACE SEGURO</dt>
                            <dd className="text-[#ffb000]">OK</dd>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt>CIFRADO DE CREDENCIALES</dt>
                            <dd className="text-[#ffb000]">OK</dd>
                        </div>
                        <div className="flex justify-between pb-2">
                            <dt>MOTOR IA</dt>
                            <dd className="text-[#eae0cc]">EN LÍNEA</dd>
                        </div>
                    </dl>
                </section>

                {/* Panel de formulario */}
                <section className="lg:col-span-6 lg:col-start-7">
                    <div className="icv-auth-reveal icv-panel p-6 opacity-0 md:p-10">
                        <Corners />
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="icv-label !text-[#eae0cc]">
                                {panelTitle}
                            </h2>
                            <span className="icv-blink h-2 w-2 bg-[#ffb000]" />
                        </div>
                        {children}
                    </div>
                    {below && (
                        <div className="icv-auth-reveal mt-6 opacity-0">
                            {below}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
