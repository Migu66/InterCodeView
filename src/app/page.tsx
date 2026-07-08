"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "@/components/landing/LandingPage";

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        if (!loading && user) {
            router.push("/languages");
        }
    }, [user, loading, router]);

    // Pantalla de espera mientras se verifica la autenticación
    if (loading) {
        return (
            <div className="icv flex min-h-screen items-center justify-center">
                <p className="icv-label icv-blink !text-[#ffb000]">
                    ▮ AUTENTICANDO
                </p>
            </div>
        );
    }

    return (
        <>
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

            <LandingPage />
        </>
    );
}
