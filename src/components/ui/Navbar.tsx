"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import Corners from "@/components/landing/Corners";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [time, setTime] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reloj de consola
    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    if (!user) return null;

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(234,224,204,0.16)] bg-[#0f0c08]">
            <div className="flex items-center justify-between px-4 py-4 md:px-10">
                {/* Identificador de consola */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/languages"
                        className="icv-display text-sm tracking-[0.2em] text-[#eae0cc]"
                        data-cursor-label="BANCO"
                    >
                        ICV<span className="icv-blink text-[#ffb000]">▮</span>
                    </Link>
                    <span className="icv-label hidden lg:inline">
                        CONSOLA DE ENTRENAMIENTO — SIM/001
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <span
                        className="icv-label hidden tabular-nums sm:inline"
                        suppressHydrationWarning
                    >
                        T+ {time}
                    </span>

                    <Link
                        href="/languages"
                        className="icv-link hidden md:inline-block"
                        data-cursor-label="BANCO"
                    >
                        BANCO DE PRUEBAS
                    </Link>

                    {/* Ficha del candidato */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            data-cursor-label="FICHA"
                            className={`flex items-center gap-3 border px-3 py-2 transition-colors duration-300 ${
                                isUserMenuOpen
                                    ? "border-[#ffb000]"
                                    : "border-[rgba(234,224,204,0.16)] hover:border-[#ffb000]"
                            }`}
                        >
                            <span className="flex h-8 w-8 items-center justify-center overflow-hidden border border-[rgba(234,224,204,0.16)] bg-[#16110a] text-xs text-[#ffb000]">
                                {user.avatarUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user.name?.charAt(0).toUpperCase()
                                )}
                            </span>
                            <span className="icv-label hidden !text-[#eae0cc] md:inline">
                                {user.name}
                            </span>
                            <span
                                className={`text-[0.6rem] text-[#97896d] transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            >
                                ▼
                            </span>
                        </button>

                        {/* Panel desplegable */}
                        {isUserMenuOpen && (
                            <div className="icv-panel absolute right-0 mt-3 w-72 bg-[#16110a]">
                                <Corners />
                                <div className="border-b border-[rgba(234,224,204,0.16)] p-4">
                                    <p className="icv-label mb-2">
                                        FICHA DEL CANDIDATO
                                    </p>
                                    <p className="text-sm text-[#eae0cc]">
                                        {user.name}
                                    </p>
                                    <p className="mt-1 break-all text-[0.65rem] tracking-[0.08em] text-[#97896d]">
                                        {user.email}
                                    </p>
                                </div>

                                <Link
                                    href="/profile"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    data-cursor-label="ABRIR"
                                    className="group flex items-center justify-between border-b border-[rgba(234,224,204,0.16)] px-4 py-3 text-[0.65rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:bg-[#0f0c08] hover:text-[#ffb000]"
                                >
                                    EXPEDIENTE / PERFIL
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                                <button
                                    onClick={() => {
                                        logout();
                                        setIsUserMenuOpen(false);
                                    }}
                                    data-cursor-label="CORTAR"
                                    className="group flex w-full items-center justify-between px-4 py-3 text-left text-[0.65rem] tracking-[0.22em] text-[#ff3d00] transition-colors duration-300 hover:bg-[#ff3d00]/10"
                                >
                                    CORTAR TRANSMISIÓN
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        ⏻
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
