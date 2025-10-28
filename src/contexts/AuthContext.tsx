"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import { signOut as nextAuthSignOut } from "next-auth/react";

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    provider?: string;
    hasPassword?: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/me", {
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            // Cerrar sesión en ambos sistemas (NextAuth y JWT tradicional)
            await nextAuthSignOut({ redirect: false });
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }, []);

    const refreshUser = useCallback(async () => {
        await fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const contextValue = useMemo(
        () => ({ user, loading, logout, refreshUser }),
        [user, loading, logout, refreshUser]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
