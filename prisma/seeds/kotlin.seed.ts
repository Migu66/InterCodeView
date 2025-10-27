import { PrismaClient } from "../../src/generated/prisma";

export async function seedKotlin(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Null Safety",
            description:
                "Maneja tipos nullable con safe calls y elvis operator",
            statement: `## 📝 Null Safety en Kotlin

Kotlin elimina NullPointerException con su sistema de tipos nullable.

## 🎯 Objetivo

Implementa una función \`safeLength\` que:
- Reciba un String nullable
- Retorne la longitud del string si no es null
- Retorne 0 si es null
- Usa safe call (?.) y elvis operator (?:)

## 📋 Ejemplos

\`\`\`kotlin
safeLength("Hello")  // 5
safeLength(null)     // 0
safeLength("")       // 0
\`\`\`

## 💡 Pista

Usa \`str?.length ?: 0\` para combinar safe call y elvis operator.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `fun safeLength(str: String?): Int {
    // Tu código aquí
}

// Prueba
println(safeLength("Hello"))
println(safeLength(null))
println(safeLength(""))`,
        },
        {
            title: "Data Classes",
            description: "Usa data classes con copy, equals y hashCode",
            statement: `## 📝 Data Classes

Data classes generan automáticamente equals, hashCode, toString y copy.

## 🎯 Objetivo

- Crea una data class \`User\` con name (String) y age (Int)
- Usa el método \`copy\` para crear una copia modificada
- Comprueba la igualdad estructural con \`==\`

## 📋 Ejemplo

\`\`\`kotlin
val user1 = User("Ana", 25)
val user2 = user1.copy(age = 26)
println(user1 == user2)  // false
\`\`\`

## 💡 Pista

\`data class\` genera automáticamente todos los métodos necesarios.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `// Define la data class User
data class User(val name: String, val age: Int)

// Prueba
val user1 = User("Ana", 25)
val user2 = user1.copy(age = 26)
println(user1)
println(user2)
println(user1 == user2)`,
        },
        {
            title: "Extension Functions",
            description: "Extiende clases existentes con nuevas funciones",
            statement: `## 📝 Extension Functions

Kotlin permite añadir funciones a clases existentes sin heredar.

## 🎯 Objetivo

Crea una extension function \`isPalindrome\` para String que:
- Retorne true si el string es un palíndromo
- Ignore mayúsculas/minúsculas
- Ejemplo: "Ana" es palíndromo

## 📋 Ejemplos

\`\`\`kotlin
"ana".isPalindrome()     // true
"hello".isPalindrome()   // false
"Oso".isPalindrome()     // true
\`\`\`

## 💡 Pista

Compara el string con su reverso: \`this.equals(this.reversed(), ignoreCase = true)\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `fun String.isPalindrome(): Boolean {
    // Tu código aquí
}

// Prueba
println("ana".isPalindrome())
println("hello".isPalindrome())
println("Oso".isPalindrome())`,
        },
        {
            title: "Lambda Expressions",
            description: "Usa lambdas con funciones de orden superior",
            statement: `## 📝 Lambda Expressions

Las lambdas son funciones anónimas que se usan extensivamente en Kotlin.

## 🎯 Objetivo

Implementa \`processNumbers\` que:
- Reciba una lista de números
- Filtre los pares
- Multiplique cada uno por 2
- Retorne la lista resultante

## 📋 Ejemplo

\`\`\`kotlin
processNumbers(listOf(1, 2, 3, 4, 5))
// [4, 8]
\`\`\`

## 💡 Pista

Usa \`filter { it % 2 == 0 }\` y \`map { it * 2 }\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `fun processNumbers(nums: List<Int>): List<Int> {
    // Tu código aquí
    // Usa filter y map
}

// Prueba
println(processNumbers(listOf(1, 2, 3, 4, 5)))`,
        },
        {
            title: "When Expression",
            description: "Usa when como switch mejorado con pattern matching",
            statement: `## 📝 When Expression

When es más potente que switch, permite pattern matching.

## 🎯 Objetivo

Implementa \`describe\` que retorne una descripción según el tipo:
- String: "Es un texto de longitud X"
- Int: "Es un número: X"
- Boolean: "Es verdadero/falso"
- Otro: "Tipo desconocido"

## 📋 Ejemplos

\`\`\`kotlin
describe("Hello")  // "Es un texto de longitud 5"
describe(42)       // "Es un número: 42"
describe(true)     // "Es verdadero"
\`\`\`

## 💡 Pista

Usa \`when(obj)\` con \`is String\`, \`is Int\`, etc.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `fun describe(obj: Any): String = when(obj) {
    // Tu código aquí
    else -> "Tipo desconocido"
}

// Prueba
println(describe("Hello"))
println(describe(42))
println(describe(true))`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Sealed Classes",
            description: "Crea jerarquías cerradas de clases",
            statement: `## 📝 Sealed Classes

Sealed classes representan jerarquías cerradas de tipos.

## 🎯 Objetivo

Crea una sealed class \`Result<T>\` con:
- \`Success(data: T)\`
- \`Error(message: String)\`
- \`Loading\`

Implementa una función que maneje cada caso.

## 📋 Ejemplo

\`\`\`kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}
\`\`\`

## 💡 Pista

When sobre sealed class es exhaustivo, no necesita \`else\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `sealed class Result<out T> {
    // Tu código aquí
    // Success, Error, Loading
}

fun <T> handleResult(result: Result<T>) {
    when(result) {
        // Tu código aquí
    }
}

// Prueba
handleResult(Result.Success("Datos"))
handleResult(Result.Error("Error de red"))
handleResult(Result.Loading)`,
        },
        {
            title: "Coroutines Basics",
            description: "Programación asíncrona con coroutines",
            statement: `## 📝 Coroutines

Las coroutines permiten código asíncrono sin callbacks.

## 🎯 Objetivo

Implementa \`fetchData\` como suspend function que:
- Simule un delay de 1 segundo
- Retorne "Data loaded"

## 📋 Ejemplo

\`\`\`kotlin
suspend fun fetchData(): String {
    delay(1000)
    return "Data loaded"
}
\`\`\`

## 💡 Pista

Usa \`suspend\` keyword y \`delay()\` de kotlinx.coroutines.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `import kotlinx.coroutines.*

suspend fun fetchData(): String {
    // Tu código aquí
}

// Prueba
fun main() = runBlocking {
    println("Fetching...")
    val data = fetchData()
    println(data)
}`,
        },
        {
            title: "Delegates",
            description: "Usa delegation pattern con by keyword",
            statement: `## 📝 Delegates

Kotlin soporta delegation nativa con \`by\`.

## 🎯 Objetivo

- Crea una interface \`Repository\`
- Implementa \`DatabaseRepository\`
- Crea \`CachedRepository\` que delegue a \`DatabaseRepository\`

## 📋 Ejemplo

\`\`\`kotlin
interface Repository {
    fun getData(): String
}

class CachedRepository(repo: Repository) : Repository by repo
\`\`\`

## 💡 Pista

\`by repo\` delega automáticamente todas las llamadas.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `interface Repository {
    fun getData(): String
}

class DatabaseRepository : Repository {
    override fun getData() = // Tu código aquí
}

class CachedRepository(repo: Repository) : Repository by repo {
    // Tu código aquí (puede añadir lógica extra si quieres)
}

// Prueba
val cached = CachedRepository(DatabaseRepository())
println(cached.getData())`,
        },
        {
            title: "Inline Functions",
            description: "Optimiza lambdas con inline functions",
            statement: `## 📝 Inline Functions

Inline functions eliminan el overhead de las lambdas.

## 🎯 Objetivo

Crea una función \`measure\` que:
- Sea inline
- Reciba un lambda
- Mida el tiempo de ejecución
- Retorne el resultado del lambda

## 📋 Ejemplo

\`\`\`kotlin
val result = measure {
    // código costoso
    42
}
\`\`\`

## 💡 Pista

Usa \`inline\` keyword y \`System.currentTimeMillis()\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `inline fun <T> measure(block: () -> T): T {
    // Tu código aquí
    // Mide tiempo antes y después
}

// Prueba
val result = measure {
    Thread.sleep(100)
    "Completado"
}
println(result)`,
        },
        {
            title: "Scope Functions",
            description: "Domina let, run, with, apply, also",
            statement: `## 📝 Scope Functions

Kotlin tiene 5 scope functions para contextos diferentes.

## 🎯 Objetivo

Demuestra el uso de:
- \`let\`: para transformar y null safety
- \`apply\`: para configurar objetos
- \`also\`: para efectos secundarios

## 📋 Ejemplo

\`\`\`kotlin
val user = User().apply {
    name = "Ana"
    age = 25
}.also {
    println("Usuario creado: \$it")
}
\`\`\`

## 💡 Pista

\`let\` y \`also\` usan \`it\`, \`apply\` y \`run\` usan \`this\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `data class User(var name: String = "", var age: Int = 0)

fun demonstrateScopeFunctions() {
    // Usa apply para configurar
    val user = User().apply {
        // Tu código aquí
    }
    
    // Usa let para transformar nullable
    val upperName = user.name?.let {
        // Tu código aquí
    }
    
    // Usa also para logging
    user.also {
        // Tu código aquí
    }
}

demonstrateScopeFunctions()`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Flow API",
            description: "Reactive streams con Kotlin Flow",
            statement: `## 📝 Flow API

Flow es la solución de Kotlin para reactive streams.

## 🎯 Objetivo

Crea \`numberFlow\` que:
- Emita números del 1 al 5
- Con delay de 500ms entre cada emisión
- Use operadores map y filter

## 📋 Ejemplo

\`\`\`kotlin
numberFlow()
    .filter { it % 2 == 0 }
    .map { it * 2 }
    .collect { println(it) }
// 4, 8
\`\`\`

## 💡 Pista

Usa \`flow { emit() }\` y operadores de Flow.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun numberFlow(): Flow<Int> = flow {
    // Tu código aquí
    // emit(1), delay(500), etc.
}

fun main() = runBlocking {
    numberFlow()
        .filter { it % 2 == 0 }
        .map { it * 2 }
        .collect { println(it) }
}`,
        },
        {
            title: "DSL Builders",
            description: "Crea Domain Specific Language con type-safe builders",
            statement: `## 📝 Type-Safe Builders (DSL)

Kotlin permite crear DSLs elegantes con lambdas con receiver.

## 🎯 Objetivo

Crea un DSL para construir HTML:
\`\`\`kotlin
html {
    body {
        h1("Título")
        p("Párrafo")
    }
}
\`\`\`

## 📋 Ejemplo de Uso

\`\`\`kotlin
val page = html {
    body {
        h1("Welcome")
    }
}
\`\`\`

## 💡 Pista

Usa lambdas con receiver: \`Body.() -> Unit\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `class HTML {
    private val children = mutableListOf<String>()
    
    fun body(init: Body.() -> Unit) {
        // Tu código aquí
    }
    
    override fun toString() = children.joinToString("\\n")
}

class Body {
    private val children = mutableListOf<String>()
    
    fun h1(text: String) {
        // Tu código aquí
    }
    
    fun p(text: String) {
        // Tu código aquí
    }
    
    override fun toString() = children.joinToString("\\n")
}

fun html(init: HTML.() -> Unit): HTML {
    // Tu código aquí
}

// Prueba
val page = html {
    body {
        h1("Welcome")
        p("This is a paragraph")
    }
}
println(page)`,
        },
        {
            title: "Reified Type Parameters",
            description: "Accede a tipos genéricos en runtime",
            statement: `## 📝 Reified Type Parameters

Normalmente los genéricos se borran en runtime, pero \`reified\` lo evita.

## 🎯 Objetivo

Crea una función genérica \`filterIsInstance\` que:
- Filtre elementos por tipo
- Use \`reified\` para acceder al tipo en runtime
- Sea inline

## 📋 Ejemplo

\`\`\`kotlin
val items: List<Any> = listOf(1, "hello", 2, "world")
val strings = items.filterIsInstance<String>()
// ["hello", "world"]
\`\`\`

## 💡 Pista

Usa \`inline fun <reified T> filterIsInstance()\` con \`is T\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `inline fun <reified T> List<*>.filterIsInstance(): List<T> {
    // Tu código aquí
}

// Prueba
val items: List<Any> = listOf(1, "hello", 2, "world", 3.14)
val strings = items.filterIsInstance<String>()
val ints = items.filterIsInstance<Int>()

println(strings)
println(ints)`,
        },
        {
            title: "Operator Overloading",
            description: "Sobrecarga operadores para tipos personalizados",
            statement: `## 📝 Operator Overloading

Kotlin permite sobrecargar operadores para crear sintaxis expresiva.

## 🎯 Objetivo

Crea una clase \`Vector2D\` que sobrecargue:
- \`+\`: suma de vectores
- \`*\`: multiplicación por escalar
- \`unaryMinus\`: negación

## 📋 Ejemplo

\`\`\`kotlin
val v1 = Vector2D(1.0, 2.0)
val v2 = Vector2D(3.0, 4.0)
val v3 = v1 + v2  // Vector2D(4.0, 6.0)
\`\`\`

## 💡 Pista

Usa \`operator fun plus\`, \`operator fun times\`, etc.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `data class Vector2D(val x: Double, val y: Double) {
    // Sobrecarga el operador +
    operator fun plus(other: Vector2D): Vector2D {
        // Tu código aquí
    }
    
    // Sobrecarga el operador *
    operator fun times(scalar: Double): Vector2D {
        // Tu código aquí
    }
    
    // Sobrecarga unary -
    operator fun unaryMinus(): Vector2D {
        // Tu código aquí
    }
}

// Prueba
val v1 = Vector2D(1.0, 2.0)
val v2 = Vector2D(3.0, 4.0)
println(v1 + v2)
println(v1 * 2.0)
println(-v1)`,
        },
        {
            title: "Context Receivers",
            description:
                "Usa context receivers para dependency injection implícito",
            statement: `## 📝 Context Receivers (Experimental)

Context receivers permiten requerimientos de contexto implícitos.

## 🎯 Objetivo

Crea funciones que requieran un contexto \`Logger\`:
- Las funciones reciben el logger implícitamente
- No es necesario pasarlo como parámetro

## 📋 Ejemplo

\`\`\`kotlin
context(Logger)
fun processData() {
    log("Processing...")
}
\`\`\`

## 💡 Pista

Usa \`context(Logger)\` y llama funciones del contexto directamente.

**Nota:** Feature experimental, requiere \`@OptIn\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `// Habilita context receivers
@OptIn(ExperimentalStdlibApi::class)

interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("[LOG] \$message")
    }
}

context(Logger)
fun processData(data: String) {
    // Tu código aquí
    // Usa log() directamente
}

// Prueba
fun main() {
    with(ConsoleLogger()) {
        processData("Important data")
    }
}`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de Kotlin creados`);
}
