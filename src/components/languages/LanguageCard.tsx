"use client";

interface LanguageCardProps {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    color: string;
    index: number;
    onClick: (slug: string) => void;
}

// Código corto de módulo por slug (loseta tipográfica, sin iconos)
const slugCodeMap: Record<string, string> = {
    python: "PY",
    javascript: "JS",
    typescript: "TS",
    java: "JV",
    cpp: "C++",
    csharp: "C#",
    go: "GO",
    rust: "RS",
    swift: "SW",
    kotlin: "KT",
    ruby: "RB",
    php: "PHP",
    sql: "SQL",
};

export default function LanguageCard({
    name,
    slug,
    description,
    index,
    onClick,
}: LanguageCardProps) {
    const code = slugCodeMap[slug] || name.slice(0, 2).toUpperCase();

    return (
        <button
            onClick={() => onClick(slug)}
            data-cursor-label="ABRIR"
            className="icv-tile icv-module flex h-56 flex-col justify-between p-5 opacity-0 md:h-64"
        >
            {/* Índice de módulo */}
            <span className="flex items-baseline justify-between">
                <span className="icv-label">
                    M-{String(index + 1).padStart(2, "0")}
                </span>
                <span className="icv-tile__arrow text-sm" aria-hidden="true">
                    →
                </span>
            </span>

            {/* Código gigante */}
            <span
                className="icv-tile__code block text-[clamp(2.6rem,6vw,4.2rem)]"
                aria-hidden="true"
            >
                {code}
            </span>

            <span className="block">
                <span className="block text-[0.7rem] uppercase tracking-[0.24em] text-[#eae0cc]">
                    {name}
                </span>
                {description && (
                    <span className="mt-2 line-clamp-2 block text-[0.65rem] leading-relaxed tracking-[0.04em] text-[#97896d]">
                        {description}
                    </span>
                )}
            </span>
        </button>
    );
}
