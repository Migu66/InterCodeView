"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./split";

gsap.registerPlugin(ScrollTrigger);

const READOUTS = [
    { value: "13", label: "Lenguajes operativos", note: "Y AMPLIANDO" },
    {
        value: "24/7",
        label: "Simulador sin cierre",
        note: "SIN VENTANAS DE MANTENIMIENTO",
    },
    { value: "GRATIS", label: "Para siempre", note: "SIN TARJETA · SIN TRUCO" },
];

// Panel de instrumentos: un contador gigante y tres lecturas secundarias
export default function Instruments() {
    const rootRef = useRef<HTMLElement>(null);
    const bigRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.utils
                .toArray<HTMLElement>(".icv-inst-reveal", root)
                .forEach((el, i) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: root,
                            start: "top 72%",
                            once: true,
                        },
                    });
                });

            // Odómetro del contador principal
            const big = bigRef.current;
            if (!big) return;

            if (prefersReducedMotion()) {
                big.textContent = "500";
                return;
            }

            const state = { v: 0 };
            gsap.to(state, {
                v: 500,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: root,
                    start: "top 72%",
                    once: true,
                },
                onUpdate: () => {
                    big.textContent = String(Math.round(state.v)).padStart(
                        3,
                        "0"
                    );
                },
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative border-t border-[rgba(234,224,204,0.16)] bg-[#16110a] px-4 py-24 md:px-10 md:py-32 lg:px-24"
        >
            <p className="icv-inst-reveal icv-label mb-14">
                <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                LECTURAS DEL SISTEMA
            </p>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                {/* Contador principal */}
                <div className="icv-inst-reveal lg:col-span-7">
                    <div className="icv-display flex items-start text-[#ffb000]">
                        <span
                            ref={bigRef}
                            className="text-[clamp(5rem,15vw,13rem)] leading-none tabular-nums"
                        >
                            000
                        </span>
                        <span className="mt-3 text-[clamp(1.8rem,5vw,4rem)] leading-none md:mt-6">
                            +
                        </span>
                    </div>
                    <p className="icv-display mt-4 text-[clamp(1.1rem,2.6vw,2rem)] text-[#eae0cc]">
                        Ejercicios en banco
                    </p>
                    <p className="icv-label mt-3">
                        TÍPICOS DE ENTREVISTA REAL · AMPLIÁNDOSE CADA SEMANA
                    </p>
                </div>

                {/* Lecturas secundarias */}
                <div className="lg:col-span-5">
                    {READOUTS.map((item) => (
                        <div
                            key={item.label}
                            className="icv-inst-reveal flex items-baseline justify-between gap-6 border-t border-[rgba(234,224,204,0.16)] py-7 first:border-t-0 lg:first:border-t"
                        >
                            <div>
                                <span className="icv-display block text-[clamp(1.8rem,4vw,3rem)] text-[#eae0cc]">
                                    {item.value}
                                </span>
                                <span className="icv-label mt-2 block">
                                    {item.note}
                                </span>
                            </div>
                            <p className="max-w-[10rem] text-right text-xs leading-relaxed text-[#97896d]">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
