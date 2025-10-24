import { PrismaClient } from "../../src/generated/prisma";

export async function seedTypeScript(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Basic Types",
            description:
                "Define tipos básicos para diferentes estructuras de datos",
            statement: `## 📝 Tipos Básicos en TypeScript

Fundamento de TypeScript para cualquier entrevista de frontend moderno.

## 🎯 Objetivo

Define tipos para:
- Un objeto Usuario con nombre (string), edad (number), email (string)
- Un tipo Producto con id, nombre y precio
- Un type para Rol que puede ser "admin", "user", o "guest"

## 📋 Ejemplo

\`\`\`typescript
const usuario: Usuario = {
    nombre: "Ana",
    edad: 25,
    email: "ana@example.com"
};
\`\`\`

## 💡 Pista

Usa \`type\` o \`interface\`. Para valores literales específicos, usa union types.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `// Define el tipo Usuario
type Usuario = {
    // Tu código aquí
};

// Define el tipo Producto
type Producto = {
    // Tu código aquí
};

// Define el tipo Rol (literal union)
type Rol = // Tu código aquí

// Usa los tipos
const usuario: Usuario = {
    nombre: "Ana",
    edad: 25,
    email: "ana@test.com"
};`,
        },
        {
            title: "Generic Function",
            description: "Crea funciones genéricas type-safe",
            statement: `## 📝 Funciones Genéricas

Los genéricos son esenciales en TypeScript. Preguntado en Microsoft, Airbnb.

## 🎯 Objetivo

Crea una función genérica \`getFirstElement\` que retorne el primer elemento de un array de cualquier tipo.

## 📋 Ejemplos

\`\`\`typescript
getFirstElement([1, 2, 3])        // tipo: number
getFirstElement(["a", "b"])       // tipo: string
getFirstElement([true, false])    // tipo: boolean
\`\`\`

## 💡 Pista

Usa \`<T>\` para el parámetro de tipo genérico. La función recibe \`T[]\` y retorna \`T | undefined\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `function getFirstElement<T>(arr: T[]): T | undefined {
    // Tu código aquí
}

// Prueba (TypeScript inferirá los tipos)
console.log(getFirstElement([1, 2, 3]));
console.log(getFirstElement(["a", "b", "c"]));`,
        },
        {
            title: "Union Types",
            description: "Trabaja con tipos de unión y type guards",
            statement: `## 📝 Union Types y Type Guards

Fundamental para manejar múltiples tipos de forma segura.

## 🎯 Objetivo

Crea una función \`formatValue\` que:
- Acepte string o number
- Si es string, retorne la longitud
- Si es number, retorne el doble del valor

## 📋 Ejemplos

\`\`\`typescript
formatValue("hello")  // 5
formatValue(10)       // 20
\`\`\`

## 💡 Pista

Usa \`typeof\` para verificar el tipo en runtime (type guard).`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `function formatValue(value: string | number): number {
    // Tu código aquí (usa typeof para verificar el tipo)
}

// Prueba
console.log(formatValue("hello"));
console.log(formatValue(10));`,
        },
        {
            title: "Interface vs Type",
            description: "Comprende diferencias entre interface y type",
            statement: `## 📝 Interface vs Type

Ambos definen formas, pero tienen diferencias sutiles.

## 🎯 Objetivo

- Crea una interface \`IPerson\` con nombre y edad
- Extiende esta interface para crear \`IEmployee\` añadiendo employeeId
- Crea un type \`PersonType\` equivalente usando type

## 📋 Ejemplo

\`\`\`typescript
const employee: IEmployee = {
    nombre: "Juan",
    edad: 30,
    employeeId: "E123"
};
\`\`\`

## 💡 Pista

Interfaces usan \`extends\`, types usan \`&\` (intersection). Interfaces pueden declararse múltiples veces (declaration merging).`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `// Define la interface IPerson
interface IPerson {
    // Tu código aquí
}

// Extiende para crear IEmployee
interface IEmployee extends IPerson {
    // Tu código aquí
}

// Crea el type equivalente
type PersonType = {
    // Tu código aquí
};

// Usa los tipos
const employee: IEmployee = {
    nombre: "Juan",
    edad: 30,
    employeeId: "E123"
};`,
        },
        {
            title: "Optional and Readonly",
            description: "Usa modificadores optional (?) y readonly",
            statement: `## 📝 Optional y Readonly

Modificadores importantes para expresar intención en tipos.

## 🎯 Objetivo

Define un tipo \`Config\` donde:
- \`apiUrl\` es string requerido y readonly
- \`timeout\` es number opcional
- \`retries\` es number opcional

## 📋 Ejemplo

\`\`\`typescript
const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};
// config.apiUrl = "otra"; // Error: readonly
\`\`\`

## 💡 Pista

Usa \`readonly\` antes del nombre de propiedad y \`?\` después para opcionales.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `type Config = {
    // Tu código aquí
    // apiUrl: readonly string
    // timeout: optional number
    // retries: optional number
};

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// config.apiUrl = "otra"; // Debería dar error`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Utility Types - Partial, Pick, Omit",
            description: "Domina los utility types más comunes",
            statement: `## 📝 Utility Types

TypeScript incluye utility types poderosos para transformar tipos existentes.

## 🎯 Objetivo

Dado \`User\`, crea:
- \`PartialUser\`: todas las props opcionales
- \`UserBasic\`: solo id y nombre (Pick)
- \`UserPublic\`: sin password (Omit)

## 📋 Ejemplo

\`\`\`typescript
interface User {
    id: number;
    nombre: string;
    email: string;
    password: string;
}
\`\`\`

## 💡 Pista

\`Partial<T>\`, \`Pick<T, K>\`, \`Omit<T, K>\` son built-in de TypeScript.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `interface User {
    id: number;
    nombre: string;
    email: string;
    password: string;
    edad: number;
}

// Usa utility types
type PartialUser = // Tu código aquí
type UserBasic = // Tu código aquí
type UserPublic = // Tu código aquí

// Prueba
const partialUser: PartialUser = { nombre: "Ana" };
const userBasic: UserBasic = { id: 1, nombre: "Ana" };
const userPublic: UserPublic = { 
    id: 1, 
    nombre: "Ana", 
    email: "ana@test.com", 
    edad: 25 
};`,
        },
        {
            title: "Type Guards",
            description: "Implementa custom type guards",
            statement: `## 📝 Custom Type Guards

Las type guards permiten refinar tipos en tiempo de ejecución de forma type-safe.

## 🎯 Objetivo

Crea una función guard \`isUser\` que verifique si un objeto es de tipo \`User\` (tiene las propiedades requeridas).

## 📋 Ejemplo

\`\`\`typescript
function isUser(obj: any): obj is User {
    // Verificar propiedades
}

if (isUser(data)) {
    // Aquí TypeScript sabe que data es User
    console.log(data.nombre);
}
\`\`\`

## 💡 Pista

Usa \`obj is Type\` como tipo de retorno. Verifica con \`typeof\` y \`in\` operator.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `interface User {
    id: number;
    nombre: string;
    email: string;
}

function isUser(obj: any): obj is User {
    // Tu código aquí
    // Verifica que obj tenga las propiedades correctas
}

// Prueba
const obj1 = { id: 1, nombre: "Ana", email: "ana@test.com" };
const obj2 = { id: 1, nombre: "Pedro" };

console.log(isUser(obj1)); // true
console.log(isUser(obj2)); // false`,
        },
        {
            title: "Mapped Types",
            description: "Crea tipos mapeados personalizados",
            statement: `## 📝 Mapped Types

Los mapped types transforman cada propiedad de un tipo.

## 🎯 Objetivo

Crea un tipo genérico \`Nullable<T>\` que haga todas las propiedades de T nullable (T[K] | null).

## 📋 Ejemplo

\`\`\`typescript
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

interface User { name: string; age: number; }
type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; }
\`\`\`

## 💡 Pista

Usa \`[K in keyof T]\` para iterar sobre las keys, y transforma \`T[K]\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `// Crea el tipo Nullable
type Nullable<T> = {
    // Tu código aquí
};

// Prueba
interface User {
    nombre: string;
    edad: number;
}

type NullableUser = Nullable<User>;

const user: NullableUser = {
    nombre: "Ana",
    edad: null  // Debería ser válido
};`,
        },
        {
            title: "Generic Constraints",
            description: "Usa constraints para limitar tipos genéricos",
            statement: `## 📝 Generic Constraints

Los constraints limitan qué tipos puede recibir un genérico.

## 🎯 Objetivo

Crea una función \`getProperty\` que:
- Sea genérica con tipo T y key K
- K debe ser una key válida de T (extends keyof T)
- Retorne T[K]

## 📋 Ejemplo

\`\`\`typescript
const user = { name: "Ana", age: 25 };
getProperty(user, "name")   // "Ana" (tipo: string)
getProperty(user, "age")    // 25 (tipo: number)
// getProperty(user, "invalid") // Error de compilación
\`\`\`

## 💡 Pista

\`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `function getProperty<T, K extends keyof T>(
    obj: T, 
    key: K
): T[K] {
    // Tu código aquí
}

// Prueba
const user = { nombre: "Ana", edad: 25, email: "ana@test.com" };
console.log(getProperty(user, "nombre"));
console.log(getProperty(user, "edad"));`,
        },
        {
            title: "Discriminated Unions",
            description: "Implementa union types discriminados",
            statement: `## 📝 Discriminated Unions

Patrón poderoso para manejar diferentes formas de datos con type safety.

## 🎯 Objetivo

Crea tipos para diferentes formas de Response:
- SuccessResponse con data
- ErrorResponse con error
- LoadingResponse sin datos extra
Todos con una propiedad discriminante \`status\`

## 📋 Ejemplo

\`\`\`typescript
function handleResponse(res: Response) {
    if (res.status === 'success') {
        console.log(res.data); // TypeScript sabe que existe
    }
}
\`\`\`

## 💡 Pista

Usa un campo común (discriminante) con valores literales únicos.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `// Define los tipos de respuesta
type SuccessResponse = {
    // Tu código aquí
};

type ErrorResponse = {
    // Tu código aquí
};

type LoadingResponse = {
    // Tu código aquí
};

type Response = SuccessResponse | ErrorResponse | LoadingResponse;

// Función que usa el discriminated union
function handleResponse(response: Response) {
    if (response.status === 'success') {
        console.log(response.data);
    } else if (response.status === 'error') {
        console.log(response.error);
    }
}`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Conditional Types",
            description: "Implementa tipos condicionales complejos",
            statement: `## 📝 Conditional Types

Los tipos condicionales permiten lógica tipo if-else en el sistema de tipos.

## 🎯 Objetivo

Crea \`Unwrap<T>\` que:
- Si T es Promise<U>, retorne U
- Si T es Array<U>, retorne U
- Sino, retorne T

## 📋 Ejemplo

\`\`\`typescript
type T1 = Unwrap<Promise<string>>  // string
type T2 = Unwrap<number[]>         // number
type T3 = Unwrap<boolean>          // boolean
\`\`\`

## 💡 Pista

Usa \`T extends Promise<infer U> ? U : ...\` para extraer tipos anidados.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `type Unwrap<T> = // Tu código aquí

// Prueba
type Test1 = Unwrap<Promise<string>>;  // Debería ser string
type Test2 = Unwrap<number[]>;         // Debería ser number
type Test3 = Unwrap<boolean>;          // Debería ser boolean

const test1: Test1 = "hello";
const test2: Test2 = 42;
const test3: Test3 = true;`,
        },
        {
            title: "Recursive Types",
            description: "Define tipos recursivos para estructuras anidadas",
            statement: `## 📝 Tipos Recursivos

Los tipos recursivos modelan estructuras de datos anidadas como árboles.

## 🎯 Objetivo

Define un tipo \`TreeNode<T>\` para un árbol binario donde cada nodo tiene:
- \`value\`: T
- \`left\`: TreeNode<T> | null (opcional)
- \`right\`: TreeNode<T> | null (opcional)

## 📋 Ejemplo

\`\`\`typescript
const tree: TreeNode<number> = {
    value: 1,
    left: { value: 2 },
    right: { value: 3, left: { value: 4 } }
};
\`\`\`

## 💡 Pista

El tipo se referencia a sí mismo en las propiedades left y right.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `type TreeNode<T> = {
    // Tu código aquí
};

// Prueba
const arbol: TreeNode<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: null,
        right: null
    }
};`,
        },
        {
            title: "Template Literal Types",
            description:
                "Usa template literal types para crear tipos dinámicos",
            statement: `## 📝 Template Literal Types

Feature avanzado de TypeScript 4.1+ para crear tipos basados en strings.

## 🎯 Objetivo

Crea un tipo \`EventName\` que genere strings como "onClick", "onHover", "onFocus" etc., a partir de un union type de acciones.

## 📋 Ejemplo

\`\`\`typescript
type Action = "click" | "hover" | "focus";
type EventName = \`on\${Capitalize<Action>}\`;
// "onClick" | "onHover" | "onFocus"
\`\`\`

## 💡 Pista

Usa template literals con \`\${}\` y utility types como \`Capitalize\`, \`Uppercase\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `type Action = "click" | "hover" | "focus" | "submit";

// Crea el tipo EventName
type EventName = // Tu código aquí

// Prueba
const handler: Record<EventName, () => void> = {
    onClick: () => console.log("clicked"),
    onHover: () => console.log("hovered"),
    onFocus: () => console.log("focused"),
    onSubmit: () => console.log("submitted")
};`,
        },
        {
            title: "Advanced Mapped Types",
            description: "Crea transformaciones complejas con mapped types",
            statement: `## 📝 Mapped Types Avanzados

Combina mapped types con conditional types para transformaciones poderosas.

## 🎯 Objetivo

Crea \`DeepReadonly<T>\` que haga readonly todas las propiedades recursivamente, incluyendo objetos anidados.

## 📋 Ejemplo

\`\`\`typescript
type User = {
    name: string;
    address: { street: string; city: string; };
};
type ReadonlyUser = DeepReadonly<User>;
// Todo readonly, incluso address.street
\`\`\`

## 💡 Pista

Usa recursión: si \`T[K]\` es un objeto, aplica \`DeepReadonly\` recursivamente.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `type DeepReadonly<T> = {
    // Tu código aquí
    // Pista: readonly [K in keyof T]: T[K] extends object ? ... : ...
};

// Prueba
type User = {
    nombre: string;
    edad: number;
    address: {
        calle: string;
        ciudad: string;
    };
};

type ReadonlyUser = DeepReadonly<User>;

const user: ReadonlyUser = {
    nombre: "Ana",
    edad: 25,
    address: { calle: "Main St", ciudad: "Madrid" }
};

// user.address.calle = "otra"; // Debería dar error`,
        },
        {
            title: "Function Overloads",
            description: "Implementa function overloads con tipos precisos",
            statement: `## 📝 Function Overloads

Los overloads permiten múltiples firmas de función con tipos diferentes.

## 🎯 Objetivo

Crea una función \`process\` con overloads:
- \`process(x: string)\`: retorna number (longitud)
- \`process(x: number)\`: retorna string (convertido)
- \`process(x: boolean)\`: retorna string ("yes" o "no")

## 📋 Ejemplo

\`\`\`typescript
process("hello")  // 5 (tipo: number)
process(42)       // "42" (tipo: string)
process(true)     // "yes" (tipo: string)
\`\`\`

## 💡 Pista

Declara las firmas de overload primero, luego la implementación con union type.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `// Declara los overloads
function process(x: string): number;
function process(x: number): string;
function process(x: boolean): string;

// Implementación
function process(x: string | number | boolean): number | string {
    // Tu código aquí
}

// Prueba
console.log(process("hello"));   // 5
console.log(process(42));        // "42"
console.log(process(true));      // "yes"`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de TypeScript creados`);
}
