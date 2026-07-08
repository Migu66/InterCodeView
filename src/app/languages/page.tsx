"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import LanguageCard from "@/components/languages/LanguageCard";
import Cursor from "@/components/landing/Cursor";
import { prefersReducedMotion } from "@/components/landing/split";

interface Language {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    color: string;
    isActive: boolean;
}

export default function LanguagesPage() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch("/api/languages");
                if (response.ok) {
                    const data = await response.json();
                    setLanguages(data);
                }
            } catch (error) {
                console.error("Error al cargar lenguajes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    // Revelado escalonado de las losetas al cargar
    useEffect(() => {
        if (loading) return;
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion()) {
                gsap.set([".icv-bank-reveal", ".icv-module"], { opacity: 1 });
                return;
            }
            gsap.fromTo(
                ".icv-bank-reveal",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power4.out",
                }
            );
            gsap.fromTo(
                ".icv-module",
                { opacity: 0, y: 34 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay: 0.25,
                }
            );
        }, root);

        return () => ctx.revert();
    }, [loading]);

    const handleLanguageClick = (slug: string) => {
        router.push(`/languages/${slug}`);
    };

    return (
        <AuthGuard>
            <div ref={rootRef} className="icv relative min-h-screen">
                <Cursor />
                <div className="icv-scan" aria-hidden="true" />
                <Navbar />

                <main className="px-4 pb-24 pt-32 md:px-10 lg:px-24">
                    {/* Cabecera del banco */}
                    <header className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="icv-bank-reveal icv-label mb-6 opacity-0">
                                <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                                BNC/00 — SELECCIÓN DE MÓDULO
                            </p>
                            <h1 className="icv-bank-reveal opacity-0">
                                <span className="icv-display block text-[clamp(2.6rem,8vw,6.5rem)] text-[#eae0cc]">
                                    Banco de
                                </span>
                                <span className="icv-display icv-outline-amber block pl-[4vw] text-[clamp(2.6rem,8vw,6.5rem)]">
                                    pruebas.
                                </span>
                            </h1>
                        </div>

                        <dl
                            className="icv-bank-reveal max-w-xs space-y-2 text-[0.65rem] tracking-[0.2em] text-[#97896d] opacity-0"
                            aria-hidden="true"
                        >
                            <div className="flex justify-between gap-8 border-b border-[rgba(234,224,204,0.08)] pb-2">
                                <dt>MÓDULOS EN BANCO</dt>
                                <dd className="text-[#ffb000]">
                                    {loading
                                        ? "…"
                                        : String(languages.length).padStart(
                                              2,
                                              "0"
                                          )}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-8 border-b border-[rgba(234,224,204,0.08)] pb-2">
                                <dt>MOTOR IA</dt>
                                <dd className="text-[#eae0cc]">EN LÍNEA</dd>
                            </div>
                            <div className="flex justify-between gap-8 pb-2">
                                <dt>ORDEN</dt>
                                <dd className="text-[#eae0cc]">
                                    ELIGE Y DESPEGA
                                </dd>
                            </div>
                        </dl>
                    </header>

                    {/* Cargando */}
                    {loading && (
                        <p className="icv-label icv-blink py-24 text-center !text-[#ffb000]">
                            ▮ CARGANDO MÓDULOS
                        </p>
                    )}

                    {/* Rejilla de losetas */}
                    {!loading && languages.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {languages.map((language, index) => (
                                <LanguageCard
                                    key={language.id}
                                    id={language.id}
                                    name={language.name}
                                    slug={language.slug}
                                    description={language.description}
                                    icon={language.icon}
                                    color={language.color}
                                    index={index}
                                    onClick={handleLanguageClick}
                                />
                            ))}
                        </div>
                    )}

                    {/* Estado vacío */}
                    {!loading && languages.length === 0 && (
                        <div className="border border-[rgba(234,224,204,0.16)] py-24 text-center">
                            <p className="icv-label !text-[#ff3d00]">
                                SIN MÓDULOS EN BANCO — VUELVE PRONTO
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </AuthGuard>
    );
}
