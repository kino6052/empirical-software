const buildResult = await Bun.build({
  entrypoints: ["src/main.ts"],
  outdir: "dist",
  target: "browser",
  format: "esm",
});

if (!buildResult.success) {
  console.error("Build failed:", buildResult.logs);
  process.exit(1);
}

const server = Bun.serve({
  port: 5173,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === "/dist/main.js" || path === "/bundle.js") {
      return new Response(Bun.file("dist/main.js"), {
        headers: { "Content-Type": "application/javascript" },
      });
    }

    if (path === "/") path = "/index.html";

    const filePath = import.meta.dir + "/.." + path;
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(Bun.file(import.meta.dir + "/../index.html"));
  },
});

console.log(`→ http://localhost:${server.port}`);
