"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { FiCode, FiMaximize2, FiMinimize2, FiPlay } from "react-icons/fi";

interface CodeEditorProps {
    language: string;
    value: string;
    onChange: (value: string | undefined) => void;
    onRun?: () => void;
    isRunning?: boolean;
}

const languageMap: { [key: string]: string } = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    cpp: "cpp",
    csharp: "csharp",
};

export default function CodeEditor({
    language,
    value,
    onChange,
    onRun,
    isRunning = false,
}: CodeEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const monacoLanguage = languageMap[language] || "javascript";

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div
            className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "h-[calc(100vh-580px)] min-h-[400px]"}`}
        >
            {/* Editor Header */}
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-t-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiCode className="text-[#00ff9d]" size={20} />
                    <span className="text-sm font-semibold text-gray-300">
                        Editor de Código
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {onRun && (
                        <button
                            onClick={onRun}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black rounded-lg font-semibold hover:bg-[#00cc7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            title="Ejecutar código"
                        >
                            {isRunning ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
                                    <span>Ejecutando...</span>
                                </>
                            ) : (
                                <>
                                    <FiPlay size={16} />
                                    <span>Ejecutar Código</span>
                                </>
                            )}
                        </button>
                    )}
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-[#00ff9d] cursor-pointer"
                        title={
                            isFullscreen
                                ? "Salir de pantalla completa"
                                : "Pantalla completa"
                        }
                    >
                        {isFullscreen ? (
                            <FiMinimize2 size={18} />
                        ) : (
                            <FiMaximize2 size={18} />
                        )}
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 border-l border-r border-b border-gray-800 rounded-b-lg overflow-hidden">
                <Editor
                    height="100%"
                    language={monacoLanguage}
                    value={value}
                    onChange={onChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: isFullscreen },
                        fontSize: 14,
                        fontFamily:
                            "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                        fontLigatures: true,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: "on",
                        formatOnPaste: true,
                        formatOnType: true,
                        autoIndent: "full",
                        // Autocompletado y sugerencias
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: true,
                        },
                        parameterHints: {
                            enabled: true,
                        },
                        suggest: {
                            snippetsPreventQuickSuggestions: false,
                            showKeywords: true,
                            showSnippets: true,
                            showClasses: true,
                            showFunctions: true,
                            showVariables: true,
                            showConstants: true,
                            showMethods: true,
                            showProperties: true,
                        },
                        acceptSuggestionOnCommitCharacter: true,
                        acceptSuggestionOnEnter: "on",
                        snippetSuggestions: "top",
                        tabCompletion: "on",
                        // Otras configuraciones útiles
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        smoothScrolling: true,
                        bracketPairColorization: {
                            enabled: true,
                        },
                        guides: {
                            bracketPairs: true,
                            indentation: true,
                        },
                        folding: true,
                        foldingStrategy: "indentation",
                        showFoldingControls: "mouseover",
                        matchBrackets: "always",
                        renderWhitespace: "selection",
                        renderLineHighlight: "all",
                        scrollbar: {
                            vertical: "visible",
                            horizontal: "visible",
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        },
                    }}
                    loading={
                        <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ff9d] mx-auto mb-3"></div>
                                <p className="text-gray-400 text-sm">
                                    Cargando editor...
                                </p>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
