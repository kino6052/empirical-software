import { h } from "../lib/h";
import { css } from "../lib/css";
import { Section, Container, Heading, Text, Button } from "../lib/components";
import posts from "../data/posts.json";

function BackButton(navigate: (page: string) => void) {
  css(`
    .btn-back {
      background: transparent;
      color: var(--muted);
      padding: 0;
      margin-bottom: calc(var(--space) * 1.5);
      font-size: 0.9rem;
    }
    .btn-back:hover {
      color: var(--fg);
      opacity: 1;
    }
  `);

  return Button("← Back to blog", {
    class: "btn btn-back",
    onclick: () => navigate("blog"),
  });
}

function CodeBlock(code: string) {
  css(`
    .code-block {
      background: #f0f0f0;
      border-radius: var(--radius);
      padding: var(--space);
      overflow-x: auto;
      margin-bottom: var(--space);
      font-family: "SF Mono", "Cascadia Code", "Consolas", monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  `);

  return h("pre", { class: "code-block" }, [h("code", {}, [code])]);
}

function Article(post: { title: string; date: string; tags: string[]; content: string }) {
  css(`
    .post .text {
      line-height: 1.75;
    }
    .post-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .tag {
      background: var(--border);
      padding: 0.1rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.75rem;
    }
    .post-tags {
      display: flex;
      gap: 0.3rem;
    }
  `);

  const paragraphs = post.content.split("\n\n").map((block) => {
    if (block.startsWith("async function") || block.startsWith("  ") || block.startsWith("await")) {
      return CodeBlock(block);
    }
    return Text(block);
  });

  return h("article", { class: "post" }, [
    h("div", { class: "post-meta" }, [
      h("time", {}, [post.date]),
      h("span", { class: "post-tags" }, post.tags.map((t) => h("span", { class: "tag" }, [t]))),
    ]),
    Heading(1, post.title),
    ...paragraphs,
  ]);
}

export function PostPage(navigate: (page: string) => void): HTMLElement {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return Section([
      Container([
        Heading(1, "Post not found"),
        BackButton(navigate),
      ]),
    ]);
  }

  return Section([
    Container([
      BackButton(navigate),
      Article(post),
    ]),
  ]);
}
