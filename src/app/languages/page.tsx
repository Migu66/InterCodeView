"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import LanguageCard from "@/components/languages/LanguageCard";
import DotGrid from "@/components/ui/DotGrid";

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

    const handleLanguageClick = (slug: string) => {
        router.push(`/languages/${slug}`);
    };

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
                    <div className="pt-24 px-6 pb-20">
                        <div className="container mx-auto max-w-7xl">
                            {/* Header */}
                            <div className="text-center mb-16 mt-10">
                                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                                        Elige tu lenguaje de programación
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-400 mt-4">
                                    Selecciona un lenguaje para comenzar a
                                    practicar
                                </p>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
                                </div>
                            )}

                            {/* Languages Grid - 3 Columns */}
                            {!loading && languages.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                            {/* Empty State */}
                            {!loading && languages.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-2xl text-gray-400">
                                        No hay lenguajes disponibles en este
                                        momento
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
