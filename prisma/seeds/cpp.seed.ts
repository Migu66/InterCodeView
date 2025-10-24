import { PrismaClient } from "../../src/generated/prisma";

export async function seedCpp(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ============================================
        // EJERCICIOS FÁCIL (EASY)
        // ============================================
        {
            title: "Vector Operations",
            description: "Operaciones básicas con vectores",
            statement: `# Operaciones con Vectores

## Descripción
Implementa funciones básicas para manipular vectores de C++.

## Tareas
\`\`\`cpp
1. Agregar elementos al final
2. Eliminar el último elemento
3. Obtener el tamaño
4. Verificar si está vacío
5. Acceder a elementos por índice
\`\`\`

## Ejemplo
\`\`\`
vector<int> v = {1, 2, 3};
v.push_back(4);  // [1, 2, 3, 4]
v.pop_back();    // [1, 2, 3]
v.size();        // 3
\`\`\`

## Restricciones
- Usar std::vector
- Complejidad push_back: O(1) amortizado

**Empresas:** Google, Microsoft, Amazon`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `#include <vector>
#include <iostream>
using namespace std;

class VectorOps {
public:
    vector<int> operations(vector<int>& nums) {
        // Tu código aquí
        
    }
};`,
        },
        {
            title: "Reverse Integer",
            description: "Invertir los dígitos de un entero",
            statement: `# Invertir Entero

## Descripción
Dado un entero de 32 bits, devuelve el entero con sus dígitos invertidos.

## Ejemplos
\`\`\`
Entrada: x = 123
Salida: 321

Entrada: x = -123
Salida: -321

Entrada: x = 120
Salida: 21
\`\`\`

## Restricciones
- Si el resultado sobrepasa el rango de int de 32 bits, devuelve 0
- No usar conversión a string
- Complejidad de tiempo: O(log(x))

**Empresas:** Facebook, Amazon, Apple`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `class Solution {
public:
    int reverse(int x) {
        // Tu código aquí
        
    }
};`,
        },
        {
            title: "Valid Parentheses",
            description: "Validar paréntesis balanceados",
            statement: `# Paréntesis Válidos

## Descripción
Determina si una cadena con paréntesis está balanceada correctamente.

## Ejemplos
\`\`\`
Entrada: s = "()"
Salida: true

Entrada: s = "()[]{}"
Salida: true

Entrada: s = "(]"
Salida: false
\`\`\`

## Restricciones
- Tipos de paréntesis: '()', '[]', '{}'
- Usar un stack
- Complejidad de tiempo: O(n)

**Empresas:** Amazon, Google, Microsoft, Bloomberg`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Tu código aquí
        
    }
};`,
        },
        {
            title: "Merge Two Sorted Lists",
            description: "Fusionar dos listas enlazadas ordenadas",
            statement: `# Fusionar Dos Listas Ordenadas

## Descripción
Fusiona dos listas enlazadas ordenadas en una sola lista ordenada.

## Ejemplo
\`\`\`
Entrada: list1 = [1,2,4], list2 = [1,3,4]
Salida: [1,1,2,3,4,4]
\`\`\`

## Restricciones
- Las listas están ordenadas en orden ascendente
- Complejidad de tiempo: O(n + m)
- Complejidad de espacio: O(1)

**Empresas:** Microsoft, Amazon, Facebook, Apple`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        // Tu código aquí
        
    }
};`,
        },
        {
            title: "Remove Duplicates from Sorted Array",
            description: "Eliminar duplicados de array ordenado",
            statement: `# Eliminar Duplicados de Array Ordenado

## Descripción
Dado un array ordenado \`nums\`, elimina los duplicados in-place y devuelve la nueva longitud.

## Ejemplo
\`\`\`
Entrada: nums = [1,1,2]
Salida: 2, nums = [1,2,_]

Entrada: nums = [0,0,1,1,1,2,2,3,3,4]
Salida: 5, nums = [0,1,2,3,4,_,_,_,_,_]
\`\`\`

## Restricciones
- Modificar el array in-place
- Complejidad de tiempo: O(n)
- Complejidad de espacio: O(1)

**Empresas:** Microsoft, Facebook, Bloomberg`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Tu código aquí
        
    }
};`,
        },

        // ============================================
        // EJERCICIOS MEDIO (MEDIUM)
        // ============================================
        {
            title: "Smart Pointers",
            description: "Implementar unique_ptr y shared_ptr",
            statement: `# Smart Pointers

## Descripción
Implementa tus propias versiones de \`unique_ptr\` y \`shared_ptr\`.

## Funcionalidades
\`\`\`cpp
unique_ptr:
- Constructor y destructor
- Operador de asignación (move)
- get(), reset(), release()

shared_ptr:
- Reference counting
- Constructor copia
- Destructor que libera cuando count = 0
\`\`\`

## Restricciones
- Manejar correctamente la memoria
- Prevenir memory leaks
- unique_ptr no debe ser copiable

**Empresas:** Google, Facebook, Microsoft, Amazon`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `template<typename T>
class UniquePtr {
private:
    T* ptr;
public:
    // Tu código aquí
    
};

template<typename T>
class SharedPtr {
private:
    T* ptr;
    int* ref_count;
public:
    // Tu código aquí
    
};`,
        },
        {
            title: "Thread-Safe Queue",
            description: "Implementar cola thread-safe",
            statement: `# Cola Thread-Safe

## Descripción
Implementa una cola thread-safe usando mutex y condition variables.

## Operaciones
\`\`\`cpp
void push(T value)  // Agregar elemento
T pop()             // Extraer elemento (bloquea si vacía)
bool try_pop(T& value) // Intenta extraer sin bloquear
bool empty()        // Verifica si está vacía
size_t size()       // Obtiene el tamaño
\`\`\`

## Restricciones
- Usar std::mutex
- Usar std::condition_variable
- Prevenir race conditions
- Manejo de excepciones

**Empresas:** Google, Amazon, Microsoft, Bloomberg`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `#include <queue>
#include <mutex>
#include <condition_variable>

template<typename T>
class ThreadSafeQueue {
private:
    std::queue<T> queue;
    mutable std::mutex mutex;
    std::condition_variable cond;
    
public:
    // Tu código aquí
    
};`,
        },
        {
            title: "Binary Search Tree",
            description: "Implementar árbol binario de búsqueda",
            statement: `# Árbol Binario de Búsqueda

## Descripción
Implementa un BST con operaciones básicas.

## Operaciones
\`\`\`cpp
void insert(int val)      // Insertar nodo
bool search(int val)      // Buscar valor
void remove(int val)      // Eliminar nodo
void inorder()            // Recorrido inorden
int findMin()             // Encontrar mínimo
int findMax()             // Encontrar máximo
\`\`\`

## Restricciones
- Mantener propiedad BST: left < root < right
- Inserción: O(log n) en promedio
- Búsqueda: O(log n) en promedio

**Empresas:** Amazon, Microsoft, Facebook, Google`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BST {
private:
    TreeNode* root;
    
public:
    BST() : root(nullptr) {}
    
    // Tu código aquí
    
};`,
        },
        {
            title: "LRU Cache with Templates",
            description: "Implementar LRU Cache genérico",
            statement: `# LRU Cache con Templates

## Descripción
Implementa un LRU Cache genérico usando templates de C++.

## Operaciones
\`\`\`cpp
V get(K key)           // Obtener valor
void put(K key, V val) // Insertar/actualizar
bool exists(K key)     // Verificar existencia
size_t size()          // Obtener tamaño
\`\`\`

## Restricciones
- Usar std::unordered_map y std::list
- Todas las operaciones O(1)
- Template para tipos genéricos
- Capacidad configurable

**Empresas:** Google, Facebook, Amazon, Microsoft`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `#include <unordered_map>
#include <list>

template<typename K, typename V>
class LRUCache {
private:
    int capacity;
    std::list<std::pair<K, V>> cache;
    std::unordered_map<K, typename std::list<std::pair<K, V>>::iterator> map;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    // Tu código aquí
    
};`,
        },
        {
            title: "Move Semantics",
            description: "Implementar semántica de movimiento",
            statement: `# Semántica de Movimiento

## Descripción
Crea una clase que implemente correctamente move semantics para evitar copias innecesarias.

## Implementar
\`\`\`cpp
- Constructor de movimiento
- Operador de asignación por movimiento
- Constructor de copia
- Operador de asignación por copia
- Destructor
- Swap function
\`\`\`

## Ejemplo
\`\`\`cpp
MyString s1("Hello");
MyString s2(std::move(s1)); // Move constructor
MyString s3;
s3 = std::move(s2);         // Move assignment
\`\`\`

## Restricciones
- Usar std::move
- Implementar regla de 5
- No memory leaks

**Empresas:** Google, Facebook, Microsoft, Bloomberg`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `#include <cstring>
#include <utility>

class MyString {
private:
    char* data;
    size_t length;
    
public:
    // Constructor
    MyString(const char* str = "") {
        // Tu código aquí
    }
    
    // Tu código aquí: implementar regla de 5
    
};`,
        },

        // ============================================
        // EJERCICIOS DIFÍCIL (HARD)
        // ============================================
        {
            title: "Memory Pool Allocator",
            description: "Implementar un allocator de memoria",
            statement: `# Memory Pool Allocator

## Descripción
Implementa un memory pool allocator eficiente para reducir fragmentación y mejorar rendimiento.

## Funcionalidades
\`\`\`cpp
- Asignar bloques de memoria de tamaño fijo
- Liberar bloques
- Reutilizar memoria liberada
- Prevenir fragmentación
- Thread-safe (opcional)
\`\`\`

## Estrategias
- Free list para bloques disponibles
- Placement new para construcción
- Manual destructor call

## Restricciones
- Minimizar llamadas a new/delete
- O(1) para allocate y deallocate
- Manejar alineación de memoria

**Empresas:** Google, Facebook, Amazon, Bloomberg`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `#include <cstddef>
#include <new>

template<typename T, size_t BlockSize = 4096>
class MemoryPool {
private:
    union Block {
        T element;
        Block* next;
    };
    
    Block* freeList;
    
public:
    MemoryPool() : freeList(nullptr) {}
    
    T* allocate() {
        // Tu código aquí
        
    }
    
    void deallocate(T* ptr) {
        // Tu código aquí
        
    }
    
    // Tu código aquí
};`,
        },
        {
            title: "Template Metaprogramming",
            description: "Calcular factorial en tiempo de compilación",
            statement: `# Template Metaprogramming

## Descripción
Usa template metaprogramming para cálculos en tiempo de compilación.

## Tareas
\`\`\`cpp
1. Factorial en compile-time
2. Fibonacci en compile-time
3. Verificar si un número es primo (compile-time)
4. Calcular potencia (compile-time)
5. Máximo común divisor (compile-time)
\`\`\`

## Ejemplo
\`\`\`cpp
constexpr int fact5 = Factorial<5>::value; // 120
constexpr int fib10 = Fibonacci<10>::value; // 55
constexpr bool isPrime = IsPrime<17>::value; // true
\`\`\`

## Restricciones
- Todo debe calcularse en compile-time
- Usar constexpr y templates
- Sin operaciones en runtime

**Empresas:** Google, Facebook, Microsoft, Bloomberg`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `// Factorial
template<int N>
struct Factorial {
    // Tu código aquí
    
};

// Fibonacci
template<int N>
struct Fibonacci {
    // Tu código aquí
    
};

// IsPrime
template<int N>
struct IsPrime {
    // Tu código aquí
    
};`,
        },
        {
            title: "Lock-Free Queue",
            description: "Implementar cola lock-free",
            statement: `# Cola Lock-Free

## Descripción
Implementa una cola thread-safe sin usar locks, usando atomic operations.

## Operaciones
\`\`\`cpp
bool push(T value)  // Agregar elemento
bool pop(T& value)  // Extraer elemento
bool empty()        // Verificar si vacía
\`\`\`

## Técnicas
- Usar std::atomic
- Compare-and-swap (CAS)
- Memory ordering
- ABA problem solution

## Restricciones
- No usar mutex/locks
- Wait-free o lock-free
- Manejar race conditions con atomics
- Prevenir ABA problem

**Empresas:** Google, Facebook, Microsoft, Intel`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `#include <atomic>

template<typename T>
class LockFreeQueue {
private:
    struct Node {
        T data;
        std::atomic<Node*> next;
        Node(T val) : data(val), next(nullptr) {}
    };
    
    std::atomic<Node*> head;
    std::atomic<Node*> tail;
    
public:
    LockFreeQueue() {
        Node* dummy = new Node(T());
        head.store(dummy);
        tail.store(dummy);
    }
    
    // Tu código aquí
    
};`,
        },
        {
            title: "Expression Template Library",
            description: "Implementar librería de expresiones con templates",
            statement: `# Expression Template Library

## Descripción
Implementa una librería que use expression templates para optimizar operaciones matemáticas en tiempo de compilación.

## Objetivos
\`\`\`cpp
Vector v1(1000), v2(1000), v3(1000);
// Debe generar un solo loop en lugar de 3
Vector result = v1 + v2 + v3;
\`\`\`

## Beneficios
- Eliminar temporales innecesarios
- Fusionar loops
- Optimización en compile-time
- Evaluación lazy

## Restricciones
- Usar templates avanzados
- SFINAE o concepts
- Perfect forwarding
- Compile-time optimization

**Empresas:** Google, Facebook, Bloomberg, Quantitative Firms`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `#include <vector>
#include <cstddef>

// Expression template base
template<typename E>
class VecExpression {
public:
    double operator[](size_t i) const {
        return static_cast<const E&>(*this)[i];
    }
    
    size_t size() const {
        return static_cast<const E&>(*this).size();
    }
};

// Vector class
class Vector : public VecExpression<Vector> {
private:
    std::vector<double> data;
    
public:
    // Tu código aquí
    
};

// Addition expression
template<typename E1, typename E2>
class VecAdd : public VecExpression<VecAdd<E1, E2>> {
    // Tu código aquí
    
};`,
        },
        {
            title: "Custom STL Container",
            description: "Implementar contenedor compatible con STL",
            statement: `# Contenedor Compatible con STL

## Descripción
Implementa un contenedor custom que sea completamente compatible con STL.

## Requerimientos
\`\`\`cpp
- Iteradores (begin, end, rbegin, rend)
- Const iteradores
- Size, empty, clear
- push_back, pop_back, insert, erase
- Operadores de comparación
- Allocator awareness
- Exception safety
\`\`\`

## Características
- Compatible con algoritmos STL
- std::copy, std::sort, etc. deben funcionar
- Range-based for loop support
- Move semantics completo

## Restricciones
- Seguir convenciones STL
- Proveer type traits
- Strong exception guarantee donde sea posible

**Empresas:** Google, Facebook, Microsoft, Bloomberg`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `#include <iterator>
#include <memory>
#include <algorithm>

template<typename T, typename Allocator = std::allocator<T>>
class MyContainer {
public:
    // Type definitions
    using value_type = T;
    using allocator_type = Allocator;
    using size_type = std::size_t;
    using difference_type = std::ptrdiff_t;
    using reference = value_type&;
    using const_reference = const value_type&;
    
    // Iterator class
    class iterator {
        // Tu código aquí
        
    };
    
    // Tu código aquí: implementar contenedor completo
    
};`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log("✅ 15 ejercicios de C++ creados");
}
