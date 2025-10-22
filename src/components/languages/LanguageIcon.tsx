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
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { FiCode } from "react-icons/fi";

interface LanguageIconProps {
    icon: string | null;
    slug?: string;
    className?: string;
    color?: string;
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
    SiMysql: SiMysql,
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
    sql: SiMysql,
};

export default function LanguageIcon({
    icon,
    slug,
    className = "text-4xl",
    color,
}: LanguageIconProps) {
    // Usar el icono de la BD si existe, sino usar el mapeo por slug, sino usar FiCode
    const IconComponent =
        (icon && iconComponentMap[icon]) ||
        (slug && slugIconMap[slug]) ||
        FiCode;

    return (
        <IconComponent
            className={className}
            style={color ? { color } : undefined}
        />
    );
}
