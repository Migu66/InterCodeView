"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

// Secuencia final: cuenta atrás en cero y botón de ignición
export default function LaunchCTA() {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.utils
                .toArray<HTMLElement>(".icv-cta-reveal", root)
                .forEach((el, i) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 50,
                        duration: 0.9,
                        delay: i * 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: root,
                            start: "top 70%",
                            once: true,
                        },
                    });
                });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative overflow-hidden border-t border-[rgba(234,224,204,0.16)]"
        >
            {/* Aviso en cinta */}
            <div className="border-b border-[rgba(234,224,204,0.16)] py-2">
                <Marquee duration={18}>
                    <span className="icv-label flex items-center !text-[#ff3d00]">
                        <span className="px-5">DESPEGUE INMINENTE</span>
                        <span aria-hidden="true">▲</span>
                        <span className="px-5">TU PLAZA NO VA A ESPERAR</span>
                        <span aria-hidden="true">▲</span>
                    </span>
                </Marquee>
            </div>

            <div className="px-4 py-24 md:px-10 md:py-36 lg:px-24">
                <p className="icv-cta-reveal icv-label mb-10">
                    <span className="mr-2 inline-block h-2 w-2 bg-[#ff3d00] align-middle" />
                    SECUENCIA FINAL
                </p>

                <p
                    className="icv-cta-reveal icv-display whitespace-nowrap text-[clamp(1.8rem,7.5vw,7rem)] leading-none text-[#eae0cc] tabular-nums"
                    aria-hidden="true"
                >
                    T-00
                    <span className="icv-blink text-[#ffb000]">:</span>00
                    <span className="icv-blink text-[#ffb000]">:</span>00
                </p>

                <h2 className="icv-cta-reveal icv-display icv-outline mt-6 max-w-4xl text-[clamp(1.4rem,3.6vw,3rem)] leading-[1.15]">
                    La cuenta atrás de tu próxima entrevista ya ha empezado.
                </h2>

                <div className="icv-cta-reveal mt-12 flex flex-wrap items-center gap-8">
                    <Link
                        href="/auth/signup"
                        className="icv-btn icv-btn--red !px-10 !py-5 !text-sm"
                        data-cursor-label="IGNICIÓN"
                    >
                        <span className="icv-btn__bg" aria-hidden="true" />
                        <span className="icv-btn__label">
                            <span>Iniciar secuencia de registro →</span>
                            <span aria-hidden="true">
                                Iniciar secuencia de registro →
                            </span>
                        </span>
                    </Link>
                    <Link
                        href="/auth/login"
                        className="icv-link"
                        data-cursor-label="ENTRAR"
                    >
                        Ya tengo credenciales
                    </Link>
                </div>

                <p className="icv-cta-reveal icv-label mt-10">
                    GRATIS PARA SIEMPRE · SIN TARJETA · CANCELA CUANDO QUIERAS
                    (NO HAY NADA QUE CANCELAR)
                </p>
            </div>
        </section>
    );
}
