import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    duration?: number;
    className?: string;
}

// Cinta continua: el contenido se duplica y el track se desplaza -50%
export default function Marquee({
    children,
    duration = 30,
    className = "",
}: MarqueeProps) {
    return (
        <div className={`icv-marquee ${className}`} aria-hidden="true">
            <div
                className="icv-marquee-track"
                style={
                    { "--icv-marquee-dur": `${duration}s` } as React.CSSProperties
                }
            >
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center">{children}</div>
            </div>
        </div>
    );
}
