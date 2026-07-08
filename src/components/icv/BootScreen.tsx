"use client";

// Pantalla de espera de la consola: bloque parpadeante + etiqueta.
// Sustituye a los spinners en cargas de página completa.
export default function BootScreen({
    label = "AUTENTICANDO",
}: {
    label?: string;
}) {
    return (
        <div className="icv flex min-h-screen items-center justify-center">
            <div className="icv-scan" aria-hidden="true" />
            <p className="icv-label icv-blink !text-[#ffb000]">▮ {label}</p>
        </div>
    );
}
