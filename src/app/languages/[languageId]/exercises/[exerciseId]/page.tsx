"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/landing/Cursor";
import {
    CodeEditor,
    ExerciseStatement,
    TerminalOutput,
    SuccessAnimation,
    EvaluationFeedback,
} from "@/components/exercises";

interface Exercise {
    id: string;
    title: string;
    description: string;
    statement: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    languageId: string;
    starterCode?: string | null;
}

interface Language {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon?: string | null;
}

interface EvaluationResult {
    success: boolean;
    status: "perfect" | "good" | "needs_improvement";
    message: string;
    score: number;
    feedback: string;
    isPerfect: boolean;
    suggestions: string[];
}

// Dificultad → señal (hueso / ámbar / rojo)
const DIFFICULTY_SIGNAL: Record<string, { tag: string; color: string }> = {
    EASY: { tag: "FÁCIL", color: "#eae0cc" },
    MEDIUM: { tag: "MEDIO", color: "#ffb000" },
    HARD: { tag: "DIFÍCIL", color: "#ff3d00" },
};

export default function ExercisePage() {
    const params = useParams();
    const router = useRouter();
    const languageId = params?.languageId as string;
    const exerciseId = params?.exerciseId as string;

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [language, setLanguage] = useState<Language | null>(null);
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para la terminal
    const [terminalOutput, setTerminalOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState(true);

    // Estados para evaluación con IA
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [evaluationResult, setEvaluationResult] =
        useState<EvaluationResult | null>(null);
    const [evaluationScore, setEvaluationScore] = useState(0);
    const [evaluationKey, setEvaluationKey] = useState(0); // Para forzar re-render

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                console.log("Cargando ejercicio:", { languageId, exerciseId });

                // Fetch exercise details
                const exerciseResponse = await fetch(
                    `/api/languages/${languageId}/exercises/${exerciseId}`
                );

                console.log(
                    "Exercise response status:",
                    exerciseResponse.status
                );

                if (!exerciseResponse.ok) {
                    const errorData = await exerciseResponse.json();
                    console.error("Error del servidor:", errorData);
                    throw new Error(
                        errorData.error || "Error al cargar el ejercicio"
                    );
                }

                const exerciseData = await exerciseResponse.json();
                console.log("Exercise data:", exerciseData);
                setExercise(exerciseData);

                // Fetch language details
                const languageResponse = await fetch(
                    `/api/languages/${languageId}`
                );

                console.log(
                    "Language response status:",
                    languageResponse.status
                );

                if (!languageResponse.ok) {
                    const errorData = await languageResponse.json();
                    console.error("Error del servidor:", errorData);
                    throw new Error(
                        errorData.error || "Error al cargar el lenguaje"
                    );
                }

                const languageData = await languageResponse.json();
                setLanguage(languageData);

                // Set initial code: usar starterCode si existe, sino usar plantilla por defecto
                const initialCode =
                    exerciseData.starterCode ||
                    getInitialCode(languageData.slug);
                setCode(initialCode);
            } catch (err) {
                console.error("Error completo:", err);
                setError(
                    err instanceof Error ? err.message : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        };

        if (languageId && exerciseId) {
            fetchExercise();
        }
    }, [languageId, exerciseId]);

    const getInitialCode = (languageSlug: string): string => {
        const templates: { [key: string]: string } = {
            javascript:
                "// Escribe tu código aquí\nfunction solution() {\n  \n}\n",
            typescript:
                "// Escribe tu código aquí\nfunction solution(): void {\n  \n}\n",
            python: "# Escribe tu código aquí\ndef solution():\n    pass\n",
            java: "// Escribe tu código aquí\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}\n",
            cpp: "// Escribe tu código aquí\n#include <iostream>\n\nint main() {\n    \n    return 0;\n}\n",
            csharp: "// Escribe tu código aquí\nusing System;\n\nclass Solution {\n    static void Main() {\n        \n    }\n}\n",
        };

        return templates[languageSlug] || "// Escribe tu código aquí\n";
    };

    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setIsTerminalVisible(true);
        setTerminalOutput(""); // Limpiar output anterior

        try {
            // Simular ejecución del código
            setTerminalOutput("▶ Ejecutando código...\n");

            // Aquí iría la llamada al API para ejecutar el código
            // Por ahora, simulamos la ejecución
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simulación de output basado en el lenguaje
            const mockOutput = getMockOutput(
                language?.slug || "javascript",
                code
            );
            setTerminalOutput((prev) => prev + mockOutput);
        } catch (err) {
            setTerminalOutput(
                (prev) =>
                    prev +
                    "\n✗ Error al ejecutar el código\n" +
                    (err instanceof Error ? err.message : "Error desconocido")
            );
        } finally {
            setIsRunning(false);
        }
    };

    const getMockOutput = (languageSlug: string, code: string): string => {
        // Simulación básica de ejecución
        const timestamp = new Date().toLocaleTimeString();
        let output = `\n✓ Compilación exitosa (${timestamp})\n`;
        output += `\n--- Salida del programa ---\n`;

        // Detección básica de console.log o print
        if (languageSlug === "javascript" || languageSlug === "typescript") {
            const consoleMatches = code.match(/console\.log\((.*?)\)/g);
            if (consoleMatches) {
                consoleMatches.forEach((match) => {
                    const content = match.replace(
                        /console\.log\((.*?)\)/,
                        "$1"
                    );
                    output += `${content}\n`;
                });
            } else {
                output += "(sin salida)\n";
            }
        } else if (languageSlug === "python") {
            const printMatches = code.match(/print\((.*?)\)/g);
            if (printMatches) {
                printMatches.forEach((match) => {
                    const content = match.replace(/print\((.*?)\)/, "$1");
                    output += `${content}\n`;
                });
            } else {
                output += "(sin salida)\n";
            }
        } else {
            output += "(Ejecución simulada - sin salida real)\n";
        }

        output += `\n✓ Programa finalizado correctamente`;
        return output;
    };

    const handleClearTerminal = () => {
        setTerminalOutput("");
    };

    const handleToggleTerminal = () => {
        setIsTerminalVisible(!isTerminalVisible);
    };

    const handleSubmit = async () => {
        if (!exercise || !language) return;

        setIsSubmitting(true);

        // Limpiar el resultado anterior para mostrar la nueva evaluación
        setEvaluationResult(null);
        setShowSuccessAnimation(false);

        try {
            // Llamar al API de evaluación
            const response = await fetch("/api/exercises/evaluate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    exerciseStatement: exercise.statement,
                    language: language.slug,
                    starterCode: exercise.starterCode || "",
                }),
            });

            if (!response.ok) {
                throw new Error("Error al evaluar el código");
            }

            const result = await response.json();

            // Actualizar el resultado con una nueva key para forzar re-render
            setEvaluationKey((prev) => prev + 1);
            setEvaluationResult(result);
            setEvaluationScore(result.score);

            // Si es perfecto, mostrar animación
            if (result.isPerfect) {
                setTimeout(() => {
                    setShowSuccessAnimation(true);
                }, 500);
            }
        } catch (err) {
            console.error("Error al evaluar:", err);
            // Mostrar error en el EvaluationFeedback
            setEvaluationResult({
                success: false,
                status: "needs_improvement",
                message: "Error al evaluar el código",
                score: 0,
                feedback:
                    "**Error:**\nNo se pudo evaluar el código. " +
                    (err instanceof Error ? err.message : "Error desconocido"),
                isPerfect: false,
                suggestions: [
                    "Verifica tu conexión a internet",
                    "Intenta nuevamente",
                ],
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AuthGuard>
                <div className="icv relative min-h-screen">
                    <div className="icv-scan" aria-hidden="true" />
                    <Navbar />
                    <div className="flex min-h-[70vh] items-center justify-center">
                        <p className="icv-label icv-blink !text-[#ffb000]">
                            ▮ PREPARANDO CABINA
                        </p>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (error || !exercise || !language) {
        return (
            <AuthGuard>
                <div className="icv relative min-h-screen">
                    <Cursor />
                    <div className="icv-scan" aria-hidden="true" />
                    <Navbar />
                    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
                        <p className="icv-label !text-[#ff3d00]">
                            <span className="icv-blink mr-2">▮</span>
                            FALLO DE LECTURA —{" "}
                            {(error || "EJERCICIO NO ENCONTRADO").toUpperCase()}
                        </p>
                        <button
                            onClick={() =>
                                router.push(`/languages/${languageId}`)
                            }
                            className="icv-link"
                            data-cursor-label="VOLVER"
                        >
                            ← VOLVER AL MANIFIESTO
                        </button>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    const signal = DIFFICULTY_SIGNAL[exercise.difficulty] ?? {
        tag: exercise.difficulty,
        color: "#97896d",
    };

    return (
        <AuthGuard>
            <div className="icv relative min-h-screen">
                <Cursor />
                <div className="icv-scan" aria-hidden="true" />
                <Navbar />

                {/* Cabecera de misión */}
                <div className="px-4 pt-28 md:px-10">
                    <div className="mx-auto max-w-[1800px]">
                        <button
                            onClick={() =>
                                router.push(`/languages/${languageId}`)
                            }
                            className="icv-link"
                            data-cursor-label="VOLVER"
                        >
                            ← MÓDULO {language.name.toUpperCase()}
                        </button>

                        <div className="mb-8 mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(234,224,204,0.16)] pb-8">
                            <div>
                                <p className="icv-label mb-3">
                                    <span className="mr-2 inline-block h-2 w-2 bg-[#ffb000] align-middle" />
                                    CABINA — SIMULACIÓN EN CURSO
                                </p>
                                <h1 className="icv-display text-[clamp(1.4rem,3.5vw,2.6rem)] text-[#eae0cc]">
                                    {exercise.title}
                                </h1>
                                <p className="mt-3 text-[0.65rem] tracking-[0.2em]">
                                    <span style={{ color: signal.color }}>
                                        [{signal.tag}]
                                    </span>
                                    <span className="mx-3 text-[#97896d]">
                                        ·
                                    </span>
                                    <span className="text-[#97896d]">
                                        {language.name.toUpperCase()}
                                    </span>
                                </p>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                data-cursor-label="AUDITAR"
                                className="icv-btn !px-8 !py-4 !text-[0.7rem] disabled:pointer-events-none disabled:opacity-40"
                            >
                                <span
                                    className="icv-btn__bg"
                                    aria-hidden="true"
                                />
                                <span className="icv-btn__label">
                                    <span>
                                        {isSubmitting
                                            ? "Transmitiendo…"
                                            : "Enviar a auditoría →"}
                                    </span>
                                    <span aria-hidden="true">
                                        {isSubmitting
                                            ? "Transmitiendo…"
                                            : "Enviar a auditoría →"}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido principal - Vista dividida */}
                <div className="px-4 pb-16 md:px-10">
                    <div className="mx-auto max-w-[1800px]">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
                            {/* Panel izquierdo - Plan de vuelo */}
                            <div className="lg:col-span-3">
                                <ExerciseStatement
                                    description={exercise.statement}
                                    difficulty={exercise.difficulty}
                                />
                            </div>

                            {/* Panel derecho - Editor y consola */}
                            <div className="space-y-4 lg:col-span-7">
                                {/* Editor */}
                                <CodeEditor
                                    language={language.slug}
                                    value={code}
                                    onChange={handleCodeChange}
                                    onRun={
                                        language.slug !== "sql"
                                            ? handleRunCode
                                            : undefined
                                    }
                                    isRunning={isRunning}
                                    isTerminalVisible={
                                        language.slug !== "sql"
                                            ? isTerminalVisible
                                            : false
                                    }
                                />

                                {/* Informe de auditoría */}
                                {evaluationResult && (
                                    <EvaluationFeedback
                                        key={evaluationKey}
                                        status={evaluationResult.status}
                                        message={evaluationResult.message}
                                        score={evaluationResult.score}
                                        feedback={evaluationResult.feedback}
                                        suggestions={
                                            evaluationResult.suggestions
                                        }
                                    />
                                )}

                                {/* Consola de salida - Solo para lenguajes que no son SQL */}
                                {language.slug !== "sql" && (
                                    <TerminalOutput
                                        output={terminalOutput}
                                        isRunning={isRunning}
                                        isVisible={isTerminalVisible}
                                        onToggle={handleToggleTerminal}
                                        onClear={handleClearTerminal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sello de misión cumplida */}
                {showSuccessAnimation && (
                    <SuccessAnimation
                        score={evaluationScore}
                        onComplete={() => setShowSuccessAnimation(false)}
                    />
                )}
            </div>
        </AuthGuard>
    );
}
