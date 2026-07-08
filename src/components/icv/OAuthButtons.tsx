"use client";

interface OAuthButtonsProps {
    onOAuth: (provider: "google" | "github") => void;
}

// Canales de acceso externos, en fila de conmutadores.
export default function OAuthButtons({ onOAuth }: OAuthButtonsProps) {
    return (
        <div>
            <div className="my-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-[rgba(234,224,204,0.16)]" />
                <span className="icv-label">CANALES EXTERNOS</span>
                <span className="h-px flex-1 bg-[rgba(234,224,204,0.16)]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => onOAuth("github")}
                    data-cursor-label="GITHUB"
                    className="group border border-[rgba(234,224,204,0.16)] px-4 py-3 text-[0.65rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:border-[#ffb000] hover:text-[#ffb000]"
                >
                    GITHUB{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => onOAuth("google")}
                    data-cursor-label="GOOGLE"
                    className="group border border-[rgba(234,224,204,0.16)] px-4 py-3 text-[0.65rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:border-[#ffb000] hover:text-[#ffb000]"
                >
                    GOOGLE{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>
        </div>
    );
}
