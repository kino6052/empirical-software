import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";

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

let html = readFileSync("index.html", "utf-8");
html = html.replace('/dist/main.js', `./${jsFile}`);
writeFileSync("docs/index.html", html);

console.log(`✓ Built to docs/`);
console.log(`  → docs/index.html`);
console.log(`  → docs/${jsFile}`);
