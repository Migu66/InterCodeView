"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-2xl border-b border-green-500/20 shadow-lg shadow-green-500/5 animate-in slide-in-from-top duration-500">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/languages"
                        className="group relative text-2xl font-black tracking-tighter transition-all duration-300 hover:scale-105 animate-in fade-in zoom-in"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 drop-shadow-[0_0_20px_rgba(74,222,128,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(74,222,128,0.6)] transition-all duration-300">
                            InterCodeView
                        </span>
                        <div className="absolute -inset-3 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 animate-pulse" />
                        <div className="absolute inset-0 bg-green-500/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right duration-700">
                        <Link
                            href="/languages"
                            className="group relative px-5 py-2.5 rounded-xl text-gray-300 hover:text-white transition-all duration-300 font-medium overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                Lenguajes
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0" />
                            <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/30 rounded-xl transition-all duration-300" />
                        </Link>

                        {/* User Menu Dropdown */}
                        <div className="relative ml-2" ref={menuRef}>
                            <button
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-green-500/5 hover:bg-green-500/15 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                            >
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/30 group-hover:shadow-green-500/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 overflow-hidden">
                                        {user.avatarUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={user.avatarUrl}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user.name?.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-semibold text-green-400 leading-tight group-hover:text-green-300 transition-colors duration-300">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 leading-tight group-hover:text-gray-400 transition-colors duration-300">
                                        {user.email}
                                    </p>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-gray-400 group-hover:text-green-400 transition-all duration-300 ${
                                        isUserMenuOpen
                                            ? "rotate-180 text-green-400"
                                            : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-gradient-to-b from-gray-900 to-black border border-green-500/30 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-5 zoom-in-95 duration-300">
                                    <div className="p-4 bg-gradient-to-br from-green-500/15 via-green-500/5 to-transparent border-b border-green-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                        <p className="text-sm font-bold text-green-400 relative z-10">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 relative z-10">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        <Link
                                            href="/profile"
                                            onClick={() =>
                                                setIsUserMenuOpen(false)
                                            }
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/10 hover:to-green-500/5 transition-all duration-300 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            <svg
                                                className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            <span className="font-medium relative z-10">
                                                Mi Perfil
                                            </span>
                                        </Link>

                                        <div className="my-2 border-t border-green-500/20 mx-2" />

                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 transition-all duration-300 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            <svg
                                                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1 relative z-10"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            <span className="font-medium relative z-10">
                                                Cerrar Sesión
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
