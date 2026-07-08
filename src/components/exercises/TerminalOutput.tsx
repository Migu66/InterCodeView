"use client";

import { useRef, useEffect } from "react";

interface TerminalOutputProps {
    output: string;
    isRunning: boolean;
    isVisible: boolean;
    onToggle: () => void;
    onClear: () => void;
}

export default function TerminalOutput({
    output,
    isRunning,
    isVisible,
    onToggle,
    onClear,
}: TerminalOutputProps) {
    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-scroll al final cuando hay nuevo output
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div
            className={`${isVisible ? "h-60" : "h-11"} icv-terminal overflow-hidden transition-all duration-300`}
        >
            {/* Cabecera de la consola */}
            <div className="flex items-center justify-between border-b border-[rgba(234,224,204,0.16)] bg-[#16110a] px-4 py-2">
                <div className="flex items-center gap-3">
                    <span
                        className={`h-2 w-2 ${isRunning ? "icv-blink bg-[#ff3d00]" : "bg-[#ffb000]"}`}
                    />
                    <span className="icv-label !text-[#eae0cc]">
                        CONSOLA DE SALIDA
                    </span>
                    {isRunning && (
                        <span className="icv-label icv-blink !text-[#ffb000]">
                            EJECUTANDO…
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onClear}
                        disabled={!output || isRunning}
                        data-cursor-label="LIMPIAR"
                        className="px-2 py-1 text-[0.6rem] tracking-[0.2em] text-[#97896d] transition-colors duration-200 hover:text-[#ff3d00] disabled:pointer-events-none disabled:opacity-40"
                        title="Limpiar terminal"
                    >
                        [LIMPIAR]
                    </button>
                    <button
                        onClick={onToggle}
                        data-cursor-label="VISTA"
                        className="px-2 py-1 text-[0.6rem] tracking-[0.2em] text-[#97896d] transition-colors duration-200 hover:text-[#ffb000]"
                        title={isVisible ? "Minimizar" : "Expandir"}
                    >
                        {isVisible ? "[OCULTAR]" : "[MOSTRAR]"}
                    </button>
                </div>
            </div>

            {/* Salida */}
            {isVisible && (
                <div
                    ref={outputRef}
                    className="icv-scroll h-[calc(100%-40px)] overflow-y-auto p-4 text-[0.75rem] leading-relaxed"
                >
                    {output ? (
                        <pre className="whitespace-pre-wrap break-words text-[#eae0cc]">
                            {output}
                        </pre>
                    ) : (
                        <p className="icv-label">
                            EN ESPERA — PULSA EJECUTAR PARA VER LA SALIDA
                            <span className="icv-blink ml-1 text-[#ffb000]">
                                ▮
                            </span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
