"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-green-500/30">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/languages"
                        className="text-2xl font-black tracking-tighter"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500">
                            InterCodeView
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/languages"
                            className="text-gray-300 hover:text-green-400 transition-colors font-semibold"
                        >
                            Lenguajes
                        </Link>
                        <Link
                            href="/profile"
                            className="text-gray-300 hover:text-green-400 transition-colors font-semibold"
                        >
                            Perfil
                        </Link>

                        {/* User Menu */}
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-green-500/30">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-green-400">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 font-semibold text-sm"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
