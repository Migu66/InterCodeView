"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import PrimaryButton from "@/components/basics/PrimaryButton";
import SecondaryButton from "@/components/basics/SecondaryButton";
import { useAuth } from "@/contexts/AuthContext";
import Script from "next/script";

// Lazy load de componentes pesados
const DotGrid = dynamic(() => import("@/components/ui/DotGrid"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-0 bg-black" />,
});

const AnimatedCodeWindow = dynamic(
    () => import("@/components/home/AnimatedCodeWindow"),
    {
        ssr: false,
    }
);

const FeaturesSection = dynamic(
    () => import("@/components/home/FeaturesSection"),
    {
        ssr: false,
    }
);

const LanguagesSection = dynamic(
    () => import("@/components/home/LanguagesSection"),
    {
        ssr: false,
    }
);

const Footer = dynamic(() => import("@/components/Footer"), {
    ssr: false,
});

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        if (!loading && user) {
            router.push("/languages");
        }
    }, [user, loading, router]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Mostrar pantalla de carga mientras se verifica la autenticación
    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
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
                <div className="relative z-10 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* JSON-LD para SEO */}
            <Script
                id="schema-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "InterCodeView",
                        description:
                            "Plataforma interactiva para preparar entrevistas técnicas de programación con ejercicios en múltiples lenguajes",
                        url: "https://inter-code-view.vercel.app",
                        applicationCategory: "EducationalApplication",
                        operatingSystem: "Web",
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "USD",
                        },
                        featureList: [
                            "Ejercicios de programación interactivos",
                            "Corrección con IA",
                            "Múltiples lenguajes de programación",
                            "Preparación para entrevistas técnicas",
                        ],
                        inLanguage: "es",
                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: "5",
                            ratingCount: "1",
                        },
                    }),
                }}
            />

            {/* DotGrid Background - Fixed Full Page */}
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

            {/* Main Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="container mx-auto px-6 pt-20 pb-32">
                    <div
                        className={`text-center transition-all duration-1000 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        {/* Logo/Title with Glitch Effect */}
                        <div className="mb-8 relative inline-block">
                            <h1 className="text-8xl font-black tracking-tighter relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 animate-gradient-x">
                                    InterCodeView
                                </span>
                                <span className="absolute top-0 left-0 text-green-500 opacity-50 animate-glitch-1">
                                    InterCodeView
                                </span>
                                <span className="absolute top-0 left-0 text-green-300 opacity-50 animate-glitch-2">
                                    InterCodeView
                                </span>
                            </h1>

                            {/* Animated Border */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-300 rounded-lg opacity-30 blur-xl animate-pulse-slow"></div>
                        </div>

                        {/* Tagline with Typing Effect */}
                        <p className="text-2xl md:text-3xl text-green-400 font-light mb-8 animate-fade-in-up animation-delay-200">
                            &gt; Prepárate para tu próxima entrevista técnica
                        </p>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
                            Practica con ejercicios reales, recibe corrección
                            instantánea con IA, y mejora tus habilidades de
                            programación para{" "}
                            <span className="text-green-400 font-semibold animate-pulse">
                                destacar en cualquier entrevista
                            </span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-600">
                            <PrimaryButton
                                text="Comenzar Ahora"
                                href="/auth/signup"
                                size="md"
                            />

                            <SecondaryButton
                                text="Inicia sesión"
                                href="/auth/login"
                            />
                        </div>

                        {/* Animated Code Window */}
                        <AnimatedCodeWindow />
                    </div>
                </div>

                {/* Features Section */}
                <FeaturesSection />

                {/* Languages Section */}
                <LanguagesSection />

                {/* Stats Section */}
                <div className="container mx-auto px-6 py-20">
                    <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-12 border border-green-500/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div className="animate-fade-in-up">
                                <div className="text-6xl font-black text-green-400 mb-3 animate-pulse">
                                    500+
                                </div>
                                <div className="text-xl text-gray-400">
                                    Ejercicios Disponibles
                                </div>
                            </div>
                            <div className="animate-fade-in-up animation-delay-200">
                                <div className="text-6xl font-black text-green-400 mb-3 animate-pulse">
                                    IA
                                </div>
                                <div className="text-xl text-gray-400">
                                    Corrección Inteligente
                                </div>
                            </div>
                            <div className="animate-fade-in-up animation-delay-400">
                                <div className="text-6xl font-black text-green-400 mb-3 animate-pulse">
                                    24/7
                                </div>
                                <div className="text-xl text-gray-400">
                                    Disponible Siempre
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-6xl font-bold mb-8 animate-fade-in-up">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                            ¿Listo para el desafío?
                        </span>
                    </h2>
                    <p className="text-2xl text-gray-400 mb-12 animate-fade-in-up animation-delay-200">
                        Únete ahora y lleva tus habilidades al siguiente nivel
                    </p>
                    <PrimaryButton
                        text="Comenzar Gratis"
                        href="/auth/signup"
                        size="lg"
                        className="animate-fade-in-up animation-delay-400"
                    />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
