import { useEffect, useRef, useState } from "react";

/**
 * Hook para ejecutar código cuando el componente está visible en el viewport
 * Útil para lazy loading de animaciones pesadas
 */
export function useIntersectionObserver(
    callback: () => void,
    options?: IntersectionObserverInit
) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
                observer.disconnect();
            }
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [callback, options]);

    return ref;
}

/**
 * Hook para debounce de valores
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook para prevenir renderizados innecesarios
 */
export function useWhyDidYouUpdate(
    name: string,
    props: Record<string, unknown>
) {
    const previousProps = useRef<Record<string, unknown> | undefined>(
        undefined
    );

    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changedProps: Record<string, { from: unknown; to: unknown }> =
                {};

            allKeys.forEach((key) => {
                if (previousProps.current![key] !== props[key]) {
                    changedProps[key] = {
                        from: previousProps.current![key],
                        to: props[key],
                    };
                }
            });

            if (Object.keys(changedProps).length) {
                console.log("[why-did-you-update]", name, changedProps);
            }
        }

        previousProps.current = props;
    });
}
