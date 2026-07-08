"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import BootScreen from "@/components/icv/BootScreen";

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
        return <BootScreen label="VERIFICANDO ACCESO" />;
    }

    // Si no está autenticado, no mostrar nada (ya se redirigió)
    if (!isAuthenticated) {
        return null;
    }

    // Si está autenticado, mostrar el contenido
    return <>{children}</>;
}
