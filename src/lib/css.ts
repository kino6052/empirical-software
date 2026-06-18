const registered = new Set<string>();
let styleEl: HTMLStyleElement | null = null;

export function css(style: string): void {
  if (registered.has(style)) return;
  registered.add(style);
  if (!styleEl) {
    styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
  }
  styleEl.textContent += style + "\n";
}
