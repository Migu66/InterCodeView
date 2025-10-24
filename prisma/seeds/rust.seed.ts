import { PrismaClient } from "../../src/generated/prisma";

export async function seedRust(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ============================================
        // EJERCICIOS FÁCIL (EASY)
        // ============================================
        {
            title: "Ownership Basics",
            description: "Entender ownership y borrowing",
            statement: `# Ownership y Borrowing

## Descripción
Practica los conceptos fundamentales de ownership en Rust.

## Tareas
\`\`\`rust
1. Move semantics
2. Borrowing (&T y &mut T)
3. Referencias inmutables y mutables
4. Scope y lifetime básico
5. Clone vs Copy
\`\`\`

## Ejemplo
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 moved to s2
// println!("{}", s1); // Error!
\`\`\`

## Restricciones
- No usar clone innecesariamente
- Entender reglas de borrowing
- Lifetime elision

**Empresas:** Mozilla, Amazon, Microsoft, Dropbox`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `fn main() {
    // Tu código aquí
}

fn calculate_length(s: &String) -> usize {
    // Tu código aquí
    
}

fn change(s: &mut String) {
    // Tu código aquí
    
}`,
        },
        {
            title: "Option and Result",
            description: "Manejo de errores con Option y Result",
            statement: `# Option y Result

## Descripción
Usa Option<T> y Result<T, E> para manejo seguro de errores.

## Tareas
\`\`\`rust
1. Pattern matching con Option
2. unwrap, expect, unwrap_or
3. Result con ? operator
4. map, and_then, or_else
5. Custom error types
\`\`\`

## Ejemplo
\`\`\`rust
fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}
\`\`\`

## Restricciones
- No usar panic! en producción
- Propagar errores con ?
- Mensajes descriptivos con expect

**Empresas:** Mozilla, Amazon, Discord, Cloudflare`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    // Tu código aquí
    
}

fn find_item<T: PartialEq>(items: &[T], target: &T) -> Option<usize> {
    // Tu código aquí
    
}

fn main() {
    // Tu código aquí
}`,
        },
        {
            title: "Vectors and Slices",
            description: "Trabajar con Vec<T> y slices",
            statement: `# Vectores y Slices

## Descripción
Manipula colecciones usando Vec<T> y slices.

## Tareas
\`\`\`rust
1. Crear y modificar vectors
2. Push, pop, insert, remove
3. Slicing [start..end]
4. Iteradores
5. Filter, map, collect
\`\`\`

## Ejemplo
\`\`\`rust
let mut v = vec![1, 2, 3];
v.push(4);
let slice = &v[1..3]; // [2, 3]
\`\`\`

## Restricciones
- Ownership de elements
- Borrowing rules con slices
- Uso eficiente de iteradores

**Empresas:** Mozilla, Amazon, Dropbox`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `fn remove_duplicates(nums: &mut Vec<i32>) -> usize {
    // Tu código aquí
    
}

fn reverse_vec<T: Clone>(v: &[T]) -> Vec<T> {
    // Tu código aquí
    
}

fn main() {
    // Tu código aquí
}`,
        },
        {
            title: "Structs and Enums",
            description: "Definir y usar structs y enums",
            statement: `# Structs y Enums

## Descripción
Crea tipos de datos custom con structs y enums.

## Tareas
\`\`\`rust
1. Struct definition y implementation
2. Associated functions
3. Enum con datos
4. Pattern matching exhaustivo
5. Método dispatch
\`\`\`

## Ejemplo
\`\`\`rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
\`\`\`

## Restricciones
- Implementar Display trait
- Derivar traits comunes
- Pattern matching exhaustivo

**Empresas:** Mozilla, Amazon, Discord`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn process(&self) {
        // Tu código aquí
        
    }
}

struct User {
    username: String,
    email: String,
    active: bool,
}

impl User {
    // Tu código aquí
}`,
        },
        {
            title: "String Manipulation",
            description: "Trabajar con String y &str",
            statement: `# String y &str

## Descripción
Manipula strings en Rust correctamente.

## Tareas
\`\`\`rust
1. String vs &str
2. String concatenation
3. String slicing (UTF-8 safe)
4. chars() vs bytes()
5. String formatting
\`\`\`

## Ejemplo
\`\`\`rust
let s = String::from("hello");
let slice: &str = &s[0..2]; // "he"
let s2 = format!("{} world", s);
\`\`\`

## Restricciones
- UTF-8 encoding awareness
- No usar indexing directo
- Usar métodos seguros

**Empresas:** Mozilla, Dropbox, Cloudflare`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `fn is_palindrome(s: &str) -> bool {
    // Tu código aquí
    
}

fn reverse_words(s: &str) -> String {
    // Tu código aquí
    
}

fn count_chars(s: &str) -> usize {
    // Tu código aquí (considerar UTF-8)
    
}`,
        },

        // ============================================
        // EJERCICIOS MEDIO (MEDIUM)
        // ============================================
        {
            title: "Lifetimes",
            description: "Trabajar con lifetimes explícitos",
            statement: `# Lifetimes

## Descripción
Usa lifetimes para garantizar referencias válidas.

## Conceptos
\`\`\`rust
1. Lifetime annotations
2. Lifetime elision rules
3. 'static lifetime
4. Struct lifetimes
5. Multiple lifetimes
\`\`\`

## Ejemplo
\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

## Restricciones
- Entender borrow checker
- Minimizar anotaciones
- Lifetime bounds en generics

**Empresas:** Mozilla, Amazon, Cloudflare, Discord`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        // Tu código aquí
        
    }
}

fn first_word<'a>(s: &'a str) -> &'a str {
    // Tu código aquí
    
}`,
        },
        {
            title: "Trait System",
            description: "Implementar y usar traits",
            statement: `# Sistema de Traits

## Descripción
Usa traits para polimorfismo y código genérico.

## Características
\`\`\`rust
1. Trait definition y implementation
2. Default implementations
3. Trait bounds
4. Associated types
5. Operator overloading
\`\`\`

## Ejemplo
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String;
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}: {}", self.headline, self.author)
    }
}
\`\`\`

## Restricciones
- Orphan rule
- Coherence rules
- Trait objects vs generics

**Empresas:** Mozilla, Amazon, Discord, Cloudflare`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `trait Drawable {
    fn draw(&self);
}

trait Clickable {
    fn click(&self);
}

struct Button {
    label: String,
}

// Tu código aquí: implementar traits

fn draw_multiple<T: Drawable>(items: &[T]) {
    // Tu código aquí
    
}`,
        },
        {
            title: "Smart Pointers",
            description: "Usar Box, Rc, Arc, RefCell",
            statement: `# Smart Pointers

## Descripción
Trabaja con diferentes tipos de smart pointers.

## Tipos
\`\`\`rust
1. Box<T> - heap allocation
2. Rc<T> - reference counting
3. Arc<T> - atomic reference counting
4. RefCell<T> - interior mutability
5. Weak<T> - weak references
\`\`\`

## Ejemplo
\`\`\`rust
let b = Box::new(5);
let rc = Rc::new(vec![1, 2, 3]);
let rc_clone = Rc::clone(&rc);
\`\`\`

## Restricciones
- Evitar reference cycles
- Usar apropiadamente según contexto
- Thread-safety con Arc

**Empresas:** Mozilla, Amazon, Dropbox, Discord`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
}

fn create_list() -> Rc<RefCell<Node>> {
    // Tu código aquí
    
}

// Implementar lista enlazada con Rc<RefCell<T>>`,
        },
        {
            title: "Concurrency",
            description: "Programación concurrente segura",
            statement: `# Concurrencia

## Descripción
Implementa programas concurrentes usando threads y channels.

## Características
\`\`\`rust
1. thread::spawn
2. mpsc channels
3. Mutex<T> y Arc<Mutex<T>>
4. RwLock<T>
5. Send y Sync traits
\`\`\`

## Ejemplo
\`\`\`rust
use std::thread;
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send(42).unwrap();
});
let received = rx.recv().unwrap();
\`\`\`

## Restricciones
- Data race prevention
- Deadlock avoidance
- Thread safety guarantees

**Empresas:** Mozilla, Amazon, Dropbox, Discord, Cloudflare`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn parallel_sum(nums: Vec<i32>) -> i32 {
    // Tu código aquí: calcular suma en paralelo
    
}

fn producer_consumer() {
    // Tu código aquí: implementar patrón productor-consumidor
    
}`,
        },
        {
            title: "Error Handling with Custom Types",
            description: "Sistema de errores robusto",
            statement: `# Manejo de Errores Avanzado

## Descripción
Crea un sistema de errores custom robusto.

## Componentes
\`\`\`rust
1. Custom error enum
2. From trait implementation
3. Error trait implementation
4. Error context
5. Result type alias
\`\`\`

## Ejemplo
\`\`\`rust
#[derive(Debug)]
enum MyError {
    Io(std::io::Error),
    Parse(std::num::ParseIntError),
    Custom(String),
}

impl From<std::io::Error> for MyError {
    fn from(err: std::io::Error) -> Self {
        MyError::Io(err)
    }
}
\`\`\`

## Restricciones
- Implementar Display y Error traits
- Error propagation con ?
- Mensajes descriptivos

**Empresas:** Mozilla, Amazon, Cloudflare`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `use std::fmt;
use std::error::Error;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    InvalidInput(String),
    Internal(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Tu código aquí
        
    }
}

impl Error for AppError {}

type Result<T> = std::result::Result<T, AppError>;

fn process_data(input: &str) -> Result<i32> {
    // Tu código aquí
    
}`,
        },

        // ============================================
        // EJERCICIOS DIFÍCIL (HARD)
        // ============================================
        {
            title: "Unsafe Rust",
            description: "Usar unsafe correctamente",
            statement: `# Unsafe Rust

## Descripción
Usa unsafe Rust para optimizaciones de bajo nivel manteniendo seguridad.

## Características
\`\`\`rust
1. Raw pointers
2. Unsafe functions
3. FFI (Foreign Function Interface)
4. Union types
5. Inline assembly (opcional)
\`\`\`

## Ejemplo
\`\`\`rust
unsafe {
    let mut num = 5;
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    *r2 = 10;
}
\`\`\`

## Restricciones
- Encapsular unsafe en APIs seguras
- Documentar invariantes
- Minimizar unsafe code

**Empresas:** Mozilla, System76, Oxide Computer`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `// Implementar Vec<T> desde cero usando unsafe
use std::alloc::{alloc, dealloc, Layout};
use std::ptr;

pub struct MyVec<T> {
    ptr: *mut T,
    len: usize,
    cap: usize,
}

impl<T> MyVec<T> {
    pub fn new() -> Self {
        // Tu código aquí
        
    }
    
    pub fn push(&mut self, elem: T) {
        // Tu código aquí
        
    }
    
    pub fn pop(&mut self) -> Option<T> {
        // Tu código aquí
        
    }
}

impl<T> Drop for MyVec<T> {
    fn drop(&mut self) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Async/Await",
            description: "Programación asíncrona con async/await",
            statement: `# Async/Await

## Descripción
Implementa código asíncrono usando async/await y Tokio.

## Características
\`\`\`rust
1. async fn
2. .await syntax
3. tokio runtime
4. Futures trait
5. async streams
\`\`\`

## Ejemplo
\`\`\`rust
async fn fetch_data(url: &str) -> Result<String, Error> {
    let resp = reqwest::get(url).await?;
    resp.text().await
}
\`\`\`

## Restricciones
- Evitar blocking en async context
- Usar tokio::spawn apropiadamente
- Cancelación con select!

**Empresas:** Discord, Cloudflare, Amazon, Mozilla`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `use tokio::time::{sleep, Duration};
use std::future::Future;

async fn timeout<F, T>(future: F, duration: Duration) -> Result<T, &'static str>
where
    F: Future<Output = T>,
{
    // Tu código aquí: implementar timeout
    
}

async fn fetch_parallel(urls: Vec<String>) -> Vec<Result<String, String>> {
    // Tu código aquí: fetch múltiples URLs en paralelo
    
}`,
        },
        {
            title: "Procedural Macros",
            description: "Crear macros procedurales",
            statement: `# Macros Procedurales

## Descripción
Implementa macros procedurales para code generation.

## Tipos
\`\`\`rust
1. Derive macros
2. Attribute macros
3. Function-like macros
4. Token parsing
5. Code generation
\`\`\`

## Ejemplo
\`\`\`rust
#[derive(Builder)]
struct User {
    name: String,
    age: u32,
}

// Genera:
let user = UserBuilder::new()
    .name("Alice".to_string())
    .age(30)
    .build();
\`\`\`

## Restricciones
- Usar syn y quote crates
- Error handling en macros
- Hygiene

**Empresas:** Mozilla, Parity Technologies, Dropbox`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `// En un crate separado proc-macro = true
use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(Builder)]
pub fn derive_builder(input: TokenStream) -> TokenStream {
    // Tu código aquí
    
}`,
        },
        {
            title: "Memory Allocator",
            description: "Implementar un allocator custom",
            statement: `# Allocator Custom

## Descripción
Implementa un memory allocator custom usando GlobalAlloc trait.

## Estrategias
\`\`\`rust
1. Bump allocator
2. Free list
3. Slab allocator
4. Arena allocator
5. Thread-local allocation
\`\`\`

## Ejemplo
\`\`\`rust
#[global_allocator]
static ALLOCATOR: MyAllocator = MyAllocator;

struct MyAllocator;

unsafe impl GlobalAlloc for MyAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        // implementación
    }
}
\`\`\`

## Restricciones
- Thread-safe
- Performance critical
- Minimizar fragmentación

**Empresas:** Mozilla, System76, Oxide Computer`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `use std::alloc::{GlobalAlloc, Layout};
use std::ptr;

struct BumpAllocator {
    // Tu código aquí
    
}

unsafe impl GlobalAlloc for BumpAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        // Tu código aquí
        
    }
    
    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        // Tu código aquí
        
    }
}`,
        },
        {
            title: "Zero-Cost Abstractions",
            description: "Optimizaciones con zero-cost abstractions",
            statement: `# Zero-Cost Abstractions

## Descripción
Implementa abstracciones que compilan a código óptimo.

## Técnicas
\`\`\`rust
1. Inline annotations
2. Const generics
3. Type-level programming
4. Iterator combinators
5. SIMD optimizations
\`\`\`

## Ejemplo
\`\`\`rust
#[inline(always)]
fn fast_operation<const N: usize>(data: &[i32; N]) -> i32 {
    data.iter().sum()
}
\`\`\`

## Optimizaciones
- Eliminar bounds checks
- Vectorización automática
- Monomorphization
- Dead code elimination

## Restricciones
- Medir con benchmarks
- Profile-guided optimization
- No sacrificar legibilidad sin razón

**Empresas:** Mozilla, System76, Oxide Computer, Discord`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `// Implementar operaciones SIMD-friendly
use std::arch::x86_64::*;

#[inline(always)]
fn sum_simd(data: &[f32]) -> f32 {
    // Tu código aquí: usar SIMD si está disponible
    
}

// Implementar estructura con const generics
struct Matrix<T, const ROWS: usize, const COLS: usize> {
    data: [[T; COLS]; ROWS],
}

impl<T, const ROWS: usize, const COLS: usize> Matrix<T, ROWS, COLS> {
    // Tu código aquí
}`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({
            data: exercise,
        });
    }

    console.log("✅ 15 ejercicios de Rust creados");
}
