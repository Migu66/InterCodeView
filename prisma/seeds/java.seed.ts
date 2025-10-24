import { PrismaClient } from "../../src/generated/prisma";

export async function seedJava(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ============================================
        // EJERCICIOS FÁCIL (EASY)
        // ============================================
        {
            title: "Reverse String",
            description: "Invertir una cadena de texto",
            statement: `# Invertir String

## Descripción
Escribe una función que invierta una cadena de texto.

## Ejemplos
\`\`\`
Entrada: "hello"
Salida: "olleh"

Entrada: "Java"
Salida: "avaJ"
\`\`\`

## Restricciones
- No uses métodos built-in como \`reverse()\`
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(n)

**Empresas:** Amazon, Microsoft, Google`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `public class Solution {
    public String reverseString(String s) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Valid Palindrome",
            description: "Verificar si una cadena es un palíndromo",
            statement: `# Palíndromo Válido

## Descripción
Determina si una cadena es un palíndromo, considerando solo caracteres alfanuméricos e ignorando mayúsculas/minúsculas.

## Ejemplos
\`\`\`
Entrada: "A man, a plan, a canal: Panama"
Salida: true

Entrada: "race a car"
Salida: false
\`\`\`

## Restricciones
- Un palíndromo lee igual de izquierda a derecha que de derecha a izquierda
- Ignora espacios, puntuación y mayúsculas
- Complejidad de tiempo: O(n)

**Empresas:** Facebook, Amazon, Microsoft`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `public class Solution {
    public boolean isPalindrome(String s) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Two Sum",
            description: "Encontrar dos números que sumen un target",
            statement: `# Two Sum

## Descripción
Dado un array de enteros \`nums\` y un entero \`target\`, devuelve los índices de dos números que sumen \`target\`.

## Ejemplos
\`\`\`
Entrada: nums = [2,7,11,15], target = 9
Salida: [0,1]
Explicación: nums[0] + nums[1] = 2 + 7 = 9

Entrada: nums = [3,2,4], target = 6
Salida: [1,2]
\`\`\`

## Restricciones
- Cada input tiene exactamente una solución
- No puedes usar el mismo elemento dos veces
- Complejidad de tiempo: O(n)

**Empresas:** Google, Amazon, Apple, Facebook`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Merge Sorted Arrays",
            description: "Fusionar dos arrays ordenados",
            statement: `# Fusionar Arrays Ordenados

## Descripción
Dados dos arrays ordenados \`nums1\` y \`nums2\`, fusiónalos en un solo array ordenado.

## Ejemplos
\`\`\`
Entrada: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Salida: [1,2,2,3,5,6]

Entrada: nums1 = [1], m = 1, nums2 = [], n = 0
Salida: [1]
\`\`\`

## Restricciones
- \`nums1\` tiene tamaño suficiente para contener ambos arrays
- Debes modificar \`nums1\` in-place
- Complejidad de tiempo: O(m + n)

**Empresas:** Microsoft, Facebook, Bloomberg`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Maximum Subarray",
            description: "Encontrar el subarray con suma máxima",
            statement: `# Subarray con Suma Máxima

## Descripción
Dado un array de enteros \`nums\`, encuentra el subarray contiguo que tenga la suma más grande y devuelve su suma.

## Ejemplos
\`\`\`
Entrada: nums = [-2,1,-3,4,-1,2,1,-5,4]
Salida: 6
Explicación: [4,-1,2,1] tiene la suma más grande = 6

Entrada: nums = [1]
Salida: 1
\`\`\`

## Restricciones
- Usar algoritmo de Kadane
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(1)

**Empresas:** Amazon, LinkedIn, Microsoft`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `public class Solution {
    public int maxSubArray(int[] nums) {
        // Tu código aquí
        
    }
}`,
        },

        // ============================================
        // EJERCICIOS MEDIO (MEDIUM)
        // ============================================
        {
            title: "LRU Cache",
            description: "Implementar una cache LRU",
            statement: `# LRU Cache

## Descripción
Diseña una estructura de datos que siga las restricciones de un caché Least Recently Used (LRU).

## Operaciones
\`\`\`
LRUCache(int capacity) Inicializa con capacidad positiva
int get(int key) Devuelve el valor de la key si existe, -1 si no
void put(int key, int value) Actualiza o inserta el par key-value
\`\`\`

## Ejemplo
\`\`\`java
LRUCache cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);    // retorna 1
cache.put(3, 3); // elimina key 2
cache.get(2);    // retorna -1
\`\`\`

## Restricciones
- \`get\` y \`put\` deben ser O(1)
- Usar HashMap y Lista Doblemente Enlazada

**Empresas:** Google, Amazon, Microsoft, Facebook`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `class LRUCache {
    public LRUCache(int capacity) {
        // Tu código aquí
        
    }
    
    public int get(int key) {
        // Tu código aquí
        
    }
    
    public void put(int key, int value) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Binary Tree Level Order Traversal",
            description: "Recorrer árbol binario por niveles",
            statement: `# Recorrido por Niveles de Árbol Binario

## Descripción
Dado un árbol binario, devuelve el recorrido de sus nodos por niveles (de izquierda a derecha, nivel por nivel).

## Ejemplo
\`\`\`
Entrada: root = [3,9,20,null,null,15,7]
    3
   / \\
  9  20
    /  \\
   15   7

Salida: [[3],[9,20],[15,7]]
\`\`\`

## Restricciones
- Usar BFS (Breadth-First Search)
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(n)

**Empresas:** Amazon, Facebook, Microsoft, LinkedIn`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `public class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Longest Substring Without Repeating",
            description: "Substring más largo sin caracteres repetidos",
            statement: `# Substring Más Largo Sin Caracteres Repetidos

## Descripción
Dada una cadena \`s\`, encuentra la longitud del substring más largo sin caracteres repetidos.

## Ejemplos
\`\`\`
Entrada: s = "abcabcbb"
Salida: 3
Explicación: "abc" es el substring más largo sin repetir

Entrada: s = "bbbbb"
Salida: 1
\`\`\`

## Restricciones
- Usar técnica de sliding window
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(min(m,n)) donde m es tamaño del charset

**Empresas:** Amazon, Google, Facebook, Adobe`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Product of Array Except Self",
            description: "Producto de array excepto el elemento actual",
            statement: `# Producto de Array Excepto Self

## Descripción
Dado un array \`nums\`, devuelve un array donde cada elemento es el producto de todos los elementos excepto \`nums[i]\`.

## Ejemplos
\`\`\`
Entrada: nums = [1,2,3,4]
Salida: [24,12,8,6]

Entrada: nums = [-1,1,0,-3,3]
Salida: [0,0,9,0,0]
\`\`\`

## Restricciones
- No puedes usar división
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(1) sin contar output

**Empresas:** Amazon, Microsoft, Apple, Facebook`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `public class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Design HashMap",
            description: "Implementar un HashMap desde cero",
            statement: `# Diseñar HashMap

## Descripción
Diseña un HashMap sin usar librerías de hash table built-in.

## Operaciones
\`\`\`
void put(int key, int value) Inserta o actualiza
int get(int key) Devuelve el valor o -1
void remove(int key) Elimina el par key-value
\`\`\`

## Ejemplo
\`\`\`java
MyHashMap map = new MyHashMap();
map.put(1, 1);
map.put(2, 2);
map.get(1);    // retorna 1
map.remove(2);
map.get(2);    // retorna -1
\`\`\`

## Restricciones
- Usar array y hashing
- Manejar colisiones con chaining
- Todas las operaciones O(1) en promedio

**Empresas:** Amazon, Google, Microsoft`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `class MyHashMap {
    public MyHashMap() {
        // Tu código aquí
        
    }
    
    public void put(int key, int value) {
        // Tu código aquí
        
    }
    
    public int get(int key) {
        // Tu código aquí
        
    }
    
    public void remove(int key) {
        // Tu código aquí
        
    }
}`,
        },

        // ============================================
        // EJERCICIOS DIFÍCIL (HARD)
        // ============================================
        {
            title: "Median of Two Sorted Arrays",
            description: "Encontrar la mediana de dos arrays ordenados",
            statement: `# Mediana de Dos Arrays Ordenados

## Descripción
Dados dos arrays ordenados \`nums1\` y \`nums2\`, devuelve la mediana de los dos arrays ordenados.

## Ejemplos
\`\`\`
Entrada: nums1 = [1,3], nums2 = [2]
Salida: 2.0
Explicación: array fusionado = [1,2,3], mediana = 2

Entrada: nums1 = [1,2], nums2 = [3,4]
Salida: 2.5
Explicación: array fusionado = [1,2,3,4], mediana = (2 + 3) / 2 = 2.5
\`\`\`

## Restricciones
- Complejidad de tiempo: O(log(m+n))
- Usar búsqueda binaria
- No fusionar los arrays

**Empresas:** Google, Amazon, Microsoft, Facebook`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Serialize and Deserialize Binary Tree",
            description: "Serializar y deserializar árbol binario",
            statement: `# Serializar y Deserializar Árbol Binario

## Descripción
Diseña un algoritmo para serializar y deserializar un árbol binario.

## Ejemplo
\`\`\`
    1
   / \\
  2   3
     / \\
    4   5

Serializado: "1,2,null,null,3,4,null,null,5,null,null"
\`\`\`

## Operaciones
\`\`\`java
String serialize(TreeNode root)    // Convierte árbol a string
TreeNode deserialize(String data)  // Convierte string a árbol
\`\`\`

## Restricciones
- El formato de serialización es tu elección
- Debe funcionar para cualquier árbol binario válido

**Empresas:** Amazon, Google, Facebook, Microsoft`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `public class Codec {
    // Serializa el árbol a una cadena
    public String serialize(TreeNode root) {
        // Tu código aquí
        
    }

    // Deserializa la cadena a un árbol
    public TreeNode deserialize(String data) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Trapping Rain Water",
            description: "Calcular agua atrapada entre barras",
            statement: `# Atrapar Agua de Lluvia

## Descripción
Dado un array que representa la elevación de barras, calcula cuánta agua de lluvia puede ser atrapada.

## Ejemplo
\`\`\`
Entrada: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Salida: 6

Visualización:
    █
█   ██ █ █
█ █ ██████
\`\`\`

## Restricciones
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(1)
- Usar dos punteros

**Empresas:** Amazon, Google, Apple, Facebook`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `public class Solution {
    public int trap(int[] height) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Word Ladder",
            description: "Transformar una palabra en otra cambiando una letra",
            statement: `# Escalera de Palabras

## Descripción
Dada una palabra inicial \`beginWord\`, una palabra final \`endWord\`, y un diccionario \`wordList\`, encuentra la longitud de la secuencia de transformación más corta.

## Reglas
- Solo puedes cambiar una letra a la vez
- Cada palabra transformada debe existir en wordList
- beginWord no necesita estar en wordList

## Ejemplo
\`\`\`
Entrada: 
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Salida: 5
Explicación: "hit" -> "hot" -> "dot" -> "dog" -> "cog"
\`\`\`

## Restricciones
- Usar BFS
- Complejidad de tiempo: O(M² × N) donde M es longitud de palabra y N es número de palabras

**Empresas:** Amazon, Facebook, Google, Yelp`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Regular Expression Matching",
            description: "Implementar matching de expresiones regulares",
            statement: `# Matching de Expresiones Regulares

## Descripción
Implementa matching de expresiones regulares con soporte para '.' y '*'.

## Reglas
- '.' coincide con cualquier carácter único
- '*' coincide con cero o más del elemento anterior

## Ejemplos
\`\`\`
Entrada: s = "aa", p = "a"
Salida: false

Entrada: s = "aa", p = "a*"
Salida: true

Entrada: s = "ab", p = ".*"
Salida: true
\`\`\`

## Restricciones
- Usar programación dinámica
- Complejidad de tiempo: O(m × n)
- Complejidad de espacio: O(m × n)

**Empresas:** Google, Facebook, Amazon, Uber`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `public class Solution {
    public boolean isMatch(String s, String p) {
        // Tu código aquí
        
    }
}`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log("✅ 15 ejercicios de Java creados");
}
