"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DotGrid from "@/components/ui/DotGrid";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: "🎯",
            title: "Ejercicios Reales",
            description:
                "Practica con ejercicios típicos de entrevistas técnicas",
        },
        {
            icon: "🤖",
            title: "Corrección IA",
            description:
                "Recibe feedback detallado y personalizado al instante",
        },
        {
            icon: "📊",
            title: "Progreso & Stats",
            description: "Monitorea tu evolución y mejora continua",
        },
        {
            icon: "💻",
            title: "Editor Integrado",
            description: "Escribe código directamente en la plataforma",
        },
    ];

    const languages = ["Python", "JavaScript", "Java", "C++", "SQL", "Go"];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* LiquidEther Background - Fixed Full Page */}
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
                            <Link href="/auth/signup">
                                <button className="group relative px-12 py-5 bg-green-500 text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Comenzar Ahora
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            →
                                        </span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 bg-green-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                </button>
                            </Link>

                            <Link href="/auth/login">
                                <button className="group px-12 py-5 bg-transparent border-2 border-green-500 text-green-500 font-bold text-lg rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30">
                                    <span className="flex items-center gap-2">
                                        Inicia sesión
                                    </span>
                                </button>
                            </Link>
                        </div>

                        {/* Animated Code Window */}
                        <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
                            <div className="bg-gray-900 rounded-lg overflow-hidden border border-green-500/30 shadow-2xl shadow-green-500/20">
                                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-green-500/30">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-100"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-200"></div>
                                    </div>
                                    <span className="text-xs text-green-400 ml-4 font-mono">
                                        code-challenge.py
                                    </span>
                                </div>
                                <div className="p-6 font-mono text-sm text-left">
                                    <div className="space-y-2">
                                        <div className="flex">
                                            <span className="text-gray-500 select-none w-8">
                                                1
                                            </span>
                                            <span className="text-purple-400">
                                                def
                                            </span>
                                            <span className="text-blue-400">
                                                {" "}
                                                reverse_string
                                            </span>
                                            <span className="text-gray-400">
                                                (text):
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-500 select-none w-8">
                                                2
                                            </span>
                                            <span className="text-gray-400 ml-4">
                                                # Your solution here...
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-500 select-none w-8">
                                                3
                                            </span>
                                            <span className="text-purple-400 ml-4">
                                                return
                                            </span>
                                            <span className="text-green-400">
                                                {" "}
                                                text[::-1]
                                            </span>
                                        </div>
                                        <div className="flex mt-4">
                                            <span className="text-gray-500 select-none w-8">
                                                4
                                            </span>
                                            <span className="text-gray-500">
                                                # AI Feedback:
                                            </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-500 select-none w-8">
                                                5
                                            </span>
                                            <span className="text-green-400 ml-4 animate-pulse">
                                                ✓ ¡Excelente solución! 🎉
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-6 py-20">
                    <h2 className="text-5xl font-bold text-center mb-16">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                            ¿Por qué InterCodeView?
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-900 p-8 rounded-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 animate-fade-in-up"
                                style={{
                                    animationDelay: `${index * 100 + 1000}ms`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                                <div className="relative z-10">
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-400 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Animated Corner Accents */}
                                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-xl"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                <div className="container mx-auto px-6 py-20">
                    <h2 className="text-5xl font-bold text-center mb-16">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                            Lenguajes Disponibles
                        </span>
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6">
                        {languages.map((lang, index) => (
                            <div
                                key={lang}
                                className="group relative px-8 py-4 bg-gray-900 border-2 border-green-500/30 rounded-lg hover:border-green-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 cursor-pointer animate-fade-in-up"
                                style={{
                                    animationDelay: `${index * 100 + 200}ms`,
                                }}
                            >
                                <span className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                                    {lang}
                                </span>
                                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

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
                    <Link href="/auth/signup">
                        <button className="group relative px-16 py-6 bg-green-500 text-black font-bold text-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 animate-fade-in-up animation-delay-400">
                            <span className="relative z-10 flex items-center gap-3">
                                Comenzar Gratis
                                <span className="text-2xl group-hover:translate-x-2 transition-transform">
                                    →
                                </span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative border-t border-green-500/30 bg-black/50 backdrop-blur-sm py-8 mt-20">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>
                        &copy; 2025 InterCodeView. Preparándote para el éxito.
                    </p>
                </div>
            </footer>
        </div>
    );
}
