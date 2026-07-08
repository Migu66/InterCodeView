"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "./Marquee";
import Corners from "./Corners";
import { splitChars, prefersReducedMotion } from "./split";

gsap.registerPlugin(ScrollTrigger);

const LANGS = [
    "PYTHON",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "JAVA",
    "C++",
    "C#",
    "GO",
    "RUST",
    "SWIFT",
    "KOTLIN",
    "RUBY",
    "PHP",
    "SQL",
];

interface HeroProps {
    play: boolean;
}

export default function Hero({ play }: HeroProps) {
    const rootRef = useRef<HTMLElement>(null);

    // Telemetría viva del panel
    const [tele, setTele] = useState({ cpu: 12, lat: 38, sig: 97 });

    useEffect(() => {
        const id = setInterval(() => {
            setTele({
                cpu: 8 + Math.floor(Math.random() * 22),
                lat: 30 + Math.floor(Math.random() * 25),
                sig: 94 + Math.floor(Math.random() * 6),
            });
        }, 1400);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!play) return;

        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion()) {
                gsap.set(
                    [".icv-hero-kicker", ".icv-hero-sub", ".icv-hero-cta", ".icv-hero-panel", ".icv-hero-marquee", ".icv-hero-side"],
                    { opacity: 1 }
                );
                return;
            }

            const tl = gsap.timeline({
                defaults: { ease: "power4.out" },
            });

            // Letras del titular, línea a línea
            root.querySelectorAll<HTMLElement>(".icv-hero-line").forEach(
                (line, i) => {
                    const chars = splitChars(line);
                    gsap.set(chars, { yPercent: 115 });
                    tl.to(
                        chars,
                        {
                            yPercent: 0,
                            duration: 0.9,
                            stagger: 0.035,
                        },
                        0.1 + i * 0.14
                    );
                }
            );

            tl.fromTo(
                ".icv-hero-kicker",
                { opacity: 0, y: -14 },
                { opacity: 1, y: 0, duration: 0.6 },
                0.15
            );
            tl.fromTo(
                ".icv-hero-panel",
                { opacity: 0, x: 60 },
                { opacity: 1, x: 0, duration: 0.9 },
                0.55
            );
            tl.fromTo(
                [".icv-hero-sub", ".icv-hero-cta"],
                { opacity: 0, y: 26 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
                0.75
            );
            tl.fromTo(
                [".icv-hero-marquee", ".icv-hero-side"],
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                1
            );

            // Parallax suave al hacer scroll
            gsap.to(".icv-hero-panel", {
                yPercent: -14,
                ease: "none",
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
            gsap.to(".icv-hero-title", {
                yPercent: 10,
                opacity: 0.25,
                ease: "none",
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, root);

        return () => ctx.revert();
    }, [play]);

    return (
        <section
            ref={rootRef}
            className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-24"
        >
            {/* Etiqueta vertical del borde izquierdo */}
            <p
                className="icv-hero-side icv-label absolute left-4 top-1/2 hidden origin-center -translate-y-1/2 opacity-0 lg:block"
                style={{ writingMode: "vertical-rl" }}
            >
                EST. 2026 — PROGRAMA DE ENTRENAMIENTO PARA CANDIDATOS
            </p>

            <div className="relative flex flex-col items-start px-4 md:px-10 lg:px-24">
                <p className="icv-hero-kicker icv-label mb-8 opacity-0">
                    <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                    SIM/001 — SIMULADOR DE ENTREVISTAS TÉCNICAS CON IA
                </p>

                {/* Titular gigante */}
                <h1 className="icv-hero-title relative z-10">
                    <span className="icv-hero-line icv-display block text-[clamp(3.8rem,14vw,13rem)] text-[#eae0cc]">
                        Falla
                    </span>
                    <span className="icv-hero-line icv-display block pl-[6vw] text-[clamp(3.8rem,14vw,13rem)] text-[#ffb000]">
                        aquí.
                    </span>
                    <span className="icv-hero-line icv-display icv-outline block text-[clamp(1.6rem,5vw,4.6rem)] leading-[1.1]">
                        No en la entrevista.
                    </span>
                </h1>

                {/* Panel de telemetría: en escritorio el titular lo invade,
                    en móvil baja tras los CTAs */}
                <aside
                    className="icv-hero-panel relative z-0 order-last mt-10 w-full max-w-sm border border-[rgba(234,224,204,0.16)] bg-[#16110a]/90 p-5 opacity-0 md:absolute md:right-10 md:top-16 md:mt-0 lg:right-24"
                    aria-hidden="true"
                >
                    <Corners />
                    <div className="mb-4 flex items-center justify-between">
                        <span className="icv-label text-[#eae0cc]">
                            TELEMETRÍA — SIM/001
                        </span>
                        <span className="icv-blink h-2 w-2 bg-[#ffb000]" />
                    </div>
                    <dl className="space-y-2 text-[0.7rem] tracking-[0.14em]">
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt className="text-[#97896d]">ESTADO</dt>
                            <dd className="text-[#ffb000]">EN ESPERA</dd>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt className="text-[#97896d]">CANDIDATO</dt>
                            <dd className="icv-blink text-[#ff3d00]">
                                SIN REGISTRAR
                            </dd>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt className="text-[#97896d]">EJERCICIOS</dt>
                            <dd className="text-[#eae0cc]">500+ EN BANCO</dd>
                        </div>
                        <div className="flex justify-between border-b border-[rgba(234,224,204,0.08)] pb-2">
                            <dt className="text-[#97896d]">MOTOR IA</dt>
                            <dd className="text-[#eae0cc]">EN LÍNEA</dd>
                        </div>
                        <div className="flex justify-between pt-1 tabular-nums">
                            <dt className="text-[#97896d]">
                                CPU {String(tele.cpu).padStart(2, "0")}%
                            </dt>
                            <dd className="text-[#97896d]">
                                LAT {tele.lat}ms · SIG {tele.sig}%
                            </dd>
                        </div>
                    </dl>
                </aside>

                <div className="mt-10 max-w-xl lg:mt-14">
                    <p className="icv-hero-sub text-sm leading-relaxed text-[#97896d] opacity-0">
                        Ejercicios reales de entrevista, un editor de verdad y
                        una IA que corrige sin piedad. Horas de simulación para
                        que el día D no te tiemble el pulso.
                    </p>
                    <div className="icv-hero-cta mt-8 flex flex-wrap items-center gap-6 opacity-0">
                        <Link
                            href="/auth/signup"
                            className="icv-btn"
                            data-cursor-label="DESPEGAR"
                        >
                            <span className="icv-btn__bg" aria-hidden="true" />
                            <span className="icv-btn__label">
                                <span>Iniciar simulación →</span>
                                <span aria-hidden="true">
                                    Iniciar simulación →
                                </span>
                            </span>
                        </Link>
                        <Link
                            href="/auth/login"
                            className="icv-link"
                            data-cursor-label="ENTRAR"
                        >
                            Ya tengo acceso
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cinta de lenguajes */}
            <div className="icv-hero-marquee mt-16 border-y border-[rgba(234,224,204,0.16)] py-3 opacity-0">
                <Marquee duration={26}>
                    {LANGS.map((lang) => (
                        <span
                            key={lang}
                            className="icv-display flex items-center text-sm text-[#97896d]"
                        >
                            <span className="px-6">{lang}</span>
                            <span className="text-[#ffb000]">▪</span>
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
