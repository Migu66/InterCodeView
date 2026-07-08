"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Corners from "./Corners";
import { prefersReducedMotion } from "./split";

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES: { text: string; tone: "dim" | "bone" | "red" | "amber" }[] =
    [
        { text: "> cargando solución del candidato ...", tone: "dim" },
        { text: "> análisis: two_sum.py [38 líneas]", tone: "bone" },
        {
            text: "> complejidad: O(n²) — se esperaba O(n log n)",
            tone: "bone",
        },
        { text: "> caso límite [array vacío]: NO CUBIERTO", tone: "red" },
        { text: "> estilo: aceptable. nombres: mejorables.", tone: "bone" },
        { text: "> veredicto: REINTENTAR", tone: "red" },
        { text: "> pista: ordena primero. luego hablamos.", tone: "amber" },
    ];

const TONE_CLASS = {
    dim: "text-[#97896d]",
    bone: "text-[#eae0cc]",
    red: "text-[#ff3d00]",
    amber: "text-[#ffb000]",
};

// El informe de la IA: titular gigante que invade un terminal CRT
// donde la evaluación se escribe sola al entrar en pantalla.
export default function AITelemetry() {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            // Reveals genéricos
            gsap.utils
                .toArray<HTMLElement>(".icv-ai-reveal", root)
                .forEach((el, i) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: root,
                            start: "top 70%",
                            once: true,
                        },
                    });
                });

            // Máquina de escribir del terminal
            const lines = gsap.utils.toArray<HTMLElement>(
                ".icv-term-line",
                root
            );
            const stamp = root.querySelector<HTMLElement>(".icv-term-stamp");

            if (prefersReducedMotion()) {
                lines.forEach((line) => {
                    line.textContent = line.dataset.text ?? "";
                });
                if (stamp) gsap.set(stamp, { opacity: 1 });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root.querySelector(".icv-terminal"),
                    start: "top 65%",
                    once: true,
                },
            });

            lines.forEach((line) => {
                const text = line.dataset.text ?? "";
                const state = { n: 0 };
                tl.to(state, {
                    n: text.length,
                    duration: Math.max(0.3, text.length * 0.018),
                    ease: "none",
                    onUpdate: () => {
                        line.textContent = text.slice(0, Math.round(state.n));
                    },
                });
                tl.to({}, { duration: 0.12 });
            });

            if (stamp) {
                tl.fromTo(
                    stamp,
                    { opacity: 0, scale: 1.6, rotate: -14 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: -8,
                        duration: 0.35,
                        ease: "power4.in",
                    }
                );
            }
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative overflow-hidden border-t border-[rgba(234,224,204,0.16)] px-4 py-24 md:px-10 md:py-36 lg:px-24"
        >
            <p className="icv-ai-reveal icv-label mb-12">
                <span className="mr-2 inline-block h-2 w-2 bg-[#ff3d00] align-middle" />
                INFORME DE EVALUACIÓN — MOTOR IA
            </p>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
                {/* Titular que invade el terminal */}
                <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-10">
                    <h2 className="icv-ai-reveal icv-display text-[clamp(2.6rem,8vw,7rem)]">
                        <span className="block text-[#eae0cc]">La IA</span>
                        <span className="block text-[#eae0cc]">no te</span>
                        <span className="icv-outline-amber block">adula.</span>
                    </h2>
                    <p className="icv-ai-reveal mt-8 max-w-md text-sm leading-relaxed text-[#97896d]">
                        Feedback línea a línea en segundos: qué falla, por qué
                        falla y cómo se arregla. Sin humo. Complejidad, casos
                        límite y estilo, todo queda en el informe.
                    </p>
                    <ul className="icv-ai-reveal mt-8 flex flex-wrap gap-3">
                        {["COMPLEJIDAD", "CASOS LÍMITE", "ESTILO", "VEREDICTO"].map(
                            (tag) => (
                                <li
                                    key={tag}
                                    className="icv-label border border-[rgba(234,224,204,0.3)] px-3 py-2 !text-[#eae0cc]"
                                >
                                    {tag}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Terminal CRT */}
                <div className="icv-ai-reveal relative lg:col-span-7 lg:col-start-6 lg:row-start-1">
                    <div className="icv-terminal icv-flicker relative p-6 md:p-8">
                        <Corners />
                        <div className="mb-6 flex items-center justify-between border-b border-[rgba(234,224,204,0.08)] pb-4">
                            <span className="icv-label !text-[#eae0cc]">
                                ICV-EVAL // SALIDA
                            </span>
                            <span className="icv-label tabular-nums">
                                REG 0047
                            </span>
                        </div>
                        <div className="min-h-[16rem] space-y-3 text-[0.72rem] leading-relaxed tracking-[0.08em] md:text-[0.8rem]">
                            {TERMINAL_LINES.map((line) => (
                                <p
                                    key={line.text}
                                    className={`icv-term-line ${TONE_CLASS[line.tone]}`}
                                    data-text={line.text}
                                />
                            ))}
                            <span className="icv-blink inline-block h-4 w-2 bg-[#ffb000] align-middle" />
                        </div>

                        {/* Sello de veredicto */}
                        <span
                            className="icv-term-stamp icv-display absolute bottom-8 right-8 border-2 border-[#ff3d00] px-5 py-2 text-lg text-[#ff3d00] opacity-0"
                            style={{ transform: "rotate(-8deg)" }}
                        >
                            Reintentar
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
