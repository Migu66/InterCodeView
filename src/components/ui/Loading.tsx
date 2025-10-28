/**
 * Componente de loading optimizado con Suspense boundary
 * Usa content-visibility para mejor rendimiento
 */
export function OptimizedLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black content-visibility-auto">
            <div className="text-center gpu-accelerate">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm font-smooth">Cargando...</p>
            </div>
        </div>
    );
}

/**
 * Skeleton loader optimizado
 */
export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-800 rounded contain-paint ${className}`}
            aria-hidden="true"
        />
    );
}
