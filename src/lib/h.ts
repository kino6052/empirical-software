import type { Signal } from "./state";

export type Props = Record<string, string | boolean | EventListener>;
export type Child = HTMLElement | string | Signal<string>;

function isSignal(v: unknown): v is Signal<string> {
  return v !== null && typeof v === "object" && "get" in v && "sub" in v;
}

export function h(
  tag: string,
  props: Props = {},
  children: Child[] = []
): HTMLElement {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else if (typeof value === "boolean") {
      if (value) el.setAttribute(key, "");
    } else {
      el.setAttribute(key, value as string);
    }
  }

  for (const child of children) {
    if (isSignal(child)) {
      const node = document.createTextNode(child.get());
      child.sub((v) => { node.textContent = v; });
      el.appendChild(node);
    } else if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }

  return el;
}
