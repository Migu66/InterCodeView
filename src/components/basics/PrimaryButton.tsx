import Link from "next/link";

interface PrimaryButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function PrimaryButton({
    text,
    href,
    onClick,
    size = "md",
    disabled = false,
    type = "button",
    className = "",
}: PrimaryButtonProps) {
    const sizeClasses = {
        sm: "px-8 py-3 text-base",
        md: "px-12 py-5 text-lg",
        lg: "px-16 py-6 text-xl",
    };

    const scaleClasses = {
        sm: "hover:scale-105",
        md: "hover:scale-105",
        lg: "hover:scale-110",
    };

    const buttonContent = (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`group relative ${sizeClasses[size]} bg-green-500 text-black font-bold rounded-lg overflow-hidden transition-all duration-300 ${scaleClasses[size]} hover:shadow-2xl hover:shadow-green-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {text}
                <span className="group-hover:translate-x-1 transition-transform">
                    →
                </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-green-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </button>
    );

    if (href) {
        return <Link href={href}>{buttonContent}</Link>;
    }

    return buttonContent;
}
