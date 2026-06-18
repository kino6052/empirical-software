import { h } from "../lib/h";
import { css } from "../lib/css";
import { signal, derived } from "../lib/state";
import { Section, Container, Heading, Text, Card } from "../lib/components";
import posts from "../data/posts.json";

function LikeButton() {
  css(`
    .btn-like {
      background: transparent;
      color: var(--muted);
      border: 1px solid var(--border);
      padding: 0.3rem 0.8rem;
      font-size: 0.85rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
    }
    .btn-like:hover {
      color: #c44;
      border-color: #c44;
      opacity: 1;
    }
  `);

  const count = signal(0);
  const label = derived([count], () => `♥ ${count.get() || ""}`);

  return h("button", {
    class: "btn btn-like",
    onclick: (e: Event) => {
      e.stopPropagation();
      count.set(count.get() + 1);
    },
  }, [label]);
}

function PostCard(post: { slug: string; title: string; date: string; summary: string; tags: string[] }, navigate: (page: string, params?: Record<string, string>) => void) {
  css(`
    .card-link {
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .card-link:hover {
      border-color: var(--fg);
    }
    .card-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.5rem;
    }
  `);

  return Card(
    [
      PostMeta(post.date, post.tags),
      Heading(3, post.title),
      Text(post.summary),
      h("div", { class: "card-footer" }, [LikeButton()]),
    ],
    {
      class: "card card-link",
      onclick: () => navigate("post", { slug: post.slug }),
    }
  );
}

function PostMeta(date: string, tags: string[]) {
  css(`
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

  return h("div", { class: "post-meta" }, [
    h("time", {}, [date]),
    h("span", { class: "post-tags" }, tags.map((t) => h("span", { class: "tag" }, [t]))),
  ]);
}

export function BlogPage(navigate: (page: string, params?: Record<string, string>) => void): HTMLElement {
  css(`
    .blog-list {
      display: flex;
      flex-direction: column;
      gap: var(--space);
      margin-top: var(--space);
    }
  `);

  return Section([
    Container([
      Heading(1, "Blog & Use Cases"),
      Text("Real problems. Real fixes. No fluff."),
      h(
        "div",
        { class: "blog-list" },
        posts.map((post) => PostCard(post, navigate))
      ),
    ]),
  ]);
}
