"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DotGrid from "@/components/ui/DotGrid";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );

    const checkAuth = async () => {
        try {
            // Verificar si hay un token de autenticación
            const response = await fetch("/api/auth/me", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push("/auth/login");
            }
        } catch (error) {
            console.error("Error al verificar autenticación:", error);
            setIsAuthenticated(false);
            router.push("/auth/login");
        }
    };

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Mientras se verifica la autenticación, mostrar un loader
    if (isAuthenticated === null) {
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
                    <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">
                        Verificando acceso...
                    </p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, no mostrar nada (ya se redirigió)
    if (!isAuthenticated) {
        return null;
    }

    // Si está autenticado, mostrar el contenido
    return <>{children}</>;
}
