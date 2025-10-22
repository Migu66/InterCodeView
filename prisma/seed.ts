import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    const languages = [
        {
            name: "Python",
            slug: "python",
            description:
                "Lenguaje interpretado de alto nivel con sintaxis clara y elegante",
            icon: "SiPython",
            color: "#3776AB",
        },
        {
            name: "JavaScript",
            slug: "javascript",
            description:
                "Lenguaje de programación para desarrollo web interactivo",
            icon: "SiJavascript",
            color: "#F7DF1E",
        },
        {
            name: "TypeScript",
            slug: "typescript",
            description: "Superconjunto tipado de JavaScript",
            icon: "SiTypescript",
            color: "#3178C6",
        },
        {
            name: "Java",
            slug: "java",
            description: "Lenguaje orientado a objetos, portable y robusto",
            icon: "FaJava",
            color: "#007396",
        },
        {
            name: "C++",
            slug: "cpp",
            description:
                "Lenguaje de alto rendimiento con control de bajo nivel",
            icon: "SiCplusplus",
            color: "#00599C",
        },
        {
            name: "C#",
            slug: "csharp",
            description: "Lenguaje moderno y orientado a objetos de Microsoft",
            icon: "TbBrandCSharp",
            color: "#239120",
        },
        {
            name: "Go",
            slug: "go",
            description: "Lenguaje concurrente y eficiente de Google",
            icon: "SiGo",
            color: "#00ADD8",
        },
        {
            name: "Rust",
            slug: "rust",
            description:
                "Lenguaje de sistemas con seguridad de memoria garantizada",
            icon: "SiRust",
            color: "#000000",
        },
        {
            name: "Swift",
            slug: "swift",
            description: "Lenguaje moderno para desarrollo iOS y macOS",
            icon: "SiSwift",
            color: "#FA7343",
        },
        {
            name: "Kotlin",
            slug: "kotlin",
            description: "Lenguaje moderno para desarrollo Android",
            icon: "SiKotlin",
            color: "#7F52FF",
        },
        {
            name: "Ruby",
            slug: "ruby",
            description:
                "Lenguaje dinámico enfocado en simplicidad y productividad",
            icon: "SiRuby",
            color: "#CC342D",
        },
        {
            name: "PHP",
            slug: "php",
            description:
                "Lenguaje de scripting para desarrollo web del lado del servidor",
            icon: "SiPhp",
            color: "#777BB4",
        },
        {
            name: "SQL",
            slug: "sql",
            description: "Lenguaje para gestión y consulta de bases de datos",
            icon: "SiMysql",
            color: "#4479A1",
        },
    ];

    // Crear lenguajes
    const createdLanguages = [];
    for (const lang of languages) {
        const language = await prisma.language.upsert({
            where: { slug: lang.slug },
            update: {},
            create: lang,
        });
        createdLanguages.push(language);
        console.log(`✅ Lenguaje creado: ${language.name}`);
    }

    // Crear ejercicios de ejemplo para Python
    const pythonLanguage = createdLanguages.find((l) => l.slug === "python");
    if (pythonLanguage) {
        const pythonExercises = [
            // Nivel Fácil
            {
                title: "Hola Mundo",
                description:
                    "Imprime 'Hola Mundo' en la consola. Tu primer programa en Python.",
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 1,
            },
            {
                title: "Variables y Tipos",
                description:
                    "Aprende a declarar variables y trabajar con diferentes tipos de datos.",
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 2,
            },
            {
                title: "Operaciones Básicas",
                description:
                    "Realiza operaciones matemáticas básicas con Python.",
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 3,
            },
            {
                title: "Condicionales",
                description:
                    "Usa if, elif y else para tomar decisiones en tu código.",
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 4,
            },
            // Nivel Medio
            {
                title: "Bucles y Listas",
                description:
                    "Itera sobre listas y realiza operaciones con bucles for y while.",
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 1,
            },
            {
                title: "Funciones",
                description:
                    "Crea y utiliza funciones reutilizables en Python.",
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 2,
            },
            {
                title: "Diccionarios",
                description: "Trabaja con estructuras de datos clave-valor.",
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 3,
            },
            // Nivel Difícil
            {
                title: "Clases y Objetos",
                description:
                    "Implementa programación orientada a objetos en Python.",
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 1,
            },
            {
                title: "Manejo de Excepciones",
                description:
                    "Aprende a manejar errores de forma elegante con try-except.",
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 2,
            },
            {
                title: "Decoradores",
                description:
                    "Domina los decoradores y su uso avanzado en Python.",
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 3,
            },
        ];

        for (const exercise of pythonExercises) {
            await prisma.exercise.create({
                data: exercise,
            });
        }
        console.log(
            `✅ ${pythonExercises.length} ejercicios creados para Python`
        );
    }

    // Crear ejercicios de ejemplo para JavaScript
    const jsLanguage = createdLanguages.find((l) => l.slug === "javascript");
    if (jsLanguage) {
        const jsExercises = [
            // Nivel Fácil
            {
                title: "Variables y Constantes",
                description: "Aprende la diferencia entre let, const y var.",
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 1,
            },
            {
                title: "Tipos de Datos",
                description:
                    "Explora los tipos de datos primitivos de JavaScript.",
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 2,
            },
            {
                title: "Operadores",
                description:
                    "Utiliza operadores aritméticos, lógicos y de comparación.",
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 3,
            },
            // Nivel Medio
            {
                title: "Arrow Functions",
                description:
                    "Domina las funciones flecha y su sintaxis concisa.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 1,
            },
            {
                title: "Array Methods",
                description:
                    "Utiliza map, filter, reduce y otros métodos de arrays.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 2,
            },
            {
                title: "Destructuring",
                description: "Aprende a desestructurar objetos y arrays.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 3,
            },
            // Nivel Difícil
            {
                title: "Promesas y Async/Await",
                description: "Maneja operaciones asíncronas de forma efectiva.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 1,
            },
            {
                title: "Closures",
                description: "Comprende y aplica closures en JavaScript.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 2,
            },
            {
                title: "Prototypes y Herencia",
                description: "Explora el sistema de prototipos de JavaScript.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 3,
            },
        ];

        for (const exercise of jsExercises) {
            await prisma.exercise.create({
                data: exercise,
            });
        }
        console.log(
            `✅ ${jsExercises.length} ejercicios creados para JavaScript`
        );
    }

    console.log("✨ Seed completado exitosamente!");
}

main()
    .catch((e) => {
        console.error("❌ Error al ejecutar seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
