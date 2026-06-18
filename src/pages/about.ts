import { h } from "../lib/h";
import { css } from "../lib/css";
import { Section, Container, Heading, Text, Divider } from "../lib/components";

export function AboutPage(): HTMLElement {
  css(`
    .principles {
      display: flex;
      flex-direction: column;
      gap: calc(var(--space) * 1.5);
    }
  `);

  return Section([
    Container([
      Heading(1, "Philosophy"),
      Text("Every line of code is a bet on the future. We only make bets that pay off under change."),
      Divider(),
      h("div", { class: "principles" }, [
        h("div", { class: "principle" }, [
          Heading(3, "🎯 Ground everything in what can be seen"),
          Text("If a concept in your system has no perceivable referent — no behavior a user can observe — it is a ghost. We eliminate ghosts."),
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "✂️ Necessary and sufficient"),
          Text("No ceremony. No wrappers-for-wrappers. Every abstraction must pay its rent by reducing the cost of real change."),
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "📐 Softness over rigidity"),
          Text("A small change in the world should require a small change in the code. When it doesn't, the architecture is broken — not the team."),
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "🔍 Empirical verification"),
          Text("No appeal to authority. No 'best practices' without evidence. Every claim is accompanied by a path to verification."),
        ]),
      ]),
    ]),
  ]);
}
