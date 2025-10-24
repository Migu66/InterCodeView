import { PrismaClient } from "../../src/generated/prisma";

export async function seedGo(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ============================================
        // EJERCICIOS FÁCIL (EASY)
        // ============================================
        {
            title: "Goroutines Basics",
            description: "Introducción a goroutines",
            statement: `# Goroutines Básicos

## Descripción
Implementa funciones básicas usando goroutines.

## Tareas
\`\`\`go
1. Crear múltiples goroutines
2. Usar WaitGroup para sincronización
3. Comunicación con channels
4. Select statement básico
5. Buffered vs unbuffered channels
\`\`\`

## Ejemplo
\`\`\`go
go func() {
    fmt.Println("Hello from goroutine")
}()
\`\`\`

## Restricciones
- Prevenir race conditions
- Cerrar channels apropiadamente
- Usar context para cancelación

**Empresas:** Google, Uber, Docker, Dropbox`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `package main

import (
    "fmt"
    "sync"
)

func processNumbers(nums []int) []int {
    // Tu código aquí usando goroutines
    
}

func main() {
    // Tu código aquí
}`,
        },
        {
            title: "Error Handling",
            description: "Manejo de errores en Go",
            statement: `# Manejo de Errores

## Descripción
Implementa patrones correctos de manejo de errores en Go.

## Tareas
\`\`\`go
1. Crear errores custom
2. Wrapping errors
3. Error unwrapping
4. Error is/as functions
5. Defer, panic, recover
\`\`\`

## Ejemplo
\`\`\`go
if err != nil {
    return fmt.Errorf("operation failed: %w", err)
}
\`\`\`

## Restricciones
- No ignorar errores
- Proporcionar contexto en errores
- Usar errores sentinel apropiadamente

**Empresas:** Google, Uber, HashiCorp`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `package main

import (
    "errors"
    "fmt"
)

type CustomError struct {
    Code    int
    Message string
}

func (e *CustomError) Error() string {
    // Tu código aquí
    
}

func divide(a, b float64) (float64, error) {
    // Tu código aquí
    
}`,
        },
        {
            title: "Slices and Arrays",
            description: "Trabajar con slices y arrays",
            statement: `# Slices y Arrays

## Descripción
Implementa operaciones comunes con slices y arrays.

## Tareas
\`\`\`go
1. Crear y manipular slices
2. Append y copy operations
3. Slicing operations
4. Capacity vs length
5. Multi-dimensional slices
\`\`\`

## Ejemplo
\`\`\`go
nums := []int{1, 2, 3}
nums = append(nums, 4, 5)
subset := nums[1:3] // [2, 3]
\`\`\`

## Restricciones
- Entender slice internals
- Evitar memory leaks con slices
- Usar make apropiadamente

**Empresas:** Google, Uber, Docker`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `package main

func removeDuplicates(nums []int) []int {
    // Tu código aquí
    
}

func reverseSlice(nums []int) []int {
    // Tu código aquí
    
}

func main() {
    // Tu código aquí
}`,
        },
        {
            title: "Maps and Structs",
            description: "Trabajar con maps y structs",
            statement: `# Maps y Structs

## Descripción
Implementa operaciones con maps y structs en Go.

## Tareas
\`\`\`go
1. Crear y manipular maps
2. Check if key exists
3. Structs con métodos
4. Struct embedding
5. JSON marshaling/unmarshaling
\`\`\`

## Ejemplo
\`\`\`go
type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return "Hello, " + p.Name
}
\`\`\`

## Restricciones
- Maps no son thread-safe
- Usar sync.Map cuando sea necesario
- Struct tags para JSON

**Empresas:** Google, Uber, HashiCorp`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `package main

import "encoding/json"

type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age"\`
}

func countWords(text string) map[string]int {
    // Tu código aquí
    
}

func (u User) IsAdult() bool {
    // Tu código aquí
    
}`,
        },
        {
            title: "Interfaces",
            description: "Implementar y usar interfaces",
            statement: `# Interfaces

## Descripción
Trabaja con interfaces en Go.

## Tareas
\`\`\`go
1. Definir interfaces
2. Implementar interfaces implícitamente
3. Empty interface
4. Type assertions
5. Type switches
\`\`\`

## Ejemplo
\`\`\`go
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}
\`\`\`

## Restricciones
- Interfaces pequeñas son mejores
- Aceptar interfaces, devolver structs
- Usar type assertions con cuidado

**Empresas:** Google, Uber, Docker, Kubernetes`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `package main

import "math"

type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

type Rectangle struct {
    Width, Height float64
}

// Tu código aquí: implementar métodos Area()

func totalArea(shapes []Shape) float64 {
    // Tu código aquí
    
}`,
        },

        // ============================================
        // EJERCICIOS MEDIO (MEDIUM)
        // ============================================
        {
            title: "Context Package",
            description: "Usar context para cancelación y timeouts",
            statement: `# Context Package

## Descripción
Implementa patrones correctos usando el package context.

## Tareas
\`\`\`go
1. Context with cancel
2. Context with timeout
3. Context with deadline
4. Context values
5. Propagación de context
\`\`\`

## Ejemplo
\`\`\`go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

result, err := doWork(ctx)
\`\`\`

## Restricciones
- Siempre pasar context como primer parámetro
- No almacenar context en structs
- Llamar cancel function

**Empresas:** Google, Uber, HashiCorp, Kubernetes`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `package main

import (
    "context"
    "time"
)

func fetchDataWithTimeout(ctx context.Context, url string) (string, error) {
    // Tu código aquí
    
}

func processWithCancel(ctx context.Context, data []int) ([]int, error) {
    // Tu código aquí
    
}`,
        },
        {
            title: "Worker Pool",
            description: "Implementar worker pool pattern",
            statement: `# Worker Pool

## Descripción
Implementa un worker pool para procesar tareas concurrentemente.

## Componentes
\`\`\`go
1. Job queue (channel)
2. Worker goroutines
3. Result collection
4. Graceful shutdown
5. Error handling
\`\`\`

## Ejemplo
\`\`\`go
pool := NewWorkerPool(10)
pool.Submit(job1)
pool.Submit(job2)
results := pool.Wait()
\`\`\`

## Restricciones
- Limitar número de workers
- Cerrar channels apropiadamente
- Manejar panics en workers

**Empresas:** Google, Uber, Docker, Dropbox`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `package main

import "sync"

type Job struct {
    ID   int
    Data interface{}
}

type Result struct {
    Job   Job
    Value interface{}
    Error error
}

type WorkerPool struct {
    // Tu código aquí
    
}

func NewWorkerPool(numWorkers int) *WorkerPool {
    // Tu código aquí
    
}

func (p *WorkerPool) Submit(job Job) {
    // Tu código aquí
    
}

func (p *WorkerPool) Results() <-chan Result {
    // Tu código aquí
    
}`,
        },
        {
            title: "HTTP Server with Middleware",
            description: "Crear servidor HTTP con middleware",
            statement: `# HTTP Server con Middleware

## Descripción
Implementa un servidor HTTP con sistema de middleware.

## Componentes
\`\`\`go
1. Basic HTTP handlers
2. Middleware chain
3. Logging middleware
4. Authentication middleware
5. Error handling middleware
\`\`\`

## Ejemplo
\`\`\`go
server := NewServer()
server.Use(loggingMiddleware)
server.Use(authMiddleware)
server.HandleFunc("/api/users", getUsers)
\`\`\`

## Restricciones
- Composición de middleware
- Request context
- Response writer wrapping

**Empresas:** Google, Uber, Stripe, GitHub`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `package main

import (
    "net/http"
    "time"
)

type Middleware func(http.HandlerFunc) http.HandlerFunc

func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    // Tu código aquí
    
}

func timeoutMiddleware(timeout time.Duration) Middleware {
    // Tu código aquí
    
}

func chainMiddleware(h http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
    // Tu código aquí
    
}`,
        },
        {
            title: "Generic Data Structures",
            description: "Implementar estructuras de datos con generics",
            statement: `# Estructuras de Datos con Generics

## Descripción
Usa Go generics para implementar estructuras de datos type-safe.

## Estructuras
\`\`\`go
1. Stack[T]
2. Queue[T]
3. LinkedList[T]
4. BinaryTree[T]
5. HashMap[K, V]
\`\`\`

## Ejemplo
\`\`\`go
stack := NewStack[int]()
stack.Push(1)
stack.Push(2)
val := stack.Pop() // 2
\`\`\`

## Restricciones
- Usar type parameters
- Constraints apropiados
- Thread-safety opcional

**Empresas:** Google, Uber, HashiCorp`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `package main

type Stack[T any] struct {
    // Tu código aquí
    
}

func NewStack[T any]() *Stack[T] {
    // Tu código aquí
    
}

func (s *Stack[T]) Push(value T) {
    // Tu código aquí
    
}

func (s *Stack[T]) Pop() (T, bool) {
    // Tu código aquí
    
}

type Queue[T any] struct {
    // Tu código aquí
    
}

// Implementar métodos de Queue`,
        },
        {
            title: "Database Connection Pool",
            description: "Implementar connection pool para base de datos",
            statement: `# Database Connection Pool

## Descripción
Crea un connection pool para gestionar conexiones a base de datos.

## Funcionalidades
\`\`\`go
1. Acquire connection
2. Release connection
3. Connection validation
4. Max connections limit
5. Idle timeout
\`\`\`

## Características
- Connection reuse
- Health checks
- Graceful shutdown
- Metrics (active, idle connections)

## Restricciones
- Thread-safe
- Timeout en acquire
- Limpieza de idle connections

**Empresas:** Google, Uber, Stripe, Shopify`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `package main

import (
    "context"
    "database/sql"
    "time"
)

type ConnectionPool struct {
    // Tu código aquí
    
}

func NewConnectionPool(maxSize int, connString string) (*ConnectionPool, error) {
    // Tu código aquí
    
}

func (p *ConnectionPool) Acquire(ctx context.Context) (*sql.Conn, error) {
    // Tu código aquí
    
}

func (p *ConnectionPool) Release(conn *sql.Conn) error {
    // Tu código aquí
    
}

func (p *ConnectionPool) Close() error {
    // Tu código aquí
    
}`,
        },

        // ============================================
        // EJERCICIOS DIFÍCIL (HARD)
        // ============================================
        {
            title: "Distributed Lock",
            description: "Implementar distributed lock con Redis",
            statement: `# Distributed Lock

## Descripción
Implementa un sistema de locks distribuidos usando Redis.

## Funcionalidades
\`\`\`go
1. Acquire lock con timeout
2. Release lock
3. Lock renewal (keepalive)
4. Deadlock prevention
5. Reentrant locks
\`\`\`

## Algoritmo
- Usar Redlock algorithm
- Múltiples Redis instances
- Clock drift handling
- Automatic release on timeout

## Restricciones
- Garantizar mutual exclusion
- Liveness property
- Fault tolerance

**Empresas:** Google, Uber, Redis, Stripe`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `package main

import (
    "context"
    "time"
)

type DistributedLock struct {
    // Tu código aquí
    
}

func NewDistributedLock(redisAddrs []string, key string) *DistributedLock {
    // Tu código aquí
    
}

func (l *DistributedLock) Lock(ctx context.Context, ttl time.Duration) error {
    // Tu código aquí
    
}

func (l *DistributedLock) Unlock(ctx context.Context) error {
    // Tu código aquí
    
}

func (l *DistributedLock) Extend(ctx context.Context, ttl time.Duration) error {
    // Tu código aquí
    
}`,
        },
        {
            title: "Rate Limiter",
            description: "Implementar rate limiter con múltiples algoritmos",
            statement: `# Rate Limiter

## Descripción
Implementa diferentes algoritmos de rate limiting.

## Algoritmos
\`\`\`go
1. Token Bucket
2. Leaky Bucket
3. Fixed Window
4. Sliding Window Log
5. Sliding Window Counter
\`\`\`

## Ejemplo
\`\`\`go
limiter := NewTokenBucket(100, 10) // 100 tokens, 10/sec refill
if limiter.Allow() {
    // Process request
}
\`\`\`

## Restricciones
- Thread-safe
- Memory efficient
- Distributed option (con Redis)

**Empresas:** Google, Uber, Stripe, Cloudflare`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `package main

import (
    "sync"
    "time"
)

type TokenBucket struct {
    capacity  int
    tokens    float64
    refillRate float64
    lastRefill time.Time
    mu        sync.Mutex
}

func NewTokenBucket(capacity int, refillRate float64) *TokenBucket {
    // Tu código aquí
    
}

func (tb *TokenBucket) Allow() bool {
    // Tu código aquí
    
}

type SlidingWindowLimiter struct {
    // Tu código aquí
    
}

// Implementar otros rate limiters`,
        },
        {
            title: "Circuit Breaker",
            description: "Implementar circuit breaker pattern",
            statement: `# Circuit Breaker

## Descripción
Implementa el patrón Circuit Breaker para resiliencia.

## Estados
\`\`\`go
1. Closed: normal operation
2. Open: failing, reject requests
3. Half-Open: test if recovered
\`\`\`

## Funcionalidades
- Failure threshold
- Timeout
- Success threshold para recovery
- Metrics (success/failure rate)
- Fallback function

## Ejemplo
\`\`\`go
cb := NewCircuitBreaker(5, 10*time.Second)
result, err := cb.Call(func() (interface{}, error) {
    return externalServiceCall()
})
\`\`\`

## Restricciones
- Thread-safe
- Configurable thresholds
- Metrics collection

**Empresas:** Google, Netflix, Uber, Amazon`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `package main

import (
    "context"
    "sync"
    "time"
)

type State int

const (
    StateClosed State = iota
    StateOpen
    StateHalfOpen
)

type CircuitBreaker struct {
    maxFailures  int
    timeout      time.Duration
    state        State
    failures     int
    lastFailTime time.Time
    mu           sync.RWMutex
}

func NewCircuitBreaker(maxFailures int, timeout time.Duration) *CircuitBreaker {
    // Tu código aquí
    
}

func (cb *CircuitBreaker) Call(fn func() (interface{}, error)) (interface{}, error) {
    // Tu código aquí
    
}`,
        },
        {
            title: "Memory-Efficient Cache",
            description: "Implementar cache con eviction policies",
            statement: `# Cache con Eviction Policies

## Descripción
Implementa un cache in-memory con múltiples políticas de eviction.

## Políticas
\`\`\`go
1. LRU (Least Recently Used)
2. LFU (Least Frequently Used)
3. TTL (Time To Live)
4. FIFO (First In First Out)
5. Adaptive Replacement Cache (ARC)
\`\`\`

## Funcionalidades
- Get/Set operations O(1)
- Thread-safe
- Memory limit
- Statistics
- Callback on eviction

## Restricciones
- Minimizar memory overhead
- Lock-free reads (opcional)
- Serialización para persistencia

**Empresas:** Google, Redis, Memcached, Amazon`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `package main

import (
    "container/list"
    "sync"
    "time"
)

type CacheItem struct {
    Key        string
    Value      interface{}
    Expiration time.Time
    Frequency  int
}

type LRUCache struct {
    capacity int
    items    map[string]*list.Element
    lru      *list.List
    mu       sync.RWMutex
}

func NewLRUCache(capacity int) *LRUCache {
    // Tu código aquí
    
}

func (c *LRUCache) Get(key string) (interface{}, bool) {
    // Tu código aquí
    
}

func (c *LRUCache) Set(key string, value interface{}) {
    // Tu código aquí
    
}

type LFUCache struct {
    // Tu código aquí: implementar LFU
    
}`,
        },
        {
            title: "gRPC Service with Interceptors",
            description: "Implementar servicio gRPC con interceptors",
            statement: `# Servicio gRPC con Interceptors

## Descripción
Crea un servicio gRPC completo con interceptors para logging, autenticación, etc.

## Componentes
\`\`\`proto
1. Definir proto file
2. Implementar service
3. Unary interceptors
4. Stream interceptors
5. Error handling
\`\`\`

## Interceptors
- Logging interceptor
- Authentication interceptor
- Rate limiting interceptor
- Metrics interceptor
- Recovery interceptor

## Ejemplo
\`\`\`go
server := grpc.NewServer(
    grpc.UnaryInterceptor(loggingInterceptor),
    grpc.StreamInterceptor(streamLoggingInterceptor),
)
\`\`\`

## Restricciones
- Implementar proto definitions
- Context propagation
- Graceful shutdown
- Connection pooling en client

**Empresas:** Google, Uber, Netflix, Spotify`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `package main

import (
    "context"
    "google.golang.org/grpc"
    "log"
    "time"
)

func loggingUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    // Tu código aquí
    
}

func authUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    // Tu código aquí
    
}

// Service implementation
type UserService struct {
    // Tu código aquí
    
}

func (s *UserService) GetUser(ctx context.Context, req *GetUserRequest) (*User, error) {
    // Tu código aquí
    
}`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log("✅ 15 ejercicios de Go creados");
}
