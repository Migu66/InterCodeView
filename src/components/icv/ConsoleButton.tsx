"use client";

interface ConsoleButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    red?: boolean;
    cursorLabel?: string;
    className?: string;
}

// Botón de ignición reutilizable (relleno deslizante + etiqueta doble).
export default function ConsoleButton({
    label,
    red = false,
    cursorLabel = "EJECUTAR",
    className = "",
    ...rest
}: ConsoleButtonProps) {
    return (
        <button
            {...rest}
            className={`icv-btn ${red ? "icv-btn--red" : ""} justify-center disabled:pointer-events-none disabled:opacity-40 ${className}`}
            data-cursor-label={cursorLabel}
        >
            <span className="icv-btn__bg" aria-hidden="true" />
            <span className="icv-btn__label">
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
            </span>
        </button>
    );
}
