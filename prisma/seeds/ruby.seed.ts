import { PrismaClient } from "../../src/generated/prisma";

export async function seedRuby(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Blocks and Iterators",
            description: "Usa blocks con each, map, select",
            statement: `## 📝 Blocks e Iteradores en Ruby

Los blocks son fundamentales en Ruby para iterar y transformar colecciones.

## 🎯 Objetivo

Implementa \`process_numbers\` que:
- Reciba un array de números
- Filtre los pares
- Multiplique cada uno por 2
- Retorne el array resultante

## 📋 Ejemplos

\`\`\`ruby
process_numbers([1, 2, 3, 4, 5])  # [4, 8]
process_numbers([10, 15, 20])     # [20, 40]
\`\`\`

## 💡 Pista

Usa \`select { |n| n.even? }.map { |n| n * 2 }\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `def process_numbers(nums)
  # Tu código aquí
  # Usa select y map con blocks
end

# Prueba
puts process_numbers([1, 2, 3, 4, 5]).inspect
puts process_numbers([10, 15, 20]).inspect`,
        },
        {
            title: "Symbols and Hashes",
            description: "Trabaja con símbolos y hashes",
            statement: `## 📝 Symbols y Hashes

Los símbolos son identificadores inmutables, perfectos como keys de hashes.

## 🎯 Objetivo

Crea \`create_user\` que:
- Reciba name, email, age
- Retorne un hash con símbolos como keys
- Valide que age sea mayor a 0

## 📋 Ejemplo

\`\`\`ruby
create_user("Ana", "ana@test.com", 25)
# { name: "Ana", email: "ana@test.com", age: 25 }
\`\`\`

## 💡 Pista

Usa \`{ name: name, email: email, age: age }\` o shorthand si aplica.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `def create_user(name, email, age)
  # Tu código aquí
  # Valida age > 0
  # Retorna hash con símbolos
end

# Prueba
user = create_user("Ana", "ana@test.com", 25)
puts user.inspect`,
        },
        {
            title: "String Interpolation",
            description: "Interpolación y métodos de String",
            statement: `## 📝 String Manipulation

Ruby ofrece interpolación elegante y muchos métodos de String.

## 🎯 Objetivo

Implementa \`format_greeting\` que:
- Reciba nombre y hora (0-23)
- Retorne saludo apropiado según la hora
- "Buenos días" (5-11), "Buenas tardes" (12-19), "Buenas noches" (20-4)

## 📋 Ejemplos

\`\`\`ruby
format_greeting("Ana", 9)   # "Buenos días, Ana"
format_greeting("Juan", 15) # "Buenas tardes, Juan"
\`\`\`

## 💡 Pista

Usa interpolación: \`"#{greeting}, #{name}"\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `def format_greeting(name, hour)
  # Tu código aquí
  # Determina el saludo según la hora
  # Usa interpolación
end

# Prueba
puts format_greeting("Ana", 9)
puts format_greeting("Juan", 15)
puts format_greeting("Pedro", 22)`,
        },
        {
            title: "Arrays and Ranges",
            description: "Operaciones con arrays y ranges",
            statement: `## 📝 Arrays y Ranges

Ruby tiene sintaxis expresiva para arrays y ranges.

## 🎯 Objetivo

Implementa \`sum_range\` que:
- Reciba inicio y fin
- Cree un range
- Retorne la suma de todos los números

## 📋 Ejemplos

\`\`\`ruby
sum_range(1, 5)   # 15 (1+2+3+4+5)
sum_range(10, 15) # 75
\`\`\`

## 💡 Pista

Usa \`(start..end).sum\` o \`.reduce(:+)\`.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `def sum_range(start, finish)
  # Tu código aquí
  # Crea range y suma
end

# Prueba
puts sum_range(1, 5)
puts sum_range(10, 15)`,
        },
        {
            title: "Classes and attr_accessor",
            description: "Define clases con attr_accessor",
            statement: `## 📝 Classes y attr_accessor

Ruby simplifica getters y setters con attr_accessor.

## 🎯 Objetivo

Crea clase \`Person\` con:
- attr_accessor para name y age
- Método \`adult?\` que retorne true si age >= 18
- Método \`to_s\` para representación en string

## 📋 Ejemplo

\`\`\`ruby
person = Person.new("Ana", 25)
person.adult?  # true
\`\`\`

## 💡 Pista

\`attr_accessor :name, :age\` crea getters y setters.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `class Person
  # Tu código aquí
  # attr_accessor :name, :age
  
  def initialize(name, age)
    # Tu código aquí
  end
  
  def adult?
    # Tu código aquí
  end
  
  def to_s
    # Tu código aquí
  end
end

# Prueba
person = Person.new("Ana", 25)
puts person.name
puts person.adult?
puts person`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Enumerable Methods",
            description: "Domina métodos del módulo Enumerable",
            statement: `## 📝 Módulo Enumerable

Enumerable provee métodos poderosos para colecciones.

## 🎯 Objetivo

Implementa \`analyze_numbers\` que reciba array y retorne hash con:
- \`:sum\`: suma total
- \`:avg\`: promedio
- \`:evens\`: cantidad de pares
- \`:max\`: valor máximo

## 📋 Ejemplo

\`\`\`ruby
analyze_numbers([1, 2, 3, 4, 5])
# { sum: 15, avg: 3.0, evens: 2, max: 5 }
\`\`\`

## 💡 Pista

Usa \`sum\`, \`count\`, \`max\`, etc.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `def analyze_numbers(nums)
  # Tu código aquí
  # Retorna un hash con :sum, :avg, :evens, :max
end

# Prueba
result = analyze_numbers([1, 2, 3, 4, 5])
puts result.inspect`,
        },
        {
            title: "Procs and Lambdas",
            description: "Entiende diferencias entre Proc y Lambda",
            statement: `## 📝 Procs vs Lambdas

Ambos son closures, pero con diferencias sutiles.

## 🎯 Objetivo

- Crea \`create_multiplier\` que retorne lambda que multiplique
- Crea \`create_logger\` que retorne Proc que loguee
- Demuestra diferencia en manejo de argumentos

## 📋 Ejemplo

\`\`\`ruby
mult = create_multiplier(5)
mult.call(3)  # 15
\`\`\`

## 💡 Pista

Lambda valida argumentos, Proc no. Lambda retorna al caller, Proc no.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `def create_multiplier(factor)
  # Tu código aquí - retorna lambda
end

def create_logger(prefix)
  # Tu código aquí - retorna Proc
end

# Prueba
mult = create_multiplier(5)
puts mult.call(3)

logger = create_logger("[INFO]")
logger.call("Sistema iniciado")`,
        },
        {
            title: "Modules and Mixins",
            description: "Usa módulos para compartir comportamiento",
            statement: `## 📝 Modules y Mixins

Los módulos permiten compartir comportamiento entre clases.

## 🎯 Objetivo

- Crea módulo \`Comparable\` con métodos de comparación
- Inclúyelo en clases \`Product\` y \`Student\`
- Implementa \`<=>\` (spaceship operator)

## 📋 Ejemplo

\`\`\`ruby
module Printable
  def print_info
    puts "Info: #{self}"
  end
end
\`\`\`

## 💡 Pista

Usa \`include ModuleName\` para incluir módulos.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `module Timestampable
  def created_at
    # Tu código aquí
  end
  
  def time_since_creation
    # Tu código aquí
  end
end

class Post
  include Timestampable
  attr_accessor :title
  
  def initialize(title)
    @title = title
  end
end

class Comment
  include Timestampable
  attr_accessor :text
  
  def initialize(text)
    @text = text
  end
end

# Prueba
post = Post.new("Mi post")
sleep(1)
puts "Creado hace #{post.time_since_creation} segundos"`,
        },
        {
            title: "Exception Handling",
            description: "Maneja excepciones con begin/rescue",
            statement: `## 📝 Exception Handling

Ruby usa begin/rescue/ensure para manejar errores.

## 🎯 Objetivo

- Crea excepción custom \`ValidationError\`
- Implementa \`validate_age\` que lance la excepción
- Usa rescue para capturar y manejar

## 📋 Ejemplo

\`\`\`ruby
begin
  validate_age(-5)
rescue ValidationError => e
  puts e.message
end
\`\`\`

## 💡 Pista

\`raise ValidationError, "mensaje"\` para lanzar.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `class ValidationError < StandardError
end

def validate_age(age)
  # Tu código aquí
  # Lanza ValidationError si age < 0 o age > 150
end

# Prueba
begin
  validate_age(25)
  puts "Edad válida"
  
  validate_age(-5)
  puts "No debería llegar aquí"
rescue ValidationError => e
  puts "Error: #{e.message}"
end`,
        },
        {
            title: "Regular Expressions",
            description: "Usa regex para validación y extracción",
            statement: `## 📝 Regular Expressions

Ruby tiene soporte first-class para regex.

## 🎯 Objetivo

Implementa:
- \`extract_emails\`: extrae emails de un texto
- \`valid_phone?\`: valida formato teléfono
- Usa \`scan\`, \`match\`, operador \`=~\`

## 📋 Ejemplo

\`\`\`ruby
text = "Contacto: ana@test.com, juan@test.com"
extract_emails(text)  # ["ana@test.com", "juan@test.com"]
\`\`\`

## 💡 Pista

Usa \`text.scan(/regex/)\` para extraer múltiples matches.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `def extract_emails(text)
  # Tu código aquí
  # Usa scan con regex de email
end

def valid_phone?(phone)
  # Tu código aquí
  # Valida formato XXX-XXX-XXXX
end

# Prueba
text = "Contactos: ana@test.com, juan@example.org"
puts extract_emails(text).inspect

puts valid_phone?("555-123-4567")
puts valid_phone?("12345")`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "Metaprogramming with define_method",
            description: "Crea métodos dinámicamente",
            statement: `## 📝 Metaprogramming

Ruby permite crear código que escribe código.

## 🎯 Objetivo

Crea clase \`DynamicAttributes\` que:
- Use \`define_method\` para crear getters/setters
- Implemente \`method_missing\` para atributos dinámicos
- Registre atributos accedidos

## 📋 Ejemplo

\`\`\`ruby
obj = DynamicAttributes.new
obj.name = "Ana"
obj.name  # "Ana"
\`\`\`

## 💡 Pista

Usa \`define_method\` en bucle, \`instance_variable_get/set\`.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `class DynamicAttributes
  def initialize
    @attributes = {}
  end
  
  def method_missing(method_name, *args)
    # Tu código aquí
    # Implementa getter y setter dinámicos
  end
  
  def respond_to_missing?(method_name, include_private = false)
    # Tu código aquí
  end
end

# Prueba
obj = DynamicAttributes.new
obj.name = "Ana"
obj.age = 25
puts obj.name
puts obj.age`,
        },
        {
            title: "DSL Creation",
            description: "Crea un Domain Specific Language",
            statement: `## 📝 DSL Creation

Ruby es excelente para crear DSLs elegantes.

## 🎯 Objetivo

Crea un DSL para definir rutas:
\`\`\`ruby
router = Router.new do
  get '/home', to: 'home#index'
  post '/users', to: 'users#create'
end
\`\`\`

## 📋 Ejemplo Interno

Usa \`instance_eval\` para evaluar el bloque en contexto.

## 💡 Pista

\`instance_eval(&block)\` ejecuta el bloque en contexto del objeto.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `class Router
  attr_reader :routes
  
  def initialize(&block)
    @routes = []
    # Tu código aquí
    # Usa instance_eval para evaluar el bloque
  end
  
  def get(path, options = {})
    # Tu código aquí
  end
  
  def post(path, options = {})
    # Tu código aquí
  end
  
  private
  
  def add_route(method, path, controller)
    # Tu código aquí
  end
end

# Prueba
router = Router.new do
  get '/home', to: 'home#index'
  post '/users', to: 'users#create'
  get '/about', to: 'pages#about'
end

puts router.routes.inspect`,
        },
        {
            title: "Eigenclass and Singleton Methods",
            description: "Métodos específicos de una instancia",
            statement: `## 📝 Eigenclass (Singleton Class)

Cada objeto tiene su propia clase oculta para métodos singleton.

## 🎯 Objetivo

- Define métodos singleton en una instancia específica
- Usa \`class << obj\` syntax
- Demuestra que solo afecta a esa instancia

## 📋 Ejemplo

\`\`\`ruby
str = "hello"
class << str
  def shout
    upcase + "!"
  end
end
\`\`\`

## 💡 Pista

Los métodos singleton no afectan otras instancias de la clase.`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `# Crea objeto normal
person1 = "Ana"
person2 = "Juan"

# Añade método singleton solo a person1
class << person1
  def greet
    # Tu código aquí
  end
  
  def shout
    # Tu código aquí
  end
end

# Prueba
puts person1.greet
puts person1.shout

# person2 no tiene estos métodos
begin
  person2.greet
rescue NoMethodError => e
  puts "Error esperado: #{e.message}"
end`,
        },
        {
            title: "Refinements",
            description: "Monkey patching seguro con refinements",
            statement: `## 📝 Refinements

Refinements permiten modificar clases de forma controlada.

## 🎯 Objetivo

- Crea refinement para extender String
- Actívalo solo donde lo necesites con \`using\`
- Demuestra que no afecta código fuera del scope

## 📋 Ejemplo

\`\`\`ruby
module StringExtensions
  refine String do
    def palindrome?
      self == reverse
    end
  end
end
\`\`\`

## 💡 Pista

Usa \`using ModuleName\` para activar refinements.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `module StringExtensions
  refine String do
    def palindrome?
      # Tu código aquí
    end
    
    def word_count
      # Tu código aquí
    end
  end
end

# Código SIN using - métodos no disponibles
begin
  "ana".palindrome?
rescue NoMethodError
  puts "Método no disponible sin 'using'"
end

# Código CON using - métodos disponibles
class TestClass
  using StringExtensions
  
  def self.test
    puts "ana".palindrome?
    puts "hello".palindrome?
    puts "Hola mundo".word_count
  end
end

TestClass.test`,
        },
        {
            title: "Concurrent Programming with Mutex",
            description: "Programación thread-safe",
            statement: `## 📝 Thread Safety con Mutex

Los Mutex protegen recursos compartidos entre threads.

## 🎯 Objetivo

Crea \`ThreadSafeCounter\` que:
- Implemente increment thread-safe
- Use Mutex para sincronización
- Permita múltiples threads incrementando

## 📋 Ejemplo

\`\`\`ruby
counter = ThreadSafeCounter.new
threads = 10.times.map do
  Thread.new { 1000.times { counter.increment } }
end
\`\`\`

## 💡 Pista

Usa \`@mutex.synchronize { ... }\` para proteger código.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `require 'thread'

class ThreadSafeCounter
  def initialize
    @count = 0
    @mutex = Mutex.new
  end
  
  def increment
    # Tu código aquí
    # Usa @mutex.synchronize
  end
  
  def value
    # Tu código aquí
    # Usa @mutex.synchronize
  end
end

# Prueba con múltiples threads
counter = ThreadSafeCounter.new

threads = 10.times.map do
  Thread.new do
    1000.times { counter.increment }
  end
end

threads.each(&:join)
puts "Contador final: #{counter.value}"
puts "Esperado: 10000"`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de Ruby creados`);
}
