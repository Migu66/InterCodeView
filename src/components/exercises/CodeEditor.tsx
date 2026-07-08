"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Monaco } from "@monaco-editor/react";

// Lazy load del editor con loading fallback
const Editor = dynamic(
    () =>
        import("@monaco-editor/react").then((mod) => ({ default: mod.Editor })),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full items-center justify-center bg-[#120d06]">
                <p className="icv-label icv-blink !text-[#ffb000]">
                    ▮ CARGANDO EDITOR
                </p>
            </div>
        ),
    }
);

interface CodeEditorProps {
    language: string;
    value: string;
    onChange: (value: string | undefined) => void;
    onRun?: () => void;
    isRunning?: boolean;
    isTerminalVisible?: boolean;
}

const languageMap: { [key: string]: string } = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    cpp: "cpp",
    csharp: "csharp",
};

// Tema fósforo: fondo carbón, cursor y palabras clave en ámbar
const defineIcvTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("icv-phosphor", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "6f6350", fontStyle: "italic" },
            { token: "keyword", foreground: "ffb000" },
            { token: "string", foreground: "d8c9a3" },
            { token: "number", foreground: "ff8f5a" },
            { token: "type", foreground: "eae0cc" },
        ],
        colors: {
            "editor.background": "#120d06",
            "editor.foreground": "#eae0cc",
            "editor.lineHighlightBackground": "#16110a",
            "editorLineNumber.foreground": "#5d5240",
            "editorLineNumber.activeForeground": "#ffb000",
            "editorCursor.foreground": "#ffb000",
            "editor.selectionBackground": "#ffb00033",
            "editorIndentGuide.background": "#2a2214",
            "editorWidget.background": "#16110a",
            "editorSuggestWidget.background": "#16110a",
            "editorSuggestWidget.selectedBackground": "#2a2214",
        },
    });
};

export default function CodeEditor({
    language,
    value,
    onChange,
    onRun,
    isRunning = false,
    isTerminalVisible = true,
}: CodeEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const monacoLanguage = languageMap[language] || "javascript";

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Calcular altura dinámica basada en si el terminal está visible
    const editorHeight = isTerminalVisible
        ? "h-[calc(100vh-680px)]"
        : "h-[calc(102.5vh-385px)]";

    return (
        <div
            className={`flex flex-col transition-all duration-300 ${isFullscreen ? "fixed inset-0 z-[60] bg-[#0f0c08]" : `${editorHeight} min-h-[400px]`}`}
        >
            {/* Cabecera del editor */}
            <div className="flex items-center justify-between border border-[rgba(234,224,204,0.16)] bg-[#16110a] px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className="icv-blink h-2 w-2 bg-[#ffb000]" />
                    <span className="icv-label !text-[#eae0cc]">
                        EDITOR — CABINA
                    </span>
                    <span className="icv-label hidden sm:inline">
                        / {monacoLanguage.toUpperCase()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {onRun && (
                        <button
                            onClick={onRun}
                            disabled={isRunning}
                            data-cursor-label="EJECUTAR"
                            className="border border-[#ffb000] px-4 py-2 text-[0.6rem] tracking-[0.22em] text-[#ffb000] transition-colors duration-300 hover:bg-[#ffb000] hover:text-[#0f0c08] disabled:pointer-events-none disabled:opacity-40"
                            title="Ejecutar código"
                        >
                            {isRunning ? (
                                <span className="icv-blink">
                                    ▮ EJECUTANDO…
                                </span>
                            ) : (
                                <>EJECUTAR ▶</>
                            )}
                        </button>
                    )}
                    <button
                        onClick={toggleFullscreen}
                        data-cursor-label="VISTA"
                        className="px-3 py-2 text-[0.6rem] tracking-[0.22em] text-[#97896d] transition-colors duration-300 hover:text-[#ffb000]"
                        title={
                            isFullscreen
                                ? "Salir de pantalla completa"
                                : "Pantalla completa"
                        }
                    >
                        {isFullscreen ? "[REDUCIR]" : "[AMPLIAR]"}
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden border-x border-b border-[rgba(234,224,204,0.16)]">
                <Editor
                    height="100%"
                    language={monacoLanguage}
                    value={value}
                    onChange={onChange}
                    theme="icv-phosphor"
                    beforeMount={defineIcvTheme}
                    options={{
                        minimap: { enabled: isFullscreen },
                        fontSize: 14,
                        fontFamily:
                            "'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
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
                        <div className="flex h-full items-center justify-center bg-[#120d06]">
                            <p className="icv-label icv-blink !text-[#ffb000]">
                                ▮ CARGANDO EDITOR
                            </p>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
