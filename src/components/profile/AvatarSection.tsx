"use client";

import { useRef } from "react";
import { Camera, UserIcon } from "lucide-react";

interface AvatarSectionProps {
    user: {
        name: string;
        avatarUrl?: string | null;
    } | null;
    onAvatarChange: (file: File) => Promise<void>;
    onRemoveAvatar: () => Promise<void>;
    isUploading: boolean;
}

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
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 relative overflow-hidden group mt-10">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex flex-col items-center relative z-10">
                <div className="relative group/avatar">
                    {/* Anillo animado alrededor del avatar */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-green-300 to-green-500 rounded-full opacity-75 blur-lg animate-pulse-slow"></div>

                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-green-500 via-green-400 to-green-300 flex items-center justify-center overflow-hidden border-4 border-black/50 shadow-2xl shadow-green-500/50">
                        {user?.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserIcon className="w-20 h-20 text-black" />
                        )}
                        {/* Overlay en hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-green-400" />
                        </div>
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/50 hover:scale-110 border-4 border-black"
                    >
                        <Camera className="w-6 h-6 text-black" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                <p className="mt-6 text-gray-400 text-sm font-medium">
                    {isUploading
                        ? "Subiendo..."
                        : "Haz clic en el icono para cambiar tu foto"}
                </p>
                {user?.avatarUrl && (
                    <button
                        onClick={onRemoveAvatar}
                        className="mt-3 text-red-400 hover:text-red-300 text-sm transition-colors font-medium hover:underline"
                    >
                        Eliminar foto
                    </button>
                )}
            </div>
        </div>
    );
}
