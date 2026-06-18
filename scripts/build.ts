import { readFileSync, writeFileSync, mkdirSync } from "fs";

// --- Minimal DOM shim for server-side rendering ---

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

class SSRText {
  textContent: string;
  constructor(text: string) { this.textContent = text; }
  toHTML() { return escapeHtml(this.textContent); }
}

class SSRElement {
  tag: string;
  attrs: Record<string, string> = {};
  children: (SSRElement | SSRText)[] = [];
  private _text: string | null = null;

  constructor(tag: string) { this.tag = tag; }

  setAttribute(key: string, value: string) { this.attrs[key] = value; }
  getAttribute(key: string) { return this.attrs[key] ?? null; }
  appendChild(child: any) { this.children.push(child); return child; }
  addEventListener() {}
  querySelectorAll() { return []; }
  get classList() { return { toggle() {}, add() {}, remove() {} }; }

  set innerHTML(_: string) { this.children = []; this._text = null; }

  get textContent(): string {
    if (this._text !== null) return this._text;
    return this.children.map((c) => c.textContent ?? "").join("");
  }

  set textContent(v: string) { this._text = v; this.children = []; }

  toHTML(): string {
    const voidTags = new Set(["br", "hr", "img", "input", "meta", "link"]);
    const attrStr = Object.entries(this.attrs)
      .map(([k, v]) => (v === "" ? k : `${k}="${escapeAttr(v)}"`))
      .join(" ");
    const open = attrStr ? `<${this.tag} ${attrStr}>` : `<${this.tag}>`;

    if (voidTags.has(this.tag)) return open;

    let inner: string;
    if (this._text !== null) {
      inner = this.tag === "style" || this.tag === "script" ? this._text : escapeHtml(this._text);
    } else {
      inner = this.children.map((c) => c.toHTML()).join("");
    }
    return `${open}${inner}</${this.tag}>`;
  }
}

const headEl = new SSRElement("head");

(globalThis as any).document = {
  createElement: (tag: string) => new SSRElement(tag),
  createTextNode: (text: string) => new SSRText(text),
  head: headEl,
  getElementById: () => null,
};

(globalThis as any).window = {
  location: { search: "", href: "http://localhost/" },
  history: { pushState() {} },
  addEventListener() {},
};

// --- Render the app ---

const { createApp } = await import("../src/app");

const root = new SSRElement("div");
root.setAttribute("id", "app");
createApp(root as any);

const renderedHTML = root.children.map((c) => c.toHTML()).join("");

const collectedCSS = headEl.children
  .filter((c): c is SSRElement => c instanceof SSRElement && c.tag === "style")
  .map((c) => c.textContent)
  .join("\n");

// --- Build JS bundle ---

mkdirSync("docs", { recursive: true });

const buildResult = await Bun.build({
  entrypoints: ["src/main.ts"],
  outdir: "docs",
  target: "browser",
  format: "esm",
  minify: true,
  naming: "[name].[hash].[ext]",
});

if (!buildResult.success) {
  console.error("Build failed:", buildResult.logs);
  process.exit(1);
}

const jsFile = buildResult.outputs[0].path.split(/[/\\]/).pop()!;

// --- Assemble final HTML ---

let html = readFileSync("index.html", "utf-8");
html = html.replace("</style>", `\n${collectedCSS}\n  </style>`);
html = html.replace('<div id="app"></div>', `<div id="app">${renderedHTML}</div>`);
html = html.replace("/dist/main.js", `./${jsFile}`);

writeFileSync("docs/index.html", html);

console.log("✓ Built to docs/");
console.log(`  → docs/index.html (pre-rendered)`);
console.log(`  → docs/${jsFile}`);
