"use client";

import { useEffect, useRef } from "react";

// Cursor retícula: crosshair que se convierte en anillo con etiqueta
// sobre elementos interactivos. Seguimiento con lerp en rAF (solo transform).
export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const cursor = cursorRef.current;
        const label = labelRef.current;
        if (!cursor || !label) return;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;
        let raf = 0;
        let visible = false;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!visible) {
                visible = true;
                cursor.style.opacity = "1";
            }

            const target = (e.target as HTMLElement).closest<HTMLElement>(
                "a, button, [data-cursor]"
            );
            if (target) {
                cursor.dataset.state = "link";
                label.textContent =
                    target.dataset.cursorLabel ?? "IR";
            } else {
                cursor.dataset.state = "idle";
            }
        };

        const onLeave = () => {
            visible = false;
            cursor.style.opacity = "0";
        };

        const tick = () => {
            x += (tx - x) * 0.22;
            y += (ty - y) * 0.22;
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="icv-cursor"
            data-state="idle"
            style={{ opacity: 0 }}
            aria-hidden="true"
        >
            <span className="icv-cursor__ring" />
            <span className="icv-cursor__h" />
            <span className="icv-cursor__v" />
            <span className="icv-cursor__dot" />
            <span ref={labelRef} className="icv-cursor__label">
                IR
            </span>
        </div>
    );
}
