"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Corners from "./Corners";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        code: "T-03",
        title: "Elige el lenguaje",
        copy: "Trece lenguajes operativos y subiendo. Python, TypeScript, Rust… selecciona con qué vas a pelear la plaza.",
        detail: "BANCO · 13 LENGUAJES",
    },
    {
        code: "T-02",
        title: "Resuelve en cabina",
        copy: "Editor real dentro de la plataforma. Sin copiar y pegar a otro sitio: escribes, ejecutas y entregas aquí.",
        detail: "EDITOR · MONACO",
    },
    {
        code: "T-01",
        title: "La IA te audita",
        copy: "Corrección instantánea, línea a línea. Complejidad, casos límite y estilo: todo queda en el informe.",
        detail: "MOTOR · EVALUACIÓN IA",
    },
    {
        code: "T-00",
        title: "Despegue",
        copy: "Llegas a la entrevista real con horas de simulación encima. Los nervios se quedan en el simulador.",
        detail: "ESTADO · APTO",
        final: true,
    },
];

// Sección pineada con desplazamiento horizontal: la "cuenta atrás"
// del protocolo de entrenamiento. En móvil degrada a pila vertical.
export default function FlightSequence() {
    const rootRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);
    const needleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const track = trackRef.current;
        if (!root || !track) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                desktop:
                    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
                mobile: "(max-width: 767px), (prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { desktop } = context.conditions as {
                    desktop: boolean;
                };

                if (desktop) {
                    const getAmount = () =>
                        track.scrollWidth - window.innerWidth;

                    gsap.to(track, {
                        x: () => -getAmount(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: root,
                            start: "top top",
                            end: () => `+=${getAmount()}`,
                            scrub: 1,
                            pin: true,
                            invalidateOnRefresh: true,
                            onUpdate: (self) => {
                                if (barRef.current) {
                                    barRef.current.style.transform = `scaleX(${self.progress})`;
                                }
                                if (countRef.current) {
                                    const step = Math.min(
                                        3,
                                        Math.floor(self.progress * 4)
                                    );
                                    countRef.current.textContent = `T-0${3 - step}`;
                                }
                                if (needleRef.current) {
                                    needleRef.current.style.transform = `rotate(${-90 + self.progress * 180}deg)`;
                                }
                            },
                        },
                    });
                } else {
                    gsap.utils
                        .toArray<HTMLElement>(".icv-step", root)
                        .forEach((panel) => {
                            gsap.from(panel, {
                                opacity: 0,
                                y: 50,
                                duration: 0.8,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    start: "top 82%",
                                    once: true,
                                },
                            });
                        });
                }
            }
        );

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative overflow-hidden border-t border-[rgba(234,224,204,0.16)] bg-[#0f0c08]"
        >
            {/* Cabecera de instrumentos de la sección (despeja el nav fijo) */}
            <div className="flex items-center justify-between px-4 pt-20 md:px-10">
                <p className="icv-label">
                    <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                    SECUENCIA DE ENTRENAMIENTO — 04 FASES
                </p>
                <div className="flex items-center gap-6">
                    {/* Dial con aguja ligada al scroll */}
                    <div
                        className="relative hidden h-10 w-10 rounded-full border border-[rgba(234,224,204,0.3)] md:block"
                        aria-hidden="true"
                    >
                        <div
                            ref={needleRef}
                            className="absolute left-1/2 top-1/2 h-4 w-px origin-bottom bg-[#ff3d00]"
                            style={{
                                transform: "rotate(-90deg)",
                                marginTop: "-1rem",
                            }}
                        />
                        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eae0cc]" />
                    </div>
                    <span
                        ref={countRef}
                        className="icv-display text-2xl text-[#ffb000] tabular-nums"
                    >
                        T-03
                    </span>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="mx-4 mt-4 h-px bg-[rgba(234,224,204,0.16)] md:mx-10">
                <div
                    ref={barRef}
                    className="h-full origin-left bg-[#ffb000] will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* Pista horizontal */}
            <div
                ref={trackRef}
                className="flex flex-col md:h-[calc(100vh-10.5rem)] md:w-max md:flex-row md:items-stretch will-change-transform"
            >
                {STEPS.map((step, i) => (
                    <article
                        key={step.code}
                        className={`icv-step relative flex min-h-[70vh] w-full shrink-0 flex-col justify-between border-b border-[rgba(234,224,204,0.16)] p-6 md:min-h-0 md:w-[68vw] md:border-b-0 md:border-r md:p-12 ${
                            step.final ? "bg-[#16110a]" : ""
                        }`}
                    >
                        {/* Numeral gigante: alterna esquina según panel */}
                        <span
                            className={`icv-display pointer-events-none absolute text-[clamp(7rem,24vw,20rem)] leading-none opacity-90 ${
                                step.final
                                    ? "icv-outline-amber bottom-4 right-4"
                                    : i % 2 === 0
                                      ? "icv-outline -top-4 right-6"
                                      : "icv-outline -bottom-6 left-6"
                            }`}
                            aria-hidden="true"
                        >
                            {step.code}
                        </span>

                        <header className="relative z-10 flex items-start justify-between gap-6">
                            <p className="icv-label">{step.detail}</p>
                            <span
                                className={`icv-switch ${step.final ? "is-on" : ""}`}
                                aria-hidden="true"
                            />
                        </header>

                        <div
                            className={`relative z-10 max-w-md ${
                                i % 2 === 1 ? "md:self-end md:text-right" : ""
                            }`}
                        >
                            <h3
                                className={`icv-display mb-6 text-[clamp(1.8rem,4.4vw,3.6rem)] ${
                                    step.final
                                        ? "text-[#ffb000]"
                                        : "text-[#eae0cc]"
                                }`}
                            >
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[#97896d]">
                                {step.copy}
                            </p>

                            {step.final && (
                                <div className="relative mt-8 inline-block">
                                    <span className="icv-display inline-block -rotate-6 border-2 border-[#ff3d00] px-6 py-2 text-xl text-[#ff3d00]">
                                        APTO
                                    </span>
                                    <Corners />
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
