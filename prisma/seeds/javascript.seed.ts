import { PrismaClient } from "../../src/generated/prisma";

export async function seedJavaScript(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Reverse String",
            description: "Invierte una cadena de texto",
            statement: `## 📝 Invertir String

Ejercicio fundamental de manipulación de strings en JavaScript.

## 🎯 Objetivo

Invierte un string sin usar el método \`.reverse()\` directamente en el string.

## 📋 Ejemplos

\`\`\`javascript
reverseString("hello")      // "olleh"
reverseString("world")      // "dlrow"
reverseString("JavaScript") // "tpircSavaJ"
\`\`\`

## 💡 Pista

Convierte a array con \`split('')\`, usa \`reverse()\`, y vuelve a string con \`join('')\`. O usa un bucle.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `function reverseString(str) {
    // Tu código aquí
}

// Prueba
console.log(reverseString("hello"));
console.log(reverseString("world"));`,
        },
        {
            title: "Array Chunk",
            description: "Divide un array en grupos de tamaño específico",
            statement: `## 📝 Dividir Array en Chunks

Útil para paginación y procesamiento por lotes. Preguntado en entrevistas de startups.

## 🎯 Objetivo

Divide un array en subarrays de tamaño específico.

## 📋 Ejemplos

\`\`\`javascript
chunk([1, 2, 3, 4, 5], 2)          // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) // [[1, 2, 3], [4, 5, 6], [7, 8]]
chunk([1, 2, 3], 5)                // [[1, 2, 3]]
\`\`\`

## 💡 Pista

Usa \`slice()\` en un bucle incrementando de \`size\` en \`size\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `function chunk(array, size) {
    // Tu código aquí
}

// Prueba
console.log(chunk([1, 2, 3, 4, 5], 2));
console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8], 3));`,
        },
        {
            title: "Capitalize Words",
            description: "Capitaliza la primera letra de cada palabra",
            statement: `## 📝 Capitalizar Palabras

Manipulación de strings común en procesamiento de texto.

## 🎯 Objetivo

Capitaliza la primera letra de cada palabra en una oración.

## 📋 Ejemplos

\`\`\`javascript
capitalize("hello world")         // "Hello World"
capitalize("javascript is fun")   // "Javascript Is Fun"
capitalize("i love coding")       // "I Love Coding"
\`\`\`

## 💡 Pista

Divide en palabras con \`split(' ')\`, capitaliza cada una, y júntalas con \`join(' ')\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `function capitalize(str) {
    // Tu código aquí
}

// Prueba
console.log(capitalize("hello world"));
console.log(capitalize("javascript is fun"));`,
        },
        {
            title: "Max Character",
            description: "Encuentra el carácter que más se repite en un string",
            statement: `## 📝 Carácter Más Frecuente

Problema de conteo con objetos/Maps.

## 🎯 Objetivo

Retorna el carácter que más aparece en un string.

## 📋 Ejemplos

\`\`\`javascript
maxChar("abcccccccd")     // "c"
maxChar("apple 1231111")  // "1"
maxChar("hello")          // "l"
\`\`\`

## 💡 Pista

Crea un objeto para contar frecuencias y encuentra el máximo.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `function maxChar(str) {
    // Tu código aquí
}

// Prueba
console.log(maxChar("abcccccccd"));
console.log(maxChar("apple 1231111"));`,
        },
        {
            title: "Anagram",
            description: "Verifica si dos strings son anagramas",
            statement: `## 📝 Verificar Anagramas

Problema clásico de conteo de caracteres.

## 🎯 Objetivo

Determina si dos strings son anagramas (mismas letras en diferente orden).

## 📋 Ejemplos

\`\`\`javascript
anagrams("rail safety", "fairy tales")  // true
anagrams("RAIL! SAFETY!", "fairy tales") // true
anagrams("Hi there", "Bye there")       // false
\`\`\`

## 💡 Pista

Limpia los strings (quita espacios, convierte a minúsculas), ordena y compara. O usa conteo de caracteres.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `function anagrams(stringA, stringB) {
    // Tu código aquí
}

// Prueba
console.log(anagrams("rail safety", "fairy tales"));
console.log(anagrams("Hi there", "Bye there"));`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Debounce Function",
            description:
                "Implementa debounce para optimizar eventos frecuentes",
            statement: `## 📝 Implementar Debounce

Técnica crucial de performance en frontend. Preguntado en entrevistas de React/Vue.

## 🎯 Objetivo

Crea una función debounce que retrase la ejecución hasta que pasen X ms sin nuevas llamadas.

## 📋 Ejemplo

\`\`\`javascript
const debouncedLog = debounce(() => console.log("Hello!"), 1000);
debouncedLog(); // No se ejecuta aún
debouncedLog(); // Cancela el anterior
debouncedLog(); // Solo este se ejecuta después de 1 segundo
\`\`\`

## 💡 Pista

Usa closure para mantener el timer. \`clearTimeout\` cancela el timer anterior, \`setTimeout\` crea uno nuevo.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `function debounce(func, delay) {
    // Tu código aquí
}

// Prueba
const debouncedLog = debounce(() => console.log("Hello!"), 2000);
debouncedLog();
debouncedLog();
debouncedLog();`,
        },
        {
            title: "Flatten Array",
            description: "Aplana un array multidimensional recursivamente",
            statement: `## 📝 Aplanar Array Anidado

Problema de recursión preguntado en Airbnb, Uber.

## 🎯 Objetivo

Convierte un array multidimensional en uno de una sola dimensión.

## 📋 Ejemplos

\`\`\`javascript
flatten([1, [2, 3], [4, [5, 6]]])   // [1, 2, 3, 4, 5, 6]
flatten([1, 2, [3, 4, [5]]])        // [1, 2, 3, 4, 5]
flatten([[1, 2], [3, [4, 5]]])      // [1, 2, 3, 4, 5]
\`\`\`

## 💡 Pista

Usa recursión. Si el elemento es array, llama flatten recursivamente. Si no, añádelo al resultado.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `function flatten(arr) {
    // Tu código aquí
}

// Prueba
console.log(flatten([1, [2, 3], [4, [5, 6]]]));
console.log(flatten([1, 2, [3, 4, [5]]]));`,
        },
        {
            title: "Deep Clone Object",
            description: "Crea una copia profunda de un objeto",
            statement: `## 📝 Clonar Objeto Profundamente

Fundamental para entender referencias en JavaScript. Preguntado en Facebook, Google.

## 🎯 Objetivo

Clona un objeto recursivamente incluyendo objetos anidados y arrays.

## 📋 Ejemplo

\`\`\`javascript
const obj = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = deepClone(obj);
cloned.b.c = 999;
console.log(obj.b.c);  // Debe ser 2 (no modificado)
\`\`\`

## 💡 Pista

Verifica el tipo: si es null o primitivo, retorna directo. Si es array u objeto, itera y clona recursivamente.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `function deepClone(obj) {
    // Tu código aquí
}

// Prueba
const original = { a: 1, b: { c: 2 } };
const copia = deepClone(original);
copia.b.c = 999;
console.log(original.b.c); // Debe ser 2`,
        },
        {
            title: "Throttle Function",
            description:
                "Implementa throttle para limitar frecuencia de ejecución",
            statement: `## 📝 Implementar Throttle

Similar a debounce pero garantiza ejecución periódica. Usado en scroll/resize.

## 🎯 Objetivo

Crea throttle que ejecute la función máximo una vez cada X ms, sin importar cuántas veces se llame.

## 📋 Ejemplo

\`\`\`javascript
const throttledLog = throttle(() => console.log("Hi!"), 1000);
throttledLog(); // Se ejecuta inmediatamente
throttledLog(); // Ignorado
throttledLog(); // Ignorado (dentro del periodo de 1s)
\`\`\`

## 💡 Pista

Mantén un timestamp de la última ejecución. Compara el tiempo actual con el último + delay.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `function throttle(func, delay) {
    // Tu código aquí
}

// Prueba
const throttledLog = throttle(() => console.log("Hello!"), 1000);
throttledLog();
throttledLog();
setTimeout(() => throttledLog(), 1100);`,
        },
        {
            title: "Curry Function",
            description:
                "Implementa currying para una función de múltiples argumentos",
            statement: `## 📝 Currying

Técnica de programación funcional. Preguntado en entrevistas avanzadas de JavaScript.

## 🎯 Objetivo

Transforma una función de múltiples argumentos en una secuencia de funciones de un argumento.

## 📋 Ejemplos

\`\`\`javascript
function sum(a, b, c) { return a + b + c; }
const curriedSum = curry(sum);
curriedSum(1)(2)(3)        // 6
curriedSum(1, 2)(3)        // 6
curriedSum(1)(2, 3)        // 6
\`\`\`

## 💡 Pista

Usa recursión. Acumula argumentos hasta tener la cantidad esperada (\`func.length\`), luego ejecuta la función.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `function curry(func) {
    // Tu código aquí
}

// Prueba
function sum(a, b, c) { return a + b + c; }
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2)(3));`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Implement Promise.all",
            description: "Crea tu propia versión de Promise.all",
            statement: `## 📝 Reimplementar Promise.all

Demuestra dominio de Promises. Preguntado en empresas top tier.

## 🎯 Objetivo

Implementa una función que:
- Reciba un array de promesas
- Retorne una promesa que se resuelve cuando todas se resuelven
- Si alguna falla, falla inmediatamente

## 📋 Ejemplo

\`\`\`javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(results => {
    console.log(results); // [1, 2, 3]
});
\`\`\`

## 💡 Pista

Crea una Promise nueva. Usa un contador y un array para resultados. Incrementa el contador cuando cada promise se resuelve.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `function myPromiseAll(promises) {
    // Tu código aquí
}

// Prueba
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3])
    .then(results => console.log(results))
    .catch(err => console.error(err));`,
        },
        {
            title: "Event Emitter",
            description: "Implementa el patrón Observer (EventEmitter)",
            statement: `## 📝 Event Emitter

Patrón Observer fundamental. Preguntado en Node.js y entrevistas de arquitectura.

## 🎯 Objetivo

Crea una clase EventEmitter con:
- \`on(event, callback)\`: suscribirse
- \`emit(event, ...args)\`: emitir evento
- \`off(event, callback)\`: desuscribirse

## 📋 Ejemplo

\`\`\`javascript
const emitter = new EventEmitter();
const cb = (data) => console.log(data);
emitter.on('test', cb);
emitter.emit('test', 'Hello!');  // "Hello!"
emitter.off('test', cb);
emitter.emit('test', 'World!');  // No imprime
\`\`\`

## 💡 Pista

Usa un objeto Map para guardar eventos y sus callbacks en arrays.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `class EventEmitter {
    constructor() {
        // Tu código aquí
    }
    
    on(event, callback) {
        // Tu código aquí
    }
    
    emit(event, ...args) {
        // Tu código aquí
    }
    
    off(event, callback) {
        // Tu código aquí
    }
}

// Prueba
const emitter = new EventEmitter();
emitter.on('test', (data) => console.log(data));
emitter.emit('test', 'Hello!');`,
        },
        {
            title: "Memoization",
            description: "Implementa memoización genérica",
            statement: `## 📝 Función de Memoización

Optimización de performance mediante cache. Pregunta avanzada en JavaScript.

## 🎯 Objetivo

Crea una función \`memoize\` que tome otra función y retorne una versión que cachea resultados.

## 📋 Ejemplo

\`\`\`javascript
const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
const memoFactorial = memoize(factorial);
memoFactorial(5); // Calcula
memoFactorial(5); // Retorna desde caché (rápido)
\`\`\`

## 💡 Pista

Usa un Map o objeto para cache. La clave puede ser \`JSON.stringify(arguments)\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `function memoize(fn) {
    // Tu código aquí
}

// Prueba
const suma = (a, b) => {
    console.log("Calculando...");
    return a + b;
};
const sumaMemo = memoize(suma);
console.log(sumaMemo(2, 3)); // "Calculando..." y 5
console.log(sumaMemo(2, 3)); // Solo 5`,
        },
        {
            title: "Implement bind()",
            description: "Crea tu propia versión del método bind",
            statement: `## 📝 Reimplementar bind()

Pregunta profunda sobre contexto (this) en JavaScript. Común en Facebook, Google.

## 🎯 Objetivo

Implementa \`Function.prototype.myBind()\` que funcione igual que \`bind()\`.

## 📋 Ejemplo

\`\`\`javascript
function greet(greeting, punctuation) {
    return \`\${greeting} \${this.name}\${punctuation}\`;
}
const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');
boundGreet('!'); // "Hello John!"
\`\`\`

## 💡 Pista

Retorna una nueva función que use \`apply()\` o \`call()\` para establecer el contexto. Maneja argumentos parciales.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `Function.prototype.myBind = function(context, ...args) {
    // Tu código aquí
};

// Prueba
function greet(greeting, punctuation) {
    return \`\${greeting} \${this.name}\${punctuation}\`;
}
const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');
console.log(boundGreet('!'));`,
        },
        {
            title: "LRU Cache",
            description:
                "Implementa una caché con política LRU (Least Recently Used)",
            statement: `## 📝 LRU Cache

Estructura de datos avanzada. Preguntado en Google, Amazon, Facebook.

## 🎯 Objetivo

Implementa una caché LRU con capacidad limitada:
- \`get(key)\`: obtiene valor (marca como usado recientemente)
- \`put(key, value)\`: añade/actualiza (elimina el menos usado si está lleno)

## 📋 Ejemplo

\`\`\`javascript
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 1
cache.put(3, 3);    // Elimina key 2
cache.get(2);       // null (fue eliminado)
\`\`\`

## 💡 Pista

Usa un Map (mantiene orden de inserción). Al acceder, elimina y reinserta al final para marcar como reciente.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `class LRUCache {
    constructor(capacity) {
        // Tu código aquí
    }
    
    get(key) {
        // Tu código aquí
    }
    
    put(key, value) {
        // Tu código aquí
    }
}

// Prueba
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // null`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de JavaScript creados`);
}
