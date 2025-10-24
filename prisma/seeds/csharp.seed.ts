import { PrismaClient } from "../../src/generated/prisma";

export async function seedCSharp(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ============================================
        // EJERCICIOS FÁCIL (EASY)
        // ============================================
        {
            title: "LINQ Basics",
            description: "Operaciones básicas con LINQ",
            statement: `# LINQ Básico

## Descripción
Implementa consultas LINQ básicas para manipular colecciones.

## Tareas
\`\`\`csharp
1. Filtrar números pares de una lista
2. Ordenar una lista de strings alfabéticamente
3. Seleccionar los primeros 5 elementos
4. Contar elementos que cumplan una condición
5. Encontrar el máximo y mínimo de una lista
\`\`\`

## Ejemplo
\`\`\`csharp
var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
var evens = numbers.Where(n => n % 2 == 0); // [2, 4, 6]
\`\`\`

## Restricciones
- Usar métodos de extensión LINQ
- Evitar loops explícitos

**Empresas:** Microsoft, Amazon, Adobe`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public class Solution 
{
    public IEnumerable<int> FilterEvens(List<int> numbers) 
    {
        // Tu código aquí
        
    }
    
    public IEnumerable<string> SortStrings(List<string> strings) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "String Manipulation",
            description: "Manipulación básica de strings",
            statement: `# Manipulación de Strings

## Descripción
Implementa funciones comunes de manipulación de strings en C#.

## Tareas
\`\`\`csharp
1. Invertir una cadena
2. Verificar si es palíndromo
3. Contar ocurrencias de un carácter
4. Remover espacios en blanco
5. Capitalizar primera letra de cada palabra
\`\`\`

## Ejemplo
\`\`\`
Entrada: "hello world"
ReverseString: "dlrow olleh"
IsPalindrome: false
Capitalize: "Hello World"
\`\`\`

## Restricciones
- Usar métodos de StringBuilder cuando sea apropiado
- Considerar case-sensitivity

**Empresas:** Microsoft, Amazon, Facebook`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `using System;
using System.Text;

public class StringHelper 
{
    public string ReverseString(string s) 
    {
        // Tu código aquí
        
    }
    
    public bool IsPalindrome(string s) 
    {
        // Tu código aquí
        
    }
    
    public string Capitalize(string s) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Array Operations",
            description: "Operaciones básicas con arrays",
            statement: `# Operaciones con Arrays

## Descripción
Implementa operaciones fundamentales con arrays.

## Tareas
\`\`\`csharp
1. Encontrar el elemento más grande
2. Calcular suma de todos los elementos
3. Encontrar índice de un elemento
4. Rotar array n posiciones
5. Eliminar duplicados
\`\`\`

## Ejemplo
\`\`\`
Entrada: [3, 1, 4, 1, 5, 9, 2, 6]
Max: 9
Sum: 31
RemoveDuplicates: [3, 1, 4, 5, 9, 2, 6]
\`\`\`

## Restricciones
- Complejidad de tiempo eficiente
- Considerar arrays vacíos

**Empresas:** Microsoft, Amazon, Google`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `using System;
using System.Collections.Generic;

public class ArrayOperations 
{
    public int FindMax(int[] arr) 
    {
        // Tu código aquí
        
    }
    
    public int[] RotateArray(int[] arr, int positions) 
    {
        // Tu código aquí
        
    }
    
    public int[] RemoveDuplicates(int[] arr) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "List and Dictionary Basics",
            description: "Trabajar con listas y diccionarios",
            statement: `# Listas y Diccionarios

## Descripción
Implementa operaciones con List<T> y Dictionary<TKey, TValue>.

## Tareas
\`\`\`csharp
1. Agregar y remover elementos de una lista
2. Buscar elementos en un diccionario
3. Iterar sobre pares key-value
4. Combinar dos diccionarios
5. Contar frecuencia de palabras
\`\`\`

## Ejemplo
\`\`\`csharp
var words = new List<string> { "apple", "banana", "apple" };
var freq = CountFrequency(words);
// { "apple": 2, "banana": 1 }
\`\`\`

## Restricciones
- Usar genéricos apropiadamente
- Manejar casos edge

**Empresas:** Microsoft, Amazon, Adobe`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `using System;
using System.Collections.Generic;

public class CollectionOps 
{
    public Dictionary<string, int> CountFrequency(List<string> words) 
    {
        // Tu código aquí
        
    }
    
    public Dictionary<TKey, TValue> MergeDictionaries<TKey, TValue>(
        Dictionary<TKey, TValue> dict1, 
        Dictionary<TKey, TValue> dict2) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Nullable Types",
            description: "Trabajar con tipos nullable",
            statement: `# Tipos Nullable

## Descripción
Maneja correctamente tipos nullable y null reference types.

## Tareas
\`\`\`csharp
1. Verificar si un nullable tiene valor
2. Obtener valor o default
3. Usar operador null-coalescing (??)
4. Usar null-conditional operator (?.)
5. Pattern matching con null
\`\`\`

## Ejemplo
\`\`\`csharp
int? nullableInt = null;
int value = nullableInt ?? 0; // 0
\`\`\`

## Restricciones
- Usar C# 8.0+ nullable reference types
- Manejar nulls de manera segura

**Empresas:** Microsoft, Amazon`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `#nullable enable
using System;

public class NullableHelper 
{
    public int GetValueOrDefault(int? nullableInt, int defaultValue) 
    {
        // Tu código aquí
        
    }
    
    public string? GetUpperCase(string? input) 
    {
        // Tu código aquí
        
    }
}`,
        },

        // ============================================
        // EJERCICIOS MEDIO (MEDIUM)
        // ============================================
        {
            title: "Async/Await Patterns",
            description: "Implementar patrones async/await",
            statement: `# Patrones Async/Await

## Descripción
Implementa operaciones asíncronas usando async/await correctamente.

## Tareas
\`\`\`csharp
1. Descargar múltiples URLs en paralelo
2. Procesar datos con Task.WhenAll
3. Timeout en operaciones async
4. Cancelación con CancellationToken
5. Retry logic para operaciones fallidas
\`\`\`

## Ejemplo
\`\`\`csharp
var urls = new[] { "url1", "url2", "url3" };
var results = await DownloadAllAsync(urls);
\`\`\`

## Restricciones
- Evitar async void (excepto event handlers)
- ConfigureAwait(false) apropiadamente
- Manejar excepciones en tasks

**Empresas:** Microsoft, Amazon, Google, Uber`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

public class AsyncOperations 
{
    public async Task<List<string>> DownloadAllAsync(string[] urls) 
    {
        // Tu código aquí
        
    }
    
    public async Task<T> WithTimeoutAsync<T>(Task<T> task, TimeSpan timeout) 
    {
        // Tu código aquí
        
    }
    
    public async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Custom Exception Handling",
            description: "Implementar sistema de excepciones custom",
            statement: `# Manejo de Excepciones Custom

## Descripción
Crea una jerarquía de excepciones custom y manejo apropiado.

## Tareas
\`\`\`csharp
1. Crear excepciones custom heredando de Exception
2. Agregar propiedades adicionales
3. Serialización de excepciones
4. Exception filters
5. Rethrowing correctamente
\`\`\`

## Ejemplo
\`\`\`csharp
public class ValidationException : Exception 
{
    public string PropertyName { get; set; }
}

try { /* ... */ }
catch (ValidationException ex) when (ex.PropertyName == "Email")
{ /* ... */ }
\`\`\`

## Restricciones
- Implementar los 3 constructores estándar
- Hacerlas serializables si es necesario
- Proporcionar mensajes descriptivos

**Empresas:** Microsoft, Amazon, Adobe`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `using System;

[Serializable]
public class ValidationException : Exception 
{
    public string PropertyName { get; set; }
    
    // Tu código aquí: implementar constructores
    
}

public class ExceptionHandler 
{
    public void ProcessData(string data) 
    {
        // Tu código aquí: usar excepciones custom
        
    }
}`,
        },
        {
            title: "Dependency Injection",
            description: "Implementar patrón de inyección de dependencias",
            statement: `# Inyección de Dependencias

## Descripción
Implementa un sistema simple de DI container.

## Funcionalidades
\`\`\`csharp
1. Register<TInterface, TImplementation>()
2. Resolve<T>()
3. Singleton lifetime
4. Transient lifetime
5. Constructor injection
\`\`\`

## Ejemplo
\`\`\`csharp
container.Register<IService, ServiceImpl>();
var service = container.Resolve<IService>();
\`\`\`

## Restricciones
- Usar reflection para constructor injection
- Detectar dependencias circulares
- Thread-safe

**Empresas:** Microsoft, Amazon, Google, Uber`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `using System;
using System.Collections.Generic;

public interface ILifetime { }
public class Singleton : ILifetime { }
public class Transient : ILifetime { }

public class DIContainer 
{
    private Dictionary<Type, Type> registrations = new();
    private Dictionary<Type, object> singletons = new();
    
    public void Register<TInterface, TImplementation>(ILifetime lifetime = null) 
    {
        // Tu código aquí
        
    }
    
    public T Resolve<T>() 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Expression Trees",
            description: "Trabajar con expression trees",
            statement: `# Expression Trees

## Descripción
Construye y manipula expression trees en C#.

## Tareas
\`\`\`csharp
1. Crear expressions matemáticas
2. Compilar y ejecutar expressions
3. Visitor pattern para modificar trees
4. Generar código dinámicamente
5. Traducir LINQ a SQL (simplificado)
\`\`\`

## Ejemplo
\`\`\`csharp
Expression<Func<int, int>> expr = x => x * 2 + 1;
var compiled = expr.Compile();
int result = compiled(5); // 11
\`\`\`

## Restricciones
- Usar System.Linq.Expressions
- Compilar expressions eficientemente

**Empresas:** Microsoft, Google, Amazon`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `using System;
using System.Linq.Expressions;

public class ExpressionBuilder 
{
    public Expression<Func<T, bool>> BuildPredicate<T>(string propertyName, object value) 
    {
        // Tu código aquí
        
    }
    
    public Func<int, int, int> CreateMathOperation(string operation) 
    {
        // Tu código aquí
        // operation puede ser "add", "subtract", "multiply", "divide"
        
    }
}`,
        },
        {
            title: "Observer Pattern with Events",
            description: "Implementar patrón Observer con eventos",
            statement: `# Patrón Observer con Eventos

## Descripción
Implementa el patrón Observer usando eventos y delegates de C#.

## Funcionalidades
\`\`\`csharp
1. Definir eventos custom
2. EventArgs personalizados
3. Múltiples subscribers
4. Weak event pattern
5. Event aggregator
\`\`\`

## Ejemplo
\`\`\`csharp
publisher.DataChanged += (sender, e) => {
    Console.WriteLine($"Data changed: {e.NewValue}");
};
publisher.UpdateData("new value");
\`\`\`

## Restricciones
- Memory leak prevention
- Thread-safe event raising
- Null-conditional operator para events

**Empresas:** Microsoft, Amazon, Adobe`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `using System;

public class DataChangedEventArgs : EventArgs 
{
    public string OldValue { get; set; }
    public string NewValue { get; set; }
}

public class DataPublisher 
{
    public event EventHandler<DataChangedEventArgs> DataChanged;
    
    private string data;
    
    public void UpdateData(string newData) 
    {
        // Tu código aquí
        
    }
    
    protected virtual void OnDataChanged(DataChangedEventArgs e) 
    {
        // Tu código aquí
        
    }
}`,
        },

        // ============================================
        // EJERCICIOS DIFÍCIL (HARD)
        // ============================================
        {
            title: "Custom LINQ Provider",
            description: "Implementar un LINQ provider custom",
            statement: `# LINQ Provider Custom

## Descripción
Crea un LINQ provider que traduzca queries LINQ a otro formato (ej: SQL simplificado).

## Componentes
\`\`\`csharp
1. IQueryable<T> implementation
2. IQueryProvider implementation
3. Expression visitor para traducir
4. Query executor
5. Soporte para Where, Select, OrderBy
\`\`\`

## Ejemplo
\`\`\`csharp
var query = from u in context.Users
            where u.Age > 18
            select u.Name;
// Traduce a: "SELECT Name FROM Users WHERE Age > 18"
\`\`\`

## Restricciones
- Implementar IQueryable<T> correctamente
- Visitor pattern para expression trees
- Type safety

**Empresas:** Microsoft, Google, Amazon, Oracle`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;

public class CustomQueryProvider : IQueryProvider 
{
    public IQueryable CreateQuery(Expression expression) 
    {
        // Tu código aquí
        
    }
    
    public IQueryable<TElement> CreateQuery<TElement>(Expression expression) 
    {
        // Tu código aquí
        
    }
    
    public object Execute(Expression expression) 
    {
        // Tu código aquí
        
    }
    
    public TResult Execute<TResult>(Expression expression) 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Thread-Safe Object Pool",
            description: "Implementar object pool thread-safe",
            statement: `# Object Pool Thread-Safe

## Descripción
Implementa un object pool genérico y thread-safe para reutilizar objetos costosos.

## Funcionalidades
\`\`\`csharp
1. Rent(): obtener objeto del pool
2. Return(): devolver objeto al pool
3. Factory pattern para crear objetos
4. Límite de tamaño del pool
5. Limpieza automática de objetos
\`\`\`

## Características
- Thread-safe usando locks o concurrent collections
- Política de eviction cuando pool está lleno
- Disposal correcto de objetos

## Restricciones
- Implementar IDisposable
- Prevenir memory leaks
- Minimizar contention

**Empresas:** Microsoft, Google, Amazon, Bloomberg`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `using System;
using System.Collections.Concurrent;

public class ObjectPool<T> : IDisposable where T : class
{
    private readonly ConcurrentBag<T> pool;
    private readonly Func<T> factory;
    private readonly Action<T> reset;
    private readonly int maxSize;
    
    public ObjectPool(Func<T> factory, Action<T> reset = null, int maxSize = 100) 
    {
        this.factory = factory;
        this.reset = reset;
        this.maxSize = maxSize;
        this.pool = new ConcurrentBag<T>();
    }
    
    public T Rent() 
    {
        // Tu código aquí
        
    }
    
    public void Return(T item) 
    {
        // Tu código aquí
        
    }
    
    public void Dispose() 
    {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Reflection and Dynamic Code",
            description: "Generar código dinámicamente con reflection",
            statement: `# Reflection y Código Dinámico

## Descripción
Usa reflection y emit para generar código dinámico en runtime.

## Tareas
\`\`\`csharp
1. Crear clases dinámicamente
2. Generar métodos con IL
3. Invocar métodos por reflection
4. Crear proxies dinámicos
5. Attribute-based processing
\`\`\`

## Ejemplo
\`\`\`csharp
var type = CreateType("DynamicClass");
var instance = Activator.CreateInstance(type);
var method = type.GetMethod("DynamicMethod");
method.Invoke(instance, new object[] { "arg" });
\`\`\`

## Restricciones
- Usar System.Reflection.Emit
- Cache de reflection results
- Performance optimization

**Empresas:** Microsoft, Google, Amazon, Unity Technologies`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `using System;
using System.Reflection;
using System.Reflection.Emit;

public class DynamicTypeBuilder 
{
    public Type CreateType(string typeName, Dictionary<string, Type> properties) 
    {
        // Tu código aquí
        
    }
    
    public object CreateInstance(Type type, Dictionary<string, object> propertyValues) 
    {
        // Tu código aquí
        
    }
}

public class ProxyGenerator 
{
    public T CreateProxy<T>() where T : class 
    {
        // Tu código aquí: crear proxy que intercepte llamadas
        
    }
}`,
        },
        {
            title: "Memory-Efficient Data Structures",
            description: "Implementar estructuras de datos memory-efficient",
            statement: `# Estructuras de Datos Memory-Efficient

## Descripción
Implementa estructuras de datos optimizadas para memoria usando Span<T>, Memory<T>, y stackalloc.

## Estructuras
\`\`\`csharp
1. Ring buffer usando Span<T>
2. String pool con Memory<T>
3. Bit array compacto
4. Trie usando spans
5. Bloomfilter memory-efficient
\`\`\`

## Optimizaciones
- Minimizar allocations en heap
- Usar stackalloc cuando sea apropiado
- Span<T> para slicing sin copias

## Restricciones
- Evitar boxing
- Zero-allocation en hot paths
- Considerar cache locality

**Empresas:** Microsoft, Google, Amazon, Game Studios`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `using System;

public class RingBuffer<T> 
{
    private readonly T[] buffer;
    private int head;
    private int tail;
    private readonly int capacity;
    
    public RingBuffer(int capacity) 
    {
        this.capacity = capacity;
        this.buffer = new T[capacity];
    }
    
    public void Write(ReadOnlySpan<T> data) 
    {
        // Tu código aquí
        
    }
    
    public int Read(Span<T> destination) 
    {
        // Tu código aquí
        
    }
}

public class BloomFilter 
{
    // Tu código aquí: implementar bloom filter memory-efficient
    
}`,
        },
        {
            title: "Source Generators",
            description: "Crear un source generator",
            statement: `# Source Generators

## Descripción
Implementa un Roslyn source generator que genera código en compile-time.

## Casos de Uso
\`\`\`csharp
1. Auto-generar ToString() methods
2. Builder pattern generation
3. Mapping code generation
4. DTO generation desde attributes
5. Serialization code
\`\`\`

## Ejemplo
\`\`\`csharp
[GenerateBuilder]
public partial class Person 
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// Generator crea:
var person = new PersonBuilder()
    .WithName("John")
    .WithAge(30)
    .Build();
\`\`\`

## Restricciones
- Implementar ISourceGenerator
- Usar Roslyn APIs
- Generar código válido
- Manejar errores apropiadamente

**Empresas:** Microsoft, JetBrains, Unity Technologies`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Text;

[Generator]
public class BuilderGenerator : ISourceGenerator 
{
    public void Initialize(GeneratorInitializationContext context) 
    {
        // Tu código aquí
        
    }
    
    public void Execute(GeneratorExecutionContext context) 
    {
        // Tu código aquí
        
    }
    
    private string GenerateBuilderClass(ClassDeclarationSyntax classDeclaration) 
    {
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

    console.log("✅ 15 ejercicios de C# creados");
}
