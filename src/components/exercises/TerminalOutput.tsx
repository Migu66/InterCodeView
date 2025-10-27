"use client";

import { useRef, useEffect } from "react";
import { FiTerminal, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

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
            className={`${isVisible ? "h-60" : "h-10"} transition-all duration-300 border border-gray-800 rounded-lg bg-[#0d0d0d] overflow-hidden`}
        >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiTerminal className="text-[#00ff9d]" size={16} />
                    <span className="text-xs font-semibold text-gray-300">
                        Terminal de Salida
                    </span>
                    {isRunning && (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-3 w-3 border-t border-b border-[#00ff9d]"></div>
                            <span className="text-xs text-[#00ff9d]">
                                Ejecutando...
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onClear}
                        disabled={!output || isRunning}
                        className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        title="Limpiar terminal"
                    >
                        <FiX size={14} />
                    </button>
                    <button
                        onClick={onToggle}
                        className="p-1 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-[#00ff9d]"
                        title={isVisible ? "Minimizar" : "Expandir"}
                    >
                        {isVisible ? (
                            <FiChevronDown size={16} className="cursor-pointer"/>
                        ) : (
                            <FiChevronUp size={16} className="cursor-pointer" />
                        )}
                    </button>
                </div>
            </div>

            {/* Terminal Output */}
            {isVisible && (
                <div
                    ref={outputRef}
                    className="h-[calc(100%-36px)] overflow-y-auto p-4 font-mono text-sm custom-scrollbar"
                >
                    {output ? (
                        <pre className="text-gray-300 whitespace-pre-wrap break-words">
                            {output}
                        </pre>
                    ) : (
                        <div className="text-gray-600 italic">
                            Presiona &quot;Ejecutar Código&quot; para ver la
                            salida aquí...
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #0d0d0d;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #444;
                }
            `}</style>
        </div>
    );
}
