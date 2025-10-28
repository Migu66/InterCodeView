import { useEffect } from "react";

/**
 * Hook para monitorear métricas de rendimiento en producción
 * Reporta Core Web Vitals a la consola
 *
 * Nota: Requiere instalar 'web-vitals' para funcionar:
 * npm install web-vitals
 */
export function useWebVitals() {
    useEffect(() => {
        if (
            typeof window === "undefined" ||
            process.env.NODE_ENV !== "production"
        ) {
            return;
        }

        // Importar dinámicamente web-vitals solo en producción
        // @ts-expect-error - Paquete opcional
        import("web-vitals")
            .then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
                onCLS(console.log);
                onFID(console.log);
                onFCP(console.log);
                onLCP(console.log);
                onTTFB(console.log);
            })
            .catch(() => {
                // web-vitals no disponible, ignorar silenciosamente
            });
    }, []);
}

/**
 * Hook para detectar conexiones lentas
 */
export function useNetworkStatus() {
    useEffect(() => {
        if (typeof window === "undefined" || !("connection" in navigator)) {
            return;
        }

        const connection = (
            navigator as Navigator & {
                connection?: {
                    effectiveType?: string;
                    saveData?: boolean;
                };
            }
        ).connection;

        if (
            connection?.effectiveType === "slow-2g" ||
            connection?.effectiveType === "2g"
        ) {
            console.warn(
                "⚠️ Conexión lenta detectada. Algunas funcionalidades pueden ser limitadas."
            );
        }

        if (connection?.saveData) {
            console.info("ℹ️ Modo de ahorro de datos activado.");
        }
    }, []);
}

/**
 * Hook para medir el tiempo de renderizado de un componente
 */
export function useRenderTime(componentName: string) {
    useEffect(() => {
        const startTime = performance.now();

        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;

            if (process.env.NODE_ENV === "development") {
                console.log(
                    `⏱️ ${componentName} render time: ${renderTime.toFixed(2)}ms`
                );
            }
        };
    });
}
