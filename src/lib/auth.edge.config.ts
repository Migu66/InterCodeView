import { NextAuthConfig } from "next-auth";

// Configuración ligera para Edge Runtime (middleware)
// NO importa Prisma, bcrypt, ni otras dependencias pesadas
export const authEdgeConfig: NextAuthConfig = {
    providers: [], // Los providers se configuran en auth.config.ts
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/login",
        verifyRequest: "/auth/verify",
        newUser: "/",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAuthPage = nextUrl.pathname.startsWith("/auth");
            const isOnProfilePage = nextUrl.pathname.startsWith("/profile");
            const isOnApiAuth = nextUrl.pathname.startsWith("/api/auth");

            // Permitir siempre rutas de autenticación de NextAuth
            if (isOnApiAuth) {
                return true;
            }

            // Si está en página de auth y ya está logueado, redirigir a home
            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }

            // Si intenta acceder a perfil sin login, redirigir a login
            if (isOnProfilePage && !isLoggedIn) {
                return Response.redirect(new URL("/auth/login", nextUrl));
            }

            return true;
        },
    },
};
