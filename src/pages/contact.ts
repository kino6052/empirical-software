import { h } from "../lib/h";
import { css } from "../lib/css";
import { signal, derived } from "../lib/state";
import { Section, Container, Heading, Text, Button, Input } from "../lib/components";

function ContactForm() {
  css(`
    .contact-form {
      display: flex;
      gap: 0.75rem;
      margin-top: var(--space);
    }
    .status-msg {
      color: #2a7;
      font-size: 0.9rem;
      min-height: 1.4em;
      margin-top: 0.5rem;
    }
  `);

  const email = signal("");
  const sent = signal(false);
  const status = derived([sent], () => sent.get() ? "✓ We'll be in touch." : "");

  const input = Input({
    type: "email",
    placeholder: "your@email.com",
    oninput: (e: Event) => {
      email.set((e.target as HTMLInputElement).value);
      sent.set(false);
    },
  });

  return h("div", {}, [
    h("div", { class: "contact-form" }, [
      input,
      Button("Send →", {
        onclick: () => {
          if (email.get()) {
            sent.set(true);
            (input as HTMLInputElement).value = "";
            email.set("");
          }
        },
      }),
    ]),
    h("p", { class: "status-msg" }, [status]),
  ]);
}

function ContactLinks() {
  css(`
    .contact-alt {
      margin-top: calc(var(--space) * 2);
    }
    .contact-links {
      display: flex;
      gap: 1rem;
    }
    .contact-links a {
      color: var(--fg);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `);

  return h("div", {}, [
    h("div", { class: "contact-alt" }, [
      Text("Or email us directly:"),
      h("div", { class: "contact-links" }, [
        h("a", { href: "mailto:hello@empiricalsoftware.dev" }, ["hello@empiricalsoftware.dev"]),
      ]),
    ]),
    h("div", { class: "contact-alt" }, [
      Text("Find us on:"),
      h("div", { class: "contact-links" }, [
        h("a", { href: "https://github.com/empirical-software", target: "_blank" }, ["GitHub"]),
        h("a", { href: "https://linkedin.com/company/empirical-software", target: "_blank" }, ["LinkedIn"]),
      ]),
    ]),
  ]);
}

export function ContactPage(): HTMLElement {
  css(`
    .contact {
      padding: calc(var(--space) * 2) 0;
    }
    .contact .btn {
      font-size: 1.05rem;
      margin-top: var(--space);
    }
  `);

  return Section([
    Container([
      h("div", { class: "contact" }, [
        Heading(1, "Let's talk"),
        Text("No forms. No funnels. Just a conversation about your codebase."),
        ContactForm(),
        ContactLinks(),
      ]),
    ]),
  ]);
}
