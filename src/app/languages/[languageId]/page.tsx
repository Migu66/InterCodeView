"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import ExercisesTable from "@/components/languages/ExercisesTable";
import LanguageIcon from "@/components/languages/LanguageIcon";
import DotGrid from "@/components/ui/DotGrid";
import { FiArrowLeft, FiTarget, FiTrendingUp, FiZap } from "react-icons/fi";

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

    if (loading) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-black text-white relative overflow-hidden">
                    {/* DotGrid Background */}
                    <div className="fixed inset-0 z-0">
                        <DotGrid
                            dotSize={5}
                            gap={15}
                            baseColor="#271e37"
                            activeColor="#00ff9d"
                            proximity={100}
                            shockRadius={180}
                            shockStrength={2}
                            resistance={1500}
                            returnDuration={3}
                        />
                    </div>

                    <div className="relative z-10">
                        <Navbar />
                        <div className="pt-24 px-6 flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00ff9d] mx-auto mb-4"></div>
                                <p className="text-gray-400">
                                    Cargando ejercicios...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (error || !data) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-black text-white relative overflow-hidden">
                    {/* DotGrid Background */}
                    <div className="fixed inset-0 z-0">
                        <DotGrid
                            dotSize={5}
                            gap={15}
                            baseColor="#271e37"
                            activeColor="#00ff9d"
                            proximity={100}
                            shockRadius={180}
                            shockStrength={2}
                            resistance={1500}
                            returnDuration={3}
                        />
                    </div>

                    <div className="relative z-10">
                        <Navbar />
                        <div className="pt-24 px-6 flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <p className="text-red-400 text-xl mb-4">
                                    {error || "No se encontraron datos"}
                                </p>
                                <button
                                    onClick={() => router.push("/languages")}
                                    className="text-[#00ff9d] hover:underline"
                                >
                                    Volver a lenguajes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    const { language, exercises, total } = data;

    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                {/* DotGrid Background */}
                <div className="fixed inset-0 z-0">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271e37"
                        activeColor="#00ff9d"
                        proximity={100}
                        shockRadius={180}
                        shockStrength={2}
                        resistance={1500}
                        returnDuration={3}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Navbar />

                    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
                        {/* Botón volver */}
                        <button
                            onClick={() => router.push("/languages")}
                            className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors mb-12 group mt-10 ml-10"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Volver a lenguajes</span>
                        </button>

                        {/* Header mejorado */}
                        <div className="text-center mb-20">
                            {/* Icono del lenguaje con efecto glow */}
                            <div className="relative inline-block mb-8">
                                <div
                                    className="absolute inset-0 rounded-3xl blur-xl opacity-50"
                                    style={{ backgroundColor: language.color }}
                                />
                                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                                    <LanguageIcon
                                        icon={language.icon ?? null}
                                        slug={language.slug}
                                        className="text-5xl"
                                        color={language.color}
                                    />
                                </div>
                            </div>

                            {/* Título con gradiente mejorado */}
                            <h1 className="text-6xl md:text-7xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    Ejercicios de
                                </span>
                                <br />
                                <span
                                    className="bg-gradient-to-r bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${language.color}, #00ff9d)`,
                                    }}
                                >
                                    {language.name}
                                </span>
                            </h1>

                            {language.description && (
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                                    {language.description}
                                </p>
                            )}

                            {/* Stats cards mejorados */}
                            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
                                {/* Total de ejercicios */}
                                <div className="flex-1 min-w-[200px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <FiTarget className="text-2xl text-[#00ff9d]" />
                                        <span className="text-3xl font-bold text-white">
                                            {total}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Ejercicios totales
                                    </p>
                                </div>

                                {/* Nivel fácil */}
                                <div className="flex-1 min-w-[200px] bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <div className="w-4 h-4 rounded-full bg-green-400"></div>
                                        <span className="text-3xl font-bold text-green-400">
                                            {exercises.easy.length}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {exercises.easy.length === 1
                                            ? "Fácil"
                                            : "Fáciles"}
                                    </p>
                                </div>

                                {/* Nivel medio */}
                                <div className="flex-1 min-w-[200px] bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <FiTrendingUp className="text-2xl text-yellow-400" />
                                        <span className="text-3xl font-bold text-yellow-400">
                                            {exercises.medium.length}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {exercises.medium.length === 1
                                            ? "Medio"
                                            : "Medios"}
                                    </p>
                                </div>

                                {/* Nivel difícil */}
                                <div className="flex-1 min-w-[200px] bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-3 mb-2">
                                        <FiZap className="text-2xl text-red-400" />
                                        <span className="text-3xl font-bold text-red-400">
                                            {exercises.hard.length}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {exercises.hard.length === 1
                                            ? "Difícil"
                                            : "Difíciles"}
                                    </p>
                                </div>
                            </div>

                            {total === 0 && (
                                <div className="mt-12 p-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto">
                                    <LanguageIcon
                                        icon={language.icon ?? null}
                                        slug={language.slug}
                                        className="text-5xl text-gray-500 mx-auto mb-4"
                                    />
                                    <p className="text-gray-400 text-lg">
                                        Aún no hay ejercicios disponibles para
                                        este lenguaje.
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        ¡Vuelve pronto para ver nuevos desafíos!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Secciones de ejercicios */}
                        {total > 0 && (
                            <div className="space-y-20">
                                <ExercisesTable
                                    exercises={exercises.easy}
                                    difficulty="EASY"
                                    languageId={languageId}
                                    title="Nivel Fácil"
                                    description="Ejercicios para comenzar y familiarizarte con los conceptos básicos"
                                    accentColor={language.color}
                                />

                                <ExercisesTable
                                    exercises={exercises.medium}
                                    difficulty="MEDIUM"
                                    languageId={languageId}
                                    title="Nivel Medio"
                                    description="Desafíos intermedios para mejorar tus habilidades"
                                    accentColor={language.color}
                                />

                                <ExercisesTable
                                    exercises={exercises.hard}
                                    difficulty="HARD"
                                    languageId={languageId}
                                    title="Nivel Difícil"
                                    description="Retos avanzados para poner a prueba tu dominio"
                                    accentColor={language.color}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
