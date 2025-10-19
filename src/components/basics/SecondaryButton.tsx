import Link from "next/link";

interface SecondaryButtonProps {
    text: string;
    href: string;
    className?: string;
}

export default function SecondaryButton({
    text,
    href,
    className = "",
}: SecondaryButtonProps) {
    return (
        <Link href={href}>
            <button
                className={`group px-12 py-5 bg-transparent border-2 border-green-500 text-green-500 font-bold text-lg rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer ${className}`}
            >
                <span className="flex items-center gap-2">{text}</span>
            </button>
        </Link>
    );
}
