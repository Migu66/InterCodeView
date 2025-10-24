import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authConfig: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    return null;
                }

                // Verificar que el email esté verificado
                if (!user.emailVerified) {
                    throw new Error("Email no verificado");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.avatarUrl || undefined,
                    emailVerified: user.emailVerified,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email) {
                return false;
            }

            // Si es autenticación OAuth (Google o GitHub)
            if (
                account?.provider === "google" ||
                account?.provider === "github"
            ) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (existingUser) {
                    // Actualizar el usuario existente - NO guardar imagen de OAuth
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: {
                            emailVerified: true, // Los emails de OAuth ya están verificados
                        },
                    });
                } else {
                    // Crear nuevo usuario con OAuth - NO guardar imagen de OAuth
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || "Usuario",
                            emailVerified: true,
                            // avatarUrl se omite intencionalmente
                        },
                    });
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                // No guardar la imagen de OAuth en el token
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                // No pasar la imagen de OAuth a la sesión
                session.user.image = undefined;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    secret: process.env.NEXTAUTH_SECRET,
};
