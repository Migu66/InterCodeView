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
                statement: `## 📝 Descripción del Ejercicio

Tu primer programa en Python es el clásico "Hola Mundo". Este ejercicio te introduce a la sintaxis básica de Python y a la función \`print()\`.

## 🎯 Objetivo

Escribe un programa que imprima exactamente el texto "Hola Mundo" en la consola.

## 📋 Requisitos

- Utiliza la función \`print()\` para mostrar el texto
- El texto debe ser exactamente: **Hola Mundo**
- No olvides las comillas para el string

## 💡 Pista

La función \`print()\` en Python se usa para mostrar información en la consola. Solo necesitas escribir el texto entre comillas dentro de los paréntesis.

## ✅ Ejemplo de Salida

\`\`\`
Hola Mundo
\`\`\``,
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 1,
                starterCode: `# Tu primer programa en Python
# Completa el código para imprimir "Hola Mundo"

print()`,
            },
            {
                title: "Variables y Tipos",
                description:
                    "Aprende a declarar variables y trabajar con diferentes tipos de datos.",
                statement: `## 📝 Descripción del Ejercicio

En Python, las variables son contenedores que almacenan valores. No necesitas declarar el tipo de variable explícitamente, Python lo infiere automáticamente.

## 🎯 Objetivo

Crea variables de diferentes tipos de datos:
- Una variable de tipo **string** (texto)
- Una variable de tipo **int** (número entero)
- Una variable de tipo **float** (número decimal)
- Una variable de tipo **boolean** (verdadero/falso)

## 📋 Requisitos

- Declara una variable \`nombre\` con tu nombre (string)
- Declara una variable \`edad\` con un número entero
- Declara una variable \`altura\` con un número decimal
- Declara una variable \`es_estudiante\` con un valor booleano (True o False)

## 💡 Pista

En Python:
- Los strings van entre comillas: "texto" o 'texto'
- Los números enteros se escriben directamente: 25
- Los decimales usan punto: 1.75
- Los booleanos son: True o False (con mayúscula inicial)

## ✅ Ejemplo

\`\`\`python
nombre = "Juan"
edad = 25
altura = 1.75
es_estudiante = True
\`\`\``,
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 2,
                starterCode: `# Declara variables de diferentes tipos
# String, int, float, boolean

nombre = 
edad = 
altura = 
es_estudiante = `,
            },
            {
                title: "Operaciones Básicas",
                description:
                    "Realiza operaciones matemáticas básicas con Python.",
                statement: `## 📝 Descripción del Ejercicio

Python puede realizar operaciones matemáticas de forma sencilla. Los operadores aritméticos básicos son: suma (+), resta (-), multiplicación (*), y división (/).

## 🎯 Objetivo

Dadas dos variables \`a = 10\` y \`b = 5\`, realiza las siguientes operaciones:
- Suma de a y b
- Resta de a menos b
- Multiplicación de a por b
- División de a entre b

## 📋 Requisitos

- Crea una variable \`suma\` con el resultado de a + b
- Crea una variable \`resta\` con el resultado de a - b
- Crea una variable \`multiplicacion\` con el resultado de a * b
- Crea una variable \`division\` con el resultado de a / b

## 💡 Pista

Los operadores matemáticos en Python son muy intuitivos:
- \`+\` para sumar
- \`-\` para restar
- \`*\` para multiplicar
- \`/\` para dividir

## ✅ Resultados Esperados

\`\`\`
suma = 15
resta = 5
multiplicacion = 50
division = 2.0
\`\`\``,
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 3,
                starterCode: `# Realiza operaciones matemáticas
a = 10
b = 5

# Completa las operaciones
suma = 
resta = 
multiplicacion = 
division = `,
            },
            {
                title: "Condicionales",
                description:
                    "Usa if, elif y else para tomar decisiones en tu código.",
                statement: `## 📝 Descripción del Ejercicio

Las estructuras condicionales permiten que tu programa tome decisiones basadas en condiciones. En Python usamos \`if\`, \`elif\` y \`else\`.

## 🎯 Objetivo

Crea un programa que verifique si una persona es mayor de edad (18 años o más):
- Si tiene 18 años o más, imprime "Eres mayor de edad"
- Si tiene menos de 18 años, imprime "Eres menor de edad"

## 📋 Requisitos

- Usa la estructura \`if-else\`
- Compara la variable \`edad\` con 18
- Imprime el mensaje correspondiente usando \`print()\`

## 💡 Pista

La sintaxis de un condicional en Python:
\`\`\`python
if condicion:
    # código si la condición es verdadera
else:
    # código si la condición es falsa
\`\`\`

Para comparar, usa el operador \`>=\` (mayor o igual que)

## ✅ Ejemplo de Salida

Si edad = 18:
\`\`\`
Eres mayor de edad
\`\`\`

Si edad = 15:
\`\`\`
Eres menor de edad
\`\`\``,
                difficulty: "EASY" as const,
                languageId: pythonLanguage.id,
                order: 4,
                starterCode: `# Completa la estructura condicional
edad = 18

if edad >= 18:
    # Tu código aquí
    pass
else:
    # Tu código aquí
    pass`,
            },
            // Nivel Medio
            {
                title: "Bucles y Listas",
                description:
                    "Itera sobre listas y realiza operaciones con bucles for y while.",
                statement: `## 📝 Descripción del Ejercicio

Los bucles permiten repetir código múltiples veces. El bucle \`for\` es especialmente útil para iterar sobre listas.

## 🎯 Objetivo

Dada una lista de números \`[1, 2, 3, 4, 5]\`:
- Itera sobre cada número de la lista
- Imprime cada número multiplicado por 2

## 📋 Requisitos

- Usa un bucle \`for\` para iterar sobre la lista
- En cada iteración, multiplica el número por 2
- Imprime el resultado

## 💡 Pista

Sintaxis del bucle for:
\`\`\`python
for variable in lista:
    # código a ejecutar
\`\`\`

## ✅ Salida Esperada

\`\`\`
2
4
6
8
10
\`\`\``,
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 1,
                starterCode: `# Itera sobre la lista y realiza operaciones
numeros = [1, 2, 3, 4, 5]

# Usa un bucle for para imprimir cada número
for numero in numeros:
    # Tu código aquí
    pass`,
            },
            {
                title: "Funciones",
                description:
                    "Crea y utiliza funciones reutilizables en Python.",
                statement: `## 📝 Descripción del Ejercicio

Las funciones son bloques de código reutilizables que realizan una tarea específica. Se definen con la palabra clave \`def\`.

## 🎯 Objetivo

Crea una función llamada \`sumar\` que:
- Reciba dos parámetros: \`a\` y \`b\`
- Retorne la suma de ambos números
- Prueba la función sumando 5 + 3

## 📋 Requisitos

- Define la función usando \`def sumar(a, b):\`
- Usa \`return\` para devolver el resultado
- Llama a la función y guarda el resultado en \`resultado\`
- Imprime el resultado

## 💡 Pista

Sintaxis de una función:
\`\`\`python
def nombre_funcion(parametro1, parametro2):
    resultado = parametro1 + parametro2
    return resultado
\`\`\`

## ✅ Salida Esperada

\`\`\`
8
\`\`\``,
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 2,
                starterCode: `# Define una función que sume dos números
def sumar(a, b):
    # Tu código aquí
    pass

# Llama a la función
resultado = sumar(5, 3)
print(resultado)`,
            },
            {
                title: "Diccionarios",
                description: "Trabaja con estructuras de datos clave-valor.",
                statement: `## 📝 Descripción del Ejercicio

Los diccionarios son estructuras de datos que almacenan pares clave-valor. Son muy útiles para organizar información relacionada.

## 🎯 Objetivo

Trabaja con el siguiente diccionario:
\`\`\`python
persona = {
    "nombre": "Juan",
    "edad": 25,
    "ciudad": "Madrid"
}
\`\`\`

- Accede e imprime el valor de "nombre"
- Accede e imprime el valor de "edad"
- Agrega una nueva clave "profesion" con el valor "Programador"
- Imprime el diccionario completo

## 📋 Requisitos

- Usa la sintaxis \`diccionario["clave"]\` para acceder a valores
- Usa la misma sintaxis para agregar nuevos pares clave-valor

## 💡 Pista

Para acceder:
\`\`\`python
valor = diccionario["clave"]
\`\`\`

Para agregar:
\`\`\`python
diccionario["nueva_clave"] = "nuevo_valor"
\`\`\``,
                difficulty: "MEDIUM" as const,
                languageId: pythonLanguage.id,
                order: 3,
                starterCode: `# Crea y manipula un diccionario
persona = {
    "nombre": "Juan",
    "edad": 25,
    "ciudad": "Madrid"
}

# Accede a los valores del diccionario
# Tu código aquí`,
            },
            // Nivel Difícil
            {
                title: "Clases y Objetos",
                description:
                    "Implementa programación orientada a objetos en Python.",
                statement: `## 📝 Descripción del Ejercicio

La programación orientada a objetos (POO) permite crear estructuras de datos personalizadas usando clases. Una clase es un molde para crear objetos.

## 🎯 Objetivo

Crea una clase \`Persona\` que:
- Tenga un constructor (\`__init__\`) que reciba \`nombre\` y \`edad\`
- Almacene estos valores como atributos del objeto
- Tenga un método \`saludar()\` que imprima: "Hola, soy [nombre] y tengo [edad] años"

## 📋 Requisitos

- Define la clase con \`class Persona:\`
- Implementa el método \`__init__(self, nombre, edad)\`
- Implementa el método \`saludar(self)\`
- Crea una instancia de la clase con nombre "Ana" y edad 30
- Llama al método \`saludar()\`

## 💡 Pista

Estructura de una clase:
\`\`\`python
class MiClase:
    def __init__(self, parametro):
        self.atributo = parametro
    
    def mi_metodo(self):
        print(self.atributo)
\`\`\`

## ✅ Salida Esperada

\`\`\`
Hola, soy Ana y tengo 30 años
\`\`\``,
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 1,
                starterCode: `# Define una clase Persona
class Persona:
    def __init__(self, nombre, edad):
        # Tu código aquí
        pass
    
    def saludar(self):
        # Tu código aquí
        pass

# Crea una instancia de la clase
persona1 = Persona("Ana", 30)`,
            },
            {
                title: "Manejo de Excepciones",
                description:
                    "Aprende a manejar errores de forma elegante con try-except.",
                statement: `## 📝 Descripción del Ejercicio

El manejo de excepciones permite que tu programa continúe ejecutándose incluso cuando ocurren errores. En Python usamos \`try-except-finally\`.

## 🎯 Objetivo

Crea una función \`dividir(a, b)\` que:
- Intente dividir \`a\` entre \`b\`
- Si hay una división por cero, capture la excepción \`ZeroDivisionError\`
- Retorne el resultado si es exitoso
- Retorne "Error: División por cero" si ocurre el error
- Use \`finally\` para imprimir "Operación finalizada"

## 📋 Requisitos

- Usa \`try\` para el código que puede fallar
- Usa \`except ZeroDivisionError\` para capturar el error específico
- Usa \`finally\` para código que siempre se ejecuta
- Retorna valores apropiados

## 💡 Pista

Estructura:
\`\`\`python
try:
    # código que puede fallar
except TipoDeError:
    # manejo del error
finally:
    # código que siempre se ejecuta
\`\`\`

## ✅ Ejemplo de Uso

\`\`\`python
dividir(10, 2)  # Retorna 5.0
dividir(10, 0)  # Retorna "Error: División por cero"
\`\`\``,
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 2,
                starterCode: `# Maneja excepciones correctamente
def dividir(a, b):
    try:
        # Tu código aquí
        pass
    except ZeroDivisionError:
        # Tu código aquí
        pass
    finally:
        # Tu código aquí
        pass

# Prueba la función
resultado = dividir(10, 0)`,
            },
            {
                title: "Decoradores",
                description:
                    "Domina los decoradores y su uso avanzado en Python.",
                statement: `## 📝 Descripción del Ejercicio

Los decoradores son funciones que modifican el comportamiento de otras funciones. Son una característica avanzada de Python que permite agregar funcionalidad de forma elegante.

## 🎯 Objetivo

Crea un decorador \`mi_decorador\` que:
- Imprima "Antes de ejecutar la función" antes de llamar a la función original
- Execute la función original
- Imprima "Después de ejecutar la función" después de la ejecución
- Retorne el resultado de la función original

## 📋 Requisitos

- Define la función decorador con un \`wrapper\` interno
- Usa \`*args\` y \`**kwargs\` para aceptar cualquier argumento
- Aplica el decorador a una función \`saludar(nombre)\`
- La función debe retornar un saludo

## 💡 Pista

Estructura de un decorador:
\`\`\`python
def decorador(func):
    def wrapper(*args, **kwargs):
        # código antes
        resultado = func(*args, **kwargs)
        # código después
        return resultado
    return wrapper

@decorador
def mi_funcion():
    pass
\`\`\`

## ✅ Salida Esperada

\`\`\`
Antes de ejecutar la función
Después de ejecutar la función
Hola Juan
\`\`\``,
                difficulty: "HARD" as const,
                languageId: pythonLanguage.id,
                order: 3,
                starterCode: `# Crea un decorador
def mi_decorador(func):
    def wrapper(*args, **kwargs):
        # Tu código aquí (antes)
        resultado = func(*args, **kwargs)
        # Tu código aquí (después)
        return resultado
    return wrapper

# Aplica el decorador
@mi_decorador
def saludar(nombre):
    return f"Hola {nombre}"`,
            },
        ];

        for (const exercise of pythonExercises) {
            await prisma.exercise.create({
                data: exercise,
            });
        }
    }

    // Crear ejercicios de ejemplo para JavaScript
    const jsLanguage = createdLanguages.find((l) => l.slug === "javascript");
    if (jsLanguage) {
        const jsExercises = [
            // Nivel Fácil
            {
                title: "Variables y Constantes",
                description: "Aprende la diferencia entre let, const y var.",
                statement: `## 📝 Descripción del Ejercicio

En JavaScript moderno existen tres formas de declarar variables: \`let\`, \`const\` y \`var\`. Es importante entender cuándo usar cada una.

## 🎯 Objetivo

Declara variables usando las tres palabras clave:
- \`let\` para una variable que puede cambiar
- \`const\` para un valor constante
- \`var\` para conocer la forma antigua (no recomendada)

## 📋 Requisitos

- Declara una variable \`nombre\` con \`let\`
- Declara una constante \`PI\` con \`const\` y valor 3.14159
- Declara una variable \`edad\` con \`var\`

## 💡 Pista

- \`let\`: Variables que pueden cambiar su valor
- \`const\`: Valores constantes que no cambiarán
- \`var\`: Forma antigua, tiene problemas de scope

## ✅ Ejemplo

\`\`\`javascript
let nombre = "Carlos"
const PI = 3.14159
var edad = 25
\`\`\``,
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 1,
                starterCode: `// Declara variables usando let, const y var
// let: para variables que pueden cambiar
// const: para valores constantes
// var: forma antigua (evitar en código moderno)

let nombre = 
const PI = 
var edad = `,
            },
            {
                title: "Tipos de Datos",
                description:
                    "Explora los tipos de datos primitivos de JavaScript.",
                statement:
                    "Aprende sobre los tipos de datos primitivos en JavaScript.",
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 2,
                starterCode: `// Tipos de datos primitivos en JavaScript
const texto = "Hola"  // string
const numero = 42     // number
const esVerdad = true // boolean
const indefinido =    // undefined
const nulo =          // null

console.log(typeof texto)`,
            },
            {
                title: "Operadores",
                description:
                    "Utiliza operadores aritméticos, lógicos y de comparación.",
                statement:
                    "Practica con los diferentes tipos de operadores en JavaScript.",
                difficulty: "EASY" as const,
                languageId: jsLanguage.id,
                order: 3,
                starterCode: `// Operadores en JavaScript
const a = 10
const b = 5

// Aritméticos
const suma = 
const resta = 

// Comparación
const esIgual = 
const esMayor = 

// Lógicos
const and = 
const or = `,
            },
            // Nivel Medio
            {
                title: "Arrow Functions",
                description:
                    "Domina las funciones flecha y su sintaxis concisa.",
                statement:
                    "Convierte funciones tradicionales a arrow functions y aprende su sintaxis.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 1,
                starterCode: `// Convierte estas funciones tradicionales a arrow functions

// Función tradicional
function sumar(a, b) {
    return a + b
}

// Arrow function
const sumarArrow = 

// Arrow function con un solo parámetro
const cuadrado = 

// Arrow function sin parámetros
const saludar = `,
            },
            {
                title: "Array Methods",
                description:
                    "Utiliza map, filter, reduce y otros métodos de arrays.",
                statement:
                    "Domina los métodos de arrays más importantes: map, filter y reduce.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 2,
                starterCode: `// Métodos de arrays
const numeros = [1, 2, 3, 4, 5]

// map: transforma cada elemento
const dobles = 

// filter: filtra elementos
const pares = 

// reduce: reduce a un solo valor
const suma = 

console.log({ dobles, pares, suma })`,
            },
            {
                title: "Destructuring",
                description: "Aprende a desestructurar objetos y arrays.",
                statement:
                    "Practica la desestructuración de objetos y arrays en JavaScript.",
                difficulty: "MEDIUM" as const,
                languageId: jsLanguage.id,
                order: 3,
                starterCode: `// Destructuring de objetos y arrays

const persona = {
    nombre: "Ana",
    edad: 25,
    ciudad: "Madrid"
}

// Desestructura el objeto
const { nombre, edad } = 

// Destructuring de arrays
const colores = ["rojo", "verde", "azul"]
const [primero, segundo] = 

console.log(nombre, edad)
console.log(primero, segundo)`,
            },
            // Nivel Difícil
            {
                title: "Promesas y Async/Await",
                description: "Maneja operaciones asíncronas de forma efectiva.",
                statement:
                    "Aprende a manejar operaciones asíncronas usando promesas y async/await.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 1,
                starterCode: `// Promesas y async/await

// Crea una promesa
const obtenerDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Tu código aquí
        }, 1000)
    })
}

// Usa async/await
async function procesarDatos() {
    try {
        // Tu código aquí
    } catch (error) {
        console.error(error)
    }
}

procesarDatos()`,
            },
            {
                title: "Closures",
                description: "Comprende y aplica closures en JavaScript.",
                statement:
                    "Comprende el concepto de closures y cómo las funciones recuerdan su contexto.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 2,
                starterCode: `// Closures: funciones que recuerdan su contexto

function crearContador() {
    let cuenta = 0
    
    return {
        incrementar: function() {
            // Tu código aquí
        },
        obtenerCuenta: function() {
            // Tu código aquí
        }
    }
}

const contador = crearContador()
contador.incrementar()
console.log(contador.obtenerCuenta())`,
            },
            {
                title: "Prototypes y Herencia",
                description: "Explora el sistema de prototipos de JavaScript.",
                statement:
                    "Aprende sobre el sistema de prototipos y herencia en JavaScript.",
                difficulty: "HARD" as const,
                languageId: jsLanguage.id,
                order: 3,
                starterCode: `// Prototypes y herencia

// Constructor function
function Animal(nombre) {
    this.nombre = nombre
}

// Añade un método al prototype
Animal.prototype.hablar = function() {
    // Tu código aquí
}

// Herencia
function Perro(nombre, raza) {
    Animal.call(this, nombre)
    this.raza = raza
}

// Establece la herencia
Perro.prototype = Object.create(Animal.prototype)
Perro.prototype.constructor = Perro

const miPerro = new Perro("Max", "Labrador")`,
            },
        ];

        for (const exercise of jsExercises) {
            await prisma.exercise.create({
                data: exercise,
            });
        }
    }

}

main()
    .catch((e) => {
        console.error("❌ Error al ejecutar seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
