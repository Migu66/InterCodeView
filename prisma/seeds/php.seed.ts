import { PrismaClient } from "../../src/generated/prisma";

export async function seedPHP(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Arrays and Loops",
            description: "Manipula arrays con funciones nativas de PHP",
            statement: `## 📝 Arrays y Loops en PHP

PHP ofrece potentes funciones para manipular arrays.

## 🎯 Objetivo

Implementa \`filterEvens\` que:
- Reciba un array de números
- Filtre solo los números pares
- Retorne el array filtrado
- Usa \`array_filter\` o loop tradicional

## 📋 Ejemplos

\`\`\`php
filterEvens([1, 2, 3, 4, 5])  // [2, 4]
filterEvens([10, 15, 20])     // [10, 20]
\`\`\`

## 💡 Pista

Usa \`array_filter($numbers, fn($n) => $n % 2 === 0)\` o foreach.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `<?php
function filterEvens($numbers) {
    // Tu código aquí
    // Opción 1: array_filter
    // Opción 2: foreach
}

// Prueba
print_r(filterEvens([1, 2, 3, 4, 5]));
print_r(filterEvens([10, 15, 20]));
?>`,
        },
        {
            title: "String Functions",
            description: "Usa funciones de manipulación de strings",
            statement: `## 📝 Funciones de Strings

PHP tiene funciones nativas para trabajar con strings.

## 🎯 Objetivo

Implementa \`formatName\` que:
- Reciba nombre y apellido
- Convierta a mayúsculas la primera letra de cada palabra
- Retorne en formato "Apellido, Nombre"

## 📋 Ejemplos

\`\`\`php
formatName("juan", "pérez")  // "Pérez, Juan"
formatName("ana", "garcía")  // "García, Ana"
\`\`\`

## 💡 Pista

Usa \`ucfirst()\` o \`ucwords()\` para capitalizar.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `<?php
function formatName($firstName, $lastName) {
    // Tu código aquí
    // Usa ucwords() para capitalizar
}

// Prueba
echo formatName("juan", "pérez") . "\\n";
echo formatName("ana", "garcía") . "\\n";
?>`,
        },
        {
            title: "Associative Arrays",
            description: "Trabaja con arrays asociativos",
            statement: `## 📝 Associative Arrays

Los arrays asociativos son fundamentales en PHP.

## 🎯 Objetivo

Crea una función \`getUserInfo\` que:
- Retorne un array asociativo con info del usuario
- Keys: 'name', 'email', 'age'
- Valida que age sea mayor a 0

## 📋 Ejemplo

\`\`\`php
$user = getUserInfo("Ana", "ana@test.com", 25);
// ['name' => 'Ana', 'email' => 'ana@test.com', 'age' => 25]
\`\`\`

## 💡 Pista

Usa \`['key' => 'value']\` para crear arrays asociativos.`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `<?php
function getUserInfo($name, $email, $age) {
    // Tu código aquí
    // Valida age > 0
    // Retorna array asociativo
}

// Prueba
$user = getUserInfo("Ana", "ana@test.com", 25);
print_r($user);
?>`,
        },
        {
            title: "Functions and Default Parameters",
            description: "Define funciones con parámetros por defecto",
            statement: `## 📝 Funciones con Parámetros Default

PHP permite parámetros opcionales con valores por defecto.

## 🎯 Objetivo

Crea \`greet\` que:
- Reciba \$name (requerido)
- Reciba \$greeting (opcional, default "Hola")
- Retorne el saludo completo

## 📋 Ejemplos

\`\`\`php
greet("Ana")              // "Hola Ana"
greet("Juan", "Buenos días")  // "Buenos días Juan"
\`\`\`

## 💡 Pista

Usa \`function greet($name, $greeting = "Hola")\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `<?php
function greet($name, $greeting = "Hola") {
    // Tu código aquí
}

// Prueba
echo greet("Ana") . "\\n";
echo greet("Juan", "Buenos días") . "\\n";
?>`,
        },
        {
            title: "Type Declarations",
            description: "Usa type hints y return types",
            statement: `## 📝 Type Declarations (PHP 7+)

Type hints mejoran la seguridad del código.

## 🎯 Objetivo

Crea \`calculateTotal\` que:
- Reciba array de floats
- Retorne float (suma total)
- Use type declarations

## 📋 Ejemplo

\`\`\`php
calculateTotal([10.5, 20.3, 5.2])  // 36.0
\`\`\`

## 💡 Pista

\`function calculateTotal(array $prices): float\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `<?php
function calculateTotal(array $prices): float {
    // Tu código aquí
}

// Prueba
echo calculateTotal([10.5, 20.3, 5.2]) . "\\n";
echo calculateTotal([100, 50, 25]) . "\\n";
?>`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "OOP in PHP",
            description: "Implementa clases con propiedades y métodos",
            statement: `## 📝 Programación Orientada a Objetos

OOP es fundamental en PHP moderno.

## 🎯 Objetivo

Crea una clase \`User\` con:
- Propiedades privadas: name, email
- Constructor
- Getters y setters
- Método \`toArray()\`

## 📋 Ejemplo

\`\`\`php
$user = new User("Ana", "ana@test.com");
echo $user->getName();  // "Ana"
print_r($user->toArray());
\`\`\`

## 💡 Pista

Usa \`private\`, \`public\`, \`__construct()\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `<?php
class User {
    private $name;
    private $email;
    
    public function __construct($name, $email) {
        // Tu código aquí
    }
    
    public function getName() {
        // Tu código aquí
    }
    
    public function setName($name) {
        // Tu código aquí
    }
    
    public function toArray() {
        // Tu código aquí
    }
}

// Prueba
$user = new User("Ana", "ana@test.com");
echo $user->getName() . "\\n";
print_r($user->toArray());
?>`,
        },
        {
            title: "Inheritance and Interfaces",
            description: "Herencia e interfaces en PHP",
            statement: `## 📝 Herencia e Interfaces

Diseña jerarquías de clases correctamente.

## 🎯 Objetivo

- Crea interface \`Payable\`
- Clase \`Employee\` que implemente \`Payable\`
- Clase \`Contractor\` que implemente \`Payable\`
- Cada una calcula salario diferente

## 📋 Ejemplo

\`\`\`php
interface Payable {
    public function calculatePay(): float;
}
\`\`\`

## 💡 Pista

Usa \`implements\` para interfaces, \`extends\` para herencia.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `<?php
interface Payable {
    public function calculatePay(): float;
}

class Employee implements Payable {
    private $salary;
    
    public function __construct($salary) {
        $this->salary = $salary;
    }
    
    public function calculatePay(): float {
        // Tu código aquí
    }
}

class Contractor implements Payable {
    private $hourlyRate;
    private $hoursWorked;
    
    public function __construct($hourlyRate, $hoursWorked) {
        // Tu código aquí
    }
    
    public function calculatePay(): float {
        // Tu código aquí
    }
}

// Prueba
$emp = new Employee(5000);
$con = new Contractor(50, 160);
echo "Employee: " . $emp->calculatePay() . "\\n";
echo "Contractor: " . $con->calculatePay() . "\\n";
?>`,
        },
        {
            title: "Namespaces",
            description: "Organiza código con namespaces",
            statement: `## 📝 Namespaces

Los namespaces evitan conflictos de nombres.

## 🎯 Objetivo

Crea:
- Namespace \`App\\Models\` con clase \`Product\`
- Namespace \`App\\Services\` con clase \`ProductService\`
- Usa \`use\` para importar

## 📋 Ejemplo

\`\`\`php
namespace App\\Models;
class Product { }

namespace App\\Services;
use App\\Models\\Product;
\`\`\`

## 💡 Pista

Un archivo puede tener múltiples namespaces para el ejercicio.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `<?php
namespace App\\Models;

class Product {
    public $name;
    public $price;
    
    public function __construct($name, $price) {
        // Tu código aquí
    }
}

namespace App\\Services;
use App\\Models\\Product;

class ProductService {
    public function createProduct($name, $price) {
        // Tu código aquí
        // Retorna nueva instancia de Product
    }
}

// Prueba
$service = new ProductService();
$product = $service->createProduct("Laptop", 999.99);
var_dump($product);
?>`,
        },
        {
            title: "Traits",
            description: "Reutiliza código con traits",
            statement: `## 📝 Traits

Los traits permiten reutilizar métodos en múltiples clases.

## 🎯 Objetivo

- Crea un trait \`Timestampable\` con métodos para timestamps
- Úsalo en clases \`Post\` y \`Comment\`

## 📋 Ejemplo

\`\`\`php
trait Timestampable {
    public function setCreatedAt() { }
}

class Post {
    use Timestampable;
}
\`\`\`

## 💡 Pista

Usa \`use TraitName;\` dentro de la clase.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `<?php
trait Timestampable {
    private $createdAt;
    private $updatedAt;
    
    public function setCreatedAt() {
        $this->createdAt = date('Y-m-d H:i:s');
    }
    
    public function getCreatedAt() {
        return $this->createdAt;
    }
    
    // Completa con updatedAt
}

class Post {
    use Timestampable;
    
    private $title;
    
    public function __construct($title) {
        $this->title = $title;
        $this->setCreatedAt();
    }
}

class Comment {
    use Timestampable;
    
    private $text;
    
    public function __construct($text) {
        // Tu código aquí
    }
}

// Prueba
$post = new Post("Mi primer post");
echo "Post creado: " . $post->getCreatedAt() . "\\n";
?>`,
        },
        {
            title: "Error Handling",
            description: "Maneja excepciones correctamente",
            statement: `## 📝 Error Handling

Las excepciones permiten manejar errores de forma elegante.

## 🎯 Objetivo

- Crea \`ValidationException\` custom
- Implementa \`validateEmail\` que lance la excepción
- Usa try-catch para manejar

## 📋 Ejemplo

\`\`\`php
try {
    validateEmail("invalid");
} catch (ValidationException $e) {
    echo $e->getMessage();
}
\`\`\`

## 💡 Pista

\`throw new ValidationException("mensaje")\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `<?php
class ValidationException extends Exception {
    // Puedes customizar si quieres
}

function validateEmail($email) {
    // Tu código aquí
    // Si no es válido, throw new ValidationException
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new ValidationException("Email inválido: $email");
    }
    return true;
}

// Prueba
try {
    validateEmail("ana@test.com");
    echo "Email válido\\n";
    
    validateEmail("invalid");
    echo "Este mensaje no se mostrará\\n";
} catch (ValidationException $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
?>`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Dependency Injection",
            description: "Implementa un contenedor de DI simple",
            statement: `## 📝 Dependency Injection

DI es un patrón fundamental en frameworks modernos como Laravel.

## 🎯 Objetivo

Crea un \`Container\` que:
- Permita registrar bindings (\`bind\`)
- Resuelva dependencias (\`resolve\`)
- Soporte constructor injection

## 📋 Ejemplo

\`\`\`php
$container->bind('Database', fn() => new MySQL());
$db = $container->resolve('Database');
\`\`\`

## 💡 Pista

Usa \`ReflectionClass\` para analizar constructores.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `<?php
class Container {
    private $bindings = [];
    
    public function bind($abstract, $concrete) {
        // Tu código aquí
        // Guarda el binding
        $this->bindings[$abstract] = $concrete;
    }
    
    public function resolve($abstract) {
        // Tu código aquí
        // Si existe binding, ejecuta el callable
        if (isset($this->bindings[$abstract])) {
            return $this->bindings[$abstract]();
        }
        
        throw new Exception("No binding for $abstract");
    }
}

// Prueba
interface DatabaseInterface {}
class MySQL implements DatabaseInterface {
    public function connect() { return "Connected to MySQL"; }
}

$container = new Container();
$container->bind(DatabaseInterface::class, fn() => new MySQL());

$db = $container->resolve(DatabaseInterface::class);
echo $db->connect() . "\\n";
?>`,
        },
        {
            title: "Generators with Yield",
            description: "Usa generators para iteración eficiente",
            statement: `## 📝 Generators

Los generators permiten iterar grandes conjuntos sin cargarlos en memoria.

## 🎯 Objetivo

Implementa:
- \`fibonacci()\`: genera serie fibonacci infinita
- \`readLargeFile()\`: lee archivo línea por línea
- Usa \`yield\`

## 📋 Ejemplo

\`\`\`php
function fibonacci() {
    $a = 0; $b = 1;
    while (true) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}
\`\`\`

## 💡 Pista

\`yield\` pausa la función y retorna un valor.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `<?php
function fibonacci($max = 10) {
    $a = 0;
    $b = 1;
    $count = 0;
    
    // Tu código aquí
    // Usa yield para generar valores
}

function generateRange($start, $end) {
    // Tu código aquí
    // Genera números de start a end con yield
}

// Prueba
echo "Fibonacci:\\n";
foreach (fibonacci(10) as $num) {
    echo "$num ";
}
echo "\\n\\nRange 1-5:\\n";
foreach (generateRange(1, 5) as $num) {
    echo "$num ";
}
?>`,
        },
        {
            title: "Reflection API",
            description: "Introspección con Reflection",
            statement: `## 📝 Reflection API

Reflection permite inspeccionar clases en runtime.

## 🎯 Objetivo

Crea \`analyzeClass\` que:
- Use ReflectionClass
- Liste propiedades y métodos
- Indique visibilidad (public/private)

## 📋 Ejemplo

\`\`\`php
$reflection = new ReflectionClass(User::class);
$methods = $reflection->getMethods();
\`\`\`

## 💡 Pista

Usa \`ReflectionClass\`, \`getProperties()\`, \`getMethods()\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `<?php
class User {
    private $id;
    public $name;
    protected $email;
    
    public function getId() { return $this->id; }
    private function setId($id) { $this->id = $id; }
}

function analyzeClass($className) {
    $reflection = new ReflectionClass($className);
    
    echo "Clase: " . $reflection->getName() . "\\n\\n";
    
    // Lista propiedades
    echo "Propiedades:\\n";
    foreach ($reflection->getProperties() as $property) {
        // Tu código aquí
        // Muestra nombre y visibilidad
    }
    
    echo "\\nMétodos:\\n";
    foreach ($reflection->getMethods() as $method) {
        // Tu código aquí
        // Muestra nombre y visibilidad
    }
}

// Prueba
analyzeClass(User::class);
?>`,
        },
        {
            title: "Magic Methods",
            description: "Usa métodos mágicos de PHP",
            statement: `## 📝 Magic Methods

PHP tiene métodos especiales que se invocan automáticamente.

## 🎯 Objetivo

Implementa una clase \`Model\` con:
- \`__get\`: acceso a propiedades
- \`__set\`: asignación de propiedades
- \`__call\`: método dinámico
- \`__toString\`: conversión a string

## 📋 Ejemplo

\`\`\`php
$model->name = "Ana";  // Llama __set
echo $model->name;     // Llama __get
\`\`\`

## 💡 Pista

Los magic methods empiezan con \`__\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `<?php
class Model {
    private $attributes = [];
    
    public function __get($name) {
        // Tu código aquí
        // Retorna $this->attributes[$name] si existe
    }
    
    public function __set($name, $value) {
        // Tu código aquí
        // Guarda en $this->attributes[$name]
    }
    
    public function __isset($name) {
        // Tu código aquí
    }
    
    public function __toString() {
        // Tu código aquí
        // Retorna JSON de attributes
    }
    
    public function __call($method, $args) {
        // Tu código aquí
        // Maneja llamadas a métodos inexistentes
        echo "Llamando a método inexistente: $method\\n";
    }
}

// Prueba
$model = new Model();
$model->name = "Ana";
$model->age = 25;
echo $model->name . "\\n";
echo $model . "\\n";
$model->unknownMethod();
?>`,
        },
        {
            title: "Attributes (PHP 8)",
            description: "Usa attributes para metadata",
            statement: `## 📝 Attributes (PHP 8+)

Los attributes añaden metadata a clases, métodos, propiedades.

## 🎯 Objetivo

- Crea attribute \`Route\`
- Úsalo en métodos de un controller
- Lee los attributes con Reflection

## 📋 Ejemplo

\`\`\`php
#[Attribute]
class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}
\`\`\`

## 💡 Pista

Usa \`#[Route("/home")]\` para aplicar el attribute.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `<?php
#[Attribute]
class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

class HomeController {
    #[Route('/home')]
    public function index() {
        return "Home page";
    }
    
    #[Route('/about', 'GET')]
    public function about() {
        return "About page";
    }
}

// Lee attributes con Reflection
function getRoutes($controllerClass) {
    $reflection = new ReflectionClass($controllerClass);
    $routes = [];
    
    foreach ($reflection->getMethods() as $method) {
        $attributes = $method->getAttributes(Route::class);
        foreach ($attributes as $attribute) {
            // Tu código aquí
            $route = $attribute->newInstance();
            $routes[] = [
                'method' => $method->getName(),
                'path' => $route->path,
                'httpMethod' => $route->method
            ];
        }
    }
    
    return $routes;
}

// Prueba
$routes = getRoutes(HomeController::class);
print_r($routes);
?>`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de PHP creados`);
}
