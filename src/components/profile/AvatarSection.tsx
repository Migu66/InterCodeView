"use client";

import { useRef } from "react";
import Corners from "@/components/landing/Corners";

interface AvatarSectionProps {
    user: {
        name: string;
        avatarUrl?: string | null;
    } | null;
    onAvatarChange: (file: File) => Promise<void>;
    onRemoveAvatar: () => Promise<void>;
    isUploading: boolean;
}

// Foto de archivo del expediente: retrato cuadrado con ticks de esquina
export default function AvatarSection({
    user,
    onAvatarChange,
    onRemoveAvatar,
    isUploading,
}: AvatarSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await onAvatarChange(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="icv-panel p-6">
            <Corners />
            <p className="icv-label mb-6 flex items-center justify-between">
                FOTO DE ARCHIVO
                <span className="icv-blink h-2 w-2 bg-[#ffb000]" />
            </p>

            {/* Retrato */}
            <div className="relative mx-auto aspect-square w-full max-w-[260px] border border-[rgba(234,224,204,0.16)] bg-[#120d06]">
                {user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="icv-display flex h-full w-full items-center justify-center text-[clamp(4rem,8vw,6rem)] text-[#ffb000]">
                        {user?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                )}
                {/* Marca de registro */}
                <span className="icv-label absolute bottom-2 right-2 bg-[#0f0c08]/80 px-2 py-1 !text-[0.5rem]">
                    REG. {new Date().getFullYear()}
                </span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                data-cursor-label="FOTO"
                className="mt-6 w-full border border-[rgba(234,224,204,0.16)] px-4 py-3 text-[0.65rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:border-[#ffb000] hover:text-[#ffb000] disabled:pointer-events-none disabled:opacity-40"
            >
                {isUploading ? (
                    <span className="icv-blink">▮ TRANSMITIENDO…</span>
                ) : (
                    "ACTUALIZAR FOTO →"
                )}
            </button>

            {user?.avatarUrl && (
                <button
                    onClick={onRemoveAvatar}
                    data-cursor-label="BORRAR"
                    className="mt-3 w-full px-4 py-2 text-[0.6rem] tracking-[0.22em] text-[#ff3d00] transition-opacity duration-300 hover:opacity-70"
                >
                    RETIRAR FOTO DEL EXPEDIENTE
                </button>
            )}
        </div>
    );
}
