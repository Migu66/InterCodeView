import {
    SiPython,
    SiJavascript,
    SiTypescript,
    SiCplusplus,
    SiGo,
    SiRust,
    SiSwift,
    SiKotlin,
    SiRuby,
    SiPhp,
    SiMysql,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

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

// Mapeo de nombres de iconos a componentes
const iconComponentMap: Record<string, React.ElementType> = {
    SiPython: SiPython,
    SiJavascript: SiJavascript,
    SiTypescript: SiTypescript,
    FaJava: FaJava,
    SiCplusplus: SiCplusplus,
    TbBrandCSharp: TbBrandCSharp,
    SiGo: SiGo,
    SiRust: SiRust,
    SiSwift: SiSwift,
    SiKotlin: SiKotlin,
    SiRuby: SiRuby,
    SiPhp: SiPhp,
    SiMysql: FaDatabase,
};

// Mapeo de fallback por slug si no hay icono en BD
const slugIconMap: Record<string, React.ElementType> = {
    python: SiPython,
    javascript: SiJavascript,
    typescript: SiTypescript,
    java: FaJava,
    cpp: SiCplusplus,
    csharp: TbBrandCSharp,
    go: SiGo,
    rust: SiRust,
    swift: SiSwift,
    kotlin: SiKotlin,
    ruby: SiRuby,
    php: SiPhp,
    sql: FaDatabase,
};

export default function LanguageCard({
    name,
    slug,
    description,
    icon,
    color,
    index,
    onClick,
}: LanguageCardProps) {
    // Usar el icono de la BD si existe, sino usar el mapeo por slug
    const IconComponent =
        (icon && iconComponentMap[icon]) || slugIconMap[slug] || SiJavascript;

    return (
        <div
            onClick={() => onClick(slug)}
            className="group relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-green-500/20 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:border-green-400/60 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/30 animate-fade-in-up flex flex-col justify-between h-[300px]"
            style={{
                animationDelay: `${index * 50}ms`,
            }}
        >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
                    }}
                ></div>
            </div>

            {/* Glowing border effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                    background: `linear-gradient(45deg, ${color}20, transparent)`,
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-500"
                        style={{
                            backgroundColor: color,
                            transform: "scale(1.5)",
                        }}
                    ></div>
                    <IconComponent
                        className="relative transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-2xl"
                        style={{
                            color: color,
                            fontSize: "5rem",
                            filter: "drop-shadow(0 0 20px rgba(0,255,157,0.3))",
                        }}
                    />
                </div>

                {/* Name with gradient */}
                <div className="text-center mb-4">
                    <h3 className="text-2xl font-black tracking-tight bg-gradient-to-br from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-green-400 transition-all duration-300">
                        {name}
                    </h3>
                    <div
                        className="h-1 w-0 group-hover:w-full mx-auto mt-2 rounded-full transition-all duration-500"
                        style={{ backgroundColor: color }}
                    ></div>
                </div>

                {/* Description */}
                {description && (
                    <p className="text-gray-400 text-sm leading-relaxed text-center line-clamp-2 px-2 group-hover:text-gray-300 transition-colors duration-300">
                        {description}
                    </p>
                )}
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                ></div>
                <div
                    className="absolute top-2 right-8 w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                ></div>
            </div>

            {/* Arrow Icon with enhanced animation */}
            <div className="absolute bottom-4 right-4 text-green-400 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <div className="relative">
                    <div
                        className="absolute inset-0 blur-md"
                        style={{ backgroundColor: color, opacity: 0.5 }}
                    ></div>
                    <svg
                        className="relative w-6 h-6 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>
        </div>
    );
}
