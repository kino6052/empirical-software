import { h, type Props, type Child } from "./h";
import { css } from "./css";

export function Button(text: string, props: Props = {}): HTMLElement {
  css(`
    .btn {
      display: inline-block;
      padding: 0.6rem 1.4rem;
      background: var(--fg);
      color: var(--bg);
      border: none;
      border-radius: var(--radius);
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.8; }
  `);
  return h("button", { class: "btn", ...props }, [text]);
}

export function Link(text: string, page: string, props: Props = {}): HTMLElement {
  css(`
    .link {
      color: var(--fg);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `);
  return h("a", { href: "#", class: "link", "data-page": page, ...props }, [text]);
}

export function Section(children: Child[], props: Props = {}): HTMLElement {
  return h("section", { class: "section", ...props }, children);
}

export function Container(children: Child[], props: Props = {}): HTMLElement {
  return h("div", { class: "container", ...props }, children);
}

export function Card(children: Child[], props: Props = {}): HTMLElement {
  css(`
    .card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--space);
    }
  `);
  return h("div", { class: "card", ...props }, children);
}

export function Heading(level: 1 | 2 | 3 | 4, text: string, props: Props = {}): HTMLElement {
  return h(`h${level}`, props, [text]);
}

export function Text(content: string, props: Props = {}): HTMLElement {
  css(`
    .text {
      color: var(--muted);
      margin-bottom: var(--space);
    }
  `);
  return h("p", { class: "text", ...props }, [content]);
}

export function List(items: Child[], props: Props = {}): HTMLElement {
  return h(
    "ul",
    { class: "list", ...props },
    items.map((item) =>
      typeof item === "string" ? h("li", {}, [item]) : h("li", {}, [item])
    )
  );
}

export function Nav(links: { text: string; page: string }[]): HTMLElement {
  css(`
    .nav {
      display: flex;
      gap: 1rem;
      padding: var(--space);
      border-bottom: 1px solid var(--border);
      max-width: var(--max-w);
      width: 100%;
      margin: 0 auto;
    }
    .nav a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    .nav a:hover, .nav a.active {
      color: var(--fg);
    }
  `);
  return h(
    "nav",
    { class: "nav" },
    links.map((link) => Link(link.text, link.page))
  );
}

export function Badge(emoji: string, label: string): HTMLElement {
  css(`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }
    .badge-emoji { font-size: 1.3rem; }
    .badge-label { font-weight: 600; font-size: 0.95rem; }
  `);
  return h("span", { class: "badge" }, [
    h("span", { class: "badge-emoji" }, [emoji]),
    h("span", { class: "badge-label" }, [label]),
  ]);
}

export function Divider(): HTMLElement {
  css(`
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: calc(var(--space) * 1.5) 0;
    }
  `);
  return h("hr", { class: "divider" });
}

export function Input(props: Props = {}): HTMLElement {
  css(`
    .input {
      flex: 1;
      padding: 0.6rem 0.8rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
    }
    .input:focus {
      border-color: var(--fg);
    }
  `);
  return h("input", { class: "input", ...props });
}

export function Grid(children: Child[]): HTMLElement {
  css(`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space);
      margin-top: var(--space);
    }
  `);
  return h("div", { class: "grid" }, children);
}
