import { h } from "../lib/h";
import { css } from "../lib/css";
import { Section, Container, Heading, Text, Button } from "../lib/components";

export function HomePage(navigate: (page: string) => void): HTMLElement {
  css(`
    .hero {
      padding: calc(var(--space) * 3) 0;
    }
    .hero h1 {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: var(--space);
    }
    .hero .text {
      font-size: 1.15rem;
      color: var(--muted);
      max-width: 560px;
    }
    .hero .btn {
      margin-top: calc(var(--space) * 1.5);
    }
  `);

  return Section([
    Container([
      h("div", { class: "hero" }, [
        Heading(1, "Empirical Software"),
        Text("We build software that keeps delivering — sprint after sprint, year after year."),
        Text("No mire. No slowdown. Just sustained velocity."),
        Button("See how →", {
          onclick: () => navigate("services"),
        }),
      ]),
    ]),
  ]);
}
