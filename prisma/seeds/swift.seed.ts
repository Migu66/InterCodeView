import { PrismaClient } from "../../src/generated/prisma";

export async function seedSwift(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Optionals and Unwrapping",
            description: "Maneja valores opcionales de forma segura",
            statement: `## 📝 Optionals en Swift

Los optionals son fundamentales en Swift para manejar valores que pueden ser nil.

## 🎯 Objetivo

Implementa \`safeGreet\` que:
- Reciba un nombre opcional (String?)
- Use optional binding (if let)
- Retorne "Hola, [nombre]" o "Hola, invitado"

## 📋 Ejemplos

\`\`\`swift
safeGreet("Ana")    // "Hola, Ana"
safeGreet(nil)      // "Hola, invitado"
\`\`\`

## 💡 Pista

Usa \`if let name = name\` para unwrapping seguro o \`??\` (nil coalescing).`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `func safeGreet(_ name: String?) -> String {
    // Tu código aquí
    // Opción 1: if let
    // Opción 2: guard let
    // Opción 3: ??
}

// Prueba
print(safeGreet("Ana"))
print(safeGreet(nil))`,
        },
        {
            title: "Arrays and Collections",
            description: "Trabaja con arrays y métodos de colección",
            statement: `## 📝 Arrays y Colecciones

Swift tiene potentes métodos para manipular colecciones.

## 🎯 Objetivo

Implementa \`filterAndDouble\` que:
- Reciba un array de enteros
- Filtre los números pares
- Multiplique cada uno por 2
- Retorne el array resultante

## 📋 Ejemplos

\`\`\`swift
filterAndDouble([1, 2, 3, 4, 5])  // [4, 8]
filterAndDouble([10, 15, 20])     // [20, 40]
\`\`\`

## 💡 Pista

Usa \`filter\` y \`map\`: \`numbers.filter { $0 % 2 == 0 }.map { $0 * 2 }\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `func filterAndDouble(_ numbers: [Int]) -> [Int] {
    // Tu código aquí
    // Usa filter y map
}

// Prueba
print(filterAndDouble([1, 2, 3, 4, 5]))
print(filterAndDouble([10, 15, 20]))`,
        },
        {
            title: "Structs and Properties",
            description: "Define structs con propiedades calculadas",
            statement: `## 📝 Structs en Swift

Los structs son tipos de valor preferidos en Swift.

## 🎯 Objetivo

Crea un struct \`Rectangle\` con:
- Propiedades: width, height (Double)
- Propiedad calculada \`area\`
- Método \`isSquare\` que retorna Bool

## 📋 Ejemplo

\`\`\`swift
let rect = Rectangle(width: 10, height: 5)
rect.area  // 50
rect.isSquare()  // false
\`\`\`

## 💡 Pista

Propiedad calculada: \`var area: Double { width * height }\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `struct Rectangle {
    let width: Double
    let height: Double
    
    // Propiedad calculada
    var area: Double {
        // Tu código aquí
    }
    
    func isSquare() -> Bool {
        // Tu código aquí
    }
}

// Prueba
let rect1 = Rectangle(width: 10, height: 5)
print("Área: \\(rect1.area)")
print("¿Es cuadrado?: \\(rect1.isSquare())")

let rect2 = Rectangle(width: 5, height: 5)
print("¿Es cuadrado?: \\(rect2.isSquare())")`,
        },
        {
            title: "Enums with Associated Values",
            description: "Enums con valores asociados",
            statement: `## 📝 Enums con Valores Asociados

Los enums en Swift pueden tener valores asociados.

## 🎯 Objetivo

Crea enum \`PaymentMethod\` con:
- \`cash(amount: Double)\`
- \`card(number: String)\`
- \`digital(email: String)\`

Implementa función que procese el pago.

## 📋 Ejemplo

\`\`\`swift
let payment = PaymentMethod.card(number: "1234")
processPayment(payment)
\`\`\`

## 💡 Pista

Usa \`switch\` con pattern matching para extraer valores asociados.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `enum PaymentMethod {
    case cash(amount: Double)
    case card(number: String)
    case digital(email: String)
}

func processPayment(_ method: PaymentMethod) {
    switch method {
    case .cash(let amount):
        print("Pago en efectivo: $\\(amount)")
    case .card(let number):
        print("Pago con tarjeta: ****\\(number.suffix(4))")
    case .digital(let email):
        print("Pago digital a: \\(email)")
    }
}

// Prueba
processPayment(.cash(amount: 100.0))
processPayment(.card(number: "1234567890"))
processPayment(.digital(email: "ana@test.com"))`,
        },
        {
            title: "Closures",
            description: "Usa closures como parámetros",
            statement: `## 📝 Closures

Los closures son funciones anónimas que capturan contexto.

## 🎯 Objetivo

Implementa \`repeatAction\` que:
- Reciba número de veces (Int)
- Reciba closure a ejecutar
- Ejecute el closure N veces

## 📋 Ejemplo

\`\`\`swift
repeatAction(3) {
    print("Hola")
}
// Imprime "Hola" 3 veces
\`\`\`

## 💡 Pista

Parámetro: \`action: () -> Void\`. Usa \`for _ in 0..<times\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `func repeatAction(_ times: Int, action: () -> Void) {
    // Tu código aquí
}

// Prueba
repeatAction(3) {
    print("Hola")
}

repeatAction(5) {
    print("Swift es genial!")
}`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Protocols and Extensions",
            description: "Define protocolos y extiende tipos",
            statement: `## 📝 Protocols y Extensions

Los protocolos definen contratos, las extensiones añaden funcionalidad.

## 🎯 Objetivo

- Define protocolo \`Describable\` con método \`describe()\`
- Implementa en struct \`Person\`
- Extiende String para conformar \`Describable\`

## 📋 Ejemplo

\`\`\`swift
protocol Describable {
    func describe() -> String
}
\`\`\`

## 💡 Pista

Extensions: \`extension String: Describable { ... }\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `protocol Describable {
    func describe() -> String
}

struct Person: Describable {
    let name: String
    let age: Int
    
    func describe() -> String {
        // Tu código aquí
    }
}

extension String: Describable {
    func describe() -> String {
        // Tu código aquí
    }
}

// Prueba
let person = Person(name: "Ana", age: 25)
print(person.describe())

let text = "Hola mundo"
print(text.describe())`,
        },
        {
            title: "Error Handling",
            description: "Maneja errores con throw/try/catch",
            statement: `## 📝 Error Handling

Swift usa throw/try/catch para manejo de errores.

## 🎯 Objetivo

- Define enum \`ValidationError: Error\`
- Implementa \`validateAge\` que lance errores
- Usa do-catch para manejar

## 📋 Ejemplo

\`\`\`swift
enum ValidationError: Error {
    case tooYoung
    case tooOld
}

func validateAge(_ age: Int) throws { }
\`\`\`

## 💡 Pista

Usa \`throw ValidationError.tooYoung\` y \`try validateAge(age)\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `enum ValidationError: Error {
    case tooYoung
    case tooOld
    case invalidValue
}

func validateAge(_ age: Int) throws {
    // Tu código aquí
    if age < 0 {
        throw ValidationError.invalidValue
    }
    if age < 18 {
        throw ValidationError.tooYoung
    }
    if age > 120 {
        throw ValidationError.tooOld
    }
}

// Prueba
do {
    try validateAge(25)
    print("Edad válida")
} catch ValidationError.tooYoung {
    print("Demasiado joven")
} catch ValidationError.tooOld {
    print("Edad no válida")
} catch {
    print("Error: \\(error)")
}`,
        },
        {
            title: "Generics",
            description: "Funciones y tipos genéricos",
            statement: `## 📝 Generics

Los genéricos permiten código reutilizable con type safety.

## 🎯 Objetivo

Implementa:
- \`swap\`: intercambia dos valores de cualquier tipo
- \`Stack<T>\`: estructura genérica
- Usa constraints cuando sea necesario

## 📋 Ejemplo

\`\`\`swift
func swap<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}
\`\`\`

## 💡 Pista

Usa \`<T>\` para tipo genérico. \`inout\` para parámetros mutables.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `func swap<T>(_ a: inout T, _ b: inout T) {
    // Tu código aquí
}

struct Stack<Element> {
    private var items: [Element] = []
    
    mutating func push(_ item: Element) {
        // Tu código aquí
    }
    
    mutating func pop() -> Element? {
        // Tu código aquí
    }
    
    func peek() -> Element? {
        // Tu código aquí
    }
}

// Prueba
var x = 5
var y = 10
swap(&x, &y)
print("x: \\(x), y: \\(y)")

var stack = Stack<String>()
stack.push("primero")
stack.push("segundo")
print(stack.pop() ?? "vacío")`,
        },
        {
            title: "Property Observers",
            description: "willSet y didSet",
            statement: `## 📝 Property Observers

Property observers responden a cambios en propiedades.

## 🎯 Objetivo

Crea class \`BankAccount\` con:
- Propiedad \`balance\` con didSet
- Loguea cambios en balance
- Valida que no sea negativo

## 📋 Ejemplo

\`\`\`swift
var balance: Double = 0 {
    didSet {
        print("Balance cambió de \\(oldValue) a \\(balance)")
    }
}
\`\`\`

## 💡 Pista

\`willSet\` antes del cambio, \`didSet\` después. Accede a \`oldValue\` y \`newValue\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `class BankAccount {
    var balance: Double = 0 {
        willSet {
            // Tu código aquí
            print("Balance va a cambiar a \\(newValue)")
        }
        didSet {
            // Tu código aquí
            if balance < 0 {
                print("¡Advertencia! Balance negativo")
                balance = oldValue // Revertir
            } else {
                print("Balance actualizado: \\(oldValue) -> \\(balance)")
            }
        }
    }
    
    func deposit(_ amount: Double) {
        balance += amount
    }
    
    func withdraw(_ amount: Double) {
        balance -= amount
    }
}

// Prueba
let account = BankAccount()
account.deposit(100)
account.withdraw(50)
account.withdraw(100) // Debería mostrar advertencia`,
        },
        {
            title: "Map, Filter, Reduce",
            description: "Domina funciones de orden superior",
            statement: `## 📝 Higher-Order Functions

map, filter, reduce son fundamentales en programación funcional.

## 🎯 Objetivo

Dada lista de productos, usa:
- \`map\`: extraer nombres
- \`filter\`: productos caros (>$50)
- \`reduce\`: suma total

## 📋 Ejemplo

\`\`\`swift
let prices = [10, 20, 30]
let total = prices.reduce(0, +)  // 60
\`\`\`

## 💡 Pista

\`reduce\` toma valor inicial y closure: \`reduce(0) { $0 + $1 }\`.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `struct Product {
    let name: String
    let price: Double
}

let products = [
    Product(name: "Laptop", price: 999),
    Product(name: "Mouse", price: 25),
    Product(name: "Keyboard", price: 75),
    Product(name: "Monitor", price: 300)
]

// Map: extraer nombres
let names = products.map { $0.name }
print("Productos: \\(names)")

// Filter: productos caros
let expensive = products.filter { $0.price > 50 }
print("Productos caros: \\(expensive.map { $0.name })")

// Reduce: precio total
let total = products.reduce(0) { $0 + $1.price }
print("Total: $\\(total)")`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Protocol-Oriented Programming",
            description: "Diseño orientado a protocolos",
            statement: `## 📝 Protocol-Oriented Programming

Swift favorece protocolos sobre herencia de clases.

## 🎯 Objetivo

Implementa:
- Protocolo \`Drawable\` con \`draw()\`
- Extensión con implementación default
- Protocol composition
- Associated types

## 📋 Ejemplo

\`\`\`swift
protocol Drawable {
    func draw()
}

extension Drawable {
    func draw() { print("Drawing...") }
}
\`\`\`

## 💡 Pista

Protocol composition: \`typealias Shape = Drawable & Colorful\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `protocol Drawable {
    func draw()
}

protocol Colorful {
    var color: String { get }
}

// Implementación default
extension Drawable {
    func draw() {
        print("Dibujando forma genérica")
    }
}

// Protocol composition
typealias ColoredShape = Drawable & Colorful

struct Circle: ColoredShape {
    let radius: Double
    let color: String
    
    func draw() {
        print("Dibujando círculo \\(color) de radio \\(radius)")
    }
}

struct Rectangle: ColoredShape {
    let width: Double
    let height: Double
    let color: String
    
    // Usa implementación default de draw()
}

// Prueba
let circle = Circle(radius: 5, color: "rojo")
circle.draw()

let rect = Rectangle(width: 10, height: 5, color: "azul")
rect.draw()`,
        },
        {
            title: "Result Type",
            description: "Manejo de errores con Result",
            statement: `## 📝 Result Type

Result<Success, Failure> modela operaciones que pueden fallar.

## 🎯 Objetivo

Implementa API que:
- Use \`Result<Data, NetworkError>\`
- Maneje success y failure
- Use \`map\` y \`flatMap\` en Result

## 📋 Ejemplo

\`\`\`swift
func fetchData() -> Result<String, Error> {
    return .success("Data")
}
\`\`\`

## 💡 Pista

\`switch result { case .success(let data): ... case .failure(let error): ... }\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingError
}

func fetchUserData(id: Int) -> Result<String, NetworkError> {
    // Simular fetch
    if id < 0 {
        return .failure(.invalidURL)
    }
    if id == 0 {
        return .failure(.noData)
    }
    return .success("Usuario #\\(id)")
}

// Uso con switch
let result = fetchUserData(id: 1)
switch result {
case .success(let data):
    print("Éxito: \\(data)")
case .failure(let error):
    print("Error: \\(error)")
}

// Uso con map
let mapped = fetchUserData(id: 2).map { data in
    "Procesado: \\(data)"
}

if case .success(let value) = mapped {
    print(value)
}`,
        },
        {
            title: "Property Wrappers",
            description: "Crea property wrappers personalizados",
            statement: `## 📝 Property Wrappers

Los property wrappers añaden lógica a propiedades.

## 🎯 Objetivo

Crea property wrapper \`Clamped\` que:
- Limite valor entre min y max
- Use \`@propertyWrapper\`
- Implemente \`wrappedValue\`

## 📋 Ejemplo

\`\`\`swift
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    private let range: ClosedRange<T>
    
    var wrappedValue: T { get { } set { } }
}
\`\`\`

## 💡 Pista

Usa \`@Clamped(0...100)\` para aplicar el wrapper.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    private let range: ClosedRange<T>
    
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Game {
    @Clamped(0...100) var health: Int = 100
    @Clamped(0...10) var level: Int = 1
}

// Prueba
var game = Game()
print("Salud: \\(game.health)")

game.health = 150  // Se clampea a 100
print("Salud después de +50: \\(game.health)")

game.health = -20  // Se clampea a 0
print("Salud después de -120: \\(game.health)")`,
        },
        {
            title: "Combine Framework Basics",
            description: "Reactive programming con Combine",
            statement: `## 📝 Combine Framework

Combine es el framework de programación reactiva de Apple.

## 🎯 Objetivo

Usa Combine para:
- Crear Publishers
- Transformar con operadores (map, filter)
- Subscribirse con sink
- Manejar cancelación

## 📋 Ejemplo

\`\`\`swift
import Combine

let numbers = [1, 2, 3, 4, 5].publisher
numbers
    .filter { $0 % 2 == 0 }
    .sink { print($0) }
\`\`\`

## 💡 Pista

Publishers emiten valores. Subscribers los reciben. Operators transforman.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `import Combine

// Publisher simple
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].publisher

// Pipeline con operadores
let subscription = numbers
    .filter { $0 % 2 == 0 }  // Solo pares
    .map { $0 * 2 }          // Multiplicar por 2
    .sink(
        receiveCompletion: { completion in
            switch completion {
            case .finished:
                print("Completado")
            case .failure(let error):
                print("Error: \\(error)")
            }
        },
        receiveValue: { value in
            print("Valor: \\(value)")
        }
    )

// No olvidar cancelar
// subscription.cancel()`,
        },
        {
            title: "Memory Management",
            description: "ARC, weak, unowned",
            statement: `## 📝 Memory Management

Swift usa ARC (Automatic Reference Counting) para gestión de memoria.

## 🎯 Objetivo

Implementa clases que:
- Eviten reference cycles
- Usen \`weak\` y \`unowned\`
- Demuestren el problema y solución

## 📋 Ejemplo

\`\`\`swift
class Person {
    var apartment: Apartment?
}

class Apartment {
    weak var tenant: Person?
}
\`\`\`

## 💡 Pista

\`weak\`: opcional, puede ser nil. \`unowned\`: no opcional, asume siempre existe.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `class Person {
    let name: String
    var apartment: Apartment?
    
    init(name: String) {
        self.name = name
        print("\\(name) inicializado")
    }
    
    deinit {
        print("\\(name) desinicializado")
    }
}

class Apartment {
    let unit: String
    weak var tenant: Person?  // weak para evitar reference cycle
    
    init(unit: String) {
        self.unit = unit
        print("Apartamento \\(unit) inicializado")
    }
    
    deinit {
        print("Apartamento \\(unit) desinicializado")
    }
}

// Prueba
var john: Person? = Person(name: "John")
var unit4A: Apartment? = Apartment(unit: "4A")

john?.apartment = unit4A
unit4A?.tenant = john

// Liberar referencias
john = nil  // Debería desinicializar gracias a weak
unit4A = nil`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de Swift creados`);
}
