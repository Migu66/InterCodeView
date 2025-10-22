"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/ui/Navbar";
import DotGrid from "@/components/ui/DotGrid";
import {
    CodeEditor,
    ExerciseStatement,
    TerminalOutput,
} from "@/components/exercises";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    languageId: string;
}

interface Language {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon?: string | null;
}

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

                // Set initial code based on language
                setCode(getInitialCode(languageData.slug));
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
                    "\n❌ Error al ejecutar el código\n" +
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
        setIsSubmitting(true);

        // TODO: Implementar la lógica de envío
        setTimeout(() => {
            console.log("Código enviado:", code);
            setIsSubmitting(false);
            // Aquí irá la lógica de validación del ejercicio
        }, 1500);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY":
                return "text-green-500";
            case "MEDIUM":
                return "text-yellow-500";
            case "HARD":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case "EASY":
                return "Fácil";
            case "MEDIUM":
                return "Medio";
            case "HARD":
                return "Difícil";
            default:
                return difficulty;
        }
    };

    if (loading) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-black text-white relative overflow-hidden">
                    <div className="fixed inset-0 z-0">
                        <DotGrid
                            dotSize={5}
                            gap={15}
                            baseColor="#271e37"
                            activeColor="#00ff9d"
                            proximity={100}
                            shockRadius={180}
                            shockStrength={2}
                            resistance={1500}
                            returnDuration={3}
                        />
                    </div>

                    <div className="relative z-10">
                        <Navbar />
                        <div className="pt-24 px-6 flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00ff9d] mx-auto mb-4"></div>
                                <p className="text-gray-400">
                                    Cargando ejercicio...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (error || !exercise || !language) {
        return (
            <AuthGuard>
                <div className="min-h-screen bg-black text-white relative overflow-hidden">
                    <div className="fixed inset-0 z-0">
                        <DotGrid
                            dotSize={5}
                            gap={15}
                            baseColor="#271e37"
                            activeColor="#00ff9d"
                            proximity={100}
                            shockRadius={180}
                            shockStrength={2}
                            resistance={1500}
                            returnDuration={3}
                        />
                    </div>

                    <div className="relative z-10">
                        <Navbar />
                        <div className="pt-24 px-6 flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <p className="text-red-500 text-xl mb-4">
                                    {error || "Ejercicio no encontrado"}
                                </p>
                                <button
                                    onClick={() =>
                                        router.push(`/languages/${languageId}`)
                                    }
                                    className="px-6 py-3 bg-[#00ff9d] text-black rounded-lg font-semibold hover:bg-[#00cc7d] transition-colors"
                                >
                                    Volver a ejercicios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                {/* DotGrid Background */}
                <div className="fixed inset-0 z-0">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271e37"
                        activeColor="#00ff9d"
                        proximity={100}
                        shockRadius={180}
                        shockStrength={2}
                        resistance={1500}
                        returnDuration={3}
                    />
                </div>

                <div className="relative z-10">
                    <Navbar />

                    {/* Header */}
                    <div className="pt-24 px-6">
                        <div className="max-w-[1800px] mx-auto">
                            <button
                                onClick={() =>
                                    router.push(`/languages/${languageId}`)
                                }
                                className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors mb-6"
                            >
                                <FiArrowLeft size={20} />
                                <span>Volver a {language.name}</span>
                            </button>

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">
                                        {exercise.title}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`text-sm font-semibold ${getDifficultyColor(exercise.difficulty)}`}
                                        >
                                            {getDifficultyText(
                                                exercise.difficulty
                                            )}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-400">
                                            {language.name}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#00ff9d] text-black rounded-lg font-semibold hover:bg-[#00cc7d] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                                            <span>Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiCheck size={20} />
                                            <span>Resolver Ejercicio</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Split View */}
                    <div className="px-6 pb-12">
                        <div className="max-w-[1800px] mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Panel - Exercise Statement */}
                                <ExerciseStatement
                                    description={exercise.description}
                                    difficulty={exercise.difficulty}
                                />

                                {/* Right Panel - Code Editor y Terminal */}
                                <div className="space-y-4">
                                    {/* Code Editor */}
                                    <CodeEditor
                                        language={language.slug}
                                        value={code}
                                        onChange={handleCodeChange}
                                        onRun={handleRunCode}
                                        isRunning={isRunning}
                                    />

                                    {/* Terminal Output */}
                                    <TerminalOutput
                                        output={terminalOutput}
                                        isRunning={isRunning}
                                        isVisible={isTerminalVisible}
                                        onToggle={handleToggleTerminal}
                                        onClear={handleClearTerminal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
