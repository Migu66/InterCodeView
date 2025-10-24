import { PrismaClient } from "../../src/generated/prisma";

export async function seedSQL(prisma: PrismaClient, languageId: string) {
    const exercises = [
        // ===== NIVEL FÁCIL (5 ejercicios) =====
        {
            title: "Basic SELECT",
            description: "Consultas SELECT con filtros básicos",
            statement: `## 📝 SELECT Básico en SQL

SELECT es la base de cualquier consulta SQL.

## 🎯 Objetivo

Escribe una consulta que:
- Seleccione name, email, age de la tabla users
- Filtre usuarios mayores de 18 años
- Ordene por edad descendente
- Limite a 10 resultados

## 📋 Estructura de la tabla users

\`\`\`
users
- id (INT)
- name (VARCHAR)
- email (VARCHAR)
- age (INT)
\`\`\`

## 💡 Pista

Usa WHERE para filtrar, ORDER BY para ordenar, LIMIT para limitar.`,
            difficulty: "EASY" as const,
            languageId,
            order: 1,
            starterCode: `-- Selecciona usuarios mayores de 18 años`,
        },
        {
            title: "JOINs Básicos",
            description: "INNER JOIN y LEFT JOIN",
            statement: `## 📝 JOINs en SQL

Los JOINs combinan datos de múltiples tablas.

## 🎯 Objetivo

Escribe consultas con:
- INNER JOIN para users y orders
- LEFT JOIN para incluir users sin orders
- Muestra user.name y COUNT de orders

## 📋 Tablas disponibles

\`\`\`
users: id, name, email
orders: id, user_id, total, created_at
\`\`\`

## 💡 Pista

INNER JOIN: solo coincidencias. LEFT JOIN: todos los left, nulls si no hay match.`,
            difficulty: "EASY" as const,
            languageId,
            order: 2,
            starterCode: `-- INNER JOIN: usuarios con orders


-- LEFT JOIN: todos los usuarios, con o sin orders`,
        },
        {
            title: "Aggregate Functions",
            description: "COUNT, SUM, AVG, MAX, MIN",
            statement: `## 📝 Funciones Agregadas

Las funciones agregadas resumen datos.

## 🎯 Objetivo

Usa funciones agregadas para:
- Contar total de usuarios por ciudad
- Calcular edad promedio por ciudad
- Encontrar edad máxima y mínima por ciudad
- Filtrar ciudades con más de 10 usuarios

## 📋 Estructura de la tabla users

\`\`\`
users
- id (INT)
- name (VARCHAR)
- city (VARCHAR)
- age (INT)
\`\`\`

## 💡 Pista

GROUP BY agrupa filas, HAVING filtra grupos. Funciones: COUNT(*), AVG(), MAX(), MIN().`,
            difficulty: "EASY" as const,
            languageId,
            order: 3,
            starterCode: `-- Estadísticas por ciudad`,
        },
        {
            title: "INSERT, UPDATE, DELETE",
            description: "Operaciones DML básicas",
            statement: `## 📝 DML Operations

INSERT, UPDATE, DELETE modifican datos.

## 🎯 Objetivo

Implementa:
- INSERT de nuevo usuario con name, email, age, city
- UPDATE de email de usuario con id = 1
- DELETE de usuarios inactivos (active = 0)
- Usa WHERE para UPDATE y DELETE

## 📋 Estructura de la tabla users

\`\`\`
users
- id (INT)
- name (VARCHAR)
- email (VARCHAR)
- age (INT)
- city (VARCHAR)
- active (BOOLEAN)
- updated_at (TIMESTAMP)
- last_login (DATETIME)
\`\`\`

## 💡 Pista

Siempre usa WHERE en UPDATE/DELETE para evitar modificar todas las filas.`,
            difficulty: "EASY" as const,
            languageId,
            order: 4,
            starterCode: `-- INSERT un nuevo usuario


-- UPDATE email del usuario con id = 1


-- DELETE usuarios inactivos`,
        },
        {
            title: "WHERE Clauses",
            description: "Filtros con operadores diversos",
            statement: `## 📝 WHERE Clauses

WHERE filtra filas con múltiples operadores.

## 🎯 Objetivo

Selecciona usuarios que cumplan:
- Email de gmail.com o hotmail.com (usa LIKE con '%')
- Edad entre 18 y 65 años (usa BETWEEN)
- Ciudad sea Madrid, Barcelona o Valencia (usa IN)
- No estén eliminados (deleted_at IS NULL)
- Ordena por nombre

## 📋 Estructura de la tabla users

\`\`\`
users
- name (VARCHAR)
- email (VARCHAR)
- age (INT)
- city (VARCHAR)
- deleted_at (TIMESTAMP)
\`\`\`

## 💡 Pista

% es wildcard en LIKE. Combina condiciones con AND/OR. IS NULL verifica nulos.`,
            difficulty: "EASY" as const,
            languageId,
            order: 5,
            starterCode: `-- Filtra usuarios con múltiples condiciones`,
        },

        // ===== NIVEL MEDIO (5 ejercicios) =====
        {
            title: "Subqueries",
            description: "Consultas anidadas",
            statement: `## 📝 Subqueries

Las subqueries son consultas dentro de consultas.

## 🎯 Objetivo

Crea una consulta con subqueries que:
- En SELECT: cuente órdenes por usuario y calcule promedio
- En WHERE: filtre usuarios con órdenes sobre el total promedio
- Use EXISTS para verificar existencia

## 📋 Tablas disponibles

\`\`\`
users: id, name, email
orders: id, user_id, total
\`\`\`

## 💡 Pista

Subquery correlacionada: referencia tabla externa (WHERE o.user_id = u.id). EXISTS es eficiente para verificar existencia.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 6,
            starterCode: `-- Usuarios con órdenes sobre el promedio
SELECT u.name, u.email,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as order_count,
    (SELECT AVG(total) FROM orders o WHERE o.user_id = u.id) as avg_order
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id 
    AND o.total > (SELECT AVG(total) FROM orders)
);`,
        },
        {
            title: "Window Functions",
            description: "ROW_NUMBER, RANK, DENSE_RANK",
            statement: `## 📝 Window Functions

Las funciones de ventana calculan sobre particiones de resultados.

## 🎯 Objetivo

Crea ranking de usuarios por compras en cada ciudad usando:
- ROW_NUMBER(): número de fila único
- RANK(): ranking con saltos en empates
- DENSE_RANK(): ranking sin saltos
- PARTITION BY city para agrupar por ciudad
- ORDER BY total_purchases DESC

## 📋 Estructura de la tabla users

\`\`\`
users
- name (VARCHAR)
- city (VARCHAR)
- total_purchases (DECIMAL)
\`\`\`

## 💡 Pista

OVER define la ventana. PARTITION BY agrupa, ORDER BY ordena dentro del grupo.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 7,
            starterCode: `-- Ranking de usuarios por compras en cada ciudad
SELECT 
    name,
    city,
    total_purchases,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_purchases DESC) as row_num,
    RANK() OVER (PARTITION BY city ORDER BY total_purchases DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY city ORDER BY total_purchases DESC) as dense_rank
FROM users
ORDER BY city, total_purchases DESC;`,
        },
        {
            title: "CTEs (Common Table Expressions)",
            description: "WITH clause para consultas complejas",
            statement: `## 📝 CTEs (WITH)

CTEs hacen consultas complejas más legibles.

## 🎯 Objetivo

Crea análisis de ventas con 2 CTEs:
- monthly_sales: agrupa por mes, suma total_sales y cuenta orders
- avg_sales: calcula promedio de monthly_sales
- Consulta final: muestra diferencia de cada mes vs promedio

## 📋 Estructura de la tabla orders

\`\`\`
orders
- id (INT)
- total (DECIMAL)
- created_at (DATETIME)
\`\`\`

## 💡 Pista

Puedes tener múltiples CTEs separados por comas. Usa DATE_FORMAT para agrupar por mes.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 8,
            starterCode: `-- Análisis de ventas con múltiples CTEs
WITH monthly_sales AS (
    SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        SUM(total) as total_sales,
        COUNT(*) as order_count
    FROM orders
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
),
avg_sales AS (
    SELECT AVG(total_sales) as avg_monthly_sales
    FROM monthly_sales
)
SELECT ms.*, 
    ms.total_sales - avgs.avg_monthly_sales as diff_from_avg
FROM monthly_sales ms
CROSS JOIN avg_sales avgs
ORDER BY ms.month;`,
        },
        {
            title: "Indexes and Performance",
            description: "Optimización con índices",
            statement: `## 📝 Indexes

Los índices aceleran consultas pero ralentizan inserts.

## 🎯 Objetivo

Crea índices para optimizar consultas:
- Índice simple en users.email
- Índice compuesto en users(city, age)
- Índice en orders(user_id, created_at)
- Usa EXPLAIN para verificar uso de índices

## 📋 Tablas disponibles

\`\`\`
users: id, email, city, age
orders: id, user_id, created_at
\`\`\`

## 💡 Pista

Índices útiles en WHERE, JOIN, ORDER BY. Sintaxis: CREATE INDEX nombre ON tabla(columna).`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 9,
            starterCode: `-- Crear índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_city_age ON users(city, age);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

-- Analizar plan de ejecución
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.email LIKE '%@gmail.com'
GROUP BY u.id;`,
        },
        {
            title: "Transactions",
            description: "ACID con BEGIN, COMMIT, ROLLBACK",
            statement: `## 📝 Transactions

Las transacciones garantizan ACID (Atomicity, Consistency, Isolation, Durability).

## 🎯 Objetivo

Implementa transferencia bancaria de 500.00 entre cuentas que:
- Inicie con START TRANSACTION
- Reste balance de cuenta origen (ACC001) si tiene saldo suficiente
- Sume balance a cuenta destino (ACC002)
- Registre en tabla transactions
- Termine con COMMIT

## 📋 Tablas disponibles

\`\`\`
accounts: account_id, balance, updated_at
transactions: from_account, to_account, amount, type
\`\`\`

## 💡 Pista

Sin COMMIT, los cambios no son permanentes. Todas las operaciones deben completarse o ninguna.`,
            difficulty: "MEDIUM" as const,
            languageId,
            order: 10,
            starterCode: `-- Transferencia bancaria con transacción
START TRANSACTION;

-- Restar 500.00 del origen (ACC001)
UPDATE accounts 
SET balance = balance - 500.00, updated_at = CURRENT_TIMESTAMP
WHERE account_id = 'ACC001' AND balance >= 500.00;

-- Sumar 500.00 al destino (ACC002)
UPDATE accounts 
SET balance = balance + 500.00, updated_at = CURRENT_TIMESTAMP
WHERE account_id = 'ACC002';

-- Registrar transacción
INSERT INTO transactions (from_account, to_account, amount, type)
VALUES ('ACC001', 'ACC002', 500.00, 'TRANSFER');

COMMIT;`,
        },

        // ===== NIVEL DIFÍCIL (5 ejercicios) =====
        {
            title: "SELF JOINs",
            description: "Unir tabla consigo misma",
            statement: `## 📝 SELF JOINs

SELF JOIN une una tabla consigo misma para relaciones jerárquicas.

## 🎯 Objetivo

Escribe 2 consultas:
1. Empleados que ganan más que su manager (muestra nombres y salarios)
2. Parejas de empleados en la misma ciudad (evita duplicados con e1.id < e2.id)

## 📋 Estructura de la tabla employees

\`\`\`
employees
- id (INT)
- name (VARCHAR)
- salary (DECIMAL)
- manager_id (INT) -- referencia a id de otro empleado
- city (VARCHAR)
\`\`\`

## 💡 Pista

Usa alias diferentes (e1, e2) para diferenciar las instancias. JOIN con e1.manager_id = e2.id.`,
            difficulty: "HARD" as const,
            languageId,
            order: 11,
            starterCode: `-- Empleados que ganan más que su manager
SELECT e1.name as employee, e1.salary, 
       e2.name as manager, e2.salary as manager_salary
FROM employees e1
INNER JOIN employees e2 ON e1.manager_id = e2.id
WHERE e1.salary > e2.salary;

-- Empleados en la misma ciudad (pares únicos)
SELECT e1.name as employee1, e2.name as employee2, e1.city
FROM employees e1
INNER JOIN employees e2 ON e1.city = e2.city AND e1.id < e2.id
ORDER BY e1.city, e1.name;`,
        },
        {
            title: "Pivot Tables",
            description: "Transformar filas en columnas",
            statement: `## 📝 Pivot Tables

Pivot transforma valores de filas en columnas.

## 🎯 Objetivo

Crea tabla pivot de ventas mensuales:
- Filas: product_name
- Columnas: Jan, Feb, Mar, Apr (de MONTH(sale_date))
- Valores: SUM de amount
- Añade columna Total
- Ordena por Total DESC

## 📋 Estructura de la tabla sales

\`\`\`
sales
- product_name (VARCHAR)
- sale_date (DATE)
- amount (DECIMAL)
\`\`\`

## 💡 Pista

Usa SUM(CASE WHEN MONTH(sale_date) = 1 THEN amount ELSE 0 END) para cada mes.`,
            difficulty: "HARD" as const,
            languageId,
            order: 12,
            starterCode: `-- Pivot de ventas mensuales por producto
SELECT 
    product_name,
    SUM(CASE WHEN MONTH(sale_date) = 1 THEN amount ELSE 0 END) as Jan,
    SUM(CASE WHEN MONTH(sale_date) = 2 THEN amount ELSE 0 END) as Feb,
    SUM(CASE WHEN MONTH(sale_date) = 3 THEN amount ELSE 0 END) as Mar,
    SUM(CASE WHEN MONTH(sale_date) = 4 THEN amount ELSE 0 END) as Apr,
    SUM(amount) as Total
FROM sales
GROUP BY product_name
ORDER BY Total DESC;`,
        },
        {
            title: "Recursive CTEs",
            description: "CTEs recursivas para jerarquías",
            statement: `## 📝 Recursive CTEs

CTEs recursivas procesan jerarquías y grafos.

## 🎯 Objetivo

Crea CTE recursiva employee_tree que:
- Parte base: selecciona CEOs (manager_id IS NULL) con level = 1
- Parte recursiva: une employees con employee_tree incrementando level
- Genera path concatenando nombres (' > ')
- Ordena por level y name

## 📋 Estructura de la tabla employees

\`\`\`
employees
- id (INT)
- name (VARCHAR)
- manager_id (INT) -- NULL para CEOs
\`\`\`

## 💡 Pista

Estructura: WITH RECURSIVE cte AS (base UNION ALL recursiva) SELECT * FROM cte;`,
            difficulty: "HARD" as const,
            languageId,
            order: 13,
            starterCode: `-- Jerarquía completa de empleados
WITH RECURSIVE employee_tree AS (
    -- Base: CEOs sin manager
    SELECT 
        id, 
        name, 
        manager_id, 
        1 as level,
        CAST(name as CHAR(200)) as path
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursión: empleados con manager en el árbol
    SELECT 
        e.id, 
        e.name, 
        e.manager_id, 
        et.level + 1,
        CONCAT(et.path, ' > ', e.name)
    FROM employees e
    INNER JOIN employee_tree et ON e.manager_id = et.id
)
SELECT * FROM employee_tree
ORDER BY level, name;`,
        },
        {
            title: "Query Optimization",
            description: "Optimiza consultas lentas",
            statement: `## 📝 Query Optimization

Optimiza consultas analizando EXPLAIN y refactorizando.

## 🎯 Objetivo

Se te da una consulta LENTA con subqueries correlacionadas.
Optimízala:
- Reemplaza subqueries con JOIN
- Evita SELECT *
- Usa GROUP BY con agregaciones
- Usa COALESCE para manejar NULLs

## 📋 Tablas disponibles

\`\`\`
users: id, name, email
orders: id, user_id, total
\`\`\`

## 💡 Pista

Subqueries correlacionadas son lentas. JOIN + GROUP BY es más eficiente.`,
            difficulty: "HARD" as const,
            languageId,
            order: 14,
            starterCode: `-- Consulta LENTA (sin optimizar) - NO MODIFICAR
SELECT u.*, 
    (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as order_count,
    (SELECT SUM(total) FROM orders WHERE user_id = u.id) as total_spent
FROM users u
WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = u.id);

-- Consulta OPTIMIZADA - Reemplaza subqueries con JOIN
SELECT u.id, u.name, u.email,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.total), 0) as total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;`,
        },
        {
            title: "Advanced Window Functions",
            description: "LAG, LEAD, FIRST_VALUE, LAST_VALUE",
            statement: `## 📝 Advanced Window Functions

Funciones de ventana avanzadas para análisis temporal.

## 🎯 Objetivo

Analiza tendencias de ingresos diarios usando:
- LAG: revenue del día anterior
- LEAD: revenue del día siguiente
- Calcula daily_growth (diferencia con día anterior)
- FIRST_VALUE y LAST_VALUE: primer y último revenue
- Moving average de 7 días

## 📋 Estructura de la tabla daily_revenue

\`\`\`
daily_revenue
- sale_date (DATE)
- revenue (DECIMAL)
\`\`\`

## 💡 Pista

LAG/LEAD toman offset. ROWS BETWEEN define el marco de la ventana.`,
            difficulty: "HARD" as const,
            languageId,
            order: 15,
            starterCode: `-- Análisis de tendencias de ingresos
SELECT 
    sale_date,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY sale_date) as prev_day,
    LEAD(revenue, 1) OVER (ORDER BY sale_date) as next_day,
    revenue - LAG(revenue, 1) OVER (ORDER BY sale_date) as daily_growth,
    FIRST_VALUE(revenue) OVER (ORDER BY sale_date) as first_revenue,
    LAST_VALUE(revenue) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as last_revenue,
    AVG(revenue) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7days
FROM daily_revenue
ORDER BY sale_date;`,
        },
    ];

    for (const exercise of exercises) {
        await prisma.exercise.create({ data: exercise });
    }

    console.log(`✅ ${exercises.length} ejercicios de SQL creados`);
}
