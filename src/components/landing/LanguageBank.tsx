"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LANGUAGES = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Ruby",
    "PHP",
    "SQL",
];

// Tamaños deliberadamente irregulares para romper la retícula
const SIZES = [
    "text-[clamp(2.6rem,7vw,6rem)]",
    "text-[clamp(1.6rem,4vw,3.2rem)]",
    "text-[clamp(2rem,5.5vw,4.6rem)]",
    "text-[clamp(1.3rem,3vw,2.4rem)]",
    "text-[clamp(2.6rem,7vw,6rem)]",
    "text-[clamp(1.6rem,4vw,3.2rem)]",
    "text-[clamp(1.3rem,3vw,2.4rem)]",
    "text-[clamp(2.2rem,6vw,5rem)]",
    "text-[clamp(1.6rem,4vw,3.2rem)]",
    "text-[clamp(1.3rem,3vw,2.4rem)]",
    "text-[clamp(2rem,5.5vw,4.6rem)]",
    "text-[clamp(1.6rem,4vw,3.2rem)]",
    "text-[clamp(2.6rem,7vw,6rem)]",
];

// Muro tipográfico de lenguajes: contorno que se enciende en ámbar
export default function LanguageBank() {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.from(gsap.utils.toArray<HTMLElement>(".icv-lang", root), {
                opacity: 0,
                y: 60,
                duration: 0.7,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: root,
                    start: "top 70%",
                    once: true,
                },
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative border-t border-[rgba(234,224,204,0.16)] px-4 py-24 md:px-10 md:py-32 lg:px-24"
        >
            <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
                <p className="icv-label">
                    <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                    BANCO DE PRUEBAS — 13 LENGUAJES OPERATIVOS
                </p>
                <p className="icv-label hidden md:block">
                    TOCA UNO PARA EMPEZAR ↘
                </p>
            </div>

            <div className="flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-5 md:gap-x-12 md:gap-y-8">
                {LANGUAGES.map((lang, i) => (
                    <Link
                        key={lang}
                        href="/auth/signup"
                        className={`icv-lang icv-display ${SIZES[i]}`}
                        data-cursor-label="PROBAR"
                    >
                        <sup>L-{String(i + 1).padStart(2, "0")}</sup>
                        {lang}
                    </Link>
                ))}
                <span className="icv-display text-[clamp(1rem,2.4vw,1.6rem)] text-[#ff3d00]">
                    + más en camino
                </span>
            </div>
        </section>
    );
}
