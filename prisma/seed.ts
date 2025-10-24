import { PrismaClient } from "../src/generated/prisma";
import { seedPython } from "./seeds/python.seed";
import { seedJavaScript } from "./seeds/javascript.seed";
import { seedTypeScript } from "./seeds/typescript.seed";
import { seedJava } from "./seeds/java.seed";
import { seedCpp } from "./seeds/cpp.seed";
import { seedCSharp } from "./seeds/csharp.seed";
import { seedGo } from "./seeds/go.seed";
import { seedRust } from "./seeds/rust.seed";
import { seedKotlin } from "./seeds/kotlin.seed";
import { seedRuby } from "./seeds/ruby.seed";
import { seedPHP } from "./seeds/php.seed";
import { seedSQL } from "./seeds/sql.seed";
import { seedSwift } from "./seeds/swift.seed";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Iniciando seed de la base de datos...\n");

    // Limpiar datos existentes
    console.log("🗑️  Limpiando datos existentes...");
    await prisma.exercise.deleteMany();
    await prisma.language.deleteMany();
    console.log("✅ Datos limpiados\n");

    // Definir lenguajes
    console.log("📚 Creando lenguajes...");
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

    const createdLanguages = [];
    for (const lang of languages) {
        const language = await prisma.language.create({
            data: lang,
        });
        createdLanguages.push(language);
        console.log(`  ✅ ${language.name}`);
    }
    console.log(`✅ ${createdLanguages.length} lenguajes creados\n`);

    // ============================================
    // CREACIÓN DE EJERCICIOS POR LENGUAJE
    // ============================================
    console.log("📝 Creando ejercicios de entrevistas técnicas...\n");

    // Python
    const pythonLang = createdLanguages.find((l) => l.slug === "python");
    if (pythonLang) {
        await seedPython(prisma, pythonLang.id);
    }

    // JavaScript
    const jsLang = createdLanguages.find((l) => l.slug === "javascript");
    if (jsLang) {
        await seedJavaScript(prisma, jsLang.id);
    }

    // TypeScript
    const tsLang = createdLanguages.find((l) => l.slug === "typescript");
    if (tsLang) {
        await seedTypeScript(prisma, tsLang.id);
    }

    // Java
    const javaLang = createdLanguages.find((l) => l.slug === "java");
    if (javaLang) {
        await seedJava(prisma, javaLang.id);
    }

    // C++
    const cppLang = createdLanguages.find((l) => l.slug === "cpp");
    if (cppLang) {
        await seedCpp(prisma, cppLang.id);
    }

    // C#
    const csharpLang = createdLanguages.find((l) => l.slug === "csharp");
    if (csharpLang) {
        await seedCSharp(prisma, csharpLang.id);
    }

    // Go
    const goLang = createdLanguages.find((l) => l.slug === "go");
    if (goLang) {
        await seedGo(prisma, goLang.id);
    }

    // Rust
    const rustLang = createdLanguages.find((l) => l.slug === "rust");
    if (rustLang) {
        await seedRust(prisma, rustLang.id);
    }

    // Swift
    const swiftLang = createdLanguages.find((l) => l.slug === "swift");
    if (swiftLang) {
        await seedSwift(prisma, swiftLang.id);
    }

    // Kotlin
    const kotlinLang = createdLanguages.find((l) => l.slug === "kotlin");
    if (kotlinLang) {
        await seedKotlin(prisma, kotlinLang.id);
    }

    // Ruby
    const rubyLang = createdLanguages.find((l) => l.slug === "ruby");
    if (rubyLang) {
        await seedRuby(prisma, rubyLang.id);
    }

    // PHP
    const phpLang = createdLanguages.find((l) => l.slug === "php");
    if (phpLang) {
        await seedPHP(prisma, phpLang.id);
    }

    // SQL
    const sqlLang = createdLanguages.find((l) => l.slug === "sql");
    if (sqlLang) {
        await seedSQL(prisma, sqlLang.id);
    }

    console.log("\n🎉 Seed completado exitosamente!");
    console.log(`📊 Resumen:`);
    console.log(`   - Total de lenguajes: ${createdLanguages.length}`);
    console.log(`   - Todos los lenguajes tienen ejercicios`);
    console.log(
        `   - Total de ejercicios: ${createdLanguages.length * 15} (${createdLanguages.length} lenguajes × 15 ejercicios)`
    );
    console.log(
        `   - Distribución: 5 Fácil + 5 Medio + 5 Difícil por lenguaje`
    );
}

main()
    .catch((e) => {
        console.error("❌ Error al ejecutar seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
