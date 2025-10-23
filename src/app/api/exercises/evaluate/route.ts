import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Inicializar cliente de Groq (IA gratuita)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { code, exerciseStatement, language, starterCode } =
            await request.json();

        if (!code || !exerciseStatement || !language) {
            return NextResponse.json(
                { error: "Faltan parámetros requeridos" },
                { status: 400 }
            );
        }

        // Validar que el código no esté vacío o solo tenga espacios/comentarios
        const codeWithoutComments = code
            .replace(/\/\/.*$/gm, "") // Eliminar comentarios de línea
            .replace(/\/\*[\s\S]*?\*\//g, "") // Eliminar comentarios de bloque
            .replace(/#.*$/gm, "") // Eliminar comentarios de Python
            .trim();

        if (!codeWithoutComments || codeWithoutComments.length === 0) {
            return NextResponse.json({
                success: false,
                status: "needs_improvement",
                message: "El código está vacío",
                score: 0,
                feedback:
                    "**Error:**\nNo has escrito ningún código. Por favor, completa el ejercicio antes de evaluarlo.",
                isPerfect: false,
                suggestions: [
                    "Lee cuidadosamente el enunciado del ejercicio",
                    "Escribe el código necesario para resolver el problema",
                    "Asegúrate de cumplir con todos los requisitos",
                ],
            });
        }

        // Validar que el código no sea exactamente igual al starterCode
        if (starterCode && code.trim() === starterCode.trim()) {
            return NextResponse.json({
                success: false,
                status: "needs_improvement",
                message: "No has modificado el código inicial",
                score: 0,
                feedback:
                    "**Error:**\nEl código es exactamente igual al código inicial. Debes completar el ejercicio con tu propia solución.",
                isPerfect: false,
                suggestions: [
                    "Modifica el código inicial para resolver el ejercicio",
                    "Lee el enunciado y los requisitos cuidadosamente",
                    "Implementa la lógica necesaria según las instrucciones",
                ],
            });
        }

        // Evaluar con IA REAL (Groq - Gratis)
        const evaluation = await evaluateCodeWithAI(
            code,
            exerciseStatement,
            language
        );

        return NextResponse.json(evaluation);
    } catch (error) {
        console.error("❌ Error al evaluar código:", error);
        return NextResponse.json(
            { error: "Error al evaluar el código" },
            { status: 500 }
        );
    }
}

async function evaluateCodeWithAI(
    code: string,
    exerciseStatement: string,
    language: string
) {
    // Evaluar con Groq (Llama 3.1 - Gratis y Rápido)
    try {
        const prompt = `Eres un profesor experto en programación. Evalúa el código del estudiante de forma ESPECÍFICA y CONTEXTUAL.

EJERCICIO:
${exerciseStatement}

LENGUAJE: ${language}

CÓDIGO:
${code}

INSTRUCCIONES CRÍTICAS:

0. VALIDACIÓN INICIAL:
   - Si el código está vacío, solo tiene comentarios, o no tiene código ejecutable → score: 0
   - Si el código no cumple con el objetivo del ejercicio → score máximo: 40
   - Si el código tiene errores de sintaxis → score máximo: 60

1. ANALIZA EL EJERCICIO:
   - ¿Es BÁSICO (print, variables simples)? → Si cumple: 95-100
   - ¿Es INTERMEDIO (funciones, bucles)? → Si cumple bien: 85-95
   - ¿Es AVANZADO (algoritmos, POO)? → Evalúa con criterios estrictos

2. EVALÚA ESPECÍFICAMENTE:
   - ¿El código hace EXACTAMENTE lo que pide el ejercicio?
   - ¿La sintaxis es correcta para ${language}?
   - ¿Es apropiado para el nivel del ejercicio?

3. FEEDBACK ESPECÍFICO (NO GENÉRICO):
   
   ❌ MAL (genérico): "Considera usar funciones para organizar mejor tu código"
   ✅ BIEN (específico): "Para un 'Hola Mundo', el código es perfecto tal como está"
   
   ❌ MAL: "Falta implementar la lógica del ejercicio"
   ✅ BIEN: "El código imprime correctamente 'Hola Mundo' como se pedía"
   
   ❌ MAL: "Asegúrate de que tu código sea legible"
   ✅ BIEN: "La sintaxis print('Hola Mundo') es clara y correcta"

4. SUGGESTIONS:
   - Si el código CUMPLE PERFECTAMENTE el ejercicio → [] (array vacío)
   - NO inventes mejoras para código que ya es perfecto
   - Solo sugiere mejoras REALES y ESPECÍFICAS al código actual
   
   EJEMPLOS:
   - Ejercicio: "Imprime Hola Mundo" + Código: print("Hola Mundo") → suggestions: []
   - Ejercicio: "Suma dos números" + Código correcto sin validación → suggestions: ["Agrega validación para verificar que los inputs sean números"]
   - Ejercicio avanzado con errores → suggestions específicas de los errores reales

5. RESPONDE JSON (sin markdown):

EJEMPLO PERFECTO:
{
    "success": true,
    "status": "perfect",
    "message": "¡Está perfecto!",
    "score": 100,
    "feedback": "**Aspectos Positivos:**\nEl código imprime correctamente 'Hola Mundo' usando la función print().\n\n**Análisis Técnico:**\nPara un ejercicio de nivel básico, el código cumple perfectamente el objetivo. La sintaxis es correcta y no requiere complejidad adicional.",
    "isPerfect": true,
    "suggestions": []
}

EJEMPLO CÓDIGO VACÍO O INCOMPLETO:
{
    "success": false,
    "status": "needs_improvement",
    "message": "El código está incompleto o vacío",
    "score": 0,
    "feedback": "**Error:**\nEl código no contiene la implementación necesaria para resolver el ejercicio.",
    "isPerfect": false,
    "suggestions": ["Escribe el código que resuelva el ejercicio", "Revisa los requisitos del enunciado"]
}

REGLAS STATUS/MESSAGE:
- score >= 90: status="perfect", message="¡Está perfecto!", isPerfect=true
- score 70-89: status="good", message="¡Buen trabajo! Pero hay algunos detalles que mejorar.", isPerfect=false
- score < 70: status="needs_improvement", message="Tu código necesita mejoras significativas.", isPerfect=false

CRÍTICO: NO des sugerencias genéricas. Si el código es perfecto para el ejercicio, di que está perfecto y suggestions=[]. Sé HONESTO y ESPECÍFICO.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "Eres un profesor experto en programación. Evalúas código de manera profesional, constructiva y detallada. Siempre respondes en JSON válido.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile", // Modelo actualizado (el anterior fue descontinuado)
            temperature: 0.4, // Un poco más de creatividad para feedback detallado
            max_tokens: 1500, // Más tokens para feedback extenso
            response_format: { type: "json_object" },
        });

        const responseText =
            chatCompletion.choices[0]?.message?.content || "{}";

        const result = JSON.parse(responseText);

        // Asegurar que la respuesta tenga la estructura correcta
        return {
            success: true,
            status: result.status || "needs_improvement",
            message: result.message || "Código evaluado",
            score: result.score || 50,
            feedback: result.feedback || "Sin retroalimentación",
            isPerfect: result.score >= 90,
            suggestions: result.suggestions || [],
        };
    } catch (error) {
        console.error("❌ Error en evaluación con Groq:", error);
        console.error("Detalles del error:", JSON.stringify(error, null, 2));

        // Si falla la IA, devolver mensaje de error al usuario
        return {
            success: false,
            status: "needs_improvement",
            message: "Error al evaluar con IA",
            score: 0,
            feedback:
                "**Error:**\nNo se pudo conectar con el servicio de evaluación. Por favor, intenta nuevamente en unos momentos.",
            isPerfect: false,
            suggestions: [
                "Verifica tu conexión a internet",
                "Intenta evaluar el código nuevamente",
            ],
        };
    }
}
