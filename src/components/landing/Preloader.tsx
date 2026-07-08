"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "./split";

const BOOT_LINES = [
    "> INTERCODEVIEW OS v3.0 — MADRID",
    "> CARGANDO SIMULADOR DE ENTREVISTAS ...",
    "> MOTOR DE EVALUACIÓN IA ............ OK",
    "> BANCO DE EJERCICIOS [500+] ........ OK",
    "> EDITOR DE CABINA .................. OK",
    "> TELEMETRÍA ........................ OK",
    "> CANDIDATO ................ SIN REGISTRO",
];

interface PreloaderProps {
    onDone: () => void;
}

// Secuencia de arranque: líneas de auto-test + porcentaje gigante,
// después las dos compuertas se abren en vertical.
export default function Preloader({ onDone }: PreloaderProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const doneRef = useRef(onDone);
    doneRef.current = onDone;

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // Visitas repetidas en la misma sesión: arranque corto.
        // El flag se guarda al completar, no al montar (StrictMode
        // monta dos veces en desarrollo).
        const seen = sessionStorage.getItem("icv-boot");
        const quick = seen === "1" || prefersReducedMotion();

        const ctx = gsap.context(() => {
            const lines = gsap.utils.toArray<HTMLElement>(".icv-boot-line");
            const pct = root.querySelector<HTMLElement>(".icv-boot-pct");
            const counter = { v: 0 };

            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem("icv-boot", "1");
                    doneRef.current();
                },
            });

            if (quick) {
                tl.to(root, {
                    autoAlpha: 0,
                    duration: 0.45,
                    ease: "power2.inOut",
                    delay: 0.2,
                });
                return;
            }

            tl.to(lines, {
                opacity: 1,
                duration: 0.01,
                stagger: 0.16,
            });

            tl.to(
                counter,
                {
                    v: 100,
                    duration: 1.7,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        if (pct) {
                            pct.textContent = String(
                                Math.round(counter.v)
                            ).padStart(3, "0");
                        }
                    },
                },
                0.2
            );

            // Las compuertas se abren
            tl.to(".icv-boot-inner", {
                opacity: 0,
                duration: 0.25,
                ease: "power1.in",
            });
            tl.to(
                ".icv-boot-gate--top",
                { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
                ">-0.05"
            );
            tl.to(
                ".icv-boot-gate--bottom",
                { yPercent: 100, duration: 0.8, ease: "power4.inOut" },
                "<"
            );
            tl.set(root, { autoAlpha: 0 });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[90]"
            role="status"
            aria-label="Cargando"
        >
            <div className="icv-boot-gate icv-boot-gate--top absolute inset-x-0 top-0 h-1/2 bg-[#0f0c08] border-b border-[rgba(234,224,204,0.16)] will-change-transform" />
            <div className="icv-boot-gate icv-boot-gate--bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#0f0c08] will-change-transform" />

            <div className="icv-boot-inner absolute inset-0 flex flex-col justify-between p-6 md:p-12">
                <div className="text-[0.7rem] leading-relaxed tracking-[0.18em] text-[#97896d]">
                    {BOOT_LINES.map((line) => (
                        <p key={line} className="icv-boot-line opacity-0">
                            {line.includes("SIN REGISTRO") ? (
                                <>
                                    {line.split("SIN REGISTRO")[0]}
                                    <span className="text-[#ff3d00]">
                                        SIN REGISTRO
                                    </span>
                                </>
                            ) : line.includes("OK") ? (
                                <>
                                    {line.slice(0, line.lastIndexOf("OK"))}
                                    <span className="text-[#ffb000]">OK</span>
                                </>
                            ) : (
                                line
                            )}
                        </p>
                    ))}
                </div>

                <div className="flex items-end justify-between">
                    <p className="icv-label icv-blink text-[#ffb000]">
                        ▮ INICIANDO SIMULACIÓN
                    </p>
                    <div
                        className="icv-display text-right text-[clamp(4rem,14vw,10rem)] text-[#eae0cc]"
                        aria-hidden="true"
                    >
                        <span className="icv-boot-pct">000</span>
                        <span className="text-[0.35em] text-[#97896d]">%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
