import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
    title: "InterCodeView",
    description: "Plataforma de entrevistas técnicas",
    icons: {
        icon: "/medalla.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>
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
