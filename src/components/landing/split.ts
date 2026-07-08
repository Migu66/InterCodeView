// Divide el texto de un elemento en letras animables (palabra a palabra
// para que el wrap nunca parta una palabra). Devuelve los spans internos.
export function splitChars(el: HTMLElement): HTMLElement[] {
    const text = el.textContent ?? "";
    el.textContent = "";
    el.setAttribute("aria-label", text);

    const chars: HTMLElement[] = [];
    const words = text.split(" ");

    words.forEach((word, w) => {
        const wordWrap = document.createElement("span");
        wordWrap.style.display = "inline-block";
        wordWrap.style.whiteSpace = "nowrap";
        wordWrap.setAttribute("aria-hidden", "true");

        for (const ch of word) {
            const wrap = document.createElement("span");
            wrap.className = "icv-ch-wrap";
            const inner = document.createElement("span");
            inner.className = "icv-ch";
            inner.textContent = ch;
            wrap.appendChild(inner);
            wordWrap.appendChild(wrap);
            chars.push(inner);
        }

        el.appendChild(wordWrap);
        if (w < words.length - 1) {
            el.appendChild(document.createTextNode(" "));
        }
    });

    return chars;
}

export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
