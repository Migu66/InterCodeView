import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

// Optimización de fuentes
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "InterCodeView",
        template: "%s | InterCodeView",
    },
    description:
        "Plataforma de entrevistas técnicas - Mejora tus habilidades de programación con ejercicios interactivos",
    keywords: [
        "programación",
        "entrevistas técnicas",
        "coding",
        "práctica",
        "ejercicios",
    ],
    authors: [{ name: "InterCodeView" }],
    icons: {
        icon: "/medalla.ico",
    },
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://intercodeview.com",
        title: "InterCodeView",
        description: "Plataforma de entrevistas técnicas",
        siteName: "InterCodeView",
    },
    robots: {
        index: true,
        follow: true,
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={inter.variable}>
            <body className={inter.className}>
                <SessionProviderWrapper>
                    <AuthProvider>
                        {children}
                        <ToastContainer />
                    </AuthProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
