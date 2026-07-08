"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import ExercisesTable from "@/components/languages/ExercisesTable";
import Cursor from "@/components/landing/Cursor";
import { prefersReducedMotion } from "@/components/landing/split";

interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    order: number;
}

interface Language {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string | null;
    color: string;
}

interface ExercisesData {
    language: Language;
    exercises: {
        easy: Exercise[];
        medium: Exercise[];
        hard: Exercise[];
    };
    total: number;
}

export default function LanguageExercisesPage() {
    const params = useParams();
    const router = useRouter();
    const languageId = params?.languageId as string;

    const [data, setData] = useState<ExercisesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(
                    `/api/languages/${languageId}/exercises`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar los ejercicios");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        };

        if (languageId) {
            fetchExercises();
        }
    }, [languageId]);

    // Revelado al cargar
    useEffect(() => {
        if (loading || !data) return;
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion()) {
                gsap.set(".icv-mod-reveal", { opacity: 1 });
                return;
            }
            gsap.fromTo(
                ".icv-mod-reveal",
                { opacity: 0, y: 26 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.09,
                    ease: "power4.out",
                }
            );
        }, root);

        return () => ctx.revert();
    }, [loading, data]);

    if (loading) {
        return (
            <AuthGuard>
                <div className="icv relative min-h-screen">
                    <div className="icv-scan" aria-hidden="true" />
                    <Navbar />
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <p className="icv-label icv-blink !text-[#ffb000]">
                            ▮ CARGANDO MANIFIESTO
                        </p>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (error || !data) {
        return (
            <AuthGuard>
                <div className="icv relative min-h-screen">
                    <Cursor />
                    <div className="icv-scan" aria-hidden="true" />
                    <Navbar />
                    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
                        <p className="icv-label !text-[#ff3d00]">
                            <span className="icv-blink mr-2">▮</span>
                            FALLO DE LECTURA —{" "}
                            {(error || "SIN DATOS").toUpperCase()}
                        </p>
                        <button
                            onClick={() => router.push("/languages")}
                            className="icv-link"
                            data-cursor-label="VOLVER"
                        >
                            ← VOLVER AL BANCO DE PRUEBAS
                        </button>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    const { language, exercises, total } = data;

    const readouts = [
        { label: "TOTAL", value: total, color: "#eae0cc" },
        { label: "FÁCIL — SECCIÓN A", value: exercises.easy.length, color: "#eae0cc" },
        { label: "MEDIO — SECCIÓN B", value: exercises.medium.length, color: "#ffb000" },
        { label: "DIFÍCIL — SECCIÓN C", value: exercises.hard.length, color: "#ff3d00" },
    ];

    return (
        <AuthGuard>
            <div ref={rootRef} className="icv relative min-h-screen">
                <Cursor />
                <div className="icv-scan" aria-hidden="true" />
                <Navbar />

                <main className="px-4 pb-24 pt-32 md:px-10 lg:px-24">
                    <button
                        onClick={() => router.push("/languages")}
                        className="icv-mod-reveal icv-link opacity-0"
                        data-cursor-label="VOLVER"
                    >
                        ← BANCO DE PRUEBAS
                    </button>

                    {/* Cabecera del módulo */}
                    <header className="mb-16 mt-10">
                        <p className="icv-mod-reveal icv-label mb-6 opacity-0">
                            <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                            MÓDULO {language.slug.toUpperCase()} — MANIFIESTO
                            DE EJERCICIOS
                        </p>
                        <h1 className="icv-mod-reveal icv-display text-[clamp(2.6rem,9vw,7.5rem)] text-[#ffb000] opacity-0">
                            {language.name}
                        </h1>
                        {language.description && (
                            <p className="icv-mod-reveal mt-6 max-w-xl text-sm leading-relaxed text-[#97896d] opacity-0">
                                {language.description}
                            </p>
                        )}

                        {/* Lecturas del módulo */}
                        <dl className="icv-mod-reveal mt-12 grid grid-cols-2 border border-[rgba(234,224,204,0.16)] opacity-0 md:grid-cols-4">
                            {readouts.map((r, i) => (
                                <div
                                    key={r.label}
                                    className={`border-[rgba(234,224,204,0.16)] p-5 ${i > 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "max-md:border-l" : ""} ${i >= 2 ? "max-md:border-t" : ""}`}
                                >
                                    <dd
                                        className="icv-display text-[clamp(1.6rem,3.5vw,2.6rem)]"
                                        style={{ color: r.color }}
                                    >
                                        {String(r.value).padStart(2, "0")}
                                    </dd>
                                    <dt className="icv-label mt-2">
                                        {r.label}
                                    </dt>
                                </div>
                            ))}
                        </dl>
                    </header>

                    {/* Sin ejercicios */}
                    {total === 0 && (
                        <div className="icv-mod-reveal border border-[rgba(234,224,204,0.16)] py-24 text-center opacity-0">
                            <p className="icv-label !text-[#ff3d00]">
                                SIN EJERCICIOS EN ESTE MÓDULO — VUELVE PRONTO
                            </p>
                        </div>
                    )}

                    {/* Secciones del manifiesto */}
                    {total > 0 && (
                        <div className="icv-mod-reveal opacity-0">
                            <ExercisesTable
                                exercises={exercises.easy}
                                difficulty="EASY"
                                languageId={languageId}
                                title="Fácil"
                                description="Toma de contacto con los conceptos básicos"
                                accentColor={language.color}
                            />

                            <ExercisesTable
                                exercises={exercises.medium}
                                difficulty="MEDIUM"
                                languageId={languageId}
                                title="Medio"
                                description="Desafíos intermedios para ganar altitud"
                                accentColor={language.color}
                            />

                            <ExercisesTable
                                exercises={exercises.hard}
                                difficulty="HARD"
                                languageId={languageId}
                                title="Difícil"
                                description="Retos avanzados para poner a prueba tu dominio"
                                accentColor={language.color}
                            />
                        </div>
                    )}
                </main>
            </div>
        </AuthGuard>
    );
}
