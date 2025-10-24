import { PrismaClient } from "../../src/generated/prisma";

export async function seedPython(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "FizzBuzz",
            description:
                "Imprime números del 1 al 100, reemplazando múltiplos de 3 con 'Fizz', múltiplos de 5 con 'Buzz', y múltiplos de ambos con 'FizzBuzz'",
            statement: `## 📝 FizzBuzz - Clásico de Entrevistas

Uno de los problemas más comunes en entrevistas técnicas de todas las empresas.

## 🎯 Objetivo

Escribe un programa que imprima los números del 1 al 100, pero:
- Para múltiplos de 3, imprime "Fizz"
- Para múltiplos de 5, imprime "Buzz"
- Para múltiplos de ambos 3 y 5, imprime "FizzBuzz"

## 📋 Ejemplos

\`\`\`
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz...
\`\`\`

## 💡 Pista

Usa el operador módulo \`%\` para verificar divisibilidad. Verifica primero el caso de ambos (15).`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `# FizzBuzz - Clásico de entrevistas
for i in range(1, 101):
    # Tu código aquí
    pass`,
        },
        {
            title: "Palíndromo",
            description:
                "Verifica si una palabra o frase es un palíndromo (se lee igual al revés)",
            statement: `## 📝 Verificador de Palíndromos

Ejercicio común en entrevistas para probar manipulación de strings.

## 🎯 Objetivo

Determina si un string es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).

## 📋 Ejemplos

\`\`\`python
es_palindromo("ana")      # True
es_palindromo("radar")    # True
es_palindromo("hola")     # False
es_palindromo("A man a plan a canal Panama")  # True (ignorando espacios)
\`\`\`

## 💡 Pista

Puedes invertir un string con \`string[::-1]\` o usar dos punteros.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `def es_palindromo(texto):
    """
    Verifica si un texto es un palíndromo
    Args:
        texto: string a verificar
    Returns:
        bool: True si es palíndromo
    """
    # Tu código aquí
    pass

# Prueba
print(es_palindromo("ana"))
print(es_palindromo("hola"))`,
        },
        {
            title: "Two Sum",
            description:
                "Encuentra dos números en un array que sumen un valor objetivo",
            statement: `## 📝 Two Sum - LeetCode #1

El problema #1 más popular de LeetCode. Preguntado en Google, Amazon, Facebook, etc.

## 🎯 Objetivo

Dado un array de enteros y un objetivo, encuentra los índices de dos números que sumen el objetivo.

## 📋 Ejemplos

\`\`\`python
two_sum([2, 7, 11, 15], 9)   # [0, 1] porque 2 + 7 = 9
two_sum([3, 2, 4], 6)        # [1, 2] porque 2 + 4 = 6
two_sum([3, 3], 6)           # [0, 1] porque 3 + 3 = 6
\`\`\`

## 💡 Pista

Usa un diccionario para guardar los números vistos y sus índices. Complejidad O(n).`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `def two_sum(nums, objetivo):
    """
    Encuentra índices de dos números que sumen el objetivo
    Args:
        nums: lista de enteros
        objetivo: suma objetivo
    Returns:
        list: [indice1, indice2]
    """
    # Tu código aquí
    pass

# Prueba
print(two_sum([2, 7, 11, 15], 9))`,
        },
        {
            title: "Reverse Integer",
            description:
                "Invierte los dígitos de un número entero considerando overflow",
            statement: `## 📝 Invertir Entero

Problema común en entrevistas para manipulación de números.

## 🎯 Objetivo

Invierte los dígitos de un número entero. Si el resultado causa overflow (fuera del rango de 32-bit), retorna 0.

## 📋 Ejemplos

\`\`\`python
reverse(123)    # 321
reverse(-123)   # -321
reverse(120)    # 21
reverse(0)      # 0
\`\`\`

## 💡 Pista

Usa módulo y división entera para extraer dígitos. Rango válido: [-2^31, 2^31 - 1]`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `def reverse(x):
    """
    Invierte un número entero
    Args:
        x: número a invertir
    Returns:
        int: número invertido o 0 si hay overflow
    """
    # Tu código aquí
    pass

# Prueba
print(reverse(123))
print(reverse(-123))
print(reverse(120))`,
        },
        {
            title: "Remove Duplicates from Sorted Array",
            description: "Elimina duplicados de un array ordenado in-place",
            statement: `## 📝 Eliminar Duplicados de Array Ordenado

Problema in-place común en entrevistas de Facebook, Amazon.

## 🎯 Objetivo

Dado un array ordenado, elimina los duplicados in-place y retorna la nueva longitud. No uses espacio extra.

## 📋 Ejemplos

\`\`\`python
nums = [1, 1, 2]
k = remove_duplicates(nums)  # k = 2, nums = [1, 2, ...]

nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
k = remove_duplicates(nums)  # k = 5, nums = [0, 1, 2, 3, 4, ...]
\`\`\`

## 💡 Pista

Usa dos punteros: uno para iterar y otro para la posición de inserción.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `def remove_duplicates(nums):
    """
    Elimina duplicados in-place
    Args:
        nums: lista ordenada de enteros
    Returns:
        int: nueva longitud sin duplicados
    """
    # Tu código aquí
    pass

# Prueba
nums = [1, 1, 2]
k = remove_duplicates(nums)
print(k, nums[:k])`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Valid Parentheses",
            description: "Verifica si una cadena de paréntesis está balanceada",
            statement: `## 📝 Paréntesis Válidos - Stack Problem

Problema clásico de stack preguntado en Amazon, Microsoft, Google.

## 🎯 Objetivo

Determina si una cadena con paréntesis '()', '{}', '[]' es válida. Los paréntesis deben cerrarse en el orden correcto.

## 📋 Ejemplos

\`\`\`python
es_valido("()")        # True
es_valido("()[]{}")    # True
es_valido("(]")        # False
es_valido("([)]")      # False
es_valido("{[]}")      # True
\`\`\`

## 💡 Pista

Usa una pila (lista). Añade paréntesis de apertura y verifica coincidencia al cerrar.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `def es_valido(s):
    """
    Verifica si los paréntesis están balanceados
    Args:
        s: string con paréntesis
    Returns:
        bool: True si es válido
    """
    # Tu código aquí
    pass

# Prueba
print(es_valido("()"))
print(es_valido("()[]{}"))
print(es_valido("(]"))`,
        },
        {
            title: "Group Anagrams",
            description: "Agrupa palabras que son anagramas entre sí",
            statement: `## 📝 Agrupar Anagramas

Problema de hashing preguntado frecuentemente en FAANG (Facebook, Apple, Amazon, Netflix, Google).

## 🎯 Objetivo

Agrupa strings que son anagramas. Un anagrama es una palabra formada reordenando las letras de otra.

## 📋 Ejemplos

\`\`\`python
words = ["eat", "tea", "tan", "ate", "nat", "bat"]
# [["eat","tea","ate"], ["tan","nat"], ["bat"]]
\`\`\`

## 💡 Pista

Usa un diccionario donde la clave sea el string ordenado o un tuple de conteo de caracteres.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `def agrupar_anagramas(palabras):
    """
    Agrupa anagramas
    Args:
        palabras: lista de strings
    Returns:
        list: grupos de anagramas
    """
    # Tu código aquí
    pass

# Prueba
words = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(agrupar_anagramas(words))`,
        },
        {
            title: "Longest Substring Without Repeating Characters",
            description:
                "Encuentra la longitud del substring más largo sin caracteres repetidos",
            statement: `## 📝 Substring Más Largo Sin Repetir

Problema de sliding window de Amazon, Facebook, Microsoft.

## 🎯 Objetivo

Encuentra la longitud del substring más largo sin caracteres repetidos.

## 📋 Ejemplos

\`\`\`python
length_of_longest_substring("abcabcbb")  # 3 ("abc")
length_of_longest_substring("bbbbb")     # 1 ("b")
length_of_longest_substring("pwwkew")    # 3 ("wke")
\`\`\`

## 💡 Pista

Usa sliding window con dos punteros y un set o diccionario para rastrear caracteres vistos.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `def length_of_longest_substring(s):
    """
    Encuentra longitud del substring sin repetir
    Args:
        s: string a analizar
    Returns:
        int: longitud máxima
    """
    # Tu código aquí
    pass

# Prueba
print(length_of_longest_substring("abcabcbb"))
print(length_of_longest_substring("pwwkew"))`,
        },
        {
            title: "3Sum",
            description: "Encuentra todos los tripletes únicos que sumen cero",
            statement: `## 📝 3Sum - Problema Clásico

Extensión de Two Sum, preguntado en Google, Amazon, Facebook.

## 🎯 Objetivo

Encuentra todos los tripletes únicos [a, b, c] en el array que sumen cero.

## 📋 Ejemplos

\`\`\`python
three_sum([-1, 0, 1, 2, -1, -4])  # [[-1, -1, 2], [-1, 0, 1]]
three_sum([0, 1, 1])              # []
three_sum([0, 0, 0])              # [[0, 0, 0]]
\`\`\`

## 💡 Pista

Ordena el array primero. Usa un bucle y two pointers para cada elemento.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `def three_sum(nums):
    """
    Encuentra tripletes que sumen cero
    Args:
        nums: lista de enteros
    Returns:
        list: lista de tripletes únicos
    """
    # Tu código aquí
    pass

# Prueba
print(three_sum([-1, 0, 1, 2, -1, -4]))
print(three_sum([0, 0, 0]))`,
        },
        {
            title: "Product of Array Except Self",
            description:
                "Calcula el producto de todos los elementos excepto el actual sin usar división",
            statement: `## 📝 Producto del Array Excepto Self

Problema ingenioso de arrays de Facebook, Amazon.

## 🎯 Objetivo

Dado un array nums, retorna un array donde answer[i] es el producto de todos los elementos excepto nums[i]. Sin usar división y en O(n).

## 📋 Ejemplos

\`\`\`python
product_except_self([1, 2, 3, 4])     # [24, 12, 8, 6]
product_except_self([-1, 1, 0, -3, 3]) # [0, 0, 9, 0, 0]
\`\`\`

## 💡 Pista

Usa dos pasadas: una de izquierda a derecha (productos acumulados a la izquierda) y otra de derecha a izquierda.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `def product_except_self(nums):
    """
    Producto de array excepto self
    Args:
        nums: lista de enteros
    Returns:
        list: productos
    """
    # Tu código aquí
    pass

# Prueba
print(product_except_self([1, 2, 3, 4]))`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Median of Two Sorted Arrays",
            description:
                "Encuentra la mediana de dos arrays ordenados en O(log(m+n))",
            statement: `## 📝 Mediana de Dos Arrays Ordenados

Problema difícil de binary search de Google, Facebook. Complejidad requerida: O(log(m+n)).

## 🎯 Objetivo

Encuentra la mediana de dos arrays ordenados combinados sin combinarlos físicamente.

## 📋 Ejemplos

\`\`\`python
find_median([1, 3], [2])        # 2.0
find_median([1, 2], [3, 4])     # 2.5
find_median([0, 0], [0, 0])     # 0.0
\`\`\`

## 💡 Pista

Usa binary search en el array más corto para particionar ambos arrays de forma que los elementos izquierdos sean menores que los derechos.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `def find_median(nums1, nums2):
    """
    Encuentra mediana de dos arrays ordenados
    Args:
        nums1, nums2: arrays ordenados
    Returns:
        float: mediana
    """
    # Tu código aquí
    pass

# Prueba
print(find_median([1, 3], [2]))
print(find_median([1, 2], [3, 4]))`,
        },
        {
            title: "Trapping Rain Water",
            description:
                "Calcula cuánta agua se puede atrapar entre barras de diferentes alturas",
            statement: `## 📝 Atrapar Agua de Lluvia

Problema avanzado de two pointers de Amazon, Microsoft, Bloomberg.

## 🎯 Objetivo

Dado un array representando alturas de barras, calcula cuánta agua de lluvia se puede atrapar.

## 📋 Ejemplo

\`\`\`python
trap([0,1,0,2,1,0,1,3,2,1,2,1])  # 6
trap([4,2,0,3,2,5])              # 9

Visualización del primer caso:
       █
   █   ██ █
 █ ██ ███████
\`\`\`

## 💡 Pista

Usa two pointers desde ambos extremos. Mantén el máximo a la izquierda y derecha. El agua atrapada depende del mínimo entre ambos máximos.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `def trap(height):
    """
    Calcula agua atrapada
    Args:
        height: lista de alturas
    Returns:
        int: unidades de agua
    """
    # Tu código aquí
    pass

# Prueba
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
print(trap([4,2,0,3,2,5]))`,
        },
        {
            title: "Longest Valid Parentheses",
            description:
                "Encuentra la longitud del substring más largo de paréntesis válidos",
            statement: `## 📝 Paréntesis Válidos Más Largos

Problema difícil de dynamic programming/stack de Google, Facebook.

## 🎯 Objetivo

Encuentra la longitud del substring más largo de paréntesis bien formados.

## 📋 Ejemplos

\`\`\`python
longest_valid("(()")     # 2  (substring "()")
longest_valid(")()())")  # 4  (substring "()()")
longest_valid("")        # 0
longest_valid("()(())")  # 6  (todo el string)
\`\`\`

## 💡 Pista

Solución con stack: guarda índices. O usa DP: dp[i] = longitud del substring válido que termina en i.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `def longest_valid(s):
    """
    Longitud de paréntesis válidos más largos
    Args:
        s: string con paréntesis
    Returns:
        int: longitud máxima
    """
    # Tu código aquí
    pass

# Prueba
print(longest_valid("(()"))
print(longest_valid(")()())"))`,
        },
        {
            title: "Word Ladder",
            description:
                "Encuentra la secuencia de transformaciones más corta entre dos palabras",
            statement: `## 📝 Escalera de Palabras

Problema de BFS/grafos de Amazon, Facebook, Google.

## 🎯 Objetivo

Transforma beginWord a endWord cambiando una letra a la vez. Cada palabra intermedia debe estar en wordList.

## 📋 Ejemplo

\`\`\`python
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
# Resultado: 5 ("hit" -> "hot" -> "dot" -> "dog" -> "cog")

wordList = ["hot","dot","dog","lot","log"]
# Resultado: 0 (endWord no está en lista)
\`\`\`

## 💡 Pista

Usa BFS. Cada palabra es un nodo. Hay arista si difieren en una letra. Encuentra el camino más corto.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `def ladder_length(beginWord, endWord, wordList):
    """
    Encuentra longitud de transformación más corta
    Args:
        beginWord, endWord: palabras inicial y final
        wordList: lista de palabras válidas
    Returns:
        int: longitud de la secuencia (0 si imposible)
    """
    # Tu código aquí
    pass

# Prueba
print(ladder_length("hit", "cog", 
    ["hot","dot","dog","lot","log","cog"]))`,
        },
        {
            title: "Regular Expression Matching",
            description:
                "Implementa matching de expresiones regulares con '.' y '*'",
            statement: `## 📝 Matching de Expresiones Regulares

Problema muy difícil de DP de Google, Facebook.

## 🎯 Objetivo

Implementa matching donde:
- '.' coincide con cualquier carácter único
- '*' coincide con cero o más del carácter anterior

## 📋 Ejemplos

\`\`\`python
is_match("aa", "a")       # False
is_match("aa", "a*")      # True
is_match("ab", ".*")      # True
is_match("aab", "c*a*b")  # True
is_match("mississippi", "mis*is*p*.") # False
\`\`\`

## 💡 Pista

Usa DP 2D. dp[i][j] = si s[0:i] coincide con p[0:j]. Maneja casos: carácter normal, '.', y '*' (cero o más ocurrencias).`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `def is_match(s, p):
    """
    Verifica si string coincide con patrón
    Args:
        s: string a verificar
        p: patrón con '.' y '*'
    Returns:
        bool: True si coincide
    """
    # Tu código aquí
    pass

# Prueba
print(is_match("aa", "a"))
print(is_match("aa", "a*"))
print(is_match("ab", ".*"))`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de Python creados`);
}
