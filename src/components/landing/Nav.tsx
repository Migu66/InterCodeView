"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Barra de mando: marca, reloj vivo y accesos, sobre línea de instrumentos
export default function Nav() {
    const [time, setTime] = useState("--:--:--");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })
            );
        };
        tick();
        const id = setInterval(tick, 1000);

        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearInterval(id);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
                scrolled
                    ? "border-[rgba(234,224,204,0.16)] bg-[#0f0c08]/95"
                    : "border-transparent bg-transparent"
            }`}
        >
            <div className="flex items-center justify-between px-4 py-3 md:px-10">
                <Link href="/" className="flex items-baseline gap-3">
                    <span className="icv-display text-base text-[#eae0cc]">
                        ICV
                        <span className="icv-blink text-[#ffb000]">▮</span>
                    </span>
                    <span className="icv-label hidden sm:inline">
                        Simulador de entrevistas técnicas
                    </span>
                </Link>

                <div className="flex items-center gap-4 md:gap-8">
                    <span
                        className="icv-label hidden text-[#eae0cc] md:inline tabular-nums"
                        suppressHydrationWarning
                    >
                        MAD {time}
                    </span>
                    <Link
                        href="/auth/login"
                        className="icv-link"
                        data-cursor-label="ENTRAR"
                    >
                        Entrar
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="icv-btn !px-4 !py-2 !text-[0.65rem]"
                        data-cursor-label="DESPEGAR"
                    >
                        <span className="icv-btn__bg" aria-hidden="true" />
                        <span className="icv-btn__label">
                            <span>Crear cuenta</span>
                            <span aria-hidden="true">Crear cuenta</span>
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
